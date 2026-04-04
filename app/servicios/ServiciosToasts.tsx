"use client";
import { toast } from "sonner";

export function AddExtraForm({ addExtra }: { addExtra: (formData: FormData) => Promise<void> }) {
  return (
    <form action={async (formData) => {
      await addExtra(formData);
      toast.success("Extra agregado correctamente");
    }} className="flex flex-col gap-3 border-b border-slate-50 p-5 sm:flex-row">
      <input name="name" type="text" placeholder="Ej. Retiro de esmalte"
        className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[#e9cece] focus:bg-white" />
      <input name="duration" type="number" placeholder="Minutos extra"
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[#e9cece] focus:bg-white sm:w-36" />
      <input name="price" type="number" placeholder="Precio"
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-[#e9cece] focus:bg-white sm:w-32" />
      <button type="submit"
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700">
        Agregar
      </button>
    </form>
  );
}

export function AddTimeSlotForm({ addTimeSlot }: { addTimeSlot: (formData: FormData) => Promise<void> }) {
  return (
    <form action={async (formData) => {
      await addTimeSlot(formData);
      toast.success("Horario agregado correctamente");
    }} className="flex flex-col gap-3 border-b border-slate-50 p-5 sm:flex-row">
      <select name="hour" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#e9cece] focus:bg-white">
        {[1,2,3,4,5,6,7,8,9,10,11,12].flatMap((h) => [
          <option key={`${h}:00`} value={`${h}:00`}>{h}:00</option>,
          <option key={`${h}:30`} value={`${h}:30`}>{h}:30</option>,
        ])}
      </select>
      <select name="period" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#e9cece] focus:bg-white">
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
      <button type="submit"
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700">
        Agregar
      </button>
    </form>
  );
}

export function WorkingDaysForm({ saveWorkingDays, workingDaysList }: {
  saveWorkingDays: (formData: FormData) => Promise<void>;
  workingDaysList: number[];
}) {
  const days = [
    { label: "Domingo", value: 0 },
    { label: "Lunes", value: 1 },
    { label: "Martes", value: 2 },
    { label: "Miércoles", value: 3 },
    { label: "Jueves", value: 4 },
    { label: "Viernes", value: 5 },
    { label: "Sábado", value: 6 },
  ];

  return (
    <form action={async (formData) => {
      await saveWorkingDays(formData);
      toast.success("Días de trabajo guardados");
    }} className="p-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
        {days.map((day) => (
          <label key={day.value} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name={`day_${day.value}`}
              defaultChecked={workingDaysList.includes(day.value)}
              className="rounded border-slate-300 text-[#e9cece] focus:ring-[#e9cece]" />
            <span className="text-sm text-slate-700">{day.label}</span>
          </label>
        ))}
      </div>
      <button type="submit"
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700">
        Guardar días
      </button>
    </form>
  );
}