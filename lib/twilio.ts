const TEMPLATE_SID = "HXf3624ac2799e3c32180d7d17caa1e09d";

export interface WhatsAppConfirmVars {
  first_name: string;
  date: string;
  time: string;
  business_name: string;
  phone: string;
}

export async function sendWhatsApp(to: string, vars: WhatsAppConfirmVars): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;

  if (!sid || !token || !from) {
    console.error("[WA] Missing Twilio env vars", { hasSid: !!sid, hasToken: !!token, hasFrom: !!from });
    return;
  }

  const digits = to.replace(/\D/g, "");
  let formatted: string | null = null;
  if (digits.length === 8) formatted = `+506${digits}`;
  else if (digits.length === 11 && digits.startsWith("506")) formatted = `+${digits}`;
  else if (digits.length >= 10) formatted = `+${digits}`;

  if (!formatted) {
    console.error("[WA] Could not format phone:", to);
    return;
  }

  const credentials = Buffer.from(`${sid}:${token}`).toString("base64");
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      To: `whatsapp:${formatted}`,
      From: from,
      ContentSid: TEMPLATE_SID,
      ContentVariables: JSON.stringify(vars),
    }).toString(),
  });

  if (!res.ok) console.error("[WA] Twilio error:", await res.text());
  else console.log("[WA] Sent to", formatted);
}
