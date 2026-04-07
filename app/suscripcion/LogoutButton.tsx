"use client";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleClick() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-xl border border-[#e9cece] px-6 py-4 text-center text-base font-medium text-[#2d2424] transition-all hover:bg-[#e9cece]/10"
    >
      Ya pagué → Iniciar sesión
    </button>
  );
}