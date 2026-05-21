import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad — NailFlow",
  description: "Cómo NailFlow recopila, usa y protege tu información personal.",
};

const LAST_UPDATED = "20 de mayo de 2025";

export default function PrivacidadPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fbf9f9] font-sans text-[#2d2424]">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-6 sm:px-8 sm:py-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-base leading-none text-[#e9cece]">
            ✦
          </div>
          <span className="text-lg font-semibold tracking-tight">NailFlow</span>
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-[#846262] transition-colors hover:text-[#2d2424]"
        >
          ← Volver
        </Link>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-20 sm:px-8">
        <div className="mb-10 border-b border-[rgba(45,36,36,0.08)] pb-8">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-[#2d2424]">
            Política de Privacidad
          </h1>
          <p className="text-sm text-[#b89090]">
            Última actualización: {LAST_UPDATED}
          </p>
        </div>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#2d2424]">
          <Section title="1. Quiénes somos">
            <p>
              NailFlow es un servicio de gestión de citas y negocio para
              manicuristas, operado por Ian Eduardo Herrón Ortíz
              (&quot;nosotros&quot;, &quot;nuestro&quot;). Puedes contactarnos
              en{" "}
              <a
                href="mailto:hola@nailflow.app"
                className="font-medium text-[#2d2424] underline underline-offset-2"
              >
                hola@nailflow.app
              </a>
              .
            </p>
          </Section>

          <Section title="2. Información que recopilamos">
            <p className="mb-3">
              Recopilamos la información que vos y tus clientes nos proporcionan
              directamente:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Información de cuenta:</strong> nombre, correo
                electrónico y contraseña del propietario del negocio.
              </li>
              <li>
                <strong>Información del negocio:</strong> nombre del negocio,
                descripción, foto de perfil, foto de portada y número de
                WhatsApp.
              </li>
              <li>
                <strong>Datos de citas:</strong> nombre del cliente, teléfono,
                correo electrónico, fecha, hora, servicio y precio.
              </li>
              <li>
                <strong>Imágenes:</strong> fotos de galería, comprobantes de
                pago e imágenes de diseño de referencia subidas por el negocio
                o sus clientes.
              </li>
              <li>
                <strong>Datos de dispositivo:</strong> token de notificaciones
                push para enviarte alertas de nuevas reservas.
              </li>
            </ul>
          </Section>

          <Section title="3. Cómo usamos tu información">
            <ul className="list-disc space-y-2 pl-5">
              <li>Proveer, mantener y mejorar el servicio de NailFlow.</li>
              <li>
                Enviarte notificaciones cuando tus clientes hacen una reserva.
              </li>
              <li>
                Mostrar tu página de reservas pública a tus clientes.
              </li>
              <li>Generar reportes de ingresos y estadísticas de tu negocio.</li>
              <li>
                Responder consultas de soporte y mejorar la experiencia de uso.
              </li>
            </ul>
            <p className="mt-3">
              No vendemos, alquilamos ni compartimos tu información personal con
              terceros para fines comerciales o publicitarios.
            </p>
          </Section>

          <Section title="4. Servicios de terceros">
            <p className="mb-3">
              NailFlow utiliza los siguientes servicios para operar:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Supabase</strong> — Base de datos, autenticación y
                almacenamiento de archivos. Los datos se almacenan en servidores
                de Amazon Web Services (AWS) en la región us-east-1. Política de
                privacidad:{" "}
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  supabase.com/privacy
                </a>
                .
              </li>
              <li>
                <strong>Expo / Expo Push Notifications</strong> — Servicio de
                notificaciones push. Solo se transmite el token del dispositivo y
                el contenido de la notificación.
              </li>
              <li>
                <strong>Resend</strong> — Servicio de envío de correos
                electrónicos transaccionales (confirmaciones de cita, cambios de
                estado).
              </li>
            </ul>
          </Section>

          <Section title="5. Almacenamiento y seguridad">
            <p>
              Tus datos se almacenan en servidores seguros con cifrado en
              reposo y en tránsito (TLS/HTTPS). Implementamos políticas de
              seguridad a nivel de fila (Row Level Security) para garantizar que
              cada negocio solo acceda a su propia información.
            </p>
            <p className="mt-3">
              Los archivos de imágenes sensibles (como comprobantes de pago) se
              almacenan en buckets privados y solo son accesibles mediante URLs
              firmadas temporales.
            </p>
          </Section>

          <Section title="6. Retención de datos">
            <p>
              Conservamos tu información mientras tu cuenta esté activa. Si
              deseas eliminar tu cuenta y todos los datos asociados, contáctanos
              a{" "}
              <a
                href="mailto:hola@nailflow.app"
                className="font-medium text-[#2d2424] underline underline-offset-2"
              >
                hola@nailflow.app
              </a>{" "}
              y procesaremos tu solicitud en un plazo de 30 días.
            </p>
          </Section>

          <Section title="7. Tus derechos">
            <p className="mb-3">
              De acuerdo con la Ley N° 8968 de Protección de la Persona frente
              al Tratamiento de sus Datos Personales (Costa Rica) y otras leyes
              aplicables, tenés derecho a:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Acceder a los datos personales que tenemos sobre vos.</li>
              <li>Solicitar la corrección de datos incorrectos o incompletos.</li>
              <li>
                Solicitar la eliminación de tus datos personales (derecho al
                olvido).
              </li>
              <li>
                Oponerte al tratamiento de tus datos en determinadas
                circunstancias.
              </li>
            </ul>
            <p className="mt-3">
              Para ejercer estos derechos, contáctanos a{" "}
              <a
                href="mailto:hola@nailflow.app"
                className="font-medium text-[#2d2424] underline underline-offset-2"
              >
                hola@nailflow.app
              </a>
              .
            </p>
          </Section>

          <Section title="8. Cookies y seguimiento">
            <p>
              La aplicación móvil de NailFlow no utiliza cookies de seguimiento.
              El sitio web nailflow.app puede usar cookies técnicas estrictamente
              necesarias para el funcionamiento de la sesión. No utilizamos
              cookies de publicidad ni de seguimiento de terceros.
            </p>
          </Section>

          <Section title="9. Menores de edad">
            <p>
              NailFlow está dirigido exclusivamente a profesionales adultos del
              sector de nail art. No recopilamos intencionalmente información de
              menores de 18 años. Si identificamos que se ha recopilado
              información de un menor sin consentimiento parental, la
              eliminaremos de inmediato.
            </p>
          </Section>

          <Section title="10. Cambios a esta política">
            <p>
              Podemos actualizar esta política de privacidad ocasionalmente. Te
              notificaremos de cambios significativos por correo electrónico o
              mediante un aviso destacado en la aplicación. La fecha de &quot;última
              actualización&quot; al inicio de esta página indica cuándo se realizó el
              último cambio.
            </p>
          </Section>

          <Section title="11. Contacto">
            <p>
              Si tenés preguntas sobre esta política o sobre el tratamiento de
              tus datos personales, no dudes en escribirnos:
            </p>
            <p className="mt-3">
              <strong>NailFlow</strong>
              <br />
              Ian Eduardo Herrón Ortíz
              <br />
              Costa Rica
              <br />
              <a
                href="mailto:hola@nailflow.app"
                className="font-medium text-[#2d2424] underline underline-offset-2"
              >
                hola@nailflow.app
              </a>
            </p>
          </Section>
        </div>
      </main>

      <footer className="border-t border-[rgba(45,36,36,0.08)] py-6 text-center text-xs text-[#b89090]">
        © {new Date().getFullYear()} NailFlow. Todos los derechos reservados.
      </footer>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold tracking-tight text-[#2d2424]">
        {title}
      </h2>
      <div className="text-[#3d3232]">{children}</div>
    </section>
  );
}
