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
    <footer className="w-full bg-alabaster text-espresso pt-16 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-12 sm:pb-16 border-b border-borderdelicate/80">
          {/* Brand & Contact */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
            <div className="flex items-center gap-3.5 mb-5 sm:mb-6">
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
            <p className="text-[13px] text-subdued font-light leading-relaxed max-w-sm mb-6 sm:mb-8">
              Purveyors of handcrafted brassware, fine silver-plated artefacts, and
              sacred sanctum centerpieces for residences of distinction and high
              corporate estates.
            </p>
            <div className="flex flex-col gap-2.5 text-[12px] text-subdued font-light">
              <div>
                Atelier:{" "}
                <a
                  href="tel:+917042005637"
                  className="text-espresso font-medium hover:text-golddeep transition-colors py-1 inline-block"
                >
                  +91 70420 05637
                </a>
              </div>
              <div>
                Direct Dispatch:{" "}
                <a
                  href="mailto:meshedecor@gmail.com"
                  className="text-espresso font-medium hover:text-golddeep transition-colors py-1 inline-block"
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
            <span className="text-[10px] uppercase tracking-[0.28em] text-golddeep font-medium mb-4 sm:mb-5">
              Collections
            </span>
            <nav className="flex flex-col gap-3 text-[13px] text-subdued font-light">
              <Link href="#collection" className="hover:text-espresso transition-colors py-1">
                Silver Plated Ware
              </Link>
              <Link href="#collection" className="hover:text-espresso transition-colors py-1">
                Artisanal Brassware
              </Link>
              <Link href="#collection" className="hover:text-espresso transition-colors py-1">
                Sanctum Diyas &amp; Urulis
              </Link>
              <Link href="#collection" className="hover:text-espresso transition-colors py-1">
                Host &amp; Bar Accents
              </Link>
              <Link href="#collection" className="hover:text-espresso transition-colors py-1">
                Full 2026 Index
              </Link>
            </nav>
          </div>

          {/* Bespoke Commissions */}
          <div className="lg:col-span-2 flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.28em] text-golddeep font-medium mb-4 sm:mb-5">
              Atelier Services
            </span>
            <nav className="flex flex-col gap-3 text-[13px] text-subdued font-light">
              <Link href="#corporate" className="hover:text-espresso transition-colors py-1">
                Corporate Gifting
              </Link>
              <Link href="#corporate" className="hover:text-espresso transition-colors py-1">
                Laser Monogramming
              </Link>
              <Link href="#corporate" className="hover:text-espresso transition-colors py-1">
                Custom Velvet Trunks
              </Link>
              <Link href="#craft" className="hover:text-espresso transition-colors py-1">
                Architectural Specifiers
              </Link>
              <Link href="#corporate" className="hover:text-espresso transition-colors py-1">
                Wholesale Dossier
              </Link>
            </nav>
          </div>

          {/* Private Inquiry Dispatch */}
          <div className="lg:col-span-3 flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.28em] text-golddeep font-medium mb-4 sm:mb-5">
              Private Gazette
            </span>
            <p className="text-[13px] text-subdued font-light mb-4 leading-relaxed">
              Receive private releases and archival collection additions.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
              <input
                className="w-full bg-transparent border border-borderdelicate px-4 py-3 min-h-[44px] text-[12px] text-espresso placeholder:text-mute focus:outline-none focus:border-espresso transition-colors"
                placeholder="Institutional email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="w-full py-3 min-h-[44px] bg-espresso text-alabaster hover:bg-[#2A2622] text-[10px] uppercase tracking-[0.24em] font-medium transition-colors cursor-pointer flex items-center justify-center"
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] text-mute uppercase tracking-[0.18em] sm:tracking-[0.2em] font-light text-center sm:text-left">
          <span>© 2026 Mesh ‘E’ Decor LLP. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="#" className="hover:text-espresso transition-colors py-1">
              Privacy
            </Link>
            <Link href="#" className="hover:text-espresso transition-colors py-1">
              Bespoke Terms
            </Link>
            <Link href="#" className="hover:text-espresso transition-colors py-1">
              Hallmarking Credentials
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
