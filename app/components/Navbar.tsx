"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Users, 
  Heart, 
  ShieldCheck, 
  FileCheck2,
  Sparkles
} from "lucide-react";

interface NavbarProps {
  onOpenPlanModal?: () => void;
}

export default function Navbar({ onOpenPlanModal }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { label: "Travel", href: "/" },
    { label: "Housing", href: "/housing" },
    { label: "Safety", href: "/safety" },
    { label: "Daily Life", href: "/daily-life" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/#pricing" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100/90 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo - Same to same as screenshot */}
        <Link href="/" className="flex items-center gap-1 group select-none">
          <div className="flex items-center gap-1.5">
            {/* Colorful wings / swoosh feathers on left of A */}
            <svg
              className="w-7 h-7 shrink-0 -mr-1"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Cyan / Blue bottom wing */}
              <path
                d="M4 27C7 26 13 25 18 24C12 28 6 29 4 27Z"
                fill="#00B4D8"
              />
              {/* Turquoise wing */}
              <path
                d="M5 24C8 22 14 21 19 21C13 24 7 26 5 24Z"
                fill="#06D6A0"
              />
              {/* Yellow wing */}
              <path
                d="M7 20C10 17 16 17 21 18C15 20 9 22 7 20Z"
                fill="#FFD166"
              />
              {/* Orange wing */}
              <path
                d="M9 16C12 13 18 13 22 15C16 17 11 19 9 16Z"
                fill="#F77F00"
              />
              {/* Magenta / Pink wing */}
              <path
                d="M12 12C15 9 21 10 24 13C18 14 14 16 12 12Z"
                fill="#E01E5A"
              />
              {/* Red Alpha A leg */}
              <path
                d="M19 8L27 28H23L21.5 24H18.5L20 20H21L19.5 15L17 24H14L19 8Z"
                fill="#DC2626"
              />
            </svg>

            {/* ALPHA HOUSING Text */}
            <div className="flex flex-col -space-y-1">
              <div className="flex items-baseline">
                <span className="font-black text-[22px] tracking-tight text-red-600 leading-none">
                  ALPHA
                </span>
                <span className="font-bold text-[22px] tracking-tight text-slate-800 leading-none ml-0.5">
                  Housing
                </span>
                <span className="text-[9px] font-semibold text-slate-400 ml-0.5 align-top">
                  ®
                </span>
              </div>
              <span className="text-[9.5px] italic font-serif text-slate-500 tracking-tight pl-0.5">
                Study Abroad, Stay Confident.
              </span>
            </div>
          </div>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm transition-all duration-150 ${
                  active
                    ? "bg-[#FFF4F4] text-red-600 font-semibold px-4 py-1.5 rounded-xl border border-red-200/90 shadow-2xs"
                    : "text-slate-700 hover:text-slate-950 font-medium px-1 py-1"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Emma's Group Profile Pill (exact same as screenshot) */}
        <div className="hidden md:flex items-center">
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-2xs"
            >
              <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Emma Watson"
                  width={28}
                  height={28}
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-slate-800">
                Emma&apos;s Group
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                  profileDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">
                    Florence Spring 2027
                  </p>
                  <p className="text-[11px] text-slate-500">
                    4 Roommates • €3,400 Pooled
                  </p>
                </div>
                <div className="py-1">
                  <Link
                    href="/how-it-works"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>Manage Roommates (4/4)</span>
                  </Link>
                  <Link
                    href="/housing"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-slate-400" />
                    <span>Saved Flats (3)</span>
                  </Link>
                  <Link
                    href="/safety"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Safety &amp; Parent Portal</span>
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <FileCheck2 className="w-4 h-4 text-red-500" />
                    <span>Alpha Check™ Audit</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#FFF4F4] text-red-600 font-semibold border border-red-200"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Emma Watson"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Emma&apos;s Group
                </p>
                <p className="text-[11px] text-slate-500">
                  4 students in Florence
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
