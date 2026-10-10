
"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: (i % 9) * 0.9,
  duration: 9 + (i % 5) * 2,
  size: 9 + (i % 4) * 3,
  drift: ((i * 17) % 100) - 50,
  rotate: i % 2 === 0 ? 360 : -360,
}));

export default function PetalFall() {
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[40] overflow-hidden"
    >
      {PETALS.map((petal) => (
        <motion.span
          key={petal.id}
          className="absolute -top-8 block rounded-[80%_10%_80%_10%] bg-[#D9A5A5]/70 shadow-sm"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.45,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, petal.drift, petal.drift * -0.5, petal.drift],
            rotate: [0, petal.rotate],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0,
          }}
        />
      ))}
    </div>
  );
}