"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  className?: string; // wajib berisi posisi + ukuran, mis. "absolute -left-10 top-0 h-64 w-64"
  priority?: boolean;
};

export default function Floral({ src, className, priority = false }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div className={cn("pointer-events-none select-none", className)} aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 70vw, 380px"
        priority={priority}
        className="object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}