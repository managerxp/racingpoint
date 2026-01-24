"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isRacingHubOpen, setIsRacingHubOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClasses = "bg-transparent";

  const logoSize = scrolled ? "h-12" : "h-16";
  const logoPadding = scrolled ? "py-1" : "py-2";

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${headerClasses}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${logoPadding}`}>
        {/* Mobile Menu Button - Left on Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2 hover:text-red-500 transition order-first"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 ml-2 md:ml-4 lg:ml-0">
          <Image
            src="/assets/logo/racing_logo.png"
            alt="RacingPoint Logo"
            width={200}
            height={60}
            className={`${logoSize} w-auto object-contain transition-all duration-300`}
            priority
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
      
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-white/80 transition hover:text-red-500">
            Home
          </Link>
          <Link href="/gallery" className="text-white/80 transition hover:text-red-500">
            Gallery
          </Link>
          <Link href="/cars" className="text-white/80 transition hover:text-red-500">
            Cars
          </Link>
          <Link href="/tracks" className="text-white/80 transition hover:text-red-500">
            Tracks
          </Link>
          <Link href="/foodmenu" className="text-white/80 transition hover:text-red-500">
            Food Menu
          </Link>

          {/* Racing Hub Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRacingHubOpen(!isRacingHubOpen)}
              className="text-white/80 transition hover:text-red-500 flex items-center gap-1"
            >
              Racing Hub
              <span className={`text-xs transition-transform duration-200 ${isRacingHubOpen ? "rotate-180" : ""}`}>
                
              </span>
            </button>
            {isRacingHubOpen && (
              <div className="absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-lg border border-red-500/25 rounded-lg shadow-2xl overflow-hidden min-w-48">
                <Link
                  href="/login"
                  onClick={() => setIsRacingHubOpen(false)}
                  className="block px-4 py-3 text-white/80 hover:bg-red-500 hover:text-white transition flex items-center gap-2"
                >
                   Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsRacingHubOpen(false)}
                  className="block px-4 py-3 text-white/80 hover:bg-red-500 hover:text-white transition border-t border-red-500/25 flex items-center gap-2"
                >
                   Sign Up
                </Link>
              </div>
            )}
          </div>

          <Link href="/contact" className="text-white/80 transition hover:text-red-500">
            Contact
          </Link>
        </nav>

        {/* Book Now Button - Right Side */}
        <Link
          href="/booking"
          className="rounded-full bg-red-500 px-4 md:px-6 py-2 text-xs md:text-sm font-semibold text-black transition hover:bg-red-400"
        >
          <span className="hidden sm:inline">Book a Seat</span><span className="sm:hidden">Book</span>
        </Link>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-red-500/25">
          <nav className="flex flex-col px-6 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-red-500 transition py-2"
            >
              Home
            </Link>
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-red-500 transition py-2"
            >
              Gallery
            </Link>
            <Link
              href="/cars"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-red-500 transition py-2"
            >
              Cars
            </Link>
            <Link
              href="/tracks"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-red-500 transition py-2"
            >
              Tracks
            </Link>
            <Link
              href="/foodmenu"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-red-500 transition py-2"
            >
              Food Menu
            </Link>

            {/* Racing Hub in Mobile */}
            <div className="border-t border-red-500/25 pt-3">
              <button
                onClick={() => setIsRacingHubOpen(!isRacingHubOpen)}
                className="text-white/80 hover:text-red-500 transition py-2 flex items-center gap-2 w-full"
              >
                Racing Hub
                
              </button>
              {isRacingHubOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  <Link
                    href="/login"
                    onClick={() => {
                      setIsRacingHubOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    className="block text-white/80 hover:text-red-500 transition py-2"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => {
                      setIsRacingHubOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    className="block text-white/80 hover:text-red-500 transition py-2"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-red-500 transition py-2 border-t border-red-500/25 pt-3"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
