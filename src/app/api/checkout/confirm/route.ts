import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { grantUnlock } from "@/lib/unlock";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!isStripeConfigured() || !sessionId) {
    return NextResponse.redirect(new URL("/", url.origin));
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const postcodeArea = session.metadata?.postcodeArea;
  const postcode = session.metadata?.postcode ?? "";
  const redirectUrl = new URL("/", url.origin);
  if (postcode) redirectUrl.searchParams.set("postcode", postcode);

  if (session.payment_status !== "paid" || !postcodeArea) {
    return NextResponse.redirect(redirectUrl);
  }

  await prisma.searchUnlock.updateMany({
    where: { stripeSessionId: session.id, status: "pending" },
    data: { status: "paid", paidAt: new Date() },
  });

  await grantUnlock(postcodeArea);

  return NextResponse.redirect(redirectUrl);
}
