"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Coffee, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Bus,
  Bike,
  ShoppingBag,
  BookOpen,
  Smartphone,
  Recycle
} from "lucide-react";
import { usePlanModal } from "../components/PlanModalContext";

interface TimelineItem {
  id: string;
  time: string;
  tag: string;
  title: string;
  description: string;
  image: string;
}

interface GuideCard {
  id: string;
  category: "transit" | "markets" | "study" | "sim";
  badgeIcon: React.ReactNode;
  badgeLabel: string;
  subLabel: string;
  title: string;
  description: string;
  image: string;
  tips: string[];
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "espresso",
    time: "08:30 AM",
    tag: "Morning Ritual",
    title: "Morning Espresso & Cornetto",
    description: "Step down to the local corner bar from your apartment. Enjoy a freshly pulled espresso and warm pistachio cornetto while greeting the local barista.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "commute",
    time: "10:15 AM",
    tag: "Campus Commute",
    title: "Walking to Class through Piazzas",
    description: "A scenic 12-15 min stroll from Santa Croce past the Bargello and Piazza della Signoria to your U.S. study campus building.",
    image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lunch",
    time: "01:15 PM",
    tag: "Lunch & Fresh Market",
    title: "Lunch at Sant'Ambrogio Market",
    description: "Grab a warm panino or fresh bowl of schiacciata panini at da Rocco. Pick up fresh tomatoes, basil, and cheese for tonight's group dinner.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "study",
    time: "04:00 PM",
    tag: "Study Session",
    title: "Rooftop Study at Oblate Library",
    description: "Work on your Renaissance Art history papers on the open-air cloister rooftop café with an uninterrupted close-up panorama of the Duomo.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sunset",
    time: "07:30 PM",
    tag: "Social & Aperitivo",
    title: "Sunset by the Arno River & Aperitivo",
    description: "Watch the golden sun dip over the Ponte Vecchio from the riverbank in Santo Spirito while planning your upcoming weekend trip to Rome and Tuscany.",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
  },
];

const GUIDE_CARDS: GuideCard[] = [
  {
    id: "transit",
    category: "transit",
    badgeIcon: <Bus className="w-3.5 h-3.5" />,
    badgeLabel: "Public Transit",
    subLabel: "€1.70 / 90-min • T1/T2 Tram",
    title: "Florentine Public Transit (Autolinee Toscane)",
    description: "Florence is compact and walkable, but electric buses and sleek air-conditioned light rail lines (T1 and T2) connecting Peretola Airport to Santa Maria Novella station are fast and reliable.",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
    tips: [
      "Single bus/tram tickets cost €1.70 and are valid for 90 minutes. Must validate on boarding.",
      "Buy tickets inside the 'At bus' app or contactless card tap on the onboard validator.",
      "Tram line T2 connects Santa Maria Novella train station directly to Florence Peretola Airport (FLR).",
    ],
  },
  {
    id: "biking",
    category: "transit",
    badgeIcon: <Bike className="w-3.5 h-3.5" />,
    badgeLabel: "Biking & River Ride",
    subLabel: "€0.25/min Student Pass",
    title: "Bike Sharing with RideMovi along the Arno",
    description: "Dockless electric and pedal bikes are parked all across Florence. Ideal for riding along the Arno river cycle paths and arriving from Santa Croce to Oltrarno in under 10 minutes.",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    tips: [
      "Monthly student passes are around €12/month for unlimited 30-minute rides.",
      "Ride in marked bike lanes and never in crowded pedestrian zones during high peak hours.",
      "Park in designated spoked parking bays to avoid an automatic €5 unparked fine.",
    ],
  },
  {
    id: "markets",
    category: "markets",
    badgeIcon: <ShoppingBag className="w-3.5 h-3.5" />,
    badgeLabel: "Food & Fresh Markets",
    subLabel: "Sant'Ambrogio / Conad / Coop",
    title: "Fresh Historic Markets vs. Supermarkets",
    description: "Where you shop dictates your monthly food budget and health. Traditional open markets offer prime local produce without middleman markups, with staff who love to chat and help you practice Italian.",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
    tips: [
      "Mercato di Sant'Ambrogio: The real local hub for vegetables, cheeses, porchetta, and fresh bread.",
      "Supermarkets: Conad City and Pam Local are inside the historic center; Esselunga (cheaper, slightly further) and Coop.",
      "Remember: Italian center independent grocers close on Sunday and have limited Sunday hours.",
    ],
  },
  {
    id: "study",
    category: "study",
    badgeIcon: <BookOpen className="w-3.5 h-3.5" />,
    badgeLabel: "Study Spots & Wi-Fi",
    subLabel: "Florence Views • Free High-Speed Wi-Fi",
    title: "Best Study Cafés & Rooftop Views",
    description: "Traditional Italian bars are standing-room espresso spots. For laptop study hours, head to historic public libraries and specialty cafes with fast internet and charging ports.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    tips: [
      "Biblioteca delle Oblate: Public library with a breezy rooftop café looking directly onto Brunelleschi's dome.",
      "Ditta Artigianale: Specialty coffee roasters with laptops allowed, high-speed Wi-Fi, and avocado toast.",
      "Le Murate Caffè Letterario: Reformed convent courtyard with shaded tables and quiet study spaces.",
    ],
  },
  {
    id: "sim",
    category: "sim",
    badgeIcon: <Smartphone className="w-3.5 h-3.5" />,
    badgeLabel: "Mobile & Internet",
    subLabel: "€7.99/mo for 150GB 5G",
    title: "Italian SIM Cards & 5G Roaming",
    description: "Avoid hefty $10/day US carrier roaming rates by picking up a cheap Italian SIM card (Iliad or Fastweb) within your first 48 hours of landing in Italy.",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80",
    tips: [
      "Cost: €7.99 to €9.99/month for 150GB to 200GB 5G data plus unlimited European call/text.",
      "Self-kiosk setup near Santa Maria Novella station with your passport in 5 minutes.",
      "Works seamlessly across Europe (Spain, France, Germany) with zero roaming fees.",
    ],
  },
  {
    id: "recycling",
    category: "markets",
    badgeIcon: <Recycle className="w-3.5 h-3.5" />,
    badgeLabel: "Household & Recycling",
    subLabel: "Chiavetta Smart Key • Trash Rules",
    title: "Garbage Recycling (Raccolta Differenziata)",
    description: "Florence is proud of its green waste initiatives. Modern underground municipal dumpsters require an electronic digital card key ('chiavetta') to open.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    tips: [
      "Your landlord provides the electronic digital key chiavetta for your street bins.",
      "Strict sorting: Organic (brown), Paper & cardboard (blue), Packaging & plastics (yellow), Non-recyclable (gray).",
      "Always break down cardboard boxes from package delivery before recycling.",
    ],
  },
];

export default function DailyLifePage() {
  const { openPlanModal } = usePlanModal();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Daily Life Tips" },
    { id: "transit", label: "Transit & Biking" },
    { id: "markets", label: "Markets & Groceries" },
    { id: "study", label: "Study Cafés & Wi-Fi" },
    { id: "sim", label: "SIM" },
  ];

  const filteredGuides = activeCategory === "all"
    ? GUIDE_CARDS
    : GUIDE_CARDS.filter((c) => c.category === activeCategory);

  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION - REDESIGNED TO EXACT SCREENSHOT SPEC */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full bg-[#080E1C] text-white overflow-hidden py-16 sm:py-20 lg:py-24">
        {/* Subdued Italian background scenery */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=2000&q=80"
            alt="Florence Scenery"
            fill
            priority
            className="object-cover opacity-15 brightness-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080E1C] via-[#080E1C]/95 to-[#0B1325]/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              {/* Tag Capsule */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2F0B13]/90 border border-[#5A1523] text-[#FFA8B7] text-[10.5px] font-bold tracking-wider uppercase shadow-xs">
                {/* 4-point sparkle icon matching screenshot */}
                <svg
                  className="w-3 h-3 text-[#FF3B5C] shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
                <span>FLORENTINE STUDENT LIFE &amp; NEIGHBORHOOD GUIDE</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Daily Life in Florence
              </h1>

              {/* Exact Subtitle from screenshot */}
              <p className="text-xs sm:text-sm md:text-[15px] text-[#A0AEC0] leading-relaxed max-w-xl font-normal">
                From morning espressos and vibrant fresh markets to tram passes, study terraces, and Italian apartment etiquette — here is how you and your roommates will navigate Florence every day during Spring 2027.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => openPlanModal()}
                  className="py-3 px-5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-[0_4px_22px_rgba(220,38,38,0.45)] flex items-center gap-2 transition-all"
                >
                  <span>Explore Housing Near Campus</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/housing"
                  className="py-3 px-5 rounded-xl bg-[#222E42]/90 hover:bg-[#2A3952] border border-[#354663]/60 text-white font-semibold text-xs sm:text-sm transition-all"
                >
                  <span>Check Neighborhoods</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Floating Preview Card (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[340px] sm:max-w-[360px] rounded-2xl bg-[#162032]/90 backdrop-blur-md border border-[#27354E] p-3.5 sm:p-4 shadow-2xl">
                {/* Photo Thumbnail */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3 bg-slate-900">
                  <Image
                    src="https://images.unsplash.com/photo-1502005229762-ee1b2b8ab68f?auto=format&fit=crop&w=800&q=80"
                    alt="Tuscan Living Experience"
                    fill
                    className="object-cover"
                  />
                  {/* Exact Red Badge from screenshot: Tuscan Living Experience */}
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-[#DC2626] text-white text-[10px] font-extrabold tracking-wide shadow-sm">
                    Tuscan Living Experience
                  </div>
                </div>

                {/* 3 Exact Stats Rows from screenshot */}
                <div className="space-y-2 pt-1 text-[11px] font-medium">
                  {/* Row 1 */}
                  <div className="flex items-center justify-between pb-2 border-b border-[#24314A]/80">
                    <span className="text-slate-400">Average Daily Transit</span>
                    <span className="font-bold text-white">100% Walkable</span>
                  </div>

                  {/* Row 2 */}
                  <div className="flex items-center justify-between pb-2 border-b border-[#24314A]/80">
                    <span className="text-slate-400">Monthly Grocery Cost</span>
                    <span className="font-bold text-[#10B981]">~€220 - €280</span>
                  </div>

                  {/* Row 3 */}
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-slate-400">Coffee Counter Price</span>
                    <span className="font-bold text-slate-200">€1.20 Espresso</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: VISUAL TIMELINE */}
      {/* ------------------------------------------------------------- */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-red-600 mb-1">
                Visual Timeline
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                A Day in the Life: Living in Florence
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                See what your daily routine feels like when you live in a student apartment in the historic center.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold self-start sm:self-auto shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>Student Snapshot</span>
            </div>
          </div>

          {/* 3-Column Timeline Grid matching screenshot (Row 1: 3 cards, Row 2: 2 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIMELINE_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Photo with badges */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Top Left Time Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white font-bold text-[10px] tracking-wide">
                      {item.time}
                    </div>

                    {/* Bottom Left Red Category Pill */}
                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-[#DC2626] text-white font-bold text-[10px] uppercase tracking-wider shadow-xs">
                      {item.tag}
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="p-4 space-y-1.5">
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: ESSENTIAL GUIDE WITH FILTER PILLS */}
      {/* ------------------------------------------------------------- */}
      <section className="py-14 sm:py-18 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Category Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-red-600 mb-1">
                Essential Guide
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Everything You Need to Know as a New Resident
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 self-start lg:self-auto">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#DC2626] text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6 Guide Cards in 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Header with gradient & overlay titles */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                    {/* Top Left Icon Pill */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                      {guide.badgeIcon}
                      <span>{guide.badgeLabel}</span>
                    </div>

                    {/* Bottom Sub-label & Title overlay */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                      <p className="text-[10px] font-medium text-slate-300 mb-0.5">
                        {guide.subLabel}
                      </p>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug drop-shadow-xs">
                        {guide.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body description & student tips */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {guide.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
                        Student Insider Tips
                      </p>
                      {guide.tips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-700 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Button */}
                <div className="p-4 pt-0">
                  <Link
                    href="/housing"
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200 transition-colors shadow-2xs"
                  >
                    <span>Find Flats Near This Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: THE FLORENTINE "RIPOSO" BANNER (WHITE BACKGROUND) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Image (5 cols) */}
            <div className="md:col-span-5 relative aspect-[16/10] md:h-full w-full rounded-xl sm:rounded-2xl overflow-hidden min-h-[220px]">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                alt="Florentine Cafe Bistro"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold tracking-wide">
                Local Customs &amp; Etiquette
              </div>
            </div>

            {/* Right Text (7 cols) */}
            <div className="md:col-span-7 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 block">
                Local Florentine Life
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                The Florentine &quot;Riposo&quot; &amp; Afternoon Rhythm
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Between 1:30 PM and 3:30 PM, independent family-owned pharmacies, bakery pasticcerias, and hardware stores close for lunch and rest. Plan your grocery runs and apartment errand shopping before 1:00 PM or after 4:00 PM — or shop at continuous-hours supermarkets like Conad!
              </p>

              <div className="flex flex-wrap gap-2.5 pt-2">
                <button
                  onClick={() => openPlanModal()}
                  className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  Review Housing Plan
                </button>
                <Link
                  href="/housing"
                  className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Explore Neighborhoods
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
