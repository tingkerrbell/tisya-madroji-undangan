"use client";

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
    <Section id="countdown" className="bg-paper/60">
      <Reveal>
        <h2 className="font-serif text-sm uppercase tracking-[0.35em] text-brown">Menuju Hari Bahagia</h2>
      </Reveal>

      <Reveal delay={0.15}>
        {time === "started" ? (
          <p className="mt-8 font-script text-5xl text-rose-deep">Acara telah dimulai</p>
        ) : (
          <div className="mt-8 grid grid-cols-4 gap-3" role="timer" aria-live="off">
            {cells.map((c) => (
              <div key={c.label} className="rounded-xl border border-rose/40 bg-ivory/80 py-4">
                <p className="font-serif text-3xl font-medium tabular-nums sm:text-4xl">
                  {c.value === null ? "--" : pad(c.value)}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-brown">{c.label}</p>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </Section>
  );
}