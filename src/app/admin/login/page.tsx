"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Invalid atelier passcode. Please try again.");
      }
    } catch {
      setError("Network or server connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-alabaster text-espresso flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden font-light">
      {/* Background radial gold glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none rounded-full blur-3xl opacity-35 z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(213, 184, 144, 0.45) 0%, rgba(250, 247, 242, 0) 70%)",
        }}
      />

      <div className="w-full max-w-md bg-canvas border border-borderdelicate/90 p-8 sm:p-10 relative z-10 shadow-[0_20px_50px_-20px_rgba(22,20,18,0.12)]">
        {/* Atelier Brandmark */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <Image
              alt="Mesh 'E' Decor Brandmark"
              className="h-10 w-auto object-contain mx-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpqcGZ0BeH_fqgXUIEgQatWQTbaOWDHb5pQAYuFeAhW6-gZlEzfRkO1G8yjEw3HYRnAfS90zEz6gW4kGljiX8xHJFjPOeaV5atYaQEdHrQCbDmoS1COfeyrNcALBpTiK1Ufv0DTY1dNd2X1CxxcJheAgmzGoW3LEA79f22kOUt7KUckcK1QzwuhHlvbXrUr7TPMLQFYbDEbY1b55MwJ-doRzDxPeXmhXZy9VrVUPFADPQ9xNCdhWD6"
              width={40}
              height={40}
              unoptimized
            />
          </Link>
          <span className="text-[10px] uppercase tracking-[0.3em] text-golddeep font-semibold block mb-1">
            Atelier Management
          </span>
          <h1 className="serif-display text-2xl sm:text-3xl text-espresso font-normal">
            Curator Access
          </h1>
          <p className="text-[12px] text-mute font-light mt-1 max-w-xs">
            Enter the atelier master passcode to manage product specimens, pricing, and collections.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 bg-red-50/80 border border-red-200 text-red-800 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] shrink-0 text-red-600">
              error
            </span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-mute mb-2 font-medium">
              Master Passcode
            </label>
            <div className="relative">
              <input
                type={showPasscode ? "text" : "password"}
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. meshedecor2026)"
                className="w-full bg-surface border border-borderdelicate p-3.5 pr-11 text-xs text-espresso focus:outline-none focus:border-espresso transition-colors font-mono tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mute hover:text-espresso p-1 cursor-pointer flex items-center justify-center"
                aria-label={showPasscode ? "Hide passcode" : "Show passcode"}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPasscode ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
            <p className="text-[10px] text-mute mt-1.5">
              Default passcode configured in your environment: <code className="bg-canvas px-1 py-0.5 border border-borderdelicate">meshedecor2026</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 min-h-[48px] bg-espresso text-alabaster hover:bg-golddeep text-[11px] uppercase tracking-[0.24em] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] animate-spin">
                  progress_activity
                </span>
                <span>Authenticating...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">lock_open</span>
                <span>Unlock Curator Dashboard</span>
              </span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-borderdelicate/80 text-center">
          <Link
            href="/"
            className="text-[11px] uppercase tracking-[0.2em] text-mute hover:text-espresso transition-colors inline-flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[15px]">arrow_back</span>
            <span>Return to Boutique</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
