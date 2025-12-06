"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full shadow-md py-3 px-6 flex items-center z-50 border-b border-black transition-all bg-white/5 backdrop-blur-sm font-sans">
      <div className="max-w-[1400px] mx-auto w-full flex items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-lg font-bold text-black tracking-tight uppercase">
            MUJTOPPERS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 ml-auto   ">
            <Link
              href="/"
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              Home
            </Link>
            <Link
              href="/materials"
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              Material
            </Link>
            <Link
              href="/college-tip"
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              College Tip
            </Link>
            <Link
              href="/blogs"
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              Blogs
            </Link>
            <Link
              href="/about"
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              About Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-black hover:bg-zinc-100 focus:outline-none ml-auto"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-zinc-300 bg-white">
          <div className="px-6 py-4 space-y-1">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-[15px] font-semibold text-black hover:bg-zinc-50 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              href="/materials"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-[15px] font-semibold text-black hover:bg-zinc-50 rounded-lg transition-colors"
            >
              Material
            </Link>
            <Link
              href="/college-tip"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-[15px] font-semibold text-black hover:bg-zinc-50 rounded-lg transition-colors"
            >
              College Tip
            </Link>
            <Link
              href="/blogs"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-[15px] font-semibold text-black hover:bg-zinc-50 rounded-lg transition-colors"
            >
              Blogs
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-[15px] font-semibold text-black hover:bg-zinc-50 rounded-lg transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
