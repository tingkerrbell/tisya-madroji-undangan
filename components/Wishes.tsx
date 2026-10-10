"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, MessageCircleHeart } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import Floral from "@/components/ui/floral";
import { motion } from "framer-motion";
type Wish = { id: string; name: string; message: string; created_at: string };

type ApiResponse = { items: Wish[]; total: number; hasMore: boolean; error?: string };

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });

export default function Wishes() {
  const [items, setItems] = useState<Wish[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const busy = useRef(false);

  const load = useCallback(async (target: number, replace: boolean) => {
    if (busy.current) return;
    busy.current = true;
    setLoading(true);
    try {
      const res = await fetch(`/api/rsvp?page=${target}`, { cache: "no-store" });
      const data = (await res.json()) as ApiResponse;
      if (!res.ok) throw new Error(data.error);

      setItems((prev) => {
        const base = replace ? [] : prev;
        const known = new Set(base.map((w) => w.id));
        return [...base, ...data.items.filter((w) => !known.has(w.id))];
      });
      setPage(target);
      setHasMore(data.hasMore);
      setTotal(data.total);
      setError(false);
    } catch {
      setError(true);
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(1, true);
    const refresh = () => void load(1, true);
    window.addEventListener("wishes:refresh", refresh);
    return () => window.removeEventListener("wishes:refresh", refresh);
  }, [load]);

  return (
    <Section id="bg-wishes" className="bg-wishes">
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[-130px] z-[1] mx-auto h-64 w-full max-w-[900px] px-2 sm:top-[-150px] sm:h-80 sm:px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Floral
            src="/images/floral/datar.png"
            className="h-full w-full"
          />
        </motion.div>
      </motion.div>
      <Reveal>
        <MessageCircleHeart className="mx-auto text-rose-deep" size={24} aria-hidden />
        <h2 className="mt-3 font-skuy text-sm uppercase tracking-[0.35em] text-brown font-bold">Ucapan &amp; Doa</h2>
        {total > 0 && <p className="mt-2 text-md text-brown">{total} ucapan</p>}
      </Reveal>

      <div className="mt-8 space-y-4 text-left">
        {items.map((wish) => (
          <article key={wish.id} className="rounded-2xl border border-rose/40 bg-ivory/80 px-5 py-4">
            <header className="flex items-baseline justify-between gap-3">
              <h3 className="font-serif text-lg font-medium">{wish.name}</h3>
              <time dateTime={wish.created_at} className="shrink-0 text-xs text-brown/80">
                {formatDate(wish.created_at)}
              </time>
            </header>
            <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed">{wish.message}</p>
          </article>
        ))}

        {!loading && !error && items.length === 0 && (
          <p className="text-center text-sm text-brown">Belum ada ucapan. Jadilah yang pertama.</p>
        )}
        {error && <p className="text-center text-sm text-brown">Ucapan belum dapat dimuat saat ini.</p>}
      </div>

      {loading && <Loader2 className="mx-auto mt-6 animate-spin text-rose-deep" size={22} aria-label="Memuat" />}

      {hasMore && !loading && (
        <button
          type="button"
          onClick={() => load(page + 1, false)}
          className="mt-6 rounded-full border border-rose px-6 py-2 text-sm text-rose-deep transition hover:bg-blush"
        >
          Muat lebih banyak
        </button>
      )}
    </Section>
  );
}