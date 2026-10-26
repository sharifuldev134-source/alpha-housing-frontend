"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Building,
  GraduationCap,
  Bed,
  Users,
  ShieldCheck,
  Heart,
  Check,
  CheckCircle2,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Maximize2,
  Lock,
  ChevronDown,
  Layers,
  X,
  Share2,
  FileText,
  SlidersHorizontal,
} from "lucide-react";
import { usePlanModal } from "../components/PlanModalContext";

interface HousingItem {
  id: string;
  title: string;
  address: string;
  neighborhood: string;
  totalPrice: number;
  perStudentPrice: number;
  safetyScore: number;
  walkMinutes: number;
  campusName: string;
  agency: string;
  agencyType: "alpha" | "local";
  bedrooms: string;
  bathrooms: string;
  sqm: string;
  image: string;
  gallery: string[];
  amenities: string[];
  isEmmaMatch?: boolean;
  isAlphaCertified?: boolean;
  isAuditedAvailable?: boolean;
  nearIes?: boolean;
}

const HOUSING_LISTINGS: HousingItem[] = [
  {
    id: "via-dei-neri",
    title: "Via dei Neri Apartment",
    address: "Via dei Neri, 42, 50122 Firenze FI, Italy",
    neighborhood: "Santa Croce",
    totalPrice: 4800,
    perStudentPrice: 1200,
    safetyScore: 95,
    walkMinutes: 12,
    campusName: "IES Abroad",
    agency: "SpotAHome",
    agencyType: "alpha",
    bedrooms: "4 Single Beds",
    bathrooms: "2 Baths",
    sqm: "125 m²",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: ["Furnished", "Wi-Fi", "Elevator", "Air Conditioning", "Dishwasher / Kitchen"],
    isEmmaMatch: true,
    isAlphaCertified: true,
    isAuditedAvailable: true,
    nearIes: true,
  },
  {
    id: "santa-croce-apt",
    title: "Santa Croce Apartment",
    address: "Piazza Santa Croce, 14, 50122 Firenze FI, Italy",
    neighborhood: "Santa Croce",
    totalPrice: 4500,
    perStudentPrice: 1125,
    safetyScore: 93,
    walkMinutes: 14,
    campusName: "FSU / Syracuse",
    agency: "HousingAnywhere",
    agencyType: "alpha",
    bedrooms: "4 Single Beds",
    bathrooms: "2 Baths",
    sqm: "110 m²",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: ["Furnished", "Terrace / Balcony", "Wi-Fi", "AC in all rooms", "Dishwasher"],
    isEmmaMatch: true,
    isAlphaCertified: true,
    isAuditedAvailable: true,
    nearIes: false,
  },
  {
    id: "santo-spirito-apt",
    title: "Santo Spirito Apartment",
    address: "Via Maggio, 27, 50125 Firenze FI, Italy",
    neighborhood: "Santo Spirito",
    totalPrice: 3900,
    perStudentPrice: 975,
    safetyScore: 90,
    walkMinutes: 16,
    campusName: "NYU Florence",
    agency: "Local Agency",
    agencyType: "local",
    bedrooms: "4 Single Beds",
    bathrooms: "1 Bath",
    sqm: "105 m²",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: ["Furnished", "Wi-Fi", "Heating", "Washing Machine"],
    isEmmaMatch: false,
    isAlphaCertified: false,
    isAuditedAvailable: true,
    nearIes: false,
  },
  {
    id: "san-frediano-terrace",
    title: "San Frediano Terrace Loft",
    address: "Piazza del Carmine, 3, 50124 Firenze FI, Italy",
    neighborhood: "San Frediano",
    totalPrice: 4200,
    perStudentPrice: 1050,
    safetyScore: 91,
    walkMinutes: 15,
    campusName: "IES Abroad",
    agency: "SpotAHome",
    agencyType: "alpha",
    bedrooms: "4 Single Beds",
    bathrooms: "2 Baths",
    sqm: "115 m²",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: ["Furnished", "Panoramic Rooftop Terrace", "Wi-Fi", "Air Conditioning", "Dishwasher"],
    isEmmaMatch: false,
    isAlphaCertified: true,
    isAuditedAvailable: true,
    nearIes: true,
  },
  {
    id: "campo-di-marte-residence",
    title: "Campo di Marte Green Residence",
    address: "Via del Campo d'Arrigo, 50137 Firenze FI, Italy",
    neighborhood: "Campo di Marte",
    totalPrice: 3400,
    perStudentPrice: 850,
    safetyScore: 89,
    walkMinutes: 22,
    campusName: "University of Florence",
    agency: "HousingAnywhere",
    agencyType: "alpha",
    bedrooms: "4 Single Beds",
    bathrooms: "1 Bath",
    sqm: "120 m²",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Furnished", "Balcony", "Garden View", "Wi-Fi", "Bicycle Parking"],
    isEmmaMatch: false,
    isAlphaCertified: true,
    isAuditedAvailable: false,
    nearIes: false,
  },
  {
    id: "duomo-view-flat",
    title: "Duomo View Historic Flat",
    address: "Via dei Servi, 18, 50122 Firenze FI, Italy",
    neighborhood: "Duomo / Center",
    totalPrice: 5100,
    perStudentPrice: 1275,
    safetyScore: 94,
    walkMinutes: 5,
    campusName: "Stanford in Florence",
    agency: "Local Historic",
    agencyType: "local",
    bedrooms: "4 Single Beds",
    bathrooms: "2 Baths",
    sqm: "135 m²",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Furnished", "Duomo View", "AC in each bedroom", "Elevator", "Fiber Internet"],
    isEmmaMatch: true,
    isAlphaCertified: false,
    isAuditedAvailable: true,
    nearIes: true,
  },
  {
    id: "piazza-san-marco-flat",
    title: "Piazza San Marco Garden Flat",
    address: "Via Cavour, 74, 50129 Firenze FI, Italy",
    neighborhood: "San Marco",
    totalPrice: 3800,
    perStudentPrice: 1266,
    safetyScore: 92,
    walkMinutes: 9,
    campusName: "Accademia / IES",
    agency: "SpotAHome",
    agencyType: "alpha",
    bedrooms: "3 Single Beds",
    bathrooms: "2 Baths",
    sqm: "105 m²",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Furnished", "Private Garden patio", "Wi-Fi", "Air Conditioning", "Dishwasher"],
    isEmmaMatch: false,
    isAlphaCertified: true,
    isAuditedAvailable: true,
    nearIes: true,
  },
  {
    id: "ponte-vecchio-palazzo",
    title: "Ponte Vecchio Riverside Palazzo",
    address: "Lungarno Acciaiuoli, 16, 50123 Firenze FI, Italy",
    neighborhood: "Duomo / Center",
    totalPrice: 4900,
    perStudentPrice: 1225,
    safetyScore: 96,
    walkMinutes: 8,
    campusName: "Gonzaga / Syracuse",
    agency: "HousingAnywhere",
    agencyType: "alpha",
    bedrooms: "4 Single Beds",
    bathrooms: "2 Baths",
    sqm: "140 m²",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Furnished", "River View", "Fiber Wi-Fi", "Air Conditioning", "Dishwasher"],
    isEmmaMatch: true,
    isAlphaCertified: true,
    isAuditedAvailable: true,
    nearIes: true,
  },
];

export default function HousingPage() {
  const { openPlanModal } = usePlanModal();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("all");
  const [selectedCampus, setSelectedCampus] = useState("all");
  const [selectedBedrooms, setSelectedBedrooms] = useState("all");
  const [maxStudentBudget, setMaxStudentBudget] = useState(1400);

  // Amenities Filter
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>({
    "Air Conditioning": false,
    "Wi-Fi": false,
    "Elevator": false,
    "Study Desks": false,
    "Dishwasher": false,
    "Balcony": false,
    "Private Bath": false,
  });

  // Category tab
  const [activeCategoryTab, setActiveCategoryTab] = useState<"all" | "audited" | "alpha" | "nearIes">("all");

  // Sort State
  const [sortOption, setSortOption] = useState<"best" | "price-asc" | "safety">("best");

  // Favorites state
  const [savedFlats, setSavedFlats] = useState<Record<string, boolean>>({
    "via-dei-neri": true,
    "santa-croce-apt": true,
  });

  // Rent Splitter state
  const [splitterRoommates, setSplitterRoommates] = useState<number>(4);
  const [includeUtilities, setIncludeUtilities] = useState<boolean>(true);

  // Modal State
  const [inspectModalFlat, setInspectModalFlat] = useState<HousingItem | null>(null);
  const [activeModalPhoto, setActiveModalPhoto] = useState<number>(0);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedFlats((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAmenity = (name: string) => {
    setSelectedAmenities((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Filter listings
  const filteredListings = useMemo(() => {
    return HOUSING_LISTINGS.filter((flat) => {
      // Search term
      if (
        searchTerm &&
        !flat.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !flat.address.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Neighborhood
      if (selectedNeighborhood !== "all" && flat.neighborhood !== selectedNeighborhood) {
        return false;
      }

      // Campus
      if (selectedCampus !== "all" && !flat.campusName.toLowerCase().includes(selectedCampus.toLowerCase())) {
        return false;
      }

      // Bedrooms
      if (selectedBedrooms !== "all") {
        if (!flat.bedrooms.startsWith(selectedBedrooms)) return false;
      }

      // Budget
      if (flat.perStudentPrice > maxStudentBudget) {
        return false;
      }

      // Quick filter tabs
      if (activeCategoryTab === "audited" && !flat.isAuditedAvailable) return false;
      if (activeCategoryTab === "alpha" && !flat.isAlphaCertified) return false;
      if (activeCategoryTab === "nearIes" && !flat.nearIes) return false;

      return true;
    }).sort((a, b) => {
      if (sortOption === "price-asc") return a.perStudentPrice - b.perStudentPrice;
      if (sortOption === "safety") return b.safetyScore - a.safetyScore;
      return 0; // Default best match
    });
  }, [
    searchTerm,
    selectedNeighborhood,
    selectedCampus,
    selectedBedrooms,
    maxStudentBudget,
    activeCategoryTab,
    sortOption,
  ]);

  return (
    <div className="flex flex-col w-full bg-[#FAFAFA] dark:bg-[#0B0F17] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* ========================================================= */}
      {/* 1. HERO SECTION - SUNLIT APARTMENT & FLORENCE VIEW */}
      {/* ========================================================= */}
      <section className="relative pt-12 pb-24 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080E1C] text-white">
        {/* Background Image: Sunlit Apartment Interior with Terrace overlooking Florence Duomo */}
        <div className="absolute inset-0">
          <Image
            src="/images/housing_duomo_room.jpg"
            alt="Florentine Student Apartment Interior and Duomo View"
            fill
            priority
            className="object-cover object-center opacity-65 brightness-[0.88] contrast-[1.05] scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080E1C]/90 via-[#080E1C]/65 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#080E1C]/15 to-[#080E1C]/60" />
        </div>

        <div className="relative max-w-7xl mx-auto space-y-4 text-center sm:text-left">
          {/* Top Pill matching screenshot */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3B1218]/90 border border-[#6B1E2B] text-[#FFA8B8] text-[10.5px] font-bold tracking-wider uppercase backdrop-blur-md">
            <span>HOUSING GUIDANCE</span>
          </div>

          {/* Big Title matching screenshot */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Find the right place to live in Florence
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#A0AEC0] max-w-2xl leading-relaxed">
            Explore vetted housing options, get expert guidance on neighborhoods, and understand what fits your lifestyle, budget and university location.
          </p>

          {/* ========================================================= */}
          {/* FLOATING INTERACTIVE SEARCH & FILTER CARD */}
          {/* ========================================================= */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200/90 text-left space-y-4 text-xs mt-6">
            {/* Row 1: 4 Main Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Search input */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Search Apartment or Street
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="e.g. Via dei Neri, Florence..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                  />
                </div>
              </div>

              {/* Neighborhood dropdown */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Neighborhood
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedNeighborhood}
                    onChange={(e) => setSelectedNeighborhood(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626] appearance-none"
                  >
                    <option value="all">All Florence Neighborhoods</option>
                    <option value="Santa Croce">Santa Croce (9.3 Safe)</option>
                    <option value="San Frediano">San Frediano (9.1 Safe)</option>
                    <option value="Santo Spirito">Santo Spirito (9.0 Safe)</option>
                    <option value="Duomo / Center">Duomo / Center (9.4 Safe)</option>
                    <option value="Campo di Marte">Campo di Marte (8.9 Safe)</option>
                    <option value="San Marco">San Marco (9.2 Safe)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Study Campus dropdown */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Your Study Campus
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedCampus}
                    onChange={(e) => setSelectedCampus(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626] appearance-none"
                  >
                    <option value="all">All University Programs</option>
                    <option value="IES Abroad">IES Abroad Florence</option>
                    <option value="FSU">FSU / Syracuse</option>
                    <option value="NYU">NYU Florence</option>
                    <option value="Stanford">Stanford in Florence</option>
                    <option value="Gonzaga">Gonzaga / Syracuse</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Bedrooms dropdown */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Bedrooms
                </label>
                <div className="relative">
                  <Bed className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedBedrooms}
                    onChange={(e) => setSelectedBedrooms(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626] appearance-none"
                  >
                    <option value="all">Any (3–5)</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5">5 Bedrooms</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 2: Amenities Pills & Budget Slider */}
            <div className="pt-2 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Amenities tags */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3" />
                  Amenities:
                </span>
                {Object.keys(selectedAmenities).map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => toggleAmenity(name)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      selectedAmenities[name]
                        ? "bg-[#DC2626] text-white shadow-2xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>

              {/* Max Student Budget */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Max/Student:
                </span>
                <span className="text-sm font-extrabold text-[#DC2626]">
                  €{maxStudentBudget}/mo
                </span>
                <input
                  type="range"
                  min="800"
                  max="1600"
                  step="50"
                  value={maxStudentBudget}
                  onChange={(e) => setMaxStudentBudget(Number(e.target.value))}
                  className="w-28 accent-[#DC2626] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. FOUR TRUST & SAFETY GUARANTEE PILLS */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Pill 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 leading-tight">
                100% In-Person Inspected
              </div>
              <div className="text-[10.5px] text-slate-500 mt-0.5">
                Photos verified, noise levels checked
              </div>
            </div>
          </div>

          {/* Pill 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 leading-tight">
                Legal Italian Leases
              </div>
              <div className="text-[10.5px] text-slate-500 mt-0.5">
                Standard student registered contracts
              </div>
            </div>
          </div>

          {/* Pill 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 leading-tight">
                Equal Price Splits
              </div>
              <div className="text-[10.5px] text-slate-500 mt-0.5">
                Fair room share formulas for group members
              </div>
            </div>
          </div>

          {/* Pill 4 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 leading-tight">
                Escrow Protection
              </div>
              <div className="text-[10.5px] text-slate-500 mt-0.5">
                Deposits held until move-in check
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. LISTINGS HEADER & FILTER TABS */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Florentine Student Apartments
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-[#DC2626] font-extrabold text-[10px]">
                78 AVAILABLE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose an apartment to inspect floor plans, safety audits, and roommate split.
            </p>
          </div>

          {/* Quick pills right */}
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="text-slate-400 text-[11px] font-semibold">Filter:</span>
            <button
              onClick={() => setSortOption("price-asc")}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-colors ${
                sortOption === "price-asc"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              Budget Friendly
            </button>
            <button
              onClick={() => {
                setActiveCategoryTab("nearIes");
              }}
              className="px-3 py-1.5 rounded-xl text-[11px] font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Emma&apos;s Match
            </button>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl text-[11px] font-bold border border-slate-200 bg-white text-slate-700 focus:outline-none"
            >
              <option value="best">Sort: Best Match</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="safety">Highest Safety Score</option>
            </select>
          </div>
        </div>

        {/* Filter subtabs */}
        <div className="flex items-center gap-2 pt-3 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveCategoryTab("all")}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeCategoryTab === "all"
                ? "bg-[#DC2626] text-white shadow-2xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            All Flats (78)
          </button>
          <button
            onClick={() => setActiveCategoryTab("audited")}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeCategoryTab === "audited"
                ? "bg-[#DC2626] text-white shadow-2xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            Audited Available (32)
          </button>
          <button
            onClick={() => setActiveCategoryTab("alpha")}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeCategoryTab === "alpha"
                ? "bg-[#DC2626] text-white shadow-2xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            Alpha 100% Compliant (54)
          </button>
          <button
            onClick={() => setActiveCategoryTab("nearIes")}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeCategoryTab === "nearIes"
                ? "bg-[#DC2626] text-white shadow-2xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            Near IES (14)
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. FLATS 2-COLUMN GRID (MATCHING SCREENSHOT) */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {filteredListings.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
            <Building className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No matching apartments found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your budget or clearing filters to see more results.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedNeighborhood("all");
                setSelectedCampus("all");
                setSelectedBedrooms("all");
                setMaxStudentBudget(1600);
                setActiveCategoryTab("all");
              }}
              className="py-2 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs mt-2"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredListings.map((flat) => {
              const isSaved = savedFlats[flat.id];
              return (
                <div
                  key={flat.id}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image with Badges */}
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={flat.image}
                        alt={flat.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                        {flat.isAlphaCertified ? (
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-600/95 backdrop-blur-md text-white font-bold text-[10px] flex items-center gap-1 shadow-xs">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Alpha Certified
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 backdrop-blur-md text-white font-bold text-[10px] shadow-xs">
                            Local Agency
                          </span>
                        )}
                        <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-800 font-bold text-[10px] shadow-xs">
                          {flat.agency}
                        </span>
                      </div>

                      {/* Heart Save Button */}
                      <button
                        onClick={(e) => toggleSave(flat.id, e)}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isSaved
                            ? "bg-[#DC2626] text-white shadow-md"
                            : "bg-white/80 backdrop-blur-md text-slate-700 hover:bg-white"
                        }`}
                        title="Save to Group Favorites"
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? "fill-white text-white" : ""}`} />
                      </button>

                      {/* Bottom Image Walk Time Badge */}
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        <span>{flat.walkMinutes} min walk to campus</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Title & Price Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#DC2626] transition-colors leading-tight">
                            {flat.title}
                          </h3>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{flat.address}</span>
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-lg sm:text-xl font-black text-slate-900">
                            €{flat.totalPrice.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">/ month total</div>
                        </div>
                      </div>

                      {/* Specs Row: Bedrooms | Bathrooms | Sqm */}
                      <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-center text-xs">
                        <div>
                          <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                            BEDROOMS
                          </div>
                          <div className="font-bold text-slate-800 mt-0.5">{flat.bedrooms}</div>
                        </div>
                        <div>
                          <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                            BATHROOMS
                          </div>
                          <div className="font-bold text-slate-800 mt-0.5">{flat.bathrooms}</div>
                        </div>
                        <div>
                          <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                            SIZE
                          </div>
                          <div className="font-bold text-slate-800 mt-0.5">{flat.sqm}</div>
                        </div>
                      </div>

                      {/* Red-tinted Highlight Box: Your Share (4 students) */}
                      <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-200/80 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold text-xs shrink-0">
                            👤
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">
                              Your Share (4 students):
                            </div>
                            <div className="text-[10px] text-slate-500">
                              Target split: €{flat.perStudentPrice}/mo
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-black text-[#DC2626]">
                            €{flat.perStudentPrice}
                          </span>
                          <span className="text-[11px] text-slate-600 font-medium">/mo</span>
                        </div>
                      </div>

                      {/* Amenities Tags */}
                      <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-600">
                        {flat.amenities.map((am) => (
                          <span
                            key={am}
                            className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/60 font-medium"
                          >
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-5 sm:p-6 pt-0 flex items-center justify-between gap-3 border-t border-slate-100 mt-1 pt-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Safety: {flat.safetyScore}/100
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveModalPhoto(0);
                          setInspectModalFlat(flat);
                        }}
                        className="py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors shadow-2xs"
                      >
                        Inspect Floor Plan
                      </button>

                      <Link
                        href={`/dashboard?tab=housing&id=${flat.id}`}
                        className="py-2 px-3.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-2xs"
                      >
                        <span>View Flat</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 5. EQUALIZE RENT SPLITTER FEATURE (DARK FOOTER BANNER) */}
      {/* ========================================================= */}
      <section className="bg-slate-950 text-white mt-12 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider inline-block">
              EQUALIZE RENT SPLITTER
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Calculate Exact Costs Per Roommate
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Solve tension before arrival: transparency formulas calculated for individual room sizes, ensuite access, and private balconies in accordance with Italian Civil Code Art. 1571.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  NUMBER OF ROOMMATES IN YOUR GROUP:
                </span>
                <div className="flex items-center gap-2">
                  {[3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSplitterRoommates(num)}
                      className={`w-10 h-10 rounded-xl font-bold transition-all ${
                        splitterRoommates === num
                          ? "bg-[#DC2626] text-white shadow-md shadow-red-500/30"
                          : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={includeUtilities}
                  onChange={(e) => setIncludeUtilities(e.target.checked)}
                  className="rounded text-[#DC2626] accent-[#DC2626]"
                />
                <span className="text-[11px]">
                  Include estimated utilities (€75–95 /mo: gas, electricity, Wi-Fi &amp; waste tax)
                </span>
              </label>
            </div>
          </div>

          {/* Right Column (5 cols): Dynamic Room Price Split Cards */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 space-y-1">
                <div className="text-[10px] text-slate-400">Master en-Suite</div>
                <div className="text-lg font-black text-white">
                  €{includeUtilities ? 1350 : 1265}
                </div>
                <div className="text-[9px] text-emerald-400">Olivia (Lead)</div>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 space-y-1">
                <div className="text-[10px] text-slate-400">Double Balcony</div>
                <div className="text-lg font-black text-white">
                  €{includeUtilities ? 1230 : 1145}
                </div>
                <div className="text-[9px] text-emerald-400">Emma</div>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 space-y-1">
                <div className="text-[10px] text-slate-400">Standard Cozy</div>
                <div className="text-lg font-black text-white">
                  €{includeUtilities ? 1110 : 1025}
                </div>
                <div className="text-[9px] text-emerald-400">Sophie &amp; Mia</div>
              </div>
            </div>

            <div className="text-center pt-1">
              <p className="text-[11px] text-slate-400">
                Total €4,800/mo flat • No hidden fees. Split mathematically fair.
              </p>
            </div>

            <button
              onClick={() => openPlanModal()}
              className="w-full py-3 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/25"
            >
              <span>Lock This Group Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. INSPECT FLOORPLAN & GALLERY MODAL */}
      {/* ========================================================= */}
      {inspectModalFlat && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl text-left space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {inspectModalFlat.title} — Floorplan &amp; Verified Photos
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {inspectModalFlat.address} • {inspectModalFlat.bedrooms} • {inspectModalFlat.sqm}
                </p>
              </div>
              <button
                onClick={() => setInspectModalFlat(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Main Image */}
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900">
              <Image
                src={inspectModalFlat.gallery[activeModalPhoto] || inspectModalFlat.image}
                alt={inspectModalFlat.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {inspectModalFlat.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveModalPhoto(idx)}
                  className={`relative h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activeModalPhoto === idx
                      ? "border-[#DC2626] scale-102"
                      : "border-slate-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Specs & CTA */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Official architectural CAD blueprint verified by Florence municipal records.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInspectModalFlat(null)}
                  className="py-2 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold"
                >
                  Close
                </button>
                <Link
                  href={`/dashboard?tab=housing&id=${inspectModalFlat.id}`}
                  className="py-2 px-5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold"
                >
                  View Details &amp; Apply
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
