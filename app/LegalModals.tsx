"use client";

import Link from "next/link";
import { useState } from "react";

type ModalType = "terms" | "cookies" | null;

export default function LegalModals() {
  const [open, setOpen] = useState<ModalType>(null);

  return (
    <>
      <div className="flex gap-8">
        <Link
          href="/terminos"
          className="transition-colors hover:text-[#cfaeae]"
        >
          Términos y condiciones
        </Link>
        <Link
          href="/privacidad"
          className="transition-colors hover:text-[#cfaeae]"
        >
          Privacidad
        </Link>
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
                  <p><strong className="text-[#2d2424]">Última actualización:</strong> Mayo 2026</p>
                  <p>Al usar NailFlow, aceptás los siguientes términos. Por favor léelos con atención.</p>

                  <h3 className="font-bold text-[#2d2424]">1. Uso del servicio</h3>
                  <p>NailFlow es una plataforma de gestión de citas para profesionales del sector de uñas y belleza. El uso del servicio está destinado exclusivamente a profesionales que deseen gestionar su negocio de forma digital.</p>

                  <h3 className="font-bold text-[#2d2424]">2. Cuentas de usuario</h3>
                  <p>Sos responsable de mantener la confidencialidad de tu cuenta y contraseña. NailFlow no se hace responsable por accesos no autorizados derivados de tu negligencia.</p>

                  <h3 className="font-bold text-[#2d2424]">3. Datos de clientas</h3>
                  <p>Como usuaria de NailFlow, sos responsable de los datos que recopilás de tus clientas a través de la plataforma. Te comprometés a tratar esos datos con respeto y confidencialidad.</p>

                  <h3 className="font-bold text-[#2d2424]">4. Pagos y suscripciones</h3>
                  <p>NailFlow ofrece planes de suscripción con período de prueba gratuito. Los precios y condiciones están disponibles en nailflow.app. Podemos actualizar los planes con aviso previo por correo electrónico.</p>

                  <h3 className="font-bold text-[#2d2424]">5. Disponibilidad del servicio</h3>
                  <p>Hacemos nuestro mejor esfuerzo para mantener NailFlow disponible en todo momento. Sin embargo, no garantizamos un funcionamiento ininterrumpido y no somos responsables por pérdidas derivadas de interrupciones temporales del servicio.</p>

                  <h3 className="font-bold text-[#2d2424]">6. Modificaciones</h3>
                  <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos por correo ante cambios importantes.</p>

                  <h3 className="font-bold text-[#2d2424]">7. Contacto</h3>
                  <p>Para cualquier duda sobre estos términos, escribinos a <strong className="text-[#2d2424]">nailflowapp@gmail.com</strong></p>
                </div>
              </>
            )}

{open === "cookies" && (
              <>
                <h2 className="mb-6 text-2xl font-bold text-[#2d2424]">Política de cookies</h2>
                <div className="space-y-4 text-sm leading-relaxed text-[#846262]">
                  <p><strong className="text-[#2d2424]">Última actualización:</strong> Mayo 2026</p>
                  <p>NailFlow usa cookies estrictamente necesarias para el funcionamiento de la plataforma. No usamos cookies de publicidad ni de seguimiento.</p>

                  <h3 className="font-bold text-[#2d2424]">1. ¿Qué son las cookies?</h3>
                  <p>Las cookies son pequeños archivos que se almacenan en tu navegador para recordar información sobre tu sesión, como si estás conectada a tu cuenta.</p>

                  <h3 className="font-bold text-[#2d2424]">2. Cookies que usamos</h3>
                  <p>Usamos únicamente cookies de sesión para mantener tu inicio de sesión activo mientras usás la plataforma. No usamos cookies de seguimiento, publicidad ni análisis de comportamiento.</p>

                  <h3 className="font-bold text-[#2d2424]">3. Control de cookies</h3>
                  <p>Podés configurar tu navegador para rechazar cookies, aunque esto puede afectar el funcionamiento de la plataforma, especialmente el inicio de sesión.</p>

                  <h3 className="font-bold text-[#2d2424]">4. Aplicación móvil</h3>
                  <p>La app móvil de NailFlow no utiliza cookies. La sesión se gestiona de forma segura en el dispositivo.</p>

                  <h3 className="font-bold text-[#2d2424]">5. Contacto</h3>
                  <p>Para dudas sobre cookies escribinos a <strong className="text-[#2d2424]">nailflowapp@gmail.com</strong></p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
