"use client";
import Divider from "@/components/ui/divider";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { WEDDING } from "@/lib/wedding-data";
import { motion } from "framer-motion";
import Floral from "@/components/ui/floral";
export default function Quote() {
  return (
    
    <Section id="bg-quote" className="bg-quote">
      

{/* Satu ornamen bunga */}
<motion.div
  className="pointer-events-none absolute inset-x-0 top-[290px] z-[1] mx-auto h-64 w-full max-w-[900px] px-2 sm:top-[310px] sm:h-80 sm:px-6"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 1.2,
    ease: [0.22, 1, 0.36, 1],
  }}
>
  <motion.div
    className="relative h-full w-full"
    animate={{ y: [0, -3, 0] }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Floral
      src="/images/floral/up.png"
      className="h-full w-full"
    />
  </motion.div>
</motion.div>

      <Reveal>
        <Divider className="mb-10" />
        <blockquote className="font-serif text-xl leading-relaxed sm:text-2xl">
          &ldquo;{WEDDING.quote.text}&rdquo;
        </blockquote>
        <p className="mt-6 font-skuy text-sm tracking-widest text-brown font-bold">
          ( {WEDDING.quote.source} )
        </p>
        <Divider className="mt-10" />
      </Reveal>
    </Section>
  );
}