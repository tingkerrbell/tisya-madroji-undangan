import { redirect } from "next/navigation";
import AdminTable, { type AdminRsvp } from "@/components/admin/AdminTable";
import LogoutButton from "@/components/admin/LogoutButton";
import { isAdminSession } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminSession())) redirect("/admin/login");

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return (
      <main className="mx-auto max-w-xl px-6 py-20 text-center">
        <p>Database belum dikonfigurasi. Periksa file .env.local.</p>
      </main>
    );
  }

  const { data, error } = await supabase
    .from("rsvps")
    .select("id, name, attendance, guest_count, message, created_at")
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error) {
    console.error("Admin load error:", error.message);
  }

  const rows = (data ?? []) as AdminRsvp[];
  const attending = rows.filter((r) => r.attendance === "hadir");

  const stats = [
    { label: "Total RSVP", value: rows.length },
    { label: "Hadir", value: attending.length },
    { label: "Tidak hadir", value: rows.length - attending.length },
    { label: "Total tamu hadir", value: attending.reduce((sum, r) => sum + r.guest_count, 0) },
    { label: "Ucapan", value: rows.filter((r) => r.message).length },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-script text-4xl sm:text-5xl">Dashboard</h1>
          <p className="text-sm text-brown">Tisya &amp; Madroji · 8 November 2026</p>
        </div>
        <LogoutButton />
      </header>

      {error && <p className="mt-4 text-sm text-red-700">Gagal memuat data dari database.</p>}

      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5" aria-label="Ringkasan">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-rose/40 bg-ivory/90 px-4 py-4 text-center">
            <p className="font-serif text-3xl tabular-nums">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-brown">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <AdminTable rows={rows} />
      </section>
    </main>
  );
}