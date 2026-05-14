import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase-server";
import { ArrowRight } from "lucide-react";
import AuthSidePanel from "../_components/AuthSidePanel";
import { renderEmail } from "../../lib/email-template";

async function register(formData: FormData) {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const business_name = formData.get("business_name") as string;
  const owner_name = formData.get("owner_name") as string;

  if (!email || !password || !business_name || !owner_name) return;

  if (password.length < 8) {
    redirect("/registrar?error=La contraseña debe tener al menos 8 caracteres");
  }

  const RESERVED_SLUGS = [
    "api","admin","dashboard","login","registrar","servicios","citas","galeria",
    "pagos","reportes","perfil","suscripcion","bienvenida","reservar",
  ];

  const slug = business_name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  if (RESERVED_SLUGS.includes(slug)) {
    redirect(
      "/registrar?error=Ese nombre de negocio no está disponible. Por favor elige otro nombre.",
    );
  }

  const supabase = await createClient();

  const { data: existingSlug } = await supabase
    .from("businesses")
    .select("id")
    .eq("slug", slug)
    .single();

  if (existingSlug) {
    redirect(
      "/registrar?error=Ya existe un negocio con ese nombre. Por favor elige otro nombre.",
    );
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error || !data.user) {
    if (
      error?.message.toLowerCase().includes("already registered") ||
      error?.message.toLowerCase().includes("already been registered")
    ) {
      redirect("/registrar?error=Este correo ya tiene una cuenta registrada");
    }
    redirect("/registrar?error=Error al crear la cuenta");
  }

  const { error: insertError } = await supabase.from("businesses").insert({
    user_id: data.user!.id,
    name: business_name,
    owner_name,
    slug,
    email,
    subscription_status: "pending",
  });

  if (insertError) {
    const { createClient: createAdminClient } = await import(
      "@supabase/supabase-js"
    );
    const admin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
    await admin.auth.admin.deleteUser(data.user!.id);
    redirect(
      "/registrar?error=Error al crear la cuenta. Por favor intenta de nuevo.",
    );
  }

  // Welcome email
  const { resend } = await import("../../lib/resend");
  await resend.emails.send({
    from: "NailFlow <hola@nailflow.app>",
    to: email,
    subject: "¡Bienvenida a NailFlow! 💅",
    html: renderEmail({
      preheader: `Tu cuenta está lista, ${owner_name}. Empezá a recibir reservas.`,
      eyebrow: "Bienvenida a NailFlow",
      heading: `¡Hola, <em>${owner_name}</em>!`,
      intro: "Tu cuenta está lista. Ya podés empezar a gestionar tus citas, recibir reservas y cobrar por SINPE Móvil — todo en un solo lugar.",
      linkPill: { label: "Tu enlace de reservas", value: `nailflow.app/reservar/${slug}` },
      cta: { label: "Ir a mi dashboard →", href: "https://nailflow.app/dashboard" },
      footer: "✦ El aliado perfecto para tu salón",
    }),
  });

  redirect(
    `${process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL}?checkout[email]=${encodeURIComponent(email)}&checkout[name]=${encodeURIComponent(owner_name)}`,
  );
}

export default async function RegistroPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen w-full bg-[#fbf9f9] font-sans text-[#2d2424]">
      <AuthSidePanel kind="registrar" />

      <main className="flex flex-1 flex-col px-5 py-6 sm:px-10 sm:py-8">
        {/* Mobile-only logo */}
        <div className="mb-8 flex items-center justify-between lg:hidden">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2d2424] text-base leading-none text-[#e9cece]">
              ✦
            </div>
            <span className="serif-heading text-lg font-medium tracking-tight">
              NailFlow
            </span>
          </a>
          <a
            href="/login"
            className="text-[13px] text-[#846262] underline decoration-[#e9cece] underline-offset-4 hover:text-[#2d2424]"
          >
            Iniciar sesión
          </a>
        </div>

        {/* Desktop top-right link */}
        <div className="hidden items-center justify-end lg:flex">
          <p className="text-[13px] text-[#846262]">
            ¿Ya tenés cuenta?{" "}
            <a
              href="/login"
              className="ml-1 font-semibold text-[#2d2424] underline decoration-[#e9cece] underline-offset-4 hover:opacity-80"
            >
              Iniciar sesión
            </a>
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center py-6">
          <div className="w-full max-w-[420px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#846262]">
              Crear cuenta
            </p>
            <h1 className="serif-heading mt-2.5 text-[36px] font-medium leading-[1.05] tracking-tight text-[#2d2424] sm:text-4xl">
              Empezá{" "}
              <em className="font-normal italic text-[#846262]">gratis</em>.
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#846262]">
              30 días sin compromiso.
            </p>

            {params.error && (
              <div className="mt-6 rounded-xl bg-[#b86060]/10 px-4 py-3 text-sm text-[#b86060]">
                {params.error}
              </div>
            )}

            <form action={register} className="mt-7 flex flex-col gap-4">
              <div>
                <label
                  htmlFor="business_name"
                  className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]"
                >
                  Nombre del negocio
                </label>
                <input
                  id="business_name"
                  name="business_name"
                  type="text"
                  placeholder="Ej. Camila Nails"
                  required
                  maxLength={100}
                  className="h-12 w-full rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
                />
                <p className="mt-1.5 text-xs leading-relaxed text-[#846262]">
                  Define tu enlace público: <span className="text-[#2d2424]">nailflow.app/reservar/...</span>
                </p>
              </div>

              <div>
                <label
                  htmlFor="owner_name"
                  className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]"
                >
                  Tu nombre
                </label>
                <input
                  id="owner_name"
                  name="owner_name"
                  type="text"
                  placeholder="Tu nombre completo"
                  required
                  maxLength={100}
                  className="h-12 w-full rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]"
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="h-12 w-full rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  required
                  minLength={8}
                  className="h-12 w-full rounded-xl border border-[#2d2424]/[0.16] bg-white px-3.5 text-sm text-[#2d2424] outline-none transition-colors placeholder:text-[#b89090] focus:border-[#e9cece] focus:ring-2 focus:ring-[#e9cece]/30"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2d2424] text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-[#3d3232]"
              >
                Crear cuenta
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-center text-[11px] leading-relaxed text-[#b89090]">
                Al continuar aceptás los Términos y la Política de Privacidad de NailFlow.
              </p>
            </form>
          </div>
        </div>

        <p className="text-center text-[11px] font-medium uppercase tracking-[0.15em] text-[#b89090]">
          © 2026 NailFlow
        </p>
      </main>
    </div>
  );
}
