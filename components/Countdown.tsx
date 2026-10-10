"use client";
import { motion } from "framer-motion";
import Floral from "@/components/ui/floral";
import { useEffect, useState } from "react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { WEDDING } from "@/lib/wedding-data";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

// ISO + offset +07:00 = waktu WIB yang pasti, tidak tergantung zona waktu perangkat
const TARGET = new Date(WEDDING.eventDateISO).getTime();

function getTimeLeft(): TimeLeft | "started" {
  const diff = TARGET - Date.now();
  if (diff <= 0) return "started";
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown() {
  // null saat render pertama supaya HTML server dan client sama (tidak hydration error)
  const [time, setTime] = useState<TimeLeft | "started" | null>(null);

  useEffect(() => {
    const tick = () => setTime(getTimeLeft());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { label: "Hari", value: time && time !== "started" ? time.days : null },
    { label: "Jam", value: time && time !== "started" ? time.hours : null },
    { label: "Menit", value: time && time !== "started" ? time.minutes : null },
    { label: "Detik", value: time && time !== "started" ? time.seconds : null },
  ];
return (
  <Section id="bg-countdown" className="bg-countdown">
    <motion.div
            className="pointer-events-none absolute inset-x-0 top-[240px] z-[1] mx-auto h-64 w-full max-w-[900px] px-2 sm:top-[300px] sm:h-80 sm:px-6"
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
      <h2 className="font-skuy text-sm uppercase tracking-[0.35em] text-brown font-bold">
        Menuju Hari Bahagia
      </h2>
    </Reveal>

    <Reveal delay={0.15}>
      {time === "started" ? (
        <p className="mt-8 font-script text-5xl text-rose-deep">
          Acara telah dimulai
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-lg rounded-2xl border border-rose/30 bg-ivory/90 px-3 py-6 shadow-[0_12px_35px_rgba(120,75,75,0.12)] backdrop-blur-sm sm:px-8 sm:py-8"
          role="timer"
          aria-live="off"
        >
          <div className="mb-5 font-script text-2xl text-rose-deep">
            Counting the Moments
          </div>

          <div className="grid grid-cols-4 divide-x divide-rose/30">
            {cells.map((c) => (
              <div
                key={c.label}
                className="flex min-w-0 flex-col items-center px-1 sm:px-3"
              >
                <p className="font-sans text-2xl font-bold tabular-nums text-brown sm:text-4xl">
                  {c.value === null ? "--" : pad(c.value)}
                </p>
                <p className="mt-2 text-[9px] uppercase tracking-wider text-brown/75 sm:text-xs sm:tracking-widest">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </Reveal>
  </Section>
);
}