"use client";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { WEDDING } from "@/lib/wedding-data";
import { motion } from "framer-motion";
import Floral from "@/components/ui/floral";
const WHATSAPP_NUMBER = "6281234567890"; // GANTI dengan nomor Dahlia Printing

export default function Footer() {
  const whatsappMessage = encodeURIComponent(
    "Halo Dahlia Printing, saya tertarik dengan desain undangan digitalnya."
  );

  return (
    
    <footer className="paper relative isolate overflow-hidden border-t border-rose/20 px-5 py-14 text-center sm:py-20">
     
      {/* Soft gradient background */}
      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-ivory/80 via-rose/10 to-rose-deep/10"
      />

      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/15 blur-3xl"
      />

      <Reveal>
        <div className="mx-auto grid max-w-5xl grid-cols-[0.65fr_1.7fr_0.65fr] items-center gap-2 sm:gap-8">
          {/* Bride silhouette */}
          <div className="flex items-center justify-center">
            <img
              src="/images/woman.png"
              alt=""
              className="max-h-44 w-full max-w-36 object-contain sm:max-h-64 sm:max-w-52 scale-x-[-1]"
            />
          </div>

          {/* Center text */}
          <div className="min-w-0">
            <div
              aria-hidden="true"
              className="mb-4 flex items-center justify-center gap-2 text-rose-deep/60"
            >
              <span className="h-px w-12 bg-rose/40" />
              <span className="h-px w-12 bg-rose/40" />
            </div>

            <h2 className="px-2 py-3 font-script text-5xl leading-relaxed sm:text-6xl text-rose-deep">
  {WEDDING.bride.shortName} &amp; {WEDDING.groom.shortName}
</h2>

            <p className="mt-0 font-skuy uppercase text-[15px] tracking-[0.2em] text-rose-deep sm:text-sm sm:tracking-[0.3em] font-bold">
              8 November 2026
            </p>

            <p className="mx-auto mt-5 max-w-xs  text-[15px] leading-5 text-rose-deep/75 sm:text-sm sm:leading-7">
              Terima kasih atas doa dan kehadiran Anda
            </p>

            <p className="mt-5 font-script text-xl text-rose-deep sm:text-2xl font-bold">
              Sampai jumpa di hari bahagia kami
            </p>

            {/* Watermark */}
            <div className="mx-auto mt-6 h-px w-12 bg-gradient-to-r from-transparent via-rose/60 to-transparent" />

            <p className="mt-4 text-[9px] uppercase tracking-[0.18em] text-brown/50 sm:text-[10px]">
              Wedding Invitation Design
            </p>

            <p className="mt-1 text-xs font-semibold tracking-wide text-rose-deep sm:text-sm">
              Dahlia Printing
            </p>
          </div>

          {/* Groom silhouette */}
          <div className="flex items-center justify-center">
            <img
              src="/images/man.png"
              alt=""
              className="max-h-44 w-full max-w-36 object-contain sm:max-h-64 sm:max-w-52"
            />
          </div>
        </div>
      </Reveal>

      <p className="mt-5 text-[9px] tracking-wider text-brown/40">
        Made with love · Dahlia Printing
      </p>
    </footer>
  );
}
