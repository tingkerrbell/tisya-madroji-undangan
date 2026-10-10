"use client";

import { useState } from "react";
import { Pause, Play, ChevronDown } from "lucide-react";
import type { useMusic } from "@/lib/useMusic";

type Props = ReturnType<typeof useMusic> & {
  src: string;
  visible: boolean;
};

export default function MusicPlayer({
  src,
  visible,
  audioProps,
  playing,
  available,
  toggle,
}: Props) {
  const [compact, setCompact] = useState(false);

  if (!visible || !available) {
    return <audio src={src} {...audioProps} />;
  }

  return (
    <>
      <audio src={src} {...audioProps} />

      <div className="fixed bottom-5 right-5 z-40">
        {compact ? (
          /* Mode kaset bulat */
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCompact(false)}
              aria-label="Tampilkan detail lagu"
              className={`relative flex h-14 w-14 items-center justify-center rounded-full border border-rose/30 bg-gradient-to-br from-rose-deep via-rose to-blush shadow-xl shadow-rose/25 transition hover:scale-105 ${
                playing ? "animate-spin [animation-duration:4s]" : ""
              }`}
            >
              <span className="absolute inset-1.5 rounded-full border border-white/25" />
              <span className="absolute inset-3 rounded-full border border-white/20" />
              <span className="h-3 w-3 rounded-full bg-ivory shadow-inner" />
            </button>

            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Jeda musik" : "Putar musik"}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-rose-deep shadow-md transition hover:bg-rose/10 active:scale-90"
            >
              {playing ? (
                <Pause size={15} fill="currentColor" />
              ) : (
                <Play size={15} fill="currentColor" />
              )}
            </button>
          </div>
        ) : (
          /* Mode detail lagu */
          <div className="flex items-center gap-3 rounded-full border border-rose/30 bg-ivory/95 px-3 py-2 shadow-xl shadow-rose/20 backdrop-blur-md">
            <div
              className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-rose-deep via-rose to-blush shadow-inner ${
                playing ? "animate-spin [animation-duration:4s]" : ""
              }`}
            >
              <span className="absolute inset-1.5 rounded-full border border-white/25" />
              <span className="absolute inset-3 rounded-full border border-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-ivory" />
            </div>

            <div className="min-w-0 max-w-[150px]">
              <p className="truncate font-serif text-sm font-medium text-brown">
                Lagu Pernikahan Kita
              </p>
              <p className="truncate text-[11px] text-brown/60">
                Tiara Andini &amp; Arsy Widianto
              </p>
            </div>

            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Jeda musik" : "Putar musik"}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose text-white transition hover:bg-rose-deep active:scale-90"
            >
              {playing ? (
                <Pause size={15} fill="currentColor" />
              ) : (
                <Play size={15} fill="currentColor" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setCompact(true)}
              aria-label="Kecilkan menjadi kaset"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-rose-deep transition hover:bg-rose/10"
            >
              <ChevronDown size={17} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
