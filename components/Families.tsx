"use client";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { WEDDING } from "@/lib/wedding-data";
import { motion } from "framer-motion";
import Floral from "@/components/ui/floral";

export default function Families() {
  return (
    <Section id="bg-families" className="bg-families">
      {/* Satu ornamen bunga */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[-110px] z-[1] mx-auto h-64 w-full max-w-[900px] px-2 sm:top-[-160px] sm:h-80 sm:px-6"
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

      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[580px] z-[1] mx-auto h-64 w-full max-w-[900px] px-2 sm:top-[620px] sm:h-80 sm:px-6"
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
  <div>
    {/* Judul di luar kotak */}
    <h3 className="mb-8 text-center font-script text-5xl text-rose-deep sm:text-6xl">
      Turut Mengundang
    </h3>

    {/* Kotak daftar nama */}
    <div className="rounded-2xl border border-rose/40 bg-ivory/80 px-6 py-5 text-left">
      <ul className="space-y-2 text-sm leading-relaxed text-brown">
        {WEDDING.families.map((name) => (
          <li key={name} className="flex gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose"
              aria-hidden
            />
            {name}
          </li>
        ))}
      </ul>
    </div>
  </div>
</Reveal>
    </Section>
  );
}