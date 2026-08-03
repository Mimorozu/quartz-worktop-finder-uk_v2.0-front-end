import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientIp } from "@/lib/client-ip";
import { isCompanyRevealAuthorized } from "@/lib/unlock";

// Mirrors the original track_click.php: logs the outbound website click,
// then redirects. The destination always comes from the DB (never from a
// client-supplied query param) to avoid an open redirect. Only redirects if
// isCompanyRevealAuthorized confirms this company is genuinely unlocked
// (paid) or the legitimate free-preview result for this search — otherwise
// this would let anyone reach any company's website by guessing companyId,
// bypassing the paywall entirely.
export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/go/[companyId]">
) {
  const { companyId } = await ctx.params;
  const id = Number(companyId);

  if (!id || Number.isNaN(id)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const postcode = request.nextUrl.searchParams.get("postcode") ?? "";
  const clientIp = getClientIp(request.headers);

  const authorized = await isCompanyRevealAuthorized({
    companyId: id,
    postcode,
    clientIp,
  });
  if (!authorized) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const company = await prisma.company.findUnique({
    where: { id, active: true },
    select: { website: true },
  });

  if (!company?.website) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  await prisma.websiteClick.create({
    data: {
      companyId: id,
      clickType: "website",
      userIp: clientIp,
      userPostcode: postcode || null,
    },
  });

  return NextResponse.redirect(company.website, { status: 307 });
}
