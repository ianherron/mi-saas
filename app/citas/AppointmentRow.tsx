"use client";
import { toast } from "sonner";

export default function AppointmentRow({ appointment, cancelAppointment, completeAppointment }: {
  appointment: any;
  cancelAppointment: (id: number) => Promise<void>;
  completeAppointment: (id: number) => Promise<void>;
}) {
  const statusColors: Record<string, string> = {
    active: "bg-blue-50 text-blue-600",
    completed: "bg-green-50 text-green-600",
    cancelled: "bg-red-50 text-red-400",
  };
  const statusLabels: Record<string, string> = {
    active: "Activa",
    completed: "Completada",
    cancelled: "Cancelada",
  };

  return (
    <li className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e9cece]/20 text-sm font-semibold text-[#2d2424]">
          {appointment.client_name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-slate-900">{appointment.client_name}</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColors[appointment.status ?? "active"]}`}>
              {statusLabels[appointment.status ?? "active"]}
            </span>
          </div>
          <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-slate-400">
            <span>{appointment.date} · {appointment.time}</span>
            <span>{appointment.services?.name}</span>
            <span>{appointment.duration} min</span>
            {appointment.phone && <span>{appointment.phone}</span>}
            {appointment.email && <span>{appointment.email}</span>}
          </div>
          {appointment.reference_image && (
            <a href={appointment.reference_image} target="_blank" rel="noopener noreferrer">
              <img src={appointment.reference_image} alt="Referencia"
                className="mt-2 h-16 w-16 rounded-lg object-cover border border-slate-100 hover:opacity-80 transition-opacity" />
            </a>
          )}
          {appointment.payment_proof && (
            <div className="mt-2">
              <p className="text-xs text-[#846262] mb-1">Comprobante de pago:</p>
              <a href={appointment.payment_proof} target="_blank" rel="noopener noreferrer">
                <img src={appointment.payment_proof} alt="Comprobante"
                  className="h-16 w-16 rounded-lg object-cover border border-slate-100 hover:opacity-80 transition-opacity" />
              </a>
            </div>
          )}
        </div>
      </div>

      {(!appointment.status || appointment.status === "active") && (
        <div className="flex gap-2">
          <form action={async () => {
            await completeAppointment(appointment.id);
            toast.success("Cita completada", {
              description: "Se envió el correo de agradecimiento a la clienta.",
            });
          }}>
            <button type="submit"
              className="rounded-md px-3 py-1.5 text-xs font-medium text-green-600 transition-colors hover:bg-green-50">
              Completar
            </button>
          </form>
          <form action={async () => {
            await cancelAppointment(appointment.id);
            toast.error("Cita cancelada", {
              description: "Se notificó a la clienta por correo.",
            });
          }}>
            <button type="submit"
              className="rounded-md px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-50 hover:text-red-600">
              Cancelar
            </button>
          </form>
        </div>
      )}
    </li>
  );
}