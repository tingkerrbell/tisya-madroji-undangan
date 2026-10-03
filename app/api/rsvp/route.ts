// app/api/rsvp/route.ts
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { parseRsvp } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

/** POST: simpan RSVP */
export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Layanan belum dikonfigurasi." }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan. Silakan coba lagi beberapa menit lagi." },
      { status: 429 },
    );
  }

  const raw = await request.text();
  if (raw.length > 4000) {
    return NextResponse.json({ error: "Data terlalu besar." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }

  // Honeypot: kolom tersembunyi yang hanya diisi bot. Pura-pura sukses, tidak disimpan.
  if (typeof body === "object" && body !== null && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const parsed = parseRsvp(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { error } = await supabase.from("rsvps").insert(parsed.data);
  if (error) {
    console.error("Supabase insert error:", error.message);
    return NextResponse.json({ error: "Gagal menyimpan. Silakan coba lagi." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

/** GET: ambil ucapan (publik, hanya nama, pesan, dan tanggal) */
export async function GET(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Layanan belum dikonfigurasi." }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number.parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, count, error } = await supabase
    .from("rsvps")
    .select("id, name, message, created_at", { count: "exact" })
    .not("message", "is", null)
    .neq("message", "")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Supabase select error:", error.message);
    return NextResponse.json({ error: "Gagal memuat ucapan." }, { status: 500 });
  }

  const total = count ?? 0;
  return NextResponse.json({ items: data ?? [], total, hasMore: to + 1 < total });
}