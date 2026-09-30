"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  onOpenConcierge?: () => void;
}

export default function Navbar({ onOpenConcierge }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState("INR (₹)");
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies = ["INR (₹)", "USD ($)", "EUR (€)", "GBP (£)", "AED (د.إ)"];

  return (
    <header className="sticky top-0 z-50 w-full bg-alabaster/90 backdrop-blur-md border-b border-borderdelicate/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
        {/* Atelier Brandmark */}
        <Link href="#" className="flex items-center gap-3.5 group">
          <Image
            alt="Mesh 'E' Decor Brandmark"
            className="h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpqcGZ0BeH_fqgXUIEgQatWQTbaOWDHb5pQAYuFeAhW6-gZlEzfRkO1G8yjEw3HYRnAfS90zEz6gW4kGljiX8xHJFjPOeaV5atYaQEdHrQCbDmoS1COfeyrNcALBpTiK1Ufv0DTY1dNd2X1CxxcJheAgmzGoW3LEA79f22kOUt7KUckcK1QzwuhHlvbXrUr7TPMLQFYbDEbY1b55MwJ-doRzDxPeXmhXZy9VrVUPFADPQ9xNCdhWD6"
            width={36}
            height={36}
            unoptimized
          />
          <div className="flex flex-col border-l border-borderdelicate pl-3.5">
            <span className="serif-display text-xl tracking-[0.16em] uppercase text-espresso font-normal leading-none">
              Mesh ‘E’ Decor
            </span>
            <span className="text-[9px] uppercase tracking-[0.32em] text-golddeep font-medium mt-1">
              Haute Metallurgy
            </span>
          </div>
        </Link>

        {/* Quiet Editorial Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-9 text-[12px] uppercase tracking-[0.22em] text-subdued font-normal">
          <Link href="#collection" className="hover:text-espresso transition-colors">
            Catalogue
          </Link>
          <Link href="#collection" className="hover:text-espresso transition-colors">
            Collections
          </Link>
          <Link href="#corporate" className="hover:text-espresso transition-colors">
            Corporate
          </Link>
          <Link href="#craft" className="hover:text-espresso transition-colors">
            About
          </Link>
        </nav>

        {/* Action Items */}
        <div className="flex items-center gap-4 sm:gap-6 text-espresso">
          {/* Currency Dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center text-[11px] uppercase tracking-[0.2em] text-subdued hover:text-espresso cursor-pointer transition-all py-1 px-2 border border-transparent hover:border-borderdelicate"
            >
              <span>{currency}</span>
              <span className="material-symbols-outlined text-[14px] ml-1">
                expand_more
              </span>
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-surface border border-borderdelicate shadow-lg py-1 z-50">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                      currency === curr
                        ? "bg-espresso text-alabaster font-medium"
                        : "text-subdued hover:bg-canvas hover:text-espresso"
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Concierge Button */}
          <button
            onClick={onOpenConcierge}
            className="text-[11px] uppercase tracking-[0.24em] font-medium px-5 sm:px-6 py-2.5 border border-espresso text-espresso hover:bg-espresso hover:text-alabaster transition-all duration-300"
          >
            Private Concierge
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-espresso focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-alabaster border-b border-borderdelicate px-6 py-6 flex flex-col gap-5 text-[12px] uppercase tracking-[0.22em] text-subdued font-normal">
          <Link
            href="#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-espresso transition-colors py-2 border-b border-borderdelicate/40"
          >
            Catalogue
          </Link>
          <Link
            href="#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-espresso transition-colors py-2 border-b border-borderdelicate/40"
          >
            Collections
          </Link>
          <Link
            href="#corporate"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-espresso transition-colors py-2 border-b border-borderdelicate/40"
          >
            Corporate
          </Link>
          <Link
            href="#craft"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-espresso transition-colors py-2 border-b border-borderdelicate/40"
          >
            About
          </Link>
          <div className="flex items-center justify-between pt-2 text-[11px] text-mute">
            <span>Currency:</span>
            <div className="flex gap-2">
              {currencies.map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2 py-1 text-[10px] uppercase border ${
                    currency === curr
                      ? "border-espresso bg-espresso text-alabaster"
                      : "border-borderdelicate text-subdued"
                  }`}
                >
                  {curr.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
