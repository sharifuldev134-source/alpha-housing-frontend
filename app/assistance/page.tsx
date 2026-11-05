"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Heart,
  Users,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Search,
  Headphones,
} from "lucide-react";
import { usePlanModal } from "../components/PlanModalContext";

export default function AssistancePage() {
  const router = useRouter();
  const { openPlanModal } = usePlanModal();

  return (
    <div className="flex flex-col w-full bg-white dark:bg-[#0B0F17]">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO BANNER SECTION (Matching Screenshot 2) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full bg-slate-900 text-white overflow-hidden text-center">
        {/* Leaning Tower of Pisa Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/pisa_banner.jpg"
            alt="Study Abroad Housing Journey in Florence"
            fill
            priority
            className="object-cover object-center scale-100"
          />
          {/* Subtle gradient overlay for clean legibility while maintaining sunlit photo brightness */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/20 to-slate-950/35 z-1" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-semibold tracking-wider uppercase mb-5 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-white/90" />
            <span>SUPPORT FOR YOUR STUDY ABROAD HOUSING JOURNEY</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            Guidance, Support, and <br className="hidden sm:inline" />
            <span className="text-[#E52535]">Peace of Mind in Florence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-100/95 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            Choose the level of support that&apos;s right for you and your family. Whether you&apos;re just getting started, comparing options with other students, or would like more hands-on assistance, we&apos;re here to help.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN SECTION: HOW WE CAN SUPPORT YOU & 3 CARDS */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-14 sm:pt-16 pb-16 sm:pb-24 bg-white dark:bg-[#0B0F17]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Section Header */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How We Can Support You
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
            Flexible options designed for students and parents at every stage of the housing process.
          </p>

          {/* 3 Support Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 mt-10 sm:mt-12 text-left items-stretch">
            {/* ======================================================== */}
            {/* CARD 1: Explore & Prepare */}
            {/* ======================================================== */}
            <div className="rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Search className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        Explore &amp; Prepare
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Get the information and tools you need to start your housing search.
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60 text-[9px] font-bold uppercase tracking-wider shrink-0">
                    EXPLORE
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-2 pb-6">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>Housing guides and planning resources</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>Neighborhood and area information</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>Student tips for living in Florence</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>Browse housing options and save favorites</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => router.push("/housing")}
                  className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-white hover:bg-slate-50 text-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Start Exploring</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ======================================================== */}
            {/* CARD 2: Plan Together (MOST POPULAR) */}
            {/* ======================================================== */}
            <div className="relative rounded-3xl bg-white dark:bg-[#111827] border-2 border-red-500 p-6 sm:p-7 flex flex-col justify-between shadow-lg shadow-red-500/5 transition-all">
              {/* Overlapping Top Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-0.5 rounded-full bg-[#E52535] text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1">
                  ★ MOST POPULAR
                </span>
              </div>

              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-5 mt-1">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        Plan Together
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Coordinate housing with your roommates and keep parents in the loop.
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60 text-[9px] font-bold uppercase tracking-wider shrink-0">
                    COLLABORATE
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-2 pb-6">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>Everything in Explore &amp; Prepare</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>Group coordination and shared planning tools</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>Guidance on rental terms and what to look for</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>Parent access to key updates and information</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => openPlanModal()}
                  className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#E52535] hover:bg-[#C8102E] text-white shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Plan with Your Group</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ======================================================== */}
            {/* CARD 3: Concierge Support */}
            {/* ======================================================== */}
            <div className="rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Headphones className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        Concierge Support
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Personal, hands-on assistance from our Florence housing team.
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60 text-[9px] font-bold uppercase tracking-wider shrink-0">
                    FULL SUPPORT
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-2 pb-6">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>Everything in Plan Together</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>One-on-one guidance from a local team</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>In-person move-in walk-through (when available)</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>Assistance with key registration and utility information</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>Priority support throughout your stay</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => router.push("/get-help")}
                  className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#0B1528] hover:bg-slate-800 text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Talk with Our Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 3. BOTTOM 4-FEATURE PILL BAR (Matching Screenshot 2 Position) */}
          {/* ======================================================== */}
          <div className="mt-10 sm:mt-12 text-left">
            <div className="rounded-2xl sm:rounded-full bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100/80 dark:border-blue-900/40 py-3.5 px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Feature 1 */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-100/70 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    Student-Focused Support
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Guidance built for study abroad needs
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-100/70 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    Transparent &amp; Simple
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Clear options, no hidden fees
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-100/70 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    For Students and Parents
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Stay informed and involved
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-100/70 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    Local Knowledge
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Support from a team in Florence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
