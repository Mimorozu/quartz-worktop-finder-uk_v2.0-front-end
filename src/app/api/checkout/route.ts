import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractPostcodeArea } from "@/lib/postcode";
import { getClientIp } from "@/lib/client-ip";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { UNLOCK_PRICE_PENCE, UNLOCK_CURRENCY } from "@/lib/pricing";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { success: false, error: "Payments are not set up yet. Please check back soon." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const postcode = typeof body?.postcode === "string" ? body.postcode.toUpperCase().trim() : "";
  const postcodeArea = extractPostcodeArea(postcode);

  if (!postcodeArea) {
    return NextResponse.json({ success: false, error: "Invalid postcode." }, { status: 400 });
  }

  const companyCount = await prisma.company.count({
    where: { active: true, coveragePostcodes: { some: { postcodeArea } } },
  });

  if (companyCount === 0) {
    return NextResponse.json(
      { success: false, error: "There are no results to unlock for this postcode." },
      { status: 400 }
    );
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded_page",
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: UNLOCK_CURRENCY,
          unit_amount: UNLOCK_PRICE_PENCE,
          product_data: {
            name: `Unlock ${companyCount} stone mason contact${companyCount !== 1 ? "s" : ""} — ${postcodeArea}`,
          },
        },
        quantity: 1,
      },
    ],
    return_url: `${origin}/api/checkout/confirm?session_id={CHECKOUT_SESSION_ID}`,
    metadata: { postcode, postcodeArea },
  });

  await prisma.searchUnlock.create({
    data: {
      postcode,
      postcodeArea,
      amount: UNLOCK_PRICE_PENCE,
      currency: UNLOCK_CURRENCY,
      stripeSessionId: session.id,
      userIp: getClientIp(request.headers),
    },
  });

  return NextResponse.json({ success: true, clientSecret: session.client_secret });
}
