import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Section({ id, className, children }: Props) {
  return (
    <section id={id} className={cn("relative px-6 py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-xl text-center">{children}</div>
    </section>
  );
}