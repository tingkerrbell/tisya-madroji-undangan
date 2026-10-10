
"use client";

import { useState } from "react";
import {
  House,
  Timer,
  BookOpen,
  Heart,
  CalendarDays,
  MapPin,
  MessageCircleHeart,
  ClipboardCheck,
  
} from "lucide-react";
const navItems = [
  { id: "hero", icon: House, label: "Home" },
  { id: "bg-couple", icon: Heart, label: "Mempelai" },
  { id: "bg-event", icon: CalendarDays, label: "Acara" },
  { id: "bg-location", icon: MapPin, label: "Lokasi" },
  { id: "rsvp", icon: ClipboardCheck, label: "Kehadiran" },
  { id: "bg-wishes", icon: MessageCircleHeart, label: "Ucapan dan Doa" },
];

export default function Navigation() {
  const [active, setActive] = useState("hero");

  const handleNavigation = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      aria-label="Navigasi undangan"
      className="fixed right-3 top-1/2 z-50 -translate-y-1/2"
    >
      <div className="flex flex-col items-center gap-2 rounded-full border border-[#d8c6b6]/70 bg-[#fbf7f0]/90 px-2 py-3 shadow-lg backdrop-blur-md">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            aria-label={label}
            title={label}
            onClick={() => handleNavigation(id)}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
              active === id
                ? "bg-[#d49a98] text-white shadow-sm"
                : "text-[#8a6a5a] hover:bg-[#f2d9d6] hover:text-[#b97876]"
            }`}
          >
            <Icon size={17} strokeWidth={1.7} />
          </button>
        ))}
      </div>
    </nav>
  );
}

