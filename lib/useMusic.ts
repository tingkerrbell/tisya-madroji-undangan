"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Mengelola <audio>. Musik hanya diputar lewat interaksi pengguna
 * (tombol "Buka Undangan" atau tombol musik), sesuai aturan browser.
 * Jika file mp3 tidak ada, tombol musik disembunyikan dan web tetap normal.
 */
export function useMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
    } catch (err) {
      if (err instanceof DOMException && err.name === "NotSupportedError") {
        setAvailable(false); // file tidak ditemukan / format tidak didukung
      }
    }
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void play();
    else audio.pause();
  }, [play]);

  const audioProps = {
    ref: audioRef,
    loop: true,
    preload: "metadata" as const,
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
    onError: () => setAvailable(false),
  };

  return { audioProps, playing, available, play, toggle };
}