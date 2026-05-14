"use client";
import { useState } from "react";
import { toast } from "sonner";

export function AddExtraForm({ addExtra }: { addExtra: (formData: FormData) => Promise<{ error: string } | void> }) {
  return (
    <form
      action={async (formData) => {
        const result = await addExtra(formData);
        if (result?.error) { toast.error(result.error); return; }
        toast.success("Extra agregado correctamente");
      }}
      className="relative overflow-hidden bg-white px-6 py-7 sm:px-7"
    >
      <span
        aria-hidden
        className="serif-heading pointer-events-none absolute -right-2 -top-6 text-[120px] leading-none text-[#e9cece]/[0.16]"
      >
        ✦
      </span>

      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
        Nuevo extra
      </p>
      <h3 className="serif-heading mt-1.5 text-[22px] font-medium leading-tight tracking-tight text-[#2d2424]">
        Agregá un <em className="font-normal italic text-[#846262]">extra</em>.
      </h3>
      <p className="mt-2 mb-6 max-w-md text-[13px] leading-relaxed text-[#846262]">
        Lo que tus clientas pueden sumar a un servicio: brillos, diseños extra, etc.
      </p>

      <div className="relative z-10 grid grid-cols-1 gap-3.5 sm:grid-cols-[2fr_1fr_1fr_auto] sm:items-end">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Nombre
          </label>
          <input
            name="name"
            type="text"
            placeholder="Ej. Diseño extra"
            className="h-11 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            + Duración
          </label>
          <div className="flex h-11 items-center gap-1.5 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 focus-within:border-[#e9cece] focus-within:ring-2 focus-within:ring-[#e9cece]/30">
            <input
              name="duration"
              type="number"
              placeholder="10"
              className="w-full bg-transparent text-sm text-[#2d2424] outline-none placeholder:text-[#b89090]"
            />
            <span className="text-xs text-[#b89090]">min</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            + Precio
          </label>
          <div className="flex h-11 items-center gap-1.5 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 focus-within:border-[#e9cece] focus-within:ring-2 focus-within:ring-[#e9cece]/30">
            <span className="text-sm text-[#846262]">₡</span>
            <input
              name="price"
              type="number"
              placeholder="2.000"
              className="w-full bg-transparent text-sm text-[#2d2424] outline-none placeholder:text-[#b89090]"
            />
          </div>
        </div>
        <button
          type="submit"
          aria-label="Agregar extra"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2d2424] px-5 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
        >
          <span className="text-base leading-none">+</span>
          <span className="sm:hidden">Agregar</span>
        </button>
      </div>
    </form>
  );
}

export function AddTimeSlotForm({ addTimeSlot }: { addTimeSlot: (formData: FormData) => Promise<{ error: string } | void> }) {
  return (
    <form
      action={async (formData) => {
        const result = await addTimeSlot(formData);
        if (result?.error) { toast.error(result.error); return; }
        toast.success("Horario agregado correctamente");
      }}
      className="grid grid-cols-1 gap-3.5 px-6 pb-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:px-7"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
          Hora
        </label>
        <select
          name="hour"
          className="h-11 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
        >
          {[1,2,3,4,5,6,7,8,9,10,11,12].flatMap((h) => [
            <option key={`${h}:00`} value={`${h}:00`}>{h}:00</option>,
            <option key={`${h}:30`} value={`${h}:30`}>{h}:30</option>,
          ])}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
          Período
        </label>
        <select
          name="period"
          className="h-11 rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2d2424] px-5 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
      >
        <span className="text-base leading-none">+</span>
        Agregar
      </button>
    </form>
  );
}

export function WorkingDaysForm({ saveWorkingDays, workingDaysList }: {
  saveWorkingDays: (formData: FormData) => Promise<{ error: string } | void>;
  workingDaysList: number[];
}) {
  const days = [
    { letter: "D", label: "Dom", value: 0 },
    { letter: "L", label: "Lun", value: 1 },
    { letter: "M", label: "Mar", value: 2 },
    { letter: "M", label: "Mié", value: 3 },
    { letter: "J", label: "Jue", value: 4 },
    { letter: "V", label: "Vie", value: 5 },
    { letter: "S", label: "Sáb", value: 6 },
  ];

  const [active, setActive] = useState<number[]>(workingDaysList);

  function toggle(v: number) {
    setActive((curr) =>
      curr.includes(v) ? curr.filter((d) => d !== v) : [...curr, v]
    );
  }

  return (
    <form
      action={async (formData) => {
        const result = await saveWorkingDays(formData);
        if (result?.error) { toast.error(result.error); return; }
        toast.success("Días de trabajo guardados");
      }}
      className="px-6 py-5 sm:px-7"
    >
      {active.map((v) => (
        <input key={v} type="hidden" name={`day_${v}`} value="on" />
      ))}

      <div className="grid grid-cols-7 gap-2 sm:gap-2.5">
        {days.map((day) => {
          const isActive = active.includes(day.value);
          return (
            <button
              key={day.value}
              type="button"
              onClick={() => toggle(day.value)}
              aria-pressed={isActive}
              className={[
                "flex aspect-square flex-col items-center justify-center rounded-xl border transition-colors",
                isActive
                  ? "border-[#2d2424] bg-[#2d2424] text-[#fbf9f9]"
                  : "border-[#2d2424]/[0.16] bg-white text-[#2d2424] hover:border-[#e9cece] hover:bg-[#f4ecec]/40",
              ].join(" ")}
            >
              <span
                className={[
                  "text-[10px] font-medium uppercase tracking-[0.1em]",
                  isActive ? "text-[#e9cece]" : "text-[#846262]",
                ].join(" ")}
              >
                {day.label}
              </span>
              <span className="serif-heading mt-0.5 text-xl font-medium leading-none tracking-tight">
                {day.letter}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#2d2424]/[0.06] pt-5">
        <p className="text-xs text-[#b89090]">
          ✦ {active.length} {active.length === 1 ? "día seleccionado" : "días seleccionados"}
        </p>
        <button
          type="submit"
          disabled={active.length === 0}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2d2424] px-5 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232] disabled:opacity-50"
        >
          Guardar cambios
        </button>
      </div>
    </form>
  );
}
