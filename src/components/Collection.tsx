"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface ProductItem {
  id: string;
  code: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "1",
    code: "JGM-0076",
    name: "Imperial Steed Rajnigandha Urli",
    price: "₹7,000",
    category: "Sterling-Dipped Brass",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRYTUlGuWsEJyS4OCvh1DArBogJinb33y_ZR4sBkobZ6pm4Eb8tE5y262YCJQNYY95F8nHuNAw8x9vtwdVOZvgsxpybwkyHeS9uwwvYfWXUcKdgtNVJ5kTZ92g2q9CA6b8kJW6UW_76IP_ECi_pQNcsD2x1AU76kQLEtI6_yY2AGlJ8YZyXMvzwRkN-xu8M4sLR4JIK4Tf1Z0lOhccP4aCmr8p6FcV9-jf0mfv5W-YKL3I_xSyxxPYgZBQ2lt1-y8QGg",
  },
  {
    id: "2",
    code: "JGM-0078",
    name: "Royal Equine Aster Urli",
    price: "₹7,500",
    category: "Sterling-Dipped Brass",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3Q2JdvFXcxYozJa1RkvXtRQb7VzArice0JTPokhyyhtT-uXM_EoeKJSRNsora9nGBgF2BiPUwznnD-onSQAvpc3RHHBxQoRhSsjYdMpKmjUenG_gw6WqOmLLpRVB1XCyxpXqoCU8PO4eGvbGrEkwpBCUhlXwSy5kmIq0jzqMymzsbzHgRcSIZoH-ApkafEbuuX4r7_lwmHWHL8ZNM76_pJHvUcXUJ372scy27yxGAe3YoKkwnN7qqiw9_LZ0lHFehSg",
  },
  {
    id: "3",
    code: "JGM-0105",
    name: "Twin Celestial Ram Sculptures",
    price: "₹12,500",
    category: "Antique Brass",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJctgP-2izCHGcZFhaOMVjvnKEkNkMC0bRK7EIbN7KJwGnNzfmOe_s9sW_5zWns3-rweL9Wgu9_ARfAEbkVi37NC3irDnz2GFyB5RgZtYjKIDg_Rqy9ZsEOX3e5u9ODNVKuCzUbGJsEOGsl7YN54OfQNJwqTESPCOvTV0ptIJihmB5J97iwm5okkTEC-LKevNFSe6tNRI8P4oUjFirSxtoiYiuJcgBmoRraDIThhZOienUMp8OmBDi4DU58ROzDxKy6w",
  },
  {
    id: "4",
    code: "JGM-0053",
    name: "Mayura Filigree Chased Casket",
    price: "₹8,400",
    category: "Mother-of-Pearl & Onyx",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjwFsxUDaeppa7-xv1k5jULrSF2OhRD4T2Y8s_2bH1IHFxQ0VyV8j0AsjuqBAzgGQcTooHf7xRqNCsjmgl4ibX6TJVXWrVfSfVxXyXmXP0jjTUQlew16PG2Ymd5higpC_SXYynzGMWNhyBCdHJLKPj5yTlt5UfH5lxiRUjD3Y2rQSh6SI5TdhDNmfFvwe_3QzCgSD_9x6pLojI04dRx6RRD1o-wUMBRQNIWnUN_vni1fzGiYAGQ9QBl39V7IMNjm6yiA",
  },
  {
    id: "5",
    code: "JGM-0122",
    name: "Sterling Imperial Chariot Steeds",
    price: "₹14,200",
    category: "Sterling-Dipped Brass",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASP5L-bl7-6aQhmFXkaCdpE1q71Wjh16E9Sgkvjk7__NZcSSOSLR6YJfKSurxzz1RvGILPZV4VoMEp2wRuHnfPe2Ph2_gWg29jsWsQ_9HOZ25E_SEbZzJ4rXuRHxGyg4fSd7gKeEbVqK78I_kZPplowEBo94tTXlRLxbyZ8sAl-OZKYpvCuRW3qG4j3Sl-1o8eB58Bfb4xEs-PPGP7VcbvupASWNxm3sGEtsZZA8N81VTPnFxPOpHHjZCFBZ3Lbweq-Q",
  },
  {
    id: "6",
    code: "JGM-0084",
    name: "Ashtalakshmi Sanctum Kalash",
    price: "₹18,500",
    category: "Sanctum Luminaria",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuytQCglDLRCOEWKN3wrOz2nUqBIenGwIbZUsRakZqT2qWEzNuCsLw2jYdsuVJNDvr3hj1Wt0XcDUMXNAbpCE4CqDKRChStGQfK5ChUcurMlbC_nAy2jLV-CQ7vRUbzxQqR7ZsBQdD8nd-m4o6XU2fXcj6v-gmwxj4nncQ4YbgJ16lkx6K_MUf5hccx_op9EWgInVnBzuPaXHpTKTtxPwAvzmSPz4nRh6UpGuRsFoYF7Ny_Y53Y1cRMzYy9cuKgK__tw",
  },
];

const CATEGORIES = [
  "All Collections",
  "Sterling-Dipped Brass",
  "Mother-of-Pearl & Onyx",
  "Antique Brass",
  "Sanctum Luminaria",
];

interface CollectionProps {
  onInquirePiece: (product: ProductItem) => void;
  onOpenConcierge?: () => void;
}

export default function Collection({
  onInquirePiece,
  onOpenConcierge,
}: CollectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Collections");

  const filteredProducts =
    selectedCategory === "All Collections"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section
      className="w-full bg-surface py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-b border-borderdelicate/80"
      id="collection"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with wide breathing room */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 lg:mb-20 pb-6 sm:pb-8 border-b border-borderdelicate/80 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] uppercase tracking-[0.3em] text-golddeep font-medium">
                Mesmerizing Artistry
              </span>
              <span className="text-mute/60">•</span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-mute">
                The Archival Collections
              </span>
            </div>
            <h2 className="serif-display text-3xl sm:text-5xl text-espresso font-normal mb-3">
              The Archival Editions
            </h2>
            <p className="text-[14px] text-subdued max-w-xl font-light leading-relaxed">
              Silver-plated virgin brass is merely the prelude to an expansive
              repertoire of archival décor, sacred sanctuaries, and opulent
              lapidary craftsmanship.
            </p>
          </div>

          {/* Filter Tabs - Horizontal scrollable on mobile */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 pt-2 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 md:flex-wrap shrink-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all cursor-pointer whitespace-nowrap min-h-[40px] flex items-center justify-center ${
                  selectedCategory === cat
                    ? "bg-espresso text-alabaster shadow-sm"
                    : "bg-transparent border border-borderdelicate text-subdued hover:text-espresso hover:border-espresso"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col bg-transparent"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-canvas border border-borderdelicate/80 mb-4 sm:mb-5">
                <Image
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  src={product.image}
                  fill
                  unoptimized
                />
                <div className="absolute top-3 left-3 bg-alabaster/90 backdrop-blur-xs px-2.5 py-1 border border-borderdelicate/60 text-[9px] uppercase tracking-[0.18em] text-golddeep font-medium">
                  {product.code}
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="serif-display text-xl sm:text-2xl text-espresso font-normal group-hover:text-golddeep transition-colors leading-snug">
                  {product.name}
                </h3>
                <div className="pt-4 mt-auto flex items-center justify-between border-t border-borderdelicate/60 text-espresso">
                  <span className="serif-display text-lg sm:text-xl font-normal">
                    {product.price}
                  </span>
                  <button
                    onClick={() => onInquirePiece(product)}
                    className="text-[10px] uppercase tracking-[0.2em] text-espresso hover:text-golddeep py-2 border-b border-espresso hover:border-golddeep transition-all cursor-pointer min-h-[44px] flex items-center"
                  >
                    Inquire Piece
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Editorial Catalogue Citation */}
        <div className="mt-14 sm:mt-20 pt-8 border-t border-borderdelicate/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="serif-display text-2xl sm:text-3xl text-golddeep italic">
              200+
            </span>
            <p className="text-[13px] text-subdued max-w-xl font-light">
              Each season, Mesh ‘E’ Decor commissions over two hundred bespoke
              designs for high patrons and royal nuptials.
            </p>
          </div>
          <button
            onClick={onOpenConcierge}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] font-medium text-espresso hover:text-golddeep transition-colors border-b border-espresso hover:border-golddeep pb-1 min-h-[44px] cursor-pointer"
          >
            <span>Download 2026 Specification Dossier</span>
            <span className="material-symbols-outlined text-[15px]">
              arrow_outward
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
