import { revalidatePath } from "next/cache";
import { createClient, getBusiness } from "../../lib/supabase-server";
import { escapeHtml, getCurrencySymbol } from "../../lib/utils";
import AppSidebar, { AppMobileHeader } from "../_components/AppSidebar";
import AppointmentRow from "./AppointmentRow";
import CitasRealtime from "./CitasRealtime";
import { Filter } from "lucide-react";

// ----- helpers -----
const WEEKDAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function isoDate(d: Date) {
  return d.toLocaleDateString("en-CA", { timeZone: "America/Costa_Rica" });
}

function dayLabel(iso: string, today: string): { label: string; sublabel: string } {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const dow = dt.getDay();
  if (iso === today) {
    return {
      label: "Hoy",
      sublabel: `${WEEKDAYS[dow]}, ${d} de ${MONTHS[m - 1]}`,
    };
  }
  const tomorrow = isoDate(new Date(new Date(today + "T12:00:00").getTime() + 86_400_000));
  if (iso === tomorrow) {
    return {
      label: "Mañana",
      sublabel: `${WEEKDAYS[dow]}, ${d} de ${MONTHS[m - 1]}`,
    };
  }
  return {
    label: `${WEEKDAYS[dow]} ${d}`.replace(/^\w/, (c) => c.toUpperCase()),
    sublabel: `${d} de ${MONTHS[m - 1]}`,
  };
}

function timeParts(t: string): { num: string; period: string } {
  // Handles "9:00 AM" / "09:00" / "09:00:00"
  const ampm = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)$/i);
  if (ampm) {
    const period = /p/i.test(ampm[3]) ? "PM" : "AM";
    return { num: `${ampm[1]}:${ampm[2]}`, period };
  }
  const m24 = t.match(/^(\d{1,2}):(\d{2})/);
  if (m24) {
    const h = parseInt(m24[1], 10);
    const period = h >= 12 ? "PM" : "AM";
    const h12 = ((h + 11) % 12) + 1;
    return { num: `${h12}:${m24[2]}`, period };
  }
  return { num: t, period: "" };
}

// ===== Page =====
export default async function CitasPage() {
  const supabase = await createClient();
  const business = await getBusiness();

  if (!business) return <p>No se encontró tu negocio.</p>;

  // ----- Server actions (unchanged from current page) -----
  async function cancelAppointment(id: number) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;

    const { data: appointment } = await supabase
      .from("appointments")
      .select(`*, services (name)`)
      .eq("id", id)
      .eq("business_id", business.id)
      .single();

    if (!appointment) return;

    await supabase
      .from("appointments")
      .update({ status: "cancelled" })
      .eq("id", id)
      .eq("business_id", business.id);

    if (appointment?.email) {
      const { resend } = await import("../../lib/resend");
      await resend.emails.send({
        from: "NailFlow <hola@nailflow.app>",
        to: appointment.email,
        subject: "Tu cita ha sido cancelada",
        html: `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fafafa;"><div style="background: white; border-radius: 12px; padding: 32px; border: 1px solid #f0eaea;"><h1 style="font-size: 24px; font-weight: bold; color: #2d2424; margin: 0 0 8px;">Cita cancelada</h1><p style="color: #846262; margin: 0 0 24px;">Hola ${escapeHtml(appointment.client_name)}, tu cita ha sido cancelada.</p><div style="border-top: 1px solid #f0eaea; padding-top: 20px;"><table style="width: 100%; border-collapse: collapse;"><tr><td style="padding: 8px 0; color: #846262; font-size: 14px;">Servicio</td><td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${appointment.services?.name ?? "—"}</td></tr><tr><td style="padding: 8px 0; color: #846262; font-size: 14px;">Fecha</td><td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${appointment.date}</td></tr><tr><td style="padding: 8px 0; color: #846262; font-size: 14px;">Hora</td><td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${appointment.time}</td></tr></table></div><p style="margin: 24px 0 0; font-size: 12px; color: #846262; text-align: center;">Si tienes dudas contáctanos · NailFlow</p></div></div>`,
      });
    }

    revalidatePath("/citas");
    revalidatePath("/dashboard");
  }

  async function completeAppointment(id: number) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;

    const { data: appointment } = await supabase
      .from("appointments")
      .select(`*, services (name)`)
      .eq("id", id)
      .eq("business_id", business.id)
      .single();

    if (!appointment) return;

    await supabase
      .from("appointments")
      .update({ status: "completed" })
      .eq("id", id)
      .eq("business_id", business.id);

    if (appointment?.email) {
      const { resend } = await import("../../lib/resend");
      await resend.emails.send({
        from: "NailFlow <hola@nailflow.app>",
        to: appointment.email,
        subject: "¡Gracias por tu visita! 💅",
        html: `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fafafa;"><div style="background: white; border-radius: 12px; padding: 32px; border: 1px solid #f0eaea;"><div style="text-align: center; margin-bottom: 24px;"><h1 style="font-size: 24px; font-weight: bold; color: #2d2424; margin: 0;">✦ NailFlow</h1></div><h2 style="font-size: 20px; font-weight: bold; color: #2d2424; margin: 0 0 8px;">¡Gracias por tu visita! 💅</h2><p style="color: #846262; margin: 0 0 24px;">Hola ${escapeHtml(appointment.client_name)}, fue un placer atenderte.</p><div style="border-top: 1px solid #f0eaea; padding-top: 20px;"><table style="width: 100%; border-collapse: collapse;"><tr><td style="padding: 8px 0; color: #846262; font-size: 14px;">Servicio</td><td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${appointment.services?.name ?? "—"}</td></tr><tr><td style="padding: 8px 0; color: #846262; font-size: 14px;">Fecha</td><td style="padding: 8px 0; font-weight: 600; color: #2d2424; font-size: 14px; text-align: right;">${appointment.date}</td></tr></table></div><a href="https://nailflow.app/reservar/${business?.slug}" style="display: block; text-align: center; background: #e9cece; color: #2d2424; font-weight: bold; padding: 14px 32px; border-radius: 12px; text-decoration: none; margin-top: 24px;">Reservar otra cita</a></div></div>`,
      });
    }

    revalidatePath("/citas");
    revalidatePath("/dashboard");
  }

  // ----- Queries (unchanged) -----
  const today = isoDate(new Date());
  const symbol = getCurrencySymbol(business.currency ?? "CRC");

  const { data: appointments, error } = await supabase
    .from("appointments")
    .select(`*, services (name)`)
    .eq("business_id", business.id)
    .eq("status", "active")
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  // ----- NEW: group by date for the day-grouped layout -----
  const grouped = new Map<string, any[]>();
  for (const a of appointments ?? []) {
    if (!grouped.has(a.date)) grouped.set(a.date, []);
    grouped.get(a.date)!.push(a);
  }
  const dates = Array.from(grouped.keys()).sort();

  // ----- NEW: quick-stat derivations (read-only, same data) -----
  const todayList = grouped.get(today) ?? [];
  const todayMinutes = todayList.reduce((acc, a) => acc + (a.duration ?? 0), 0);
  const todayHours = (todayMinutes / 60).toFixed(todayMinutes % 60 ? 1 : 0);

  const weekEnd = isoDate(new Date(new Date(today + "T12:00:00").getTime() + 6 * 86_400_000));
  const weekAppts = (appointments ?? []).filter(
    (a) => a.date >= today && a.date <= weekEnd,
  );
  const weekRevenue = weekAppts.reduce((acc, a) => acc + (a.total_price ?? 0), 0);

  return (
    <div className="min-h-screen bg-[#fbf9f9] font-sans text-[#2d2424] lg:flex">
      <AppSidebar active="citas" />

      <div className="min-w-0 flex-1">
        <AppMobileHeader />
        <main className="mx-auto max-w-7xl px-4 py-8 lg:px-10 lg:py-10">
          {/* Editorial header */}
          <header className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                {appointments?.length ?? 0} citas activas
              </p>
              <h1 className="serif-heading mt-2 text-3xl font-medium leading-tight tracking-tight lg:text-4xl">
                Tu agenda,{" "}
                <em className="font-normal italic text-[#846262]">al día</em>.
              </h1>
            </div>
            <button
              type="button"
              className="hidden items-center gap-2 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 py-2 text-sm font-medium text-[#2d2424] sm:inline-flex"
            >
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
          </header>

          {error && (
            <p className="mb-4 text-sm text-red-500">
              Error cargando citas: {error.message}
            </p>
          )}

          {/* Quick stats */}
          <div className="mb-5 grid grid-cols-3 gap-3">
            {[
              { label: "Hoy",          value: String(todayList.length), sub: `${todayHours}h en agenda` },
              { label: "Esta semana",  value: String(weekAppts.length), sub: `${symbol}${weekRevenue.toLocaleString()} esperados` },
              { label: "Por confirmar", value: "0", sub: "todas confirmadas" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-[#2d2424]/[0.08] bg-white px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">{s.label}</p>
                <p className="serif-heading mt-1.5 text-2xl font-medium leading-none tracking-tight text-[#2d2424]">{s.value}</p>
                <p className="mt-1 text-[11px] text-[#846262] sm:text-xs">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {!appointments?.length && !error && (
            <div className="rounded-3xl border border-dashed border-[#e9cece] bg-white p-10 text-center">
              <p className="text-sm text-[#b89090]">Aún no hay citas registradas.</p>
            </div>
          )}

          {/* Day groups */}
          {dates.map((date) => {
            const rows = grouped.get(date)!;
            const { label, sublabel } = dayLabel(date, today);
            const isToday = date === today;
            return (
              <section
                key={date}
                className="mb-4 rounded-3xl border border-[#2d2424]/[0.08] bg-white px-5 py-5 sm:px-6 sm:py-6"
              >
                <div className="mb-3 flex items-end justify-between gap-2 border-b border-[#2d2424]/[0.08] pb-3">
                  <div>
                    <p className="serif-heading text-xl font-medium leading-tight tracking-tight text-[#2d2424]">
                      {label}
                      {isToday && rows.length >= 3 && (
                        <em className="font-normal italic text-[#846262]"> · tarde llena</em>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-[#846262] capitalize">{sublabel}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#e9cece] px-2.5 py-1 text-[11px] font-medium text-[#2d2424]">
                    {rows.length} citas
                  </span>
                </div>

                <ul className="divide-y divide-[#2d2424]/[0.06]">
                  {rows.map((a: any) => {
                    const t = timeParts(a.time);
                    return (
                      <AppointmentRow
                        key={a.id}
                        appointment={a}
                        timeNum={t.num}
                        timePeriod={t.period}
                        currencySymbol={symbol}
                        cancelAppointment={cancelAppointment}
                        completeAppointment={completeAppointment}
                      />
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </main>
      </div>

      <CitasRealtime businessId={business.id} />
    </div>
  );
}
