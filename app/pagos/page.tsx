import { createClient, getBusiness } from "../../lib/supabase-server";
import { revalidatePath } from "next/cache";
import PagosForm from "./PagosForm";
import AppSidebar, { AppMobileHeader } from "../_components/AppSidebar";

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

    await supabase
      .from("businesses")
      .update({
        payments_enabled,
        payment_percentage,
        sinpe_number,
        sinpe_bank,
        whatsapp_number,
      })
      .eq("id", business.id);

    revalidatePath("/pagos");
  }

  return (
    <div className="min-h-screen bg-[#fbf9f9] font-sans text-[#2d2424]">
      <AppSidebar active="pagos" />
      <AppMobileHeader />

      <div className="lg:pl-[220px]">
        <main className="mx-auto max-w-7xl px-4 py-8 lg:px-10 lg:py-10">
          {/* Editorial header */}
          <header className="mb-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#846262]">
              SINPE Móvil · pagos anticipados
            </p>
            <h1 className="serif-heading mt-2 text-3xl font-medium leading-tight tracking-tight lg:text-4xl">
              Cobrá{" "}
              <em className="font-normal italic text-[#846262]">sin pena</em>.
            </h1>
          </header>

          <PagosForm business={business} savePaymentSettings={savePaymentSettings} />
        </main>
      </div>
    </div>
  );
}
