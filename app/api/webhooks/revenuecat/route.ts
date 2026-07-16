import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const REVENUECAT_WEBHOOK_SECRET = process.env.REVENUECAT_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!REVENUECAT_WEBHOOK_SECRET || authHeader !== `Bearer ${REVENUECAT_WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = payload.event;
  const userId = event?.app_user_id;
  const eventType = event?.type;

  if (!userId || !eventType) {
    return NextResponse.json({ received: true });
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (!business) {
    return NextResponse.json({ received: true });
  }

  if (["INITIAL_PURCHASE", "RENEWAL", "UNCANCELLATION"].includes(eventType)) {
    await supabase.from("businesses").update({
      subscription_status: "active",
    }).eq("id", business.id);

    if (eventType === "INITIAL_PURCHASE") {
      await creditReferral(business.id);
    }
  }

  if (["CANCELLATION", "EXPIRATION", "BILLING_ISSUE"].includes(eventType)) {
    await supabase.from("businesses").update({
      subscription_status: "cancelled",
    }).eq("id", business.id);
  }

  return NextResponse.json({ received: true });
}

async function creditReferral(businessId: string) {
  const { data: business } = await supabase
    .from("businesses")
    .select("id, referred_by")
    .eq("id", businessId)
    .single();

  if (!business?.referred_by) return;

  // Idempotente: no acreditar si ya existe un earning para esta referida
  const { data: existing } = await supabase
    .from("referral_earnings")
    .select("id")
    .eq("referred_id", businessId)
    .single();

  if (existing) return;

  // Crear earning
  await supabase.from("referral_earnings").insert({
    referrer_id: business.referred_by,
    referred_id: businessId,
    amount: 2.00,
    status: "pending",
  });

  // Incremento atómico — evita race condition si dos referidas convierten al mismo tiempo
  await supabase.rpc("increment_referral_balance", {
    business_id: business.referred_by,
    amount: 2,
  });

  {

    // Push notification al referidor
    const { data: referrerFull } = await supabase
      .from("businesses")
      .select("expo_push_token, owner_name")
      .eq("id", business.referred_by)
      .single();

    const { data: referred } = await supabase
      .from("businesses")
      .select("owner_name, name")
      .eq("id", businessId)
      .single();

    if (referrerFull?.expo_push_token) {
      const referredName = referred?.owner_name ?? referred?.name ?? "Tu referida";
      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          to: referrerFull.expo_push_token,
          sound: "default",
          title: "¡Ganaste $2! 💅",
          body: `${referredName} activó su cuenta con tu código.`,
        }),
      });
    }
  }
}
