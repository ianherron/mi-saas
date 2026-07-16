import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";
import BookingForm from "../BookingForm";
import { resend } from "../../../lib/resend";
import { renderEmail } from "../../../lib/email-template";

export default async function ReservarSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: business } = await supabase
    .from("businesses")
    .select("id, name, slug, owner_name, payments_enabled, payment_percentage, sinpe_number, sinpe_bank, whatsapp_number, currency, cover_image_url, bio, cancellation_policy, profile_image_url, schedule_mode, vacation_from, vacation_until")
    .eq("slug", slug)
    .single();

  if (!business) notFound();

  async function createAppointment(formData: FormData): Promise<{ error: string } | void> {
    "use server";
    const client_name = formData.get("client_name") as string;
    const service_id = formData.get("service_id") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const duration = parseInt(formData.get("duration") as string);
    const total_price = parseInt(formData.get("total_price") as string) || 0;
    const reference_image = formData.get("reference_image") as string;
    const payment_proof = formData.get("payment_proof") as string;
    const extra_ids_raw = formData.get("extra_ids") as string;
    const extra_ids = extra_ids_raw ? extra_ids_raw.split(",").map(Number) : null;

    // Usar el business.id capturado del outer scope — no confiar en FormData
    const business_id = business!.id;

    // Validaciones
    if (!client_name?.trim() || client_name.trim().length < 2) return { error: "El nombre debe tener al menos 2 caracteres." };
    if (client_name.length > 100) return { error: "El nombre es demasiado largo." };
    if (!service_id) return { error: "Seleccioná un servicio." };
    if (!date || isNaN(new Date(date).getTime())) return { error: "La fecha no es válida." };
    const today = new Date().toISOString().split("T")[0];
    if (date < today) return { error: "No podés reservar en una fecha pasada." };
    if (!time) return { error: "Seleccioná una hora." };
    if (isNaN(duration) || duration <= 0) return { error: "La duración no es válida." };
    if (email && !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) return { error: "El correo no es válido." };
    if (phone && !/^[\d\s\-+]{7,15}$/.test(phone)) return { error: "El teléfono no es válido." };

    const { data: service } = await supabase
      .from("services")
      .select("name, price")
      .eq("id", service_id)
      .eq("business_id", business_id)
      .single();

    if (!service) return { error: "Este servicio ya no está disponible." };

    // Verificación server-side de disponibilidad — cubre el caso de página cargada antes de que se agendara otra cita
    function timeToMinutes(t: string): number {
      const upper = t.toUpperCase().trim();
      const isPM = upper.includes("PM");
      const isAM = upper.includes("AM");
      const clean = upper.replace(/\s*(AM|PM)\s*/i, "");
      const [h, m] = clean.split(":").map(Number);
      let hours = h;
      if (isAM && hours === 12) hours = 0;
      if (isPM && hours !== 12) hours += 12;
      return hours * 60 + (m || 0);
    }

    const { data: existingAppts } = await supabase
      .from("appointments")
      .select("time, duration")
      .eq("business_id", business_id)
      .eq("date", date)
      .neq("status", "cancelled");

    if (existingAppts && existingAppts.length > 0) {
      const newStart = timeToMinutes(time);
      const newEnd = newStart + (duration || 30);
      const hasConflict = existingAppts.some((appt) => {
        const apptStart = timeToMinutes(appt.time);
        const apptEnd = apptStart + (appt.duration ?? 30);
        return newStart < apptEnd && apptStart < newEnd;
      });
      if (hasConflict) return { error: "Ese horario ya no está disponible. Por favor elegí otro." };
    }

    const safePrice = typeof total_price === "number" && !isNaN(total_price) ? total_price : 0;

    const { error: insertError } = await supabase.from("appointments").insert({
      client_name,
      service_id,
      date,
      time,
      duration,
      phone,
      email,
      business_id,
      total_price,
      reference_image,
      payment_proof,
      extra_ids,
    });

    if (insertError) {
      if (insertError.code === "23505") return { error: "Ese horario ya fue reservado. Por favor elegí otro." };
      return { error: "No se pudo guardar la cita. Intentá de nuevo." };
    }

    // WhatsApp de confirmación al cliente
    if (phone) {
      const digits = phone.replace(/\D/g, "");
      let formattedPhone: string | null = null;
      if (digits.length === 8) formattedPhone = `+506${digits}`;
      else if (digits.length === 11 && digits.startsWith("506")) formattedPhone = `+${digits}`;
      else if (digits.length >= 10) formattedPhone = `+${digits}`;

      const twilioSid = process.env.TWILIO_ACCOUNT_SID;
      const twilioToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioFrom = process.env.TWILIO_WHATSAPP_FROM;

      console.log("[WA]", { formattedPhone, hasSid: !!twilioSid, hasToken: !!twilioToken, hasFrom: !!twilioFrom });

      if (formattedPhone && twilioSid && twilioToken && twilioFrom) {
        const credentials = Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64");
        const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
          method: "POST",
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            To: `whatsapp:${formattedPhone}`,
            From: twilioFrom,
            Body: `Hola ${client_name} 👋 Tu cita está confirmada para el ${date} a las ${time}. Si necesitás cambiarla, respondé este mensaje. ✦ NailFlow`,
          }).toString(),
        });
        if (!res.ok) console.error("Twilio error:", await res.text());
      }
    }

    // Obtener email del negocio
    const { data: businessData } = await supabase
      .from("businesses")
      .select("email")
      .eq("id", business_id)
      .single();

    // Correo a la manicurista
    if (businessData?.email) {
      await resend.emails.send({
        from: "NailFlow <hola@nailflow.app>",
        to: businessData.email,
        subject: `Nueva cita — ${client_name}`,
        html: renderEmail({
          preheader: `${client_name} reservó ${service?.name ?? "una cita"} para el ${date}.`,
          eyebrow: "Nueva reserva",
          heading: `<em>${client_name}</em> reservó una cita.`,
          intro: "Tenés una clienta nueva. Acá los detalles para tu agenda.",
          rows: [
            { label: "Clienta", value: client_name },
            { label: "Servicio", value: service?.name ?? "—" },
            { label: "Fecha", value: `${date} · ${time}` },
            { label: "Teléfono", value: phone || "—" },
            { label: "Duración", value: `${duration} min` },
            { label: "Total", value: `₡${safePrice.toLocaleString()}`, total: true },
          ],
          image: reference_image
            ? { url: reference_image, alt: "Referencia", label: "Foto de referencia" }
            : undefined,
          cta: { label: "Ver en mi agenda →", href: "https://nailflow.app/citas" },
          footer: "✦ NailFlow",
        }),
      });
    }
  }

  const { data: galleryImages } = await supabase
  .from("gallery")
  .select("image_url")
  .eq("business_id", business.id)
  .order("created_at", { ascending: false });

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("business_id", business.id)
    .order("created_at", { ascending: true });

  const groupedServices = (services ?? []).reduce((acc: Record<string, any[]>, service) => {
    const cat = service.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(service);
    return acc;
  }, {});

  const { data: timeSlots } = await supabase
    .from("time_slots")
    .select("id, time, day")
    .eq("business_id", business.id)
    .order("time", { ascending: true });

  const { data: extras } = await supabase
    .from("extras")
    .select("*")
    .eq("business_id", business.id)
    .order("created_at", { ascending: true });

  const { data: workingDaysData } = await supabase
    .from("working_days")
    .select("day")
    .eq("business_id", business.id);

  const workingDays = workingDaysData?.map((d) => d.day) ?? [];

  const today = new Date().toISOString().slice(0, 10);
  const vacFrom = (business as any).vacation_from as string | null;
  const vacUntil = (business as any).vacation_until as string | null;
  const onVacation = !!(vacFrom && vacUntil && today >= vacFrom && today <= vacUntil);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f7f6f6] text-slate-900">
      <div className="flex h-full grow flex-col">
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e9cece]/20 bg-white/50 px-6 py-4 backdrop-blur-md md:px-20 lg:px-40">
          <div className="flex items-center gap-2 text-slate-900">
            <div className="flex size-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-base leading-none text-[#e9cece]">
              ✦
            </div>
            <h1 className="serif-heading text-xl font-medium tracking-tight text-[#2d2424]">
              {business.name}
            </h1>
          </div>
        </header>

        {/* Hero: con banner o fallback editorial */}
        {business.cover_image_url ? (
          <>
            {/* Banner completo — sin clip-path, ratio natural sobre cream + fade abajo */}
            <div className="relative flex w-full items-center justify-center overflow-hidden bg-[#fbf9f9]">
              <img
                src={business.cover_image_url}
                alt={business.name}
                className="block h-auto max-h-[360px] w-full object-contain"
              />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#fbf9f9] to-transparent" />
            </div>
            {/* Identity row — sobre el mismo cream, sin border-top */}
            <div className="bg-[#fbf9f9]">
              <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-5 sm:gap-5 sm:px-10">
                {business.profile_image_url ? (
                  <img
                    src={business.profile_image_url}
                    alt={business.owner_name ?? business.name}
                    className="h-14 w-14 shrink-0 rounded-full border border-[#2d2424]/[0.08] object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e9cece] font-serif text-xl font-medium text-[#2d2424]">
                    {business.owner_name?.charAt(0).toUpperCase() ?? "?"}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                    Tu profesional
                  </p>
                  {business.owner_name && (
                    <p className="serif-heading mt-1 text-lg font-medium leading-tight tracking-tight text-[#2d2424]">
                      {business.owner_name}
                    </p>
                  )}
                  {business.bio && (
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[#846262]">
                      {business.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Sin banner: hero editorial con ✦ decorativo */
          <div className="relative overflow-hidden bg-gradient-to-b from-[#f4ecec]/70 to-[#fbf9f9]">
            <span
              aria-hidden
              className="serif-heading pointer-events-none absolute -right-12 -top-12 text-[260px] leading-none text-[#e9cece]/30"
            >
              ✦
            </span>
            <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-14 text-center sm:py-16">
              {business.profile_image_url ? (
                <img
                  src={business.profile_image_url}
                  alt={business.owner_name ?? business.name}
                  className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-[0_8px_24px_rgba(45,36,36,0.08)]"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#e9cece] font-serif text-3xl font-medium text-[#2d2424] shadow-[0_8px_24px_rgba(45,36,36,0.08)]">
                  {business.owner_name?.charAt(0).toUpperCase() ?? "?"}
                </div>
              )}
              <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                Para tus clientas
              </p>
              <h1 className="serif-heading mt-2 text-3xl font-medium leading-[1.05] tracking-tight text-[#2d2424] sm:text-4xl">
                {business.name}
              </h1>
              {business.owner_name && (
                <p className="mt-2 text-sm text-[#846262]">
                  by {business.owner_name}
                </p>
              )}
              {business.bio && (
                <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-[#846262]">
                  {business.bio}
                </p>
              )}
            </div>
          </div>
        )}

        <main className="flex flex-1 justify-center px-4 py-8 md:px-0">
          {onVacation ? (
            <div className="flex flex-1 flex-col items-center justify-center py-24 text-center px-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#846262] mb-3">Fuera de servicio</p>
              <h2 className="font-serif text-2xl font-medium text-[#2d2424] tracking-tight mb-3">
                {business.owner_name ?? business.name} está de vacaciones
              </h2>
              {(business as any).vacation_until && (
                <p className="text-sm text-[#846262]">
                  Regresa el{" "}
                  <span className="font-medium text-[#2d2424]">
                    {new Date((business as any).vacation_until + "T12:00:00").toLocaleDateString("es-CR", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </span>
                </p>
              )}
              <p className="mt-4 text-xs text-[#b89090]">Volvé a intentarlo cuando regrese.</p>
            </div>
          ) : !services || services.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
              <p className="text-lg font-medium text-[#2d2424]">Aún no hay servicios disponibles</p>
              <p className="mt-2 text-sm text-[#846262]">Este negocio aún no tiene servicios configurados. Intenta más tarde.</p>
            </div>
          ) : (
            <BookingForm
              scheduleMode={((business as any).schedule_mode === "per-day" ? "per-day" : "unified")}
              services={services}
              groupedServices={groupedServices}
              timeSlots={timeSlots ?? []}
              extras={extras ?? []}
              businessId={business.id}
              workingDays={workingDays}
              gallery={galleryImages ?? []}
              paymentsEnabled={business.payments_enabled ?? false}
              paymentPercentage={business.payment_percentage ?? 50}
              sinpeNumber={business.sinpe_number ?? ""}
              sinpeBank={business.sinpe_bank ?? ""}
              whatsappNumber={business.whatsapp_number ?? ""}
              currency={business.currency ?? "CRC"}
              cancellationPolicy={business.cancellation_policy ?? undefined}
              createAppointment={createAppointment}
            />
          )}
        </main>

        <footer className="mt-auto border-t border-slate-200 bg-white px-4 py-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <div className="flex size-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-base leading-none text-[#e9cece]">
                ✦
              </div>
              <span className="serif-heading text-base font-medium tracking-tight">NailFlow</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 NailFlow. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
