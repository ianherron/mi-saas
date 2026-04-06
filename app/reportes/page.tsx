import { createClient, getBusiness } from "../../lib/supabase-server";
import {
  LayoutDashboard, Clock, Scissors, Images, CreditCard, BarChart3,
  DollarSign, CalendarCheck, CalendarX,
} from "lucide-react";
import { Sparkles } from "lucide-react";
import ReportesChart from "./ReportesChart";
import { MonthSelector } from "./MonthSelector";
import { StatCard } from "./StatCard";

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

  // Mes anterior para comparación
  const prevMonth = new Date(year, month - 2, 1);
  const prevSelectedMonth = prevMonth.toLocaleDateString("en-CA", { timeZone: "America/Costa_Rica" }).slice(0, 7);
  const prevFirstDay = `${prevSelectedMonth}-01`;
  const prevLastDay = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0)
    .toLocaleDateString("en-CA", { timeZone: "America/Costa_Rica" });

  const { data: appointments } = await supabase
    .from("appointments")
    .select("date, total_price, status")
    .eq("business_id", business.id)
    .gte("date", firstDay)
    .lte("date", lastDay);

  const { data: prevAppointments } = await supabase
    .from("appointments")
    .select("date, total_price, status")
    .eq("business_id", business.id)
    .gte("date", prevFirstDay)
    .lte("date", prevLastDay);

  const completed = appointments?.filter((a) => a.status === "completed") ?? [];
  const cancelled = appointments?.filter((a) => a.status === "cancelled") ?? [];
  const prevCompleted = prevAppointments?.filter((a) => a.status === "completed") ?? [];
  const prevCancelled = prevAppointments?.filter((a) => a.status === "cancelled") ?? [];

  const totalRevenue = completed.reduce((acc, a) => acc + (a.total_price ?? 0), 0);
  const prevRevenue = prevCompleted.reduce((acc, a) => acc + (a.total_price ?? 0), 0);
  const totalCompleted = completed.length;
  const totalCancelled = cancelled.length;

  const revenueChange = prevRevenue > 0
    ? Math.round(((totalRevenue - prevRevenue) / prevRevenue) * 100)
    : 0;
  const completedChange = prevCompleted.length > 0
    ? Math.round(((totalCompleted - prevCompleted.length) / prevCompleted.length) * 100)
    : 0;
  const cancelledChange = prevCancelled.length > 0
    ? Math.round(((totalCancelled - prevCancelled.length) / prevCancelled.length) * 100)
    : 0;

  const revenueByDay: Record<string, number> = {};
  completed.forEach((a) => {
    if (!revenueByDay[a.date]) revenueByDay[a.date] = 0;
    revenueByDay[a.date] += a.total_price ?? 0;
  });

  const chartData = Object.entries(revenueByDay)
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-CR", {
      style: "currency", currency: "CRC",
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 flex-col border-r border-slate-100 bg-white lg:flex">
        <div className="flex h-14 items-center gap-2 border-b border-slate-100 px-5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
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
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
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
            <Images className="h-4 w-4" /> Galería
          </a>
          <a
            href="/pagos"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <CreditCard className="h-4 w-4" /> Pagos
          </a>
          <a
            href="/reportes"
            className="flex items-center gap-3 rounded-md bg-[#e9cece]/20 px-3 py-2 text-sm font-medium text-slate-900"
          >
            <BarChart3 className="h-4 w-4" /> Reportes
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
        {/* Page header con MonthSelector */}
        <div className="px-4 lg:px-8">
          <div className="mx-auto flex max-w-4xl items-center justify-between py-4">
            <div>
              <h1 className="serif-heading text-xl text-[#2d2424]">
                Panel de Reportes
              </h1>
            </div>
            <MonthSelector selectedMonthStr={selectedMonth} />
          </div>
        </div>

        <main className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-10">
          <div className="mb-8">
            <h2 className="serif-heading text-3xl text-[#2d2424]">
              Resumen del Mes
            </h2>
            <p className="mt-1 text-[#846262]">
              Visualiza el rendimiento de tu negocio
            </p>
          </div>

          {/* Cards */}
          <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Ingresos del Mes"
              value={formatCurrency(totalRevenue)}
              change={revenueChange}
              icon={<DollarSign className="h-5 w-5" />}
            />
            <StatCard
              title="Citas Completadas"
              value={totalCompleted.toString()}
              change={completedChange}
              icon={<CalendarCheck className="h-5 w-5" />}
            />
            <StatCard
              title="Citas Canceladas"
              value={totalCancelled.toString()}
              change={cancelledChange}
              variant="warning"
              icon={<CalendarX className="h-5 w-5" />}
            />
          </div>

          {/* Gráfico */}
          <div className="rounded-2xl border border-[#e9cece]/60 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="serif-heading text-xl text-[#2d2424]">
                  Ingresos Diarios
                </h3>
                <p className="text-sm text-[#846262]">
                  Tendencia de ingresos durante el mes
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#e9cece]" />
                <span className="text-xs text-[#846262]">Ingresos</span>
              </div>
            </div>
            {chartData.length === 0 ? (
              <div className="flex h-48 items-center justify-center">
                <p className="text-sm text-slate-400">
                  No hay ingresos registrados este mes.
                </p>
              </div>
            ) : (
              <ReportesChart data={chartData} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}