import { createClient } from "jsr:@supabase/supabase-js@2";

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM = "NailFlow <hola@nailflow.app>";

function currencySymbol(code: string): string {
  switch (code) {
    case "USD": return "$";
    case "EUR": return "€";
    case "GBP": return "£";
    case "MXN": return "$";
    default:    return "₡";
  }
}

function buildConfirmationHtml(
  clientName: string,
  serviceName: string,
  date: string,
  time: string,
  duration: string,
  total: string,
  slug: string,
): string {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#fbf9f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2d2424;">
<table cellpadding="0" cellspacing="0" width="100%" style="background:#fbf9f9;">
  <tr><td align="center" style="padding:32px 16px;">
    <table cellpadding="0" cellspacing="0" width="100%" style="max-width:520px;">
      <tr><td style="background:#fff;border:0.5px solid rgba(45,36,36,0.08);border-radius:20px;padding:36px 32px;">
        <p style="margin:0 0 12px;font-size:11px;font-weight:500;color:#846262;text-transform:uppercase;letter-spacing:0.15em;">Cita confirmada</p>
        <h1 style="margin:0 0 12px;font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:500;color:#2d2424;letter-spacing:-0.02em;line-height:1.1;">Te esperamos, <em style="font-style:italic;font-weight:400;color:#846262;">${clientName}</em>.</h1>
        <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#846262;">Tu reserva quedó registrada. Estos son los detalles.</p>
        <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:0 0 28px;">
          <tr>
            <td style="padding:12px 0;font-size:13px;color:#846262;border-bottom:0.5px solid rgba(45,36,36,0.08);">Servicio</td>
            <td style="padding:12px 0;font-size:13px;color:#2d2424;text-align:right;border-bottom:0.5px solid rgba(45,36,36,0.08);">${serviceName}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;font-size:13px;color:#846262;border-bottom:0.5px solid rgba(45,36,36,0.08);">Fecha</td>
            <td style="padding:12px 0;font-size:13px;color:#2d2424;text-align:right;border-bottom:0.5px solid rgba(45,36,36,0.08);">${date}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;font-size:13px;color:#846262;border-bottom:0.5px solid rgba(45,36,36,0.08);">Hora</td>
            <td style="padding:12px 0;font-size:13px;color:#2d2424;text-align:right;border-bottom:0.5px solid rgba(45,36,36,0.08);">${time}</td>
          </tr>
          ${duration ? `<tr>
            <td style="padding:12px 0;font-size:13px;color:#846262;border-bottom:0.5px solid rgba(45,36,36,0.08);">Duración</td>
            <td style="padding:12px 0;font-size:13px;color:#2d2424;text-align:right;border-bottom:0.5px solid rgba(45,36,36,0.08);">${duration}</td>
          </tr>` : ""}
          ${total ? `<tr>
            <td style="padding:12px 0;font-size:13px;color:#846262;">Total</td>
            <td style="padding:12px 0;font-size:13px;color:#2d2424;text-align:right;">${total}</td>
          </tr>` : ""}
        </table>
        ${slug ? `<table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 8px;">
          <tr><td>
            <a href="https://nailflow.app/reservar/${slug}" style="display:block;background:#2d2424;color:#fbf9f9;padding:14px 24px;border-radius:12px;font-size:14px;font-weight:500;text-align:center;text-decoration:none;">Ver mi reserva →</a>
          </td></tr>
        </table>` : ""}
        <p style="margin:28px 0 0;padding-top:20px;border-top:0.5px solid rgba(45,36,36,0.08);font-size:11px;color:#b89090;text-align:center;text-transform:uppercase;letter-spacing:0.15em;font-weight:500;">✦ NailFlow · El aliado perfecto para tu salón</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record;

    if (!record || payload.type !== "INSERT") {
      return new Response("not an insert", { status: 200 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Obtener datos del negocio
    const { data: biz } = await supabase
      .from("businesses")
      .select("expo_push_token, name, slug, currency")
      .eq("id", record.business_id)
      .single();

    // Obtener nombre y detalles del servicio
    let serviceName = "";
    let duration = "";
    let total = "";
    if (record.service_id) {
      const { data: svc } = await supabase
        .from("services")
        .select("name, duration, price")
        .eq("id", record.service_id)
        .single();
      if (svc) {
        serviceName = svc.name ?? "";
        if (svc.duration) duration = `${svc.duration} min`;
        if (svc.price != null) {
          const sym = currencySymbol(biz?.currency ?? "CRC");
          total = `${sym}${Number(svc.price).toLocaleString("es")}`;
        }
      }
    }

    const results: Record<string, unknown> = {};

    // Enviar notificación push al negocio
    if (biz?.expo_push_token) {
      const message = {
        to: biz.expo_push_token,
        sound: "default",
        title: "Nueva cita",
        body: serviceName
          ? `${record.client_name} · ${serviceName} · ${record.date} ${record.time}`
          : `${record.client_name} · ${record.date} ${record.time}`,
        data: { appointmentId: record.id },
        channelId: "citas",
      };

      const pushRes = await fetch(EXPO_PUSH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(message),
      });
      results.push = await pushRes.json();
    }

    // Enviar correo de confirmación al cliente
    if (record.email) {
      const html = buildConfirmationHtml(
        record.client_name ?? "Cliente",
        serviceName || "—",
        record.date ?? "",
        record.time ?? "",
        duration,
        total,
        biz?.slug ?? "",
      );

      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM,
          to: record.email,
          subject: "¡Tu cita ha sido confirmada! 💅",
          html,
        }),
      });
      results.email = await emailRes.json();
    }

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
});
