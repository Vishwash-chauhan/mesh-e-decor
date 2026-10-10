"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import TopStrip from "@/components/TopStrip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, ProductItem } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const router = useRouter();

  const product = PRODUCTS.find((p) => p.id === productId);

  const { addToCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"craft" | "care" | "custom">(
    "craft"
  );

  if (!product) {
    return notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  return (
    <div className="min-h-screen flex flex-col bg-alabaster text-espresso font-light">
      {/* Top Banner Strip */}
      <TopStrip />

      {/* Main Header */}
      <Navbar onOpenConcierge={() => setModalOpen(true)} />

      {/* Main Product Showcase */}
      <main className="w-full flex-grow">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="w-full bg-canvas py-3.5 px-4 sm:px-6 lg:px-12 border-b border-borderdelicate/80 text-[11px] text-mute uppercase tracking-[0.2em]"
        >
          <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-espresso transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/catalogue"
              className="hover:text-espresso transition-colors"
            >
              Catalogue
            </Link>
            <span>/</span>
            <span className="text-subdued">{product.category}</span>
            <span>/</span>
            <span className="text-espresso font-medium">{product.code}</span>
          </div>
        </nav>

        {/* Product Detail Main Grid */}
        <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-borderdelicate/80">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Product Artwork Display */}
            <div className="lg:col-span-7 flex flex-col gap-4 relative">
              <div className="relative mx-auto w-full">
                <div
                  className="absolute -inset-6 pointer-events-none rounded-full blur-3xl opacity-50 z-0"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(213, 184, 144, 0.35) 0%, rgba(250, 247, 242, 0) 75%)",
                  }}
                ></div>

                {/* Main Hairline Frame */}
                <div className="p-3 sm:p-5 bg-canvas border border-borderdelicate/90 shadow-[0_20px_50px_-20px_rgba(22,20,18,0.12)] relative z-10">
                  <div className="relative aspect-[4/5] overflow-hidden bg-espresso">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-center"
                      unoptimized
                      priority
                    />
                    {/* Floating Specimen Badge */}
                    <div className="absolute top-4 left-4 bg-alabaster/95 backdrop-blur-md px-3 py-1.5 border border-borderdelicate/60 text-[9px] uppercase tracking-[0.22em] text-golddeep font-medium shadow-xs">
                      {product.code} • Atelier Specimen
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Product Specifications & Actions */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="text-[10px] uppercase tracking-[0.3em] text-golddeep font-medium block mb-2">
                {product.category}
              </span>
              <h1 className="serif-display text-3xl sm:text-4xl lg:text-5xl text-espresso font-normal tracking-tight mb-3">
                {product.name}
              </h1>

              <div className="serif-display text-2xl sm:text-3xl text-espresso font-normal mb-6 pb-6 border-b border-borderdelicate/80 w-full flex items-center justify-between">
                <span>{product.price}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-mute font-sans font-light">
                  Tax Incl. • Free Shipping
                </span>
              </div>

              <p className="text-[14px] sm:text-[15px] text-subdued font-light leading-relaxed mb-8">
                {product.description ||
                  "Hand-sculpted virgin brass specimen dipped in multi-tank electrolyte silver plating, engineered to illuminate executive suites and royal banquet halls."}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-4 w-full bg-canvas p-4 sm:p-5 border border-borderdelicate/90 mb-8 text-[11px]">
                <div>
                  <span className="block text-mute uppercase tracking-[0.18em] mb-1">
                    Foundry Core
                  </span>
                  <span className="serif-display text-base text-espresso font-normal block">
                    {product.material || "100% Virgin Brass"}
                  </span>
                </div>
                <div>
                  <span className="block text-mute uppercase tracking-[0.18em] mb-1">
                    Dimensions
                  </span>
                  <span className="serif-display text-base text-espresso font-normal block">
                    {product.dimensions || "Standard Specimen"}
                  </span>
                </div>
                <div>
                  <span className="block text-mute uppercase tracking-[0.18em] mb-1">
                    Finish Bath
                  </span>
                  <span className="serif-display text-base text-espresso font-normal block">
                    Sterling Immersion
                  </span>
                </div>
                <div>
                  <span className="block text-mute uppercase tracking-[0.18em] mb-1">
                    Tarnish Defense
                  </span>
                  <span className="serif-display text-base text-espresso font-normal block">
                    10-Yr Micro-Lacquer
                  </span>
                </div>
              </div>

              {/* Quantity Controller */}
              <div className="w-full mb-8">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-mute font-medium mb-2">
                  Select Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-11 h-11 border border-borderdelicate bg-surface text-espresso font-medium flex items-center justify-center hover:bg-espresso hover:text-alabaster transition-colors cursor-pointer text-base"
                    >
                      -
                    </button>
                    <span className="serif-display text-xl font-medium min-w-[2.5rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-11 h-11 border border-borderdelicate bg-surface text-espresso font-medium flex items-center justify-center hover:bg-espresso hover:text-alabaster transition-colors cursor-pointer text-base"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[11px] text-mute">
                    (Total: ₹
                    {(product.numericPrice * quantity).toLocaleString("en-IN")})
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 w-full mb-8">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 min-h-[50px] text-[11px] uppercase tracking-[0.24em] font-medium transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                    added
                      ? "bg-golddeep text-alabaster"
                      : "bg-espresso text-alabaster hover:bg-[#2A2622]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {added ? "check" : "shopping_bag"}
                  </span>
                  <span>{added ? "Added to Cart ✓" : "Add to Cart"}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 min-h-[48px] border border-espresso text-espresso hover:bg-espresso hover:text-alabaster text-[11px] uppercase tracking-[0.22em] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    flash_on
                  </span>
                  <span>Order Now</span>
                </button>
              </div>

              {/* Guarantees Strip */}
              <div className="w-full pt-6 border-t border-borderdelicate/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-subdued font-light">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-golddeep">
                    verified
                  </span>
                  <span>100% Virgin Alloy Core</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-golddeep">
                    local_shipping
                  </span>
                  <span>Express Insured Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Tabs: Craftsmanship, Care & Customization */}
        <section className="w-full bg-surface py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-borderdelicate/80">
          <div className="max-w-4xl mx-auto">
            <div className="flex border-b border-borderdelicate/80 justify-center gap-8 text-[11px] uppercase tracking-[0.24em] font-medium">
              <button
                onClick={() => setActiveTab("craft")}
                className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                  activeTab === "craft"
                    ? "border-espresso text-espresso font-semibold"
                    : "border-transparent text-mute hover:text-espresso"
                }`}
              >
                Foundry Method
              </button>
              <button
                onClick={() => setActiveTab("care")}
                className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                  activeTab === "care"
                    ? "border-espresso text-espresso font-semibold"
                    : "border-transparent text-mute hover:text-espresso"
                }`}
              >
                Care &amp; Preservation
              </button>
              <button
                onClick={() => setActiveTab("custom")}
                className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                  activeTab === "custom"
                    ? "border-espresso text-espresso font-semibold"
                    : "border-transparent text-mute hover:text-espresso"
                }`}
              >
                Monogramming &amp; Trunks
              </button>
            </div>

            <div className="pt-8 text-[14px] text-subdued leading-relaxed font-light">
              {activeTab === "craft" && (
                <div className="space-y-4">
                  <h4 className="serif-display text-2xl text-espresso font-normal">
                    The 14-Stage North Indian Foundry Technique
                  </h4>
                  <p>
                    Every specimen starts as molten virgin brass alloy poured into dense silica sand molds. Silversmiths then perform hand champlevé chiseling to carve intricate plume motifs and repoussé relief.
                  </p>
                  <p>
                    The piece undergoes sequential electrolyte immersion tanks to bind hallmarked sterling silver at calibrated micron depths before receiving a thermal-cured lacquer shield.
                  </p>
                </div>
              )}

              {activeTab === "care" && (
                <div className="space-y-4">
                  <h4 className="serif-display text-2xl text-espresso font-normal">
                    Preserving Your Specimen
                  </h4>
                  <p>
                    Thanks to our proprietary molecular micro-lacquer seal, this artefact requires no silver polishes or harsh chemical cleaners.
                  </p>
                  <p>
                    Simply wipe gently with the included plush microfiber cloth. Avoid acidic liquids or abrasive pads to preserve the mirror specular luster for over ten years.
                  </p>
                </div>
              )}

              {activeTab === "custom" && (
                <div className="space-y-4">
                  <h4 className="serif-display text-2xl text-espresso font-normal">
                    Laser Engraving &amp; Personalization
                  </h4>
                  <p>
                    For gifts, special occasions, and personal heirlooms, we offer precision micro-laser hallmark engraving for crests, monograms, and custom dedications.
                  </p>
                  <p>
                    Each piece is presented in a handcrafted velvet trunk with brand authenticity credentials.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <section className="w-full bg-alabaster py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-b border-borderdelicate/80">
            <div className="max-w-7xl mx-auto">
              <div className="mb-10 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-golddeep font-medium block mb-2">
                  Curated Repertoire
                </span>
                <h3 className="serif-display text-3xl sm:text-4xl text-espresso font-normal">
                  Related Specimen Pieces
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {relatedProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    onInquire={(p) => addToCart(p, 1)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Bespoke Inquiry Dossier Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
      />
    </div>
  );
}
