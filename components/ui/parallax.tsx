"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Props = { children: React.ReactNode; className?: string; distance?: number };

/** Menggeser elemen pelan saat halaman di-scroll. Mati otomatis jika pengguna memilih reduced motion. */
export default function Parallax({ children, className, distance = 60 }: Props) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, distance]);

  return (
    <motion.div className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}