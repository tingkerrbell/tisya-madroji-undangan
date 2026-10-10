"use client";
import { Calendar, Clock, MapPin } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { WEDDING } from "@/lib/wedding-data";
import { motion } from "framer-motion";
import Floral from "@/components/ui/floral";
export default function Event() {
  return (
    <Section id="bg-event" className="bg-event">
      {/* Satu ornamen bunga */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[-130px] z-[1] mx-auto h-64 w-full max-w-[900px] px-2 sm:top-[-190px] sm:h-80 sm:px-6"
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
            src="/images/floral/up.png"
            className="h-full w-full rotate-180"
          />
        </motion.div>
      </motion.div>
      <Reveal>
        <h2 className="font-skuy text-sm font-bold uppercase tracking-[0.35em] text-brown">Acara Pernikahan</h2>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {WEDDING.events.map((ev, i) => (
          <Reveal key={ev.id} delay={i * 0.15}>
            <article className="h-full rounded-2xl border border-rose/40 bg-ivory/70 px-6 py-8">
              <h3 className="font-script text-4xl text-brown font-medium">{ev.title}</h3>
              <div className="divider-dot my-4" aria-hidden>
                <span />
              </div>
              <p className="flex items-center justify-center gap-2 font-skuy text-md text-brown ">
                <Calendar size={16} className="text-rose-deep" aria-hidden />
                {ev.date}
              </p>
              <p className="mt-2 flex items-center justify-center gap-2 font-skuy text-md text-brown">
                <Clock size={16} className="text-rose-deep" aria-hidden />
                {ev.time}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10">
        <MapPin className="mx-auto text-rose-deep" size={22} aria-hidden />
        <address className="mt-3 font-skuy text-md text-brown not-italic leading-relaxed">
          {WEDDING.address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      </Reveal>
    </Section>
  );
}