import { createClient, getBusiness } from "../../lib/supabase-server";
import { ChevronDown } from "lucide-react";
import ReportesChart from "./ReportesChart";
import { MonthSelector } from "./MonthSelector";
import AppSidebar, { AppMobileHeader } from "../_components/AppSidebar";
import { getCurrencySymbol } from "../../lib/utils";

const WEEKDAYS_ES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábados"];

export default async function ReportesPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const business = await getBusiness();
  if (!business) return <p>No se encontró tu negocio.</p>;

  const now = new Date();
  const selectedMonth =
    params.month ??
    now.toLocaleDateString("en-CA", { timeZone: "America/Costa_Rica" }).slice(0, 7);
  const [year, month] = selectedMonth.split("-").map(Number);

  const firstDay = `${selectedMonth}-01`;
  const lastDay = new Date(year, month, 0).toLocaleDateString("en-CA", {
    timeZone: "America/Costa_Rica",
  });

  // Previous month for comparison
  const prevMonth = new Date(year, month - 2, 1);
  const prevSelectedMonth = prevMonth
    .toLocaleDateString("en-CA", { timeZone: "America/Costa_Rica" })
    .slice(0, 7);
  const prevFirstDay = `${prevSelectedMonth}-01`;
  const prevLastDay = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0)
    .toLocaleDateString("en-CA", { timeZone: "America/Costa_Rica" });

  // Pull this month AND service names (join) for distribution
  const { data: appointments } = await supabase
    .from("appointments")
    .select(`date, total_price, status, service_id, services (name)`)
    .eq("business_id", business.id)
    .gte("date", firstDay)
    .lte("date", lastDay);

  const { data: prevAppointments } = await supabase
    .from("appointments")
    .select("total_price, status")
    .eq("business_id", business.id)
    .gte("date", prevFirstDay)
    .lte("date", prevLastDay);

  const completed = appointments?.filter((a) => a.status === "completed") ?? [];
  const cancelled = appointments?.filter((a) => a.status === "cancelled") ?? [];
  const prevCompleted = prevAppointments?.filter((a) => a.status === "completed") ?? [];

  const totalRevenue = completed.reduce((acc, a) => acc + (a.total_price ?? 0), 0);
  const prevRevenue = prevCompleted.reduce((acc, a) => acc + (a.total_price ?? 0), 0);
  const totalCompleted = completed.length;
  const totalCancelled = cancelled.length;
  const avgPerAppt = totalCompleted > 0 ? Math.round(totalRevenue / totalCompleted) : 0;
  const prevAvg = prevCompleted.length > 0 ? Math.round(prevRevenue / prevCompleted.length) : 0;

  const pct = (curr: number, prev: number) =>
    prev > 0 ? Math.round(((curr - prev) / prev) * 100) : 0;

  const revenueChange = pct(totalRevenue, prevRevenue);
  const completedChange = pct(totalCompleted, prevCompleted.length);
  const cancelledChange = pct(
    totalCancelled,
    prevAppointments?.filter((a) => a.status === "cancelled").length ?? 0,
  );
  const avgChange = pct(avgPerAppt, prevAvg);

  // Chart data by day
  const revenueByDay: Record<string, number> = {};
  completed.forEach((a) => {
    revenueByDay[a.date] = (revenueByDay[a.date] ?? 0) + (a.total_price ?? 0);
  });
  const chartData = Object.entries(revenueByDay)
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Best single day
  const bestDay = chartData.reduce(
    (a, b) => (b.total > a.total ? b : a),
    { date: "", total: 0 },
  );
  const bestDayLabel = bestDay.date
    ? new Date(bestDay.date + "T12:00:00").toLocaleDateString("es-CR", {
        day: "numeric",
        month: "short",
      })
    : "—";

  // Distribution by service
  const byService: Record<string, { count: number; total: number }> = {};
  completed.forEach((a: any) => {
    const name = a.services?.name ?? "Sin servicio";
    if (!byService[name]) byService[name] = { count: 0, total: 0 };
    byService[name].count += 1;
    byService[name].total += a.total_price ?? 0;
  });
  const serviceList = Object.entries(byService)
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 4);
  const serviceMax = Math.max(1, ...serviceList.map((s) => s.total));

  // Best weekday observation
  const byWeekday = [0, 0, 0, 0, 0, 0, 0];
  completed.forEach((a) => {
    const d = new Date(a.date + "T12:00:00").getDay();
    byWeekday[d] += a.total_price ?? 0;
  });
  const bestWeekday = byWeekday.indexOf(Math.max(...byWeekday));
  const bestWeekdayLabel = totalCompleted > 0 ? WEEKDAYS_ES[bestWeekday] : null;

  const symbol = getCurrencySymbol(business.currency ?? "CRC");
  const fmt = (v: number) => `${symbol}${v.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-[#fbf9f9] font-sans text-[#2d2424]">
      <AppSidebar active="reportes" />
      <AppMobileHeader />

      <div className="lg:pl-[220px]">
        <main className="mx-auto max-w-5xl px-4 py-8 lg:px-10 lg:py-10">
          {/* Editorial header */}
          <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                Mes seleccionado · Tu negocio
              </p>
              <h1 className="serif-heading mt-2 text-3xl font-medium leading-tight tracking-tight lg:text-4xl">
                {fmt(totalRevenue)}{" "}
                <em className="font-normal italic text-[#846262]">este mes</em>.
              </h1>
              {prevRevenue > 0 && (
                <p className="mt-1.5 text-sm text-[#846262]">
                  {revenueChange >= 0 ? "+" : ""}
                  {revenueChange}% vs mes anterior.
                </p>
              )}
            </div>
            <MonthSelector selectedMonthStr={selectedMonth} />
          </header>

          {/* Sub-stats */}
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <SubStat label="Completadas" value={String(totalCompleted)} change={completedChange} />
            <SubStat label="Canceladas"  value={String(totalCancelled)} change={cancelledChange} variant="warning" />
            <SubStat
              label="Promedio por cita"
              value={fmt(avgPerAppt)}
              change={avgChange}
              className="col-span-2 sm:col-span-1"
            />
          </div>

          {/* Chart card */}
          <section className="mb-4 rounded-3xl border border-[#2d2424]/[0.08] bg-white p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                  Ingresos diarios
                </p>
                <h3 className="serif-heading mt-1 text-xl font-medium leading-tight tracking-tight">
                  Tu ritmo,{" "}
                  <em className="font-normal italic text-[#846262]">día a día</em>.
                </h3>
              </div>
              {bestDay.total > 0 && (
                <div className="text-right">
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                    Día más fuerte
                  </p>
                  <p className="serif-heading mt-0.5 text-lg font-medium tracking-tight text-[#2d2424]">
                    {bestDayLabel} · {fmt(bestDay.total)}
                  </p>
                </div>
              )}
            </div>

            {chartData.length === 0 ? (
              <div className="flex h-48 items-center justify-center">
                <p className="text-sm text-[#b89090]">
                  No hay citas registradas para este período.
                </p>
              </div>
            ) : (
              <ReportesChart data={chartData} />
            )}
          </section>

          {/* Bottom row */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
            {/* Distribution */}
            <section className="rounded-3xl border border-[#2d2424]/[0.08] bg-white p-5 sm:p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                Distribución por servicio
              </p>
              {serviceList.length === 0 ? (
                <p className="mt-3 text-sm text-[#b89090]">
                  Sin servicios completados este mes.
                </p>
              ) : (
                <div className="mt-3 flex flex-col gap-3">
                  {serviceList.map((s) => {
                    const w = Math.max(4, (s.total / serviceMax) * 100);
                    return (
                      <div key={s.name}>
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <span className="truncate text-[13px] font-medium text-[#2d2424]">
                            {s.name}
                          </span>
                          <span className="shrink-0 text-xs text-[#846262]">
                            {s.count} citas ·{" "}
                            <span className="font-medium text-[#2d2424]">
                              {fmt(s.total)}
                            </span>
                          </span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-[#f4ecec]">
                          <div className="h-full bg-[#2d2424]" style={{ width: `${w}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Observation (dark) */}
            <section className="relative overflow-hidden rounded-3xl bg-[#2d2424] p-5 text-[#fbf9f9] sm:p-6">
              <span
                aria-hidden
                className="serif-heading pointer-events-none absolute -right-4 -top-6 text-[120px] leading-none text-[#e9cece]/10"
              >
                ✦
              </span>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#e9cece]">
                Tu observación
              </p>
              {bestWeekdayLabel ? (
                <>
                  <p className="serif-heading mt-2 text-xl font-medium leading-tight tracking-tight">
                    Los{" "}
                    <em className="font-normal italic text-[#e9cece]">
                      {bestWeekdayLabel}
                    </em>{" "}
                    son tu mejor día.
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#fbf9f9]/70">
                    Más ingresos cayeron ese día del mes. ¿Considerás abrir más horas?
                  </p>
                </>
              ) : (
                <p className="serif-heading mt-2 text-xl font-medium leading-tight tracking-tight">
                  Aún no hay <em className="font-normal italic text-[#e9cece]">patrones</em> este mes.
                </p>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function SubStat({
  label,
  value,
  change,
  variant,
  className,
}: {
  label: string;
  value: string;
  change: number;
  variant?: "warning";
  className?: string;
}) {
  const positive = change > 0;
  const neutral = change === 0;
  const goodWhenUp = variant !== "warning";
  const tone = neutral
    ? "outline"
    : (positive === goodWhenUp ? "success" : "danger");
  const toneClasses: Record<string, string> = {
    outline: "bg-transparent text-[#846262] border border-[#2d2424]/[0.12]",
    success: "bg-[#6b8a5e]/[0.13] text-[#6b8a5e]",
    danger:  "bg-[#b86060]/[0.13] text-[#b86060]",
  };
  return (
    <div
      className={[
        "rounded-2xl border border-[#2d2424]/[0.08] bg-white p-4 sm:p-5",
        className ?? "",
      ].join(" ")}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
        {label}
      </p>
      <p className="serif-heading mt-1.5 text-2xl font-medium leading-none tracking-tight text-[#2d2424]">
        {value}
      </p>
      <div className="mt-2 flex items-center gap-1.5">
        <span
          className={[
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
            toneClasses[tone],
          ].join(" ")}
        >
          {positive ? "↑" : neutral ? "·" : "↓"} {Math.abs(change)}%
        </span>
        <span className="text-[11px] text-[#846262]">vs mes anterior</span>
      </div>
    </div>
  );
}
