import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientIp } from "@/lib/client-ip";

// Mirrors the original track_contact_reveal.php: records the reveal as a
// lead-tracking event, then returns the company's contact details.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const companyId = Number(body?.companyId);
  const postcode = typeof body?.postcode === "string" ? body.postcode : "";

  if (!companyId || Number.isNaN(companyId)) {
    return NextResponse.json({ success: false }, { status: 400 });
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
      userIp: getClientIp(request),
      userPostcode: postcode || null,
    },
  });

  return NextResponse.json({ success: true, ...company });
}
