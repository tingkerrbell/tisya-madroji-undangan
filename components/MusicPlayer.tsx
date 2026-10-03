"use client";

import { Pause, Play } from "lucide-react";
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
  if (!visible || !available) {
    return <audio src={src} {...audioProps} />;
  }

  return (
    <>
      <audio src={src} {...audioProps} />

      <div
        className="
          fixed bottom-5 right-5 z-40
          flex items-center gap-3
          rounded-full
          border border-rose/30
          bg-ivory/95
          px-3 py-2
          shadow-xl shadow-rose/20
          backdrop-blur-md
          transition-all duration-300
        "
      >
        {/* Disc */}
        <div
          className={`
            relative flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-full
            border border-rose/30
            bg-gradient-to-br from-rose-deep via-rose to-blush
            shadow-inner
            ${playing ? "animate-spin [animation-duration:4s]" : ""}
          `}
        >
          {/* Disc grooves */}
          <div className="absolute inset-1 rounded-full border border-white/20" />
          <div className="absolute inset-2 rounded-full border border-white/15" />

          {/* Center */}
          <div className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-ivory">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-deep" />
          </div>
        </div>

        {/* Song info */}
        <div className="min-w-0 max-w-[150px]">
          <p className="truncate font-serif text-sm font-medium text-brown">
            Beautiful in White
          </p>

          <p className="truncate text-[11px] text-brown/60">
            Shane Filan
          </p>
        </div>

        {/* Play / pause */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Jeda musik" : "Putar musik"}
          className="
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-full
            bg-rose
            text-white
            shadow-md shadow-rose/25
            transition
            hover:bg-rose-deep
            active:scale-90
          "
        >
          {playing ? (
            <Pause size={15} fill="currentColor" aria-hidden />
          ) : (
            <Play size={15} fill="currentColor" aria-hidden />
          )}
        </button>
      </div>
    </>
  );
}