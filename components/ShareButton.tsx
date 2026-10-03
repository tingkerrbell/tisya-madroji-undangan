"use client";

import { Share2 } from "lucide-react";
import { WEDDING } from "@/lib/wedding-data";

export default function ShareButton() {
  function share() {
    // Link tanpa ?to=, jadi penerima melihat undangan umum (atau Anda tambahkan ?to=Nama sendiri)
    const url = `${window.location.origin}/${WEDDING.slug}`;

    const text = [
      "Assalamu'alaikum,",
      "",
      "Dengan penuh kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.",
      "",
      `${WEDDING.bride.fullName} & ${WEDDING.groom.fullName}`,
      WEDDING.dateLabel,
      "",
      "Untuk detail undangan:",
      url,
      "",
      "Terima kasih atas doa dan kehadirannya.",
    ].join("\n");

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3 text-sm tracking-wider text-white shadow-md shadow-rose/30 transition hover:bg-rose-deep active:scale-95"
    >
      <Share2 size={16} aria-hidden />
      Bagikan Undangan
    </button>
  );
}