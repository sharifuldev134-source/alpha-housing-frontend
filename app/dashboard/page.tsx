"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  LayoutDashboard, 
  MapPin, 
  Building2, 
  GitCompare, 
  TrendingUp, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  Coffee, 
  Eye, 
  User, 
  ArrowRight, 
  Heart, 
  Check, 
  CheckCircle2, 
  X, 
  Compass, 
  ShoppingBag, 
  Sparkles, 
  Clock, 
  Calendar, 
  Pencil,
  AlertCircle
} from "lucide-react";

interface NeighborhoodItem {
  id: string;
  name: string;
  sub: string;
  commute: string;
  price: string;
  description: string;
  safety: string;
  walk: string;
  image: string;
  badge?: string;
  isSaved?: boolean;
  category: "all" | "nearest" | "students" | "space" | "quiet";
}

const NEIGHBORHOODS_LIST: NeighborhoodItem[] = [
  {
    id: "santa-croce",
    name: "Santa Croce",
    sub: "Quartiere di Santa Croce",
    commute: "12 min to program",
    price: "€3,800 – €5,500",
    description: "Vibrant, walkable, student area",
    safety: "Good",
    walk: "8 min walk",
    image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80",
    badge: "Best Match",
    isSaved: true,
    category: "students",
  },
  {
    id: "santo-spirito",
    name: "Santo Spirito",
    sub: "Piazza Santo Spirito / Oltrarno",
    commute: "15 min to program",
    price: "€3,500 – €5,200",
    description: "Great local atmosphere",
    safety: "Good",
    walk: "14 min walk",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    category: "students",
  },
  {
    id: "san-frediano",
    name: "San Frediano",
    sub: "Borgo San Frediano",
    commute: "18 min to program",
    price: "€3,200 – €4,500",
    description: "Authentic, quieter",
    safety: "Excellent",
    walk: "16 min walk",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    category: "quiet",
  },
  {
    id: "campo-di-marte",
    name: "Campo di Marte",
    sub: "Quartiere 2 - Campo di Marte",
    commute: "20 min to program",
    price: "€2,800 – €4,200",
    description: "More space, good value",
    safety: "Excellent",
    walk: "20 min transit / cycle",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    category: "space",
  },
  {
    id: "duomo",
    name: "Duomo / Center",
    sub: "Centro Storico",
    commute: "10 min to program",
    price: "€4,500 – €6,000",
    description: "Central, convenient",
    safety: "Good",
    walk: "2 min walk",
    image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?auto=format&fit=crop&w=800&q=80",
    category: "nearest",
  },
  {
    id: "oltrarno",
    name: "Oltrarno",
    sub: "Rive Gauche Fiorentina",
    commute: "16 min to program",
    price: "€3,500 – €5,000",
    description: "Trendy and lively",
    safety: "Good",
    walk: "12 min walk",
    image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=800&q=80",
    category: "students",
  },
];

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedNeighborhoodModal, setSelectedNeighborhoodModal] = useState<NeighborhoodItem | null>(null);
  const [savedFavorites, setSavedFavorites] = useState<Record<string, boolean>>({
    "santa-croce": true,
  });

  const toggleFavorite = (id: string) => {
    setSavedFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredNeighborhoods = selectedCategory === "all"
    ? NEIGHBORHOODS_LIST
    : NEIGHBORHOODS_LIST.filter((nh) => nh.category === selectedCategory || selectedCategory === "all");

  return (
    <div className="flex flex-col w-full bg-[#FAFAFA] min-h-screen text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ------------------------------------------------------------- */}
          {/* LEFT SIDEBAR (3 cols) */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-4">
            {/* Top Destination / Group Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    Florence
                  </h3>
                  <p className="text-xs text-slate-400">Spring 2027</p>
                </div>
                <Link
                  href="/create-plan"
                  className="text-xs font-bold text-[#DC2626] hover:underline"
                >
                  Edit
                </Link>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>4 Students</span>
                </span>
                <span className="font-bold text-slate-900">
                  €4,800/mo
                </span>
              </div>
            </div>

            {/* Sidebar Navigation Items */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-2 shadow-2xs space-y-0.5 text-xs font-semibold">
              {/* Overview */}
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                  activeTab === "overview"
                    ? "bg-[#FFF4F4] text-[#DC2626] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </button>

              {/* Neighborhoods */}
              <button
                onClick={() => setActiveTab("neighborhoods")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                  activeTab === "neighborhoods"
                    ? "bg-[#FFF4F4] text-[#DC2626] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Neighborhoods</span>
              </button>

              {/* Housing Options */}
              <Link
                href="/housing"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Building2 className="w-4 h-4" />
                  <span>Housing Options</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                  28
                </span>
              </Link>

              {/* Compare */}
              <Link
                href="/housing"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <GitCompare className="w-4 h-4" />
                <span>Compare</span>
              </Link>

              {/* Group Progress */}
              <button
                onClick={() => setActiveTab("overview")}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4" />
                  <span>Group Progress</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                  14
                </span>
              </button>

              {/* Messages */}
              <button
                onClick={() => setActiveTab("overview")}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-red-100 text-[#DC2626] text-[10px] font-bold">
                  2
                </span>
              </button>

              {/* Documents */}
              <button
                onClick={() => setActiveTab("overview")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Documents</span>
              </button>

              {/* Safety & Hotline */}
              <Link
                href="/safety"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Safety &amp; Hotline</span>
              </Link>

              {/* Daily Life Guide */}
              <Link
                href="/daily-life"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <Coffee className="w-4 h-4 text-red-500" />
                <span>Daily Life Guide</span>
              </Link>

              {/* Parent View */}
              <Link
                href="/safety"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <Eye className="w-4 h-4 text-indigo-500" />
                <span>Parent View</span>
              </Link>

              {/* My Profile */}
              <button
                onClick={() => setActiveTab("overview")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </button>
            </div>

            {/* Bottom Alpha Advisor Callout */}
            <div className="bg-[#FFF8F8] rounded-2xl border border-red-200/80 p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#DC2626]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Alpha Advisor</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Need lease contract review or university commute check?
              </p>
              <Link
                href="/how-it-works"
                className="w-full py-2 px-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center justify-center transition-colors shadow-2xs"
              >
                Run Alpha Check
              </Link>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* MAIN CONTENT AREA (9 cols) */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-9">
            {/* ========================================================= */}
            {/* VIEW 1: OVERVIEW TAB */}
            {/* ========================================================= */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#DC2626] text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>Personalized for Emma, Sophie, Olivia, Mia</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Your Housing Plan
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Based on your group&apos;s preferences and our verified student housing data.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Key Recommendations (7 cols) */}
                  <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-6">
                    <h3 className="text-base font-bold text-slate-900">
                      Key Recommendations
                    </h3>

                    <div className="space-y-5">
                      {/* Rec 1 */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-[#DC2626] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          1
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-900">
                              Santa Croce
                            </h4>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10.5px] font-bold">
                              12 min walk
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Best combination of location, student life and walkability. High density of international student cafes, markets, and quick access to IES Abroad - Florence.
                          </p>
                        </div>
                      </div>

                      {/* Rec 2 */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-[#F59E0B] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          2
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-900">
                              Sant&apos;Ambrogio
                            </h4>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10.5px] font-bold">
                              14 min walk
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Good value and vibrant student environment. Home to the daily fresh food market and quiet residential side streets.
                          </p>
                        </div>
                      </div>

                      {/* Rec 3 */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          3
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-900">
                              Campo di Marte
                            </h4>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10.5px] font-bold">
                              20 min transit
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            More space, slightly longer commute. Best price-per-square-meter for 4-bedroom apartments with large terraces.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab("neighborhoods")}
                      className="py-3 px-5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                    >
                      <span>View Neighborhoods</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Right Column: Florence Overview Card (5 cols) */}
                  <div className="md:col-span-5 bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm flex flex-col justify-between">
                    <div>
                      {/* Photo Header */}
                      <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900">
                        <Image
                          src="https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80"
                          alt="Florence Overview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        {/* Top Right Good Match Badge */}
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Good Match</span>
                        </div>

                        {/* Title overlay */}
                        <div className="absolute bottom-3 left-4 text-white">
                          <h4 className="text-base font-bold text-white leading-tight drop-shadow-sm">
                            Florence Overview
                          </h4>
                          <p className="text-[11px] text-slate-300">
                            Semester Target: Spring 2027
                          </p>
                        </div>
                      </div>

                      {/* 4 Stats Rows */}
                      <div className="p-5 space-y-3.5 text-xs">
                        <div className="flex items-start gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center shrink-0 mt-0.5">
                            <Building2 className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              AVERAGE RENT (4-BEDROOM APT)
                            </span>
                            <span className="text-sm font-black text-slate-900 block mt-0.5">
                              €3,500 – €5,000 / month
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Calendar className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              AVAILABILITY
                            </span>
                            <span className="text-xs font-bold text-slate-800 block mt-0.5">
                              Medium (start early)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              SAFETY RATING
                            </span>
                            <span className="text-xs font-bold text-emerald-700 block mt-0.5">
                              Good (well-lit streets &amp; regular patrols)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              STUDENT ENVIRONMENT
                            </span>
                            <span className="text-xs font-bold text-slate-800 block mt-0.5">
                              High concentration of international students
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        28 verified listings ready
                      </span>
                      <Link
                        href="/housing"
                        className="font-bold text-[#DC2626] hover:underline flex items-center gap-1"
                      >
                        <span>Browse listings</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 2: NEIGHBORHOODS TAB */}
            {/* ========================================================= */}
            {activeTab === "neighborhoods" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Explore Neighborhoods
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Compare areas based on commute, prices, safety, and student life.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: "all", label: "All" },
                    { id: "nearest", label: "Nearest to Program" },
                    { id: "students", label: "Best for Students" },
                    { id: "space", label: "More Space" },
                    { id: "quiet", label: "More Quiet" },
                  ].map((filter) => {
                    const isSelected = selectedCategory === filter.id;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedCategory(filter.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-[#DC2626] text-white shadow-xs"
                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                </div>

                {/* 6 Neighborhood Cards in 3x2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredNeighborhoods.map((nh) => {
                    const isSaved = savedFavorites[nh.id];
                    return (
                      <div
                        key={nh.id}
                        className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          {/* Image */}
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                            <Image
                              src={nh.image}
                              alt={nh.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                            {/* Top Badge */}
                            {nh.badge && (
                              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-xs">
                                {nh.badge}
                              </div>
                            )}

                            {/* Heart Icon */}
                            <button
                              onClick={() => toggleFavorite(nh.id)}
                              className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-colors ${
                                isSaved
                                  ? "bg-red-500 text-white"
                                  : "bg-black/40 text-white hover:bg-black/60"
                              }`}
                              aria-label="Save neighborhood"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-white" : ""}`} />
                            </button>

                            {/* Title overlay */}
                            <div className="absolute bottom-2.5 left-3 text-white">
                              <h4 className="text-sm font-bold text-white drop-shadow-xs">
                                {nh.name}
                              </h4>
                              <p className="text-[10px] text-slate-300">
                                {nh.sub}
                              </p>
                            </div>
                          </div>

                          {/* Body Content */}
                          <div className="p-3.5 space-y-2 text-xs">
                            <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-100">
                              <span className="text-slate-500 font-medium flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{nh.commute}</span>
                              </span>
                              <span className="font-bold text-slate-900">
                                {nh.price}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">
                              {nh.description}
                            </p>

                            <div className="flex items-center gap-1.5 pt-1">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                                Safety: {nh.safety}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                                {nh.walk}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Footer button to open modal */}
                        <div className="p-3.5 pt-0">
                          <button
                            onClick={() => setSelectedNeighborhoodModal(nh)}
                            className="w-full py-1.5 rounded-xl border border-slate-200 hover:border-red-300 text-slate-700 hover:text-[#DC2626] text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* NEIGHBORHOOD DETAIL MODAL (PIXEL PERFECT TO USER SCREENSHOT) */}
      {/* ------------------------------------------------------------- */}
      {selectedNeighborhoodModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-[26px] max-w-[680px] w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150 relative my-6">
            {/* Header Image */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
              <Image
                src={selectedNeighborhoodModal.image}
                alt={selectedNeighborhoodModal.name}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Badges on Top Left */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#059669] text-white font-bold text-[11px] flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Best Match</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-[#DC2626] text-white font-bold text-[11px] flex items-center gap-1.5 shadow-sm">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Neighborhood Guide</span>
                </span>
              </div>

              {/* Close Button Top Right */}
              <button
                onClick={() => setSelectedNeighborhoodModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900/60 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-slate-900/80 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-5 text-white">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-sm">
                  {selectedNeighborhoodModal.name}
                </h3>
                <p className="text-xs text-slate-200 mt-0.5">
                  {selectedNeighborhoodModal.sub} • Florence, Italy
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 text-xs">
              {/* Row of 4 Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Stat 1: Campus Commute */}
                <div className="p-3 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <span className="text-[10px] text-slate-400 font-medium block">
                    Campus Commute
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock className="w-4 h-4 text-[#DC2626] shrink-0" />
                    <span className="font-bold text-slate-900 text-xs sm:text-[13px]">
                      {selectedNeighborhoodModal.commute}
                    </span>
                  </div>
                </div>

                {/* Stat 2: Safety Score */}
                <div className="p-3 rounded-2xl border border-emerald-300 bg-white shadow-2xs">
                  <span className="text-[10px] text-slate-400 font-medium block">
                    Safety Score
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-bold text-slate-900 text-xs sm:text-[13px]">
                      Good (9.6/10)
                    </span>
                  </div>
                </div>

                {/* Stat 3: Monthly Flat Avg */}
                <div className="p-3 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <span className="text-[10px] text-slate-400 font-medium block">
                    Monthly Flat Avg
                  </span>
                  <div className="mt-1">
                    <span className="font-bold text-slate-900 text-xs sm:text-[13px]">
                      {selectedNeighborhoodModal.price}
                    </span>
                  </div>
                </div>

                {/* Stat 4: Available Flats */}
                <div className="p-3 rounded-2xl border border-rose-200 bg-white shadow-2xs">
                  <span className="text-[10px] text-rose-500 font-medium block">
                    Available Flats
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Building2 className="w-4 h-4 text-[#DC2626] shrink-0" />
                    <span className="font-bold text-[#DC2626] text-xs sm:text-[13px]">
                      2 Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Vibe & Area Character */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Compass className="w-4 h-4 text-[#DC2626]" />
                  <span>Student Vibe &amp; Area Character</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Vibrant, walkable student area with countless trattorias, historic piazza, and lively evening cafes.
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
                  <User className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>High concentration of international students &amp; study programs</span>
                </p>
              </div>

              {/* 2 Info Cards: Student Hangouts & Groceries */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {/* Hangouts */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Coffee className="w-4 h-4 text-amber-500" />
                    <span>Student Hangouts &amp; Cafes</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-600 leading-relaxed">
                    <li>• Local study-friendly espresso bars with high-speed WiFi</li>
                    <li>• Historic piazzas for evening spritz and group discussions</li>
                    <li>• Authentic local trattorias with student-friendly lunch menus</li>
                  </ul>
                </div>

                {/* Groceries */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <ShoppingBag className="w-4 h-4 text-emerald-500" />
                    <span>Groceries &amp; Practical Living</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-600 leading-relaxed">
                    <li>• Walking distance to Conad &amp; Pam supermarkets</li>
                    <li>• Local daily fruit, cheese, and fresh bread bakeries</li>
                    <li>• 24/7 coin laundromats and pharmacy within 3 blocks</li>
                  </ul>
                </div>
              </div>

              {/* Alpha Safety Guarantee Box */}
              <div className="p-3.5 rounded-2xl border border-rose-200/90 bg-rose-50/25 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
                  <span>Alpha Safety™ Neighborhood Guarantee</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Santa Croce is verified for well-lit streets, active evening foot traffic, high student density, and direct pedestrian routes to Florence university campuses.
                </p>
              </div>

              {/* Modal Footer */}
              <div className="pt-3 flex items-center justify-between">
                <button
                  onClick={() => setSelectedNeighborhoodModal(null)}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors"
                >
                  Close Guide
                </button>
                <Link
                  href="/housing"
                  className="py-2.5 px-5 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>View Verified Flats in {selectedNeighborhoodModal.name} (2 Listings)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-slate-400">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
