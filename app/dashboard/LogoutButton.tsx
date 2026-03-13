"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex size-10 items-center justify-center rounded-full bg-[#f2d4d7]/20 text-[#2d2926] transition-colors hover:bg-[#f2d4d7]/40"
    >
      🚪
    </button>
  );
}