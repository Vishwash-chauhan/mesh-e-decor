"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  onOpenConcierge?: () => void;
}

export default function Hero({ onOpenConcierge }: HeroProps) {
  return (
    <section className="relative w-full min-h-screen min-h-svh bg-[#110E0C] text-alabaster overflow-hidden flex flex-col justify-between border-b border-borderdelicate/30">
      {/* ========================================================= */}
      {/* 1. CINEMATIC HERO BACKGROUND IMAGE & LIGHTING OVERLAYS   */}
      {/* ========================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/hero-bg.jpg"
          alt="Handcrafted Imperial Stallion Brass Specimen"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right sm:object-[80%_center] lg:object-right select-none"
          style={{ filter: "contrast(1.03) brightness(1.01)" }}
        />

        {/* Ambient Dark Scrims for Flawless Editorial Contrast */}
        {/* Left-to-right desktop gradient: elegant soft vignette behind narrative text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#110E0C] via-[#110E0C]/80 lg:via-[#110E0C]/45 to-transparent hidden sm:block w-3/5 pointer-events-none" />

        {/* Mobile scrim: gentle dark overlay over the entire image so text shines */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#110E0C]/80 via-[#110E0C]/65 to-[#110E0C]/90 sm:hidden pointer-events-none" />

        {/* Top subtle fade from header */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#110E0C]/80 via-[#110E0C]/30 to-transparent pointer-events-none" />

        {/* Bottom smooth fade to transition into section below */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#110E0C] via-[#110E0C]/70 to-transparent pointer-events-none" />

        {/* Delicate golden radial glow behind the text narrative */}
        <div
          className="absolute top-1/4 left-0 w-[550px] h-[550px] rounded-full pointer-events-none blur-3xl opacity-20 z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(197, 168, 128, 0.45) 0%, rgba(17, 14, 12, 0) 70%)",
          }}
        />
      </div>

      {/* Background Architectural Hairline Grid */}
      <div className="absolute inset-0 pointer-events-none z-1 hidden lg:block opacity-15">
        <div className="max-w-7xl mx-auto h-full border-x border-goldaccent/30" />
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN EDITORIAL CONTENT CONTAINER                       */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-8 flex flex-col items-start max-w-2xl text-left">
            {/* Archival Edition Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#1F1B18]/80 backdrop-blur-md border border-goldaccent/40 rounded-full mb-3 sm:mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-goldaccent animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.26em] text-goldaccent font-medium">
                Vol. IV Master Edition • 2026 Archive
              </span>
            </div>

            {/* Haute Grand Headline */}
            <h1 className="serif-display text-3xl sm:text-5xl lg:text-[56px] xl:text-[64px] text-alabaster font-normal leading-[1.06] tracking-tight mb-3 sm:mb-4">
              Haute Artisanal Decor.{" "}
              <span className="serif-display italic font-light block text-goldaccent mt-0.5">
                Bespoke Luxury Gifting.
              </span>
            </h1>

            {/* Architectural Sub-Manifesto */}
            <p className="text-xs sm:text-sm lg:text-[15px] text-alabaster/80 leading-relaxed max-w-xl mb-5 sm:mb-6 font-light">
              An atelier world where master metalsmithing converges with timeless living. Handcrafted solid brassware, sculptural centerpieces, and curated luxury gifts — forged for connoisseurs and exquisite spaces.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="#collection"
                className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[46px] px-6 sm:px-7 py-2.5 bg-goldaccent hover:bg-golddeep text-[#14110E] text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-semibold transition-all duration-300 shadow-[0_4px_25px_rgba(197,168,128,0.25)] hover:shadow-[0_6px_30px_rgba(197,168,128,0.4)] group cursor-pointer active:scale-[0.99]"
              >
                <span>Explore 2026 Collection</span>
                <span className="material-symbols-outlined text-[16px] ml-2 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>

              <Link
                href="/catalogue"
                className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[46px] px-5 sm:px-6 py-2.5 border border-alabaster/40 hover:border-goldaccent text-alabaster hover:text-goldaccent hover:bg-alabaster/5 backdrop-blur-xs text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium transition-all duration-300 cursor-pointer"
              >
                <span>View Full Catalogue</span>
              </Link>
            </div>
          </div>

          {/* Right Floating Specimen Plaque (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-4 justify-end items-end h-full">
            <div className="bg-[#1F1B18]/85 backdrop-blur-md border border-goldaccent/40 p-4 max-w-xs shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
              {/* Plaque Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-goldaccent/25 mb-2.5">
                <span className="text-[9px] uppercase tracking-[0.25em] text-goldaccent font-medium">
                  Featured Specimen
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-mute font-mono">
                  Plate 01
                </span>
              </div>

              {/* Plaque Body */}
              <h3 className="serif-display text-lg text-alabaster font-normal italic mb-1">
                The Imperial Stallion Chariot
              </h3>
              <p className="text-[11px] text-mute leading-relaxed font-light mb-2.5">
                Solid hand-cast brass with mirror sterling immersion and warm ambient luster.
              </p>

              {/* Status Indicator */}
              <div className="flex items-center justify-between pt-2 border-t border-borderdelicate/15 text-[9px] uppercase tracking-[0.18em]">
                <span className="text-goldaccent font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live in Atelier
                </span>
                <Link
                  href="/catalogue"
                  className="text-alabaster/70 hover:text-alabaster underline underline-offset-4 text-[9px]"
                >
                  Inspect
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. ATELIER CREDENTIALS STRIP (Bottom of Hero)             */}
      {/* ========================================================= */}
      <div id="craft" className="w-full relative z-10 border-t border-goldaccent/20 bg-[#161412]/80 backdrop-blur-md shrink-0 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3.5 sm:py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-borderdelicate/15 text-left">
            {/* Item 1 */}
            <div className="sm:pr-4 pt-1 sm:pt-0">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-goldaccent font-medium block mb-0.5">
                01 / Master Craftsmanship
              </span>
              <p className="text-[11px] sm:text-xs text-alabaster/70 font-light">
                Centuries-old lost-wax casting &amp; hand-buffed finishes
              </p>
            </div>

            {/* Item 2 */}
            <div className="sm:px-6 pt-2 sm:pt-0">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-goldaccent font-medium block mb-0.5">
                02 / Noble Materials
              </span>
              <p className="text-[11px] sm:text-xs text-alabaster/70 font-light">
                Virgin solid brass, sterling immersion &amp; natural inlays
              </p>
            </div>

            {/* Item 3 */}
            <div className="sm:pl-6 pt-2 sm:pt-0">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-goldaccent font-medium block mb-0.5">
                03 / Bespoke Luxury Gifting
              </span>
              <p className="text-[11px] sm:text-xs text-alabaster/70 font-light">
                Artisanal bespoke packaging &amp; global white-glove courier
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
