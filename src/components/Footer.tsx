"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-alabaster text-espresso pt-20 pb-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-borderdelicate/80">
          {/* Brand & Contact */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
            <div className="flex items-center gap-3.5 mb-6">
              <Image
                alt="Mesh 'E' Decor Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuARGm52ZF7BWYXD9c6FiJE5vBCTJN7PR01sq7x8kT2IBg62f4F_lQIaoBVtM2ZYrEO8fCb-0gnKxrg5SW21Hn5npEnqZW0OOOcaPqRFwXzvjabfKpZMJIV49olqvHEiTfVOcbJ9V15Rl0SwNiYxqvaw7NBRNqXrAfawEG652e63VYBAN10eq3uRCfneWg7rD-B2X_533uYCqwPIJfFOgTux0VGiJG7lNfiLllf-Mgytr2mw3G7giQk9"
                width={32}
                height={32}
                unoptimized
              />
              <span className="serif-display text-xl tracking-[0.16em] uppercase font-normal">
                Mesh ‘E’ Decor
              </span>
            </div>
            <p className="text-[13px] text-subdued font-light leading-relaxed max-w-sm mb-8">
              Purveyors of handcrafted brassware, fine silver-plated artefacts, and
              sacred sanctum centerpieces for residences of distinction and high
              corporate estates.
            </p>
            <div className="flex flex-col gap-2 text-[12px] text-subdued font-light">
              <div>
                Atelier:{" "}
                <a
                  href="tel:+917042005637"
                  className="text-espresso font-medium hover:text-golddeep transition-colors"
                >
                  +91 70420 05637
                </a>
              </div>
              <div>
                Direct Dispatch:{" "}
                <a
                  href="mailto:meshedecor@gmail.com"
                  className="text-espresso font-medium hover:text-golddeep transition-colors"
                >
                  meshedecor@gmail.com
                </a>
              </div>
              <div>
                Instagram:{" "}
                <span className="text-espresso font-medium">@meshedecor</span>
              </div>
            </div>
          </div>

          {/* Curated Links */}
          <div className="lg:col-span-2 flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.28em] text-golddeep font-medium mb-5">
              Collections
            </span>
            <nav className="flex flex-col gap-3 text-[13px] text-subdued font-light">
              <Link href="#collection" className="hover:text-espresso transition-colors">
                Silver Plated Ware
              </Link>
              <Link href="#collection" className="hover:text-espresso transition-colors">
                Artisanal Brassware
              </Link>
              <Link href="#collection" className="hover:text-espresso transition-colors">
                Sanctum Diyas &amp; Urulis
              </Link>
              <Link href="#collection" className="hover:text-espresso transition-colors">
                Host &amp; Bar Accents
              </Link>
              <Link href="#collection" className="hover:text-espresso transition-colors">
                Full 2026 Index
              </Link>
            </nav>
          </div>

          {/* Bespoke Commissions */}
          <div className="lg:col-span-2 flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.28em] text-golddeep font-medium mb-5">
              Atelier Services
            </span>
            <nav className="flex flex-col gap-3 text-[13px] text-subdued font-light">
              <Link href="#corporate" className="hover:text-espresso transition-colors">
                Corporate Gifting
              </Link>
              <Link href="#corporate" className="hover:text-espresso transition-colors">
                Laser Monogramming
              </Link>
              <Link href="#corporate" className="hover:text-espresso transition-colors">
                Custom Velvet Trunks
              </Link>
              <Link href="#craft" className="hover:text-espresso transition-colors">
                Architectural Specifiers
              </Link>
              <Link href="#corporate" className="hover:text-espresso transition-colors">
                Wholesale Dossier
              </Link>
            </nav>
          </div>

          {/* Private Inquiry Dispatch */}
          <div className="lg:col-span-3 flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.28em] text-golddeep font-medium mb-5">
              Private Gazette
            </span>
            <p className="text-[13px] text-subdued font-light mb-4 leading-relaxed">
              Receive private releases and archival collection additions.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                className="w-full bg-transparent border border-borderdelicate px-4 py-2.5 text-[12px] text-espresso placeholder:text-mute focus:outline-none focus:border-espresso transition-colors"
                placeholder="Institutional email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="w-full py-2.5 bg-espresso text-alabaster hover:bg-[#2A2622] text-[10px] uppercase tracking-[0.24em] font-medium transition-colors cursor-pointer"
                type="submit"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-golddeep mt-2 tracking-wider">
                ✓ Thank you. You are subscribed to our Private Gazette.
              </p>
            )}
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-mute uppercase tracking-[0.2em] font-light">
          <span>© 2026 Mesh ‘E’ Decor LLP. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-espresso transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-espresso transition-colors">
              Bespoke Terms
            </Link>
            <Link href="#" className="hover:text-espresso transition-colors">
              Hallmarking Credentials
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
