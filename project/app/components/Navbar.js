"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full shadow-md py-3 px-4 sm:px-6 z-50 border-b border-black bg-white/80 backdrop-blur-md font-sans">
        <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="https://www.mujtoppers.in/" className="flex items-center ml-[-8px] sm:ml-[-12px]">
            <span className="text-lg font-bold text-black tracking-tight uppercase">
              MUJTOPPERS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5 mr-[-8px] sm:mr-[-12px]">
            <Link
              href="https://about.mujtoppers.in/"
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              Home
            </Link>
            <Link
              href="https://mujtoppers.vercel.app/"
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              Material
            </Link>
            <Link
              href="https://www.mujtoppers.in/collegeTip"
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              College Tip
            </Link>
            <Link
              href="https://www.mujtoppers.in/blogs"
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              Blogs
            </Link>
            <Link
              href="https://about.mujtoppers.in/"
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              About Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-black hover:bg-black/5 active:bg-black/10 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute left-0 block w-6 h-0.5 bg-black transform transition-all duration-300 ease-out ${
                  isMenuOpen ? "top-[11px] rotate-45" : "top-1"
                }`}
              />
              <span
                className={`absolute left-0 top-[11px] block w-6 h-0.5 bg-black transition-all duration-200 ${
                  isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />
              <span
                className={`absolute left-0 block w-6 h-0.5 bg-black transform transition-all duration-300 ease-out ${
                  isMenuOpen ? "top-[11px] -rotate-45" : "top-5"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[280px] max-w-[85vw] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="text-base font-bold text-black uppercase tracking-tight">
            Menu
          </span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full text-black hover:bg-black/5 active:bg-black/10 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="px-3 py-4 space-y-1">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3.5 text-[15px] font-semibold text-gray-800 hover:bg-black hover:text-white rounded-xl transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <Link
            href="https://mujtoppers.vercel.app/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3.5 text-[15px] font-semibold text-gray-800 hover:bg-black hover:text-white rounded-xl transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Material
          </Link>
          <Link
            href="https://www.mujtoppers.in/collegeTip"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3.5 text-[15px] font-semibold text-gray-800 hover:bg-black hover:text-white rounded-xl transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            College Tip
          </Link>
          <Link
            href="https://www.mujtoppers.in/blogs"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3.5 text-[15px] font-semibold text-gray-800 hover:bg-black hover:text-white rounded-xl transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Blogs
          </Link>
          <Link
            href="https://about.mujtoppers.in/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3.5 text-[15px] font-semibold text-gray-800 hover:bg-black hover:text-white rounded-xl transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            About Us
          </Link>
        </div>

        {/* Mobile Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            © 2025 MUJToppers.in
          </p>
        </div>
      </div>
    </>
  );
}
