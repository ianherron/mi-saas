"use client";

import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Calendar,
  MessageCircle,
  ImageIcon,
  CreditCard,
  BarChart3,
  Gift,
  Check,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

// ── Animation variants ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Nav ────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 60], ["rgba(251,249,249,0)", "rgba(251,249,249,0.92)"]);
  const border = useTransform(scrollY, [0, 60], ["rgba(45,36,36,0)", "rgba(45,36,36,0.07)"]);

  return (
    <motion.header
      style={{ backgroundColor: bg, borderBottomColor: border }}
      className="fixed top-0 z-50 w-full border-b backdrop-blur-md"
    >
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
        <div className="flex items-center gap-3">
          <a href="/registrar" className="hidden rounded-xl bg-[#2d2424] px-5 py-2.5 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232] md:inline-flex">
            Empezar gratis
          </a>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-[#2d2424]/[0.06] bg-[#fbf9f9] px-5 py-4 md:hidden">
          {[["Funciones", "#funciones"], ["Precios", "#precios"], ["Testimonios", "#testimonios"]].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block py-2.5 text-sm font-medium text-[#846262]">{label}</a>
          ))}
          <a href="/registrar" className="mt-3 block rounded-xl bg-[#2d2424] py-3 text-center text-sm font-medium text-[#fbf9f9]">Empezar gratis</a>
        </div>
      )}
    </motion.header>
  );
}

// ── Hero phone ─────────────────────────────────────────────────────
function HeroPhone() {
  return (
    <div className="relative mx-auto w-[240px] sm:w-[270px]">
      {/* Glow */}
      <div className="absolute inset-0 -z-10 scale-110 rounded-[50px] bg-[#e9cece]/40 blur-3xl" />
      <div className="relative overflow-hidden rounded-[42px] border-[5px] border-[#2d2424] bg-[#fbf9f9] shadow-[0_48px_96px_rgba(45,36,36,0.18)]">
        <div className="flex items-center justify-between bg-[#2d2424] px-6 py-2">
          <span className="text-[10px] font-semibold text-[#e9cece]">9:41</span>
          <div className="h-3 w-16 rounded-full bg-[#1a1414]" />
          <span className="text-[10px] text-[#e9cece]/60">●●●</span>
        </div>
        <div className="px-4 pb-6 pt-3">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-[#846262]">Hoy · jue 19 jul</p>
          <h3 className="mt-1 font-serif text-[17px] font-medium leading-tight text-[#2d2424]">
            4 citas — <em className="italic text-[#846262]">día lleno.</em>
          </h3>
          <div className="relative mt-3 h-8 overflow-hidden rounded-lg bg-[#f4ecec]">
            {[{ l: 5, w: 22, n: "Ana" }, { l: 30, w: 18, n: "Vale" }, { l: 52, w: 24, n: "Sofi" }, { l: 80, w: 15, n: "Lu" }].map((b, i) => (
              <div key={i} style={{ left: `${b.l}%`, width: `${b.w}%` }} className="absolute inset-y-[2px] flex items-center justify-center rounded-md bg-[#2d2424] text-[8px] font-medium text-[#fbf9f9]">{b.n}</div>
            ))}
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5 border-t border-[#2d2424]/[0.08] pt-2.5">
            {[{ l: "Citas", v: "4" }, { l: "Ingresos", v: "$144" }, { l: "Próxima", v: "10 AM" }].map((s) => (
              <div key={s.l}>
                <p className="text-[7px] font-semibold uppercase tracking-wider text-[#846262]">{s.l}</p>
                <p className="mt-0.5 font-serif text-[14px] font-medium leading-none text-[#2d2424]">{s.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            {[{ n: "Ana García", s: "Acrílicas", t: "10:00 AM" }, { n: "Valentina M.", s: "Gel + diseño", t: "11:30 AM" }, { n: "Sofía R.", s: "Semipermanente", t: "2:00 PM" }].map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-white p-2 shadow-sm">
                <div>
                  <p className="text-[9px] font-semibold text-[#2d2424]">{a.n}</p>
                  <p className="text-[8px] text-[#846262]">{a.s}</p>
                </div>
                <span className="rounded-full bg-[#f4ecec] px-1.5 py-0.5 text-[8px] font-medium text-[#846262]">{a.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Floating cards */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        className="absolute -right-12 top-10 w-[130px] rounded-2xl bg-[#2d2424] p-3 shadow-[0_16px_32px_rgba(45,36,36,0.24)]"
      >
        <p className="text-[7px] font-semibold uppercase tracking-wider text-[#e9cece]">Nueva reserva</p>
        <p className="mt-1 font-serif text-[11px] font-medium leading-tight text-white"><em className="italic text-[#e9cece]">Mariana</em> reservó Acrílicas.</p>
        <p className="mt-0.5 text-[8px] text-white/50">Mañana · 11:00 AM</p>
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        className="absolute -left-12 bottom-16 rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-[#2d2424] shadow-md"
      >
        ✦ WhatsApp automático
      </motion.div>
    </div>
  );
}

// ── Feature showcase tabs ──────────────────────────────────────────
const TABS = [
  {
    label: "Agenda",
    content: (
      <div className="px-4 pb-6 pt-3">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#846262]">Tu agenda</p>
        <h3 className="mt-1 font-serif text-[16px] font-medium text-[#2d2424]">Hoy · 4 citas</h3>
        <div className="relative mt-3 h-8 overflow-hidden rounded-lg bg-[#f4ecec]">
          {[{ l: 5, w: 22, n: "Ana" }, { l: 30, w: 18, n: "Vale" }, { l: 52, w: 24, n: "Sofi" }, { l: 80, w: 15, n: "Lu" }].map((b, i) => (
            <div key={i} style={{ left: `${b.l}%`, width: `${b.w}%` }} className="absolute inset-y-[2px] flex items-center justify-center rounded-md bg-[#2d2424] text-[8px] font-medium text-[#fbf9f9]">{b.n}</div>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          {[{ n: "Ana García", s: "Acrílicas", t: "10:00 AM", c: "confirmed" }, { n: "Valentina M.", s: "Gel + diseño", t: "11:30 AM", c: "confirmed" }, { n: "Sofía R.", s: "Semipermanente", t: "2:00 PM", c: "pending" }].map((a, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-white p-2 shadow-sm">
              <div><p className="text-[9px] font-semibold text-[#2d2424]">{a.n}</p><p className="text-[8px] text-[#846262]">{a.s}</p></div>
              <span className="rounded-full bg-[#f4ecec] px-1.5 py-0.5 text-[8px] font-medium text-[#846262]">{a.t}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Reservas",
    content: (
      <div className="px-4 pb-6 pt-3">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#846262]">Tu página</p>
        <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-[#f4ecec] px-2 py-1.5">
          <span className="text-[8px] text-[#846262]">nailflow.app/reservar/camila</span>
        </div>
        <p className="mt-3 text-[9px] font-semibold uppercase tracking-widest text-[#846262]">Elegí tu servicio</p>
        <div className="mt-2 flex flex-col gap-1.5">
          {["Acrílicas · 60min · $35", "Gel + diseño · 75min · $40", "Semipermanente · 45min · $25"].map((s, i) => (
            <div key={i} className={`rounded-xl border p-2 ${i === 0 ? "border-[#e9cece] bg-[#f4ecec]" : "border-[#f0e8e8] bg-white"}`}>
              <p className="text-[9px] font-medium text-[#2d2424]">{s}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl bg-[#2d2424] py-2 text-center text-[9px] font-semibold text-white">Confirmar →</div>
      </div>
    ),
  },
  {
    label: "Reportes",
    content: (
      <div className="px-4 pb-6 pt-3">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#846262]">Este mes</p>
        <p className="mt-1 font-serif text-2xl font-medium text-[#2d2424]">$1,240</p>
        <p className="text-[9px] text-[#846262]">↑ 18% vs mes anterior</p>
        <div className="mt-3 flex items-end gap-1 rounded-xl bg-white p-2.5">
          {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
            <div key={i} className="flex-1">
              <div style={{ height: `${h * 0.55}px` }} className={`w-full rounded-t-sm ${i === 5 ? "bg-[#2d2424]" : "bg-[#e9cece]"}`} />
            </div>
          ))}
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          {[{ l: "Citas", v: "38" }, { l: "Clientas", v: "24" }, { l: "Serv. top", v: "Acrílicas" }, { l: "Prom. cita", v: "$32" }].map((s) => (
            <div key={s.l} className="rounded-lg bg-white p-2">
              <p className="text-[7px] uppercase tracking-wider text-[#846262]">{s.l}</p>
              <p className="font-serif text-sm font-medium text-[#2d2424]">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "WhatsApp",
    content: (
      <div className="px-4 pb-6 pt-3">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#846262]">Confirmación automática</p>
        <div className="mt-3 rounded-2xl bg-[#e2ffc7] p-3">
          <p className="text-[9px] font-semibold text-[#1a4a00]">+1 (447) 333-4011 · NailFlow</p>
          <p className="mt-1.5 text-[10px] leading-relaxed text-[#1a4a00]">Hola Ana 👋 Tu cita está confirmada para el 2026-08-03 a las 10:00 AM. Si necesitás hacer cambios, contactá a Camila Nails al 71503970. ¡Te esperamos!</p>
          <p className="mt-1.5 text-right text-[8px] text-[#1a4a00]/60">10:03 AM ✓✓</p>
        </div>
        <p className="mt-3 text-[9px] leading-relaxed text-[#846262]">Cada vez que una clienta reserva, le llega un mensaje automático con todos los detalles. Sin que vos tengas que hacer nada.</p>
      </div>
    ),
  },
];

function ShowcaseTabs() {
  const [active, setActive] = useState(0);
  return (
    <div className="mx-auto max-w-sm">
      {/* Tab pills */}
      <div className="mb-5 flex justify-center gap-2">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all ${active === i ? "bg-[#2d2424] text-[#fbf9f9]" : "bg-white text-[#846262] hover:bg-[#f4ecec]"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Phone */}
      <div className="relative mx-auto w-[240px]">
        <div className="absolute inset-0 -z-10 scale-110 rounded-[50px] bg-[#e9cece]/30 blur-3xl" />
        <div className="overflow-hidden rounded-[40px] border-[5px] border-[#2d2424] bg-[#fbf9f9] shadow-[0_32px_64px_rgba(45,36,36,0.15)]">
          <div className="flex items-center justify-between bg-[#2d2424] px-6 py-2">
            <span className="text-[10px] font-semibold text-[#e9cece]">9:41</span>
            <div className="h-3 w-16 rounded-full bg-[#1a1414]" />
            <span className="text-[10px] text-[#e9cece]/60">●●●</span>
          </div>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {TABS[active].content}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── Features ───────────────────────────────────────────────────────
const FEATURES = [
  { icon: Calendar, title: "Reservas 24/7", desc: "Tus clientas reservan en cualquier momento desde tu página personalizada, sin que vos tengas que hacer nada." },
  { icon: MessageCircle, title: "WhatsApp automático", desc: "Cada reserva confirma sola: tu clienta recibe un mensaje con todos los detalles al instante." },
  { icon: ImageIcon, title: "Galería de trabajos", desc: "Mostrá tus mejores diseños directamente en tu página para inspirar a nuevas clientas." },
  { icon: CreditCard, title: "Pagos anticipados", desc: "Aceptá adelantos por SINPE Móvil antes de la cita. Menos no-shows, más seguridad." },
  { icon: BarChart3, title: "Dashboard de ingresos", desc: "Cuánto ganaste, cuáles son tus servicios más populares y cómo va tu mes — todo de un vistazo." },
  { icon: Gift, title: "Sistema de referidos", desc: "Ganá dinero real recomendando NailFlow. Por cada manicurista que se una con tu código, te pagamos." },
];

// ── Testimonials ───────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Camila V.", role: "Nail artist · San José", quote: "Antes perdía clientes por no contestar rápido. Ahora todo se agenda solo y yo me concentro en mi trabajo." },
  { name: "Joselyn R.", role: "Manicurista · Heredia", quote: "El WhatsApp automático me salvó la vida. Mis clientas reciben todo al instante y yo no tengo que hacer nada." },
  { name: "Stephanie M.", role: "Nail studio · Cartago", quote: "En un mes ya recuperé lo que pago de suscripción con un solo referido. Literalmente se paga sola." },
];

// ── Page ───────────────────────────────────────────────────────────
export default function LandingV2() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#fbf9f9] text-[#2d2424]">
      <Nav />

      <main className="flex-1 pt-16">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#eddede] via-[#f7f0f0] to-[#fbf9f9]" />
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-[#e9cece]/30 blur-[120px]" />
          <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#f4ecec]/60 blur-[100px]" />

          <Section className="relative mx-auto max-w-4xl text-center">
            <motion.p variants={fadeUp} className="mb-5 inline-block rounded-full border border-[#e9cece] bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#846262] backdrop-blur-sm">
              Para manicuristas
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-[#2d2424] sm:text-6xl lg:text-[72px]">
              Tu negocio de uñas,
              <br />
              <em className="italic text-[#846262]">en tu mano.</em>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#846262] sm:text-lg">
              Reservas automáticas, confirmación por WhatsApp y reportes claros. Todo en un solo lugar, hecho para vos.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="/registrar" className="inline-flex items-center gap-2 rounded-xl bg-[#2d2424] px-7 py-4 text-base font-medium text-[#fbf9f9] shadow-lg shadow-[#2d2424]/20 transition-all hover:bg-[#3d3232] hover:shadow-xl hover:shadow-[#2d2424]/25 hover:-translate-y-0.5">
                Empezar 30 días gratis <ArrowRight size={16} />
              </a>
              <a href="#funciones" className="inline-flex items-center gap-2 rounded-xl border-[1.5px] border-[#e9cece] bg-white/80 px-7 py-4 text-base font-medium text-[#2d2424] backdrop-blur-sm transition-all hover:bg-[#f4ecec] hover:-translate-y-0.5">
                Ver cómo funciona
              </a>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-4 text-[13px] text-[#b89090]">✦ Sin tarjeta de crédito · Cancela cuando quieras</motion.p>
            <motion.div variants={fadeIn} className="mt-14">
              <HeroPhone />
            </motion.div>
          </Section>
        </section>

        {/* ── CHIPS STRIP ── */}
        <section className="border-y border-[#2d2424]/[0.06] bg-white py-5 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-3 whitespace-nowrap"
          >
            {[...Array(2)].map((_, rep) => (
              ["Reservas 24/7", "WhatsApp automático", "Página propia", "Sin papel", "Dashboard de ingresos", "Pagos anticipados", "Sistema de referidos", "Galería de trabajos"].map((chip, i) => (
                <span key={`${rep}-${i}`} className="inline-block rounded-full border border-[#e9cece] bg-[#fbf9f9] px-4 py-1.5 text-[12px] font-medium text-[#846262]">
                  ✦ {chip}
                </span>
              ))
            ))}
          </motion.div>
        </section>

        {/* ── SHOWCASE ── */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8" id="funciones">
          <Section className="mx-auto max-w-5xl">
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#846262]">La app</p>
              <h2 className="font-serif text-4xl font-medium tracking-tight text-[#2d2424] sm:text-5xl">
                Todo lo que necesitás,<br />
                <em className="italic text-[#846262]">en un solo lugar.</em>
              </h2>
            </motion.div>
            <motion.div variants={fadeIn}>
              <ShowcaseTabs />
            </motion.div>
          </Section>
        </section>

        {/* ── FEATURES GRID ── */}
        <section className="bg-[#2d2424] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <Section className="mx-auto max-w-5xl">
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#e9cece]/60">Todo incluido</p>
              <h2 className="font-serif text-4xl font-medium tracking-tight text-[#fbf9f9] sm:text-5xl">
                Una sola app,<br />
                <em className="italic text-[#e9cece]">todo lo que necesitás.</em>
              </h2>
            </motion.div>
            <motion.div variants={staggerFast} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-2xl border border-[#fbf9f9]/[0.07] bg-[#fbf9f9]/[0.04] p-6 backdrop-blur-sm transition-colors hover:bg-[#fbf9f9]/[0.08]"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9cece]/10">
                    <Icon size={20} className="text-[#e9cece]" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-medium text-[#fbf9f9]">{title}</h3>
                  <p className="text-sm leading-relaxed text-[#fbf9f9]/50">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8" id="testimonios">
          <Section className="mx-auto max-w-5xl">
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#846262]">Lo que dicen ellas</p>
              <h2 className="font-serif text-4xl font-medium tracking-tight text-[#2d2424] sm:text-5xl">
                Manicuristas que ya<br />
                <em className="italic text-[#846262]">trabajan diferente.</em>
              </h2>
            </motion.div>
            <motion.div variants={staggerFast} className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {TESTIMONIALS.map(({ name, role, quote }) => (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-2xl border border-[#2d2424]/[0.07] bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-[#e9cece]">★</span>)}
                  </div>
                  <p className="text-sm leading-relaxed text-[#2d2424]">&ldquo;{quote}&rdquo;</p>
                  <div className="mt-5 border-t border-[#2d2424]/[0.06] pt-4">
                    <p className="text-sm font-semibold text-[#2d2424]">{name}</p>
                    <p className="text-[11px] text-[#846262]">{role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </section>

        {/* ── PRICING ── */}
        <section className="bg-[#f7f0f0] px-4 py-20 sm:px-6 sm:py-28 lg:px-8" id="precios">
          <Section className="mx-auto max-w-md">
            <motion.div variants={fadeUp} className="mb-10 text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#846262]">Precios</p>
              <h2 className="font-serif text-4xl font-medium tracking-tight text-[#2d2424]">
                Simple y<br /><em className="italic text-[#846262]">transparente.</em>
              </h2>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-[#2d2424]/[0.08] bg-white p-8 shadow-[0_24px_64px_rgba(45,36,36,0.10)]"
            >
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
                      <Check size={9} strokeWidth={3} className="text-[#2d2424]" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <motion.a
                href="/registrar"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2d2424] px-7 py-4 text-base font-medium text-[#fbf9f9] shadow-lg shadow-[#2d2424]/20 transition-colors hover:bg-[#3d3232]"
              >
                Empezar 30 días gratis <ArrowRight size={16} />
              </motion.a>
            </motion.div>
          </Section>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="relative overflow-hidden bg-[#2d2424] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[#e9cece]/10 blur-[100px]" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#846262]/10 blur-[100px]" />
          <Section className="relative mx-auto max-w-2xl text-center">
            <motion.div variants={fadeUp} className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9cece]/10">
              <span className="font-serif text-2xl text-[#e9cece]">✦</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl font-medium leading-tight tracking-tight text-[#fbf9f9] sm:text-5xl">
              Tu negocio merece<br />
              <em className="italic text-[#e9cece]">trabajar mejor.</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[#fbf9f9]/50">
              Empezá hoy con 30 días gratis. Sin tarjeta de crédito, sin compromisos.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <motion.a
                href="/registrar"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9cece] px-7 py-4 text-base font-medium text-[#2d2424] shadow-lg shadow-[#e9cece]/20 transition-opacity hover:opacity-90"
              >
                Empezar gratis <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="https://apps.apple.com/app/nailflow-gestion-de-salon/id6773913027"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-xl border border-[#fbf9f9]/20 px-7 py-4 text-base font-medium text-[#fbf9f9] transition-colors hover:bg-[#fbf9f9]/10"
              >
                Descargar en App Store
              </motion.a>
            </motion.div>
          </Section>
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
