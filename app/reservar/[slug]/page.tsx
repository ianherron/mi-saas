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
    .select("id, name, slug, owner_name, email, payments_enabled, payment_percentage, sinpe_number, sinpe_bank, whatsapp_number, currency, cover_image_url, bio, cancellation_policy, profile_image_url")
    .eq("slug", slug)
    .single();

  if (!business) notFound();

  async function createAppointment(formData: FormData) {
    "use server";
    const client_name = formData.get("client_name") as string;
    const service_id = formData.get("service_id") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const duration = parseInt(formData.get("duration") as string);
    const business_id = formData.get("business_id") as string;
    const total_price = parseInt(formData.get("total_price") as string);
    const reference_image = formData.get("reference_image") as string;
    const payment_proof = formData.get("payment_proof") as string;

    // Validaciones
    if (!client_name?.trim() || client_name.trim().length < 2) return;
    if (client_name.length > 100) return;
    if (!service_id || !business_id) return;
    if (!date || isNaN(new Date(date).getTime())) return;
    const today = new Date().toISOString().split("T")[0];
    if (date < today) return;
    if (!time) return;
    if (isNaN(duration) || duration <= 0) return;
    if (email && !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) return;
    if (phone && !/^[\d\s\-+]{7,15}$/.test(phone)) return;

    if (!client_name || !service_id || !date || !time) return;

    const { data: service } = await supabase
      .from("services")
      .select("name, price")
      .eq("id", service_id)
      .eq("business_id", business_id)
      .single();

    if (!service) return;

    const safePrice = typeof total_price === "number" && !isNaN(total_price) ? total_price : 0;

    await supabase.from("appointments").insert({
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
    });

    // Enviar correo si hay email
    if (email) {
      const result = await resend.emails.send({
        from: "NailFlow <hola@nailflow.app>",
        to: email,
        subject: "¡Tu cita ha sido confirmada! 💅",
        html: renderEmail({
          preheader: `Tu reserva del ${date} a las ${time} quedó confirmada.`,
          eyebrow: "Cita confirmada",
          heading: `Te esperamos, <em>${client_name}</em>.`,
          intro: "Tu reserva quedó registrada. Estos son los detalles.",
          rows: [
            { label: "Servicio", value: service?.name ?? "—" },
            { label: "Fecha", value: date },
            { label: "Hora", value: time },
            { label: "Duración", value: `${duration} min` },
            { label: "Total", value: `₡${safePrice.toLocaleString()}`, total: true },
          ],
          footer: "✦ NailFlow · El aliado perfecto para tu salón",
        }),
      });
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
    .select("*")
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
          <div className="flex items-center gap-4">
            <div className="hidden text-right md:block"></div>
          </div>
        </header>

        {/* Hero: banner + sección de perfil con transición seamless */}
        {business.cover_image_url ? (
          <>
            <div className="relative w-full aspect-[4/3] md:aspect-[16/5] [clip-path:ellipse(110%_100%_at_50%_0%)]">
              <img
                src={business.cover_image_url}
                alt={business.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Gradiente unificado: avatar + nombre/bio en el mismo fondo */}
            <div className="bg-gradient-to-b from-pink-50 to-white">
              <div className="relative z-10 flex justify-center -mt-10 pb-2">
                {business.profile_image_url ? (
                  <img
                    src={business.profile_image_url}
                    alt={business.owner_name ?? business.name}
                    className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md ring-4 ring-pink-50"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[#e9cece] shadow-md text-2xl font-semibold text-[#2d2424] ring-4 ring-pink-50">
                    {business.owner_name?.charAt(0).toUpperCase() ?? "?"}
                  </div>
                )}
              </div>
              <div className="px-6 pb-6 pt-2 text-center">
                <h2 className="serif-heading text-2xl font-bold text-[#2d2424]">
                  {business.name}
                </h2>
                {business.owner_name && (
                  <p className="mt-1 text-sm text-[#846262]">
                    by {business.owner_name}
                  </p>
                )}
                {business.bio && (
                  <p className="mx-auto mt-3 max-w-xl text-sm text-[#846262]">
                    {business.bio}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Sin banner: gradiente cubre toda la zona superior */
          <div className="bg-gradient-to-b from-pink-50 to-white">
            {(business.profile_image_url || business.owner_name) && (
              <div className="flex justify-center pt-10 pb-2">
                {business.profile_image_url ? (
                  <img
                    src={business.profile_image_url}
                    alt={business.owner_name ?? business.name}
                    className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[#e9cece] shadow-md text-2xl font-semibold text-[#2d2424]">
                    {business.owner_name?.charAt(0).toUpperCase() ?? "?"}
                  </div>
                )}
              </div>
            )}
            <div className="px-6 pb-6 pt-4 text-center">
              <h2 className="serif-heading text-2xl font-bold text-[#2d2424]">
                {business.name}
              </h2>
              {business.owner_name && (
                <p className="mt-1 text-sm text-[#846262]">
                  by {business.owner_name}
                </p>
              )}
              {business.bio && (
                <p className="mx-auto mt-3 max-w-xl text-sm text-[#846262]">
                  {business.bio}
                </p>
              )}
            </div>
          </div>
        )}

        <main className="flex flex-1 justify-center px-4 py-8 md:px-0">
          {!services || services.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
              <p className="text-lg font-medium text-[#2d2424]">Aún no hay servicios disponibles</p>
              <p className="mt-2 text-sm text-[#846262]">Este negocio aún no tiene servicios configurados. Intenta más tarde.</p>
            </div>
          ) : (
            <BookingForm
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
              © 2026 NailFlow Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
