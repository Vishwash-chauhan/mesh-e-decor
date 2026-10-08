"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  onOpenConcierge?: () => void;
}

export default function Hero({ onOpenConcierge }: HeroProps) {
  return (
    <section className="relative w-full bg-alabaster border-b border-borderdelicate/80 overflow-hidden py-8 sm:py-16 lg:py-24">
      {/* Background Hairline Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="max-w-7xl mx-auto h-full border-x border-borderdelicate/50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        {/* ========================================================= */}
        {/* MOBILE HERO DESIGN (Clean, Editorial & Visual First)     */}
        {/* ========================================================= */}
        <div className="lg:hidden flex flex-col items-center text-center">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-goldaccent/30 rounded-full mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-golddeep"></span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-golddeep font-medium">
              Vol. IV Master Edition • 2026
            </span>
          </div>

          {/* Headline */}
          <h1 className="serif-display text-3xl sm:text-4xl text-espresso font-normal leading-[1.12] tracking-tight mb-3">
            Mesmerising Metallics.{" "}
            <span className="italic font-light text-golddeep block sm:inline">
              Dipped in Sterling.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[13px] text-subdued leading-relaxed max-w-sm mb-5 font-normal">
            Hand-sculpted virgin brass bound in luminous sterling silver immersion — crafted for luxury residences &amp; fine decor collectors.
          </p>

          {/* Hero Artwork Showcase Card */}
          <div className="w-full max-w-sm my-2 relative">
            <div
              className="absolute -inset-4 pointer-events-none rounded-full blur-2xl opacity-50 z-0"
              style={{
                background:
                  "radial-gradient(circle, rgba(213, 184, 144, 0.4) 0%, rgba(250, 247, 242, 0) 75%)",
              }}
            ></div>

            <div className="relative p-2.5 bg-canvas border border-borderdelicate shadow-[0_15px_35px_-15px_rgba(22,20,18,0.15)] z-10">
              <div className="relative aspect-[4/5] overflow-hidden bg-espresso">
                <Image
                  alt="The Imperial Stallion Statuette Catalogue 2026"
                  className="w-full h-full object-cover object-center"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY4D1MJ5qd2TW8kKY3g023RgzN3o7jc-1yQIJISyAQItsIRa2XPJcoPp2JBzIVHTuvmPwDODW5EjLfnKkgdkhj_F3NZ1RqnJXBS3ufwC8XfoNdZJI0sEg2g-Zmd5PZiTzS2jAxK3aVCCN5IXiYe3KNcjmmZY1H9Xg3PkIo_deWUbBjaiF1GxnHknWfMO7jD3cLTxJSCwbXo6Tcn-DSdjkkVAMBY4SSurDrdaLG7cJ1nnSiiIfqmWCC"
                  fill
                  unoptimized
                  priority
                />

                {/* Overlaid Badge */}
                <div className="absolute top-3 left-3 bg-espresso/90 backdrop-blur-md px-2.5 py-1 border border-goldaccent/40 text-[8px] uppercase tracking-[0.2em] text-goldaccent font-medium">
                  Frontispiece • Plate 01
                </div>

                {/* Overlaid Bottom Title */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-espresso/95 via-espresso/50 to-transparent p-4 text-left text-alabaster">
                  <h3 className="serif-display text-xl font-normal italic">
                    The Imperial Stallion
                  </h3>
                  <p className="text-[10px] text-mute font-light mt-0.5">
                    Solid cast brass core with triple sterling immersion
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-2.5 w-full max-w-sm mt-6">
            <Link
              href="#collection"
              className="w-full inline-flex items-center justify-center min-h-[48px] px-6 bg-espresso text-alabaster text-[11px] uppercase tracking-[0.22em] font-medium transition-all shadow-sm active:scale-[0.99]"
            >
              Explore 2026 Collection
            </Link>
            <button
              onClick={onOpenConcierge}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-subdued hover:text-espresso font-medium cursor-pointer"
            >
              <span>Request Bespoke Inquiry</span>
              <span className="material-symbols-outlined text-[15px]">
                arrow_forward
              </span>
            </button>
          </div>

          {/* Minimal Credentials Strip */}
          <div className="mt-6 pt-4 border-t border-borderdelicate/80 w-full max-w-sm flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.2em] text-mute">
            <span>Virgin Brass Core</span>
            <span>•</span>
            <span>Sterling Bath</span>
            <span>•</span>
            <span>New Delhi Atelier</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP HERO DESIGN (Spacious Editorial Layout)           */}
        {/* ========================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-16 items-center">
          {/* Narrative Left Column */}
          <div className="col-span-6 flex flex-col items-start pr-6">
            <div className="inline-flex items-center gap-3 pb-3 mb-4 border-b border-goldaccent/40">
              <span className="text-[10px] uppercase tracking-[0.32em] text-golddeep font-medium">
                Vol. IV Master Edition • 2026
              </span>
            </div>

            <h1 className="serif-display text-[72px] leading-[1.06] text-espresso font-normal tracking-[-0.01em] mb-6">
              Mesmerising Metallics.{" "}
              <span className="italic font-light text-golddeep">
                Dipped in Sterling,
              </span>{" "}
              Cast in Brass.
            </h1>

            <p className="text-[16px] leading-[1.8] text-subdued max-w-lg mb-10 font-normal">
              A mesmerizing alchemy where hand-sculpted virgin brass meets
              luminous silver bath plating — an enchanting chapter within our
              broader world of haute interior objets, mother-of-pearl lapidary,
              and ceremonial sanctuaries.
            </p>

            <div className="flex items-center gap-5 w-auto mb-12">
              <Link
                href="#collection"
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3.5 bg-espresso text-alabaster hover:bg-[#2A2622] text-[11px] uppercase tracking-[0.24em] font-medium transition-all duration-300 shadow-sm cursor-pointer"
              >
                Explore 2026 Edition
              </Link>
              <button
                onClick={onOpenConcierge}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 text-[11px] uppercase tracking-[0.22em] text-subdued hover:text-espresso transition-colors font-medium cursor-pointer"
              >
                <span>Request Bespoke Inquiry</span>
                <span className="material-symbols-outlined text-[16px] font-light">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Archival Metadata strip */}
            <div className="pt-8 border-t border-borderdelicate/80 grid grid-cols-3 gap-8 w-full max-w-lg text-[11px]">
              <div>
                <span className="block text-mute uppercase tracking-[0.2em] mb-1">
                  Foundry Base
                </span>
                <span className="serif-display text-lg text-espresso font-normal">
                  Virgin Brass Core
                </span>
              </div>
              <div>
                <span className="block text-mute uppercase tracking-[0.2em] mb-1">
                  Radiance
                </span>
                <span className="serif-display text-lg text-espresso font-normal">
                  Sterling Immersion
                </span>
              </div>
              <div>
                <span className="block text-mute uppercase tracking-[0.2em] mb-1">
                  Atelier Scope
                </span>
                <span className="serif-display text-lg text-espresso font-normal">
                  Diverse Curations
                </span>
              </div>
            </div>
          </div>

          {/* Hero Artwork Showcase Right Column */}
          <div className="col-span-6 relative">
            <div className="relative mx-auto">
              <div
                className="absolute -inset-10 pointer-events-none rounded-full blur-3xl opacity-60 z-0"
                style={{
                  background:
                    "radial-gradient(circle, rgba(213, 184, 144, 0.35) 0%, rgba(250, 247, 242, 0) 70%)",
                }}
              ></div>

              {/* Architectural hairline frame */}
              <div className="p-5 bg-canvas border border-borderdelicate/90 shadow-[0_20px_50px_-20px_rgba(22,20,18,0.12)]">
                <div className="relative aspect-[3/4] overflow-hidden bg-espresso">
                  <Image
                    alt="The Imperial Stallion Statuette Catalogue 2026"
                    className="w-full h-full object-cover object-center grayscale-[15%] hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY4D1MJ5qd2TW8kKY3g023RgzN3o7jc-1yQIJISyAQItsIRa2XPJcoPp2JBzIVHTuvmPwDODW5EjLfnKkgdkhj_F3NZ1RqnJXBS3ufwC8XfoNdZJI0sEg2g-Zmd5PZiTzS2jAxK3aVCCN5IXiYe3KNcjmmZY1H9Xg3PkIo_deWUbBjaiF1GxnHknWfMO7jD3cLTxJSCwbXo6Tcn-DSdjkkVAMBY4SSurDrdaLG7cJ1nnSiiIfqmWCC"
                    fill
                    unoptimized
                    priority
                  />
                  {/* Understated Image Caption */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-espresso/90 via-espresso/40 to-transparent p-6 text-alabaster flex justify-between items-end">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.3em] text-goldaccent block mb-1">
                        Frontispiece • Plate 01
                      </span>
                      <h3 className="serif-display text-2xl font-normal italic tracking-wide">
                        The Imperial Stallion
                      </h3>
                      <p className="text-[12px] text-mute font-light mt-0.5">
                        Dual-toned solid cast brass with triple-plated sterling immersion
                      </p>
                    </div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-alabaster/70 border-b border-goldaccent/60 pb-0.5">
                      2026 Archive
                    </span>
                  </div>
                </div>
              </div>

              {/* Offset Subtle Seal */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full border border-goldaccent/50 bg-alabaster/95 backdrop-blur-sm flex items-center justify-center p-2 text-center shadow-sm pointer-events-none">
                <span className="text-[8px] uppercase tracking-[0.2em] text-golddeep font-medium leading-tight">
                  Master Atelier Specimen
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
