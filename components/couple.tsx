"use client";

import Image from "next/image";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { WEDDING } from "@/lib/wedding-data";
import { motion } from "framer-motion";
import Floral from "@/components/ui/floral";

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
      <p className="font-skuy text-sm font-bold uppercase tracking-[0.25em] text-brown">
        {isBride ? "The Bride" : "The Groom"}
      </p>

      <h3 className="mt-3 font-beau text-6xl font-medium leading-tight tracking-wide text-rose-deep sm:text-5xl">
        {person.fullName}
      </h3>

      <p className="mt-2 font-skuy text-md font-normal tracking-wide text-brown">
        "{person.shortName}"
      </p>

      <div className="mx-auto my-5 flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-rose/40" />
        <span className="text-sm text-rose-deep">♥</span>
        <span className="h-px w-12 bg-rose/40" />
      </div>

      <p className="mx-auto max-w-sm font-sans text-md leading-relaxed text-brown">
        {person.childOrder}
      </p>

      <p className="mt-3 font-sans text-md leading-relaxed text-brown">
        {person.father}
      </p>

      <p className="font-sans text-md text-rose-deep">&</p>

      <p className="font-sans text-md leading-relaxed text-brown">
        {person.mother}
      </p>
    </div>
  );
}

function PersonCard({
  person,
  isBride,
  image,
  delay,
}: {
  person: Person;
  isBride: boolean;
  image: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} y={30}>
      <article className="relative overflow-hidden rounded-[2rem] border border-rose/20 bg-[#F8F1E9]/80 px-5 py-8 shadow-sm sm:px-10 sm:py-10">
        {/* Ornamen dekoratif */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-rose/10 blur-2xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#DCC8AE]/20 blur-2xl"
        />

        {/* Siluet pengantin */}
        <div className="relative z-10 mx-auto mb-6 w-full max-w-[200px] sm:max-w-[230px]">
          <Image
            src={image}
            alt={`Siluet ${isBride ? "pengantin wanita" : "pengantin pria"}`}
            width={400}
            height={600}
            className="h-auto w-full object-contain"
            sizes="(max-width: 640px) 200px, 230px"
          />
        </div>

        {/* Informasi pengantin */}
        <div className="relative z-10">
          <PersonInfo person={person} isBride={isBride} />
        </div>
      </article>
    </Reveal>
  );
}

export default function Couple() {
  return (
    <Section id="bg-couple" className="bg-couple">
      {/* Heading */}
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-skuy text-sm font-bold uppercase tracking-[0.35em] text-brown sm:text-sm sm:tracking-[0.45em]">
            The Bride & Groom
          </p>

          <h2 className="mt-10 font-script text-6xl leading-tight text-rose-deep sm:text-8xl">
            Mempelai
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-brown">
            Dua hati yang dipertemukan untuk melangkah bersama
            dalam sebuah perjalanan baru.
          </p>

          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
          </div>
        </div>
      </Reveal>

      {/* Bride di atas, Groom di bawah */}
      <div className="mx-auto mt-10 flex w-full max-w-xl flex-col gap-8 sm:mt-12 sm:gap-10">
        <PersonCard
          person={WEDDING.bride}
          isBride={true}
          image="/images/woman.png"
          delay={0.15}
        />

        <PersonCard
          person={WEDDING.groom}
          isBride={false}
          image="/images/man.png"
          delay={0.3}
        />
      </div>
    </Section>
  );
}
