"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

const marqueeItems = [
  "PREMIUM ESTATES",
  "★",
  "FIND YOUR HOME",
  "★",
  "BOOK A VIEWING",
  "★",
  "LUXURY RENTALS",
  "★",
  "ALL PROPERTIES",
  "★",
  "CONTACT US",
  "★",
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.includes("dashboard")) return null;

  return (
    <footer className="w-full overflow-hidden" style={{ background: "#0c1810" }}>

      {/* ── Scrolling Marquee ─────────────────────────────── */}
      <div className="border-y border-white/10 py-4 sm:py-5 overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className={`text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mx-4 sm:mx-6 select-none ${
                item === "★" ? "text-primary" : "text-white"
              }`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Middle Section ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-6 items-center">

          {/* Left: Address */}
          <div className="space-y-2">
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3 sm:mb-4">
              Our Office
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Dhaka, Bangladesh<br />
              Gulshan Avenue, Dhaka 1212<br />
              Bangladesh
            </p>
          </div>

          {/* Center: CTA — full width on mobile, centered on desktop */}
          <div className="flex sm:justify-center">
            <Link
              href="/all-properties"
              className="group inline-flex items-center gap-3 border border-white/20 px-6 sm:px-8 py-3 sm:py-4 text-white text-xs sm:text-sm font-semibold uppercase tracking-widest hover:border-primary hover:bg-primary transition-all duration-300 w-full sm:w-auto justify-center"
            >
              Explore Properties
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Link>
          </div>

          {/* Right: Contact — left-aligned on mobile/tablet, right on desktop */}
          <div className="space-y-1 sm:col-span-2 lg:col-span-1 lg:text-right">
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3 sm:mb-4">
              Contact
            </p>
            <p className="text-white/80 text-sm">+880 1700-000000</p>
            <p className="text-white/80 text-sm">hello@estatly.com</p>
          </div>

        </div>
      </div>

      {/* ── Divider ───────────────────────────────────────── */}
      <div className="border-t border-white/10 mx-4 sm:mx-8 lg:mx-16" />

      {/* ── Bottom Bar ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between text-sm">

        {/* Social */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <span className="text-white/40 text-xs uppercase tracking-widest font-semibold">
            Follow Us:
          </span>
          {[
            { label: "Facebook", href: "#" },
            { label: "Instagram", href: "#" },
            { label: "LinkedIn", href: "#" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="text-white/60 hover:text-primary transition-colors font-medium text-sm"
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {[
            { label: "Home", href: "/" },
            { label: "All Properties", href: "/all-properties" },
            { label: "About", href: "#" },
            { label: "Contact", href: "#" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white/60 hover:text-primary transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Legal */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/40 text-xs sm:text-sm">
          <a href="#" className="hover:text-white/70 transition-colors">Terms &amp; Conditions</a>
          <span className="text-white/20">|</span>
          <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
        </div>

      </div>

      {/* ── Copyright ─────────────────────────────────────── */}
      <div className="text-center pb-3 text-white/20 text-xs px-4">
        © {new Date().getFullYear()} Estatly. All rights reserved.
      </div>

      {/* ── Oversized Brand Name — always 100% width ─────── */}
      <div className="w-full overflow-hidden select-none">
        <svg
          viewBox="0 0 1000 180"
          className="w-full block"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <text
            x="500"
            y="155"
            textAnchor="middle"
            fontFamily="'Playfair Display', serif"
            fontWeight="900"
            fill="rgba(255,255,255,0.05)"
            fontSize="185"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
          >
            ESTATLY
          </text>
        </svg>
      </div>

      {/* ── Marquee keyframe ──────────────────────────────── */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

    </footer>
  );
}
