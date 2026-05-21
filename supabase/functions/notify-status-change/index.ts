import { createClient } from "jsr:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM = "NailFlow <hola@nailflow.app>";

function buildCancelledHtml(clientName: string, serviceName: string, date: string, time: string): string {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#fbf9f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2d2424;">
<table cellpadding="0" cellspacing="0" width="100%" style="background:#fbf9f9;">
  <tr><td align="center" style="padding:32px 16px;">
    <table cellpadding="0" cellspacing="0" width="100%" style="max-width:520px;">
      <tr><td style="background:#fff;border:0.5px solid rgba(45,36,36,0.08);border-radius:20px;padding:36px 32px;">
        <p style="margin:0 0 12px;font-size:11px;font-weight:500;color:#846262;text-transform:uppercase;letter-spacing:0.15em;">Cita cancelada</p>
        <h1 style="margin:0 0 12px;font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:500;color:#2d2424;letter-spacing:-0.02em;line-height:1.1;">Tu cita fue <em style="font-style:italic;font-weight:400;color:#846262;">cancelada</em>.</h1>
        <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#846262;">Hola ${clientName}, te confirmamos que tu cita ha sido cancelada. Si fue un error o querés agendar otra fecha, contactanos directamente.</p>
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
            <td style="padding:12px 0;font-size:13px;color:#846262;">Hora</td>
            <td style="padding:12px 0;font-size:13px;color:#2d2424;text-align:right;">${time}</td>
          </tr>
        </table>
        <p style="margin:28px 0 0;padding-top:20px;border-top:0.5px solid rgba(45,36,36,0.08);font-size:11px;color:#b89090;text-align:center;text-transform:uppercase;letter-spacing:0.15em;font-weight:500;">¿Dudas? Escribinos a hola@nailflow.app</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function buildCompletedHtml(clientName: string, businessName: string, serviceName: string, date: string, slug: string): string {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#fbf9f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2d2424;">
<table cellpadding="0" cellspacing="0" width="100%" style="background:#fbf9f9;">
  <tr><td align="center" style="padding:32px 16px;">
    <table cellpadding="0" cellspacing="0" width="100%" style="max-width:520px;">
      <tr><td style="background:#fff;border:0.5px solid rgba(45,36,36,0.08);border-radius:20px;padding:36px 32px;">
        <p style="margin:0 0 12px;font-size:11px;font-weight:500;color:#846262;text-transform:uppercase;letter-spacing:0.15em;">Gracias por tu visita</p>
        <h1 style="margin:0 0 12px;font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:500;color:#2d2424;letter-spacing:-0.02em;line-height:1.1;">Hasta la <em style="font-style:italic;font-weight:400;color:#846262;">próxima</em>, ${clientName}.</h1>
        <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#846262;">Fue un placer atenderte en <em style="font-style:italic;color:#2d2424;">${businessName}</em>. Esperamos verte pronto.</p>
        <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:0 0 28px;">
          <tr>
            <td style="padding:12px 0;font-size:13px;color:#846262;border-bottom:0.5px solid rgba(45,36,36,0.08);">Servicio</td>
            <td style="padding:12px 0;font-size:13px;color:#2d2424;text-align:right;border-bottom:0.5px solid rgba(45,36,36,0.08);">${serviceName}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;font-size:13px;color:#846262;">Fecha</td>
            <td style="padding:12px 0;font-size:13px;color:#2d2424;text-align:right;">${date}</td>
          </tr>
        </table>
        <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 8px;">
          <tr><td>
            <a href="https://nailflow.app/reservar/${slug}" style="display:block;background:#2d2424;color:#fbf9f9;padding:14px 24px;border-radius:12px;font-size:14px;font-weight:500;text-align:center;text-decoration:none;">Reservar otra cita →</a>
          </td></tr>
        </table>
        <p style="margin:28px 0 0;padding-top:20px;border-top:0.5px solid rgba(45,36,36,0.08);font-size:11px;color:#b89090;text-align:center;text-transform:uppercase;letter-spacing:0.15em;font-weight:500;">✦ NailFlow</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

Deno.serve(async (req) => {
  try {
    // Verify caller is an authenticated NailFlow user
    const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "").trim();
    if (!token) return new Response("Unauthorized", { status: 401 });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return new Response("Unauthorized", { status: 401 });

    // Get the business owned by this user
    const { data: callerBiz } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (!callerBiz) return new Response("Forbidden", { status: 403 });

    const { appointmentId, status } = await req.json();

    if (!appointmentId || !["completed", "cancelled"].includes(status)) {
      return new Response("invalid payload", { status: 400 });
    }

    const { data: appt } = await supabase
      .from("appointments")
      .select("*, services(name), businesses(name, slug)")
      .eq("id", appointmentId)
      .single();

    // Verify the appointment belongs to the caller's business
    if (!appt || appt.business_id !== callerBiz.id) {
      return new Response("Forbidden", { status: 403 });
    }

    if (!appt.email) {
      return new Response("no email", { status: 200 });
    }

    const serviceName = (appt.services as any)?.name ?? "—";
    const business = appt.businesses as any;

    let subject: string;
    let html: string;

    if (status === "cancelled") {
      subject = "Tu cita ha sido cancelada";
      html = buildCancelledHtml(appt.client_name, serviceName, appt.date, appt.time);
    } else {
      subject = "¡Gracias por tu visita! 💅";
      html = buildCompletedHtml(appt.client_name, business?.name ?? "el salón", serviceName, appt.date, business?.slug ?? "");
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({ from: FROM, to: appt.email, subject, html }),
    });

    const result = await res.json();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
});
