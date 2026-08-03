import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { extractPostcodeArea } from "@/lib/postcode";
import { getCityBySlug } from "@/lib/cities";
import {
  getFreePreviewCompanyIdForAreaCodes,
  getFreePreviewCompanyIdForPostcodeArea,
} from "@/lib/search";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const COOKIE_NAME = "kwe_unlock";
const UNLOCK_DURATION_MS = 48 * 60 * 60 * 1000;

type UnlockPayload = {
  postcodeArea: string;
};

async function encrypt(payload: UnlockPayload, expiresAt: Date) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodedKey);
}

async function decrypt(token: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as UnlockPayload;
  } catch {
    return null;
  }
}

// Called from a Route Handler once Stripe confirms payment for a postcode area.
export async function grantUnlock(postcodeArea: string) {
  const expiresAt = new Date(Date.now() + UNLOCK_DURATION_MS);
  const token = await encrypt({ postcodeArea }, expiresAt);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

// clientIp is a fallback for customers who paid but never completed the
// redirect back from Checkout (closed tab, dropped connection, etc.) — the
// webhook already marked their row `paid`, so recognize them by IP instead
// of leaving them stuck with no cookie despite having paid.
export async function isPostcodeAreaUnlocked(postcodeArea: string, clientIp: string | null = null) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const payload = await decrypt(token);
  if (payload?.postcodeArea === postcodeArea) return true;

  if (!clientIp) return false;
  const recentPayment = await prisma.searchUnlock.findFirst({
    where: {
      postcodeArea,
      userIp: clientIp,
      status: "paid",
      paidAt: { gte: new Date(Date.now() - UNLOCK_DURATION_MS) },
    },
  });
  return Boolean(recentPayment);
}

// Server-side gate for the two endpoints that actually hand out a company's
// contact details / website (contact-reveal, /go). A company is revealable
// if either (a) the caller has genuinely paid to unlock that postcode area,
// or (b) it's the one company each search legitimately shows for free — the
// first alphabetical result for the given postcode area or city. Never trust
// the client's own claim of which company is "the free one".
export async function isCompanyRevealAuthorized({
  companyId,
  postcode,
  citySlug,
  clientIp,
}: {
  companyId: number;
  postcode: string;
  citySlug: string | null;
  clientIp: string | null;
}): Promise<boolean> {
  if (citySlug) {
    const city = getCityBySlug(citySlug);
    if (!city) return false;
    const freeId = await getFreePreviewCompanyIdForAreaCodes(city.areaCodes);
    return freeId === companyId;
  }

  const postcodeArea = extractPostcodeArea(postcode);
  if (!postcodeArea) return false;

  if (await isPostcodeAreaUnlocked(postcodeArea, clientIp)) return true;

  const freeId = await getFreePreviewCompanyIdForPostcodeArea(postcodeArea);
  return freeId === companyId;
}
