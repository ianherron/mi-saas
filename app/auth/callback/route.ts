import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash") ?? searchParams.get("token");
  const type = searchParams.get("type");

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  let user = null;

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("exchangeCodeForSession:", error?.message);
    user = data?.user;
  } else if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as any,
    });
    console.log("verifyOtp:", error?.message);
    user = data?.user;
  }

  console.log("user:", user?.id);
  console.log("metadata:", user?.user_metadata);

  if (user) {
    const { data: existing } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!existing) {
      const { business_name, owner_name, slug, email } = user.user_metadata ?? {};
      if (business_name && slug) {
        const { error: insertError } = await supabase.from("businesses").insert({
          user_id: user.id,
          name: business_name,
          owner_name,
          slug,
          email,
        });
        console.log("insert error:", insertError?.message);
      }
    }
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}