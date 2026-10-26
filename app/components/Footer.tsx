"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200">
          {/* Brand & Guarantee Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-1.5 group select-none">
              <svg
                className="w-7 h-7 shrink-0 -mr-1"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 27C7 26 13 25 18 24C12 28 6 29 4 27Z" fill="#00B4D8" />
                <path d="M5 24C8 22 14 21 19 21C13 24 7 26 5 24Z" fill="#06D6A0" />
                <path d="M7 20C10 17 16 17 21 18C15 20 9 22 7 20Z" fill="#FFD166" />
                <path d="M9 16C12 13 18 13 22 15C16 17 11 19 9 16Z" fill="#F77F00" />
                <path d="M12 12C15 9 21 10 24 13C18 14 14 16 12 12Z" fill="#E01E5A" />
                <path d="M19 8L27 28H23L21.5 24H18.5L20 20H21L19.5 15L17 24H14L19 8Z" fill="#DC2626" />
              </svg>
              <div className="flex items-baseline">
                <span className="font-black text-xl tracking-tight text-red-600 leading-none">
                  ALPHA
                </span>
                <span className="font-bold text-xl tracking-tight text-slate-800 leading-none ml-0.5">
                  Housing
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-500 max-w-sm">
              First-time abroad housing platform designed for students and parents. We
              eliminate scams, simplify group roommate matching, and deliver verified
              safe apartments.
            </p>

            {/* Trust Badges matching screenshot */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Safe Lease Guarantee</span>
              </div>
              <Link
                href="/housing"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-semibold border border-rose-200 hover:bg-rose-100 transition-colors"
              >
                <span>Become a Partner</span>
              </Link>
            </div>
          </div>

          {/* Destinations (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Destinations
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/safety" className="hover:text-red-600 transition-colors">
                  Florence, Italy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Barcelona, Spain
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Paris, France
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Rome, Italy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Madrid, Spain
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Lisbon, Portugal
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Flow (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Platform & Flow
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/how-it-works" className="hover:text-red-600 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-red-600 transition-colors">
                  Safety & Emergency Guide
                </Link>
              </li>
              <li>
                <Link href="/daily-life" className="hover:text-red-600 transition-colors">
                  Daily Life
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-red-600 transition-colors">
                  Group Setup
                </Link>
              </li>
              <li>
                <Link href="/housing" className="hover:text-red-600 transition-colors">
                  Housing Plan Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Family / Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Trust & Family
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/dashboard?tab=parent" className="hover:text-red-600 transition-colors font-medium text-slate-700">
                    Parent Portal (Peace of Mind)
                  </Link>
                </li>
                <li>
                  <Link href="/housing" className="hover:text-red-600 transition-colors">
                    Compare Options
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-red-600 transition-colors">
                    Advisor & Roommate Chat
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-red-600 transition-colors">
                    Pricing Plans
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-red-600 transition-colors">
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter input */}
            <div className="pt-2">
              <form onSubmit={handleSubscribe} className="flex items-center gap-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter college or parent email"
                  required
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shrink-0 transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-emerald-600 flex items-center gap-1 mt-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed! We&apos;ll send Florence housing updates.</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2024 AlphaHousing Technologies, Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-slate-600 transition-colors">
              Terms and Conditions
            </Link>
            <Link href="/" className="hover:text-slate-600 transition-colors">
              Student Housing Directory
            </Link>
            <Link href="/safety" className="hover:text-slate-600 transition-colors">
              Safety Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
