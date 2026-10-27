"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  onOpenConcierge?: () => void;
}

export default function Navbar({ onOpenConcierge }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isHomePage = pathname === "/";
  const isCataloguePage = pathname === "/catalogue";
  const isCartPage = pathname === "/cart";

  // Automatically close mobile menu when navigating to another page
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open to prevent accidental background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Scroll listener to hide/show navbar smoothly on scroll
  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Never auto-hide when mobile menu is open
          if (!mobileMenuOpen) {
            setIsScrolled(currentScrollY > 20);

            if (currentScrollY > 160 && currentScrollY - lastScrollY > 15) {
              // Scrolling down firmly -> hide navbar
              setIsVisible(false);
            } else if (lastScrollY - currentScrollY > 10 || currentScrollY <= 40) {
              // Scrolling up or near top -> smoothly reveal navbar
              setIsVisible(true);
            }
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out will-change-transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled || mobileMenuOpen
            ? "bg-[#FAF7F2] shadow-xs border-b border-borderdelicate/60"
            : isHomePage
            ? "bg-alabaster/40 backdrop-blur-md border-b border-white/20"
            : "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-borderdelicate/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-14 sm:h-16">
          {/* Left: Atelier Brandmark */}
          <div className="flex items-center justify-start shrink-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <Image
                alt="Mesh 'E' Decor Brandmark"
                className="h-6 sm:h-7 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpqcGZ0BeH_fqgXUIEgQatWQTbaOWDHb5pQAYuFeAhW6-gZlEzfRkO1G8yjEw3HYRnAfS90zEz6gW4kGljiX8xHJFjPOeaV5atYaQEdHrQCbDmoS1COfeyrNcALBpTiK1Ufv0DTY1dNd2X1CxxcJheAgmzGoW3LEA79f22kOUt7KUckcK1QzwuhHlvbXrUr7TPMLQFYbDEbY1b55MwJ-doRzDxPeXmhXZy9VrVUPFADPQ9xNCdhWD6"
                width={30}
                height={30}
                unoptimized
              />
              <div className="flex flex-col justify-center border-l border-borderdelicate pl-2 sm:pl-3 my-auto">
                <span className="serif-display text-xs sm:text-base tracking-[0.12em] sm:tracking-[0.14em] uppercase text-espresso font-normal leading-none whitespace-nowrap">
                  Mesh ‘E’ Decor
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden md:flex items-center justify-center gap-8 text-[11px] uppercase tracking-[0.2em] text-subdued font-normal">
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

          {/* Right: Actions (Desktop & Mobile) */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 text-espresso">
            {/* Desktop Cart Button */}
            <Link
              href="/cart"
              className={`hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-medium px-3.5 sm:px-4 py-1.5 h-8 sm:h-9 border transition-all duration-300 cursor-pointer shadow-2xs relative ${
                isCartPage
                  ? "border-espresso bg-espresso text-alabaster"
                  : "border-espresso text-espresso hover:bg-espresso hover:text-alabaster"
              }`}
              aria-label="View Cart Page"
            >
              <div className="relative inline-flex items-center justify-center">
                <span className="material-symbols-outlined text-[17px]">shopping_bag</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-golddeep text-alabaster text-[8px] font-bold min-w-[14px] h-3.5 px-0.5 rounded-full flex items-center justify-center leading-none tracking-normal tabular-nums shadow-xs">
                    {totalItems}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>

            {/* Mobile Quick Cart Icon Button */}
            <Link
              href="/cart"
              className="md:hidden relative min-h-[44px] min-w-[44px] flex items-center justify-center text-espresso hover:text-golddeep transition-colors cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <div className="relative inline-flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-golddeep text-alabaster text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center leading-none tabular-nums shadow-xs">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>

            {/* Mobile Sandwich / Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-espresso hover:text-golddeep transition-colors cursor-pointer active:scale-95 z-50 focus:outline-none"
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

        {/* Mobile Navigation Overlay & Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden w-full bg-[#FAF7F2] border-b border-borderdelicate shadow-2xl px-6 py-5 flex flex-col gap-1 text-[11px] uppercase tracking-[0.2em] text-subdued font-normal animate-in slide-in-from-top-2 duration-200"
          >
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-borderdelicate/60 text-[10px] tracking-[0.25em] text-golddeep font-medium">
              <span>Haute Artisanal Collections</span>
              <span>2026 Edition</span>
            </div>

            <Link
              href="/catalogue"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3 border-b border-borderdelicate/40 flex items-center justify-between transition-colors ${
                isCataloguePage ? "text-espresso font-semibold" : "hover:text-espresso"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                Catalogue Archives
              </span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </Link>

            <Link
              href="/#craft"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 border-b border-borderdelicate/40 flex items-center justify-between hover:text-espresso transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">handshake</span>
                Our Atelier &amp; Craft
              </span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </Link>

            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3 border-b border-borderdelicate/40 flex items-center justify-between transition-colors ${
                isCartPage ? "text-espresso font-semibold" : "hover:text-espresso"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <div className="relative inline-flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-2 bg-golddeep text-alabaster text-[8px] font-bold min-w-[13px] h-3 px-0.5 rounded-full flex items-center justify-center leading-none">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span>Curated Cart</span>
              </span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </Link>

            {onOpenConcierge && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConcierge();
                }}
                className="py-3 border-b border-borderdelicate/40 flex items-center justify-between hover:text-espresso text-left transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                  Bespoke Concierge
                </span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            )}

            {/* Direct WhatsApp Action in Menu */}
            <div className="pt-4 mt-2">
              <a
                href="https://wa.me/917042005637?text=Hello%20Mesh%20‘E’%20Decor%2C%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20silver-plated%20collection."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-[#25D366] text-white flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] font-medium shadow-xs hover:bg-[#20BE5C] transition-colors"
              >
                <span>WhatsApp Atelier</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Spacer below fixed navbar on non-home pages */}
      {!isHomePage && (
        <div className="h-14 sm:h-16 shrink-0 w-full" aria-hidden="true" />
      )}
    </>
  );
}
