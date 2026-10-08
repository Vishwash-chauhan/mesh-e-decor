import React from "react";

export default function Craftsmanship() {
  const steps = [
    {
      num: "01",
      tag: "Foundry",
      title: "Cast & Forge",
      desc: "Molten virgin alloy poured into fine silica sand molds, imparting high structural density and resonant tactile heft.",
    },
    {
      num: "02",
      tag: "Chiseling",
      title: "Champlevé Detailing",
      desc: "Silversmiths sculpt individual plumage, steed manes, and floral repoussé utilizing unassisted hand cold chisels.",
    },
    {
      num: "03",
      tag: "Plating",
      title: "Sterling Submersion",
      desc: "Multi-tank electrolytic immersion binds hallmarked sterling silver at calibrated micron depths for radiant specular luster.",
    },
    {
      num: "04",
      tag: "Preservation",
      title: "Heritage Seal",
      desc: "Thermal cured molecular micro-lacquer seals the exterior against oxidation, humidity, and touch for ten plus years.",
    },
  ];

  const patrons = [
    "The Oberoi Suites",
    "Taj Heritage Estates",
    "DLF Privé",
    "ITC Maurya Luxury",
    "GMR Diplomatic Lounges",
  ];

  return (
    <section
      className="w-full bg-canvas py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 border-b border-borderdelicate/80"
      id="craft"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12 sm:mb-16 lg:mb-24">
          <span className="text-[10px] uppercase tracking-[0.3em] text-golddeep font-medium block mb-2">
            Metallurgical Distinction
          </span>
          <h2 className="serif-display text-3xl sm:text-5xl text-espresso font-normal leading-tight">
            The 14-Stage Foundry Method
          </h2>
          <p className="text-[14px] sm:text-[15px] text-subdued font-light mt-4 leading-relaxed">
            Every artefact begins as molten virgin brass, cooled in silica molds
            and sculpted through centuries-old North Indian techniques before
            receiving aerospace tarnish defense.
          </p>
        </div>

        {/* Subtle Numbered Horizontal Step Marks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 relative">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex flex-col border-t border-espresso pt-5 sm:pt-6"
            >
              <div className="flex items-baseline justify-between mb-3 sm:mb-4">
                <span className="serif-display text-2xl sm:text-3xl text-golddeep">
                  {step.num}
                </span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-mute">
                  {step.tag}
                </span>
              </div>
              <h3 className="serif-display text-xl sm:text-2xl text-espresso font-normal mb-2">
                {step.title}
              </h3>
              <p className="text-[13px] text-subdued font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Institutional Patrons (Quiet Monogram Row) */}
        <div className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-borderdelicate/80 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-between gap-6 sm:gap-8 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-mute text-center sm:text-left">
          {patrons.map((patron) => (
            <span
              key={patron}
              className="hover:text-espresso transition-colors font-medium tracking-[0.2em] sm:tracking-[0.28em]"
            >
              {patron}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
