import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";
import BookingForm from "../BookingForm";
import { resend } from "../../../lib/resend";
import { Sparkles } from "lucide-react";

export default async function ReservarSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: business } = await supabase
    .from("businesses")
    .select("*")
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

    // Validaciones
    if (!client_name?.trim() || client_name.trim().length < 2) return;
    if (!service_id || !business_id) return;
    if (!date || isNaN(new Date(date).getTime())) return;
    if (!time) return;
    if (isNaN(duration) || duration <= 0) return;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    if (client_name.length > 100) return;

    if (!client_name || !service_id || !date || !time) return;

    const { data: service } = await supabase
      .from("services")
      .select("name, price")
      .eq("id", service_id)
      .single();

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
    });

    // Enviar correo si hay email
    if (email) {
      const result = await resend.emails.send({
        from: "NailFlow <hola@nailflow.app>",
        to: email,
        subject: "¡Tu cita ha sido confirmada! 💅",
        html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fafafa;">
          <div style="background: white; border-radius: 12px; padding: 32px; border: 1px solid #f0eaea;">
            <h1 style="font-size: 24px; font-weight: bold; color: #2d2424; margin: 0 0 8px;">¡Cita confirmada! ✓</h1>
            <p style="color: #846262; margin: 0 0 24px;">Hola ${client_name}, tu reserva fue registrada exitosamente.</p>
            
            <div style="border-top: 1px solid #f0eaea; padding-top: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #846262; font-size: 14px;">Servicio</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${service?.name ?? "—"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #846262; font-size: 14px;">Fecha</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #846262; font-size: 14px;">Hora</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${time}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #846262; font-size: 14px;">Duración</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${duration} min</td>
                </tr>
                <tr style="border-top: 1px solid #f0eaea;">
                  <td style="padding: 12px 0 0; font-weight: 700; color: #2d2424; font-size: 14px;">Precio</td>
                  <td style="padding: 12px 0 0; font-weight: 700; color: #e9cece; font-size: 16px; text-align: right;">₡${total_price?.toLocaleString() ?? "—"}</td>
                </tr>
              </table>
            </div>

            <p style="margin: 24px 0 0; font-size: 12px; color: #846262; text-align: center;">
              NailFlow · El aliado perfecto para tu salón
            </p>
          </div>
        </div>
      `,
      });
      console.log("resend result:", result);
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
        html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fafafa;">
        <div style="background: white; border-radius: 12px; padding: 32px; border: 1px solid #f0eaea;">
          <h1 style="font-size: 24px; font-weight: bold; color: #2d2424; margin: 0 0 8px;">Nueva reserva 💅</h1>
          <p style="color: #846262; margin: 0 0 24px;">${client_name} ha reservado una cita.</p>
          <div style="border-top: 1px solid #f0eaea; padding-top: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #846262; font-size: 14px;">Cliente</td>
                <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${client_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #846262; font-size: 14px;">Servicio</td>
                <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${service?.name ?? "—"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #846262; font-size: 14px;">Fecha</td>
                <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #846262; font-size: 14px;">Hora</td>
                <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${time}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #846262; font-size: 14px;">Teléfono</td>
                <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${phone || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #846262; font-size: 14px;">Duración</td>
                <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${duration} min</td>
              </tr>
              <tr style="border-top: 1px solid #f0eaea;">
                <td style="padding: 12px 0 0; font-weight: 700; color: #2d2424; font-size: 14px;">Total</td>
                <td style="padding: 12px 0 0; font-weight: 700; color: #e9cece; font-size: 16px; text-align: right;">₡${total_price?.toLocaleString() ?? "—"}</td>
              </tr>
            </table>
            ${
              reference_image
                ? `
  <div style="margin-top: 20px; border-top: 1px solid #f0eaea; padding-top: 20px;">
    <p style="color: #846262; font-size: 14px; margin: 0 0 12px;">Foto de referencia:</p>
    <img src="${reference_image}" alt="Referencia" style="width: 200px; height: 200px; object-fit: cover; border-radius: 12px;" />
  </div>
`
                : ""
            }
          </div>
          <p style="margin: 24px 0 0; font-size: 12px; color: #846262; text-align: center;">
            NailFlow · El aliado perfecto para tu salón
          </p>
        </div>
      </div>
    `,
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
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
              <Sparkles className="h-4 w-4" />
            </div>
            <h1 className="serif-heading text-xl font-bold tracking-tight">
              {business.name}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-right md:block"></div>
          </div>
        </header>

        <main className="flex flex-1 justify-center px-4 py-8 md:px-0">
          {services && (
            <BookingForm
              services={services}
              timeSlots={timeSlots ?? []}
              extras={extras ?? []}
              businessId={business.id}
              workingDays={workingDays}
              gallery={galleryImages ?? []}
              createAppointment={createAppointment}
            />
          )}
        </main>

        <footer className="mt-auto border-t border-slate-200 bg-white px-4 py-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold">NailFlow</span>
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
