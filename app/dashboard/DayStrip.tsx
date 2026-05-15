import { Check } from "lucide-react";

type TodayAppt = {
  time: string;
  duration: number | null;
  client_name: string | null;
  total_price: number | null;
  status: "active" | "completed" | "cancelled" | string | null;
};

type Upcoming = {
  date: string;
  time: string;
  client_name: string | null;
  services?: { name: string | null } | null;
};

interface Props {
  today: string;
  appointments: TodayAppt[];
  todayCount: number;
  todayRevenue: number;
  currencySymbol: string;
  nextUpcoming?: Upcoming;
  isWorkingDay: boolean;
  slotTimes: string[];
}

// Returns null if unparseable — callers must filter nulls out.
// Accepts: "9:00 AM", "09:00", "09:00:00", "9am", "9 AM", any case.
function toMinutes(time: string): number | null {
  const t = time?.trim();
  if (!t) return null;

  // "9:00 AM" / "10:00PM" / "9:00 am"
  const withColon = t.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)$/i);
  if (withColon) {
    let h = parseInt(withColon[1], 10);
    const m = parseInt(withColon[2], 10);
    const period = withColon[3].toUpperCase();
    if (isNaN(h) || isNaN(m)) return null;
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return h * 60 + m;
  }

  // "9am" / "10PM" (no colon, no minutes)
  const bare = t.match(/^(\d{1,2})\s*(AM|PM)$/i);
  if (bare) {
    let h = parseInt(bare[1], 10);
    const period = bare[2].toUpperCase();
    if (isNaN(h)) return null;
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return h * 60;
  }

  // "09:00:00" / "09:00" / "9:00" (24-hour)
  const parts = t.split(":");
  if (parts.length >= 2) {
    const h = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    if (!isNaN(h) && !isNaN(m) && h >= 0 && h < 24 && m >= 0 && m < 60) {
      return h * 60 + m;
    }
  }

  return null;
}

function formatTime12h(mins: number): string {
  const h24 = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const period = h24 >= 12 ? "PM" : "AM";
  const h = ((h24 + 11) % 12) + 1;
  return `${h}:${String(m).padStart(2, "0")} ${period}`;
}

function hourLabel(mins: number): string {
  const h24 = Math.floor(mins / 60) % 24;
  if (h24 === 12) return "12p";
  if (h24 === 0) return "12a";
  return h24 < 12 ? `${h24}a` : `${h24 - 12}p`;
}

function initial(name: string | null | undefined): string {
  if (!name) return "·";
  return name.trim().charAt(0).toUpperCase();
}

function formatDateShort(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d)
    .toLocaleDateString("es-CR", { weekday: "short", day: "numeric", month: "short" })
    .replace(".", "");
}

export default function DayStrip({
  today,
  appointments,
  todayCount,
  todayRevenue,
  currencySymbol,
  nextUpcoming,
  isWorkingDay,
  slotTimes,
}: Props) {
  const todayLabel = new Date(
    Number(today.slice(0, 4)),
    Number(today.slice(5, 7)) - 1,
    Number(today.slice(8, 10))
  )
    .toLocaleDateString("es-CR", { weekday: "long", day: "numeric", month: "short" })
    .replace(".", "");

  // ---- Parse slot times ----
  const slotMinutes = slotTimes
    .map(toMinutes)
    .filter((n): n is number => n !== null);

  // ---- Parse appointments: skip cancelled, pre-compute dur ----
  const parsedAppts = appointments
    .filter((a) => a.status !== "cancelled")
    .map((a) => ({
      ...a,
      startMin: toMinutes(a.time),
      dur: Math.max(15, a.duration ?? 60),
    }))
    .filter((a): a is typeof a & { startMin: number } => a.startMin !== null);

  const slotsConfigured = slotMinutes.length > 0;
  const hasAppts = parsedAppts.length > 0;

  // ---- Status-derived counts ----
  const activeCount  = parsedAppts.filter((a) => a.status === "active").length;
  const allDone      = hasAppts && activeCount === 0;
  const firstActive  = parsedAppts.find((a) => a.status === "active");

  // ---- Build day range ----
  const apptEnds = parsedAppts.map((a) => a.startMin + a.dur);
  const allStarts: number[] = [...slotMinutes, ...parsedAppts.map((a) => a.startMin)];

  const dayStart = allStarts.length > 0 ? Math.min(...allStarts) : null;
  // Day range is driven by the manicurista's CONFIGURED slots only.
  // Appointments that overflow the schedule get clipped visually (see render below).
  const dayEnd = slotsConfigured
    ? Math.max(...slotMinutes) + 60
    : apptEnds.length > 0
      ? Math.max(...apptEnds)
      : dayStart !== null ? dayStart + 4 * 60 : null;
  const dayTotal = dayStart !== null && dayEnd !== null
    ? Math.max(dayEnd - dayStart, 60)
    : 60;
  const hasRange = dayStart !== null && dayEnd !== null;

  // ---- Hour tick marks ----
  const ticks: number[] = [];
  if (hasRange) {
    const firstHour = Math.floor(dayStart! / 60);
    const lastHour  = Math.ceil(dayEnd! / 60);
    for (let h = firstHour; h <= lastHour; h++) ticks.push(h * 60);
  }

  // ---- Copy variant ----
  const dayMid  = hasRange ? dayStart! + dayTotal / 2 : 0;
  const isEmpty = todayCount === 0;

  function copyVariant(): "rest" | "empty" | "allDone" | "morning" | "afternoon" | "spread" | "full" {
    if (!isWorkingDay) return "rest";
    if (isEmpty)  return "empty";
    if (allDone)  return "allDone";
    if (todayCount >= 6) return "full";
    const before = parsedAppts.filter((a) => a.startMin < dayMid).length;
    const after  = todayCount - before;
    if (before >= 3 && after === 0) return "morning";
    if (after  >= 3 && before === 0) return "afternoon";
    return "spread";
  }
  const variant = copyVariant();

  const heading =
    variant === "rest" ? (
      <>Hoy es <em className="font-normal italic text-[#846262]">día libre</em>.</>
    ) : variant === "empty" ? (
      <>El día está <em className="font-normal italic text-[#846262]">despejado</em>.</>
    ) : variant === "allDone" ? (
      <>Día completo <em className="font-normal italic text-[#846262]">✓ buen trabajo</em>.</>
    ) : variant === "morning" ? (
      <>{todayCount} citas hoy — <em className="font-normal italic text-[#846262]">mañana llena</em>.</>
    ) : variant === "afternoon" ? (
      <>{todayCount} citas hoy — <em className="font-normal italic text-[#846262]">tarde llena</em>.</>
    ) : variant === "full" ? (
      <>{todayCount} citas — <em className="font-normal italic text-[#846262]">día completo</em>.</>
    ) : (
      <>
        {todayCount} cita{todayCount === 1 ? "" : "s"} hoy —{" "}
        <em className="font-normal italic text-[#846262]">
          {todayCount === 1 ? "una sola" : "tu día"}
        </em>.
      </>
    );

  const subline =
    variant === "rest"
      ? "Tu agenda está cerrada para hoy."
      : isEmpty
      ? "Sin citas para hoy. Disfrutá la mañana."
      : allDone
      ? "Todas las citas del día completadas."
      : firstActive
      ? `Próxima: ${firstActive.client_name ?? "tu clienta"} a las ${formatTime12h(firstActive.startMin)}.`
      : "Sin citas activas pendientes.";

  return (
    <section className="rounded-2xl border border-[#e9cece]/60 bg-white p-5 sm:rounded-3xl sm:p-6 lg:p-7">
      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
        Tu día · {todayLabel}
      </p>
      <h2 className="serif-heading mt-2 text-xl font-medium leading-tight tracking-tight text-[#2d2424] sm:text-2xl lg:text-3xl">
        {heading}
      </h2>
      <p className="mt-1.5 max-w-xl text-[13px] text-[#846262] sm:text-sm">
        {subline}
      </p>

      {hasRange ? (
        <div className="mt-4">
          {/* Gantt bar */}
          <div className="relative h-11 overflow-hidden rounded-md bg-[#f4ecec] sm:h-14">
            {/* Hour gridlines */}
            {ticks.slice(1, -1).map((t) => {
              const pct = ((t - dayStart!) / dayTotal) * 100;
              return (
                <span
                  key={`grid-${t}`}
                  className="absolute top-0 bottom-0 w-px bg-white/60"
                  style={{ left: `${pct}%` }}
                  aria-hidden
                />
              );
            })}

            {/* Appointment blocks — active=dark, completed=rose+check */}
            {parsedAppts.map((a, i) => {
              const isDone = a.status === "completed";
              const left = Math.max(0, ((a.startMin - dayStart!) / dayTotal) * 100);
              const apptEndMin = a.startMin + a.dur;
              const overflowsSchedule = apptEndMin > dayEnd!;
              const visibleEnd = Math.min(apptEndMin, dayEnd!);
              const visibleDur = visibleEnd - Math.max(a.startMin, dayStart!);
              const width = (visibleDur / dayTotal) * 100;
              if (width <= 0) return null;
              const firstName = (a.client_name ?? "").split(" ")[0];
              return (
                <div
                  key={`appt-${i}`}
                  className={[
                    "absolute top-0 bottom-0 flex items-center justify-center gap-1.5 overflow-hidden rounded-md",
                    isDone
                      ? "bg-[#e9cece] text-[#2d2424]"
                      : "bg-[#2d2424] text-[#fbf9f9]",
                  ].join(" ")}
                  style={{
                    left: `calc(${left}% + 2px)`,
                    width: `calc(${width}% - 4px)`,
                  }}
                  title={`${a.client_name ?? ""} · ${formatTime12h(a.startMin)} · ${a.dur}min${overflowsSchedule ? " · se extiende fuera del horario" : isDone ? " · completada" : ""}`}
                >
                  {isDone && <Check className="h-3 w-3 shrink-0" strokeWidth={2.5} />}
                  {width < 8 ? (
                    <span className="serif-heading text-xs leading-none">
                      {initial(a.client_name)}
                    </span>
                  ) : (
                    <span className="truncate px-1 text-[11px] font-medium sm:text-xs">
                      {firstName}
                    </span>
                  )}
                  {overflowsSchedule && (
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] opacity-70">→</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Hour-tick labels */}
          <div className="relative mt-1.5 h-3">
            {ticks.map((t) => {
              const pct = ((t - dayStart!) / dayTotal) * 100;
              return (
                <span
                  key={`tick-${t}`}
                  className="absolute -translate-x-1/2 text-[9px] tracking-wide text-[#b89090] sm:text-[10px]"
                  style={{ left: `${pct}%` }}
                >
                  {hourLabel(t)}
                </span>
              );
            })}
          </div>

          {/* Microlabel: detected schedule range */}
          {slotsConfigured && (
            <p className="mt-2 text-[10px] text-[#b89090]">
              Tu horario: {hourLabel(Math.min(...slotMinutes))} – {hourLabel(Math.max(...slotMinutes))}
            </p>
          )}
        </div>
      ) : (
        <div className="mt-4 rounded-md border border-dashed border-[#e9cece] bg-[#f4ecec]/50 px-4 py-5">
          <p className="text-[13px] text-[#846262] sm:text-sm">
            Todavía no tenés horarios configurados.{" "}
            <a href="/perfil" className="font-medium text-[#2d2424] underline">
              Configuralos →
            </a>
          </p>
        </div>
      )}

      {/* Stats — 3 cols */}
      <div className="mt-5 grid grid-cols-3 gap-4 border-t border-[#e9cece]/40 pt-4 sm:mt-6 sm:gap-6 sm:pt-5">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Citas hoy
          </p>
          <p className="serif-heading mt-1 text-xl font-medium leading-none tracking-tight text-[#2d2424] sm:text-2xl">
            {todayCount}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            <span className="hidden sm:inline">Ingresos esperados</span>
            <span className="sm:hidden">Ingresos</span>
          </p>
          <p className="serif-heading mt-1 text-xl font-medium leading-none tracking-tight text-[#2d2424] sm:text-2xl">
            {currencySymbol}{todayRevenue.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Próxima
          </p>
          <p className="serif-heading mt-1 text-xl font-medium leading-none tracking-tight text-[#2d2424] sm:text-2xl">
            {variant === "rest" || isEmpty || allDone
              ? nextUpcoming
                ? formatDateShort(nextUpcoming.date)
                : "—"
              : firstActive
              ? formatTime12h(firstActive.startMin)
              : "—"}
          </p>
        </div>
      </div>
    </section>
  );
}
