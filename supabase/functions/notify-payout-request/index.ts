import { createClient } from "jsr:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM = "NailFlow <hola@nailflow.app>";
const ADMIN_EMAIL = "nailflowapp@gmail.com";

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

    const { data: business } = await supabase
      .from("businesses")
      .select("owner_name, name, email")
      .eq("id", record.business_id)
      .single();

    if (!business) return new Response("business not found", { status: 200 });

    const ownerName = business.owner_name ?? business.name ?? "Manicurista";
    const amount = `$${Number(record.amount).toFixed(0)}`;

    // Email a la manicurista — confirmación
    if (business.email) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM,
          to: business.email,
          subject: `Tu solicitud de pago fue recibida 💅`,
          html: `<!doctype html><html lang="es"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#fbf9f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2d2424;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#fbf9f9;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:520px;">
      <tr><td style="background:#ffffff;border:0.5px solid rgba(45,36,36,0.08);border-radius:20px;padding:36px 32px;">

        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
          <tr>
            <td style="vertical-align:middle;">
              <div style="display:inline-block;width:36px;height:36px;border-radius:10px;background:#2d2424;color:#e9cece;text-align:center;line-height:36px;font-size:18px;">✦</div>
            </td>
            <td style="vertical-align:middle;padding-left:10px;">
              <span style="font-size:18px;font-weight:500;letter-spacing:-0.02em;color:#2d2424;">NailFlow</span>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 12px;font-size:11px;font-weight:500;color:#846262;text-transform:uppercase;letter-spacing:0.15em;">Solicitud recibida</p>
        <h1 style="margin:0 0 12px;font-size:28px;font-weight:500;color:#2d2424;letter-spacing:-0.02em;line-height:1.1;">
          ¡Hola, <em style="font-style:italic;font-weight:400;color:#846262;">${ownerName}</em>!
        </h1>
        <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#846262;">
          Recibimos tu solicitud de pago por <strong style="color:#2d2424;">${amount}</strong> por SINPE Móvil al número <strong style="color:#2d2424;">${record.sinpe_number}</strong>. Lo procesaremos en los próximos 3-5 días hábiles.
        </p>
        <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#846262;">
          ¿Tenés alguna duda? Escribinos al DM de Instagram <strong style="color:#2d2424;">@nailflowapp</strong>.
        </p>
        <p style="margin:28px 0 0;padding-top:20px;border-top:0.5px solid rgba(45,36,36,0.08);font-size:11px;color:#b89090;text-align:center;text-transform:uppercase;letter-spacing:0.15em;font-weight:500;">
          ✦ El aliado perfecto para tu salón
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
        }),
      });
    }

    // Email a vos — notificación para procesar el SINPE
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: ADMIN_EMAIL,
        subject: `💸 Nueva solicitud de pago — ${ownerName} · ${amount}`,
        html: `<!doctype html><html lang="es"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#fbf9f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2d2424;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#fbf9f9;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:520px;">
      <tr><td style="background:#ffffff;border:0.5px solid rgba(45,36,36,0.08);border-radius:20px;padding:36px 32px;">
        <h1 style="margin:0 0 20px;font-size:22px;font-weight:600;color:#2d2424;">Nueva solicitud de pago</h1>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:0 0 24px;">
          <tr>
            <td style="padding:12px 0;font-size:13px;color:#846262;border-bottom:0.5px solid rgba(45,36,36,0.08);">Manicurista</td>
            <td style="padding:12px 0;font-size:13px;color:#2d2424;text-align:right;border-bottom:0.5px solid rgba(45,36,36,0.08);font-weight:600;">${ownerName}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;font-size:13px;color:#846262;border-bottom:0.5px solid rgba(45,36,36,0.08);">Email</td>
            <td style="padding:12px 0;font-size:13px;color:#2d2424;text-align:right;border-bottom:0.5px solid rgba(45,36,36,0.08);">${business.email}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;font-size:13px;color:#846262;border-bottom:0.5px solid rgba(45,36,36,0.08);">Monto</td>
            <td style="padding:12px 0;font-size:13px;color:#2d2424;text-align:right;border-bottom:0.5px solid rgba(45,36,36,0.08);font-weight:600;">${amount}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;font-size:13px;color:#846262;">SINPE Móvil</td>
            <td style="padding:12px 0;font-size:28px;color:#2d2424;text-align:right;font-weight:700;letter-spacing:1px;">${record.sinpe_number}</td>
          </tr>
        </table>
        <p style="margin:0;font-size:13px;color:#846262;">Una vez que hagas el SINPE, marcá la solicitud como pagada en Supabase.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
      }),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
});
