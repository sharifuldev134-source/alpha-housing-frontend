"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  ShieldCheck,
  Building2,
  BrainCircuit,
  Eye,
  FileCheck,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Heart,
} from "lucide-react";
import FaqAccordion from "../components/FaqAccordion";
import { usePlanModal } from "../components/PlanModalContext";

interface CityCardItem {
  id: string;
  name: string;
  country: string;
  avgRent: string;
  image: string;
  badge?: string;
  selected?: boolean;
}

const POPULAR_CITIES: CityCardItem[] = [
  {
    id: "florence",
    name: "Florence",
    country: "Italy",
    avgRent: "€950 - €1,100",
    badge: "Selected",
    selected: true,
    image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    avgRent: "€750 - €1,050",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    avgRent: "€850 - €1,200",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    avgRent: "€800 - €1,150",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "madrid",
    name: "Madrid",
    country: "Spain",
    avgRent: "€700 - €1,050",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    avgRent: "€650 - €950",
    image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=800&q=80",
  },
];

const SIMPLE_STEPS = [
  {
    number: "01",
    title: "Group & Pooled Budget",
    description: "Invite 2-5 roommates. Each person sets their private monthly budget without awkward money conversations.",
    icon: Users,
    iconColor: "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400",
    stepText: "Step 1 of 4",
  },
  {
    number: "02",
    title: "Campus & Commute",
    description: "Pin your study center (FSU, NYU, etc.) and calculate walking and transit times to potential apartments.",
    icon: MapPin,
    iconColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
    stepText: "Step 2 of 4",
  },
  {
    number: "03",
    title: "Verified 3-5 Bed Flats",
    description: "Explore hand-inspected apartments in safe neighborhoods matched to your group size and criteria.",
    icon: Building2,
    iconColor: "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
    stepText: "Step 3 of 4",
  },
  {
    number: "04",
    title: "Alpha Check™ AI Audit",
    description: "Instant Italian lease compliance audit, transparent move-in costs, and one-click Parent Portal sign-off.",
    icon: ShieldCheck,
    iconColor: "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
    stepText: "Step 4 of 4",
  },
];

const FAQS_LIST = [
  {
    id: "faq-1",
    question: "How does AlphaHousing protect students from Italian rental scams?",
    answer: "All listings are cross-checked with official Italian business registers (Camera di Commercio) and accredited local rental agencies. We prohibit wire-transfer advances and hold escrow until move-in day, eliminating wire-transfer scams.",
  },
  {
    id: "faq-2",
    question: "Can roommates have different monthly budgets in the same group?",
    answer: "Yes, each roommate privately enters their personal budget. Our algorithm pools group limits to surface apartments affordable for everyone without uncomfortable money conversations.",
  },
  {
    id: "faq-3",
    question: "What is an Italian \"Contratto Transitorio per Studenti\"?",
    answer: "It's the officially sanctioned Italian temporary student lease (1–36 months). It requires enrollment verification, guarantees tenant legal protections, and caps utility price gouging.",
  },
  {
    id: "faq-4",
    question: "How does the Parent Portal work for our families?",
    answer: "Parents can view verified lease terms, landlord credentials, neighborhood safety scores, and confirm payment schedules with complete peace of mind.",
  },
  {
    id: "faq-5",
    question: "Are utility bills (gas, electricity, Wi-Fi) included in the rent?",
    answer: "Leases specify whether utilities are flat-rate or sub-metered. AlphaHousing audits all listings so you know the exact average monthly utility costs before booking.",
  },
];

export default function FindHousingPage() {
  const router = useRouter();
  const { openPlanModal } = usePlanModal();

  // Search filter states
  const [selectedCity, setSelectedCity] = useState("Florence, Italy");
  const [selectedSemester, setSelectedSemester] = useState("Spring 2027");
  const [selectedStudents, setSelectedStudents] = useState(4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/create-plan");
  };

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
          {/* Subtle natural gradient vignette for text legibility while preserving vibrant teal sky and architecture */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/25 to-black/35" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/15 to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-0 text-left flex flex-col items-start">
          {/* Registration Announcement Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs font-semibold tracking-wide uppercase shadow-sm mb-6 animate-in fade-in slide-in-from-top-3 duration-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>SPRING &amp; FALL 2027 HOUSING REGISTRATIONS OPEN</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15] mb-4">
            Find the right place to live abroad —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A5F] via-[#FF7A70] to-[#FBBF24]">
              together.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200/90 max-w-2xl font-normal leading-relaxed mb-8">
            AI-powered housing guidance, group planning, and real support for students and parents.
          </p>

          {/* Search Card */}
          <div className="w-full bg-white dark:bg-[#111827] rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 border border-slate-100/90 dark:border-slate-800 text-left">
            <form
              onSubmit={handleSearchSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-end"
            >
              {/* Destination Dropdown (4 cols) */}
              <div className="lg:col-span-4">
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  Where are you studying?
                </label>
                <div className="relative flex items-center justify-between border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 bg-white dark:bg-slate-900/60 hover:border-slate-300 transition-colors">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full font-medium text-slate-700 dark:text-slate-200 text-sm focus:outline-none bg-transparent cursor-pointer appearance-none pr-6"
                  >
                    <option value="Florence, Italy">Florence, Italy</option>
                    <option value="Barcelona, Spain">Barcelona, Spain</option>
                    <option value="Paris, France">Paris, France</option>
                    <option value="Rome, Italy">Rome, Italy</option>
                    <option value="Madrid, Spain">Madrid, Spain</option>
                    <option value="Lisbon, Portugal">Lisbon, Portugal</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
                </div>
              </div>

              {/* Semester Dropdown (3 cols) */}
              <div className="lg:col-span-3">
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  Semester
                </label>
                <div className="relative flex items-center justify-between border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 bg-white dark:bg-slate-900/60 hover:border-slate-300 transition-colors">
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full font-medium text-slate-700 dark:text-slate-200 text-sm focus:outline-none bg-transparent cursor-pointer appearance-none pr-6"
                  >
                    <option value="Spring 2027">Spring 2027</option>
                    <option value="Fall 2027">Fall 2027</option>
                    <option value="Full Year 2027/28">Full Year 2027/28</option>
                    <option value="Summer 2027">Summer 2027</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
                </div>
              </div>

              {/* Students Dropdown (2 cols) */}
              <div className="lg:col-span-2">
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  Students
                </label>
                <div className="relative flex items-center justify-between border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 bg-white dark:bg-slate-900/60 hover:border-slate-300 transition-colors">
                  <select
                    value={selectedStudents}
                    onChange={(e) => setSelectedStudents(Number(e.target.value))}
                    className="w-full font-medium text-slate-700 dark:text-slate-200 text-sm focus:outline-none bg-transparent cursor-pointer appearance-none pr-6"
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
                </div>
              </div>

              {/* Submit Button (3 cols) */}
              <div className="lg:col-span-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#C8102E] hover:bg-[#A60D25] text-white font-semibold text-xs sm:text-sm shadow-md shadow-red-600/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] cursor-pointer"
                >
                  <span>Get My Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* 5 Value Props Bar */}
          <div className="w-full -mb-10 sm:-mb-12 relative z-20 mt-6 pt-3.5 pb-3 px-4 sm:px-6 rounded-2xl bg-white dark:bg-[#111827] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-left">
            {/* Prop 1 */}
            <div className="flex items-center gap-2 p-1">
              <div className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">City Intelligence</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">and neighborhood insights</p>
              </div>
            </div>

            {/* Prop 2 */}
            <div className="flex items-center gap-2 p-1">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">Group planning</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">and split payment tools</p>
              </div>
            </div>

            {/* Prop 3 */}
            <div className="flex items-center gap-2 p-1">
              <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">Real housing options</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">from trusted partners</p>
              </div>
            </div>

            {/* Prop 4 */}
            <div className="flex items-center gap-2 p-1">
              <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">AI advisor</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">and parent audio/text alerts</p>
              </div>
            </div>

            {/* Prop 5 */}
            <div className="flex items-center gap-2 p-1">
              <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4" />
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
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E52535] uppercase tracking-wider mb-2">
                <span>EXPLORE DESTINATIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Popular Study Abroad Cities
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Curated neighborhood safety ratings, university commute lines, and group housing databases.
              </p>
            </div>
            <Link
              href="/housing"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#E52535] hover:text-[#C8102E] transition-colors"
            >
              <span>Browse all cities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 6 City Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {POPULAR_CITIES.map((city) => {
              const isSelected = city.selected;
              return (
                <div
                  key={city.id}
                  className={`group relative bg-white dark:bg-[#111827] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col ${
                    isSelected
                      ? "border-2 border-[#E52535] shadow-md ring-2 ring-red-500/10"
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

                    {city.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#E52535] text-white font-bold text-[9px] tracking-wide uppercase shadow-sm">
                        {city.badge}
                      </span>
                    )}

                    <div className="absolute bottom-2 left-2 text-white">
                      <p className="font-bold text-xs tracking-tight leading-none drop-shadow-sm">{city.name}</p>
                      <p className="text-[10px] text-white/80">{city.country}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-2.5 flex flex-col flex-1 justify-between bg-white dark:bg-[#111827]">
                    <div>
                      <span className="text-[9.5px] uppercase font-semibold text-slate-400 block">Rent avg.</span>
                      <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">{city.avgRent}</p>
                    </div>
                    <button
                      onClick={() => openPlanModal({ city: `${city.name}, ${city.country}` })}
                      className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10.5px] font-semibold text-[#E52535] hover:text-[#C8102E] transition-colors cursor-pointer w-full text-left"
                    >
                      <span>Plan in {city.name}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
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
      <section className="py-16 sm:py-20 bg-slate-50/70 dark:bg-[#0B0F17] border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/70 dark:bg-red-950/50 text-[#E52535] text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E52535]" />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            4 Simple Steps to Your Overseas Home
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
            Effortlessly coordinate roommates, match budgets, and secure verified student apartments abroad.
          </p>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
            {SIMPLE_STEPS.map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                        {step.number}
                      </span>
                      <span className={`w-7 h-7 rounded-full ${step.iconColor} flex items-center justify-center text-xs`}>
                        <StepIcon className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div
                    className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#E52535] hover:text-[#C8102E] cursor-pointer"
                    onClick={() => openPlanModal()}
                  >
                    <span>{step.stepText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => router.push("/create-plan")}
              className="py-3 px-6 rounded-xl bg-[#E52535] hover:bg-[#C8102E] text-white font-semibold text-xs sm:text-sm shadow-md shadow-red-600/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Start Group Plan Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/how-it-works"
              className="py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
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
      <section className="py-16 sm:py-20 bg-white dark:bg-[#0B0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/70 dark:bg-red-950/50 text-[#E52535] text-[11px] font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#E52535]" />
              <span>COMMON QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
              Everything students and parents need to know about housing safety in Italy.
            </p>
          </div>

          {/* Accordion Component */}
          <FaqAccordion items={FAQS_LIST} defaultOpenIndex={0} />

          {/* Dark CTA Box at Bottom */}
          <div className="mt-12 max-w-4xl mx-auto rounded-3xl bg-slate-900 dark:bg-[#111827] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
            <div className="text-left">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-red-400 mb-1">
                Need Personalized Guidance?
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Have questions about your specific program or dates?
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md leading-relaxed">
                Chat with our Italian student housing advisors who review your university dates and recommend safe neighborhoods.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => router.push("/create-plan")}
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-[#E52535] hover:bg-[#C8102E] text-white font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap text-center"
              >
                Start Housing Plan
              </button>
              <Link
                href="/safety"
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl border border-white/20 hover:bg-white/10 text-white font-medium text-xs transition-all whitespace-nowrap text-center"
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

