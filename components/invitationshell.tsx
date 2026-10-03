"use client";

import { Suspense, useEffect, useState } from "react";
import Opening from "@/components/opening"; // samakan huruf besar/kecil dengan nama file Anda
import MusicPlayer from "@/components/MusicPlayer";
import { useMusic } from "@/lib/useMusic";
import { WEDDING } from "@/lib/wedding-data";
import Parallax from "@/components/ui/parallax";

/**
 * Konten undangan selalu ada di HTML (bagus untuk SEO dan preview),
 * sementara cover menutupinya sampai tombol "Buka Undangan" ditekan.
 */
export default function InvitationShell({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false);
  const music = useMusic();

  // Kunci scroll selama cover masih tampil
  useEffect(() => {
    document.body.style.overflow = gone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gone]);

  const handleOpen = () => {
    setOpened(true);
    window.scrollTo(0, 0);
    void music.play(); // boleh diputar karena ini hasil klik pengguna
  };

  return (
    <>
      {children}
      {!gone && (
        <Suspense fallback={<div className="paper fixed inset-0 z-50" />}>
          <Opening opened={opened} onOpen={handleOpen} onExited={() => setGone(true)} />
        </Suspense>
      )}
      <MusicPlayer src={WEDDING.music} visible={opened} {...music} />
    </>
  );
}