"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { usePlanModal } from "./PlanModalContext";

interface PricingSectionProps {
  className?: string;
  onSelectPlan?: (planId: string) => void;
}

export default function PricingSection({ className = "", onSelectPlan }: PricingSectionProps) {
  const router = useRouter();
  const { openPlanModal } = usePlanModal();
  const [pricingMode, setPricingMode] = useState<"student" | "group">("student");

  const handlePlanClick = (planId: string) => {
    if (onSelectPlan) {
      onSelectPlan(planId);
      return;
    }
    if (planId === "free") {
      router.push("/signup?plan=free");
    } else if (planId === "group-pass") {
      router.push("/signup?plan=group-pass");
    } else {
      router.push("/signup?plan=white-glove");
    }
  };

  return (
    <section className={`py-12 sm:py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title & Subtitle - matching screenshot exactly */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Simple, Student-Friendly Plans
        </h2>
        <p className="text-sm text-slate-500 mt-2.5 max-w-xl mx-auto leading-relaxed">
          No hidden broker markups or surprise agency fees. One transparent price for total peace
          of mind.
        </p>

        {/* Pricing Toggle */}
        <div className="mt-8 inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 shadow-2xs">
          <button
            type="button"
            onClick={() => setPricingMode("student")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              pricingMode === "student"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Per Student
          </button>
          <button
            type="button"
            onClick={() => setPricingMode("group")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              pricingMode === "group"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Per Group Flat (Up to 5)
          </button>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 text-left max-w-6xl mx-auto items-stretch">
          
          {/* ======================================================== */}
          {/* CARD 1: FREE STARTER */}
          {/* ======================================================== */}
          <div className="rounded-[28px] bg-white border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Free Starter</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                  BASIC
                </span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">$0</span>
                <span className="text-xs text-slate-400 font-medium ml-1">/Free forever</span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed min-h-[36px]">
                Ideal for roommates exploring study abroad destinations and setting budgets.
              </p>

              {/* Features List */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3.5">
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Group budget pooling calculator</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>University commute &amp; transit maps</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Neighborhood safety &amp; student vibe guides</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Browse verified partner listings</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-2">
              <button
                type="button"
                onClick={() => handlePlanClick("free")}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#F1F5F9] hover:bg-slate-200 text-slate-800 transition-all cursor-pointer text-center"
              >
                Start for Free
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 2: ALPHA GROUP PASS (HIGHLIGHTED / MOST POPULAR) */}
          {/* ======================================================== */}
          <div className="relative rounded-[28px] bg-white border-2 border-red-500 p-7 sm:p-8 flex flex-col justify-between shadow-[0_12px_36px_rgba(239,68,68,0.12)] ring-4 ring-red-500/5 transition-all duration-300">
            {/* Overlapping Top Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="px-3.5 py-1 rounded-full bg-red-600 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-wider shadow-sm flex items-center gap-1">
                ★ MOST POPULAR
              </span>
            </div>

            <div>
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Alpha Group Pass</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200/80 text-[10px] font-bold uppercase tracking-wider">
                  RECOMMENDED
                </span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {pricingMode === "student" ? "$19" : "$49"}
                </span>
                <span className="text-xs text-slate-500 font-medium ml-1">
                  {pricingMode === "student" ? "/student / one-time" : "/group flat / one-time"}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed min-h-[36px]">
                Complete peace of mind for roommates and parents securing your overseas flat.
              </p>

              {/* Features List */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3.5">
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Everything in Free Starter</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                  <span className="font-bold text-slate-900">
                    Alpha Check™ AI Lease Audit (Contract &amp; Translations)
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                  <span className="font-bold text-slate-900">
                    Parent Portal read-only live safety &amp; booking review
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Anti-scam verification &amp; deposit escrow protection</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Dedicated priority student communication channel</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-2">
              <button
                type="button"
                onClick={() => handlePlanClick("group-pass")}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-md shadow-red-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Choose Group Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 3: WHITE-GLOVE */}
          {/* ======================================================== */}
          <div className="rounded-[28px] bg-white border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">White-Glove</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                  FULL SERVICE
                </span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {pricingMode === "student" ? "$99" : "$249"}
                </span>
                <span className="text-xs text-slate-500 font-medium ml-1">
                  {pricingMode === "student" ? "/student / one-time" : "/group flat / one-time"}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed min-h-[36px]">
                Dedicated in-person service in Italy for families wanting hands-on guidance.
              </p>

              {/* Features List */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3.5">
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Everything in Alpha Group Pass</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Personal bilingual Italian housing concierge</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>In-person move-in walk-through &amp; key inspection</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Codice Fiscale &amp; Italian utilities registration help</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>24/7 on-street emergency support liaison</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-2">
              <button
                type="button"
                onClick={() => handlePlanClick("white-glove")}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#0F172A] hover:bg-black text-white transition-all cursor-pointer text-center shadow-xs"
              >
                Select White-Glove
              </button>
            </div>
          </div>

        </div>

        {/* Bottom 100% Risk-Free Guarantee Banner */}
        <div className="mt-12 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-xs sm:text-[13px] text-[#065F46] font-medium shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong className="font-bold text-[#065F46]">100% Risk-Free Guarantee:</strong>{" "}
            Full refund if no verified matching apartment is found for your study abroad semester.
          </span>
        </div>
      </div>
    </section>
  );
}
