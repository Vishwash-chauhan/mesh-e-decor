import React from "react";
import Image from "next/image";
import Link from "next/link";

interface DimensionsSpreadProps {
  onOpenConcierge?: () => void;
}

export default function DimensionsSpread({ onOpenConcierge }: DimensionsSpreadProps) {
  return (
    <>
      {/* Bespoke Corporate & Royal Gifting: Unique Editorial Spread */}
      <section className="w-full bg-canvas py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-borderdelicate/80 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 80% 50%, rgba(213, 184, 144, 0.25) 0%, transparent 60%)",
          }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-[10px] uppercase tracking-[0.32em] text-golddeep font-medium block mb-2">
              Expansive Repertoire
            </span>
            <h3 className="serif-display text-2xl sm:text-4xl text-espresso font-normal leading-snug">
              Two Enthralling Dimensions of Atelier Craft
            </h3>
            <p className="text-[13px] sm:text-[14px] text-subdued font-light mt-3 leading-relaxed">
              Explore our curated collections of handcrafted statement decor,
              iridescent mother-of-pearl lapidary, warm antiqued patinas, and
              ceremonial centerpieces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Chapter 01 */}
            <div className="bg-surface border border-borderdelicate/90 p-6 sm:p-10 flex flex-col justify-between relative group hover:border-golddeep/40 transition-all duration-500">
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-borderdelicate/60 flex-wrap gap-2">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-golddeep font-medium">
                    Chapter 01
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-mute">
                    Radiant Metals &amp; Silver
                  </span>
                </div>
                <h4 className="serif-display text-2xl sm:text-3xl text-espresso font-normal mb-3">
                  The Sterling &amp; Radiant Decor Collection
                </h4>
                <p className="text-[13px] sm:text-[14px] text-subdued leading-[1.8] font-light">
                  Handcrafted statement pieces and radiant centerpieces engineered
                  to illuminate luxury banquet settings, dining sanctuaries, and
                  heirloom gifting caskets.
                </p>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-borderdelicate/60 flex-wrap gap-3">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-mute">
                  Master Artisanal Craft
                </span>
                <Link
                  href="#collection"
                  className="text-[11px] uppercase tracking-[0.24em] font-medium text-espresso hover:text-golddeep flex items-center gap-1.5 transition-colors py-2 min-h-[44px]"
                >
                  <span>Explore Fine Decor</span>
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>

            {/* Chapter 02 */}
            <div className="bg-surface border border-borderdelicate/90 p-6 sm:p-10 flex flex-col justify-between relative group hover:border-golddeep/40 transition-all duration-500">
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-borderdelicate/60 flex-wrap gap-2">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-golddeep font-medium">
                    Chapter 02
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-mute">
                    Inlay &amp; Lapidary
                  </span>
                </div>
                <h4 className="serif-display text-2xl sm:text-3xl text-espresso font-normal mb-3">
                  The Natural Inlay &amp; Artisanal Decor Archives
                </h4>
                <p className="text-[13px] sm:text-[14px] text-subdued leading-[1.8] font-light">
                  Iridescent mother-of-pearl tessellation bonded to luxury armatures,
                  rich warm finishes, ceremonial game sets, and sanctuary candle lanterns with
                  timeless historic character.
                </p>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-borderdelicate/60 flex-wrap gap-3">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-mute">
                  Hand-Inlaid Natural Shell
                </span>
                <Link
                  href="#corporate"
                  className="text-[11px] uppercase tracking-[0.24em] font-medium text-espresso hover:text-golddeep flex items-center gap-1.5 transition-colors py-2 min-h-[44px]"
                >
                  <span>Explore Inlay Art</span>
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Luxury Section: Corporate & Boardrooms */}
      <section
        className="w-full bg-[#181614] text-alabaster py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden"
        id="corporate"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Imagery Spread */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative p-2.5 sm:p-5 border border-goldaccent/20 bg-[#211E1A]">
              <div className="relative aspect-[4/5] overflow-hidden bg-espresso">
                <Image
                  alt="Masterpiece Specimen Hand-Cast Brass Chess Set"
                  className="w-full h-full object-cover object-center grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdfqm6If8g35fhsvukwePKHJdKvwbvtIyzh7O-pB-oeJSTrBJ6XT6CltSmUoEKwUQBmMsxtatvYYt6E3elbnEPqTEo6QP8GVT6RCVmkDOvcQx7ykuTZy4GI_wwJ4tfS_gaWcZRW4MB6iVf4439U1A6UtnryGpIn3T_dUvg40OUWbStUXHIq7bz33A--aaA-mdC9faP7TO30sjNCJZStcIBjM9GXVziGhLMJypWs7zXNaIAD6y6OWaUuOaRnloB8XPjrg"
                  fill
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181614]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-goldaccent block mb-1">
                    Masterpiece Specimen • Hand-Cast Brass Chess Set
                  </span>
                  <span className="serif-display text-xl sm:text-2xl italic font-normal text-alabaster">
                    The Grandmaster Suite
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Architectural Typography Split */}
          <div className="lg:col-span-6 flex flex-col items-start order-1 lg:order-2 pl-0 lg:pl-6">
            <span className="text-[10px] uppercase tracking-[0.32em] text-goldaccent font-medium mb-3">
              Bespoke Gifting &amp; Custom Orders
            </span>
            <h2 className="serif-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] mb-6 text-alabaster">
              For Luxury Homes, Special Occasions &amp; Fine Living.
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] text-mute font-light mb-8 sm:mb-10 max-w-lg">
              We craft handcrafted brass and silver-plated masterpieces for luxury
              residences, milestone celebrations, and personalized gifting narratives of
              unmatched metallurgical caliber.
            </p>

            {/* Quiet Feature Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full border-t border-white/10 pt-8 mb-8 sm:mb-10">
              <div>
                <span className="serif-display text-lg text-goldaccent block mb-1">
                  Micro-Laser Hallmark
                </span>
                <p className="text-[12px] text-mute font-light leading-relaxed">
                  Family crests, personal dedications, and individualized
                  monograms engraved with surgical precision.
                </p>
              </div>
              <div>
                <span className="serif-display text-lg text-goldaccent block mb-1">
                  Hand-Stitched Caskets
                </span>
                <p className="text-[12px] text-mute font-light leading-relaxed">
                  Presentation trunks crafted with crushed velvet, gold foil
                  embossing, and certificate pockets.
                </p>
              </div>
              <div>
                <span className="serif-display text-lg text-goldaccent block mb-1">
                  Custom Orders &amp; Gifting
                </span>
                <p className="text-[12px] text-mute font-light leading-relaxed">
                  Tailored concierge support and custom velvet packaging for
                  individual orders and special occasion gifting.
                </p>
              </div>
              <div>
                <span className="serif-display text-lg text-goldaccent block mb-1">
                  Express Courier Dispatch
                </span>
                <p className="text-[12px] text-mute font-light leading-relaxed">
                  Insured express logistics throughout India and safe air
                  delivery for international orders.
                </p>
              </div>
            </div>

            {/* Direct Concierge Contact */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full">
              <a
                className="inline-flex items-center justify-center gap-3 min-h-[48px] px-8 py-4 bg-goldaccent text-[#181614] hover:bg-[#D5B890] text-[11px] uppercase tracking-[0.24em] font-medium transition-all duration-300 shadow-sm cursor-pointer"
                href="https://wa.me/917042005637?text=Hello%20Mesh%20E%20Decor%20Concierge%2C%20I%20am%20inquiring%20about%20a%20custom%20order."
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>WhatsApp Atelier Desk</span>
                <span className="material-symbols-outlined text-[16px]">
                  chat
                </span>
              </a>
              <div className="text-[12px] text-mute font-light flex items-center justify-center sm:justify-start gap-2 py-2">
                <span>Direct:</span>
                <a
                  className="text-alabaster hover:text-goldaccent transition-colors font-medium tracking-wider min-h-[44px] flex items-center"
                  href="tel:+917042005637"
                >
                  +91 70420 05637
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
