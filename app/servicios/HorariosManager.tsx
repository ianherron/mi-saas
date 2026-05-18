"use client";
import { useState, useTransition, useMemo, useRef, useEffect } from "react";
import { toast } from "sonner";
import DeleteButton from "./DeleteButton";
import ShareDisponibilidadButton from "./ShareDisponibilidadButton";

type Slot = { id: number; time: string; day: number | null };
type Mode = "unified" | "per-day";

type Props = {
  scheduleMode: Mode;
  workingDaysList: number[];
  timeSlots: Slot[];
  setScheduleMode: (formData: FormData) => Promise<{ error: string } | void>;
  addTimeSlot: (formData: FormData) => Promise<{ error: string } | void>;
  deleteTimeSlot: (id: number) => Promise<void>;
  copyDayHours: (formData: FormData) => Promise<{ error: string } | void>;
  clearDayHours: (formData: FormData) => Promise<{ error: string } | void>;
  saveWorkingDays: (formData: FormData) => Promise<{ error: string } | void>;
};

const DAYS = [
  { value: 1, letter: "L", short: "Lun", long: "Lunes" },
  { value: 2, letter: "M", short: "Mar", long: "Martes" },
  { value: 3, letter: "M", short: "Mié", long: "Miércoles" },
  { value: 4, letter: "J", short: "Jue", long: "Jueves" },
  { value: 5, letter: "V", short: "Vie", long: "Viernes" },
  { value: 6, letter: "S", short: "Sáb", long: "Sábado" },
  { value: 0, letter: "D", short: "Dom", long: "Domingo" },
];

const PRESETS = [
  { id: "lun-vie", label: "Lun – Vie", days: [1, 2, 3, 4, 5] },
  { id: "lun-sab", label: "Lun – Sáb", days: [1, 2, 3, 4, 5, 6] },
  { id: "finde", label: "Sáb + Dom", days: [6, 0] },
  { id: "todos", label: "Todos los días", days: [0, 1, 2, 3, 4, 5, 6] },
];

export default function HorariosManager(props: Props) {
  const {
    scheduleMode,
    workingDaysList,
    timeSlots,
    setScheduleMode,
    addTimeSlot,
    deleteTimeSlot,
    copyDayHours,
    clearDayHours,
    saveWorkingDays,
  } = props;

  const unifiedSlots = useMemo(
    () => timeSlots.filter((s) => s.day === null),
    [timeSlots],
  );
  const slotsByDay = useMemo(() => {
    const map: Record<number, Slot[]> = {};
    for (const s of timeSlots) {
      if (s.day !== null) (map[s.day] ??= []).push(s);
    }
    return map;
  }, [timeSlots]);

  return (
    <>
      <ShareDisponibilidadButton
        freeCount={unifiedSlots.length + Object.values(slotsByDay).reduce((a, b) => a + b.length, 0)}
      />

      <ModeToggle mode={scheduleMode} setScheduleMode={setScheduleMode} />

      {scheduleMode === "unified" ? (
        <UnifiedMode
          slots={unifiedSlots}
          workingDaysList={workingDaysList}
          addTimeSlot={addTimeSlot}
          deleteTimeSlot={deleteTimeSlot}
          saveWorkingDays={saveWorkingDays}
        />
      ) : (
        <PerDayMode
          slotsByDay={slotsByDay}
          workingDaysList={workingDaysList}
          addTimeSlot={addTimeSlot}
          deleteTimeSlot={deleteTimeSlot}
          copyDayHours={copyDayHours}
          clearDayHours={clearDayHours}
          saveWorkingDays={saveWorkingDays}
        />
      )}
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Mode toggle
// ──────────────────────────────────────────────────────────────────────────
function ModeToggle({
  mode,
  setScheduleMode,
}: {
  mode: Mode;
  setScheduleMode: Props["setScheduleMode"];
}) {
  const [pending, start] = useTransition();
  const OPTIONS: { id: Mode; label: string; sub: string }[] = [
    { id: "unified", label: "Mismo horario", sub: "Las mismas horas se repiten todos los días que trabajás." },
    { id: "per-day", label: "Horario por día", sub: "Cada día tiene sus propias horas — útil si trabajás distinto los fines de semana." },
  ];

  function pick(id: Mode) {
    if (id === mode || pending) return;
    const fd = new FormData();
    fd.set("mode", id);
    start(async () => {
      const result = await setScheduleMode(fd);
      if (result?.error) toast.error(result.error);
      else toast.success(id === "per-day" ? "Modo por día activado" : "Modo unificado activado");
    });
  }

  return (
    <section className="mb-5 overflow-hidden rounded-2xl border border-[#2d2424]/[0.08] bg-white">
      <div className="border-b border-[#2d2424]/[0.06] px-5 py-3.5">
        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
          Configuración
        </p>
        <h2 className="serif-heading mt-1 text-[18px] font-medium leading-tight tracking-tight text-[#2d2424]">
          ¿Cómo manejás tus <em className="font-normal italic text-[#846262]">horarios</em>?
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-2.5 p-4 sm:grid-cols-2 sm:p-5">
        {OPTIONS.map((opt) => {
          const active = mode === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => pick(opt.id)}
              aria-pressed={active}
              disabled={pending}
              className={[
                "group relative flex flex-col items-start gap-1.5 rounded-xl border px-4 py-3.5 text-left transition-colors",
                active
                  ? "border-[#2d2424] bg-[#2d2424] text-[#fbf9f9]"
                  : "border-[#2d2424]/[0.12] bg-white text-[#2d2424] hover:border-[#e9cece] hover:bg-[#f4ecec]/40",
                pending && "opacity-60",
              ].join(" ")}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="serif-heading text-base font-medium tracking-tight">{opt.label}</span>
                <span
                  aria-hidden
                  className={[
                    "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
                    active ? "border-[#e9cece] bg-[#e9cece]" : "border-[#2d2424]/[0.24] bg-transparent",
                  ].join(" ")}
                >
                  {active && <span className="block h-2 w-2 rounded-full bg-[#2d2424]" />}
                </span>
              </div>
              <p className={["text-[12px] leading-relaxed", active ? "text-[#e9cece]" : "text-[#846262]"].join(" ")}>
                {opt.sub}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Working days picker — shared
// ──────────────────────────────────────────────────────────────────────────
function WorkingDaysPicker({
  active,
  onChange,
  dense,
}: {
  active: number[];
  onChange: (next: number[]) => void;
  dense?: boolean;
}) {
  function toggle(v: number) {
    onChange(active.includes(v) ? active.filter((d) => d !== v) : [...active, v]);
  }
  return (
    <div className={dense ? "px-5 py-4" : "px-5 py-5 sm:px-6"}>
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onChange(p.days)}
            className="inline-flex h-7 items-center rounded-full border border-[#2d2424]/[0.12] bg-white px-2.5 text-[11px] font-medium text-[#846262] transition-colors hover:border-[#e9cece] hover:bg-[#f4ecec]/40 hover:text-[#2d2424]"
          >
            {p.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onChange([])}
          className="ml-auto inline-flex h-7 items-center rounded-full px-2.5 text-[11px] text-[#b89090] transition-colors hover:text-[#b86060]"
        >
          Limpiar
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {DAYS.map((day) => {
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
                  : "border-[#2d2424]/[0.12] bg-white text-[#2d2424] hover:border-[#e9cece] hover:bg-[#f4ecec]/40",
              ].join(" ")}
            >
              <span
                className={[
                  "text-[9px] font-medium uppercase tracking-[0.1em]",
                  isActive ? "text-[#e9cece]" : "text-[#846262]",
                ].join(" ")}
              >
                {day.short}
              </span>
              <span className="serif-heading mt-0.5 text-lg font-medium leading-none tracking-tight">
                {day.letter}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WorkingDaysForm({
  initial,
  saveWorkingDays,
}: {
  initial: number[];
  saveWorkingDays: Props["saveWorkingDays"];
}) {
  const [active, setActive] = useState<number[]>(initial);
  return (
    <form
      action={async (formData) => {
        const result = await saveWorkingDays(formData);
        if (result?.error) toast.error(result.error);
        else toast.success("Días de trabajo guardados");
      }}
    >
      {active.map((v) => (
        <input key={v} type="hidden" name={`day_${v}`} value="on" />
      ))}
      <WorkingDaysPicker active={active} onChange={setActive} />
      <div className="flex items-center justify-between gap-3 border-t border-[#2d2424]/[0.06] px-5 py-4 sm:px-6">
        <p className="text-xs text-[#b89090]">
          ✦ {active.length} {active.length === 1 ? "día seleccionado" : "días seleccionados"}
        </p>
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2d2424] px-5 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
        >
          Guardar cambios
        </button>
      </div>
    </form>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Unified mode
// ──────────────────────────────────────────────────────────────────────────
function UnifiedMode({
  slots,
  workingDaysList,
  addTimeSlot,
  deleteTimeSlot,
  saveWorkingDays,
}: {
  slots: Slot[];
  workingDaysList: number[];
  addTimeSlot: Props["addTimeSlot"];
  deleteTimeSlot: Props["deleteTimeSlot"];
  saveWorkingDays: Props["saveWorkingDays"];
}) {
  return (
    <>
      <section className="mb-5 overflow-hidden rounded-2xl border border-[#2d2424]/[0.08] bg-white">
        <div className="border-b border-[#2d2424]/[0.06] px-5 py-3.5">
          <p className="text-sm font-medium text-[#2d2424]">Horarios disponibles</p>
          <p className="mt-0.5 text-xs text-[#846262]">
            Las horas que tus clientas pueden elegir al reservar — aplican a cada día que trabajás.
          </p>
        </div>

        <AddSlotForm addTimeSlot={addTimeSlot} day={null} />

        {slots.length === 0 ? (
          <div className="px-5 py-6 text-center">
            <p className="text-sm text-[#b89090]">No hay horarios configurados.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 px-5 py-4 sm:px-6">
            {slots.map((s) => (
              <span
                key={s.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#f4ecec] px-3 py-1.5 text-[13px] font-medium text-[#2d2424]"
              >
                {s.time}
                <DeleteButton action={deleteTimeSlot.bind(null, s.id)} compact />
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#2d2424]/[0.08] bg-white">
        <div className="border-b border-[#2d2424]/[0.06] px-5 py-3.5">
          <p className="text-sm font-medium text-[#2d2424]">Días de trabajo</p>
          <p className="mt-0.5 text-xs text-[#846262]">
            Elegí los días que atendés clientas. Estas horas aplicarán en todos.
          </p>
        </div>
        <WorkingDaysForm initial={workingDaysList} saveWorkingDays={saveWorkingDays} />
      </section>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Per-day mode
// ──────────────────────────────────────────────────────────────────────────
function PerDayMode({
  slotsByDay,
  workingDaysList,
  addTimeSlot,
  deleteTimeSlot,
  copyDayHours,
  clearDayHours,
  saveWorkingDays,
}: {
  slotsByDay: Record<number, Slot[]>;
  workingDaysList: number[];
  addTimeSlot: Props["addTimeSlot"];
  deleteTimeSlot: Props["deleteTimeSlot"];
  copyDayHours: Props["copyDayHours"];
  clearDayHours: Props["clearDayHours"];
  saveWorkingDays: Props["saveWorkingDays"];
}) {
  return (
    <>
      <section className="mb-5 overflow-hidden rounded-2xl border border-[#2d2424]/[0.08] bg-white">
        <div className="border-b border-[#2d2424]/[0.06] px-5 py-3.5">
          <p className="text-sm font-medium text-[#2d2424]">¿Qué días trabajás?</p>
          <p className="mt-0.5 text-xs text-[#846262]">
            Elegí un preset o tocá los días manualmente. Después configurás las horas de cada uno abajo.
          </p>
        </div>
        <WorkingDaysForm initial={workingDaysList} saveWorkingDays={saveWorkingDays} />
      </section>

      <section className="mb-5">
        <div className="mb-2.5 flex items-baseline justify-between gap-2 px-1">
          <p className="text-sm font-medium text-[#2d2424]">Horarios por día</p>
          <p className="text-[11px] text-[#b89090]">
            ✦ usá <span className="font-medium text-[#846262]">Copiar a…</span> para no repetir
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          {DAYS.map((day) => (
            <DayCard
              key={day.value}
              day={day}
              hours={slotsByDay[day.value] ?? []}
              workingDays={workingDaysList}
              addTimeSlot={addTimeSlot}
              deleteTimeSlot={deleteTimeSlot}
              copyDayHours={copyDayHours}
              clearDayHours={clearDayHours}
            />
          ))}
        </div>
      </section>

      <div className="flex items-start gap-3 rounded-2xl bg-[#f4ecec] p-4">
        <span className="text-base text-[#b89090]">✦</span>
        <p className="text-[13px] leading-relaxed text-[#846262]">
          <span className="font-medium text-[#2d2424]">Tip:</span>{" "}
          si la mayoría de tus días tienen el mismo horario, llená uno y usá{" "}
          <span className="font-medium text-[#2d2424]">Copiar a…</span> para clonarlo al resto en un toque.
        </p>
      </div>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Add-slot form (compartido entre unified y per-day)
// ──────────────────────────────────────────────────────────────────────────
function AddSlotForm({
  addTimeSlot,
  day,
  compact,
}: {
  addTimeSlot: Props["addTimeSlot"];
  day: number | null;
  compact?: boolean;
}) {
  return (
    <form
      action={async (formData) => {
        const result = await addTimeSlot(formData);
        if (result?.error) toast.error(result.error);
        else toast.success("Horario agregado");
      }}
      className={
        compact
          ? "grid grid-cols-[1fr_1fr_auto] items-end gap-2 px-4 py-3 sm:px-5"
          : "grid grid-cols-1 gap-3.5 px-6 pb-5 pt-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:px-7"
      }
    >
      {day !== null && <input type="hidden" name="day" value={day} />}
      <div className={compact ? "" : "flex flex-col gap-1.5"}>
        {!compact && (
          <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">Hora</label>
        )}
        <select
          name="hour"
          className={[
            "rounded-xl border border-[#2d2424]/[0.16] bg-white text-sm text-[#2d2424] outline-none transition-colors focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30",
            compact ? "h-10 rounded-lg px-2.5" : "h-11 px-3.5",
          ].join(" ")}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].flatMap((h) => [
            <option key={`${h}:00`} value={`${h}:00`}>{h}:00</option>,
            <option key={`${h}:30`} value={`${h}:30`}>{h}:30</option>,
          ])}
        </select>
      </div>
      <div className={compact ? "" : "flex flex-col gap-1.5"}>
        {!compact && (
          <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">Período</label>
        )}
        <select
          name="period"
          className={[
            "rounded-xl border border-[#2d2424]/[0.16] bg-white text-sm text-[#2d2424] outline-none transition-colors focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30",
            compact ? "h-10 rounded-lg px-2.5" : "h-11 px-3.5",
          ].join(" ")}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <button
        type="submit"
        aria-label="Agregar hora"
        className={[
          "inline-flex items-center justify-center gap-2 bg-[#2d2424] font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]",
          compact ? "h-10 rounded-lg px-3.5 text-sm" : "h-11 rounded-xl px-5 text-sm",
        ].join(" ")}
      >
        <span className="text-base leading-none">+</span>
        {!compact && "Agregar"}
      </button>
    </form>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Day card (per-day mode)
// ──────────────────────────────────────────────────────────────────────────
function DayCard({
  day,
  hours,
  workingDays,
  addTimeSlot,
  deleteTimeSlot,
  copyDayHours,
  clearDayHours,
}: {
  day: { value: number; long: string };
  hours: Slot[];
  workingDays: number[];
  addTimeSlot: Props["addTimeSlot"];
  deleteTimeSlot: Props["deleteTimeSlot"];
  copyDayHours: Props["copyDayHours"];
  clearDayHours: Props["clearDayHours"];
}) {
  const [showCopy, setShowCopy] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isClosed = !workingDays.includes(day.value);

  useEffect(() => {
    if (!showCopy) return;
    function onDoc(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowCopy(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [showCopy]);

  return (
    <div
      className={[
        "overflow-hidden rounded-2xl border bg-white transition-colors",
        isClosed ? "border-[#2d2424]/[0.06] bg-[#fbf9f9]" : "border-[#2d2424]/[0.08]",
      ].join(" ")}
    >
      <div className="flex items-center gap-3 border-b border-[#2d2424]/[0.06] px-4 py-3 sm:px-5">
        <div className="flex flex-1 items-baseline gap-2.5">
          <span className="serif-heading text-lg font-medium tracking-tight text-[#2d2424]">{day.long}</span>
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#b89090]">
            {isClosed ? "Cerrado" : `${hours.length} ${hours.length === 1 ? "hora" : "horas"}`}
          </span>
        </div>

        {!isClosed && hours.length > 0 && (
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setShowCopy((s) => !s)}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#2d2424]/[0.12] bg-white px-2.5 text-[11px] font-medium text-[#846262] transition-colors hover:border-[#e9cece] hover:bg-[#f4ecec]/40 hover:text-[#2d2424]"
            >
              Copiar a…
            </button>
            {showCopy && (
              <CopyMenu
                srcDay={day.value}
                allDays={workingDays}
                copyDayHours={copyDayHours}
                onClose={() => setShowCopy(false)}
              />
            )}
          </div>
        )}

        {!isClosed && hours.length > 0 && (
          <form
            action={async (formData) => {
              const result = await clearDayHours(formData);
              if (result?.error) toast.error(result.error);
              else toast.success("Horas de " + day.long.toLowerCase() + " borradas");
            }}
          >
            <input type="hidden" name="day" value={day.value} />
            <button
              type="submit"
              className="text-[11px] font-medium text-[#b89090] transition-colors hover:text-[#b86060]"
              aria-label={`Borrar todas las horas de ${day.long}`}
            >
              Vaciar
            </button>
          </form>
        )}
      </div>

      {isClosed ? (
        <div className="px-5 py-5 text-center">
          <p className="text-xs text-[#b89090]">
            No atendés este día. Activá <span className="font-medium text-[#846262]">{day.long}</span> en los días de trabajo.
          </p>
        </div>
      ) : (
        <>
          <AddSlotForm addTimeSlot={addTimeSlot} day={day.value} compact />
          <div className="px-4 pb-4 sm:px-5">
            {hours.length === 0 ? (
              <p className="rounded-xl border border-dashed border-[#e9cece] bg-[#f4ecec]/30 px-3 py-2.5 text-center text-xs text-[#b89090]">
                Aún no agregaste horas para {day.long.toLowerCase()}.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {hours.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#f4ecec] px-3 py-1 text-[12px] font-medium text-[#2d2424]"
                  >
                    {s.time}
                    <DeleteButton action={deleteTimeSlot.bind(null, s.id)} compact />
                  </span>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Copy menu (popover dentro de DayCard)
// ──────────────────────────────────────────────────────────────────────────
function CopyMenu({
  srcDay,
  allDays,
  copyDayHours,
  onClose,
}: {
  srcDay: number;
  allDays: number[];
  copyDayHours: Props["copyDayHours"];
  onClose: () => void;
}) {
  const [picked, setPicked] = useState<number[]>([]);
  function togglePick(v: number) {
    setPicked((p) => (p.includes(v) ? p.filter((d) => d !== v) : [...p, v]));
  }
  const dayName = DAYS.find((d) => d.value === srcDay)?.long ?? "";
  return (
    <form
      action={async (formData) => {
        const result = await copyDayHours(formData);
        if (result?.error) toast.error(result.error);
        else {
          toast.success("Horas copiadas");
          onClose();
        }
      }}
      className="absolute right-0 top-full z-20 mt-2 w-[260px] rounded-2xl border border-[#2d2424]/[0.12] bg-white p-3.5 shadow-[0_8px_24px_-12px_rgba(45,36,36,0.24)]"
    >
      <input type="hidden" name="src_day" value={srcDay} />
      {picked.map((v) => (
        <input key={v} type="hidden" name="target_day" value={v} />
      ))}
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
        Copiar de {dayName} a…
      </p>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.filter((d) => allDays.includes(d.value) && d.value !== srcDay).map((d) => {
          const isPicked = picked.includes(d.value);
          return (
            <button
              key={d.value}
              type="button"
              onClick={() => togglePick(d.value)}
              className={[
                "flex aspect-square flex-col items-center justify-center rounded-lg border text-[10px] font-medium uppercase tracking-[0.05em] transition-colors",
                isPicked
                  ? "border-[#2d2424] bg-[#2d2424] text-[#fbf9f9]"
                  : "border-[#2d2424]/[0.12] bg-white text-[#846262] hover:bg-[#f4ecec]/40",
              ].join(" ")}
            >
              {d.short}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-lg border border-[#2d2424]/[0.12] bg-white px-3 py-2 text-xs font-medium text-[#846262] transition-colors hover:bg-[#f4ecec]/40"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={picked.length === 0}
          className="flex-1 rounded-lg bg-[#2d2424] px-3 py-2 text-xs font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232] disabled:opacity-40"
        >
          Copiar ({picked.length})
        </button>
      </div>
    </form>
  );
}
