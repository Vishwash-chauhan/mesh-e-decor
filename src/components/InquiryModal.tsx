"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProductItem } from "@/data/products";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductItem | null;
}

export default function InquiryModal({
  isOpen,
  onClose,
  product,
}: InquiryModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (product) {
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const itemTitle = product ? product.name : "Bespoke Collection Portfolio / RFQ Dossier";
  const itemCode = product ? product.code : "VOL-IV-2026";

  const [submitted, setSubmitted] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-espresso/70 backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div className="bg-alabaster border border-goldaccent/40 max-w-xl w-full p-5 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-subdued hover:text-espresso transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="border-b border-borderdelicate pb-4 mb-6">
          <span className="text-[9px] uppercase tracking-[0.3em] text-golddeep font-medium block mb-1">
            Atelier Custom Orders &amp; Personalization
          </span>
          <h3
            id="inquiry-modal-title"
            className="serif-display text-2xl sm:text-3xl text-espresso font-normal"
          >
            Bespoke Inquiry Dossier
          </h3>
        </div>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-golddeep/10 border border-golddeep/30 text-golddeep flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[32px]">
                check_circle
              </span>
            </div>
            <h4 className="serif-display text-2xl text-espresso font-normal mb-2">
              Inquiry Received!
            </h4>
            <p className="text-xs text-subdued font-light max-w-sm">
              Thank you for your custom request. Our master craftsmen will review your specifications and get back to you shortly.
            </p>
          </div>
        ) : (
          <>
            {/* Product Specimen Summary if selected */}
            {product ? (
              <div className="flex items-center gap-4 bg-canvas p-3.5 border border-borderdelicate mb-6">
                <div className="relative w-16 h-16 shrink-0 bg-espresso">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-golddeep font-semibold">
                    {product.code}
                  </span>
                  <h4 className="serif-display text-lg text-espresso font-normal leading-tight">
                    {product.name}
                  </h4>
                  <span className="text-xs text-subdued font-medium">{product.price}</span>
                </div>
              </div>
            ) : (
              <p className="text-[13px] text-subdued font-light mb-6">
                Please specify your bespoke requirements for boardroom suites, royal nuptial consignments, or custom laser hallmark requests.
              </p>
            )}

            {/* Form */}
            <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-[0.2em] text-mute text-[10px] mb-1 font-medium">
                    Patron / Contact Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Devika Singh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface border border-borderdelicate p-3 min-h-[44px] text-espresso focus:outline-none focus:border-espresso transition-colors"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-[0.2em] text-mute text-[10px] mb-1 font-medium">
                    Institution / Estate
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Oak / Heritage Suite"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full bg-surface border border-borderdelicate p-3 min-h-[44px] text-espresso focus:outline-none focus:border-espresso transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-[0.2em] text-mute text-[10px] mb-1 font-medium">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 border border-borderdelicate bg-surface text-espresso font-medium flex items-center justify-center hover:bg-espresso hover:text-alabaster transition-colors cursor-pointer text-base"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="serif-display text-lg font-medium text-espresso min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 border border-borderdelicate bg-surface text-espresso font-medium flex items-center justify-center hover:bg-espresso hover:text-alabaster transition-colors cursor-pointer text-base"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <span className="text-[10px] text-mute tracking-wider ml-2 hidden sm:inline">
                    (Gift packaging &amp; custom engraving included)
                  </span>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-[0.2em] text-mute text-[10px] mb-1 font-medium">
                  Bespoke Notes / Monogram Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify custom laser engraving, velvet trunk color, or target dispatch date..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-surface border border-borderdelicate p-3 text-espresso focus:outline-none focus:border-espresso transition-colors"
                />
              </div>

              <div className="pt-4 border-t border-borderdelicate flex flex-col sm:flex-row gap-3 items-center justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 min-h-[44px] border border-borderdelicate text-subdued hover:text-espresso text-[10px] uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 min-h-[44px] bg-espresso text-alabaster hover:bg-golddeep text-[10px] uppercase tracking-[0.24em] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Submit Custom Inquiry</span>
                  <span className="material-symbols-outlined text-[14px]">
                    send
                  </span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
