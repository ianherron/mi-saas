// Realistic mini-screens of the redesigned NailFlow mobile app.
// Used in the "Tu negocio, a tu ritmo" landing section.
// Each phone is a faithful microcosm of the real app UI.

const FRAME_BASE =
  "relative aspect-[9/19] overflow-hidden border-[4px] border-[#1a1414] bg-[#fbf9f9]";

function Notch() {
  return (
    <div className="absolute left-1/2 top-[6px] z-20 h-[10px] w-[50px] -translate-x-1/2 rounded-full bg-[#1a1414]" />
  );
}

// ============================================================
// Dashboard — editorial top + Gantt strip + stats + booking link
// ============================================================
export function PhoneDashboard({ width = 190 }: { width?: number }) {
  const bars = [
    { left: 4, width: 18, label: "V" },
    { left: 30, width: 12, label: "M" },
    { left: 60, width: 30, label: "S" },
  ];
  return (
    <div style={{ width }} className="shrink-0">
      <div
        style={{ width }}
        className={`${FRAME_BASE} rounded-[38px] shadow-[0_28px_56px_rgba(0,0,0,0.45)]`}
      >
        <Notch />
        <div className="absolute inset-0 overflow-hidden bg-[#fbf9f9] pt-[22px]">
          <div className="flex flex-col gap-[9px] px-[11px] py-[10px]">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-1">
                <div className="flex h-4 w-4 items-center justify-center rounded-[5px] bg-[#2d2424] text-[9px] leading-none text-[#e9cece]">
                  ✦
                </div>
                <span className="serif-heading text-[9px] font-semibold text-[#2d2424]">
                  NailFlow
                </span>
              </div>
              <span className="text-[11px] text-[#2d2424]">≡</span>
            </div>

            <div>
              <p className="text-[6px] font-medium uppercase tracking-[0.12em] text-[#846262]">
                Miércoles 13 mayo
              </p>
              <h3 className="serif-heading mt-[2px] text-[12px] font-medium leading-[1.05] tracking-tight text-[#2d2424]">
                Buenas, Camila.
              </h3>
            </div>

            <div className="rounded-[10px] border border-[#2d2424]/[0.08] bg-white p-[9px]">
              <p className="text-[6px] font-medium uppercase tracking-[0.12em] text-[#846262]">
                Tu día
              </p>
              <p className="serif-heading mt-[3px] text-[11px] font-medium leading-[1.1] tracking-tight text-[#2d2424]">
                3 citas —{" "}
                <em className="font-normal italic text-[#846262]">
                  tarde llena
                </em>
                .
              </p>

              <div className="relative mt-[6px] h-[14px] overflow-hidden rounded-[4px] bg-[#f4ecec]">
                {bars.map((b, i) => (
                  <div
                    key={i}
                    style={{ left: `${b.left}%`, width: `${b.width}%` }}
                    className="absolute inset-y-[1px] flex items-center justify-center rounded-[3px] bg-[#2d2424] text-[6px] leading-none text-[#fbf9f9] font-serif"
                  >
                    {b.label}
                  </div>
                ))}
              </div>
              <div className="mt-[2px] flex justify-between text-[5px] text-[#b89090]">
                <span>9a</span>
                <span>12p</span>
                <span>3p</span>
                <span>6p</span>
              </div>

              <div className="mt-[7px] grid grid-cols-3 gap-[6px] border-t border-[#2d2424]/[0.08] pt-[6px]">
                {[
                  { l: "Citas", v: "3" },
                  { l: "Ingresos", v: "₡54k" },
                  { l: "Próxima", v: "10am" },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="text-[5px] uppercase tracking-[0.1em] text-[#846262]">
                      {s.l}
                    </p>
                    <p className="serif-heading mt-[1px] text-[9px] font-medium leading-none text-[#2d2424]">
                      {s.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[10px] bg-[#2d2424] p-[9px] text-[#fbf9f9]">
              <p className="text-[6px] font-medium uppercase tracking-[0.12em] text-[#e9cece]">
                Tu enlace
              </p>
              <p className="serif-heading mt-[3px] text-[9px] font-medium leading-[1.15] text-[#fbf9f9]">
                Compartilo con tus{" "}
                <em className="font-normal italic text-[#e9cece]">clientas</em>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Reservas — public booking page (/reservar/[slug])
// ============================================================
export function PhoneReservas({ width = 140 }: { width?: number }) {
  const services = [
    { name: "Acrílicas", price: "₡22k", active: true },
    { name: "Manicure", price: "₡12k", active: false },
    { name: "Diseño en gel", price: "₡20k", active: false },
  ];
  return (
    <div style={{ width }} className="shrink-0">
      <div
        style={{ width }}
        className={`${FRAME_BASE} rounded-[32px] shadow-[0_18px_36px_rgba(0,0,0,0.30)]`}
      >
        <Notch />
        <div className="absolute inset-0 overflow-hidden bg-[#fbf9f9] pt-[22px]">
          <div className="flex flex-col">
            <div className="relative h-[36px] bg-gradient-to-br from-[#e9cece] to-[#b89090]">
              <div className="serif-heading absolute -bottom-2 left-1/2 flex h-[18px] w-[18px] -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#fbf9f9] bg-[#e9cece] text-[8px] font-medium text-[#2d2424]">
                C
              </div>
            </div>
            <div className="px-[9px] pb-[9px] pt-[14px] text-center">
              <p className="serif-heading text-[10px] font-semibold tracking-tight text-[#2d2424]">
                Camila Nails
              </p>
              <p className="mt-[1px] text-[6px] text-[#846262]">
                by Camila Vargas
              </p>
            </div>
            <div className="flex flex-col gap-[6px] px-2">
              <p className="text-[6px] uppercase tracking-[0.12em] text-[#846262]">
                Elegí servicio
              </p>
              {services.map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between rounded-[8px] border bg-white px-2 py-[6px] ${
                    s.active
                      ? "border-[#e9cece]"
                      : "border-[#2d2424]/[0.08]"
                  }`}
                >
                  <span className="text-[7px] font-medium text-[#2d2424]">
                    {s.name}
                  </span>
                  <span className="serif-heading text-[8px] font-medium text-[#2d2424]">
                    {s.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Reportes — editorial number + chart
// ============================================================
export function PhoneReportes({ width = 140 }: { width?: number }) {
  const points = [
    [0, 70], [10, 60], [20, 40], [30, 65], [40, 35],
    [50, 20], [60, 55], [70, 30], [80, 15], [90, 45], [100, 25],
  ] as const;
  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
    .join(" ");
  const areaPath = `${linePath} L 100 100 L 0 100 Z`;

  return (
    <div style={{ width }} className="shrink-0">
      <div
        style={{ width }}
        className={`${FRAME_BASE} rounded-[32px] shadow-[0_18px_36px_rgba(0,0,0,0.30)]`}
      >
        <Notch />
        <div className="absolute inset-0 overflow-hidden bg-[#fbf9f9] pt-[22px]">
          <div className="flex flex-col gap-2 px-[9px] py-[10px]">
            <div>
              <p className="text-[6px] font-medium uppercase tracking-[0.12em] text-[#846262]">
                Mayo 2026
              </p>
              <h3 className="serif-heading mt-[2px] text-[14px] font-medium leading-[1.05] tracking-tight text-[#2d2424]">
                ₡805k{" "}
                <em className="font-normal italic text-[#846262]">este mes</em>.
              </h3>
              <p className="mt-[2px] text-[6px] text-[#846262]">+12% vs abril</p>
            </div>

            <div className="flex gap-1">
              {[
                { l: "Completas", v: "24" },
                { l: "Canceladas", v: "3" },
                { l: "Promedio", v: "₡34k" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-[6px] border border-[#2d2424]/[0.08] bg-white p-[5px]"
                >
                  <p className="text-[5px] uppercase tracking-[0.1em] text-[#846262]">
                    {s.l}
                  </p>
                  <p className="serif-heading mt-[1px] text-[8px] font-medium leading-none text-[#2d2424]">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[8px] border border-[#2d2424]/[0.08] bg-white p-2">
              <p className="text-[5px] uppercase tracking-[0.1em] text-[#846262]">
                Ingresos diarios
              </p>
              <p className="serif-heading mb-1 mt-[1px] text-[8px] font-medium leading-none text-[#2d2424]">
                Tu ritmo,{" "}
                <em className="font-normal italic text-[#846262]">
                  día a día
                </em>
                .
              </p>
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="block h-10 w-full"
              >
                <defs>
                  <linearGradient
                    id="lr-chart-grad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#e9cece" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#e9cece" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={areaPath} fill="url(#lr-chart-grad)" />
                <path
                  d={linePath}
                  stroke="#2d2424"
                  strokeWidth="1.5"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            <div className="rounded-[8px] bg-[#2d2424] p-[7px]">
              <p className="text-[5px] uppercase tracking-[0.1em] text-[#e9cece]">
                Tu observación
              </p>
              <p className="serif-heading mt-[1px] text-[8px] font-medium leading-[1.1] text-[#fbf9f9]">
                Los{" "}
                <em className="font-normal italic text-[#e9cece]">sábados</em>{" "}
                son tu mejor día.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
