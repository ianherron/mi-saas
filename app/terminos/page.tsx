import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones — NailFlow",
  description: "Términos y condiciones de uso del servicio NailFlow.",
};

const LAST_UPDATED = "7 de junio de 2026";

export default function TerminosPage() {
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
            Términos y Condiciones
          </h1>
          <p className="text-sm text-[#b89090]">
            Última actualización: {LAST_UPDATED}
          </p>
        </div>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#2d2424]">
          <Section title="1. Aceptación de los términos">
            <p>
              Al registrarte y usar NailFlow, aceptás estos Términos y Condiciones en su totalidad.
              Si no estás de acuerdo con alguna parte, no debés usar el servicio.
              Podés contactarnos en{" "}
              <a
                href="mailto:nailflowapp@gmail.com"
                className="font-medium text-[#2d2424] underline underline-offset-2"
              >
                nailflowapp@gmail.com
              </a>
              .
            </p>
          </Section>

          <Section title="2. Descripción del servicio">
            <p>
              NailFlow es una plataforma de gestión de negocio para manicuristas que permite
              administrar citas, clientes, servicios, pagos y reservas en línea. El servicio
              se ofrece mediante una suscripción mensual de renovación automática.
            </p>
          </Section>

          <Section title="3. Suscripción y pagos">
            <p className="mb-3">
              NailFlow Pro es una suscripción de renovación automática con un costo de $6.99 USD
              por mes (o el equivalente en tu moneda local).
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                El pago se cobra a tu cuenta de Apple al confirmar la compra.
              </li>
              <li>
                La suscripción se renueva automáticamente al final de cada período,
                a menos que la desactives al menos 24 horas antes de la fecha de renovación.
              </li>
              <li>
                Podés gestionar y cancelar tu suscripción desde Ajustes → Apple ID → Suscripciones
                en tu dispositivo iOS.
              </li>
              <li>
                No se realizan reembolsos por períodos parciales de suscripción.
              </li>
            </ul>
          </Section>

          <Section title="4. Período de prueba">
            <p>
              NailFlow puede ofrecer un período de prueba gratuito a nuevos usuarios.
              Si no cancelás antes de que finalice el período de prueba, se te cobrará
              automáticamente la suscripción mensual.
            </p>
          </Section>

          <Section title="5. Uso aceptable">
            <p className="mb-3">Al usar NailFlow, aceptás no:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Usar el servicio para actividades ilegales o no autorizadas.</li>
              <li>Intentar acceder sin autorización a sistemas o datos del servicio.</li>
              <li>Subir contenido ofensivo, ilegal o que viole derechos de terceros.</li>
              <li>Revender o sublicenciar el acceso al servicio a terceros.</li>
            </ul>
          </Section>

          <Section title="6. Propiedad intelectual">
            <p>
              Todo el contenido, diseño, código y marca de NailFlow son propiedad exclusiva
              de NailFlow y están protegidos por las leyes de propiedad intelectual aplicables.
              El contenido que vos cargás (fotos, datos de clientes, etc.) sigue siendo tuyo —
              NailFlow solo lo usa para prestarte el servicio.
            </p>
          </Section>

          <Section title="7. Eliminación de cuenta">
            <p>
              Podés eliminar tu cuenta en cualquier momento desde la sección Perfil → Cuenta
              dentro de la aplicación. La eliminación es permanente e irreversible. Te recomendamos
              cancelar tu suscripción desde Ajustes → Suscripciones antes de eliminar tu cuenta
              para evitar cargos futuros.
            </p>
          </Section>

          <Section title="8. Limitación de responsabilidad">
            <p>
              NailFlow se provee &quot;tal cual&quot;, sin garantías de ningún tipo. En ningún caso
              NailFlow será responsable por daños indirectos, incidentales o consecuentes
              derivados del uso o la imposibilidad de uso del servicio.
            </p>
          </Section>

          <Section title="9. Modificaciones">
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento.
              Te notificaremos de cambios significativos por correo electrónico o mediante
              un aviso en la aplicación. El uso continuado del servicio después de dichos
              cambios constituye la aceptación de los nuevos términos.
            </p>
          </Section>

          <Section title="10. Ley aplicable">
            <p>
              Estos términos se rigen por las leyes de Costa Rica. Cualquier disputa se
              resolverá en los tribunales competentes de Costa Rica.
            </p>
          </Section>

          <Section title="11. Contacto">
            <p>
              Para preguntas sobre estos términos, escribinos a:
            </p>
            <p className="mt-3">
              <strong>NailFlow</strong>
              <br />
              Costa Rica
              <br />
              <a
                href="mailto:nailflowapp@gmail.com"
                className="font-medium text-[#2d2424] underline underline-offset-2"
              >
                nailflowapp@gmail.com
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
