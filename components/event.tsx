import { Calendar, Clock, MapPin } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { WEDDING } from "@/lib/wedding-data";

export default function Event() {
  return (
    <Section id="acara">
      <Reveal>
        <h2 className="font-serif text-sm uppercase tracking-[0.35em] text-brown">Acara Pernikahan</h2>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {WEDDING.events.map((ev, i) => (
          <Reveal key={ev.id} delay={i * 0.15}>
            <article className="h-full rounded-2xl border border-rose/40 bg-paper/70 px-6 py-8">
              <h3 className="font-script text-4xl">{ev.title}</h3>
              <div className="divider-dot my-4" aria-hidden>
                <span />
              </div>
              <p className="flex items-center justify-center gap-2 font-serif text-lg">
                <Calendar size={16} className="text-rose-deep" aria-hidden />
                {ev.date}
              </p>
              <p className="mt-2 flex items-center justify-center gap-2 font-serif text-lg">
                <Clock size={16} className="text-rose-deep" aria-hidden />
                {ev.time}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10">
        <MapPin className="mx-auto text-rose-deep" size={22} aria-hidden />
        <address className="mt-3 font-serif text-lg not-italic leading-relaxed">
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