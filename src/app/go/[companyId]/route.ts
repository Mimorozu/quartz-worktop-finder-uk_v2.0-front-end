import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientIp } from "@/lib/client-ip";

// Mirrors the original track_click.php: logs the outbound website click,
// then redirects. The destination always comes from the DB (never from a
// client-supplied query param) to avoid an open redirect.
export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/go/[companyId]">
) {
  const { companyId } = await ctx.params;
  const id = Number(companyId);

  if (!id || Number.isNaN(id)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const company = await prisma.company.findUnique({
    where: { id, active: true },
    select: { website: true },
  });

  if (!company?.website) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const postcode = request.nextUrl.searchParams.get("postcode") ?? "";

  await prisma.websiteClick.create({
    data: {
      companyId: id,
      clickType: "website",
      userIp: getClientIp(request),
      userPostcode: postcode || null,
    },
  });

  return NextResponse.redirect(company.website, { status: 307 });
}
