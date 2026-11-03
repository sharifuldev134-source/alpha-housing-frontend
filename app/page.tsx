"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Users,
  ArrowRight,
  ShieldCheck,
  Building2,
  BrainCircuit,
  Eye,
  ChevronRight,
  HelpCircle,
  Search,
  MessageSquare,
  FileCheck2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  CITIES_DATA,
  FAQS_DATA
} from "./data/housingData";
import FaqAccordion from "./components/FaqAccordion";
import { usePlanModal } from "./components/PlanModalContext";

// 4 Steps for Home Page strictly matching screenshot
const HOME_FOUR_STEPS = [
  {
    number: "01",
    title: "Group & Pocket Budget",
    description: "Add 2-5 roommates. Each person sets their private monthly budget without awkward money conversations.",
    stepText: "Step 1 of 4 →",
    iconBg: "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400",
    icon: Users,
  },
  {
    number: "02",
    title: "Campus & Commute",
    description: "Pin your study center (FSU Florence, NYU, Syracuse). Set your walking or tram limit so you are never late.",
    stepText: "Step 2 of 4 →",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Verified 3-5 Bed Flats",
    description: "Explore vetted apartments in top student neighborhoods like Santa Croce and Santo Spirito with zero scams.",
    stepText: "Step 3 of 4 →",
    iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",
    icon: Building2,
  },
  {
    number: "04",
    title: "Alpha Check™ AI Audit",
    description: "Instant Italian lease compliance audit, transparent student reviews, and one-click Parent Portal sign-off.",
    stepText: "Step 4 of 4 →",
    iconBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400",
    icon: FileCheck2,
  },
];

export default function HomePage() {
  const router = useRouter();
  const { openPlanModal } = usePlanModal();

  return (
    <div className="flex flex-col w-full bg-white dark:bg-[#0B0F17]">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-visible bg-slate-900 pb-16 sm:pb-20">
        {/* Leaning Tower of Pisa Background Photo */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/pisa_banner.jpg"
            alt="Study Abroad Background - Leaning Tower of Pisa"
            fill
            priority
            className="object-cover object-center md:object-[center_35%] scale-100 transition-transform duration-700"
          />
          {/* Subtle natural gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-black/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-0 text-left flex flex-col items-start">
          {/* Registration Announcement Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs font-semibold tracking-wide uppercase shadow-sm mb-5 animate-in fade-in slide-in-from-top-3 duration-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>SPRING &amp; FALL 2027 HOUSING REGISTRATIONS OPEN</span>
          </div>

          {/* Hero Title - Exact match to screenshot */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight max-w-4xl leading-[1.12] mb-3">
            <span className="text-white block">Finding housing abroad is one thing.</span>
            <span className="text-[#E52535] block mt-1">
              Figuring it all out is another.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200/90 max-w-2xl font-normal leading-relaxed mb-8">
            AI-powered housing guidance, group planning, and real support for students and parents.
          </p>

          {/* Two Action Cards Grid - Replaces old search form */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Card 1: We haven't found housing yet */}
            <div className="bg-white dark:bg-[#111827] rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between group hover:shadow-3xl transition-all">
              <div>
                {/* Photo container */}
                <div className="relative aspect-[16/7] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src="/images/cinque_terre_banner.jpg"
                    alt="Italian Coastline - Explore student housing"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Search Icon overlay */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md">
                    <Search className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-4 mb-1">
                  We haven&apos;t found housing yet
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                  Explore options with our guidance and support.
                </p>
              </div>

              <button
                onClick={() => router.push("/find-housing")}
                className="w-full py-2.5 px-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Find Housing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: We've found housing, but need help */}
            <div className="bg-white dark:bg-[#111827] rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between group hover:shadow-3xl transition-all">
              <div>
                {/* Photo container */}
                <div className="relative aspect-[16/7] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                    alt="Students studying together"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Message / Support Icon overlay */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-4 mb-1">
                  We&apos;ve found housing, but need help
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                  Let our team handle the communication and next steps.
                </p>
              </div>

              <button
                onClick={() => router.push("/get-help")}
                className="w-full py-2.5 px-4 rounded-xl bg-[#C8102E] hover:bg-[#A60D25] text-white font-semibold text-xs shadow-md shadow-red-600/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Get Help Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 5 Value Props Bar Floating Below Cards */}
          <div className="w-full -mb-10 sm:-mb-12 relative z-20 mt-6 pt-3.5 pb-3 px-4 sm:px-6 rounded-2xl bg-white dark:bg-[#111827] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-left">
            <div className="flex items-center gap-2 p-1">
              <div className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">City intelligence</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">rich neighbourhood insights</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-1">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">Group planning</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">and budget pools</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-1">
              <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">Real housing options</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">from trusted sources</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-1">
              <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">AI advisor</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">with human assistance</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-1 col-span-2 sm:col-span-1">
              <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">Parent visibility</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">and peace of mind</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: POPULAR STUDY ABROAD CITIES */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-20 sm:pt-24 pb-16 sm:pb-20 bg-white dark:bg-[#0B0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
                EXPLORE DESTINATIONS
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Popular Study Abroad Cities
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Curated neighborhood safety ratings, university commute times, and group housing databases.
              </p>
            </div>
            <Link
              href="/safety"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 hover:underline"
            >
              <span>Browse all cities</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* City Grid (6 cards) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {CITIES_DATA.map((city) => {
              const isSelected = city.id === "florence";
              return (
                <div
                  key={city.id}
                  className={`group relative bg-white dark:bg-[#111827] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col ${isSelected
                    ? "border-2 border-red-500 ring-2 ring-red-500/10 shadow-md"
                    : "border border-slate-200/90 dark:border-slate-800"
                    }`}
                >
                  {/* Photo container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    {/* Selected badge for Florence */}
                    {isSelected && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-red-600 text-white font-bold text-[10px] tracking-wide uppercase shadow-sm">
                        Selected
                      </span>
                    )}

                    <div className="absolute bottom-2.5 left-2.5 text-white">
                      <p className="font-bold text-sm tracking-tight leading-none drop-shadow-sm">{city.name}</p>
                      <p className="text-[11px] text-white/80">{city.country}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-3 flex flex-col flex-1 justify-between bg-white dark:bg-[#111827]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-medium text-slate-400">Rent avg.</span>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{city.avgRent}</p>
                    </div>
                    <Link
                      href={city.id === "florence" ? "/safety" : "#"}
                      onClick={(e) => {
                        if (city.id !== "florence") {
                          e.preventDefault();
                          openPlanModal({ city: `${city.name}, ${city.country}` });
                        }
                      }}
                      className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-red-600 hover:text-red-700"
                    >
                      <span>Plan in {city.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: HOW IT WORKS (4 Simple Steps) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#0B0F17] border-t border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/70 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            4 Simple Steps to Your Overseas Home
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            Effortlessly coordinate roommates, match budgets, and secure verified student apartments abroad.
          </p>

          {/* 4 Cards Grid - Matching screenshot exactly */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
            {HOME_FOUR_STEPS.map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
                >
                  <div>
                    {/* Header with step number & icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                        {step.number}
                      </span>
                      <span className={`w-7 h-7 rounded-full ${step.iconBg} flex items-center justify-center text-xs`}>
                        <StepIcon className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div
                    className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                    onClick={() => openPlanModal()}
                  >
                    <span>{step.stepText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => router.push("/create-plan")}
              className="py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-600/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Start Group Plan Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/how-it-works"
              className="py-3 px-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <span>View Full Guide</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: FREQUENTLY ASKED QUESTIONS */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#0B0F17] border-t border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/70 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-red-600" />
              <span>COMMON QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
              Everything students and parents need to know about housing safety in Italy.
            </p>
          </div>

          {/* FAQ Accordion */}
          <FaqAccordion items={FAQS_DATA} defaultOpenIndex={0} />

          {/* Personalized guidance callout - Dark Box matching screenshot */}
          <div className="mt-12 max-w-4xl mx-auto bg-[#0A0F1D] dark:bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-950/70 border border-red-800/60 text-red-400 text-[10px] font-bold uppercase tracking-wider">
                ✨ Need Personalized Guidance?
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Have questions about your specific program or dates?
              </h3>
              <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
                Our bilingual Italian student housing advisors can review your university dates and recommend safe neighborhoods.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => openPlanModal()}
                className="py-2.5 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md shadow-red-600/30 transition-all text-center cursor-pointer"
              >
                Start Housing Plan
              </button>
              <Link
                href="/safety"
                className="py-2.5 px-5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-white text-xs font-semibold transition-all text-center"
              >
                Safety Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
