import { NextRequest, NextResponse } from "next/server";
import { sendWhatsApp } from "../../../lib/twilio";

export async function POST(request: NextRequest) {
  let body: { phone?: string; client_name?: string; date?: string; time?: string; business_name?: string; whatsapp_number?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { phone, client_name, date, time, business_name, whatsapp_number } = body;

  if (!phone || !client_name || !date || !time || !business_name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const contactInfo = whatsapp_number
    ? `Para cambios contactá a ${business_name} al ${whatsapp_number}.`
    : `Para cambios contactá a ${business_name}.`;

  await sendWhatsApp(phone, `Hola ${client_name} 👋 Tu cita está confirmada para el ${date} a las ${time}. ${contactInfo}`);

  return NextResponse.json({ ok: true });
}
