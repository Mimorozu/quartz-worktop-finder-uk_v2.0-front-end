import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

// Register this endpoint's URL (…/api/checkout/webhook) in the Stripe Dashboard
// once the account is live, and set STRIPE_WEBHOOK_SECRET to the signing
// secret it gives you. In dev, use `stripe listen --forward-to
// localhost:3000/api/checkout/webhook`.
export async function POST(request: Request) {
  if (!isStripeConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  const payload = await request.text();

  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const stripe = getStripe();
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await prisma.searchUnlock.updateMany({
      where: { stripeSessionId: session.id, status: "pending" },
      data: { status: "paid", paidAt: new Date() },
    });
  }

  return NextResponse.json({ received: true });
}
