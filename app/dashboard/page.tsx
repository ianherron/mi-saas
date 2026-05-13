import { revalidatePath } from "next/cache";
import { createClient, getBusiness } from "../../lib/supabase-server";
import LogoutButton from "./LogoutButton";
import {
  CreditCard,
  Sparkles,
  LayoutDashboard,
  Clock,
  Images,
  Scissors,
  BarChart3,
  User,
} from "lucide-react";
import CurrencySelector from "./CurrencySelector";
import { getCurrencySymbol } from "../../lib/utils";
import OnboardingModal from "./OnboardingModal";
import DashboardRealtime from "./DashboardRealtime";
import DayStrip from "./DayStrip";
import WeekStrip from "./WeekStrip";
import LinkCard from "./LinkCard";
import UpcomingList from "./UpcomingList";

function isoDate(d: Date) {
  return d.toLocaleDateString("en-CA", { timeZone: "America/Costa_Rica" });
}

function lastSevenDays(today: string) {
  const [y, m, d] = today.split("-").map(Number);
  const base = new Date(Date.UTC(y, m - 1, d));
  const out: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const dt = new Date(base);
    dt.setUTCDate(base.getUTCDate() - i);
    out.push(dt.toISOString().slice(0, 10));
  }
  return out;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const business = await getBusiness();

  if (!business) return <p>No se encontró tu negocio.</p>;

  const today = isoDate(new Date());
  const weekDays = lastSevenDays(today);
  const weekStart = weekDays[0];

  const { data: upcoming } = await supabase
    .from("appointments")
    .select(`*, services (name)`)
    .eq("business_id", business.id)
    .eq("status", "active")
    .gte("date", today)
    .order("date", { ascending: true })
    .order("time", { ascending: true })
    .limit(5);

  const { data: newAppointments } = await supabase
    .from("appointments")
    .select("id")
    .eq("business_id", business.id)
    .eq("status", "active")
    // eslint-disable-next-line react-hooks/purity
    .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  const { data: todayAppointments } = await supabase
    .from("appointments")
    .select("time, client_name, total_price, duration")
    .eq("business_id", business.id)
    .eq("date", today)
    .in("status", ["active", "completed"])
    .order("time", { ascending: true });

  const todayCount = todayAppointments?.length ?? 0;
  const todayRevenue =
    todayAppointments?.reduce((acc, a) => acc + (a.total_price ?? 0), 0) ?? 0;

  const { data: weekAppts } = await supabase
    .from("appointments")
    .select("date, total_price")
    .eq("business_id", business.id)
    .gte("date", weekStart)
    .lte("date", today)
    .in("status", ["active", "completed"]);

  const weekData = weekDays.map((iso) => {
    const matches = weekAppts?.filter((a) => a.date === iso) ?? [];
    return {
      date: iso,
      count: matches.length,
      total: matches.reduce((acc, a) => acc + (a.total_price ?? 0), 0),
    };
  });
  const weekCount = weekData.reduce((acc, d) => acc + d.count, 0);
  const weekTotal = weekData.reduce((acc, d) => acc + d.total, 0);

  const { data: slotRows } = await supabase
    .from("time_slots")
    .select("time")
    .eq("business_id", business.id)
    .order("time", { ascending: true });
  const slotTimes: string[] = (slotRows ?? []).map((s) => s.time);

  const { data: workingDaysData } = await supabase
    .from("working_days")
    .select("day")
    .eq("business_id", business.id);
  const workingDays: number[] = (workingDaysData ?? []).map((d) => d.day);
  const todayDOW = new Date(`${today}T12:00:00`).getDay();
  const isWorkingDay = workingDays.length === 0 || workingDays.includes(todayDOW);

  const nextUpcoming = upcoming?.[0];

  async function completeOnboarding() {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;
    await supabase
      .from("businesses")
      .update({ onboarding_completed: true })
      .eq("id", business.id);
    revalidatePath("/dashboard");
  }

  const currency = business.currency ?? "CRC";
  const symbol = getCurrencySymbol(currency);
  const BOOKING_URL = `nailflow.app/reservar/${business.slug}`;
  const firstName = business.owner_name?.split(" ")[0] ?? "";

  return (
    <div className="min-h-screen bg-[#fbf9f9] font-sans text-[#2d2424]">
      {business.onboarding_completed === false && (
        <OnboardingModal completeOnboarding={completeOnboarding} />
      )}

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 flex-col border-r border-[#e9cece]/40 bg-[#fbf9f9] lg:flex">
        <div className="flex h-14 items-center gap-2 px-5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="serif-heading text-base font-medium tracking-tight">
            NailFlow
          </span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          <p className="px-3 pb-1 pt-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[#b89090]">
            Inicio
          </p>
          <a
            href="/dashboard"
            className="flex items-center gap-3 rounded-md bg-[#2d2424] px-3 py-2 text-sm font-medium text-[#fbf9f9]"
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </a>
          <a
            href="/citas"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#846262] transition-colors hover:bg-[#f4ecec] hover:text-[#2d2424]"
          >
            <Clock className="h-4 w-4" /> Citas
          </a>

          <p className="px-3 pb-1 pt-4 text-[10px] font-medium uppercase tracking-[0.15em] text-[#b89090]">
            Tu negocio
          </p>
          <a
            href="/servicios"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#846262] transition-colors hover:bg-[#f4ecec] hover:text-[#2d2424]"
          >
            <Scissors className="h-4 w-4" /> Servicios
          </a>
          <a
            href="/galeria"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#846262] transition-colors hover:bg-[#f4ecec] hover:text-[#2d2424]"
          >
            <Images className="h-4 w-4" /> Galería
          </a>
          <a
            href="/pagos"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#846262] transition-colors hover:bg-[#f4ecec] hover:text-[#2d2424]"
          >
            <CreditCard className="h-4 w-4" /> Pagos
          </a>
          <a
            href="/reportes"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#846262] transition-colors hover:bg-[#f4ecec] hover:text-[#2d2424]"
          >
            <BarChart3 className="h-4 w-4" /> Reportes
          </a>
          <a
            href="/perfil"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#846262] transition-colors hover:bg-[#f4ecec] hover:text-[#2d2424]"
          >
            <User className="h-4 w-4" /> Perfil
          </a>
        </nav>

        <div className="border-t border-[#e9cece]/40 p-3">
          <div className="flex items-center justify-between rounded-md px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-[#e9cece] text-xs font-semibold text-[#2d2424]">
                {business.owner_name?.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[100px] truncate text-sm font-medium text-[#2d2424]">
                {business.owner_name}
              </span>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between border-b border-[#e9cece]/40 bg-[#fbf9f9] px-4 lg:hidden"
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
        <LogoutButton />
      </header>

      {/* Main content */}
      <div className="lg:pl-60">
        <main className="mx-auto max-w-5xl px-4 py-8 lg:px-10 lg:py-10">
          {/* Editorial header */}
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
                {new Date().toLocaleDateString("es-CR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h1 className="serif-heading mt-2 text-3xl font-medium leading-tight tracking-tight text-[#2d2424] lg:text-4xl">
                Buenas, {firstName}.{" "}
                <em className="font-normal italic text-[#846262]">
                  Bienvenida de vuelta.
                </em>
              </h1>
            </div>
            <CurrencySelector
              businessId={business.id}
              currentCurrency={currency}
            />
          </div>

          {/* New-appointments banner */}
          {(newAppointments?.length ?? 0) > 0 && (
            <div className="mb-5 flex items-center justify-between rounded-2xl border border-[#e9cece] bg-[#f4ecec] px-5 py-3">
              <p className="text-sm font-medium text-[#2d2424]">
                <span className="text-[#b89090]">✦</span>&nbsp;&nbsp;Tenés{" "}
                {newAppointments!.length} cita
                {newAppointments!.length === 1 ? "" : "s"} nueva
                {newAppointments!.length === 1 ? "" : "s"} en las últimas 24
                horas
              </p>
              <a
                href="/citas"
                className="shrink-0 text-sm font-medium text-[#2d2424] hover:underline"
              >
                Ver citas →
              </a>
            </div>
          )}

          {/* Tu día */}
          <DayStrip
            today={today}
            appointments={todayAppointments ?? []}
            todayCount={todayCount}
            todayRevenue={todayRevenue}
            currencySymbol={symbol}
            nextUpcoming={nextUpcoming ?? undefined}
            isWorkingDay={isWorkingDay}
            slotTimes={slotTimes}
          />

          {/* Esta semana + Tu enlace */}
          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
            <WeekStrip
              days={weekData}
              today={today}
              weekCount={weekCount}
              weekTotal={weekTotal}
              currencySymbol={symbol}
            />
            <LinkCard bookingUrl={BOOKING_URL} firstName={firstName} />
          </div>

          {/* Próximas citas */}
          <div className="mt-5">
            <UpcomingList appointments={upcoming ?? []} currencySymbol={symbol} />
          </div>
        </main>
      </div>

      <DashboardRealtime businessId={business.id} />
    </div>
  );
}
