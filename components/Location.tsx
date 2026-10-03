import { ExternalLink, MapPin } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { WEDDING } from "@/lib/wedding-data";

export default function Location() {
  const query = encodeURIComponent(WEDDING.address.join(", "));

  // Tanpa API key: peta ditampilkan dari pencarian alamat
  const embedSrc =
    WEDDING.mapsEmbedUrl ||
    `https://maps.google.com/maps?q=${query}&output=embed`;

  const openUrl =
    WEDDING.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
  <Section id="lokasi" className="!pt-1">
      {/* =========================
          JUDUL LOKASI
         ========================= */}
      <Reveal>
        <MapPin
          className="mx-auto text-rose-deep"
          size={24}
          aria-hidden
        />

        <h2 className="mt-3 font-serif text-sm uppercase tracking-[0.35em] text-brown">
          Lokasi Acara
        </h2>
      </Reveal>

      {/* =========================
          GOOGLE MAPS
         ========================= */}
      <Reveal delay={0.15} className="mt-8">
        <div className="overflow-hidden rounded-2xl border border-rose/40 shadow-sm">
          <iframe
            src={embedSrc}
            title="Peta lokasi acara pernikahan"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] w-full"
          />
        </div>

        {/* Tombol Google Maps */}
        <a
          href={openUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3 text-sm tracking-wider text-white shadow-md shadow-rose/30 transition hover:bg-rose-deep active:scale-95"
        >
          <ExternalLink size={16} aria-hidden />
          Buka Google Maps
        </a>
      </Reveal>
    </Section>
  );
}