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
                Recordá por qué empezaste. Y seguí.
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
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-[#2d2424] px-7 py-4 text-base font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
            >
              Únete a la lista de espera
            </a>
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
