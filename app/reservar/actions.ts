"use server";

import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export type BookedAppointment = { time: string; duration: number | null };

export async function getBookedSlots(date: string, businessId: string): Promise<BookedAppointment[]> {
  if (!date || !businessId) return [];

  const { data, error } = await getAdminClient()
    .from("appointments")
    .select("time, duration")
    .eq("date", date)
    .eq("business_id", businessId)
    .neq("status", "cancelled");

  if (error || !data) return [];

  return data.map((a) => ({ time: a.time, duration: a.duration ?? null }));
}