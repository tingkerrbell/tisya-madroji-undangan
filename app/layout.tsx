// app/layout.tsx
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond, Jost, Noto_Serif} from "next/font/google";
import { WEDDING } from "@/lib/wedding-data";
import "./globals.css";

const pinyon = localFont({
  src: "../font/PinyonScript-Regular.ttf",
  variable: "--font-pinyon",
  display: "swap",
  weight: "400",
});

const beau = localFont({
  src: "../font/BeauRivage-Regular.ttf",
  variable: "--font-beau",
  display: "swap",
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const noto_serif = Noto_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: WEDDING.title,
  description: WEDDING.description,
  // Open Graph lengkap (gambar og dibuat di Phase 6)
  openGraph: {
    title: WEDDING.title,
    description: WEDDING.description,
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f4ee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${pinyon.variable} ${beau.variable} ${cormorant.variable} ${jost.variable} ${noto_serif.variable}`}>

      <body>{children}</body>
    </html>
  );
}