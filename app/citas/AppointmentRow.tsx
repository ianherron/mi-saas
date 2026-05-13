"use client";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

export default function AppointmentRow({
  appointment,
  timeNum,
  timePeriod,
  currencySymbol,
  cancelAppointment,
  completeAppointment,
}: {
  appointment: any;
  timeNum: string;
  timePeriod: string;
  currencySymbol: string;
  cancelAppointment: (id: number) => Promise<void>;
  completeAppointment: (id: number) => Promise<void>;
}) {
  const initial = appointment.client_name?.charAt(0).toUpperCase() ?? "?";
  const isActive = !appointment.status || appointment.status === "active";

  return (
    <li className="flex flex-wrap items-center gap-3 py-3.5 sm:flex-nowrap sm:gap-4">
      {/* Time block */}
      <div className="w-16 shrink-0 text-center sm:w-[68px]">
        <p className="serif-heading text-lg font-medium leading-none text-[#2d2424] sm:text-xl">
          {timeNum}
        </p>
        {timePeriod && (
          <p className="mt-1 text-[10px] font-medium tracking-[0.1em] text-[#b89090]">
            {timePeriod}
          </p>
        )}
      </div>

      {/* Avatar */}
      <div className="serif-heading flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e9cece] text-sm font-medium text-[#2d2424]">
        {initial}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-[#2d2424]">
          {appointment.client_name}
        </p>
        <p className="truncate text-xs text-[#846262]">
          {appointment.services?.name ?? "Servicio"} · {appointment.duration} min
          {appointment.phone ? ` · ${appointment.phone}` : ""}
        </p>
        {appointment.reference_image && (
          <a href={appointment.reference_image} target="_blank" rel="noopener noreferrer">
            <img
              src={appointment.reference_image}
              alt="Referencia"
              className="mt-2 h-14 w-14 rounded-lg border border-[#2d2424]/[0.08] object-cover transition-opacity hover:opacity-80"
            />
          </a>
        )}
      </div>

      {/* Price + actions */}
      <div className="ml-auto flex items-center gap-2 sm:ml-0">
        <p className="text-sm font-medium text-[#2d2424]">
          {currencySymbol}
          {(appointment.total_price ?? 0).toLocaleString()}
        </p>

        {isActive && (
          <div className="flex gap-1.5">
            <form
              action={async () => {
                await completeAppointment(appointment.id);
                toast.success("Cita completada", {
                  description: "Se envió el correo de agradecimiento a la clienta.",
                });
              }}
            >
              <button
                type="submit"
                title="Completar"
                className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#6b8a5e]/10 text-[#6b8a5e] transition-colors hover:bg-[#6b8a5e]/20"
              >
                <Check className="h-4 w-4" />
              </button>
            </form>
            <form
              action={async () => {
                await cancelAppointment(appointment.id);
                toast.error("Cita cancelada", {
                  description: "Se notificó a la clienta por correo.",
                });
              }}
            >
              <button
                type="submit"
                title="Cancelar"
                className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#b86060]/10 text-[#b86060] transition-colors hover:bg-[#b86060]/20"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        {appointment.status === "completed" && (
          <span className="rounded-full bg-[#6b8a5e]/[0.13] px-2.5 py-1 text-[10px] font-medium text-[#6b8a5e]">
            Completada
          </span>
        )}
        {appointment.status === "cancelled" && (
          <span className="rounded-full bg-[#b86060]/[0.13] px-2.5 py-1 text-[10px] font-medium text-[#b86060]">
            Cancelada
          </span>
        )}
      </div>
    </li>
  );
}
