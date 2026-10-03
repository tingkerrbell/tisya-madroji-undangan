"use client";

import Image from "next/image";
import { useState } from "react";

type Props = { src: string; name: string };

/** Foto bulat dengan bingkai. Jika file belum ada, tampil inisial nama. */
export default function PhotoFrame({ src, name }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative mx-auto h-44 w-44 rounded-full border border-rose/60 p-2">
      <div className="relative h-full w-full overflow-hidden rounded-full bg-blush/60">
        {failed ? (
          <span className="flex h-full w-full items-center justify-center font-script text-6xl text-rose-deep">
            {name.charAt(0)}
          </span>
        ) : (
          <Image
            src={src}
            alt={`Foto ${name}`}
            fill
            sizes="176px"
            className="object-cover"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}