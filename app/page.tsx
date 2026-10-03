import { redirect } from "next/navigation";
import { WEDDING } from "@/lib/wedding-data";

export default function Home() {
  redirect(`/${WEDDING.slug}`);
}