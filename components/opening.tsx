"use client";

import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { MailOpen } from "lucide-react";
import Floral from "@/components/ui/floral";
import { WEDDING } from "@/lib/wedding-data";
import { sanitizeGuestName } from "@/lib/utils";

type Props = {
  opened: boolean;
  onOpen: () => void;
  onExited: () => void;
};

export default function Opening({ opened, onOpen, onExited }: Props) {
  const reduce = useReducedMotion();
  const guest = sanitizeGuestName(useSearchParams().get("to"));

  return (
    <motion.section
      role="dialog"
      aria-label="Sampul undangan"
      className="paper fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      initial={false}
      animate={opened ? { y: "-100%", opacity: 0.4 } : { y: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0 : 1.1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => opened && onExited()}
    >
      {/* Watercolor placeholder (selalu tampil, lembut) */}
      <div className="watercolor pointer-events-none absolute -left-16 -top-16 h-72 w-72" aria-hidden />
      <div className="watercolor pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 opacity-70" aria-hidden />

      {/* Ornamen: ganti file PNG di public/images/floral/ */}
      <Floral
        src="/images/floral/corner.png"
        className="float-slow absolute -left-6 -top-4 h-56 w-56 sm:h-80 sm:w-80"
      />
      <Floral
        src="/images/floral/ribbon.png"
        className="absolute -bottom-6 -right-6 h-48 w-48 sm:h-72 sm:w-72"
      />

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-serif text-sm uppercase tracking-[0.4em] text-brown">The Wedding of</p>

        <h1 className="mt-4 font-script text-7xl leading-[1.05] sm:text-8xl">
          {WEDDING.bride.shortName}
          <span className="block font-serif text-3xl text-rose-deep">&amp;</span>
          {WEDDING.groom.shortName}
        </h1>

        <p className="mt-6 font-serif text-lg tracking-[0.3em]">
          {WEDDING.coverDate.replaceAll("-", " · ")}
        </p>

        <div className="mt-12">
          <p className="font-serif text-sm text-brown">Kepada Yth.</p>
          <p className="font-serif text-sm text-brown">Bapak/Ibu/Saudara/i</p>
          <p className="mt-3 max-w-[18rem] break-words font-serif text-2xl font-medium">{guest}</p>
        </div>

        <button
        
          type="button"
          onClick={onOpen}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-rose px-8 py-3 font-sans text-sm tracking-wider text-white shadow-md shadow-rose/30 transition hover:bg-rose-deep active:scale-95"
        >
          <MailOpen size={18} aria-hidden />
          Buka Undangan
        </button>

        <p className="mt-8 max-w-xs text-xs text-brown/80">
          Mohon maaf apabila ada kesalahan penulisan nama dan gelar
        </p>
      </div>
    </motion.section>
  );
}