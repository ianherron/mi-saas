// Shared sidebar — server component. Used across /dashboard, /citas,
// /servicios, /galeria, /pagos, /reportes, /perfil so the navigation can be
// edited in one place instead of being duplicated across 7 pages.
//
// Drop this file at: app/_components/AppSidebar.tsx
// Each page renders <AppSidebar active="citas" /> with its own slug.

import {
  LayoutDashboard, Calendar, Scissors, Image as ImageIcon,
  CreditCard, BarChart3, User,
} from "lucide-react";
import LogoutButton from "../dashboard/LogoutButton";
import { getBusiness } from "../../lib/supabase-server";

type ActiveKey =
  | "dashboard" | "citas" | "servicios" | "galeria"
  | "pagos" | "reportes" | "perfil";

const PRIMARY = [
  { id: "dashboard" as const, href: "/dashboard",  icon: LayoutDashboard, label: "Dashboard" },
  { id: "citas"     as const, href: "/citas",      icon: Calendar,        label: "Citas" },
];
const SECONDARY = [
  { id: "servicios" as const, href: "/servicios",  icon: Scissors,        label: "Servicios" },
  { id: "galeria"   as const, href: "/galeria",    icon: ImageIcon,       label: "Galería" },
  { id: "pagos"     as const, href: "/pagos",      icon: CreditCard,      label: "Pagos" },
  { id: "reportes"  as const, href: "/reportes",   icon: BarChart3,       label: "Reportes" },
  { id: "perfil"    as const, href: "/perfil",     icon: User,            label: "Perfil" },
];

function NavLink({
  href, icon: Icon, label, active,
}: {
  href: string;
  icon: typeof Calendar;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className={[
        "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm transition-colors",
        active
          ? "bg-[#2d2424] font-medium text-[#fbf9f9]"
          : "font-normal text-[#846262] hover:bg-[#f4ecec] hover:text-[#2d2424]",
      ].join(" ")}
    >
      <Icon className="h-[18px] w-[18px]" />
      <span>{label}</span>
    </a>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-2.5 pb-1 pt-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[#b89090]">
      {children}
    </p>
  );
}

export default async function AppSidebar({ active }: { active: ActiveKey }) {
  const business = await getBusiness();
  const initial = business?.owner_name?.charAt(0).toUpperCase() ?? "?";

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-[220px] flex-col border-r border-[#2d2424]/[0.08] bg-[#fbf9f9] px-3.5 py-5 lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 pb-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-base text-[#e9cece]">
          ✦
        </div>
        <span className="serif-heading text-xl font-medium tracking-tight">NailFlow</span>
      </div>

      {/* Nav */}
      <GroupLabel>Inicio</GroupLabel>
      <nav className="flex flex-col gap-0.5">
        {PRIMARY.map((it) => (
          <NavLink key={it.id} {...it} active={active === it.id} />
        ))}
      </nav>

      <GroupLabel>Tu negocio</GroupLabel>
      <nav className="flex flex-col gap-0.5">
        {SECONDARY.map((it) => (
          <NavLink key={it.id} {...it} active={active === it.id} />
        ))}
      </nav>

      <div className="flex-1" />

      {/* Account row */}
      <div className="flex items-center gap-2.5 border-t border-[#2d2424]/[0.08] px-2 py-2.5">
        <div className="serif-heading flex h-8 w-8 items-center justify-center rounded-full bg-[#e9cece] text-sm font-medium text-[#2d2424]">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] text-[#2d2424]">{business?.owner_name ?? ""}</p>
        </div>
        <LogoutButton />
      </div>
    </aside>
  );
}

// ---- Mobile header (same one each page uses, now shared) ----
export function AppMobileHeader() {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between border-b border-[#2d2424]/[0.08] bg-[#fbf9f9] px-4 lg:hidden"
      style={{
        paddingTop: "max(env(safe-area-inset-top), 0px)",
        height: "calc(3.5rem + env(safe-area-inset-top))",
      }}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-sm text-[#e9cece]">
          ✦
        </div>
        <span className="serif-heading text-sm font-semibold">NailFlow</span>
      </div>
      <LogoutButton />
    </header>
  );
}
