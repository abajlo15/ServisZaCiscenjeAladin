"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-transparent">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/Slike/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
              unoptimized
            />
            <span className="text-2xl font-bold text-white">
              Servis za čišćenje Aladin
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-white hover:text-blue-200 transition"
            >
              Početna
            </Link>
            <div className="relative group">
              <button className="text-white hover:text-blue-200 transition flex items-center">
                Usluge
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link href="/usluge#tepisi" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Strojno pranje tepiha
                </Link>
                <Link href="/usluge#tepisoni" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Strojno pranje tepisona
                </Link>
                <Link href="/usluge#namjestaj" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Dubinsko čišćenje namještaja
                </Link>
                <Link href="/usluge#automobili" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Kemijsko čišćenje automobila
                </Link>
                <Link href="/usluge#stanovi" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Generalno čišćenje stanova
                </Link>
              </div>
            </div>
            <Link
              href="/cjenik"
              className="text-white hover:text-blue-200 transition"
            >
              Cjenik
            </Link>
            <Link
              href="/galerija"
              className="text-white hover:text-blue-200 transition"
            >
              Galerija
            </Link>
            <Link
              href="/o-nama"
              className="text-white hover:text-blue-200 transition"
            >
              O nama
            </Link>
            <Link
              href="/rezerviraj"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Rezerviraj danas
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 bg-black/20 backdrop-blur-sm rounded-lg">
            <Link
              href="/"
              className="block px-4 py-2 rounded text-white hover:bg-white/20 transition"
            >
              Početna
            </Link>
            <Link
              href="/usluge"
              className="block px-4 py-2 rounded text-white hover:bg-white/20 transition"
            >
              Usluge
            </Link>
            <Link
              href="/cjenik"
              className="block px-4 py-2 rounded text-white hover:bg-white/20 transition"
            >
              Cjenik
            </Link>
            <Link
              href="/galerija"
              className="block px-4 py-2 rounded text-white hover:bg-white/20 transition"
            >
              Galerija
            </Link>
            <Link
              href="/o-nama"
              className="block px-4 py-2 rounded text-white hover:bg-white/20 transition"
            >
              O nama
            </Link>
            <Link
              href="/rezerviraj"
              className="block px-4 py-2 bg-blue-600 text-white rounded text-center hover:bg-blue-700"
            >
              Rezerviraj danas
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

