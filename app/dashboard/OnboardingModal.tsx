"use client";

import { useState } from "react";
import { Scissors, Link, CalendarCheck, Sparkles } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: <Scissors className="h-5 w-5 text-[#2d2424]" />,
    title: "Configura tus servicios",
    description: "Agrega tus servicios, precios y horarios",
  },
  {
    number: 2,
    icon: <Link className="h-5 w-5 text-[#2d2424]" />,
    title: "Comparte tu enlace",
    description: "Ponlo en tu bio de Instagram",
  },
  {
    number: 3,
    icon: <CalendarCheck className="h-5 w-5 text-[#2d2424]" />,
    title: "Recibí tus primeras citas",
    description: "Tus clientas reservan solas automáticamente",
  },
];

export default function OnboardingModal({
  completeOnboarding,
}: {
  completeOnboarding: () => Promise<void>;
}) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleComplete() {
    setLoading(true);
    setOpen(false);
    await completeOnboarding();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
      <div className="animate-fade-in w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="serif-heading text-lg font-semibold tracking-tight text-[#2d2424]">
            NailFlow
          </span>
        </div>

        {/* Title */}
        <h2 className="serif-heading mb-2 text-center text-2xl font-semibold text-slate-900">
          ¡Bienvenida a NailFlow! 💅
        </h2>
        <p className="mb-8 text-center text-sm text-slate-500">
          Seguí estos 3 pasos para empezar a recibir citas
        </p>

        {/* Steps */}
        <div className="mb-8 flex flex-col gap-4">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e9cece]">
                {step.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {step.title}
                </p>
                <p className="text-xs text-slate-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={handleComplete}
          disabled={loading}
          className="w-full rounded-xl bg-[#e9cece] py-3 text-sm font-semibold text-[#2d2424] transition-colors hover:bg-[#dbbcbc] disabled:opacity-60"
        >
          ¡Empezar ahora!
        </button>
      </div>
    </div>
  );
}
