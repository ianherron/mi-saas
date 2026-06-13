import { ArrowLeft } from "lucide-react";
import DeletionForm from "./DeletionForm";

export const metadata = {
  title: "Eliminar cuenta · NailFlow",
  description: "Solicita la eliminación de tu cuenta y datos de NailFlow.",
};

export default function EliminarCuentaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fbf9f9] font-sans text-[#2d2424]">
      <header
        className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6 sm:px-10 sm:py-8"
        style={{
          paddingTop: "max(1.5rem, calc(env(safe-area-inset-top) + 1rem))",
        }}
      >
        <a href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-base leading-none text-[#e9cece]">
            ✦
          </div>
          <span className="serif-heading text-lg font-medium tracking-tight">
            NailFlow
          </span>
        </a>
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#846262] underline decoration-[#e9cece] underline-offset-4 hover:text-[#2d2424]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver
        </a>
      </header>

      <main className="mx-auto w-full max-w-xl flex-1 px-5 pb-20 sm:px-10">
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Cuenta · NailFlow
          </p>
          <h1 className="serif-heading mt-3 text-[36px] font-medium leading-[1.05] tracking-tight text-[#2d2424] sm:text-5xl">
            Eliminar{" "}
            <em className="font-normal italic text-[#846262]">cuenta</em>.
          </h1>
          <p className="mx-auto mt-3.5 max-w-md text-[15px] leading-relaxed text-[#846262]">
            Si querés eliminar tu cuenta y todos los datos asociados, ingresá tu correo y te confirmamos cuando esté listo.
          </p>
        </div>

        <section className="rounded-3xl border border-[#2d2424]/[0.08] bg-white p-6 sm:p-8">
          <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
            Solicitud de eliminación
          </p>
          <h2 className="serif-heading mb-6 text-2xl font-medium leading-tight tracking-tight text-[#2d2424]">
            ¿Segura que querés{" "}
            <em className="font-normal italic text-[#846262]">eliminar</em> todo?
          </h2>
          <p className="mb-6 text-[13px] leading-relaxed text-[#846262]">
            Esta acción eliminará permanentemente tu cuenta, tus clientes, citas, servicios y todos los datos asociados. El proceso tarda hasta 30 días hábiles.
          </p>
          <DeletionForm />
        </section>
      </main>

      <footer className="border-t border-[#2d2424]/[0.08] px-5 py-6 text-center sm:px-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#b89090]">
          © 2026 NailFlow
        </p>
      </footer>
    </div>
  );
}
