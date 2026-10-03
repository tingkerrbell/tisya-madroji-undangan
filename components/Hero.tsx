"use client";

import { motion } from "framer-motion";
import Floral from "@/components/ui/floral";
import Reveal from "@/components/ui/reveal";
import { WEDDING } from "@/lib/wedding-data";
import Parallax from "./ui/parallax";

export default function Hero() {
  return (
    <section className="paper relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-20 text-center">
      {/* Soft background */}
      <div
        className="watercolor pointer-events-none absolute -right-20 top-10 h-72 w-72"
        aria-hidden
      />

      {/* =========================
          FLORAL FRAME - TOP LEFT
         ========================= */}

      <motion.div
        className="pointer-events-none absolute -left-12 -top-8 z-[1] h-64 w-64 sm:-left-16 sm:-top-10 sm:h-80 sm:w-80"
        initial={{ opacity: 0, x: -100, y: -50, rotate: -10 }}
        animate={{
          opacity: 1,
          x: 20,
          y: -20,
          rotate: 115,
        }}
        transition={{
          duration: 1.4,
          delay: 1.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="h-full w-full"
          animate={{
            rotate: [-1, 1, -1],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        >
          <Floral
            src="/images/floral/corner.png"
            className="h-full w-full"
          />
        </motion.div>
      </motion.div>

      {/* =========================
          FLORAL FRAME - TOP RIGHT
         ========================= */}

      <motion.div
        className="pointer-events-none absolute -right-12 -top-8 z-[1] h-64 w-64 scale-x-[-1] sm:-right-16 sm:-top-10 sm:h-80 sm:w-80"
        initial={{ opacity: 0, x: 100, y: -50, rotate: 8 }}
        animate={{
          opacity: 1,
          x: 20,
          y: -20,
          rotate: 115,
        }}
        transition={{
          duration: 1.4,
          delay: 1.25,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="h-full w-full"
          animate={{
            rotate: [1, -1, 1],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.8,
          }}
        >
          <Floral
            src="/images/floral/corner.png"
            className="h-full w-full"
          />
        </motion.div>
      </motion.div>

      {/* =========================
          FLORAL FRAME - BOTTOM LEFT
         ========================= */}

      <motion.div
        className="pointer-events-none absolute -bottom-12 -left-12 z-[1] h-60 w-60 rotate-180 sm:-bottom-16 sm:-left-16 sm:h-72 sm:w-72"
        initial={{ opacity: 0, x: -100, y: 50, rotate: 172 }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 180,
        }}
        transition={{
          duration: 1.5,
          delay: 1.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="h-full w-full"
          animate={{
            rotate: [1, -1, 1],
            y: [0, 3, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <Floral
            src="/images/floral/corner.png"
            className="h-full w-full"
          />
        </motion.div>
      </motion.div>

      {/* =========================
          FLORAL FRAME - BOTTOM RIGHT
         ========================= */}

      <motion.div
        className="pointer-events-none absolute -bottom-12 -right-12 z-[1] h-60 w-60 rotate-180 scale-x-[-1] sm:-bottom-16 sm:-right-16 sm:h-72 sm:w-72"
        initial={{ opacity: 0, x: 100, y: 50, rotate: -172 }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          rotate: -180,
        }}
        transition={{
          duration: 1.5,
          delay: 1.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="h-full w-full"
          animate={{
            rotate: [-1, 1, -1],
            y: [0, 3, 0],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.2,
          }}
        >
          <Floral
            src="/images/floral/corner.png"
            className="h-full w-full"
          />
        </motion.div>
      </motion.div>

      {/* =========================
          CENTER CONTENT
         ========================= */}

      <div className="relative z-10 max-w-3xl">
        <Reveal>
          <p className="font-serif text-sm uppercase tracking-[0.4em] text-brown">
            The Wedding of
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="mt-5 font-script text-7xl leading-[1.05] sm:text-9xl">
            {WEDDING.bride.shortName}

            <span className="block font-serif text-3xl text-rose-deep">
              &amp;
            </span>

            {WEDDING.groom.shortName}
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mx-auto mt-10 w-fit border-y border-brown/40 py-4 font-serif tracking-[0.3em]">
            <p className="text-sm">MINGGU</p>
            <p className="text-3xl">08 NOVEMBER</p>
            <p className="text-sm">2026</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}