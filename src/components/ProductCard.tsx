"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductItem } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: ProductItem;
  onInquire?: (product: ProductItem) => void;
}

export default function ProductCard({
  product,
  onInquire,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
    if (onInquire) {
      onInquire(product);
    }
  };

  const productUrl = `/products/${product.id}`;

  return (
    <article className="group flex flex-col bg-transparent h-full">
      <Link
        href={productUrl}
        className="relative aspect-[4/5] overflow-hidden bg-canvas border border-borderdelicate/80 mb-4 sm:mb-5 block"
      >
        <Image
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          src={product.image}
          fill
          unoptimized
        />
        {/* Code Tag */}
        <div className="absolute top-3 left-3 bg-alabaster/95 backdrop-blur-xs px-2.5 py-1 border border-borderdelicate/60 text-[9px] uppercase tracking-[0.18em] text-golddeep font-medium shadow-xs">
          {product.code}
        </div>
      </Link>

      <div className="flex flex-col flex-grow">
        <span className="text-[9px] uppercase tracking-[0.2em] text-mute mb-1 font-medium">
          {product.category}
        </span>
        <Link href={productUrl}>
          <h3 className="serif-display text-xl sm:text-2xl text-espresso font-normal group-hover:text-golddeep transition-colors leading-snug mb-3">
            {product.name}
          </h3>
        </Link>

        {product.dimensions && (
          <p className="text-[11px] text-mute font-light mb-3 hidden sm:block">
            {product.dimensions}
          </p>
        )}

        <div className="pt-3.5 mt-auto flex items-center justify-between border-t border-borderdelicate/60 text-espresso">
          <span className="serif-display text-lg sm:text-xl font-normal">
            {product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className={`text-[10px] uppercase tracking-[0.2em] py-2 border-b transition-all cursor-pointer min-h-[44px] flex items-center gap-1 ${
              added
                ? "text-golddeep border-golddeep font-medium"
                : "text-espresso hover:text-golddeep border-espresso hover:border-golddeep"
            }`}
          >
            <span>{added ? "Added to Cart ✓" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
