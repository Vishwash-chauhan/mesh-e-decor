"use client";

import React from "react";
import Reveal from "./Reveal";

export default function Testimonial() {
  return (
    <section className="w-full bg-alabaster py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 border-b border-borderdelicate/80">
      <Reveal className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-[0.32em] text-golddeep font-medium mb-4 sm:mb-6">
          The Art of Luxury Gifting
        </span>
        <blockquote className="serif-display text-xl sm:text-3xl lg:text-4xl text-espresso font-normal italic leading-relaxed mb-6">
          “Every gesture deserves an heirloom. From bespoke wedding trousseaus
          and festive hampers to curated corporate suites, each Mesh ‘E’ Decor
          creation is handcrafted and presented to leave an unforgettable
          impression.”
        </blockquote>
        <div className="w-12 h-[1px] bg-goldaccent/60 mb-5" />
        <div className="text-[11px] sm:text-[12px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-subdued">
          <span className="font-medium text-espresso">
            Bespoke Hampers &amp; Trousseau Curation
          </span>{" "}
          &nbsp;·&nbsp; Festive &amp; Corporate Gifting
        </div>
      </Reveal>
    </section>
  );
}
