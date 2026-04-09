import { createClient, getBusiness } from "../../lib/supabase-server";
import { revalidatePath } from "next/cache";
import { LayoutDashboard, Clock, Scissors, Images, CreditCard, BarChart3, Sparkles, User } from "lucide-react";
import PagosForm from "./PagosForm";

export default async function PagosPage() {
  const supabase = await createClient();
  const business = await getBusiness();

  if (!business) return <p>No se encontró tu negocio.</p>;

  async function savePaymentSettings(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const business = await getBusiness();
    if (!business) return;

    const payments_enabled = formData.get("payments_enabled") === "on";
    const payment_percentage = parseInt(formData.get("payment_percentage") as string);
    if (isNaN(payment_percentage) || payment_percentage < 1 || payment_percentage > 100) return;
    const sinpe_number = formData.get("sinpe_number") as string;
    const sinpe_bank = formData.get("sinpe_bank") as string;
    const whatsapp_number = formData.get("whatsapp_number") as string;

    await supabase.from("businesses").update({
      payments_enabled,
      payment_percentage,
      sinpe_number,
      sinpe_bank,
      whatsapp_number,
    }).eq("id", business.id);

    revalidatePath("/pagos");
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 flex-col border-r border-slate-100 bg-white lg:flex">
        <div className="flex h-14 items-center gap-2 border-b border-slate-100 px-5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="serif-heading text-sm font-semibold tracking-tight">
            NailFlow
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          <a
            href="/dashboard"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </a>
          <a
            href="/citas"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Clock className="h-4 w-4" /> Citas
          </a>
          <a
            href="/servicios"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Scissors className="h-4 w-4" /> Servicios
          </a>
          <a
            href="/galeria"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Images className="h-4 w-4" /> Galería
          </a>
          <a
            href="/pagos"
            className="flex items-center gap-3 rounded-md bg-[#e9cece]/20 px-3 py-2 text-sm font-medium text-slate-900"
          >
            <CreditCard className="h-4 w-4" /> Pagos
          </a>
          <a
            href="/reportes"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <BarChart3 className="h-4 w-4" /> Reportes
          </a>
          <a
            href="/perfil"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <User className="h-4 w-4" /> Perfil
          </a>
        </nav>
      </aside>

      {/* Mobile header */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-100 bg-white px-4 lg:hidden"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 0px)",
          height: "calc(3.5rem + env(safe-area-inset-top))",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e9cece] text-[#2d2424]">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="serif-heading text-sm font-semibold">NailFlow</span>
        </div>
        <a
          href="/dashboard"
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          ← Volver
        </a>
      </header>

      <div className="lg:pl-60">
        <main className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-10">
          <div className="mb-8">
            <h1 className="serif-heading text-2xl font-semibold tracking-tight text-slate-900">
              Pagos
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Configura los pagos anticipados para tus citas.
            </p>
          </div>
          <PagosForm
            business={business}
            savePaymentSettings={savePaymentSettings}
          />
        </main>
      </div>
    </div>
  );
}