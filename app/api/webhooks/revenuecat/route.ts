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
  }

  if (["CANCELLATION", "EXPIRATION", "BILLING_ISSUE"].includes(eventType)) {
    await supabase.from("businesses").update({
      subscription_status: "cancelled",
    }).eq("id", business.id);
  }

  return NextResponse.json({ received: true });
}
