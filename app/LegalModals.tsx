"use client";

import { useState } from "react";

type ModalType = "terms" | "privacy" | "cookies" | null;

export default function LegalModals() {
  const [open, setOpen] = useState<ModalType>(null);

  return (
    <>
      <div className="flex gap-8">
        <button
          onClick={() => setOpen("terms")}
          className="transition-colors hover:text-[#cfaeae]"
        >
          Términos y condiciones
        </button>
        <button
          onClick={() => setOpen("privacy")}
          className="transition-colors hover:text-[#cfaeae]"
        >
          Privacidad
        </button>
        <button
          onClick={() => setOpen("cookies")}
          className="transition-colors hover:text-[#cfaeae]"
        >
          Cookies
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-[#f4ecec] text-[#846262] transition-colors hover:bg-[#e9cece]"
            >
              ✕
            </button>

            {open === "terms" && (
              <>
                <h2 className="mb-6 text-2xl font-bold text-[#2d2424]">Términos y condiciones</h2>
                <div className="space-y-4 text-sm leading-relaxed text-[#846262]">
                  <p><strong className="text-[#2d2424]">Última actualización:</strong> Marzo 2026</p>
                  <p>Al usar NailFlow, aceptas los siguientes términos. Por favor léelos con atención.</p>
                  <h3 className="font-bold text-[#2d2424]">1. Uso del servicio</h3>
                  <p>NailFlow es una plataforma de gestión de citas para profesionales del sector de uñas y belleza. El uso del servicio está destinado exclusivamente a profesionales que deseen gestionar su negocio de forma digital.</p>
                  <h3 className="font-bold text-[#2d2424]">2. Cuentas de usuario</h3>
                  <p>Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. NailFlow no se hace responsable por accesos no autorizados derivados de tu negligencia.</p>
                  <h3 className="font-bold text-[#2d2424]">3. Datos de clientas</h3>
                  <p>Como usuaria de NailFlow, eres responsable de los datos que recopilas de tus clientas a través de la plataforma. Te comprometes a tratar esos datos con respeto y confidencialidad.</p>
                  <h3 className="font-bold text-[#2d2424]">4. Pagos y suscripciones</h3>
                  <p>NailFlow puede ofrecer planes de pago en el futuro. Los precios y condiciones serán comunicados con anticipación antes de cualquier cobro.</p>
                  <h3 className="font-bold text-[#2d2424]">5. Modificaciones</h3>
                  <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos por correo ante cambios importantes.</p>
                  <h3 className="font-bold text-[#2d2424]">6. Contacto</h3>
                  <p>Para cualquier duda sobre estos términos, escríbenos a <strong className="text-[#2d2424]">hola@nailflow.app</strong></p>
                </div>
              </>
            )}

            {open === "privacy" && (
              <>
                <h2 className="mb-6 text-2xl font-bold text-[#2d2424]">Política de privacidad</h2>
                <div className="space-y-4 text-sm leading-relaxed text-[#846262]">
                  <p><strong className="text-[#2d2424]">Última actualización:</strong> Marzo 2026</p>
                  <p>En NailFlow nos tomamos tu privacidad muy en serio. Esta política describe qué datos recopilamos y cómo los usamos.</p>
                  <h3 className="font-bold text-[#2d2424]">1. Datos que recopilamos</h3>
                  <p>Recopilamos los datos que tú misma nos proporcionas al registrarte: nombre del negocio, nombre, correo electrónico y contraseña. También almacenamos los datos de las citas que gestionas a través de la plataforma.</p>
                  <h3 className="font-bold text-[#2d2424]">2. Cómo usamos tus datos</h3>
                  <p>Usamos tus datos exclusivamente para brindarte el servicio de NailFlow: gestionar tu cuenta, enviarte notificaciones de citas y mejorar la plataforma.</p>
                  <h3 className="font-bold text-[#2d2424]">3. Compartir datos</h3>
                  <p>No vendemos ni compartimos tus datos con terceros. Utilizamos servicios de infraestructura (Supabase, Vercel, Resend) que procesan datos bajo estrictas políticas de seguridad.</p>
                  <h3 className="font-bold text-[#2d2424]">4. Seguridad</h3>
                  <p>Tus datos están protegidos con cifrado y autenticación segura. Utilizamos Row Level Security en nuestra base de datos para garantizar que cada usuaria solo acceda a sus propios datos.</p>
                  <h3 className="font-bold text-[#2d2424]">5. Tus derechos</h3>
                  <p>Tienes derecho a acceder, corregir o eliminar tus datos en cualquier momento. Para hacerlo, escríbenos a <strong className="text-[#2d2424]">hola@nailflow.app</strong></p>
                </div>
              </>
            )}

            {open === "cookies" && (
              <>
                <h2 className="mb-6 text-2xl font-bold text-[#2d2424]">Política de cookies</h2>
                <div className="space-y-4 text-sm leading-relaxed text-[#846262]">
                  <p><strong className="text-[#2d2424]">Última actualización:</strong> Marzo 2026</p>
                  <p>NailFlow usa cookies esenciales para el funcionamiento de la plataforma.</p>
                  <h3 className="font-bold text-[#2d2424]">1. ¿Qué son las cookies?</h3>
                  <p>Las cookies son pequeños archivos que se almacenan en tu navegador para recordar información sobre tu sesión.</p>
                  <h3 className="font-bold text-[#2d2424]">2. Cookies que usamos</h3>
                  <p>Usamos cookies de sesión para mantener tu inicio de sesión activo mientras usas la plataforma. No usamos cookies de seguimiento ni publicidad.</p>
                  <h3 className="font-bold text-[#2d2424]">3. Control de cookies</h3>
                  <p>Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar el funcionamiento de la plataforma, especialmente el inicio de sesión.</p>
                  <h3 className="font-bold text-[#2d2424]">4. Contacto</h3>
                  <p>Para dudas sobre cookies escríbenos a <strong className="text-[#2d2424]">hola@nailflow.app</strong></p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}