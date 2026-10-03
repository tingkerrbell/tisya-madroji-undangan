import { cn } from "@/lib/utils";

/** Garis dengan titik di tengah, seperti ornamen "Akad Nikah" di undangan fisik. */
export default function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("divider-dot mx-auto max-w-[14rem]", className)} aria-hidden>
      <span />
    </div>
  );
}