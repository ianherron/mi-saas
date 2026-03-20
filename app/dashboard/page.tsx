import { createClient, getBusiness } from "../../lib/supabase-server";
import CopyButton from "./CopyButton";
import LogoutButton from "./LogoutButton";
import { Sparkles } from "lucide-react";
import { LayoutDashboard, Clock, Images, Scissors } from "lucide-react";
import CurrencySelector from "./CurrencySelector";


export default async function DashboardPage() {
  const supabase = await createClient();
  const business = await getBusiness();

  if (!business) return <p>No se encontró tu negocio.</p>;

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Costa_Rica",
  });

  const { count: todayCount } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .eq("business_id", business.id)
    .eq("date", today);

  const { count: servicesCount } = await supabase
    .from("services")
    .select("*", { count: "exact", head: true })
    .eq("business_id", business.id);

  const { data: upcoming } = await supabase
    .from("appointments")
    .select(`*, services (name)`)
    .eq("business_id", business.id)
    .gte("date", today)
    .order("date", { ascending: true })
    .order("time", { ascending: true })
    .limit(5);

  const { data: todayAppointments } = await supabase
  .from("appointments")
  .select("total_price")
  .eq("business_id", business.id)
  .eq("date", today);

  const todayRevenue = todayAppointments?.reduce(
    (acc, a) => acc + (a.total_price ?? 0), 0
  ) ?? 0;

  const BOOKING_URL = `nailflow.app/reservar/${business.slug}`;

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
            className="flex items-center gap-3 rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </a>
          <a
            href="/citas"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Clock className="h-4 w-4" />
            Citas
          </a>
          <a
            href="/servicios"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Scissors className="h-4 w-4" />
            Servicios
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
        </nav>

        <div className="border-t border-slate-100 p-3">
          <div className="flex items-center justify-between rounded-md px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                {business.owner_name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-slate-700 truncate max-w-[100px]">
                {business.owner_name}
              </span>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-100 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-[#e9cece] text-[#2d2424] text-xs">
            ✦
          </div>
          <span className="text-sm font-semibold">NailFlow</span>
        </div>
        <LogoutButton />
      </header>

      {/* Main content */}
      <div className="lg:pl-60">
        <main className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-10">
          {/* Page header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="serif-heading text-2xl font-semibold tracking-tight text-slate-900">
                Bienvenida, {business.owner_name?.split(" ")[0]}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {new Date().toLocaleDateString("es-CR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="hidden lg:block">
              <CurrencySelector
                businessId={business.id}
                currentCurrency={business.currency ?? "CRC"}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-100 bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Citas hoy
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {todayCount ?? 0}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Servicios activos
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {servicesCount ?? 0}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-5 col-span-2 lg:col-span-1">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Ingresos hoy
              </p>
              <p className="mt-2 text-3xl font-semibold text-[#e9cece]">
                ₡{todayRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Upcoming appointments */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Próximas citas
                </h2>
                <a
                  href="/citas"
                  className="text-xs font-medium text-slate-500 transition-colors hover:text-slate-900"
                >
                  Ver todas →
                </a>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
                {!upcoming?.length ? (
                  <div className="px-5 py-10 text-center">
                    <p className="text-sm text-slate-400">
                      No hay citas próximas.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-50">
                    {upcoming.map((appointment: any) => (
                      <li
                        key={appointment.id}
                        className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                            {appointment.client_name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {appointment.client_name}
                            </p>
                            <p className="text-xs text-slate-400">
                              {appointment.services?.name} · {appointment.date}{" "}
                              · {appointment.time}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Acciones
                </h2>
                <div className="flex flex-col gap-2">
                  <a
                    href="/servicios"
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Gestionar servicios
                    <span className="text-slate-300">→</span>
                  </a>
                  <a
                    href="/citas"
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Ver todas las citas
                    <span className="text-slate-300">→</span>
                  </a>
                  <div className="rounded-xl border border-slate-100 bg-white p-4 lg:hidden">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Moneda
                    </p>
                    <CurrencySelector
                      businessId={business.id}
                      currentCurrency={business.currency ?? "CRC"}
                    />
                  </div>
                </div>
              </div>

              {/* Booking link */}
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Tu enlace de reservas
                </p>
                <p className="mb-3 truncate text-xs text-slate-500">
                  {BOOKING_URL}
                </p>
                <CopyButton url={`https://${BOOKING_URL}`} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
