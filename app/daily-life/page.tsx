"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Bus,
  Smartphone,
  CreditCard,
  ShoppingBag,
  Utensils,
  Dumbbell,
  BookOpen,
  Calendar,
  Users,
  CheckCircle2,
  X
} from "lucide-react";
import { usePlanModal } from "../components/PlanModalContext";

interface DailyCategoryCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  details: {
    tagline: string;
    tips: string[];
  };
}

const DAILY_CATEGORIES: DailyCategoryCard[] = [
  {
    id: "transportation",
    title: "Transportation",
    subtitle: "Buses, trams, trains, and student passes",
    icon: <Bus className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    iconBg: "bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/40",
    details: {
      tagline: "Navigating Florence and Tuscan Rail",
      tips: [
        "Single city bus & tram tickets cost €1.70, valid for 90 minutes. Must validate immediately upon boarding.",
        "Tram lines T1 and T2 run every 4-6 minutes; T2 links Peretola Airport directly to Santa Maria Novella (SMN) Station.",
        "RideMovi dockless e-bikes are parked across town. Monthly student pass is around €12 for unlimited 30-min rides.",
        "Trenitalia regional trains from SMN take you to Pisa in 50 minutes and Lucca in 1 hour for under €10."
      ],
    },
  },
  {
    id: "sim",
    title: "SIM Cards & Phones",
    subtitle: "Local carriers and setup instructions",
    icon: <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    iconBg: "bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-900/40",
    details: {
      tagline: "Stay Connected Across Italy & Europe",
      tips: [
        "Pick up an Iliad or Fastweb Italian SIM card near SMN station within 48 hours of landing.",
        "Plans start at €7.99 to €9.99/month for 150GB–200GB 5G data plus unlimited EU calling & SMS.",
        "Instant self-service kiosk registration requires only your physical passport and credit card (5 minutes).",
        "Includes seamless European EU roaming (Spain, France, Germany, Switzerland) with zero extra fees."
      ],
    },
  },
  {
    id: "banking",
    title: "Banking & Money",
    subtitle: "Accounts, cards, and everyday tips",
    icon: <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/40",
    details: {
      tagline: "Smart Spending & Avoiding Hefty Fees",
      tips: [
        "Use Revolut, Wise, or travel cards with 0% foreign transaction fees for everyday purchases.",
        "Contactless card tap (Apple Pay / Google Pay) is accepted virtually everywhere, even for a €1.20 espresso.",
        "Withdraw euros from official Italian bank ATMs (Intesa Sanpaolo, UniCredit, BMPS) and always decline ATM DCC dynamic currency conversion.",
        "Avoid bright yellow Euronet independent tourist ATMs due to inflated conversion margins and fees."
      ],
    },
  },
  {
    id: "groceries",
    title: "Groceries & Shopping",
    subtitle: "Supermarkets, markets, and essentials",
    icon: <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    iconBg: "bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/40",
    details: {
      tagline: "Fresh Tuscan Produce & Budget Pantries",
      tips: [
        "Mercato di Sant'Ambrogio: The premier authentic local open market for fresh tomatoes, prosciutto, pecorino cheese, and bakery loaves.",
        "Supermarkets in historic center: Conad City and Pam Local are convenient; Esselunga (just outside center) is significantly cheaper for weekly bulk runs.",
        "Wear the plastic disposable gloves provided in produce aisles before touching any fruits or vegetables (strictly enforced Italian etiquette).",
        "Most independent family bakeries and butchers close on Sundays and during afternoon 'riposo' (1:00 PM – 4:00 PM)."
      ],
    },
  },
  {
    id: "food",
    title: "Food & Restaurants",
    subtitle: "Popular spots and local traditions",
    icon: <Utensils className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
    iconBg: "bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900/40",
    details: {
      tagline: "Authentic Florentine Dining Etiquette",
      tips: [
        "Coffee culture: Drink espresso at the marble bar counter standing ('al banco') for €1.20 instead of €4.00 seated ('al tavolo').",
        "Aperitivo tradition: Order a Spritz or Negroni between 6:30 PM and 9:00 PM for complimentary Tuscan appetizers and bites.",
        "Coperto: Traditional cover charge (€1.50–€3.00/person) on your restaurant bill covers bread and table setting; no 20% US-style tip expected.",
        "Must-try street eats: Schiacciata ripiena (stuffed focaccia panini) at Antico Vinaio or Pino's, and lampredotto panino at San Lorenzo."
      ],
    },
  },
  {
    id: "gyms",
    title: "Gyms & Sports",
    subtitle: "Fitness centers and student discounts",
    icon: <Dumbbell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    iconBg: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900/40",
    details: {
      tagline: "Staying Active in Florence",
      tips: [
        "Medical certificate ('certificato medico per attività sportiva'): Italian law requires a doctor's wellness note to join any gym. Easily obtained from local clinics for ~€30.",
        "Student gyms: Klab (near Duomo & Mariti) and Florence Fitness offer discounted 3-month or semester packages.",
        "CUS Firenze (University Sports Center): Very budget-friendly access to gym facilities, tennis courts, and track.",
        "Scenic outdoor running: Parco delle Cascine (Florence's Central Park) and river paths along Lungarno Soderini."
      ],
    },
  },
  {
    id: "study",
    title: "Study Spaces",
    subtitle: "Libraries, cafes, and coworking",
    icon: <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    iconBg: "bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/40",
    details: {
      tagline: "Quiet Laptop Work & Rooftop Views",
      tips: [
        "Biblioteca delle Oblate: Historic cloister public library with an open-air rooftop café facing Brunelleschi's Duomo dome.",
        "Ditta Artigianale (Via de' Neri & Via dello Sprone): Specialty third-wave coffee roasters with laptops and high-speed Wi-Fi.",
        "Le Murate Caffè Letterario: Former 15th-century convent transformed into a shaded cultural café with abundant study tables.",
        "Biblioteca Nazionale Centrale: Majestic national library along the Arno river with dedicated historic research reading halls."
      ],
    },
  },
  {
    id: "events",
    title: "Events & Experiences",
    subtitle: "Day trips, nightlife, and cultural activities",
    icon: <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    iconBg: "bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-900/40",
    details: {
      tagline: "Culture, Nightlife & Weekend Travel",
      tips: [
        "'Domenica al Museo': State museums (including the Uffizi Gallery, Accademia, and Pitti Palace) offer free entry on the first Sunday of every month.",
        "Sunset gatherings: Piazzale Michelangelo is the iconic sunset spot overlooking the terracotta roofs of Florence.",
        "Weekend excursions: Easy 1-hour direct regional trains to Bologna (food capital), Lucca, Siena, and the Chianti wine region.",
        "Live music & indie cinema: Cinema Odeon and Jazz Club Firenze in Santa Croce offer student events throughout the semester."
      ],
    },
  },
  {
    id: "community",
    title: "Student Community",
    subtitle: "Meet people, local tips, and resources",
    icon: <Users className="w-5 h-5 text-pink-600 dark:text-pink-400" />,
    iconBg: "bg-pink-50 dark:bg-pink-950/40 border-pink-100 dark:border-pink-900/40",
    details: {
      tagline: "Building Your Circle in Italy",
      tips: [
        "ESN (Erasmus Student Network) Firenze: Hosts weekly language exchange tandems, pizza nights, and organized weekend trips.",
        "WhatsApp & Telegram roommate groups: Coordinate grocery shares, weekend train travel pools, and campus study sessions.",
        "Local language exchanges ('tandem linguistico'): Partner with Florentine university students to practice Italian while helping them with English.",
        "Campus student lounges: Join university-affiliated cultural tours and cooking masterclasses across Tuscany."
      ],
    },
  },
];

export default function DailyLifePage() {
  const { openPlanModal } = usePlanModal();
  const [selectedCard, setSelectedCard] = useState<DailyCategoryCard | null>(null);

  return (
    <div className="flex flex-col w-full bg-slate-50/70 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO BANNER - BRIGHT & SUNLIT MATCHING SCREENSHOT EXACTLY */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full bg-slate-900 text-white overflow-hidden py-14 sm:py-20 lg:py-24">
        {/* Italian Coastal Scenery Background in full natural daylight brightness */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/cinque_terre_banner.jpg"
            alt="Study Abroad Background - Italian Coastline"
            fill
            priority
            className="object-cover object-center md:object-[center_35%] scale-100 brightness-[1.03] contrast-[1.02]"
          />
          {/* Subtle natural daylight gradient behind left text only for clean legibility without dimming the photo */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-950/20 to-transparent z-1" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/20 to-transparent z-1" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              {/* Tag Capsule matching screenshot */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-[11px] font-semibold tracking-wider uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>FLORENTINE STUDENT LIFE &amp; NEIGHBORHOOD GUIDE</span>
              </div>

              {/* Title matching screenshot */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                Daily Life in Florence
              </h1>

              {/* Exact Subtitle from screenshot */}
              <p className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed max-w-xl font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
                From morning espressos and vibrant fresh markets to tram passes, study terraces, and Italian apartment etiquette — here is how you and your roommates will navigate Florence every day during Spring 2027.
              </p>

              {/* Buttons matching screenshot */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openPlanModal()}
                  className="py-3 px-5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Explore Housing Near Campus</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/housing"
                  className="py-3 px-5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Check Neighborhoods</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Floating Preview Glass Card (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/20 p-5 shadow-2xl relative text-left">
                {/* Photo Thumbnail */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-3.5 bg-slate-900">
                  <Image
                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
                    alt="Tuscan Living Experience"
                    fill
                    className="object-cover"
                  />
                  {/* Exact Red Badge from screenshot: Tuscan Living Experience */}
                  <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-[#DC2626] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Tuscan Living Experience
                  </div>
                </div>

                {/* 3 Exact Stats Rows from screenshot */}
                <div className="space-y-2.5 text-xs font-medium">
                  {/* Row 1 */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 border border-white/15">
                    <span className="text-slate-200">Average Daily Transit</span>
                    <span className="font-bold text-white">100% Walkable</span>
                  </div>

                  {/* Row 2 */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 border border-white/15">
                    <span className="text-slate-200">Monthly Grocery Cost</span>
                    <span className="font-bold text-emerald-400">~€220 - €280</span>
                  </div>

                  {/* Row 3 */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 border border-white/15">
                    <span className="text-slate-200">Coffee Counter Price</span>
                    <span className="font-bold text-slate-100">€1.20 Espresso</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. BODY CONTENT CONTAINER MATCHING SCREENSHOT */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-7 w-full">
        {/* ------------------------------------------------------------- */}
        {/* 2A. 9 QUICK CATEGORY CARDS (3x3 GRID) */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {DAILY_CATEGORIES.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer flex items-center gap-3.5 text-left group"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${card.iconBg}`}
              >
                {card.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-red-600 transition-colors truncate">
                  {card.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug truncate">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2B. WIDE "LIVE LIKE A LOCAL" BANNER BAR */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 sm:p-4 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Small Thumbnail Image */}
            <div className="relative w-16 h-11 sm:w-20 sm:h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
              <Image
                src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80"
                alt="Florentine street view"
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                Live like a local
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Explore our guides to make the most of your time in Florence.
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedCard(DAILY_CATEGORIES[0])}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0 shadow-2xs self-start sm:self-auto"
          >
            <span>View Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2C. FEATURED CALLOUT CARD: THE FLORENTINE "RIPOSO" */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
          {/* Left Column Image (5 cols) */}
          <div className="md:col-span-5 relative aspect-[16/10] md:h-full w-full rounded-2xl overflow-hidden min-h-[220px] bg-slate-100 dark:bg-slate-800">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
              alt="Florentine Cafe Bistro"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[10px] font-bold tracking-wide shadow-xs">
              Local Customs &amp; Etiquette
            </div>
          </div>

          {/* Right Column Text (7 cols) */}
          <div className="md:col-span-7 space-y-3">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-red-600 block">
              LOCAL FLORENTINE LIFE
            </span>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
              The Florentine &quot;Riposo&quot; &amp; Afternoon Rhythm
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Between 1:00 PM and 3:30 PM, independent family-owned pharmacies, bakery pasticcerias, and hardware stores close for lunch and rest. Plan your grocery runs and apartment errand shopping before 1:00 PM or after 4:00 PM — or shop at continuous-hours supermarkets like Conad!
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => openPlanModal()}
                className="py-2.5 px-4.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold text-xs shadow-sm shadow-red-600/20 transition-all cursor-pointer"
              >
                Review Housing Plan
              </button>
              <Link
                href="/housing"
                className="py-2.5 px-4.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
              >
                Explore Neighborhoods
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. INTERACTIVE CATEGORY GUIDE MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#111827] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border ${selectedCard.iconBg}`}
                >
                  {selectedCard.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {selectedCard.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {selectedCard.details.tagline}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCard(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-2.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                Florentine Student Insider Tips
              </p>
              <div className="space-y-2">
                {selectedCard.details.tips.map((tip, idx) => (
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
                onClick={() => setSelectedCard(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/housing"
                className="px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold text-xs shadow-sm shadow-red-600/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Find Student Flats</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
