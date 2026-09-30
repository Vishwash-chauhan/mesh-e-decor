import React from "react";

export default function TopStrip() {
  return (
    <aside className="w-full bg-[#181614] text-[#C5A880] border-b border-goldaccent/15 py-2 px-6 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] tracking-[0.25em] uppercase font-normal py-1">
        <span className="text-mute/80 tracking-[0.2em] hidden sm:inline">
          New Delhi Atelier • Est. 2026
        </span>
        <span className="mx-auto sm:mx-0 font-medium tracking-[0.22em]">
          Bespoke Commissions &amp; Corporate Suites
        </span>
        <span className="hidden md:inline text-mute/80 tracking-[0.2em]">
          +91 70420 05637
        </span>
      </div>
    </aside>
  );
}
