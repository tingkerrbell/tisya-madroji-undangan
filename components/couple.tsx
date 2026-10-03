"use client";

import Image from "next/image";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { WEDDING } from "@/lib/wedding-data";

type Person = typeof WEDDING.bride | typeof WEDDING.groom;

function PersonInfo({
  person,
  isBride,
}: {
  person: Person;
  isBride: boolean;
}) {
  return (
    <div className="text-center">
      <p className="font-serif text-xs uppercase tracking-[0.4em] text-brown">
        {isBride ? "The Bride" : "The Groom"}
      </p>

      <h3 className="mt-3 font-script text-5xl leading-none text-rose-deep sm:text-6xl">
        {person.fullName}
      </h3>

      <p className="mt-3 font-serif text-lg italic text-brown">
        "{person.shortName}"
      </p>

      <div className="mx-auto mt-5 h-px w-16 bg-rose/50" />

      <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-brown">
        {person.childOrder}
      </p>

      <p className="mt-5 font-serif text-base">
        {isBride ? "Putri dari" : "Putra dari"}
      </p>

      <p className="mt-1 font-serif text-sm">
        {person.father}
      </p>

      <p className="font-serif text-sm text-rose-deep">
        &amp;
      </p>

      <p className="font-serif text-sm">
        {person.mother}
      </p>
    </div>
  );
}

export default function Couple() {
  return (
    <Section id="mempelai" className="overflow-hidden">
      {/* Heading */}
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-xs uppercase tracking-[0.45em] text-brown">
            The Bride & Groom
          </p>

          <h2 className="mt-4 font-script text-7xl leading-none text-rose-deep sm:text-8xl">
            Mempelai
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-brown">
            Dua hati yang dipertemukan untuk melangkah bersama
            dalam sebuah perjalanan baru.
          </p>
        </div>
      </Reveal>

      {/* Silhouette */}
      <Reveal delay={0.15} y={40}>
        <div className="relative mx-auto mt-10 w-full max-w-[360px] sm:max-w-[400px]">
          <div className="absolute inset-8 rounded-full bg-rose/10 blur-3xl" />

          <Image
            src="/images/couple.png"
            alt="Siluet pasangan pengantin"
            width={900}
            height={1100}
            className="relative h-auto w-full object-contain"
            priority
          />
        </div>
      </Reveal>

      {/* Names */}
      <div className="mx-auto mt-6 max-w-xl">
        <Reveal delay={0.25}>
          <PersonInfo
            person={WEDDING.bride}
            isBride
          />
        </Reveal>

        {/* Heart divider */}
        <Reveal delay={0.35}>
          <div className="my-10 flex items-center justify-center">
            <span className="h-px w-16 bg-rose/40" />

            <span className="mx-5 font-serif text-2xl text-rose-deep">
              ♥
            </span>

            <span className="h-px w-16 bg-rose/40" />
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <PersonInfo
            person={WEDDING.groom}
            isBride={false}
          />
        </Reveal>
      </div>
    </Section>
  );
}