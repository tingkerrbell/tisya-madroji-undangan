// lib/rate-limit.ts
// Pembatas sederhana di memori. Cukup untuk undangan pribadi.
// Catatan: di Vercel tiap instance punya memori sendiri, jadi ini bersifat "best effort".
const hits = new Map<string, number[]>();

/** Mengembalikan true jika masih diizinkan. Default: 10 kiriman per 10 menit per IP. */
export function rateLimit(key: string, limit = 10, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);

  // Bersihkan entri lama agar memori tidak membengkak
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return true;
}