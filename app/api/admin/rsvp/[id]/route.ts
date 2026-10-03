// app/api/admin/rsvp/[id]/route.ts
import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Ctx = { params: Promise<{ id: string }> };

async function authorize(ctx: Ctx) {
  if (!(await isAdminSession())) {
    return { error: NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 }) };
  }
  const { id } = await ctx.params;
  if (!UUID.test(id)) {
    return { error: NextResponse.json({ error: "ID tidak valid." }, { status: 400 }) };
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { error: NextResponse.json({ error: "Database belum dikonfigurasi." }, { status: 503 }) };
  }
  return { id, supabase };
}

/** Hapus seluruh RSVP (nama, kehadiran, dan ucapannya). */
export async function DELETE(_request: Request, ctx: Ctx) {
  const auth = await authorize(ctx);
  if ("error" in auth) return auth.error;

  const { error } = await auth.supabase.from("rsvps").delete().eq("id", auth.id);
  if (error) {
    console.error("Admin delete error:", error.message);
    return NextResponse.json({ error: "Gagal menghapus." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

/** Hapus ucapannya saja; data kehadiran tetap ada. */
export async function PATCH(request: Request, ctx: Ctx) {
  const auth = await authorize(ctx);
  if ("error" in auth) return auth.error;

  const body = (await request.json().catch(() => null)) as { action?: unknown } | null;
  if (body?.action !== "clear_message") {
    return NextResponse.json({ error: "Aksi tidak dikenal." }, { status: 400 });
  }

  const { error } = await auth.supabase.from("rsvps").update({ message: null }).eq("id", auth.id);
  if (error) {
    console.error("Admin update error:", error.message);
    return NextResponse.json({ error: "Gagal menghapus ucapan." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}