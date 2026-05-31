"use client";

import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";

const LINKS = [
  { label: "Beneficios", href: "/#beneficios" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Precios", href: "/#precios" },
  { label: "Studio", href: "/studio" },
  { label: "El Club", href: "/club" },
];

export default function LandingNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-[#2d2424]/[0.08] bg-[#fbf9f9]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5 lg:px-12">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-base leading-none text-[#e9cece] sm:h-9 sm:w-9">
              ✦
            </div>
            <h2 className="serif-heading text-lg font-medium tracking-tight sm:text-xl">
              NailFlow
            </h2>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                className="text-sm text-[#846262] transition-colors hover:text-[#2d2424]"
                href={l.href}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden items-center gap-3 sm:gap-4 md:flex">
            <a href="/login" className="text-sm text-[#2d2424] hover:opacity-70">
              Iniciar sesión
            </a>
            <a
              href="/registrar"
              className="inline-flex items-center justify-center rounded-xl bg-[#2d2424] px-4 py-2 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232] sm:px-5"
            >
              Crear cuenta
            </a>
          </div>

          {/* Mobile: crear cuenta + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="/registrar"
              className="inline-flex items-center justify-center rounded-xl bg-[#2d2424] px-4 py-2 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
            >
              Crear cuenta
            </a>
            <button
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#2d2424]/10 bg-white text-[#2d2424]"
              aria-label="Abrir menú"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-[#fbf9f9] transition-all duration-300 ease-out md:hidden ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[#2d2424]/[0.08] px-4 py-3">
          <a href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-base leading-none text-[#e9cece]">
              ✦
            </div>
            <span className="serif-heading text-lg font-medium tracking-tight">NailFlow</span>
          </a>
          <button
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#2d2424]/10 bg-white text-[#2d2424]"
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1 p-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-4 text-base font-medium text-[#2d2424] transition-colors hover:bg-[#e9cece]/30"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="mt-auto flex flex-col gap-3 border-t border-[#2d2424]/[0.08] p-4">
          <a
            href="/login"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-xl border border-[#2d2424]/[0.16] px-7 py-4 text-base font-medium text-[#2d2424] transition-colors hover:bg-[#f4ecec]"
          >
            Iniciar sesión
          </a>
          <a
            href="/registrar"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-xl bg-[#2d2424] px-7 py-4 text-base font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
          >
            Crear cuenta gratis
          </a>
        </div>
      </div>
    </>
  );
}
