"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Heart,
  Users,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  Laptop,
  Home,
  Info,
} from "lucide-react";
import { usePlanModal } from "./PlanModalContext";

interface PricingSectionProps {
  className?: string;
  onSelectPlan?: (planId: string) => void;
}

export default function PricingSection({
  className = "",
  onSelectPlan,
}: PricingSectionProps) {
  const router = useRouter();
  const { openPlanModal } = usePlanModal();

  const handlePlanClick = (planId: string) => {
    if (onSelectPlan) {
      onSelectPlan(planId);
      return;
    }
    if (planId === "free") {
      router.push("/housing");
    } else {
      router.push("/get-help");
    }
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO BANNER SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full bg-slate-900 text-white overflow-hidden">
        {/* Leaning Tower of Pisa Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/pisa_banner.jpg"
            alt="Housing Guidance in Florence"
            fill
            priority
            className="object-cover object-center scale-100"
          />
          {/* Subtle gradient overlay to enhance legibility while keeping the sky bright and sunlit */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/25 to-slate-950/35 z-1" />
        </div>

        {/* Hero Content — LEFT-ALIGNED to match screenshot */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-semibold tracking-wider uppercase mb-5 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-white/90" />
            <span>HOUSING GUIDANCE &amp; PERSONAL ASSISTANCE</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            Personal Support for <br className="hidden sm:inline" />
            <span className="text-[#E52535]">Your Housing Journey in Florence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-100/95 leading-relaxed max-w-xl font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)] mb-8 sm:mb-10">
            Whether you&apos;re just starting your search, already have a housing option, or need help with communication and next steps, our team is here to provide guidance, coordination, and peace of mind.
          </p>

          {/* 4-Feature Pill Bar (Inside Banner) */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl sm:rounded-full py-3.5 px-6 sm:px-8 shadow-xl border border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
            {/* Feature 1 */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  Experienced Guidance
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  Real support from a team who knows Florence
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  Local Insight
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  Neighborhoods, transportation, and student life
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  Communication Support
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  Help with landlords and housing providers
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-500 dark:text-rose-400 shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  Parent-Focused
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  Clear answers, timely updates, and peace of mind
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN SECTION: HOW WE CAN HELP (Exact Match to Screenshot) */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-14 sm:pt-16 pb-16 sm:pb-24 bg-white dark:bg-[#0B0F17]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Section Header */}
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-slate-900 dark:text-white tracking-tight">
            How We Can Help
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 mt-2.5 max-w-xl mx-auto leading-relaxed">
            Choose the support that fits your needs. Not sure which is right for you? Contact our team — we&apos;re happy to help you decide.
          </p>

          {/* 3 Pricing / Support Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-10 sm:mt-12 text-left items-stretch">
            {/* ======================================================== */}
            {/* CARD 1: Explore & Learn (Self-Guided) */}
            {/* ======================================================== */}
            <div className="rounded-[28px] sm:rounded-[32px] bg-[#F8FAFD] dark:bg-[#111827] border border-[#DCE7F6] dark:border-blue-900/40 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all h-full min-h-[500px] sm:min-h-[520px]">
              <div>
                {/* Header: Icon on left, Title + Badge on right */}
                <div className="flex items-start gap-3 sm:gap-3.5 mb-2">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#E1EDFB] dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Laptop className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1.5">
                      <h3 className="text-base sm:text-[17px] font-bold text-slate-900 dark:text-white leading-tight">
                        Explore &amp; Learn
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-[#EFF6FF] dark:bg-blue-950/70 text-[#1D4ED8] dark:text-blue-400 text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider shrink-0 mt-0.5 whitespace-nowrap">
                        SELF-GUIDED
                      </span>
                    </div>
                    <p className="text-[11.5px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-normal">
                      Get helpful information, tools, and resources to plan with confidence.
                    </p>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="w-full h-px bg-[#E2EDFA] dark:bg-blue-900/40 my-4 sm:my-5" />
              </div>

              {/* Checklist & Price Section */}
              <div className="flex items-end justify-between gap-2.5 pt-1 pb-5 flex-1">
                {/* Features List */}
                <div className="space-y-3 sm:space-y-3.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">
                      <p>Neighborhood and area guides</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">
                      <p>Housing search tips and planning</p>
                      <p>resources</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">
                      <p>Student life and everyday living</p>
                      <p>information</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center shrink-0 self-end pb-1 pl-1">
                  <span className="text-3xl sm:text-[34px] lg:text-[38px] font-extrabold text-[#0F172A] dark:text-white tracking-tight block leading-none">
                    $0
                  </span>
                  <span className="text-[10.5px] sm:text-[11.5px] text-slate-500 dark:text-slate-400 font-medium block mt-1 leading-snug">
                    Free access
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handlePlanClick("free")}
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm bg-[#EDF4FE] hover:bg-blue-100 text-[#1E40AF] border border-[#D5E3F9] dark:bg-blue-950/50 dark:border-blue-900/60 dark:text-blue-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
              >
                <span>Explore Housing Resources</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ======================================================== */}
            {/* CARD 2: Already Have Housing ? (Targeted Support) */}
            {/* ======================================================== */}
            <div className="rounded-[28px] sm:rounded-[32px] bg-[#FFFDF8] dark:bg-[#111827] border border-[#FDE68A] dark:border-amber-900/40 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all h-full min-h-[500px] sm:min-h-[520px]">
              <div>
                {/* Header: Icon on left, Title + Badge on right */}
                <div className="flex items-start gap-3 sm:gap-3.5 mb-2">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FFF6D5] dark:bg-amber-950/60 text-[#D97706] dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={2.2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1.5">
                      <h3 className="text-base sm:text-[17px] font-bold text-slate-900 dark:text-white leading-tight">
                        Already Have <br />
                        Housing ?
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-[#FEF3C7] dark:bg-amber-950/70 text-[#92400E] dark:text-amber-300 text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider shrink-0 mt-0.5 whitespace-nowrap">
                        TARGETED SUPPORT
                      </span>
                    </div>
                    <p className="text-[11.5px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-normal">
                      You&apos;ve found a housing option but need help moving forward? We can assist with communication, clarify details, and help resolve common issues.
                    </p>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="w-full h-px bg-[#FFF4CC] dark:bg-amber-900/40 my-4 sm:my-5" />
              </div>

              {/* Checklist & Price Section */}
              <div className="flex items-end justify-between gap-2.5 pt-1 pb-5 flex-1">
                {/* Features List */}
                <div className="space-y-3 sm:space-y-3.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">
                      <p>Communication with landlords or</p>
                      <p>housing providers</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">
                      <p>Confirm availability and booking</p>
                      <p>details</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">
                      <p>Help with questions, changes, or</p>
                      <p>next steps</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">
                      <p>Guidance on rental terms and what</p>
                      <p>to expect</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center shrink-0 self-end pb-1 pl-1">
                  <span className="text-3xl sm:text-[34px] lg:text-[38px] font-extrabold text-[#0F172A] dark:text-white tracking-tight block leading-none">
                    $195
                  </span>
                  <span className="text-[10.5px] sm:text-[11.5px] text-slate-600 dark:text-slate-400 font-semibold block mt-1 leading-snug">
                    Per family or <br />
                    housing request
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handlePlanClick("targeted-support")}
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm bg-[#FEF0C7] hover:bg-[#FDE68A] text-[#78350F] border border-[#FDE68A] dark:bg-amber-950/60 dark:hover:bg-amber-900/70 dark:text-amber-200 dark:border-amber-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs mt-auto"
              >
                <span>Get Housing Support</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ======================================================== */}
            {/* CARD 3: Need Help Finding Housing ? (Fuller Assistance) */}
            {/* ======================================================== */}
            <div className="rounded-[28px] sm:rounded-[32px] bg-[#FFF9F9] dark:bg-[#111827] border border-[#FCE7E7] dark:border-rose-900/40 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all h-full min-h-[500px] sm:min-h-[520px]">
              <div>
                {/* Header: Icon on left, Title + Badge on right */}
                <div className="flex items-start gap-3 sm:gap-3.5 mb-2">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FEE2E2] dark:bg-rose-950/60 text-[#DC2626] dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Home className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1.5">
                      <h3 className="text-base sm:text-[17px] font-bold text-slate-900 dark:text-white leading-tight">
                        Need Help Finding <br />
                        Housing ?
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-[#FEE2E2] dark:bg-rose-950/70 text-[#DC2626] dark:text-rose-400 text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider shrink-0 mt-0.5 whitespace-nowrap">
                        FULLER ASSISTANCE
                      </span>
                    </div>
                    <p className="text-[11.5px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-normal">
                      Want more hands-on support? We&apos;ll work with you to understand your needs, explore suitable options, and provide personalized recommendations.
                    </p>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="w-full h-px bg-[#FCE7E7] dark:bg-rose-900/40 my-4 sm:my-5" />
              </div>

              {/* Checklist & Price Section */}
              <div className="flex items-end justify-between gap-2.5 pt-1 pb-5 flex-1">
                {/* Features List */}
                <div className="space-y-3 sm:space-y-3.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">
                      <p>Group needs consultation (e.g., 3-5</p>
                      <p>students)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">
                      <p>Neighborhood guidance and option</p>
                      <p>research</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">
                      <p>Shortlist of suitable housing options</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">
                      <p>Agreed provider outreach and</p>
                      <p>follow-up</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#00BC7D] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 7.5 5.5 10 11 4.5" />
                      </svg>
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-slate-700 dark:text-slate-300 leading-snug font-normal">
                      <p>Final recommendations and next</p>
                      <p>steps</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center shrink-0 self-end pb-1 pl-1">
                  <span className="text-3xl sm:text-[34px] lg:text-[38px] font-extrabold text-[#0F172A] dark:text-white tracking-tight block leading-none">
                    $495
                  </span>
                  <span className="text-[10.5px] sm:text-[11.5px] text-slate-600 dark:text-slate-400 font-semibold block mt-1 leading-snug">
                    Per group One-<br />time
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handlePlanClick("full-assistance")}
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
              >
                <span>Request Full Assistance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* IMPORTANT TO KNOW (DISCLAIMER BANNER - EXACT SS MATCH) */}
          {/* ======================================================== */}
          <div className="mt-10 sm:mt-12 text-left">
            <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center gap-4 text-left shadow-2xs">
              <div className="flex items-center gap-2 shrink-0 md:pr-4 md:border-r border-slate-200 dark:border-slate-800">
                <div className="w-4.5 h-4.5 rounded-full border border-blue-500 flex items-center justify-center text-blue-500 shrink-0">
                  <Info className="w-3 h-3" />
                </div>
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white whitespace-nowrap">
                  Important to Know
                </span>
              </div>
              <p className="text-[11.5px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                AlphaHousing provides housing research, guidance, and coordination assistance. We do{" "}
                <strong className="font-bold text-slate-900 dark:text-white">not</strong>{" "}
                guarantee that a specific apartment will be found, that a property will be available, or that a booking will be completed. Families make their own housing decisions and arrange any agreements or payments directly with housing providers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
