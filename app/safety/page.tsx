"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  PhoneCall, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Building2, 
  ArrowRight, 
  Clock, 
  HeartHandshake,
  ChevronRight,
  Sparkles,
  Lock
} from "lucide-react";
import { 
  FLORENCE_SAFETY_FEATURES, 
  NEIGHBORHOOD_SAFETY_SCORES, 
  EMERGENCY_HOTLINES, 
  SCAM_PROOF_GUARANTEES 
} from "../data/housingData";
import { usePlanModal } from "../components/PlanModalContext";

export default function SafetyPage() {
  const { openPlanModal } = usePlanModal();
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [parentModalOpen, setParentModalOpen] = useState(false);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  return (
    <div className="flex flex-col w-full">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full bg-slate-950 text-white overflow-hidden py-16 sm:py-24">
        {/* Background Skyline */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=2000&q=80"
            alt="Florence at Twilight"
            fill
            priority
            className="object-cover opacity-25 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>VERIFIED FLORENCE SAFETY &amp; FAMILY PROTECTION GUIDE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Safety &amp; Peace of Mind in Florence
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Study abroad is an unforgettable adventure. We provide real neighborhood safety ratings, well-lit pedestrian corridors, emergency medical access, and scam-proof housing policies so students thrive and parents rest easy.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setParentModalOpen(true)}
                  className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>Open Parent Portal</span>
                </button>
                <Link
                  href="/housing"
                  className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  <span>View Verified Flats</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Floating Preview Card (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/15 p-5 shadow-2xl relative">
                {/* Photo preview */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"
                    alt="Florence Historic Center"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                    Florence Grand Valley 9.2/10
                  </div>
                </div>

                {/* Stat pills */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-400">Overall Safety Index</span>
                    <span className="font-bold text-emerald-400">9.2/10 Very Low</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-400">Walkable to University</span>
                    <span className="font-bold text-slate-200">94% historic zone</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-400">English Medical Care</span>
                    <span className="font-bold text-slate-200">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: FLORENCE LIVING & SAFETY FEATURES */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
                Local Environment &amp; Security
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Florence Living &amp; Safety Features
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                Take a look at the actual streetscapes, secure entries, and nearby medical facilities around student housing.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-semibold self-start md:self-auto shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>4 Verified Standards</span>
            </span>
          </div>

          {/* 4 Feature Cards (2x2 grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FLORENCE_SAFETY_FEATURES.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Category tag */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-wider">
                    {item.categoryTag}
                  </span>

                  <h3 className="absolute bottom-3 left-4 right-4 text-base sm:text-lg font-bold text-white drop-shadow-sm">
                    {item.title}
                  </h3>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-semibold self-start">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item.metaPill}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: NEIGHBORHOOD SAFETY SCORES */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
                Local Risk Audits
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Neighborhood Safety Scores &amp; Real Street Views
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                Every district evaluated for evening walkability, lighting quality, and closeness to university institutes.
              </p>
            </div>
            <Link
              href="/housing"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 hover:underline"
            >
              <span>Explore all neighborhoods on map</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 5 Neighborhood Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {NEIGHBORHOOD_SAFETY_SCORES.map((nh) => (
              <div
                key={nh.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={nh.image}
                      alt={nh.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    
                    {/* Score badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white font-extrabold text-xs shadow-xs">
                        {nh.score}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold">
                        {nh.statusBadge}
                      </span>
                    </div>

                    <p className="absolute bottom-2.5 left-3 text-white font-bold text-sm">
                      {nh.name}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="p-3.5 space-y-2.5 text-[11px]">
                    <div>
                      <span className="text-slate-400 block font-medium">Night Walkability</span>
                      <span className="text-slate-800 font-semibold">{nh.nightWalkability}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Street Lighting</span>
                      <span className="text-emerald-700 font-semibold">{nh.streetLighting}</span>
                    </div>
                    <p className="text-slate-500 leading-relaxed line-clamp-3 pt-1 border-t border-slate-100">
                      {nh.description}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <span className="text-[10px] font-medium text-slate-500">{nh.commuteTime}</span>
                  <Link
                    href="/housing"
                    className="text-xs font-bold text-red-600 hover:text-red-700"
                  >
                    View Flats
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: EMERGENCY HOTLINES */}
      {/* ------------------------------------------------------------- */}
      <section className="py-14 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Emergency Hotlines in Italy
              </h3>
              <p className="text-xs text-slate-500">
                Tap to call directly or copy number to save in your phone before traveling.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EMERGENCY_HOTLINES.map((hotline) => (
              <div
                key={hotline.id}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-red-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl font-black text-red-600 tracking-tight">
                      {hotline.number}
                    </span>
                    <button
                      onClick={() => handleCopy(hotline.number)}
                      title="Copy phone number"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      {copiedNumber === hotline.number ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{hotline.title}</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {hotline.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-semibold text-slate-400">
                  {hotline.agency}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: SCAM-PROOF GUARANTEE */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>AlphaAbroad Scam-Proof Guarantee</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              4 Institutional Layers of Verification
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Every housing reservation is protected by Italian legal contracts and security protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SCAM_PROOF_GUARANTEES.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <h4 className="absolute bottom-2.5 left-3 right-3 text-xs sm:text-sm font-bold text-white drop-shadow-sm line-clamp-2">
                      {item.title}
                    </h4>
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.badgeText}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Pre-Alpha Check Audit Banner */}
          <div className="mt-12 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-400">
                Landlord ID &amp; Contract Verification
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                Need instant validation with a registered landlord or rental agency code?
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Run our Italian lease scanner before signing or transferring any deposit.
              </p>
            </div>
            <Link
              href="/how-it-works"
              className="py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md shrink-0 flex items-center gap-2 transition-all"
            >
              <span>Run Pre-Alpha Check Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Parent Portal Modal */}
      {parentModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Parent Portal Live Preview</h3>
                  <p className="text-[11px] text-slate-500">Read-only security &amp; flat audit dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setParentModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                <strong>Protected Status: Active</strong>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Emma Watson&apos;s group is matched with a verified 4-bedroom flat on Via Ghibellina (Santa Croce, Florence).
                </p>
              </div>
              <div className="space-y-2 border border-slate-200 rounded-xl p-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Italian Police Registration</span>
                  <span className="font-semibold text-slate-900">Verified ✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Emergency Medical Center</span>
                  <span className="font-semibold text-slate-900">Santa Maria Nuova (6 min walk)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Direct Wire Transfer Protection</span>
                  <span className="font-semibold text-emerald-600">Escrow Protected</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setParentModalOpen(false)}
                className="py-2 px-4 rounded-xl bg-slate-900 text-white text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
