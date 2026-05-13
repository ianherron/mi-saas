type TodayAppt = {
  time: string;
  duration: number | null;
  client_name: string | null;
  total_price: number | null;
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

  // ---- Parse slot times (filter out unparseable) ----
  const slotMinutes = slotTimes
    .map(toMinutes)
    .filter((n): n is number => n !== null);

  // ---- Parse appointment times, keeping alignment with original array ----
  const parsedAppts = appointments
    .map((a) => ({ ...a, startMin: toMinutes(a.time) }))
    .filter((a): a is typeof a & { startMin: number } => a.startMin !== null);

  const slotsConfigured = slotMinutes.length > 0;
  const hasAppts = parsedAppts.length > 0;

  // ---- Build day range from BOTH slots and real appointment start/end times ----
  const longestDuration = hasAppts
    ? Math.max(60, ...parsedAppts.map((a) => a.duration ?? 60))
    : 60;

  const allStarts: number[] = [...slotMinutes, ...parsedAppts.map((a) => a.startMin)];
  const allEnds: number[] = [
    ...(slotsConfigured ? [Math.max(...slotMinutes) + longestDuration] : []),
    ...parsedAppts.map((a) => a.startMin + (a.duration ?? 60)),
  ];

  const dayStart = allStarts.length > 0 ? Math.min(...allStarts) : null;
  const dayEnd = allEnds.length > 0 ? Math.max(...allEnds) : null;
  const dayTotal = dayStart !== null && dayEnd !== null
    ? Math.max(dayEnd - dayStart, 60)
    : 60;

  // Show the strip if we have either slots or appointments
  const hasRange = dayStart !== null && dayEnd !== null;

  // ---- Hour tick marks ----
  const ticks: number[] = [];
  if (hasRange) {
    const firstHour = Math.floor(dayStart! / 60);
    const lastHour = Math.ceil(dayEnd! / 60);
    for (let h = firstHour; h <= lastHour; h++) ticks.push(h * 60);
  }

  // ---- Copy variant ----
  const dayMid = hasRange ? dayStart! + dayTotal / 2 : 0;
  const isEmpty = todayCount === 0;

  function copyVariant(): "rest" | "empty" | "morning" | "afternoon" | "spread" | "full" {
    if (!isWorkingDay) return "rest";
    if (isEmpty) return "empty";
    if (todayCount >= 6) return "full";
    const before = parsedAppts.filter((a) => a.startMin < dayMid).length;
    const after = todayCount - before;
    if (before >= 3 && after === 0) return "morning";
    if (after >= 3 && before === 0) return "afternoon";
    return "spread";
  }
  const variant = copyVariant();

  const heading =
    variant === "rest" ? (
      <>Hoy es <em className="font-normal italic text-[#846262]">día libre</em>.</>
    ) : variant === "empty" ? (
      <>El día está <em className="font-normal italic text-[#846262]">despejado</em>.</>
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

  const firstAppt = parsedAppts[0];
  const subline =
    variant === "rest"
      ? "Tu agenda está cerrada para hoy."
      : isEmpty
        ? "Sin citas para hoy. Disfrutá la mañana."
        : `Próxima: ${firstAppt?.client_name ?? "tu clienta"} a las ${formatTime12h(firstAppt!.startMin)}.`;

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

            {/* Appointment blocks */}
            {parsedAppts.map((a, i) => {
              const dur = Math.max(15, a.duration ?? 60);
              const left = Math.max(0, ((a.startMin - dayStart!) / dayTotal) * 100);
              const widthRaw = (dur / dayTotal) * 100;
              const width = Math.min(widthRaw, 100 - left);
              if (width <= 0) return null;
              const firstName = (a.client_name ?? "").split(" ")[0];
              return (
                <div
                  key={`appt-${i}`}
                  className="absolute top-0 bottom-0 flex items-center justify-center overflow-hidden rounded-md bg-[#2d2424] text-[#fbf9f9]"
                  style={{
                    left: `calc(${left}% + 2px)`,
                    width: `calc(${width}% - 4px)`,
                  }}
                  title={`${a.client_name ?? ""} · ${formatTime12h(a.startMin)} · ${dur}min`}
                >
                  {width < 8 ? (
                    <span className="serif-heading text-xs leading-none">
                      {initial(a.client_name)}
                    </span>
                  ) : (
                    <span className="truncate px-1 text-[11px] font-medium text-[#fbf9f9] sm:text-xs">
                      {firstName}
                    </span>
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
        // No slots AND no appointments — onboarding nudge
        <div className="mt-4 rounded-md border border-dashed border-[#e9cece] bg-[#f4ecec]/50 px-4 py-5">
          <p className="text-[13px] text-[#846262] sm:text-sm">
            Todavía no tenés horarios configurados.{" "}
            <a href="/perfil" className="font-medium text-[#2d2424] underline">
              Configuralos →
            </a>
          </p>
        </div>
      )}

      {/* Stats — 3 cols always */}
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
            {variant === "rest" || isEmpty
              ? nextUpcoming
                ? formatDateShort(nextUpcoming.date)
                : "—"
              : formatTime12h(firstAppt!.startMin)}
          </p>
        </div>
      </div>
    </section>
  );
}
