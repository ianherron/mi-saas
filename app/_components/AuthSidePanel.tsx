// Shared editorial side panel for /login and /registrar.
// Dark ink panel with brand voice. Hidden on mobile (< lg).

interface Props {
  kind: "login" | "registrar";
}

export default function AuthSidePanel({ kind }: Props) {
  return (
    <aside className="relative hidden flex-col overflow-hidden bg-[#2d2424] px-10 py-12 text-[#fbf9f9] lg:flex lg:w-[480px] lg:flex-none xl:w-[540px]">
      {/* Big decorative ✦ */}
      <span
        aria-hidden
        className="serif-heading pointer-events-none absolute -right-16 -top-20 text-[480px] leading-none text-[#e9cece]/[0.08]"
      >
        ✦
      </span>

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#e9cece] text-base leading-none text-[#2d2424]">
          ✦
        </div>
        <span className="serif-heading text-lg font-medium tracking-tight">
          NailFlow
        </span>
      </div>

      {/* Middle content */}
      <div className="relative z-10 my-auto max-w-[420px]">
        {kind === "login" ? (
          <>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#e9cece]">
              Bienvenida de vuelta
            </p>
            <h2 className="serif-heading mt-3.5 text-5xl font-medium leading-[1.05] tracking-tight text-[#fbf9f9]">
              Tu agenda,
              <br />
              <em className="font-normal italic text-[#e9cece]">al alcance</em>.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-[#fbf9f9]/70">
              Citas, pagos por SINPE Móvil, reportes claros — todo en un solo lugar.
            </p>

            <blockquote className="mt-9 rounded-2xl border border-[#fbf9f9]/10 bg-[#fbf9f9]/[0.06] p-5">
              <p className="serif-heading text-[17px] font-medium leading-snug tracking-tight text-[#fbf9f9]">
                "Mis clientas ahora reservan solas.{" "}
                <em className="font-normal italic text-[#e9cece]">
                  Yo solo confirmo
                </em>
                ."
              </p>
              <p className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#e9cece]">
                Camila V. · Heredia, CR
              </p>
            </blockquote>
          </>
        ) : (
          <>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#e9cece]">
              Para manicuristas · Costa Rica
            </p>
            <h2 className="serif-heading mt-3.5 text-5xl font-medium leading-[1.05] tracking-tight text-[#fbf9f9]">
              Tu agenda,
              <br />
              <em className="font-normal italic text-[#e9cece]">en modo pro</em>.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-[#fbf9f9]/70">
              Sumate a las manicuristas que digitalizaron su negocio con elegancia.
            </p>

            <ul className="mt-7 flex flex-col gap-3">
              {[
                "Reservas automáticas 24/7",
                "Pagos anticipados por SINPE Móvil",
                "Reportes claros de tus ingresos",
                "Galería de trabajos para tu marca",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-sm text-[#fbf9f9]/90"
                >
                  <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#e9cece] text-[10px] font-semibold text-[#2d2424]">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-[#e9cece]/20 bg-[#e9cece]/[0.12] px-4 py-3.5">
              <p className="text-[13px] font-medium text-[#e9cece]">
                <em className="font-normal italic">30 días gratis</em> · cancelás cuando querás
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <p className="relative z-10 text-[11px] font-medium uppercase tracking-[0.15em] text-[#b89090]">
        ✦ Hecho en Costa Rica
      </p>
    </aside>
  );
}
