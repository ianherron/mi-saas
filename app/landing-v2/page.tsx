"use client";

import Link from "next/link";
import AnimateOnScroll from "../AnimateOnScroll";
import {
  Calendar,
  MessageCircle,
  ImageIcon,
  CreditCard,
  BarChart3,
  Gift,
  Check,
  ArrowRight,
} from "lucide-react";

// ── Inline phone mock ──────────────────────────────────────────────
function HeroPhoneMock() {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[300px]">
      <div className="relative overflow-hidden rounded-[44px] border-[6px] border-[#2d2424] bg-[#fbf9f9] shadow-[0_40px_80px_rgba(45,36,36,0.18)]">
        {/* Status bar */}
        <div className="flex items-center justify-between bg-[#fbf9f9] px-6 pt-3 pb-1">
          <span className="text-[10px] font-semibold text-[#2d2424]">9:41</span>
          <div className="h-3 w-20 rounded-full bg-[#2d2424]" />
          <span className="text-[10px] font-semibold text-[#2d2424]">●●●</span>
        </div>
        {/* Content */}
        <div className="px-4 pb-6 pt-3">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-[#846262]">Hoy · jue 19 jul</p>
          <h3 className="mt-1 font-serif text-[18px] font-medium leading-tight text-[#2d2424]">
            4 citas — <em className="italic text-[#846262]">día lleno.</em>
          </h3>
          {/* Timeline bar */}
          <div className="mt-3 h-9 overflow-hidden rounded-lg bg-[#f4ecec]">
            {[
              { l: 8, w: 22, name: "Ana" },
              { l: 34, w: 18, name: "Vale" },
              { l: 56, w: 24, name: "Sofi" },
              { l: 84, w: 12, name: "Lu" },
            ].map((b, i) => (
              <div
                key={i}
                style={{ left: `${b.l}%`, width: `${b.w}%` }}
                className="absolute inset-y-[3px] flex items-center justify-center rounded-md bg-[#2d2424] text-[9px] font-medium text-[#fbf9f9]"
              >
                {b.name}
              </div>
            ))}
          </div>
          {/* Stats */}
          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#2d2424]/[0.08] pt-3">
            {[
              { l: "Citas", v: "4" },
              { l: "Ingresos", v: "$144" },
              { l: "Próxima", v: "10 AM" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-[8px] font-medium uppercase tracking-wider text-[#846262]">{s.l}</p>
                <p className="mt-0.5 font-serif text-[15px] font-medium leading-none text-[#2d2424]">{s.v}</p>
              </div>
            ))}
          </div>
          {/* Appointment list */}
          <div className="mt-3 flex flex-col gap-2">
            {[
              { name: "Ana García", svc: "Acrílicas", time: "10:00 AM" },
              { name: "Valentina M.", svc: "Gel + diseño", time: "11:30 AM" },
              { name: "Sofía R.", svc: "Semipermanente", time: "2:00 PM" },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-white p-2.5 shadow-sm">
                <div>
                  <p className="text-[10px] font-semibold text-[#2d2424]">{a.name}</p>
                  <p className="text-[9px] text-[#846262]">{a.svc}</p>
                </div>
                <span className="rounded-full bg-[#f4ecec] px-2 py-0.5 text-[9px] font-medium text-[#846262]">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Floating notification */}
      <div className="absolute -right-10 top-16 w-[140px] rounded-2xl bg-[#2d2424] p-3 shadow-[0_16px_32px_rgba(45,36,36,0.2)]">
        <p className="text-[8px] font-semibold uppercase tracking-wider text-[#e9cece]">Nueva reserva</p>
        <p className="mt-1 font-serif text-[12px] font-medium leading-tight text-white">
          <em className="italic text-[#e9cece]">Mariana</em> reservó Acrílicas.
        </p>
        <p className="mt-0.5 text-[9px] text-white/50">Mañana · 11:00 AM</p>
      </div>
      {/* Floating chip */}
      <div className="absolute -left-8 bottom-20 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-[#2d2424] shadow-md">
        ✦ WhatsApp automático
      </div>
    </div>
  );
}

// ── Feature showcase mock ──────────────────────────────────────────
function BookingPageMock() {
  return (
    <div className="mx-auto w-[260px] overflow-hidden rounded-[36px] border-[5px] border-[#2d2424] bg-white shadow-[0_30px_60px_rgba(45,36,36,0.14)]">
      <div className="bg-[#fbf9f9] px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2d2424] text-xs text-[#e9cece]">✦</div>
          <span className="font-serif text-sm font-medium text-[#2d2424]">Camila Nails</span>
        </div>
        <p className="mt-3 text-[9px] font-semibold uppercase tracking-widest text-[#846262]">Elegí tu servicio</p>
        <div className="mt-2 flex flex-col gap-2">
          {["Acrílicas · 60min · $35", "Gel + diseño · 75min · $40", "Semipermanente · 45min · $25"].map((s, i) => (
            <div key={i} className={`rounded-xl border p-2.5 ${i === 0 ? "border-[#e9cece] bg-[#f4ecec]" : "border-[#f0e8e8] bg-white"}`}>
              <p className="text-[10px] font-medium text-[#2d2424]">{s}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl bg-[#2d2424] py-2.5 text-center text-[10px] font-semibold text-white">
          Confirmar reserva →
        </div>
      </div>
    </div>
  );
}

function ReportsMock() {
  return (
    <div className="mx-auto w-[260px] overflow-hidden rounded-[36px] border-[5px] border-[#2d2424] bg-[#fbf9f9] shadow-[0_30px_60px_rgba(45,36,36,0.14)]">
      <div className="px-5 py-4">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#846262]">Resumen del mes</p>
        <p className="mt-1 font-serif text-2xl font-medium text-[#2d2424]">$1,240</p>
        <p className="text-[10px] text-[#846262]">↑ 18% vs mes anterior</p>
        {/* Bar chart */}
        <div className="mt-3 flex items-end gap-1.5 rounded-xl bg-white p-3">
          {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
            <div key={i} className="flex-1">
              <div
                style={{ height: `${h * 0.7}px` }}
                className={`w-full rounded-t-sm ${i === 5 ? "bg-[#2d2424]" : "bg-[#e9cece]"}`}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { l: "Citas", v: "38" },
            { l: "Clientas", v: "24" },
            { l: "Serv. top", v: "Acrílicas" },
            { l: "Prom. cita", v: "$32" },
          ].map((s, i) => (
            <div key={i} className="rounded-lg bg-white p-2">
              <p className="text-[8px] uppercase tracking-wider text-[#846262]">{s.l}</p>
              <p className="font-serif text-sm font-medium text-[#2d2424]">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Features ───────────────────────────────────────────────────────
const FEATURES = [
  { icon: Calendar, title: "Reservas 24/7", desc: "Tus clientas reservan en cualquier momento desde tu página personalizada, sin que vos tengas que hacer nada." },
  { icon: MessageCircle, title: "WhatsApp automático", desc: "Cada reserva confirma sola: tu clienta recibe un mensaje con todos los detalles al instante." },
  { icon: ImageIcon, title: "Galería de trabajos", desc: "Mostrá tus mejores diseños directamente en tu página de reservas para inspirar a nuevas clientas." },
  { icon: CreditCard, title: "Pagos anticipados", desc: "Aceptá adelantos por SINPE Móvil antes de la cita. Menos no-shows, más seguridad para tu negocio." },
  { icon: BarChart3, title: "Dashboard de ingresos", desc: "Mirá cuánto ganaste, cuáles son tus servicios más populares y cómo va tu mes — todo en un gráfico." },
  { icon: Gift, title: "Sistema de referidos", desc: "Ganá dinero real recomendando NailFlow. Por cada manicurista que se una con tu código, te pagamos." },
];

// ── Testimonials ───────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Camila V.", role: "Nail artist · San José", quote: "Antes perdía clientes por no contestar rápido. Ahora todo se agenda solo y yo me concentro en mi trabajo." },
  { name: "Joselyn R.", role: "Manicurista · Heredia", quote: "El WhatsApp automático me salvó la vida. Mis clientas reciben todo al instante y yo no tengo que hacer nada." },
  { name: "Stephanie M.", role: "Nail studio · Cartago", quote: "En un mes ya recuperé lo que pago de suscripción con un solo referido. Literalmente se paga sola." },
];

// ── Nav ────────────────────────────────────────────────────────────
function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#2d2424]/[0.06] bg-[#fbf9f9]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-sm text-[#e9cece]">✦</div>
          <span className="font-serif text-lg font-medium tracking-tight text-[#2d2424]">NailFlow</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {[["Funciones", "#funciones"], ["Precios", "#precios"], ["Testimonios", "#testimonios"]].map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-medium text-[#846262] transition-colors hover:text-[#2d2424]">{label}</a>
          ))}
        </nav>
        <a href="/registrar" className="rounded-xl bg-[#2d2424] px-5 py-2.5 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]">
          Empezar gratis
        </a>
      </div>
    </header>
  );
}

// ── Page ───────────────────────────────────────────────────────────
export default function LandingV2() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#fbf9f9] text-[#2d2424]">
      <Nav />

      <main className="flex-1 pt-20">

        {/* HERO */}
        <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          {/* Gradient bg */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f4ecec] via-[#fbf9f9] to-[#fbf9f9]" />
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="mb-5 inline-block rounded-full border border-[#e9cece] bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#846262]">
              Para manicuristas
            </p>
            <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-[#2d2424] sm:text-6xl lg:text-7xl">
              Tu negocio de uñas,
              <br />
              <em className="italic text-[#846262]">en tu mano.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#846262] sm:text-lg">
              Reservas automáticas, confirmación por WhatsApp y reportes claros. Todo en un solo lugar, hecho para vos.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="/registrar" className="inline-flex items-center gap-2 rounded-xl bg-[#2d2424] px-7 py-4 text-base font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]">
                Empezar 30 días gratis <ArrowRight size={16} />
              </a>
              <a href="#funciones" className="inline-flex items-center gap-2 rounded-xl border-[1.5px] border-[#e9cece] bg-white px-7 py-4 text-base font-medium text-[#2d2424] transition-colors hover:bg-[#f4ecec]">
                Ver cómo funciona
              </a>
            </div>
            <p className="mt-4 text-[13px] text-[#b89090]">✦ Sin tarjeta de crédito · Cancela cuando quieras</p>
            {/* Phone mock */}
            <div className="relative mt-14">
              <HeroPhoneMock />
            </div>
          </div>
        </section>

        {/* CHIPS */}
        <section className="border-y border-[#2d2424]/[0.06] bg-white py-5">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 px-4">
            {["Reservas 24/7", "WhatsApp automático", "Página propia", "Sin papel", "Dashboard de ingresos", "Pagos anticipados"].map((chip) => (
              <span key={chip} className="rounded-full border border-[#e9cece] bg-[#fbf9f9] px-4 py-1.5 text-[12px] font-medium text-[#846262]">
                {chip}
              </span>
            ))}
          </div>
        </section>

        {/* FEATURE SHOWCASE */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8" id="funciones">
          <div className="mx-auto max-w-5xl space-y-24">

            {/* 1 */}
            <AnimateOnScroll>
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#846262]">Tu página de reservas</p>
                  <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-[#2d2424] sm:text-5xl">
                    Tus clientas reservan<br />
                    <em className="italic text-[#846262]">solas.</em>
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[#846262]">
                    Compartís tu link y listo. Ellas eligen el servicio, la fecha y la hora — vos recibís la notificación y la cita queda en tu agenda automáticamente.
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {["Disponible 24/7, incluso cuando dormís", "Confirmación automática por WhatsApp y correo", "Sin llamadas, sin grupos de WhatsApp"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-[#2d2424]">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e9cece] text-[10px] font-bold text-[#2d2424]">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <BookingPageMock />
              </div>
            </AnimateOnScroll>

            {/* 2 */}
            <AnimateOnScroll>
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div className="order-2 lg:order-1">
                  <ReportsMock />
                </div>
                <div className="order-1 lg:order-2">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#846262]">Dashboard de ingresos</p>
                  <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-[#2d2424] sm:text-5xl">
                    Entendé tu negocio<br />
                    <em className="italic text-[#846262]">de un vistazo.</em>
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[#846262]">
                    Cuánto ganaste este mes, cuáles son tus servicios más populares y cómo comparás con el mes anterior — todo en un solo gráfico.
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {["Ingresos diarios, semanales y mensuales", "Servicios más populares", "Historial por clienta"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-[#2d2424]">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e9cece] text-[10px] font-bold text-[#2d2424]">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimateOnScroll>

          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <AnimateOnScroll>
              <div className="mb-14 text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#846262]">Todo incluido</p>
                <h2 className="font-serif text-4xl font-medium tracking-tight text-[#2d2424] sm:text-5xl">
                  Una sola app,<br />
                  <em className="italic text-[#846262]">todo lo que necesitás.</em>
                </h2>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <AnimateOnScroll key={title}>
                  <div className="rounded-2xl border border-[#2d2424]/[0.07] bg-[#fbf9f9] p-6 transition-shadow hover:shadow-md">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4ecec]">
                      <Icon size={20} className="text-[#846262]" />
                    </div>
                    <h3 className="mb-2 font-serif text-lg font-medium text-[#2d2424]">{title}</h3>
                    <p className="text-sm leading-relaxed text-[#846262]">{desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8" id="testimonios">
          <div className="mx-auto max-w-5xl">
            <AnimateOnScroll>
              <div className="mb-14 text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#846262]">Lo que dicen ellas</p>
                <h2 className="font-serif text-4xl font-medium tracking-tight text-[#2d2424] sm:text-5xl">
                  Manicuristas que ya<br />
                  <em className="italic text-[#846262]">trabajan diferente.</em>
                </h2>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {TESTIMONIALS.map(({ name, role, quote }) => (
                <AnimateOnScroll key={name}>
                  <div className="rounded-2xl border border-[#2d2424]/[0.07] bg-white p-6">
                    <p className="text-sm leading-relaxed text-[#2d2424]">&ldquo;{quote}&rdquo;</p>
                    <div className="mt-5 border-t border-[#2d2424]/[0.06] pt-4">
                      <p className="text-sm font-semibold text-[#2d2424]">{name}</p>
                      <p className="text-[11px] text-[#846262]">{role}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8" id="precios">
          <div className="mx-auto max-w-md">
            <AnimateOnScroll>
              <div className="mb-10 text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#846262]">Precios</p>
                <h2 className="font-serif text-4xl font-medium tracking-tight text-[#2d2424]">
                  Simple y<br /><em className="italic text-[#846262]">transparente.</em>
                </h2>
              </div>
              <div className="rounded-3xl border border-[#2d2424]/[0.08] bg-[#fbf9f9] p-8 shadow-[0_20px_60px_rgba(45,36,36,0.08)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#846262]">Plan único</p>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-serif text-5xl font-medium text-[#2d2424]">$6.99</span>
                  <span className="text-sm text-[#846262]">/ mes</span>
                </div>
                <p className="mt-1 text-[13px] text-[#b89090]">30 días gratis · Sin tarjeta</p>
                <div className="my-6 h-px bg-[#2d2424]/[0.08]" />
                <ul className="mb-7 space-y-3">
                  {[
                    "Página de reservas personalizada",
                    "Confirmación automática por WhatsApp y correo",
                    "Galería de trabajos",
                    "Horarios y días configurables",
                    "Extras opcionales",
                    "Dashboard con estadísticas",
                    "Pagos anticipados por SINPE Móvil",
                    "Sistema de referidos",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[13.5px] text-[#2d2424]">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e9cece]">
                        <Check size={10} strokeWidth={3} className="text-[#2d2424]" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/registrar" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2d2424] px-7 py-4 text-base font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]">
                  Empezar 30 días gratis <ArrowRight size={16} />
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-[#2d2424] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <AnimateOnScroll>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9cece]/10 mx-auto">
                <span className="font-serif text-2xl text-[#e9cece]">✦</span>
              </div>
              <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-[#fbf9f9] sm:text-5xl">
                Tu negocio merece<br />
                <em className="italic text-[#e9cece]">trabajar mejor.</em>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[#fbf9f9]/60">
                Empezá hoy con 30 días gratis. Sin tarjeta de crédito, sin compromisos.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="/registrar" className="inline-flex items-center gap-2 rounded-xl bg-[#e9cece] px-7 py-4 text-base font-medium text-[#2d2424] transition-opacity hover:opacity-90">
                  Empezar gratis <ArrowRight size={16} />
                </a>
                <a href="https://apps.apple.com/app/nailflow-gestion-de-salon/id6773913027" className="inline-flex items-center gap-2 rounded-xl border border-[#fbf9f9]/20 px-7 py-4 text-base font-medium text-[#fbf9f9] transition-colors hover:bg-[#fbf9f9]/10">
                  Descargar en App Store
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

      </main>

      <footer className="border-t border-[#2d2424]/[0.06] bg-[#fbf9f9] py-8 text-center text-xs text-[#b89090]">
        © {new Date().getFullYear()} NailFlow. Todos los derechos reservados. ·{" "}
        <Link href="/terminos" className="hover:text-[#2d2424]">Términos</Link> ·{" "}
        <Link href="/privacidad" className="hover:text-[#2d2424]">Privacidad</Link>
      </footer>
    </div>
  );
}
