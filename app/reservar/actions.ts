"use server";

import { supabase } from "../../lib/supabase";

export async function getBookedSlots(date: string, businessId: string): Promise<string[]> {
  if (!date || !businessId) return [];

  const { data, error } = await supabase
    .from("appointments")
    .select("time")
    .eq("date", date)
    .eq("business_id", businessId);

  if (error || !data) return [];

  return data.map((a) => a.time);
}