"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  onOpenConcierge?: () => void;
}

export default function Navbar({ onOpenConcierge }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isCataloguePage = pathname === "/catalogue";
  const isCartPage = pathname === "/cart";

  return (
    <header className="sticky top-0 z-50 w-full bg-alabaster/95 backdrop-blur-md border-b border-borderdelicate/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 md:h-24 grid grid-cols-2 md:grid-cols-12 items-center">
        {/* Left: Atelier Brandmark */}
        <div className="md:col-span-4 flex items-center justify-start">
          <Link href="/" className="flex items-center gap-2 sm:gap-3.5 group">
            <Image
              alt="Mesh 'E' Decor Brandmark"
              className="h-6 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpqcGZ0BeH_fqgXUIEgQatWQTbaOWDHb5pQAYuFeAhW6-gZlEzfRkO1G8yjEw3HYRnAfS90zEz6gW4kGljiX8xHJFjPOeaV5atYaQEdHrQCbDmoS1COfeyrNcALBpTiK1Ufv0DTY1dNd2X1CxxcJheAgmzGoW3LEA79f22kOUt7KUckcK1QzwuhHlvbXrUr7TPMLQFYbDEbY1b55MwJ-doRzDxPeXmhXZy9VrVUPFADPQ9xNCdhWD6"
              width={36}
              height={36}
              unoptimized
            />
            <div className="flex flex-col justify-center border-l border-borderdelicate pl-2 sm:pl-3.5 my-auto">
              <span className="serif-display text-sm sm:text-base md:text-xl tracking-[0.10em] sm:tracking-[0.14em] md:tracking-[0.16em] uppercase text-espresso font-normal leading-none whitespace-nowrap">
                Mesh ‘E’ Decor
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Perfectly Aligned Desktop Nav (Catalogue & About Us) */}
        <nav className="hidden md:flex md:col-span-4 items-center justify-center gap-10 text-[12px] uppercase tracking-[0.22em] text-subdued font-normal">
          <Link
            href="/catalogue"
            className={`py-1 transition-colors hover:text-espresso relative ${
              isCataloguePage
                ? "text-espresso font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-goldaccent"
                : "hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-[1.5px] hover:after:bg-borderdelicate"
            }`}
          >
            Catalogue
          </Link>
          <Link
            href="/#craft"
            className="py-1 transition-colors hover:text-espresso relative hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-[1.5px] hover:after:bg-borderdelicate"
          >
            About Us
          </Link>
        </nav>

        {/* Right: Cart Action & Mobile Toggle */}
        <div className="md:col-span-4 flex items-center justify-end gap-3 sm:gap-4 text-espresso">
          {/* Cart Page Link Button */}
          <Link
            href="/cart"
            className={`hidden md:flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-medium px-4 sm:px-5 py-2.5 h-10 sm:h-11 border transition-all duration-300 cursor-pointer shadow-2xs relative ${
              isCartPage
                ? "border-espresso bg-espresso text-alabaster"
                : "border-espresso text-espresso hover:bg-espresso hover:text-alabaster"
            }`}
            aria-label="View Cart Page"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="ml-1 bg-golddeep text-alabaster text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-espresso focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden bg-alabaster border-b border-borderdelicate px-6 py-6 flex flex-col gap-4 text-[12px] uppercase tracking-[0.22em] text-subdued font-normal shadow-xl">
          <Link
            href="/catalogue"
            onClick={() => setMobileMenuOpen(false)}
            className={`hover:text-espresso transition-colors py-3 border-b border-borderdelicate/40 flex items-center justify-between ${
              isCataloguePage ? "font-medium text-espresso" : ""
            }`}
          >
            <span>Catalogue</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
          <Link
            href="/#craft"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-espresso transition-colors py-3 border-b border-borderdelicate/40 flex items-center justify-between"
          >
            <span>About Us</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-espresso transition-colors py-3 flex items-center justify-between font-medium text-espresso"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              View Cart {totalItems > 0 ? `(${totalItems})` : ""}
            </span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>
      )}
    </header>
  );
}
