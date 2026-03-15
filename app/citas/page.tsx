import { revalidatePath } from "next/cache";
import { createClient, getBusiness } from "../../lib/supabase-server";

export default async function CitasPage() {
  const supabase = await createClient();
  const business = await getBusiness();

  if (!business) return <p>No se encontró tu negocio.</p>;

  async function deleteAppointment(id: number) {
    "use server";
    const supabase = await createClient();
    await supabase.from("appointments").delete().eq("id", id);
    revalidatePath("/citas");
    revalidatePath("/dashboard");
  }

  const { data: appointments, error } = await supabase
    .from("appointments")
    .select(`*, services (name)`)
    .eq("business_id", business.id)
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  const today = new Date().toISOString().split("T")[0];
  const todayAppts = appointments?.filter(a => a.date === today) ?? [];
  const upcomingAppts = appointments?.filter(a => a.date > today) ?? [];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900">

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 flex-col border-r border-slate-100 bg-white lg:flex">
        <div className="flex h-14 items-center gap-2 border-b border-slate-100 px-5">
          <div className="flex size-7 items-center justify-center rounded-md bg-[#e9cece] text-[#2d2424] text-xs">✦</div>
          <span className="text-sm font-semibold tracking-tight">NailFlow</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          <a href="/dashboard" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900">
            <span>▦</span> Dashboard
          </a>
          <a href="/citas" className="flex items-center gap-3 rounded-md bg-[#e9cece]/20 px-3 py-2 text-sm font-medium text-slate-900">
            <span>◷</span> Citas
          </a>
          <a href="/servicios" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900">
            <span>✦</span> Servicios
          </a>
        </nav>
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-100 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-[#e9cece] text-[#2d2424] text-xs">✦</div>
          <span className="text-sm font-semibold">NailFlow</span>
        </div>
        <a href="/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-900">← Volver</a>
      </header>

      <div className="lg:pl-60">
        <main className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-10">

          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Citas</h1>
            <p className="mt-1 text-sm text-slate-500">
              {appointments?.length ?? 0} citas programadas en total
            </p>
          </div>

          {error && <p className="mb-4 text-sm text-red-500">Error cargando citas: {error.message}</p>}

          {!appointments?.length && !error && (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
              <p className="text-sm text-slate-400">Aún no hay citas registradas.</p>
            </div>
          )}

          {/* Citas de hoy */}
          {todayAppts.length > 0 && (
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hoy</h2>
                <span className="rounded-full bg-[#e9cece]/30 px-2 py-0.5 text-xs font-medium text-[#2d2424]">
                  {todayAppts.length} citas
                </span>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
                <ul className="divide-y divide-slate-50">
                  {todayAppts.map((appointment: any) => (
                    <AppointmentRow key={appointment.id} appointment={appointment} deleteAppointment={deleteAppointment} />
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Próximas citas */}
          {upcomingAppts.length > 0 && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Próximas</h2>
                <span className="text-xs text-slate-400">{upcomingAppts.length} citas</span>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
                <ul className="divide-y divide-slate-50">
                  {upcomingAppts.map((appointment: any) => (
                    <AppointmentRow key={appointment.id} appointment={appointment} deleteAppointment={deleteAppointment} />
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

function AppointmentRow({ appointment, deleteAppointment }: {
  appointment: any;
  deleteAppointment: (id: number) => Promise<void>;
}) {
  return (
    <li className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e9cece]/20 text-sm font-semibold text-[#2d2424]">
          {appointment.client_name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{appointment.client_name}</p>
          <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-slate-400">
            <span>{appointment.date} · {appointment.time}</span>
            <span>{appointment.services?.name}</span>
            <span>{appointment.duration} min</span>
            {appointment.phone && <span>{appointment.phone}</span>}
            {appointment.email && <span>{appointment.email}</span>}
          </div>
        </div>
      </div>

      <form action={deleteAppointment.bind(null, appointment.id)}>
        <button
          type="submit"
          className="rounded-md px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          Cancelar
        </button>
      </form>
    </li>
  );
}