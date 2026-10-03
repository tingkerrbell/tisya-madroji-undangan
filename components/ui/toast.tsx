"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export type ToastState = { type: "success" | "error"; text: string } | null;

type Props = { toast: ToastState; onClose: () => void };

export default function Toast({ toast, onClose }: Props) {
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(onClose, 4500);
    return () => clearTimeout(id);
  }, [toast, onClose]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[70] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.text}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-xl border border-rose/40 bg-ivory px-4 py-3 text-left text-sm shadow-lg"
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-rose-deep" aria-hidden />
            ) : (
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-700" aria-hidden />
            )}
            <span>{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}