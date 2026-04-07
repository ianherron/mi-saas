import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "1 m"),
  analytics: true,
});

export async function middleware(request: NextRequest) {
  // Rate limiting en reservas
  if (request.nextUrl.pathname.startsWith("/reservar/")) {
    const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return new NextResponse(
        JSON.stringify({ error: "Demasiadas solicitudes." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const protectedRoutes = ["/dashboard", "/citas", "/servicios", "/galeria", "/pagos", "/reportes"];
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Verificar suscripción en rutas protegidas
  if (isProtected && user) {
    const { data: business } = await supabase
      .from("businesses")
      .select("subscription_status, trial_ends_at")
      .eq("user_id", user.id)
      .single();

    if (business) {
      const isTrialExpired =
        business.subscription_status === "trial" &&
        new Date(business.trial_ends_at) < new Date();

      const isCancelled = business.subscription_status === "cancelled";
      const isPending = business.subscription_status === "pending";

      if (isTrialExpired || isCancelled || isPending) {
        return NextResponse.redirect(new URL("/suscripcion", request.url));
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/citas/:path*",
    "/servicios/:path*",
    "/galeria/:path*",
    "/pagos/:path*",
    "/reportes/:path*",
    "/login",
    "/reservar/:path*",
    "/suscripcion",
  ],
};