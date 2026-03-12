"use server";

import { supabase } from "../../lib/supabase";

export async function getBookedSlots(date: string): Promise<string[]> {
  if (!date) return [];

  const { data, error } = await supabase
    .from("appointments")
    .select("time")
    .eq("date", date);

    console.log("booked slots:", data);
    console.log("fecha buscada:", date);


  if (error || !data) return [];

  return data.map((a) => a.time);
}