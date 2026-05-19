import { createClient } from "jsr:@supabase/supabase-js@2";

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

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

    // Obtener el push token del negocio
    const { data: biz } = await supabase
      .from("businesses")
      .select("expo_push_token, name")
      .eq("id", record.business_id)
      .single();

    if (!biz?.expo_push_token) {
      return new Response("no push token", { status: 200 });
    }

    // Obtener nombre del servicio
    let serviceName = "";
    if (record.service_id) {
      const { data: svc } = await supabase
        .from("services")
        .select("name")
        .eq("id", record.service_id)
        .single();
      serviceName = svc?.name ?? "";
    }

    // Enviar notificación via Expo Push API
    const message = {
      to: biz.expo_push_token,
      sound: "default",
      title: "Nueva cita 📅",
      body: serviceName
        ? `${record.client_name} · ${serviceName} · ${record.date} ${record.time}`
        : `${record.client_name} · ${record.date} ${record.time}`,
      data: { appointmentId: record.id },
      channelId: "citas",
    };

    const res = await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(message),
    });

    const result = await res.json();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
});
