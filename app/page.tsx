"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Check, 
  CheckCircle2,
  Clock,
  HelpCircle,
  PhoneCall,
  Search
} from "lucide-react";
import { useRouter } from "next/navigation";
import { 
  CITIES_DATA, 
  HOW_IT_WORKS_STEPS_HOME, 
  PRICING_PLANS, 
  FAQS_DATA 
} from "./data/housingData";
import FaqAccordion from "./components/FaqAccordion";
import { usePlanModal } from "./components/PlanModalContext";

export default function HomePage() {
  const router = useRouter();
  const { openPlanModal } = usePlanModal();

  // Search state
  const [selectedCity, setSelectedCity] = useState("Florence, Italy");
  const [selectedSemester, setSelectedSemester] = useState("Spring 2027");
  const [selectedStudents, setSelectedStudents] = useState(4);

  // Pricing toggle state
  const [pricingMode, setPricingMode] = useState<"student" | "group">("student");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/create-plan");
  };

  return (
    <div className="flex flex-col w-full">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background photo of Italy / Florence / Tuscany with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=2000&q=85"
            alt="Florence Italy Study Abroad"
            fill
            priority
            className="object-cover object-center opacity-45 brightness-90 filter scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center flex flex-col items-center">
          {/* Registration Announcement Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs font-semibold tracking-wide uppercase shadow-sm mb-6 animate-in fade-in slide-in-from-top-3 duration-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>SPRING &amp; FALL 2027 HOUSING REGISTRATIONS OPEN</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15] mb-4">
            Find the right place to live abroad —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
              together.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200/90 max-w-2xl font-normal leading-relaxed mb-8">
            AI-powered housing guidance, group planning, and real support for students and parents.
          </p>

          {/* Search Card */}
          <div className="w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-4 border border-slate-100/90 text-left">
            <form
              onSubmit={handleSearchSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center"
            >
              {/* Destination Dropdown (4 cols) */}
              <div className="lg:col-span-4 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Where are you studying?
                </label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full font-semibold text-slate-800 text-sm focus:outline-none bg-transparent cursor-pointer"
                  >
                    <option value="Florence, Italy">Florence, Italy</option>
                    <option value="Barcelona, Spain">Barcelona, Spain</option>
                    <option value="Paris, France">Paris, France</option>
                    <option value="Rome, Italy">Rome, Italy</option>
                    <option value="Madrid, Spain">Madrid, Spain</option>
                    <option value="Lisbon, Portugal">Lisbon, Portugal</option>
                  </select>
                </div>
              </div>

              {/* Semester Dropdown (3 cols) */}
              <div className="lg:col-span-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Semester
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full font-semibold text-slate-800 text-sm focus:outline-none bg-transparent cursor-pointer"
                  >
                    <option value="Spring 2027">Spring 2027</option>
                    <option value="Fall 2027">Fall 2027</option>
                    <option value="Full Year 2027/28">Full Year 2027/28</option>
                    <option value="Summer 2027">Summer 2027</option>
                  </select>
                </div>
              </div>

              {/* Students Dropdown (2 cols) */}
              <div className="lg:col-span-2 px-3 py-2 border-b sm:border-b-0 lg:border-r border-slate-100">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Students
                </label>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-500 shrink-0" />
                  <select
                    value={selectedStudents}
                    onChange={(e) => setSelectedStudents(Number(e.target.value))}
                    className="w-full font-semibold text-slate-800 text-sm focus:outline-none bg-transparent cursor-pointer"
                  >
                    <option value={1}>1 student</option>
                    <option value={2}>2 students</option>
                    <option value={3}>3 students</option>
                    <option value={4}>4 students</option>
                    <option value={5}>5 students</option>
                  </select>
                </div>
              </div>

              {/* Submit Button (3 cols) */}
              <div className="lg:col-span-3 px-1">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                >
                  <span>Create Your Housing Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* 5 Value Props Bar */}
          <div className="w-full max-w-4xl mt-6 pt-4 pb-2 px-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-200/60 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-left">
            <div className="flex items-center gap-2 p-1.5">
              <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 leading-tight">City Intelligence</p>
                <p className="text-[10px] text-slate-500">with safety ratings</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-1.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 leading-tight">Group planning</p>
                <p className="text-[10px] text-slate-500">split budget safe</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-1.5">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 leading-tight">Real housing options</p>
                <p className="text-[10px] text-slate-500">direct landlord &amp; leases</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-1.5">
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 leading-tight">AI advisor</p>
                <p className="text-[10px] text-slate-500">anti-scam assistance</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-1.5 col-span-2 sm:col-span-1">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900 leading-tight">Parent visibility</p>
                <p className="text-[10px] text-slate-500">real-time portal view</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: POPULAR STUDY ABROAD CITIES */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
                Explore Destinations
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Popular Study Abroad Cities
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                Curated neighborhood safety ratings, university commute lines, and group housing databases.
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
            {CITIES_DATA.map((city) => (
              <div
                key={city.id}
                className="group relative bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Photo container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {city.badge && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-red-600 text-white font-bold text-[10px] tracking-wide uppercase shadow-sm">
                      {city.badge}
                    </span>
                  )}

                  <div className="absolute bottom-2.5 left-2.5 text-white">
                    <p className="font-bold text-sm tracking-tight leading-none drop-shadow-sm">{city.name}</p>
                    <p className="text-[11px] text-white/80">{city.country}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-3 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Avg Rent</span>
                    <p className="text-xs font-bold text-slate-800">{city.avgRent}</p>
                  </div>
                  <Link
                    href={city.id === "florence" ? "/safety" : "#"}
                    onClick={(e) => {
                      if (city.id !== "florence") {
                        e.preventDefault();
                        openPlanModal({ city: `${city.name}, ${city.country}` });
                      }
                    }}
                    className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-red-600 group-hover:text-red-700"
                  >
                    <span>Plan in {city.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: HOW IT WORKS (4 Simple Steps) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/70 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            4 Simple Steps to Your Overseas Home
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
            Effortlessly coordinate roommates, match budgets, and secure verified student apartments abroad.
          </p>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
            {HOW_IT_WORKS_STEPS_HOME.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-200 group-hover:text-red-500 transition-colors">
                      {step.number}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold">
                      ★
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                  onClick={() => openPlanModal()}
                >
                  <span>{step.stepText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => router.push("/create-plan")}
              className="py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-600/20 flex items-center gap-2 transition-all"
            >
              <span>Start Group Plan Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/how-it-works"
              className="py-3 px-6 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <span>View Full Guide</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: TRANSPARENT PRICING */}
      {/* ------------------------------------------------------------- */}
      <section id="pricing" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/70 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT PRICING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simple, Student-Friendly Plans
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
            No hidden broker markups or surprise agency fees. One transparent price for total peace of mind.
          </p>

          {/* Pricing Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200">
            <button
              onClick={() => setPricingMode("student")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                pricingMode === "student"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Per Student
            </button>
            <button
              onClick={() => setPricingMode("group")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                pricingMode === "group"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Per Group Flat (Up to 5)
            </button>
          </div>

          {/* Pricing Cards (3 tiers) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left max-w-6xl mx-auto items-stretch">
            {PRICING_PLANS.map((plan) => {
              const isPopular = plan.badgeStyle === "popular";
              const price = pricingMode === "student" ? plan.priceStudent : plan.priceGroup;
              const period = pricingMode === "student" ? plan.periodText : "group flat / one-time";

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                    isPopular
                      ? "bg-white border-2 border-red-500 shadow-xl ring-4 ring-red-500/10 scale-105 z-10"
                      : "bg-white border border-slate-200 shadow-sm hover:shadow-md"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-3.5 py-1 rounded-full bg-red-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-md">
                        ★ MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                      {plan.badge && !isPopular && (
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                          {plan.badge}
                        </span>
                      )}
                      {isPopular && (
                        <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider border border-red-200">
                          RECOMMENDED
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900">
                        ${price}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        /{period}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Features list */}
                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              feat.highlight ? "text-red-600" : "text-emerald-600"
                            }`}
                          />
                          <span
                            className={
                              feat.highlight
                                ? "font-bold text-slate-900"
                                : "text-slate-600"
                            }
                          >
                            {feat.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => openPlanModal()}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition-all ${
                        plan.ctaStyle === "primary"
                          ? "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/30"
                          : plan.ctaStyle === "dark"
                          ? "bg-slate-900 hover:bg-black text-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                      }`}
                    >
                      {plan.ctaText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guarantee banner */}
          <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>100% Risk-Free Guarantee:</strong> Full refund if no verified matching apartment is found for your study abroad semester.
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: FAQS */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/70 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>COMMON QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
              Everything students and parents need to know about housing safety in Italy.
            </p>
          </div>

          <FaqAccordion items={FAQS_DATA} />

          {/* Personalized guidance callout */}
          <div className="mt-12 max-w-4xl mx-auto bg-slate-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
                Need Personalized Guidance?
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Have questions about your specific program or dates?
              </h3>
              <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
                Our bilingual Italian student housing advisors can review your university dates and recommend safe neighborhoods.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => openPlanModal()}
                className="py-2.5 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md shadow-red-600/30 transition-all text-center"
              >
                Start Housing Plan
              </button>
              <Link
                href="/safety"
                className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all text-center"
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
