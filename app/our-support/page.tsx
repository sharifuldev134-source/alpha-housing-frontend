"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Heart,
  Search,
  Users,
  Headphones,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";
import { usePlanModal } from "../components/PlanModalContext";

export default function OurSupportPage() {
  const router = useRouter();
  const { openPlanModal } = usePlanModal();

  return (
    <div className="flex flex-col w-full">
      {/* ============================================================= */}
      {/* 1. HERO BANNER                                                */}
      {/* ============================================================= */}
      <section className="relative w-full bg-slate-900 text-white overflow-visible">
        {/* Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/pisa_banner.jpg"
            alt="Support for your housing journey"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/25 to-slate-950/35 z-1" />
        </div>

        {/* Content — left-aligned */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-20 sm:pb-24 text-left">
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
          <p className="text-xs sm:text-sm text-slate-100/95 leading-relaxed max-w-xl font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            Choose the level of support that&apos;s right for you and your family. Whether you&apos;re just getting started, comparing options with other students, or would like more hands-on assistance, we&apos;re here to help.
          </p>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 2. HOW WE CAN SUPPORT YOU                                     */}
      {/* ============================================================= */}
      <section className="pt-14 sm:pt-18 pb-10 sm:pb-14 bg-white dark:bg-[#0B0F17]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Section Header */}
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-slate-900 dark:text-white tracking-tight">
            How We Can Support You
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 mt-2.5 max-w-xl mx-auto leading-relaxed">
            Flexible options designed for students and parents at every stage of the housing process.
          </p>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-10 sm:mt-12 text-left items-stretch">
            {/* ====================================================== */}
            {/* CARD 1: Explore & Prepare                               */}
            {/* ====================================================== */}
            <div className="rounded-[28px] sm:rounded-[32px] bg-[#F8FAFD] dark:bg-[#111827] border border-[#DCE7F6] dark:border-blue-900/40 p-6 sm:p-7 flex flex-col shadow-xs hover:shadow-md transition-all min-h-[420px] sm:min-h-[440px]">
              {/* Header: icon left, badge right */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#E1EDFB] dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5" strokeWidth={2} />
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] dark:bg-blue-950/70 text-[#1D4ED8] dark:text-blue-400 text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider whitespace-nowrap">
                  EXPLORE
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight mb-1.5">
                Explore &amp; Prepare
              </h3>

              {/* Description */}
              <p className="text-[11.5px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal mb-4">
                Get the information and tools you need to start your housing search.
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-[#E2EDFA] dark:bg-blue-900/40 mb-4 sm:mb-5" />

              {/* Checklist */}
              <div className="space-y-3 sm:space-y-3.5 flex-1">
                {[
                  "Housing guides and planning resources",
                  "Neighborhood and area information",
                  "Student tips for living in Florence",
                  "Browse housing options and save favorites",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">{item}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={() => router.push("/housing")}
                className="w-full mt-6 py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ====================================================== */}
            {/* CARD 2: Plan Together (MOST POPULAR)                    */}
            {/* ====================================================== */}
            <div className="relative rounded-[28px] sm:rounded-[32px] bg-white dark:bg-[#111827] border-2 border-[#DC2626] dark:border-red-700 p-6 sm:p-7 flex flex-col shadow-lg hover:shadow-xl transition-all min-h-[420px] sm:min-h-[440px]">
              {/* Most Popular badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#DC2626] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-md whitespace-nowrap">
                  <Star className="w-3 h-3 fill-white" />
                  MOST POPULAR
                </span>
              </div>

              {/* Header: icon left, badge right */}
              <div className="flex items-start justify-between mb-3 mt-2">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FEE2E2] dark:bg-rose-950/60 text-[#DC2626] dark:text-rose-400 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" strokeWidth={2} />
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#FEE2E2] dark:bg-rose-950/70 text-[#DC2626] dark:text-rose-400 text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider whitespace-nowrap">
                  COLLABORATE
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight mb-1.5">
                Plan Together
              </h3>

              {/* Description */}
              <p className="text-[11.5px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal mb-4">
                Coordinate housing with your roommates and keep parents in the loop.
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-[#FCE7E7] dark:bg-rose-900/40 mb-4 sm:mb-5" />

              {/* Checklist */}
              <div className="space-y-3 sm:space-y-3.5 flex-1">
                {[
                  "Everything in Explore & Prepare",
                  "Group coordination and shared planning tools",
                  "Guidance on rental terms and what to look for",
                  "Parent access to key updates and information",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">{item}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={() => openPlanModal()}
                className="w-full mt-6 py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Plan with Your Group</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ====================================================== */}
            {/* CARD 3: Concierge Support                               */}
            {/* ====================================================== */}
            <div className="rounded-[28px] sm:rounded-[32px] bg-[#F8FAFD] dark:bg-[#111827] border border-[#DCE7F6] dark:border-slate-800 p-6 sm:p-7 flex flex-col shadow-xs hover:shadow-md transition-all min-h-[420px] sm:min-h-[440px]">
              {/* Header: icon left, badge right */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FEE2E2] dark:bg-rose-950/60 text-[#DC2626] dark:text-rose-400 flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" strokeWidth={2} />
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#FEE2E2] dark:bg-rose-950/70 text-[#DC2626] dark:text-rose-400 text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider whitespace-nowrap">
                  FULL SUPPORT
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight mb-1.5">
                Concierge Support
              </h3>

              {/* Description */}
              <p className="text-[11.5px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal mb-4">
                Personal, hands-on assistance from our Florence housing team.
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-[#E2EDFA] dark:bg-slate-800 mb-4 sm:mb-5" />

              {/* Checklist */}
              <div className="space-y-3 sm:space-y-3.5 flex-1">
                {[
                  "Everything in Plan Together",
                  "One-on-one guidance from a local team",
                  "In-person move-in walk-through (when available)",
                  "Assistance with key registration and utility information",
                  "Priority support throughout your stay",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">{item}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={() => openPlanModal()}
                className="w-full mt-6 py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm bg-[#1E293B] hover:bg-[#0F172A] text-white shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Talk with Our Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 3. BOTTOM PILL BAR — 4 Features                               */}
      {/* ============================================================= */}
      <section className="pb-12 sm:pb-16 bg-white dark:bg-[#0B0F17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#111827] rounded-2xl sm:rounded-full py-3.5 px-6 sm:px-8 shadow-lg border border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
            {/* Feature 1 */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
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
              <div className="w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                <CheckCircle className="w-4 h-4" />
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
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
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
              <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-500 dark:text-rose-400 shrink-0">
                <Headphones className="w-4 h-4" />
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
      </section>
    </div>
  );
}

