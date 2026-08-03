import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientIp } from "@/lib/client-ip";
import { isCompanyRevealAuthorized } from "@/lib/unlock";
import { rateLimit } from "@/lib/rate-limit";

// Mirrors the original track_contact_reveal.php: records the reveal as a
// lead-tracking event, then returns the company's contact details — but
// only once isCompanyRevealAuthorized confirms this company is genuinely
// unlocked (paid) or the legitimate free-preview result for this search.
export async function POST(request: Request) {
  const clientIp = getClientIp(request.headers);

  if (clientIp && !rateLimit(`contact-reveal:${clientIp}`, 20, 60_000)) {
    return NextResponse.json({ success: false, error: "Too many requests." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const companyId = Number(body?.companyId);
  const postcode = typeof body?.postcode === "string" ? body.postcode : "";

  if (!companyId || Number.isNaN(companyId)) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const authorized = await isCompanyRevealAuthorized({ companyId, postcode, clientIp });
  if (!authorized) {
    return NextResponse.json({ success: false, error: "Not unlocked." }, { status: 403 });
  }

  const company = await prisma.company.findUnique({
    where: { id: companyId, active: true },
    select: { phone: true, email: true, website: true },
  });

  if (!company) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  await prisma.websiteClick.create({
    data: {
      companyId,
      clickType: "contact_reveal",
      userIp: clientIp,
      userPostcode: postcode || null,
    },
  });

  return NextResponse.json({ success: true, ...company });
}
