// lib/utils.ts

/** Menggabungkan class Tailwind, mengabaikan nilai kosong. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Membersihkan nama tamu dari query ?to=
 * - membuang tag/karakter berbahaya dan karakter kontrol
 * - merapikan spasi, membatasi 60 karakter
 * React sudah meng-escape output, ini lapisan pengaman tambahan.
 */
export function sanitizeGuestName(raw: string | null | undefined): string {
  if (!raw) return "Tamu Undangan";
  const cleaned = raw
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[<>"'`&\\]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
  return cleaned || "Tamu Undangan";
}