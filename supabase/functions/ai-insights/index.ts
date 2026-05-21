import { createClient } from "jsr:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    const { businessId, question } = await req.json();
    if (!businessId || !question) {
      return new Response(JSON.stringify({ error: "Faltan parámetros" }), {
        status: 400, headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Fetch last 90 days of appointments + services
    const since = new Date();
    since.setDate(since.getDate() - 90);
    const sinceStr = since.toISOString().split("T")[0];

    const [{ data: appointments }, { data: services }] = await Promise.all([
      supabase
        .from("appointments")
        .select("date, time, status, total_price, client_name, service_id")
        .eq("business_id", businessId)
        .gte("date", sinceStr)
        .order("date", { ascending: false }),
      supabase
        .from("services")
        .select("id, name, price, duration")
        .eq("business_id", businessId),
    ]);

    const today = new Date().toISOString().split("T")[0];
    const context = {
      hoy: today,
      servicios: services ?? [],
      citas: (appointments ?? []).map((a) => ({
        fecha: a.date,
        hora: a.time,
        estado: a.status,
        precio: a.total_price,
        cliente: a.client_name,
        servicio_id: a.service_id,
      })),
    };

    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY no configurado" }), {
        status: 500, headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: `Eres una asistente de negocios para una manicurista. Tienes acceso a los datos reales de su negocio de los últimos 90 días. Responde de forma concisa y útil, en español. No uses formato markdown, solo texto plano con saltos de línea simples cuando sea necesario. Si los datos no son suficientes para responder con exactitud, sé honesta al respecto.

Datos del negocio:
${JSON.stringify(context)}`,
        messages: [{ role: "user", content: question }],
      }),
    });

    if (!aiRes.ok) {
      const detail = await aiRes.text();
      return new Response(JSON.stringify({ error: "Error de IA", detail }), {
        status: 500, headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiRes.json();
    const answer = aiData.content?.[0]?.text ?? "No pude generar una respuesta.";

    return new Response(JSON.stringify({ answer }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
