import React from "react";

export default function Testimonial() {
  return (
    <section className="w-full bg-alabaster py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 border-b border-borderdelicate/80">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-[0.32em] text-golddeep font-medium mb-4 sm:mb-6">
          Atelier Patron
        </span>
        <blockquote className="serif-display text-xl sm:text-3xl lg:text-4xl text-espresso font-normal italic leading-relaxed mb-6">
          “For our annual summit, Mesh ‘E’ Decor fashioned 350 bespoke
          monogrammed Peacock Lamps. The balanced weight, mirror polish, and
          velvet presentation caskets exceeded our executive protocol in every
          measure.”
        </blockquote>
        <div className="text-[11px] sm:text-[12px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-subdued">
          <span className="font-medium text-espresso">
            Director of Institutional Procurement
          </span>{" "}
          &nbsp;·&nbsp; Grand Luxury Hotels Conclave
        </div>
      </div>
    </section>
  );
}
