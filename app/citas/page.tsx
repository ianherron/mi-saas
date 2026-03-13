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


  return (
    <div className="min-h-screen bg-[#f7f6f6] font-sans text-slate-900 antialiased">
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e9cece]/20 bg-white px-6 py-4 backdrop-blur-sm md:px-10">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-white">
              ✨
            </div>
            <h2 className="text-xl font-bold tracking-tight">NailFlow</h2>
          </div>

         <div className="flex items-center gap-4">
            <a
              href="/dashboard"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#e9cece]"
            >
              <span>←</span>
              Volver
            </a>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#e9cece]/30 bg-[#e9cece]/20">
              <span className="text-sm font-bold text-slate-700">M</span>
            </div>
          </div>
        </header>

        <main className="flex flex-1 justify-center px-4 py-8 md:px-10">
          <div className="flex max-w-[960px] flex-1 flex-col gap-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black tracking-tight text-slate-900">
                  Citas
                </h1>
                <p className="text-base font-normal text-slate-500">
                  Aquí puedes ver las citas programadas por tus clientas.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                  <span className="text-[#e9cece]">📅</span>
                  Hoy
                </h2>
                <span className="text-sm text-slate-400">
                  {appointments?.length ?? 0} citas programadas
                </span>
              </div>

              {error && (
                <p className="text-red-500">Error cargando citas: {error.message}</p>
              )}

              {!appointments?.length && !error && (
                <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center text-slate-500 shadow-sm">
                  Aún no hay citas registradas.
                </div>
              )}

              {appointments?.map((appointment: any) => (
                <div
                  key={appointment.id}
                  className="group flex flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row"
                >
                  <div className="flex w-full flex-1 items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#e9cece]/10 bg-[#e9cece]/20 text-lg font-bold text-slate-700">
                      {appointment.client_name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex flex-col">
                      <p className="text-lg font-bold text-slate-900">
                        {appointment.client_name}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1">⏰ {appointment.time}</span>
                        <span className="flex items-center gap-1">⏱ {appointment.duration} min</span>
                        <span className="flex items-center gap-1">💅 {appointment.services?.name}</span>
                        <span className="flex items-center gap-1">📆 {appointment.date}</span>
                        {appointment.phone && (
                          <span className="flex items-center gap-1">📞 {appointment.phone}</span>
                        )}
                        {appointment.email && (
                          <span className="flex items-center gap-1">✉️ {appointment.email}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex w-full items-center gap-3 border-t pt-4 sm:mt-0 sm:w-auto sm:border-t-0 sm:pt-0">
                    <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#e9cece]/10 px-5 text-sm font-semibold text-slate-900 transition-colors hover:bg-[#e9cece]/20 sm:flex-none">
                      <span>👁</span>
                      Ver
                    </button>

                    <form action={deleteAppointment.bind(null, appointment.id)}>
                      <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 text-sm font-semibold text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 sm:flex-none">
                        <span>✕</span>
                        Cancelar
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}