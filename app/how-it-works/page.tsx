"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Check,
  CheckCircle2,
  X
} from "lucide-react";
import { usePlanModal } from "../components/PlanModalContext";

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  thumbnail: string;
  actionText: string;
  actionHref: string;
  isCheck?: boolean;
  modalDetails?: {
    highlight: string;
    tips: string[];
  };
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Tell us about your semester",
    description: "City, university, dates, group size and preferences.",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
    actionText: "Open Group Setup",
    actionHref: "/create-plan",
    modalDetails: {
      highlight: "Semester & Roommate Group Alignment",
      tips: [
        "Select your study abroad program campus (e.g. NYU Florence, Syracuse, FSU, Richmond, Harding).",
        "Invite your roommates to pool individual budgets into a combined verified housing search.",
        "Set desired bedroom count, shared vs private bathrooms, and maximum walk distance to campus."
      ],
    },
  },
  {
    number: 2,
    title: "Get your personalized guidance",
    description: "We help you understand neighborhoods, commute times, local areas, and housing considerations.",
    thumbnail: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80",
    actionText: "Explore Areas",
    actionHref: "/safety",
    modalDetails: {
      highlight: "Florentine Neighborhood Intelligence",
      tips: [
        "Compare safety metrics, pedestrian corridors, and evening transit between Santa Croce, San Lorenzo, and Oltrarno.",
        "Commute calculator maps door-to-door transit time via electric light rail T1/T2 and bike paths.",
        "Local supermarket and grocery proximity insights for easy day-to-day student living."
      ],
    },
  },
  {
    number: 3,
    title: "We identify potential housing options",
    description: "From trusted providers and other authorized sources.",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80",
    actionText: "View Housing Options",
    actionHref: "/housing",
    modalDetails: {
      highlight: "Vetted Landlord & Agency Portfolio",
      tips: [
        "Every listing is cross-referenced with the Italian Chamber of Commerce (Camera di Commercio).",
        "Pre-verified student leases matching official Italian Contratto Transitorio per Studenti standards.",
        "High-definition interior photography, certified floor plans, and air-conditioning verification."
      ],
    },
  },
  {
    number: 4,
    title: "We handle communication",
    description: "We contact property managers, request availability, and follow up on your behalf.",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    actionText: "Communications Portal",
    actionHref: "/create-plan",
    modalDetails: {
      highlight: "Bilingual English & Italian Concierge",
      tips: [
        "No foreign language barriers: our Florence on-the-ground team liaises directly with landlords in Italian.",
        "Availability requests, price lock confirmations, and move-in date alignment handled seamlessly.",
        "Transparent fee disclosures upfront with zero hidden administrative surprises."
      ],
    },
  },
  {
    number: 5,
    title: "Stay informed",
    description: "View updates on provider responses, availability and next steps in your dashboard.",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    actionText: "Open Parent Dashboard",
    actionHref: "/parent-portal",
    modalDetails: {
      highlight: "Live Real-Time Status & Family Transparency",
      tips: [
        "Track landlord response times, viewing schedule updates, and deposit timelines in one place.",
        "Parent Portal access gives families full visibility and peace of mind without micromangement.",
        "Direct chat support with our certified European student housing specialists."
      ],
    },
  },
  {
    number: 6,
    title: "You make the decision",
    description: "Review the information and choose the option that works best for you.",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80",
    actionText: "Compare & Decide",
    actionHref: "/housing",
    isCheck: true,
    modalDetails: {
      highlight: "Secure Escrow & Confirmed Move-In",
      tips: [
        "Compare top finalist flats side-by-side on rent per roommate, utility caps, and commute minutes.",
        "Protected escrow security deposit transfer guarantees apartment keys upon your arrival in Florence.",
        "Arrival onboarding guide with check-in instructions, Wi-Fi keys, and emergency local contacts."
      ],
    },
  },
];

export default function HowItWorksPage() {
  const router = useRouter();
  const { openPlanModal } = usePlanModal();
  const [activeStepModal, setActiveStepModal] = useState<ProcessStep | null>(null);

  const handleActionClick = (step: ProcessStep, e: React.MouseEvent) => {
    e.stopPropagation();
    if (step.actionHref === "/create-plan") {
      openPlanModal();
    } else {
      router.push(step.actionHref);
    }
  };

  return (
    <div className="flex flex-col w-full bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION - BRIGHT & CRISP MATCHING SCREENSHOT */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full bg-slate-900 text-white overflow-hidden py-16 sm:py-24 text-center">
        {/* Leaning Tower of Pisa Background Photo in full natural daylight brightness */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/pisa_banner.jpg"
            alt="Study Abroad Background - Leaning Tower of Pisa"
            fill
            priority
            className="object-cover object-center md:object-[center_35%] scale-100 brightness-[1.03] contrast-[1.02]"
          />
          {/* Subtle natural daylight gradient for text legibility while keeping the sky bright and sunlit */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/20 to-transparent z-1" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/25 to-transparent z-1" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tag Capsule matching screenshot */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-[11px] font-semibold tracking-wider uppercase shadow-xs mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>THE STUDY ABROAD HOUSING ROADMAP</span>
          </div>

          {/* Heading matching screenshot */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            How AlphaAbroadeez Works
          </h1>

          {/* Subtitle matching screenshot */}
          <p className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed max-w-2xl mx-auto mb-8 font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            From picking roommates to unpacking your bags in Florence. Simple, transparent, scam-free housing guidance for college students and families.
          </p>

          {/* 2 Centered Buttons matching screenshot */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => openPlanModal()}
              className="py-3 px-6 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Start Your Housing Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/housing"
              className="py-3 px-6 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Browse Verified Apartments</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. STEP-BY-STEP PROCESS TIMELINE SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-12 sm:py-16 bg-white dark:bg-[#0B0F17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header matching screenshot */}
          <div className="text-left mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              A Simple Process <span className="text-[#DC2626]">for Peace of Mind</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              We guide you through every step — from understanding where to live, to communication with property providers, to staying supported.
            </p>
          </div>

          {/* Vertical Step Timeline Container with red connecting line */}
          <div className="relative space-y-3.5 sm:space-y-4">
            {/* Vertical Red Connecting Line */}
            <div className="absolute left-[13px] sm:left-[15px] top-6 bottom-6 w-[2px] bg-red-200 dark:bg-red-950/60 z-0" />

            {/* Step Rows */}
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="relative z-10 flex items-center gap-3 sm:gap-4 group"
              >
                {/* Step Circle Badge */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ring-4 ring-white dark:ring-[#0B0F17] transition-transform group-hover:scale-105`}
                >
                  {step.isCheck ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>

                {/* Step Card */}
                <div
                  onClick={() => setActiveStepModal(step)}
                  className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3 sm:p-3.5 shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 flex-1 text-left"
                >
                  {/* Left: Thumbnail & Text */}
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <div className="relative w-12 h-10 sm:w-14 sm:h-11 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={step.thumbnail}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-red-600 transition-colors truncate">
                        {step.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-1">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Action Link */}
                  <button
                    onClick={(e) => handleActionClick(step, e)}
                    className="text-[11px] sm:text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 transition-colors shrink-0 whitespace-nowrap self-end sm:self-center cursor-pointer"
                  >
                    <span>{step.actionText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* 3. BOTTOM CTA BAR MATCHING SCREENSHOT */}
          {/* ------------------------------------------------------------- */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 sm:pt-10 mt-6 border-t border-slate-100 dark:border-slate-800/80">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-left">
              Have questions about our housing process or study abroad guarantees?
            </p>
            <button
              onClick={() => openPlanModal()}
              className="py-2.5 px-5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold text-xs shadow-md shadow-red-600/25 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Start Your Housing Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. INTERACTIVE STEP DETAIL MODAL */}
      {/* ------------------------------------------------------------- */}
      {activeStepModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#111827] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {activeStepModal.isCheck ? <Check className="w-4 h-4 stroke-[3]" /> : activeStepModal.number}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {activeStepModal.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {activeStepModal.modalDetails?.highlight}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveStepModal(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-2.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                Step Key Features
              </p>
              <div className="space-y-2">
                {activeStepModal.modalDetails?.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setActiveStepModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={(e) => {
                  setActiveStepModal(null);
                  handleActionClick(activeStepModal, e);
                }}
                className="px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold text-xs shadow-sm shadow-red-600/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{activeStepModal.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
