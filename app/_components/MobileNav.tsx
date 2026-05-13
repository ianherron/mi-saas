"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import {
  LayoutDashboard, Calendar, Scissors, Image as ImageIcon,
  CreditCard, BarChart3, User,
} from "lucide-react";
import LogoutButton from "../dashboard/LogoutButton";

type ActiveKey =
  | "dashboard" | "citas" | "servicios" | "galeria"
  | "pagos" | "reportes" | "perfil";

const PRIMARY = [
  { id: "dashboard" as const, href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "citas"     as const, href: "/citas",     icon: Calendar,        label: "Citas" },
];
const SECONDARY = [
  { id: "servicios" as const, href: "/servicios", icon: Scissors,   label: "Servicios" },
  { id: "galeria"   as const, href: "/galeria",   icon: ImageIcon,  label: "Galería" },
  { id: "pagos"     as const, href: "/pagos",     icon: CreditCard, label: "Pagos" },
  { id: "reportes"  as const, href: "/reportes",  icon: BarChart3,  label: "Reportes" },
  { id: "perfil"    as const, href: "/perfil",    icon: User,       label: "Perfil" },
];

export default function MobileNav({
  active,
  ownerName,
  ownerInitial,
}: {
  active: ActiveKey;
  ownerName: string;
  ownerInitial: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Header */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between border-b border-[#2d2424]/[0.08] bg-[#fbf9f9] px-4 lg:hidden"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 0px)",
          height: "calc(3.5rem + env(safe-area-inset-top))",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-sm leading-none text-[#e9cece]">
            ✦
          </div>
          <span className="serif-heading text-sm font-semibold">NailFlow</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="flex h-10 w-10 items-center justify-center rounded-[10px] text-[#2d2424] hover:bg-[#f4ecec]"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-[#2d2424]/40 backdrop-blur-sm lg:hidden"
          style={{ animation: "fadeIn 180ms ease-out" }}
        />
      )}

      {/* Drawer */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col bg-[#fbf9f9] px-3.5 py-5 shadow-2xl transition-transform duration-200 ease-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        style={{ paddingTop: "max(env(safe-area-inset-top), 1.25rem)" }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-2 pb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-base leading-none text-[#e9cece]">
              ✦
            </div>
            <span className="serif-heading text-xl font-medium tracking-tight">NailFlow</span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[#846262] hover:bg-[#f4ecec]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="px-2.5 pb-1 pt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#b89090]">
          Inicio
        </p>
        <nav className="flex flex-col gap-0.5">
          {PRIMARY.map((it) => {
            const Icon = it.icon;
            const isActive = active === it.id;
            return (
              <a
                key={it.id}
                href={it.href}
                onClick={() => setOpen(false)}
                className={[
                  "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-[#2d2424] font-medium text-[#fbf9f9]"
                    : "font-normal text-[#846262] hover:bg-[#f4ecec] hover:text-[#2d2424]",
                ].join(" ")}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span>{it.label}</span>
              </a>
            );
          })}
        </nav>

        <p className="px-2.5 pb-1 pt-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[#b89090]">
          Tu negocio
        </p>
        <nav className="flex flex-col gap-0.5">
          {SECONDARY.map((it) => {
            const Icon = it.icon;
            const isActive = active === it.id;
            return (
              <a
                key={it.id}
                href={it.href}
                onClick={() => setOpen(false)}
                className={[
                  "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-[#2d2424] font-medium text-[#fbf9f9]"
                    : "font-normal text-[#846262] hover:bg-[#f4ecec] hover:text-[#2d2424]",
                ].join(" ")}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span>{it.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex-1" />

        <div className="flex items-center gap-2.5 border-t border-[#2d2424]/[0.08] px-2 py-2.5">
          <div className="serif-heading flex h-8 w-8 items-center justify-center rounded-full bg-[#e9cece] text-sm font-medium text-[#2d2424]">
            {ownerInitial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] text-[#2d2424]">{ownerName}</p>
          </div>
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
