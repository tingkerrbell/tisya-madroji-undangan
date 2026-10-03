"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Gagal masuk.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Koneksi bermasalah. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-rose/40 bg-ivory/90 px-6 py-8 text-center shadow-sm"
      >
        <Lock className="mx-auto text-rose-deep" size={24} aria-hidden />
        <h1 className="mt-3 font-script text-4xl">Admin</h1>

        <label htmlFor="admin-password" className="mt-6 block text-left text-sm text-brown">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-xl border border-rose/40 bg-ivory px-4 py-3 text-sm outline-none focus:border-rose-deep focus:ring-2 focus:ring-rose/30"
        />
        {error && <p className="mt-2 text-left text-xs text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-rose px-7 py-3 text-sm tracking-wider text-white transition hover:bg-rose-deep disabled:opacity-60"
        >
          {loading && <Loader2 size={16} className="animate-spin" aria-hidden />}
          Masuk
        </button>
      </form>
    </main>
  );
}