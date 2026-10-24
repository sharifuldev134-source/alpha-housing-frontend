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
  Check,
  FileCheck2,
  Lock,
  Compass
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
        return <Building2 className="w-5 h-5 text-purple-500" />;
      case "05":
        return <BrainCircuit className="w-5 h-5 text-blue-500" />;
      case "06":
        return <Eye className="w-5 h-5 text-rose-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full bg-slate-950 text-white overflow-hidden py-16 sm:py-24 text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=2000&q=80"
            alt="Florence Panorama"
            fill
            priority
            className="object-cover opacity-25 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold tracking-wide uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>THE STUDY ABROAD HOUSING ROADMAP</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
            How AlphaAbroadeez Works
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
            From picking roommates to unpacking your bags in Florence. Simple, transparent, scam-free housing guidance for college students and families.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => router.push("/create-plan")}
              className="py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all"
            >
              <span>Start Your Housing Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/housing"
              className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>Browse Verified Apartments</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: 6-STEP PROCESS GRID */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
              Step-by-Step Process
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
                    <span className="text-3xl font-black text-slate-200">
                      {step.number}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                        {step.tag}
                      </span>
                    </div>
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
                100% Student &amp; Parent Protection
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
                      Every property is verified with Italian municipal registers before deposits.
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
                      Italian legal lease checking, transit breakdown, and cost estimation.
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
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1 block">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <FaqAccordion items={FAQS_DATA} />

          {/* Bottom CTA Banner */}
          <div className="mt-14 max-w-3xl mx-auto text-center bg-white rounded-3xl p-8 border border-slate-200 shadow-md">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Ready to find your Florence apartment?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-5">
              Build your group plan in less than 5 minutes. No upfront fees required.
            </p>
            <button
              onClick={() => router.push("/create-plan")}
              className="py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-red-600/30 inline-flex items-center gap-2 transition-all"
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
