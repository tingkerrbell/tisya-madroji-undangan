import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Countdown from "@/components/Countdown";
import Couple from "@/components/couple";
import Event from "@/components/event";
import Families from "@/components/Families";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Gift from "@/components/Gift";
import Hero from "@/components/Hero";
import InvitationShell from "@/components/invitationshell";
import Location from "@/components/Location";
import Quote from "@/components/Quote";
import RSVP from "@/components/RSVP";
import Wishes from "@/components/Wishes";
import { WEDDING } from "@/lib/wedding-data";
import LoveStory from "@/components/sections/LoveStory";
import PetalFall from "@/components/ui/petal-fall";
import Navigation from "@/components/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: WEDDING.slug }];
}

export function generateMetadata(): Metadata {
  const url = `/${WEDDING.slug}`;
  return {
    title: WEDDING.title,
    description: WEDDING.description,
    alternates: { canonical: url },
    robots: WEDDING.allowSearchIndexing
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: WEDDING.title,
      description: WEDDING.description,
      url,
      siteName: WEDDING.title,
      type: "website",
      locale: "id_ID",
      images: [{ url: WEDDING.ogImage, width: 1200, height: 630, alt: WEDDING.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: WEDDING.title,
      description: WEDDING.description,
      images: [WEDDING.ogImage],
    },
  };
}

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== WEDDING.slug) notFound();

  return (
    <InvitationShell>
      <Navigation />
       <main
        className="relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(248,242,235,0.30), rgba(248,242,235,0.30)), url('/images/hero-background.jpg')",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
          backgroundRepeat: "repeat-y",
        }}
      >
        <Hero />
        <Countdown />
        <Quote />
        <Couple />
        <Event />
        <Location />
        <RSVP />
        <Wishes />
        <Families />
      </main>
      <Footer />
      <PetalFall />
    </InvitationShell>
  );
}