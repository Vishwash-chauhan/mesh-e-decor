"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const lastScrollYRef = useRef(0);
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isCataloguePage = pathname === "/catalogue";
  const isCartPage = pathname === "/cart";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // When scrolled past initial top margin
      setIsScrolled(currentScrollY > 20);

      // Collapsing / hide logic on scroll
      if (currentScrollY > 70 && currentScrollY > lastScrollYRef.current) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else {
        // Scrolling up or at top -> reveal navbar
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-alabaster/95 backdrop-blur-md shadow-xs border-b border-borderdelicate/80"
          : "bg-alabaster/90 backdrop-blur-sm border-b border-borderdelicate/50"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-12 items-center transition-all duration-300 ${
          isScrolled ? "h-12 sm:h-14" : "h-14 sm:h-16"
        }`}
      >
        {/* Left: Atelier Brandmark */}
        <div className="md:col-span-4 flex items-center justify-start">
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
              <span className="serif-display text-sm sm:text-base tracking-[0.12em] sm:tracking-[0.14em] uppercase text-espresso font-normal leading-none whitespace-nowrap">
                Mesh ‘E’ Decor
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Nav (Catalogue & About Us) */}
        <nav className="hidden md:flex md:col-span-4 items-center justify-center gap-8 text-[11px] uppercase tracking-[0.2em] text-subdued font-normal">
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
        <div className="md:col-span-4 flex items-center justify-end gap-3 text-espresso">
          {/* Cart Page Link Button */}
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

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-espresso focus:outline-none min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="material-symbols-outlined text-[23px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden bg-alabaster border-b border-borderdelicate px-5 py-4 flex flex-col gap-2 text-[11px] uppercase tracking-[0.2em] text-subdued font-normal shadow-xl">
          <Link
            href="/catalogue"
            onClick={() => setMobileMenuOpen(false)}
            className={`hover:text-espresso transition-colors py-2.5 border-b border-borderdelicate/40 flex items-center justify-between ${
              isCataloguePage ? "font-medium text-espresso" : ""
            }`}
          >
            <span>Catalogue</span>
            <span className="material-symbols-outlined text-[15px]">chevron_right</span>
          </Link>
          <Link
            href="/#craft"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-espresso transition-colors py-2.5 border-b border-borderdelicate/40 flex items-center justify-between"
          >
            <span>About Us</span>
            <span className="material-symbols-outlined text-[15px]">chevron_right</span>
          </Link>
          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-espresso transition-colors py-2.5 flex items-center justify-between font-medium text-espresso"
          >
            <span className="flex items-center gap-2">
              <div className="relative inline-flex items-center justify-center">
                <span className="material-symbols-outlined text-[17px]">shopping_bag</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-golddeep text-alabaster text-[8px] font-bold min-w-[14px] h-3.5 px-0.5 rounded-full flex items-center justify-center leading-none tracking-normal tabular-nums shadow-xs">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="ml-1">View Cart</span>
            </span>
            <span className="material-symbols-outlined text-[15px]">chevron_right</span>
          </Link>
        </div>
      )}
    </header>
  );
}
