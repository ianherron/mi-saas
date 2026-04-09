"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { sendSupportMessage } from "./actions";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await sendSupportMessage(formData);
      toast.success("Mensaje enviado, te respondemos pronto 💅");
      formRef.current?.reset();
    } catch {
      toast.error("Hubo un error al enviar el mensaje. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-[#2d2424]">
          Nombre
        </label>
        <input
          name="name"
          type="text"
          required
          placeholder="Tu nombre"
          className="h-13 w-full rounded-xl border border-[#e9cece]/40 bg-white px-4 py-3 text-[#2d2424] outline-none transition-all placeholder:text-[#846262]/50 focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#2d2424]">
          Correo electrónico
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="tu@correo.com"
          className="h-13 w-full rounded-xl border border-[#e9cece]/40 bg-white px-4 py-3 text-[#2d2424] outline-none transition-all placeholder:text-[#846262]/50 focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#2d2424]">
          Mensaje
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="¿En qué podemos ayudarte?"
          className="w-full resize-none rounded-xl border border-[#e9cece]/40 bg-white px-4 py-3 text-[#2d2424] outline-none transition-all placeholder:text-[#846262]/50 focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="h-13 w-full rounded-xl bg-[#2d2424] px-6 py-3 font-semibold text-white transition-all hover:opacity-80 active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
