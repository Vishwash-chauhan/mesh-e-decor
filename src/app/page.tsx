"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import { ProductItem } from "@/data/products";
import Testimonial from "@/components/Testimonial";
import Footer from "@/components/Footer";

const InquiryModal = dynamic(() => import("@/components/InquiryModal"), {
  ssr: false,
});

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null
  );

  const handleOpenConcierge = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleInquirePiece = (product: ProductItem) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-alabaster text-espresso font-light">
      {/* Main Sticky Header */}
      <Navbar onOpenConcierge={handleOpenConcierge} />

      {/* Main Content Sections */}
      <main className="w-full flex-grow">
        {/* Hero Section */}
        <Hero onOpenConcierge={handleOpenConcierge} />

        {/* Curated Masterpieces / Collections */}
        <Collection
          onInquirePiece={handleInquirePiece}
          onOpenConcierge={handleOpenConcierge}
        />

        {/* Atelier Patron Testimonial */}
        <Testimonial />
      </main>

      {/* Refined Atelier Footer */}
      <Footer />

      {/* Interactive Bespoke Inquiry Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
