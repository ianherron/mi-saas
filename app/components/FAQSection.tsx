"use client";

import { useState } from "react";

const faqs = [
  {
    question: "¿Mis clientas necesitan crear una cuenta para reservar?",
    answer:
      "No, solo llenan el formulario con su nombre, teléfono y seleccionan el servicio. Sin registros, sin contraseñas.",
  },
  {
    question: "¿Cómo reciben confirmación mis clientas?",
    answer:
      "Automáticamente por correo electrónico al momento de reservar. También recibís vos una notificación en tu celular.",
  },
  {
    question: "¿Puedo cobrar un adelanto por SINPE Móvil?",
    answer:
      "Sí, configurás el porcentaje de adelanto y tus clientas pagan antes de confirmar la cita. Esto reduce las cancelaciones de último momento.",
  },
  {
    question: "¿Qué pasa si una clienta cancela?",
    answer:
      "Recibe un correo de cancelación automático y la cita desaparece de tu agenda. El horario queda libre para otra clienta.",
  },
  {
    question: "Tengo un estudio con varias manicuristas, ¿NailFlow me sirve?",
    answer:
      "El plan actual está diseñado para manicuristas independientes. Si tenés equipo, estamos desarrollando NailFlow Studio — un plan pensado para estudios con hasta 4 manicuristas, agenda compartida y reportes por empleada. Escribinos a nailflowapp@gmail.com para acceso anticipado.",
  },
  {
    question: "No tengo un negocio de uñas, soy estilista. ¿Puedo usar NailFlow igual?",
    answer:
      "Sí. NailFlow funciona para cualquier profesional de belleza que trabaje con citas: estilistas, técnicos de pestañas, cejas, masajistas y más. Si agendás clientes, NailFlow te sirve.",
  },
  {
    question: "¿En qué países está disponible?",
    answer:
      "Actualmente estamos enfocados en Costa Rica, con SINPE Móvil como método de pago. Próximamente expandimos a más países de Latinoamérica.",
  },
  {
    question: "¿Tienen app móvil?",
    answer:
      "Sí, NailFlow ya está disponible en el App Store para iPhone. Desde ahí gestionás tu agenda, ves tus citas del día y recibís notificaciones en tiempo real.",
  },
  {
    question: "¿Puedo cancelar cuando quiera?",
    answer: "Sí, sin contratos ni permanencia. Cancelás desde tu cuenta en cualquier momento.",
  },
  {
    question: "¿Cuánto cuesta después del período de prueba?",
    answer: "₡3.500 al mes, sin costos ocultos ni tarifas por transacción.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#fbf9f9] px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="serif-heading mb-16 text-center text-4xl font-bold text-[#2d2424] md:text-5xl">
          Preguntas frecuentes
        </h2>

        <div className="divide-y divide-[#e9cece]/30">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="overflow-hidden">
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-[#e9cece]/10"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-[#2d2424]">
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 text-xl font-light text-[#846262] transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    overflow: "hidden",
                  }}
                >
                  <p className="px-6 pb-5 text-sm font-light leading-relaxed text-[#846262]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
