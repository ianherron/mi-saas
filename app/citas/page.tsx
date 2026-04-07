import { revalidatePath } from "next/cache";
import { createClient, getBusiness } from "../../lib/supabase-server";
import {
  LayoutDashboard,
  Clock,
  Sparkles,
  Images,
  Scissors,
  CreditCard,
  BarChart3,
  User,
} from "lucide-react";
import AppointmentRow from "./AppointmentRow";

export default async function CitasPage() {
  const supabase = await createClient();
  const business = await getBusiness();

  if (!business) return <p>No se encontró tu negocio.</p>;

  async function cancelAppointment(id: number) {
  "use server";
  const supabase = await createClient();

  const { data: appointment } = await supabase
    .from("appointments")
    .select(`*, services (name)`)
    .eq("id", id)
    .single();

  await supabase.from("appointments").update({ status: "cancelled" }).eq("id", id);

  if (appointment?.email) {
    const { resend } = await import("../../lib/resend");
    await resend.emails.send({
      from: "NailFlow <hola@nailflow.app>",
      to: appointment.email,
      subject: "Tu cita ha sido cancelada",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fafafa;">
          <div style="background: white; border-radius: 12px; padding: 32px; border: 1px solid #f0eaea;">
            <h1 style="font-size: 24px; font-weight: bold; color: #2d2424; margin: 0 0 8px;">Cita cancelada</h1>
            <p style="color: #846262; margin: 0 0 24px;">Hola ${appointment.client_name}, tu cita ha sido cancelada.</p>
            <div style="border-top: 1px solid #f0eaea; padding-top: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #846262; font-size: 14px;">Servicio</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${appointment.services?.name ?? "—"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #846262; font-size: 14px;">Fecha</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${appointment.date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #846262; font-size: 14px;">Hora</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${appointment.time}</td>
                </tr>
              </table>
            </div>
            <p style="margin: 24px 0 0; font-size: 12px; color: #846262; text-align: center;">
              Si tienes dudas contáctanos · NailFlow
            </p>
          </div>
        </div>
      `,
    });
  }

  revalidatePath("/citas");
  revalidatePath("/dashboard");
}

async function completeAppointment(id: number) {
  "use server";
  const supabase = await createClient();
  const business = await getBusiness();

  const { data: appointment } = await supabase
    .from("appointments")
    .select(`*, services (name)`)
    .eq("id", id)
    .single();

  await supabase.from("appointments").update({ status: "completed" }).eq("id", id);

  if (appointment?.email) {
    const { resend } = await import("../../lib/resend");
    await resend.emails.send({
      from: "NailFlow <hola@nailflow.app>",
      to: appointment.email,
      subject: "¡Gracias por tu visita! 💅",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fafafa;">
          <div style="background: white; border-radius: 12px; padding: 32px; border: 1px solid #f0eaea;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="font-size: 24px; font-weight: bold; color: #2d2424; margin: 0;">✦ NailFlow</h1>
            </div>
            <h2 style="font-size: 20px; font-weight: bold; color: #2d2424; margin: 0 0 8px;">¡Gracias por tu visita! 💅</h2>
            <p style="color: #846262; margin: 0 0 24px;">Hola ${appointment.client_name}, fue un placer atenderte. Esperamos verte pronto en <strong>${business?.name ?? "nuestro salón"}</strong>.</p>
            <div style="border-top: 1px solid #f0eaea; padding-top: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #846262; font-size: 14px;">Servicio</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${appointment.services?.name ?? "—"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #846262; font-size: 14px;">Fecha</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${appointment.date}</td>
                </tr>
              </table>
            </div>
            <a href="https://nailflow.app/reservar/${business?.slug}" style="display: block; text-align: center; background: #e9cece; color: #2d2424; font-weight: bold; padding: 14px 32px; border-radius: 12px; text-decoration: none; margin-top: 24px;">
              Reservar otra cita
            </a>
            <p style="margin: 24px 0 0; font-size: 12px; color: #846262; text-align: center;">
              NailFlow · El aliado perfecto para tu salón
            </p>
          </div>
        </div>
      `,
    });
  }

  revalidatePath("/citas");
  revalidatePath("/dashboard");
}

  const { data: appointments, error } = await supabase
    .from("appointments")
    .select(`*, services (name)`)
    .eq("business_id", business.id)
    .eq("status", "active")
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Costa_Rica",
  });
  const todayAppts = appointments?.filter((a) => a.date === today) ?? [];
  const upcomingAppts = appointments?.filter((a) => a.date > today) ?? [];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 flex-col border-r border-slate-100 bg-white lg:flex">
        <div className="flex h-14 items-center gap-2 border-b border-slate-100 px-5">
          <div className="flex size-7 items-center justify-center rounded-md bg-[#e9cece] text-[#2d2424] text-xs">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="serif-heading text-sm font-semibold tracking-tight">
            NailFlow
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          <a
            href="/dashboard"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </a>
          <a
            href="/citas"
            className="flex items-center gap-3 rounded-md bg-[#e9cece]/20 px-3 py-2 text-sm font-medium text-slate-900"
          >
            <Clock className="h-4 w-4" /> Citas
          </a>
          <a
            href="/servicios"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Scissors className="h-4 w-4" /> Servicios
          </a>
          <a
            href="/galeria"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <span>
              <Images className="h-4 w-4" />
            </span>{" "}
            Galería
          </a>
          <a
            href="/pagos"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <CreditCard className="h-4 w-4" /> Pagos
          </a>
          <a
            href="/reportes"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <BarChart3 className="h-4 w-4" /> Reportes
          </a>
          <a
            href="/perfil"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <User className="h-4 w-4" /> Perfil
          </a>
        </nav>
      </aside>

      {/* Mobile header */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-100 bg-white px-4 lg:hidden"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 0px)",
          height: "calc(3.5rem + env(safe-area-inset-top))",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="serif-heading text-sm font-semibold">NailFlow</span>
        </div>
        <a
          href="/dashboard"
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          ← Volver
        </a>
      </header>

      <div className="lg:pl-60">
        <main className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-10">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="serif-heading text-2xl font-semibold tracking-tight text-slate-900">
              Citas
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {appointments?.length ?? 0} citas programadas en total
            </p>
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-500">
              Error cargando citas: {error.message}
            </p>
          )}

          {!appointments?.length && !error && (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
              <p className="text-sm text-slate-400">
                Aún no hay citas registradas.
              </p>
            </div>
          )}

          {/* Citas de hoy */}
          {todayAppts.length > 0 && (
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Hoy
                </h2>
                <span className="rounded-full bg-[#e9cece]/30 px-2 py-0.5 text-xs font-medium text-[#2d2424]">
                  {todayAppts.length} citas
                </span>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
                <ul className="divide-y divide-slate-50">
                  {todayAppts.map((appointment: any) => (
                    <AppointmentRow
                      key={appointment.id}
                      appointment={appointment}
                      cancelAppointment={cancelAppointment}
                      completeAppointment={completeAppointment}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Próximas citas */}
          {upcomingAppts.length > 0 && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Próximas
                </h2>
                <span className="text-xs text-slate-400">
                  {upcomingAppts.length} citas
                </span>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
                <ul className="divide-y divide-slate-50">
                  {upcomingAppts.map((appointment: any) => (
                    <AppointmentRow
                      key={appointment.id}
                      appointment={appointment}
                      cancelAppointment={cancelAppointment}
                      completeAppointment={completeAppointment}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}