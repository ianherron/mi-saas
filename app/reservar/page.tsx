import { revalidatePath } from "next/cache";
import { supabase } from "../../lib/supabase";
import BookingForm from "./BookingForm";

export default async function ReservarPage() {
  async function createAppointment(formData: FormData) {
    "use server";

    const client_name = formData.get("client_name") as string;
    const service_id = formData.get("service_id") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const duration = parseInt(formData.get("duration") as string);

    if (!client_name || !service_id || !date || !time) return;

    const { error } = await supabase.from("appointments").insert({
      client_name,
      service_id,
      date,
      time,
      duration,
      phone,
      email,
    });

    if (error) {
      console.error("Error creando cita:", error.message);
      return;
    }

    revalidatePath("/reservar");
    revalidatePath("/citas");
    revalidatePath("/dashboard");
  }

  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: timeSlots } = await supabase
    .from("time_slots")
    .select("*")
    .order("time", { ascending: true });

  const { data: extras } = await supabase
    .from("extras")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f7f6f6] text-slate-900">
      <div className="flex h-full grow flex-col">
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e9cece]/20 bg-white/50 px-6 py-4 backdrop-blur-md md:px-20 lg:px-40">
          <div className="flex items-center gap-2 text-slate-900">
            <div className="text-[#e9cece]">✦</div>
            <h1 className="text-xl font-bold tracking-tight">NailFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-right md:block">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Estudio de lujo
              </p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-full border border-[#e9cece]/30 bg-[#e9cece]/20">
              <span className="text-[#e9cece]">👤</span>
            </div>
          </div>
        </header>

        <main className="flex flex-1 justify-center px-4 py-8 md:px-0">
          {error && (
            <p className="text-red-500">Error cargando servicios: {error.message}</p>
          )}
          {services && (
            <BookingForm
              services={services}
              timeSlots={timeSlots ?? []}
              extras={extras ?? []}
              businessId=""
              workingDays={[]}
              createAppointment={createAppointment}
            />
          )}
        </main>

        <footer className="mt-auto border-t border-slate-200 bg-white px-4 py-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <span>✦</span>
              <span className="font-bold">NailFlow</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2024 NailFlow Premium Studio. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}