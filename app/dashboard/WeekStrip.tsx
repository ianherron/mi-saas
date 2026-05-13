interface Day {
  date: string;
  count: number;
  total: number;
}

interface Props {
  days: Day[];
  today: string;
  weekCount: number;
  weekTotal: number;
  currencySymbol: string;
}

const WEEKDAY_LETTERS = ["D", "L", "M", "M", "J", "V", "S"];

function dayLetter(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return WEEKDAY_LETTERS[new Date(y, m - 1, d).getDay()];
}

function dayNumber(iso: string): string {
  return String(Number(iso.slice(8, 10)));
}

export default function WeekStrip({
  days,
  today,
  weekCount,
  weekTotal,
  currencySymbol,
}: Props) {
  const max = Math.max(6, ...days.map((d) => d.count));
  const isEmpty = weekCount === 0;

  return (
    <section className="rounded-2xl border border-[#e9cece]/60 bg-white p-5 sm:rounded-3xl sm:p-6">
      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
        Esta semana
      </p>
      <h3 className="serif-heading mt-1.5 text-lg font-medium leading-tight tracking-tight text-[#2d2424] sm:text-xl">
        {isEmpty ? (
          <>
            0 citas —{" "}
            <em className="font-normal italic text-[#846262]">
              tu semana arranca aquí
            </em>
            .
          </>
        ) : (
          <>
            {weekCount} cita{weekCount === 1 ? "" : "s"},{" "}
            <em className="font-normal italic text-[#846262]">
              {currencySymbol}
              {weekTotal.toLocaleString()}
            </em>
            .
          </>
        )}
      </h3>

      <div className="mt-5 grid h-20 grid-cols-7 items-end gap-2 sm:h-24 sm:gap-2.5">
        {days.map((d) => {
          const isToday = d.date === today;
          const hRatio = max > 0 ? d.count / max : 0;
          const heightPct = hRatio * 80 + 6;
          const bg =
            d.count === 0 ? "#f4ecec" : isToday ? "#2d2424" : "#e9cece";
          return (
            <div
              key={d.date}
              className="flex h-full flex-col items-center justify-end"
            >
              <span
                className={`mb-1.5 text-[10px] sm:text-[11px] ${
                  isToday ? "font-semibold text-[#2d2424]" : "text-[#b89090]"
                }`}
              >
                {d.count || "·"}
              </span>
              <div
                className="w-full rounded-md"
                style={{ height: `${heightPct}%`, background: bg }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2 sm:gap-2.5">
        {days.map((d) => {
          const isToday = d.date === today;
          return (
            <div key={d.date} className="text-center">
              <div className="text-[10px] tracking-wide text-[#b89090]">
                {dayLetter(d.date)}
              </div>
              <div
                className={`text-[11px] ${
                  isToday ? "font-semibold text-[#2d2424]" : "text-[#846262]"
                }`}
              >
                {dayNumber(d.date)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
