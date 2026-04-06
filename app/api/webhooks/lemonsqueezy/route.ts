import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-signature");

  // Verificar firma
  const hmac = crypto
    .createHmac("sha256", process.env.LEMONSQUEEZY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (hmac !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(body);
  const eventName = payload.meta?.event_name;
  const customerId = payload.data?.attributes?.customer_id?.toString();
  const subscriptionId = payload.data?.id?.toString();
  const userEmail = payload.data?.attributes?.user_email;
  const status = payload.data?.attributes?.status;

  if (!userEmail) {
    return NextResponse.json({ received: true });
  }

  // Buscar el negocio por email
  const { data: business } = await supabase
    .from("businesses")
    .select("id")
    .eq("email", userEmail)
    .single();

  if (!business) {
    return NextResponse.json({ received: true });
  }

  if (eventName === "subscription_created") {
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 30);
    await supabase.from("businesses").update({
      subscription_status: "trial",
      trial_ends_at: trialEndsAt.toISOString(),
      lemonsqueezy_customer_id: customerId,
      lemonsqueezy_subscription_id: subscriptionId,
    }).eq("id", business.id);
  }

  if (eventName === "subscription_updated") {
    await supabase.from("businesses").update({
      subscription_status: status === "active" ? "active" : status,
      lemonsqueezy_customer_id: customerId,
      lemonsqueezy_subscription_id: subscriptionId,
    }).eq("id", business.id);
  }

  if (eventName === "subscription_cancelled" || eventName === "subscription_expired") {
    await supabase.from("businesses").update({
      subscription_status: "cancelled",
    }).eq("id", business.id);
  }

  return NextResponse.json({ received: true });
}