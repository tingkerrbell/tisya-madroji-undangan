"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { WEDDING } from "@/lib/wedding-data";

const photos = WEDDING.gallery;

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const [failed, setFailed] = useState<number[]>([]);

  const markFailed = (i: number) => setFailed((prev) => (prev.includes(i) ? prev : [...prev, i]));

  // Pindah antar foto, melewati foto yang filenya belum ada
  const move = useCallback(
    (dir: 1 | -1) => {
      setActive((cur) => {
        if (cur === null) return cur;
        const list = photos.map((_, i) => i).filter((i) => !failed.includes(i));
        const pos = list.indexOf(cur);
        if (pos === -1 || list.length === 0) return null;
        return list[(pos + dir + list.length) % list.length];
      });
    },
    [failed],
  );

  // Keyboard: Esc menutup, panah kiri/kanan berpindah foto
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, move]);

  return (
    <Section id="galeri" className="bg-paper/60">
      <Reveal>
        <h2 className="font-serif text-sm uppercase tracking-[0.35em] text-brown">Galeri</h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo, i) => (
          <Reveal key={photo.src} delay={(i % 3) * 0.08} y={16}>
            {failed.includes(i) ? (
              <div className="flex aspect-[3/4] items-center justify-center rounded-xl border border-dashed border-rose/50 bg-blush/40 text-rose-deep/70">
                <ImageIcon size={28} aria-hidden />
                <span className="sr-only">Foto belum tersedia</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Buka ${photo.alt}`}
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-xl bg-blush/40"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  onError={() => markFailed(i)}
                />
              </button>
            )}
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Pratinjau foto"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
          >
            <div className="relative h-[80vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
              <Image
                src={photos[active].src}
                alt={photos[active].alt}
                fill
                sizes="100vw"
                className="object-contain"
                onError={() => {
                  markFailed(active);
                  setActive(null);
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Tutup"
              className="absolute right-4 top-4 rounded-full bg-ivory/90 p-2 text-ink"
            >
              <X size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                move(-1);
              }}
              aria-label="Foto sebelumnya"
              className="absolute left-3 rounded-full bg-ivory/90 p-2 text-ink"
            >
              <ChevronLeft size={22} aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                move(1);
              }}
              aria-label="Foto berikutnya"
              className="absolute right-3 rounded-full bg-ivory/90 p-2 text-ink"
            >
              <ChevronRight size={22} aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}