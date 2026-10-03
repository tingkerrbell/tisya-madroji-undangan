import Divider from "@/components/ui/divider";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { WEDDING } from "@/lib/wedding-data";

export default function Quote() {
  return (
    <Section id="quote">
      <Reveal>
        <Divider className="mb-10" />
        <blockquote className="font-serif text-xl leading-relaxed sm:text-2xl">
          &ldquo;{WEDDING.quote.text}&rdquo;
        </blockquote>
        <p className="mt-6 font-serif text-sm tracking-widest text-brown">
          ( {WEDDING.quote.source} )
        </p>
        <Divider className="mt-10" />
      </Reveal>
    </Section>
  );
}