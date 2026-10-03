import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Tisya & Madroji",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="paper min-h-screen">{children}</div>;
}