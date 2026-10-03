"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="inline-flex items-center gap-2 rounded-full border border-rose px-4 py-2 text-sm text-rose-deep transition hover:bg-blush"
    >
      <LogOut size={16} aria-hidden />
      Keluar
    </button>
  );
}