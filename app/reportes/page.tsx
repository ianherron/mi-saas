import { createClient, getBusiness } from "../../lib/supabase-server";
import {
  LayoutDashboard,
  Clock,
  Scissors,
  Images,
  CreditCard,
  BarChart3,
} from "lucide-react";
import { Sparkles } from "lucide-react";
import ReportesChart from "./ReportesChart";
import MonthSelector from "./MonthSelector";

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
    now
      .toLocaleDateString("en-CA", { timeZone: "America/Costa_Rica" })
      .slice(0, 7);
  const [year, month] = selectedMonth.split("-").map(Number);

  const firstDay = new Date(year, month - 1, 1).toLocaleDateString("en-CA", {
    timeZone: "America/Costa_Rica",
  });
  const lastDay = new Date(year, month, 0).toLocaleDateString("en-CA", {
    timeZone: "America/Costa_Rica",
  });

  const { data: appointments } = await supabase
    .from("appointments")
    .select("date, total_price, status")
    .eq("business_id", business.id)
    .gte("date", firstDay)
    .lte("date", lastDay);

  const completed = appointments?.filter((a) => a.status === "completed") ?? [];
  const cancelled = appointments?.filter((a) => a.status === "cancelled") ?? [];

  const totalRevenue = completed.reduce(
    (acc, a) => acc + (a.total_price ?? 0),
    0,
  );
  const totalCompleted = completed.length;
  const totalCancelled = cancelled.length;

  // Ingresos por día
  const revenueByDay: Record<string, number> = {};
  completed.forEach((a) => {
    if (!revenueByDay[a.date]) revenueByDay[a.date] = 0;
    revenueByDay[a.date] += a.total_price ?? 0;
  });

  const chartData = Object.entries(revenueByDay)
    .map(([date, total]) => ({
      date: new Date(date + "T12:00:00").toLocaleDateString("es-CR", {
        day: "numeric",
        month: "short",
      }),
      total,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const monthName = now.toLocaleDateString("es-CR", {
    month: "long",
    year: "numeric",
  });

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
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-100 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">NailFlow</span>
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="serif-heading text-2xl font-semibold tracking-tight text-slate-900">
                Reportes
              </h1>
              <p className="mt-1 text-sm text-slate-500 capitalize">
                {new Date(year, month - 1, 1).toLocaleDateString("es-CR", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <MonthSelector currentMonth={selectedMonth} />
          </div>

          {/* Cards */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Ingresos del mes
              </p>
              <p className="mt-2 text-3xl font-semibold text-black">
                ₡{totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Citas completadas
              </p>
              <p className="mt-2 text-3xl font-semibold text-black-600">
                {totalCompleted}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Citas canceladas
              </p>
              <p className="mt-2 text-3xl font-semibold text-black-400">
                {totalCancelled}
              </p>
            </div>
          </div>

          {/* Gráfico */}
          <div className="rounded-xl border border-slate-100 bg-white p-6">
            <h2 className="mb-6 text-sm font-semibold text-slate-900">
              Ingresos por día
            </h2>
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