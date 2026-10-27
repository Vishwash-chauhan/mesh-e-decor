"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import ProductCard from "@/components/ProductCard";
import Collection from "@/components/Collection";
import { PRODUCTS, ProductItem, getParentCategory } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const staticProduct = PRODUCTS.find(
    (p) =>
      p.code.toLowerCase() === decodeURIComponent(productId).toLowerCase() ||
      p.id === productId
  );

  const [product, setProduct] = useState<ProductItem | null>(staticProduct || null);
  const [loading, setLoading] = useState(!staticProduct);

  useEffect(() => {
    fetch(`/api/products/${encodeURIComponent(productId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.code) {
          setProduct(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [productId]);

  const { addToCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"craft" | "care" | "custom">(
    "craft"
  );
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  const allImages = useMemo(() => {
    if (!product) return [];
    const list: string[] = [];
    if (product.image) list.push(product.image);
    if (Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (img && !list.includes(img)) {
          list.push(img);
        }
      });
    }
    return list;
  }, [product]);

  const currentImage = selectedGalleryImage || (allImages[0] ?? (product?.image || ""));
  const activeIndex = Math.max(0, allImages.indexOf(currentImage));

  const handlePrevImage = () => {
    if (allImages.length <= 1) return;
    const newIndex = (activeIndex - 1 + allImages.length) % allImages.length;
    setSelectedGalleryImage(allImages[newIndex]);
  };

  const handleNextImage = () => {
    if (allImages.length <= 1) return;
    const newIndex = (activeIndex + 1) % allImages.length;
    setSelectedGalleryImage(allImages[newIndex]);
  };

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || allImages.length <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
    setTouchStartX(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (allImages.length <= 1) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [allImages, activeIndex]);

  const handleOpenConcierge = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleInquirePiece = (p: ProductItem) => {
    setSelectedProduct(p);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-alabaster text-espresso font-light">
        <Navbar onOpenConcierge={() => setModalOpen(true)} />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-[32px] animate-spin text-golddeep">
              progress_activity
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-mute">
              Loading Specimen...
            </span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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

  const handleOrderOnWhatsApp = () => {
    const totalFormatted = (product.numericPrice * quantity).toLocaleString("en-IN");
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const message = `Hello Mesh ‘E’ Decor, I would like to place an order:

• Product: ${product.code}
• Category: ${product.category}
• Quantity: ${quantity}
• Unit Price: ${product.price}
• Estimated Total: ₹${totalFormatted}

Product Link: ${currentUrl}

Kindly confirm availability and share payment / delivery instructions. Thank you!`;

    const whatsappUrl = `https://wa.me/917042005637?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen flex flex-col bg-alabaster text-espresso font-light">
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
            <span className="text-mute/60">/</span>
            <Link
              href="/catalogue"
              className="hover:text-espresso transition-colors"
            >
              Catalogue
            </Link>
            <span className="text-mute/60">/</span>
            <Link
              href={`/catalogue?category=${encodeURIComponent(
                getParentCategory(product.category)
              )}`}
              className="text-subdued hover:text-espresso transition-colors"
            >
              {product.category}
            </Link>
            <span className="text-mute/60">/</span>
            <Link
              href={`/products/${product.code}`}
              className="text-espresso font-medium hover:text-golddeep transition-colors"
              aria-current="page"
            >
              {product.code}
            </Link>
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

                {/* Main Hairline Frame - 1:1 Square Specimen View */}
                <div
                  className="p-3 sm:p-5 bg-canvas border border-borderdelicate/90 shadow-[0_20px_50px_-20px_rgba(22,20,18,0.12)] relative z-10 group"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="relative aspect-square overflow-hidden bg-espresso select-none">
                    <Image
                      src={currentImage}
                      alt={product.code}
                      fill
                      className="object-cover object-center transition-all duration-300"
                      unoptimized
                      priority
                    />
                    {/* Floating Specimen Badge */}
                    <div className="absolute top-4 left-4 bg-alabaster/95 backdrop-blur-md px-3 py-1.5 border border-borderdelicate/60 text-[9px] uppercase tracking-[0.22em] text-golddeep font-medium shadow-xs z-10">
                      {product.code} • Atelier Specimen
                    </div>

                    {/* Navigation Arrows (Move pics Left & Right) */}
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      disabled={allImages.length <= 1}
                      aria-label="Previous image"
                      className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-alabaster/90 hover:bg-espresso text-espresso hover:text-alabaster border border-borderdelicate/80 shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 ${
                        allImages.length > 1
                          ? "cursor-pointer active:scale-95 group/prev opacity-90 hover:opacity-100"
                          : "opacity-35 cursor-not-allowed pointer-events-none"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px] leading-none transition-transform group-hover/prev:-translate-x-0.5">
                        chevron_left
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextImage}
                      disabled={allImages.length <= 1}
                      aria-label="Next image"
                      className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-alabaster/90 hover:bg-espresso text-espresso hover:text-alabaster border border-borderdelicate/80 shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 ${
                        allImages.length > 1
                          ? "cursor-pointer active:scale-95 group/next opacity-90 hover:opacity-100"
                          : "opacity-35 cursor-not-allowed pointer-events-none"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px] leading-none transition-transform group-hover/next:translate-x-0.5">
                        chevron_right
                      </span>
                    </button>

                    {/* Dots / Slide Indicator */}
                    {allImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-espresso/60 backdrop-blur-md px-3 py-1.5 rounded-full">
                        {allImages.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedGalleryImage(allImages[idx])}
                            aria-label={`View image ${idx + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              idx === activeIndex
                                ? "w-5 bg-alabaster"
                                : "w-1.5 bg-alabaster/50 hover:bg-alabaster/80"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Rest of the Images (Gallery Thumbnails) */}
                  {allImages.length > 1 && (
                    <div className="mt-4 pt-3 border-t border-borderdelicate/60">
                      <span className="block text-[9px] uppercase tracking-[0.22em] text-mute mb-2 font-medium">
                        Additional Angles &amp; Craftsmanship Views ({allImages.length} Photographs)
                      </span>
                      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
                        {allImages.map((imgUrl, idx) => {
                          const isCurrent = currentImage === imgUrl;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setSelectedGalleryImage(imgUrl)}
                              className={`relative w-16 h-16 aspect-square shrink-0 border-2 transition-all overflow-hidden cursor-pointer ${
                                isCurrent
                                  ? "border-espresso shadow-xs scale-105"
                                  : "border-borderdelicate/80 opacity-70 hover:opacity-100"
                              }`}
                            >
                              <Image
                                src={imgUrl}
                                alt={`${product.code} angle ${idx + 1}`}
                                fill
                                className="object-cover object-center"
                                unoptimized
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Product Specifications & Actions */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="text-[10px] uppercase tracking-[0.3em] text-golddeep font-medium block mb-2">
                {product.category}
              </span>
              <h1 className="serif-display text-3xl sm:text-4xl lg:text-5xl text-espresso font-normal tracking-tight mb-3">
                {product.code}
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
                  className={`w-full py-4 min-h-[50px] text-[11px] uppercase tracking-[0.24em] font-medium transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm ${added
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
                  onClick={handleOrderOnWhatsApp}
                  className="w-full py-3.5 min-h-[48px] bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] uppercase tracking-[0.22em] font-medium transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.99]"
                >
                  <svg
                    className="w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 0 1-5.82 2.41h-.01c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.14.82.84-3.06-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.14.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z" />
                  </svg>
                  <span>Order on WhatsApp</span>
                </button>
              </div>

              {/* Guarantees Strip */}
              <div className="w-full pt-6 border-t border-borderdelicate/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-subdued font-light">
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

        {/* Detailed Tabs: Craftsmanship, Care & Customization (Commented out per request) */}
        {/*
        <section className="w-full bg-surface py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-borderdelicate/80">
          <div className="max-w-4xl mx-auto">
            <div className="flex border-b border-borderdelicate/80 justify-center gap-8 text-[11px] uppercase tracking-[0.24em] font-medium">
              <button
                onClick={() => setActiveTab("craft")}
                className={`pb-3 transition-colors cursor-pointer border-b-2 ${activeTab === "craft"
                  ? "border-espresso text-espresso font-semibold"
                  : "border-transparent text-mute hover:text-espresso"
                  }`}
              >
                Foundry Method
              </button>
              <button
                onClick={() => setActiveTab("care")}
                className={`pb-3 transition-colors cursor-pointer border-b-2 ${activeTab === "care"
                  ? "border-espresso text-espresso font-semibold"
                  : "border-transparent text-mute hover:text-espresso"
                  }`}
              >
                Care &amp; Preservation
              </button>
              <button
                onClick={() => setActiveTab("custom")}
                className={`pb-3 transition-colors cursor-pointer border-b-2 ${activeTab === "custom"
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
        */}

        {/* Product Catalogue Repertoire */}
        <Collection
          onInquirePiece={handleInquirePiece}
          onOpenConcierge={handleOpenConcierge}
        />

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
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct || product}
      />
    </div>
  );
}
