"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Send } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import Toast, { type ToastState } from "@/components/ui/toast";
import { sanitizeGuestName } from "@/lib/utils";

type Attendance = "hadir" | "tidak_hadir";

const field =
  "w-full rounded-xl border border-rose/40 bg-ivory px-4 py-3 text-sm outline-none transition focus:border-rose-deep focus:ring-2 focus:ring-rose/30 disabled:opacity-50";

const option =
  "flex cursor-pointer items-center justify-center rounded-xl border border-rose/40 bg-ivory px-3 py-3 text-sm transition has-[:checked]:border-rose-deep has-[:checked]:bg-blush has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-rose/40";

export default function RSVP() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance | "">("");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot, harus tetap kosong
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; attendance?: string }>({});
  const [toast, setToast] = useState<ToastState>(null);
  const closeToast = useCallback(() => setToast(null), []);

  // Isi nama otomatis dari ?to=Nama (tanpa useSearchParams agar halaman tetap statis)
  useEffect(() => {
    const to = new URLSearchParams(window.location.search).get("to");
    if (to) {
      const guest = sanitizeGuestName(to);
      if (guest !== "Tamu Undangan") setName((prev) => prev || guest);
    }
  }, []);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const next: typeof errors = {};
    if (!name.trim()) next.name = "Nama wajib diisi.";
    if (!attendance) next.attendance = "Pilih kehadiran Anda.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          attendance,
          guest_count: attendance === "hadir" ? guestCount : 1,
          message,
          website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setToast({ type: "error", text: data.error ?? "Gagal mengirim. Silakan coba lagi." });
        return;
      }

      setToast({ type: "success", text: "Terima kasih! Konfirmasi dan ucapan Anda telah tersimpan." });
      setAttendance("");
      setGuestCount(1);
      setMessage("");
      window.dispatchEvent(new Event("wishes:refresh"));
    } catch {
      setToast({ type: "error", text: "Koneksi bermasalah. Silakan coba lagi." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="rsvp">
      <Toast toast={toast} onClose={closeToast} />

      <Reveal>
        <h2 className="font-serif text-sm uppercase tracking-[0.35em] text-brown">Konfirmasi Kehadiran</h2>
        <p className="mx-auto mt-4 max-w-sm text-sm text-brown">
          Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-5 text-left">
          <div>
            <label htmlFor="rsvp-name" className="mb-1 block text-sm text-brown">
              Nama
            </label>
            <input
              id="rsvp-name"
              type="text"
              maxLength={80}
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
              className={field}
            />
            {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
          </div>

          <fieldset>
            <legend className="mb-1 text-sm text-brown">Kehadiran</legend>
            <div className="grid grid-cols-2 gap-3">
              <label className={option}>
                <input
                  type="radio"
                  name="attendance"
                  value="hadir"
                  checked={attendance === "hadir"}
                  onChange={() => setAttendance("hadir")}
                  className="sr-only"
                />
                Hadir
              </label>
              <label className={option}>
                <input
                  type="radio"
                  name="attendance"
                  value="tidak_hadir"
                  checked={attendance === "tidak_hadir"}
                  onChange={() => setAttendance("tidak_hadir")}
                  className="sr-only"
                />
                Tidak dapat hadir
              </label>
            </div>
            {errors.attendance && <p className="mt-1 text-xs text-red-700">{errors.attendance}</p>}
          </fieldset>

          <div>
            <label htmlFor="rsvp-count" className="mb-1 block text-sm text-brown">
              Jumlah tamu
            </label>
            <select
              id="rsvp-count"
              value={guestCount}
              disabled={attendance !== "hadir"}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className={field}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} orang
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="rsvp-message" className="mb-1 block text-sm text-brown">
              Ucapan &amp; doa
            </label>
            <textarea
              id="rsvp-message"
              rows={4}
              maxLength={500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={field}
            />
            <p className="mt-1 text-right text-xs text-brown/70">{message.length}/500</p>
          </div>

          {/* Honeypot: disembunyikan dari manusia dan pembaca layar */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label>
              Website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-rose px-7 py-3 text-sm tracking-wider text-white shadow-md shadow-rose/30 transition hover:bg-rose-deep active:scale-95 disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Send size={16} aria-hidden />}
            {loading ? "Mengirim..." : "Kirim Konfirmasi"}
          </button>
        </form>
      </Reveal>
    </Section>
  );
}