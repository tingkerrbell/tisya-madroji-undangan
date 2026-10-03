"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminRsvp = {
  id: string;
  name: string;
  attendance: "hadir" | "tidak_hadir";
  guest_count: number;
  message: string | null;
  created_at: string;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  });

export default function AdminTable({ rows }: { rows: AdminRsvp[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<"rsvp" | "ucapan">("rsvp");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const wishes = rows.filter((r) => r.message);

  async function run(id: string, init: RequestInit, confirmText: string) {
    if (!window.confirm(confirmText)) return;
    setBusyId(id);
    setError("");
    try {
      const res = await fetch(`/api/admin/rsvp/${id}`, {
        ...init,
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Terjadi kesalahan.");
        return;
      }
      router.refresh();
    } catch {
      setError("Koneksi bermasalah.");
    } finally {
      setBusyId(null);
    }
  }

  const removeRsvp = (r: AdminRsvp) =>
    run(r.id, { method: "DELETE" }, `Hapus RSVP dari "${r.name}" beserta ucapannya? Ini tidak bisa dibatalkan.`);

  const removeWish = (r: AdminRsvp) =>
    run(
      r.id,
      { method: "PATCH", body: JSON.stringify({ action: "clear_message" }) },
      `Hapus ucapan dari "${r.name}"? Data kehadirannya tetap tersimpan.`,
    );

  const tabClass = (active: boolean) =>
    cn(
      "rounded-full px-5 py-2 text-sm transition",
      active ? "bg-rose text-white" : "border border-rose/50 text-rose-deep hover:bg-blush",
    );

  return (
    <div>
      <div className="flex gap-2" role="tablist">
        <button role="tab" aria-selected={tab === "rsvp"} className={tabClass(tab === "rsvp")} onClick={() => setTab("rsvp")}>
          RSVP ({rows.length})
        </button>
        <button role="tab" aria-selected={tab === "ucapan"} className={tabClass(tab === "ucapan")} onClick={() => setTab("ucapan")}>
          Ucapan ({wishes.length})
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

      {tab === "rsvp" ? (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-rose/40 bg-ivory/90">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-rose/30 bg-paper/80 text-xs uppercase tracking-wider text-brown">
              <tr>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Kehadiran</th>
                <th className="px-4 py-3">Tamu</th>
                <th className="px-4 py-3">Ucapan</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-brown">
                    Belum ada RSVP.
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-rose/20 align-top last:border-0">
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs",
                        r.attendance === "hadir" ? "bg-blush text-rose-deep" : "bg-paper text-brown",
                      )}
                    >
                      {r.attendance === "hadir" ? "Hadir" : "Tidak hadir"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{r.attendance === "hadir" ? r.guest_count : "-"}</td>
                  <td className="max-w-xs whitespace-pre-line break-words px-4 py-3 text-brown">{r.message ?? "-"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-brown">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      disabled={busyId === r.id}
                      onClick={() => removeRsvp(r)}
                      aria-label={`Hapus RSVP ${r.name}`}
                      className="rounded-full p-2 text-red-700 transition hover:bg-red-50 disabled:opacity-40"
                    >
                      <Trash2 size={16} aria-hidden />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {wishes.length === 0 && <li className="py-8 text-center text-sm text-brown">Belum ada ucapan.</li>}
          {wishes.map((r) => (
            <li key={r.id} className="rounded-2xl border border-rose/40 bg-ivory/90 px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-lg font-medium">{r.name}</p>
                  <p className="text-xs text-brown">{formatDate(r.created_at)}</p>
                </div>
                <button
                  type="button"
                  disabled={busyId === r.id}
                  onClick={() => removeWish(r)}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full border border-red-200 px-3 py-1 text-xs text-red-700 transition hover:bg-red-50 disabled:opacity-40"
                >
                  <Trash2 size={14} aria-hidden />
                  Hapus ucapan
                </button>
              </div>
              <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed">{r.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}