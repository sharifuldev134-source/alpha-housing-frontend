"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  AlertCircle,
  Eye,
  Building2,
  ArrowRight,
  HeartPulse,
  FileText,
  Smartphone,
  HelpCircle,
  PhoneCall,
  Check,
  Copy,
  MapPin,
  X,
  Phone,
  Hospital,
  AlertTriangle
} from "lucide-react";

interface NeighborhoodSafetyRow {
  id: string;
  name: string;
  subtitle: string;
  score: string;
  image: string;
}

const NEIGHBORHOOD_ROWS: NeighborhoodSafetyRow[] = [
  {
    id: "santa-croce",
    name: "Santa Croce",
    subtitle: "Historic, lively, popular with students",
    score: "9.5 / 10",
    image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "san-lorenzo",
    name: "San Lorenzo",
    subtitle: "Central, convenient, great transport",
    score: "9.3 / 10",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "oltrarno",
    name: "Oltrarno",
    subtitle: "Quieter, authentic, local feel",
    score: "9.2 / 10",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "campo-di-marte",
    name: "Campo di Marte",
    subtitle: "Residential, quieter, near university",
    score: "9.4 / 10",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80",
  },
];

interface ActionCardItem {
  id: "medical" | "passport" | "phone" | "area" | "contact";
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
}

export default function SafetyPage() {
  const [parentModalOpen, setParentModalOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [actionModal, setActionModal] = useState<"medical" | "passport" | "phone" | "contact" | null>(null);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const ACTION_CARDS: ActionCardItem[] = [
    {
      id: "medical",
      title: "Medical Help",
      subtitle: "Hospitals, clinics and doctors",
      icon: <HeartPulse className="w-5 h-5 text-rose-500" />,
      iconBg: "bg-rose-50 border border-rose-100",
    },
    {
      id: "passport",
      title: "Lost Passport",
      subtitle: "Step-by-step guidance",
      icon: <FileText className="w-5 h-5 text-blue-500" />,
      iconBg: "bg-blue-50 border border-blue-100",
    },
    {
      id: "phone",
      title: "Lost or Stolen Phone",
      subtitle: "What to do and how we can help",
      icon: <Smartphone className="w-5 h-5 text-purple-500" />,
      iconBg: "bg-purple-50 border border-purple-100",
    },
    {
      id: "area",
      title: "Safety by Area",
      subtitle: "Neighborhood info and local tips",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      iconBg: "bg-emerald-50 border border-emerald-100",
    },
    {
      id: "contact",
      title: "Contact Our Team",
      subtitle: "Get personalized assistance",
      icon: <HelpCircle className="w-5 h-5 text-cyan-500" />,
      iconBg: "bg-cyan-50 border border-cyan-100",
    },
  ];

  const handleActionClick = (id: ActionCardItem["id"]) => {
    if (id === "area") {
      const el = document.getElementById("neighborhood-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setActionModal(id);
    }
  };

  return (
    <div className="flex flex-col w-full bg-slate-50/70 dark:bg-[#0B0F17]">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION - MATCHING SCREENSHOT EXACTLY */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full bg-slate-950 text-white overflow-hidden py-14 sm:py-20 lg:py-24">
        {/* Leaning Tower of Pisa Background Photo */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/pisa_banner.jpg"
            alt="Study Abroad Background - Leaning Tower of Pisa"
            fill
            priority
            className="object-cover object-center md:object-[center_35%] scale-100 transition-transform duration-700"
          />
          {/* Subtle natural gradient vignette for high contrast while maintaining vibrant colors */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/30 to-black/35" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/15 to-black/45" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              {/* Tag Capsule matching screenshot */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/35 text-emerald-300 text-[11px] font-semibold tracking-wider uppercase shadow-xs backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>VERIFIED FLORENCE STUDENT SAFETY &amp; PROTECTION GUIDE</span>
              </div>

              {/* Headline matching screenshot: Safety & Support in Florence */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Safety &amp; Support <br />
                in Florence
              </h1>

              {/* Subtitle matching screenshot */}
              <p className="text-xs sm:text-sm md:text-base text-slate-200/90 leading-relaxed max-w-xl font-normal">
                Study abroad is an unforgettable adventure. We provide real neighborhood safety ratings, well-lit pedestrian corridors, emergency medical access, and scam-proof housing policies so students thrive and parents rest easy.
              </p>

              {/* Two CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setParentModalOpen(true)}
                  className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Open Parent Portal</span>
                </button>
                <Link
                  href="/housing"
                  className="py-3 px-5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-slate-700" />
                  <span>View Verified Flats</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Floating Preview Glass Card (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/20 p-5 shadow-2xl relative text-left">
                {/* Photo preview */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80"
                    alt="Florence Historic Center"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-emerald-600/95 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Florence Overall Safety: 9.1 / 10
                  </div>
                </div>

                {/* Stat pills matching screenshot */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-300">Violent Crime Index</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 text-[11px]">
                      Extremely Low
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-300">Pedestrian Walkability</span>
                    <span className="font-bold text-slate-200">98% Historic Core</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-300">English Medical Care</span>
                    <span className="font-bold text-slate-200">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. EMERGENCY ALERT BAR (OVERLAPPING HERO SECTION) */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-6 sm:-mt-8 relative z-20">
        <div className="w-full bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 text-red-500 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Need immediate help?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                For emergencies, contact local emergency services first.
              </p>
            </div>
          </div>
          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto"
          >
            <span>View Emergency Contacts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. FIVE QUICK SAFETY & SUPPORT ACTION CARDS */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-5 sm:mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {ACTION_CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => handleActionClick(card.id)}
              className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group"
            >
              <div
                className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                {card.icon}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-1 leading-tight">
                {card.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                {card.subtitle}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. NEIGHBORHOOD SAFETY & LIVING INFORMATION (MAP + LIST) */}
      {/* ------------------------------------------------------------- */}
      <div
        id="neighborhood-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6 sm:mt-8 mb-16 sm:mb-20"
      >
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 sm:p-7">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800 gap-2 mb-6 text-left">
            <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Neighborhood Safety &amp; Living Information
            </h3>
            <Link
              href="/housing"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline"
            >
              <span>View full neighborhood guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2-column Layout: Map on Left (7 cols) + List on Right (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Map Column */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[350px]">
              <Image
                src="/images/florence_safety_map.png"
                alt="Florence Neighborhood Safety Map"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Neighborhood List Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
              {NEIGHBORHOOD_ROWS.map((item) => (
                <Link
                  key={item.id}
                  href={`/housing?neighborhood=${encodeURIComponent(item.name)}`}
                  className="p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm bg-white dark:bg-slate-900/50 flex items-center justify-between gap-3 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="text-left min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-red-600 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
                    {item.score}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. EMERGENCY CONTACTS MODAL */}
      {/* ------------------------------------------------------------- */}
      {emergencyModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#111827] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Emergency Hotlines in Italy
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Toll-free emergency numbers &amp; Florence diplomatic assistance
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-2.5 text-xs">
              {/* 112 */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-red-600">112</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Single European Emergency
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Police, Ambulance, Carabinieri, Fire (English speaking operators)
                  </p>
                </div>
                <button
                  onClick={() => handleCopy("112")}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedNumber === "112" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedNumber === "112" ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* 118 */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-red-600">118</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Medical &amp; Ambulance (Pronto Soccorso)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Immediate dispatch of emergency paramedics &amp; hospital ambulance
                  </p>
                </div>
                <button
                  onClick={() => handleCopy("118")}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedNumber === "118" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedNumber === "118" ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* US Consulate */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      US Consulate General Florence
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Lungarno Amerigo Vespucci, 38 • Tel: +39 055 266 091
                  </p>
                </div>
                <button
                  onClick={() => handleCopy("+39055266091")}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedNumber === "+39055266091" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedNumber === "+39055266091" ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* 24/7 Florence Hospital */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      Santa Maria Nuova Hospital (Central ER)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Piazza Santa Maria Nuova, 1 (Historic center 24/7 Emergency Room)
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Ospedale+Santa+Maria+Nuova+Firenze"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Map</span>
                </a>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="py-2.5 px-5 rounded-xl bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white text-xs font-semibold cursor-pointer"
              >
                Close Emergency Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 6. ACTION DETAILS MODAL (MEDICAL / PASSPORT / PHONE / CONTACT) */}
      {/* ------------------------------------------------------------- */}
      {actionModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#111827] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                {actionModal === "medical" && (
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                )}
                {actionModal === "passport" && (
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-blue-500 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                )}
                {actionModal === "phone" && (
                  <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 text-purple-500 flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                )}
                {actionModal === "contact" && (
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-500 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {actionModal === "medical" && "Florence Medical Care & English Doctors"}
                    {actionModal === "passport" && "Lost Passport Emergency Action"}
                    {actionModal === "phone" && "Lost or Stolen Phone Protocol"}
                    {actionModal === "contact" && "Contact Alpha Housing Student Support"}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    24/7 on-ground assistance for study abroad students
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActionModal(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              {actionModal === "medical" && (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200">
                    <strong>Guardia Medica (Night Doctor): 055 69381</strong>
                    <p className="text-[11px] mt-0.5">
                      Available from 8:00 PM to 8:00 AM on weekdays and 24 hours on weekends for English home consultations.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <p className="font-bold text-slate-900 dark:text-slate-100">Top Florence Hospitals (24/7 ER):</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">• <strong>Ospedale Santa Maria Nuova</strong> (Piazza S. Maria Nuova, Center)</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">• <strong>Careggi University Hospital</strong> (Largo Brambilla, Major Trauma)</p>
                  </div>
                </div>
              )}

              {actionModal === "passport" && (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-blue-900 dark:text-blue-200">
                    <strong>Step 1: File Police Report (Denuncia)</strong>
                    <p className="text-[11px] mt-0.5">
                      Visit the Polizia di Stato office near Santa Maria Novella station (Via Zara 2) to get the stamped theft/loss report.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <p className="font-bold text-slate-900 dark:text-slate-100">Step 2: Emergency Appointment at U.S. Consulate</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      Located at Lungarno Amerigo Vespucci, 38. Emergency appointments issue a temporary replacement passport within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {actionModal === "phone" && (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 text-purple-900 dark:text-purple-200">
                    <strong>1. Remote Lock &amp; Erase</strong>
                    <p className="text-[11px] mt-0.5">
                      Immediately access Apple iCloud &quot;Find My&quot; or Android &quot;Find My Device&quot; to put phone into Lost Mode.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <p className="font-bold text-slate-900 dark:text-slate-100">2. Replacement Local SIM Card</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      TIM and Vodafone stores inside Florence Station (SMN) issue replacement student eSIMs instantly with your passport copy.
                    </p>
                  </div>
                </div>
              )}

              {actionModal === "contact" && (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/40 text-cyan-900 dark:text-cyan-200">
                    <strong>Alpha Florence Student Liaison Office</strong>
                    <p className="text-[11px] mt-0.5">
                      Our on-ground student liaisons assist with landlord communications, lock issues, and local medical coordination.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <p className="font-bold text-slate-900 dark:text-slate-100">WhatsApp Student Helpline: +39 345 678 9012</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Available 7 days a week from 8:00 AM to 11:00 PM</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActionModal(null)}
                className="py-2.5 px-5 rounded-xl bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white text-xs font-semibold cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 7. PARENT PORTAL PREVIEW MODAL */}
      {/* ------------------------------------------------------------- */}
      {parentModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#111827] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Parent Portal Live Preview
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Read-only security &amp; flat audit dashboard
                  </p>
                </div>
              </div>
              <button
                onClick={() => setParentModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300">
                <strong>Protected Status: Active</strong>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                  Emma Watson&apos;s group is matched with a verified 4-bedroom flat on Via Ghibellina (Santa Croce, Florence).
                </p>
              </div>
              <div className="space-y-2 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Italian Police Registration</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Verified ✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Emergency Medical Center</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Santa Maria Nuova (6 min walk)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Direct Wire Transfer Protection</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Escrow Protected</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setParentModalOpen(false)}
                className="py-2.5 px-5 rounded-xl bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white text-xs font-semibold cursor-pointer"
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
