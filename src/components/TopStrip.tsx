import React from "react";

export default function TopStrip() {
  return (
    <aside className="w-full bg-[#181614] text-[#C5A880] border-b border-goldaccent/15 py-2 px-4 sm:px-6 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.25em] uppercase font-normal py-0.5 sm:py-1">
        <span className="text-mute/80 tracking-[0.2em] hidden sm:inline">
          New Delhi Atelier • Est. 2026
        </span>
        <span className="mx-auto sm:mx-0 font-medium tracking-[0.18em] sm:tracking-[0.22em]">
          Complimentary Express Shipping Across India
        </span>
        <a
          href="tel:+917042005637"
          className="hidden md:inline text-mute/80 hover:text-[#C5A880] tracking-[0.2em] transition-colors"
        >
          +91 70420 05637
        </a>
      </div>
    </aside>
  );
}
