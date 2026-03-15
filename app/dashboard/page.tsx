import CopyButton from "./CopyButton";
import LogoutButton from "./LogoutButton";
import { createClient, getBusiness } from "../../lib/supabase-server";


export default async function DashboardPage() {
  const supabase = await createClient();
  const business = await getBusiness();

  if (!business) return <p>No se encontró tu negocio.</p>;

  const BOOKING_URL = `mi-saas-alpha.vercel.app/reservar/${business.slug}`;


  const today = new Date().toISOString().split("T")[0];

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


  return (
    <div className="min-h-screen bg-[#fdfbf9] font-sans text-[#2d2926]">
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#f2d4d7]/20 bg-white/50 px-6 py-4 backdrop-blur-md lg:px-20">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#2d2926] text-[#f2d4d7]">
              ✨
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#2d2926]">
              NailFlow
            </h2>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="hidden gap-2 md:flex">
              <button className="flex size-10 items-center justify-center rounded-full bg-[#f2d4d7]/20 text-[#2d2926] transition-colors hover:bg-[#f2d4d7]/40">
                🔔
              </button>
              <button className="flex size-10 items-center justify-center rounded-full bg-[#f2d4d7]/20 text-[#2d2926] transition-colors hover:bg-[#f2d4d7]/40">
                ⚙️
              </button>
            </div>
            <LogoutButton />

            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#f2d4d7] bg-[#f2d4d7]/30 shadow-sm">
              <span className="text-sm font-bold text-[#2d2926]">M</span>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="mb-10">
            <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-[#2d2926]">
              Bienvenida, {business.owner_name}
            </h1>
            <p className="text-lg text-slate-500">
              Aquí tienes un resumen de tu agenda de hoy.
            </p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[#f2d4d7]/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl text-[#f2d4d7]">📅</span>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Citas de hoy
                </p>
              </div>
              <p className="text-4xl font-bold tracking-tight text-[#2d2926]">
                {todayCount ?? 0}
              </p>
            </div>

            <div className="rounded-xl border border-[#f2d4d7]/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl text-[#f2d4d7]">💅</span>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Servicios activos
                </p>
              </div>
              <p className="text-4xl font-bold tracking-tight text-[#2d2926]">
                {servicesCount ?? 0}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="px-2">
                <h2 className="text-xl font-bold text-[#2d2926]">
                  Próximas citas
                </h2>
              </div>

              <div className="space-y-3">
                {!upcoming?.length && (
                  <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center text-slate-500 shadow-sm">
                    No hay citas próximas.
                  </div>
                )}

                {upcoming?.map((appointment: any) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between rounded-xl border border-[#f2d4d7]/10 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 items-center justify-center rounded-full bg-[#f2d4d7]/30 text-lg font-bold text-[#2d2926]">
                        {appointment.client_name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-[#2d2926]">
                          {appointment.client_name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {appointment.services?.name} — {appointment.time} ·{" "}
                          {appointment.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="mb-6 px-2 text-xl font-bold text-[#2d2926]">
                  Acciones rápidas
                </h2>

                <div className="space-y-3">
                  <a
                    href="/servicios"
                    className="flex w-full items-center justify-between rounded-xl bg-[#f2d4d7] px-5 py-4 font-bold text-[#2d2926] shadow-sm transition-all hover:bg-[#efc8cd]"
                  >
                    <span>Gestionar servicios</span>
                    <span>📝</span>
                  </a>
                  <a
                    href="/citas"
                    className="flex w-full items-center justify-between rounded-xl border border-[#f2d4d7]/20 bg-white px-5 py-4 font-bold text-[#2d2926] shadow-sm transition-all hover:bg-[#f2d4d7]/10"
                  >
                    <span>Ver todas las citas</span>
                    <span>📋</span>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-[#f2d4d7]/30 bg-[#f2d4d7]/20 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-[#2d2926]">🔗</span>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#2d2926]/70">
                    Tu enlace de reservas
                  </p>
                </div>

                <p className="mb-4 truncate text-sm font-medium italic text-[#2d2926]">
                  {BOOKING_URL}
                </p>
                <CopyButton url={`https://${BOOKING_URL}`} />
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-auto px-6 py-10 text-center">
          <p className="text-sm text-slate-400">
            © 2024 NailFlow — El aliado perfecto para tu salón
          </p>
        </footer>
      </div>
    </div>
  );
}
