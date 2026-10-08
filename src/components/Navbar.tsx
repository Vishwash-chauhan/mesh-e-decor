"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  onOpenConcierge?: () => void;
}

export default function Navbar({ onOpenConcierge }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-alabaster/95 backdrop-blur-md border-b border-borderdelicate/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
        {/* Atelier Brandmark */}
        <Link href="#" className="flex items-center gap-2.5 sm:gap-3.5 group">
          <Image
            alt="Mesh 'E' Decor Brandmark"
            className="h-7 sm:h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpqcGZ0BeH_fqgXUIEgQatWQTbaOWDHb5pQAYuFeAhW6-gZlEzfRkO1G8yjEw3HYRnAfS90zEz6gW4kGljiX8xHJFjPOeaV5atYaQEdHrQCbDmoS1COfeyrNcALBpTiK1Ufv0DTY1dNd2X1CxxcJheAgmzGoW3LEA79f22kOUt7KUckcK1QzwuhHlvbXrUr7TPMLQFYbDEbY1b55MwJ-doRzDxPeXmhXZy9VrVUPFADPQ9xNCdhWD6"
            width={36}
            height={36}
            unoptimized
          />
          <div className="flex flex-col border-l border-borderdelicate pl-2.5 sm:pl-3.5">
            <span className="serif-display text-lg sm:text-xl tracking-[0.14em] sm:tracking-[0.16em] uppercase text-espresso font-normal leading-none">
              Mesh ‘E’ Decor
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] sm:tracking-[0.32em] text-golddeep font-medium mt-0.5 sm:mt-1">
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
        <div className="flex items-center gap-2.5 sm:gap-6 text-espresso">
          {/* Concierge Button */}
          <button
            onClick={onOpenConcierge}
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.24em] font-medium px-3.5 sm:px-6 py-2 sm:py-2.5 min-h-[40px] sm:min-h-[44px] flex items-center justify-center border border-espresso text-espresso hover:bg-espresso hover:text-alabaster transition-all duration-300 cursor-pointer"
          >
            <span className="hidden xs:inline">Private </span>Concierge
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-espresso focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
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
        <div id="mobile-navigation" className="lg:hidden bg-alabaster border-b border-borderdelicate px-6 py-6 flex flex-col gap-4 text-[12px] uppercase tracking-[0.22em] text-subdued font-normal shadow-xl">
          <Link
            href="#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-espresso transition-colors py-2.5 border-b border-borderdelicate/40 flex items-center justify-between"
          >
            <span>Catalogue</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
          <Link
            href="#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-espresso transition-colors py-2.5 border-b border-borderdelicate/40 flex items-center justify-between"
          >
            <span>Collections</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
          <Link
            href="#corporate"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-espresso transition-colors py-2.5 border-b border-borderdelicate/40 flex items-center justify-between"
          >
            <span>Corporate</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
          <Link
            href="#craft"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-espresso transition-colors py-2.5 border-b border-borderdelicate/40 flex items-center justify-between"
          >
            <span>About Atelier</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>
      )}
    </header>
  );
}
