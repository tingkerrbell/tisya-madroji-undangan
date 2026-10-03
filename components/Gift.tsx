"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Copy, Gift as GiftIcon, QrCode } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { WEDDING } from "@/lib/wedding-data";

const isPlaceholder = (value: string) => value.startsWith("TODO");

export default function Gift() {
  const [copied, setCopied] = useState<string | null>(null);
  const [qrisFailed, setQrisFailed] = useState(false);

  async function copy(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard diblokir browser: pengguna masih bisa menyalin manual
    }
  }

  return (
    <Section id="hadiah">
      <Reveal>
        <GiftIcon className="mx-auto text-rose-deep" size={24} aria-hidden />
        <h2 className="mt-3 font-serif text-sm uppercase tracking-[0.35em] text-brown">Kirim Hadiah</h2>
        <p className="mx-auto mt-4 max-w-sm text-sm text-brown">
          Doa restu Anda sudah menjadi hadiah terindah. Namun jika ingin berbagi kebahagiaan, Anda dapat
          mengirimkannya melalui:
        </p>
        <p className="mt-4 font-serif text-lg">Penerima: Tisya Azzahra / Madroji</p>
      </Reveal>

      <div className="mt-8 space-y-4">
        {WEDDING.gift.accounts.map((acc, i) => {
          const id = `acc-${i}`;
          const ready = !isPlaceholder(acc.number);
          return (
            <Reveal key={id} delay={i * 0.1}>
              <div className="rounded-2xl border border-rose/40 bg-paper/70 px-6 py-6">
                <p className="text-xs uppercase tracking-widest text-brown">{acc.bank}</p>
                <p className="mt-2 font-serif text-2xl tracking-wider tabular-nums">{acc.number}</p>
                <p className="mt-1 text-sm text-brown">a.n. {acc.name}</p>

                <button
                  type="button"
                  disabled={!ready}
                  onClick={() => copy(acc.number, id)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-rose px-5 py-2 text-sm text-rose-deep transition hover:bg-blush disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {copied === id ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
                  {copied === id ? "Tersalin" : "Salin Rekening"}
                </button>
              </div>
            </Reveal>
          );
        })}

        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-rose/40 bg-paper/70 px-6 py-6">
            <p className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-brown">
              <QrCode size={14} aria-hidden /> QRIS
            </p>
            <div className="relative mx-auto mt-4 aspect-square w-56 overflow-hidden rounded-xl bg-ivory">
              {qrisFailed ? (
                <span className="flex h-full items-center justify-center px-4 text-sm text-brown">
                  QRIS belum tersedia
                </span>
              ) : (
                <Image
                  src={WEDDING.gift.qris}
                  alt="Kode QRIS"
                  fill
                  sizes="224px"
                  className="object-contain"
                  onError={() => setQrisFailed(true)}
                />
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}