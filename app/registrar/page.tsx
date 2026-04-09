import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "../../lib/supabase-server";
import { Sparkles } from "lucide-react";

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

  const RESERVED_SLUGS = ["api", "admin", "dashboard", "login", "registrar", "servicios", "citas", "galeria", "pagos", "reportes", "perfil", "suscripcion", "bienvenida", "reservar"];

  const slug = business_name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  if (RESERVED_SLUGS.includes(slug)) {
    redirect("/registrar?error=Ese nombre de negocio no está disponible. Por favor elige otro nombre.");
  }

  const supabase = await createClient();

  const { data: existingSlug } = await supabase
    .from("businesses")
    .select("id")
    .eq("slug", slug)
    .single();

  if (existingSlug) {
    redirect("/registrar?error=Ya existe un negocio con ese nombre. Por favor elige otro nombre.");
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error || !data.user) {
    if (error?.message.toLowerCase().includes("already registered") || error?.message.toLowerCase().includes("already been registered")) {
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
    const { createClient: createAdminClient } = await import("@supabase/supabase-js");
    const admin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    await admin.auth.admin.deleteUser(data.user!.id);
    redirect("/registrar?error=Error al crear la cuenta. Por favor intenta de nuevo.");
  }

  // Correo de bienvenida
  const { resend } = await import("../../lib/resend");
  await resend.emails.send({
    from: "NailFlow <hola@nailflow.app>",
    to: email,
    subject: "¡Bienvenida a NailFlow! 💅",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fafafa;">
        <div style="background: white; border-radius: 12px; padding: 32px; border: 1px solid #f0eaea;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="font-size: 24px; font-weight: bold; color: #2d2424; margin: 0;">✦ NailFlow</h1>
          </div>
          <h2 style="font-size: 20px; font-weight: bold; color: #2d2424; margin: 0 0 8px;">¡Bienvenida, ${owner_name}!</h2>
          <p style="color: #846262; margin: 0 0 24px;">Tu cuenta ha sido creada exitosamente. Ya puedes empezar a gestionar tus citas.</p>
          <div style="border-top: 1px solid #f0eaea; padding-top: 20px; margin-bottom: 24px;">
            <p style="color: #846262; font-size: 14px; margin: 0 0 8px;">Tu enlace de reservas:</p>
            <a href="https://nailflow.app/reservar/${slug}" style="color: #e9cece; font-weight: 600; font-size: 14px;">
              nailflow.app/reservar/${slug}
            </a>
          </div>
          <a href="https://nailflow.app/dashboard" style="display: block; text-align: center; background: #e9cece; color: #2d2424; font-weight: bold; padding: 14px 32px; border-radius: 12px; text-decoration: none;">
            Ir a mi panel
          </a>
          <p style="margin: 24px 0 0; font-size: 12px; color: #846262; text-align: center;">
            NailFlow · El aliado perfecto para tu salón
          </p>
        </div>
      </div>
    `,
  });

  redirect(`${process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL}?checkout[email]=${email}&checkout[name]=${owner_name}`);
}

export default async function RegistroPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; }>;
}) {
  const params = await searchParams;

  return (
    <div className="relative flex min-h-screen flex-col bg-[#fbf9f9] font-sans text-slate-900">
      <header
        className="flex w-full items-center justify-between bg-transparent px-6 lg:px-20"
        style={{
          paddingTop: "max(1.5rem, calc(env(safe-area-inset-top) + 0.5rem))",
          paddingBottom: "1.5rem",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
            <Sparkles className="h-4 w-4" />
          </div>
          <h1 className="serif-heading text-xl font-bold tracking-tight text-slate-900">
            NailFlow
          </h1>
        </div>
        <div className="hidden sm:block">
          <a
            className="text-sm font-medium text-[#846262] transition-colors hover:text-slate-900"
            href="#"
          >
            Ayuda
          </a>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[520px] rounded-xl border border-[#f0eaea] bg-white p-8 shadow-sm md:p-12">
          <div className="mb-10 text-center">
            <h2 className="serif-heading mb-3 text-3xl font-bold tracking-tight">
              Crear cuenta
            </h2>
            <p className="mx-auto max-w-sm text-sm text-[#846262]">
              Crea tu cuenta y comienza a gestionar tus citas en NailFlow.
            </p>
          </div>

          {params.error && (
            <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {params.error}
            </div>
          )}

          <form action={register} className="space-y-6">
            <div className="space-y-2">
              <label className="ml-1 text-sm font-semibold text-slate-700">
                Nombre del negocio
              </label>
              <input
                name="business_name"
                type="text"
                placeholder="Ej. Studio Belleza"
                required
                maxLength={100}
                className="h-14 w-full rounded-xl border border-[#f0eaea] bg-[#fbf9f9] px-4 text-slate-900 transition-all placeholder:text-[#846262]/50 focus:border-transparent focus:ring-2 focus:ring-[#e9cece] outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-sm font-semibold text-slate-700">
                Nombre de la manicurista
              </label>
              <input
                name="owner_name"
                type="text"
                placeholder="Tu nombre completo"
                required
                maxLength={100}
                className="h-14 w-full rounded-xl border border-[#f0eaea] bg-[#fbf9f9] px-4 text-slate-900 transition-all placeholder:text-[#846262]/50 focus:border-transparent focus:ring-2 focus:ring-[#e9cece] outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-sm font-semibold text-slate-700">
                Correo electrónico
              </label>
              <input
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                className="h-14 w-full rounded-xl border border-[#f0eaea] bg-[#fbf9f9] px-4 text-slate-900 transition-all placeholder:text-[#846262]/50 focus:border-transparent focus:ring-2 focus:ring-[#e9cece] outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-sm font-semibold text-slate-700">
                Contraseña
              </label>
              <div className="group relative">
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="h-14 w-full rounded-xl border border-[#f0eaea] bg-[#fbf9f9] px-4 text-slate-900 transition-all placeholder:text-[#846262]/50 focus:border-transparent focus:ring-2 focus:ring-[#e9cece] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 h-14 w-full rounded-xl bg-[#e9cece] font-bold text-slate-800 shadow-md shadow-[#e9cece]/20 transition-all active:scale-[0.98] hover:bg-[#e9cece]/90"
            >
              Crear cuenta
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#846262]">
              ¿Ya tienes cuenta?
              <a
                className="ml-1 font-bold text-slate-900 underline-offset-4 hover:underline"
                href="/login"
              >
                Iniciar sesión
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer className="px-6 py-8 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-[#846262]">
          © 2026 NailFlow Todos los derechos reservados.
        </p>
      </footer>

      <div className="pointer-events-none fixed top-0 left-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#e9cece]/10 blur-[120px]"></div>
        <div className="absolute right-[-5%] bottom-[-5%] h-[30%] w-[30%] rounded-full bg-[#e9cece]/15 blur-[100px]"></div>
      </div>
    </div>
  );
}