"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  MapPin,
  Building2,
  ShieldCheck,
  BrainCircuit,
  Eye,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Star,
  Lock,
  Compass,
  FileCheck2
} from "lucide-react";
import { HOW_IT_WORKS_FULL_STEPS, FAQS_DATA } from "../data/housingData";
import FaqAccordion from "../components/FaqAccordion";
import { usePlanModal } from "../components/PlanModalContext";

export default function HowItWorksPage() {
  const router = useRouter();
  const { openPlanModal } = usePlanModal();

  const getStepIcon = (num: string) => {
    switch (num) {
      case "01":
        return <Users className="w-5 h-5 text-red-500" />;
      case "02":
        return <Compass className="w-5 h-5 text-emerald-500" />;
      case "03":
        return <MapPin className="w-5 h-5 text-amber-500" />;
      case "04":
        return <Building2 className="w-5 h-5 text-blue-500" />;
      case "05":
        return <BrainCircuit className="w-5 h-5 text-purple-500" />;
      case "06":
        return <Eye className="w-5 h-5 text-rose-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-red-500" />;
    }
  };

  const getTagStyle = (tagColor: string) => {
    switch (tagColor) {
      case "red":
        return "bg-rose-50 text-rose-600 border-rose-200";
      case "green":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "amber":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "purple":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "blue":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "pink":
        return "bg-pink-50 text-pink-600 border-pink-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION - STUDENT STUDY ABROAD BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full bg-slate-950 text-white overflow-hidden py-16 sm:py-24 text-center">
        {/* Leaning Tower of Pisa Background Photo */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/how_it_works_student.jpg"
            alt="Study Abroad Background - Leaning Tower of Pisa"
            fill
            priority
            className="object-cover object-center md:object-[center_35%] scale-100 transition-transform duration-700"
          />
          {/* Subtle natural gradient vignette for text legibility while preserving vibrant teal sky and architecture */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/25 to-black/35" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/15 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tag Capsule matching screenshot */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-[11px] font-semibold tracking-wider uppercase shadow-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>THE STUDY ABROAD HOUSING ROADMAP</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
            How AlphaAbroadeez Works
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            From picking roommates to unpacking your bags in Florence. Simple, transparent, scam-free housing guidance for college students and families.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => router.push("/create-plan")}
              className="py-3 px-6 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Start Your Housing Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/housing"
              className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Browse Verified Apartments</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: 6-STEP PROCESS GRID */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
              STEP-BY-STEP PROCESS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              How We Find &amp; Secure Your Apartment
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              No stressful group chats, no shady overseas wire transfers, and no guessing about commute distances.
            </p>
          </div>

          {/* 6 Step Cards in 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_IT_WORKS_FULL_STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300">
                      {step.number}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getTagStyle(step.tagColor)}`}>
                      {step.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                    {getStepIcon(step.number)}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {step.bullets && (
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    {step.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: TESTIMONIAL & TRUST */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                100% STUDENT &amp; PARENT PROTECTION
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Why Universities &amp; Parents Rely On AlphaAbroadeez
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Finding housing overseas without speaking the local language is daunting. We bridge the gap between American university academic calendars and European lease practices.
              </p>

              {/* 2 Feature Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Fraud &amp; Scam Guarantee</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      Every property representative authenticated via Italian Chamber of Commerce.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Alpha AI Advisor</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      Direct legal lease scanning, accurate translations, and transition assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Emma Watson Testimonial Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-br from-red-700 via-rose-700 to-red-900 text-white p-7 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-1 text-amber-300 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-300" />
                  ))}
                </div>

                <blockquote className="text-sm sm:text-base font-medium leading-relaxed italic mb-6">
                  &ldquo;Finding a 4-bedroom place in Santa Croce that our parents approved of felt impossible until we used AlphaAbroadeez. The commute calculator and Alpha Check breakdown saved us from a €4,500 scam listing.&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 relative ring-2 ring-white/30">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                      alt="Emma Watson"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Emma Watson</p>
                    <p className="text-[11px] text-white/80">CU Abroad Florence • Spring 2027</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: FAQ */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1 block">
              GOT QUESTIONS?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <FaqAccordion items={FAQS_DATA} />

          {/* Bottom CTA Banner matching screenshot */}
          <div className="mt-14 max-w-3xl mx-auto text-center bg-white rounded-3xl p-8 border border-slate-200 shadow-md">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Ready to find your Florence apartment?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-5">
              Build your group plan in less than 5 minutes. No upfront fees required.
            </p>
            <button
              onClick={() => router.push("/create-plan")}
              className="py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-red-600/30 inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Create Your Housing Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
