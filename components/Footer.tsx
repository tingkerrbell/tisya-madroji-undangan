import ShareButton from "@/components/ShareButton";
import Reveal from "@/components/ui/reveal";
import { WEDDING } from "@/lib/wedding-data";

export default function Footer() {
  return (
    <footer className="paper relative px-6 pb-28 pt-20 text-center">
      <Reveal>
        <h2 className="font-script text-6xl">
          {WEDDING.bride.shortName} &amp; {WEDDING.groom.shortName}
        </h2>
        <p className="mt-4 font-serif text-lg tracking-[0.25em]">8 November 2026</p>
        <p className="mx-auto mt-6 max-w-xs text-sm text-brown">
          Terima kasih atas doa dan kehadiran Anda.
        </p>
        <div className="mt-8">
          <ShareButton />
        </div>
      </Reveal>
    </footer>
  );
}