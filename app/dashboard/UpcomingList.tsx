interface Service {
  name: string | null;
}
interface Appointment {
  id: number | string;
  date: string;
  time: string;
  client_name: string | null;
  total_price: number | null;
  services?: Service | null;
}

interface Props {
  appointments: Appointment[];
  currencySymbol: string;
}

const MONTHS = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];

function dateParts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { day: d, mon: MONTHS[m - 1], y };
}

function formatTime(t: string): string {
  // Handle "9:00 AM" / "10:30 PM" already in 12h format
  const ampm = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (ampm) return `${ampm[1]}:${ampm[2]} ${ampm[3].toUpperCase()}`;
  // Handle 24h "09:00" / "09:00:00"
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${String(m).padStart(2, "0")} ${period}`;
}

function initial(name: string | null | undefined): string {
  if (!name) return "·";
  return name.trim().charAt(0).toUpperCase();
}

export default function UpcomingList({ appointments, currencySymbol }: Props) {
  const isEmpty = appointments.length === 0;

  return (
    <section className="rounded-2xl border border-[#e9cece]/60 bg-white px-1.5 sm:rounded-3xl sm:px-2">
      <div className="flex items-center justify-between px-3.5 py-4 sm:px-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
          Próximas citas
        </p>
        <a
          href="/citas"
          className="text-[12px] font-medium text-[#846262] transition-colors hover:text-[#2d2424]"
        >
          Ver todas →
        </a>
      </div>

      {isEmpty ? (
        <div className="px-4 py-10 text-center">
          <p className="text-sm text-[#b89090]">No hay citas próximas.</p>
        </div>
      ) : (
        <ul className="divide-y divide-[#e9cece]/30">
          {appointments.map((a) => {
            const { day, mon } = dateParts(a.date);
            return (
              <li
                key={a.id}
                className="flex flex-wrap items-center gap-3 px-3 py-3.5 sm:flex-nowrap sm:gap-4 sm:px-4 sm:py-4"
              >
                <div className="flex w-12 shrink-0 flex-col items-center border-r border-[#e9cece]/40 pr-3 sm:w-14 sm:pr-4">
                  <span className="serif-heading text-xl font-medium leading-none text-[#2d2424] sm:text-2xl">
                    {day}
                  </span>
                  <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.1em] text-[#b89090] sm:text-[10px]">
                    {mon}
                  </span>
                </div>

                <div className="serif-heading flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e9cece] text-sm font-medium text-[#2d2424]">
                  {initial(a.client_name)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#2d2424]">
                    {a.client_name ?? "—"}
                  </p>
                  <p className="truncate text-xs text-[#846262]">
                    {a.services?.name ?? "Servicio"} · {formatTime(a.time)}
                  </p>
                </div>

                <div className="ml-12 flex shrink-0 items-center gap-2 sm:ml-0 sm:flex-col sm:items-end sm:gap-1">
                  <p className="text-sm font-medium text-[#2d2424]">
                    {currencySymbol}
                    {(a.total_price ?? 0).toLocaleString()}
                  </p>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                    Confirmada
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
