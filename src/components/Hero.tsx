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
      {/* 1. DESKTOP HERO BACKGROUND & SCRIMS (sm: and up)          */}
      {/* ========================================================= */}
      <div className="hidden sm:block absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/hero-bg.jpg"
          alt="Handcrafted Imperial Stallion Brass Centerpiece"
          fill
          quality={75}
          sizes="(min-width: 640px) 100vw, 1px"
          className="object-cover sm:object-[80%_center] lg:object-right select-none animate-hero-settle"
        />

        {/* Ambient Dark Scrims for Desktop Editorial Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#110E0C] via-[#110E0C]/80 lg:via-[#110E0C]/45 to-transparent w-3/5 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#110E0C]/80 via-[#110E0C]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#110E0C] via-[#110E0C]/70 to-transparent pointer-events-none" />

        {/* Golden radial glow */}
        <div
          className="absolute top-1/4 left-0 w-[550px] h-[550px] rounded-full pointer-events-none blur-3xl opacity-20 z-0 animate-ambient-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(197, 168, 128, 0.45) 0%, rgba(17, 14, 12, 0) 70%)",
          }}
        />
      </div>

      {/* Desktop Architectural Hairline Grid */}
      <div className="absolute inset-0 pointer-events-none z-1 hidden lg:block opacity-15">
        <div className="max-w-7xl mx-auto h-full border-x border-goldaccent/30" />
      </div>

      {/* ========================================================= */}
      {/* 2. MOBILE HERO EXPERIENCE (< sm) - CLEAN & UNCROWDED      */}
      {/* ========================================================= */}
      <div className="sm:hidden relative z-10 w-full min-h-screen min-h-svh flex flex-col justify-between pt-16 pb-5 px-5 overflow-hidden">
        {/* Mobile Dedicated Horse Image & Scrims */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/hero-horse.jpg"
            alt="Handcrafted Imperial Stallion Brass Centerpiece"
            fill
            priority
            quality={75}
            sizes="(max-width: 639px) 100vw, 1px"
            className="object-cover object-[center_22%] select-none animate-hero-settle"
          />

          {/* Top header protection fade */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#110E0C] via-[#110E0C]/65 to-transparent" />

          {/* Center-to-bottom dark gradient: preserves full rearing stallion visibility while grounding the typography */}
          <div className="absolute inset-x-0 bottom-0 h-[56%] bg-gradient-to-t from-[#110E0C] from-40% via-[#110E0C]/90 via-70% to-transparent" />
        </div>

        {/* Mobile Top: Collection Badge */}
        <div className="relative z-10 pt-2 flex items-center justify-between animate-luxury-fade-up delay-75">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1F1B18]/90 border border-goldaccent/40 rounded-full shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-goldaccent" />
            <span className="text-[8.5px] uppercase tracking-[0.24em] text-goldaccent font-medium">
              Handcrafted • 2026 Collection
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#110E0C]/80 border border-borderdelicate/30 rounded-full text-[8.5px] uppercase tracking-[0.2em] text-alabaster/70 font-mono">
            <span>Featured</span>
            <span className="text-goldaccent">•</span>
            <span>Stallion</span>
          </div>
        </div>

        {/* Mobile Visual Focal Space (Rearing Horse breathing room) */}
        <div className="relative z-10 flex-grow min-h-[180px] pointer-events-none" />

        {/* Mobile Bottom: Narrative Typography & Actions */}
        <div className="relative z-10 flex flex-col space-y-3.5 pb-1">
          {/* Main Headline */}
          <div>
            <h1 className="serif-display text-[32px] xs:text-[36px] text-alabaster font-normal leading-[1.08] tracking-tight animate-luxury-fade-up delay-150">
              Handcrafted Luxury Decor.
              <span className="serif-display italic font-light block text-goldaccent mt-0.5 text-[28px] xs:text-[32px] animate-luxury-fade-up delay-250">
                Premium Gifting.
              </span>
            </h1>
            <p className="text-[12px] text-alabaster/80 leading-relaxed font-light mt-2 max-w-sm animate-luxury-fade-up delay-350">
              Fine solid brassware, statement centerpieces, and thoughtfully curated gifts for elegant homes and celebrations.
            </p>
          </div>

          {/* Action CTAs in a sleek single-row flex */}
          <div className="flex items-center gap-2.5 w-full pt-0.5 animate-luxury-fade-up delay-450">
            <Link
              href="#collection"
              className="luxury-cta-sheen flex-1 inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 bg-goldaccent hover:bg-golddeep text-[#14110E] text-[10px] uppercase tracking-[0.22em] font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(197,168,128,0.3)] active:scale-[0.98]"
            >
              <span>Explore Collection</span>
              <span className="material-symbols-outlined text-[15px] ml-1.5">
                arrow_forward
              </span>
            </Link>

            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 border border-alabaster/35 text-alabaster hover:text-goldaccent hover:border-goldaccent bg-[#1F1B18]/70 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 active:scale-[0.98]"
            >
              <span>Catalogue</span>
            </Link>
          </div>

          {/* Mobile Credentials Strip (Slim, elegant single line) */}
          <div className="pt-2.5 border-t border-goldaccent/20 flex items-center justify-between text-[8.5px] uppercase tracking-[0.18em] text-alabaster/70 animate-luxury-fade-up delay-550">
            <span>01 / Hand-Cast Brass</span>
            <span className="text-goldaccent/40">•</span>
            <span>02 / Fine Silver Plating</span>
            <span className="text-goldaccent/40">•</span>
            <span>03 / Luxury Gifting</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. DESKTOP MAIN EDITORIAL CONTAINER (sm: and up)          */}
      {/* ========================================================= */}
      <div className="hidden sm:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 flex-grow flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-8 flex flex-col items-start max-w-2xl text-left">
            {/* Collection Edition Pill Tag */}
            <div className="animate-luxury-fade-up delay-75 inline-flex items-center gap-2.5 px-3 py-1 bg-[#1F1B18]/80 backdrop-blur-md border border-goldaccent/40 rounded-full mb-3 sm:mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-goldaccent" />
              <span className="text-[9px] uppercase tracking-[0.26em] text-goldaccent font-medium">
                Exclusive 2026 Collection
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-luxury-fade-up delay-150 serif-display text-3xl sm:text-5xl lg:text-[56px] xl:text-[64px] text-alabaster font-normal leading-[1.06] tracking-tight mb-3 sm:mb-4">
              Handcrafted Luxury Decor.{" "}
              <span className="serif-display italic font-light block text-goldaccent mt-0.5 animate-luxury-fade-up delay-250">
                Premium Gifting.
              </span>
            </h1>

            {/* Description */}
            <p className="animate-luxury-fade-up delay-350 text-xs sm:text-sm lg:text-[15px] text-alabaster/80 leading-relaxed max-w-xl mb-5 sm:mb-6 font-light">
              Where timeless artisan metalwork meets elegant modern living. Explore solid brassware, statement centerpieces, and handcrafted luxury gifts made to enhance beautiful homes and special occasions.
            </p>

            {/* Action CTAs */}
            <div className="animate-luxury-fade-up delay-450 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="#collection"
                className="luxury-cta-sheen inline-flex items-center justify-center min-h-[44px] sm:min-h-[46px] px-6 sm:px-7 py-2.5 bg-goldaccent hover:bg-golddeep text-[#14110E] text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-semibold transition-all duration-300 shadow-[0_4px_25px_rgba(197,168,128,0.25)] hover:shadow-[0_6px_30px_rgba(197,168,128,0.4)] group cursor-pointer active:scale-[0.99]"
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

          {/* Right Floating Highlight Plaque (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-4 justify-end items-end h-full animate-luxury-fade-up delay-550">
            <div className="bg-[#1F1B18]/85 backdrop-blur-md border border-goldaccent/40 hover:border-goldaccent/80 transition-colors duration-500 p-4 max-w-xs shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
              {/* Plaque Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-goldaccent/25 mb-2.5">
                <span className="text-[9px] uppercase tracking-[0.25em] text-goldaccent font-medium">
                  Featured Piece
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
                Solid hand-cast brass with fine silver plating and a warm golden finish.
              </p>

              {/* Status Indicator */}
              <div className="flex items-center justify-between pt-2 border-t border-borderdelicate/15 text-[9px] uppercase tracking-[0.18em]">
                <span className="text-goldaccent font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Available Now
                </span>
                <Link
                  href="/catalogue"
                  className="text-alabaster/70 hover:text-alabaster underline underline-offset-4 text-[9px]"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. ATELIER CREDENTIALS STRIP (Desktop sm: and up)         */}
      {/* ========================================================= */}
      <div id="craft" className="hidden sm:block w-full relative z-10 border-t border-goldaccent/20 bg-[#161412]/80 backdrop-blur-md shrink-0 scroll-mt-20 animate-luxury-fade-up delay-650">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3.5 sm:py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-borderdelicate/15 text-left">
            {/* Item 1 */}
            <div className="sm:pr-4 pt-1 sm:pt-0">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-goldaccent font-medium block mb-0.5">
                01 / Master Craftsmanship
              </span>
              <p className="text-[11px] sm:text-xs text-alabaster/70 font-light">
                Traditional hand-cast methods &amp; hand-polished finishes
              </p>
            </div>

            {/* Item 2 */}
            <div className="sm:px-6 pt-2 sm:pt-0">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-goldaccent font-medium block mb-0.5">
                02 / Premium Materials
              </span>
              <p className="text-[11px] sm:text-xs text-alabaster/70 font-light">
                Pure solid brass, fine silver plating &amp; natural inlays
              </p>
            </div>

            {/* Item 3 */}
            <div className="sm:pl-6 pt-2 sm:pt-0">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-goldaccent font-medium block mb-0.5">
                03 / Luxury Gifting
              </span>
              <p className="text-[11px] sm:text-xs text-alabaster/70 font-light">
                Signature gift packaging &amp; reliable doorstep delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

