import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response("Unauthorized", { status: 401 });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Verificar el JWT y obtener el usuario
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(
      authHeader.replace("Bearer ", ""),
    );

    if (userError || !user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Eliminar el negocio (las tablas relacionadas tienen ON DELETE CASCADE)
    const { error: bizError } = await supabaseAdmin
      .from("businesses")
      .delete()
      .eq("user_id", user.id);

    if (bizError) {
      return new Response(JSON.stringify({ error: bizError.message }), { status: 500 });
    }

    // Eliminar el usuario de auth
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (deleteError) {
      return new Response(JSON.stringify({ error: deleteError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
});
