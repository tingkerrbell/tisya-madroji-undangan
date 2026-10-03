import { ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { WEDDING } from "@/lib/wedding-data";

export default function Families() {
  return (
    <Section id="keluarga" className="bg-paper/60">
      <Reveal>
        <details className="group rounded-2xl border border-rose/40 bg-ivory/80 text-left">
          <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 font-serif text-lg [&::-webkit-details-marker]:hidden">
            Turut Mengundang
            <ChevronDown className="text-rose-deep transition-transform duration-300 group-open:rotate-180" size={20} aria-hidden />
          </summary>
          <ul className="space-y-2 px-6 pb-6 text-sm leading-relaxed">
            {WEDDING.families.map((name) => (
              <li key={name} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" aria-hidden />
                {name}
              </li>
            ))}
          </ul>
        </details>
      </Reveal>
    </Section>
  );
}