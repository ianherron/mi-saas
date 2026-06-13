import LandingNav from "../components/LandingNav";

export const metadata = {
  title: "El Club · NailFlow",
  description:
    "NailFlow no es solo una app. Es el lugar para manicuristas que construyen en serio.",
};

export default function ClubPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fbf9f9] text-[#2d2424]">
      <LandingNav />

      <main className="flex-1 pt-24 sm:pt-32">
        {/* ── HERO ── */}
        <section className="px-4 pb-20 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-2xl">
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
              NailFlow · El Club
            </p>

            <h1 className="serif-heading mb-8 text-[42px] font-medium leading-[1.08] tracking-tight sm:text-6xl">
              No es solo una app.
              <br />
              <em className="font-normal italic text-[#846262]">
                Es tu lugar.
              </em>
            </h1>

            <div className="flex flex-col gap-6 text-[17px] leading-relaxed text-[#4a3535] sm:text-lg">
              <p>
                Hay días en que trabajás todo el día, le ponés el alma a cada
                servicio, y aun así sentís que no avanzás. Que nadie ve el
                esfuerzo. Que quizás no vale la pena seguir.
              </p>

              <p>
                Para eso existe este lugar.
              </p>

              <p>
                NailFlow nació para las manicuristas que decidieron que su
                pasión también puede ser su negocio. Las que se levantan aunque
                duela. Las que construyen en silencio, sin aplausos, sin
                garantías.
              </p>

              <p>
                Acá vas a encontrar herramientas para ordenar tu negocio, sí.
                Pero también vas a encontrar una comunidad de mujeres como vos
                que entienden lo que es llevar una agenda, lidiar con clientas,
                manejar los cobros y seguir soñando con crecer.
              </p>

              <p className="font-medium text-[#2d2424]">
                Aquí no estás sola.
              </p>

              <p>
                Cada vez que sientas que querés darte por vencida, volvé acá.
                Recordá por qué empezaste.
              </p>
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-12">
          <div className="border-t border-[#e9cece]" />
        </div>

        {/* ── CTA ── */}
        <section className="px-4 py-20 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-2xl">
            <p className="serif-heading mb-3 text-2xl font-medium sm:text-3xl">
              Bienvenida al club.
            </p>
            <p className="mb-8 text-base text-[#846262]">
              Seguinos en redes para tips, novedades y todo lo que pasa dentro del club.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://instagram.com/nailflowapp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-xl bg-[#2d2424] px-7 py-4 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram · @nailflowapp
              </a>
              <a
                href="https://www.tiktok.com/@nailflowapp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-xl border-[1.5px] border-[#e9cece] bg-transparent px-7 py-4 text-sm font-medium text-[#2d2424] transition-colors hover:bg-[#f4ecec]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
                </svg>
                TikTok · @nailflowapp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#2d2424]/[0.08] px-4 py-8 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-2xl flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#2d2424] text-sm leading-none text-[#e9cece]">
              ✦
            </div>
            <span className="serif-heading text-base font-medium tracking-tight">
              NailFlow
            </span>
          </a>
          <p className="text-xs text-[#846262]">
            Para manicuristas que construyen en serio.
          </p>
        </div>
      </footer>
    </div>
  );
}
