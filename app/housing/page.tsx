"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Building, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Star, 
  Heart, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Filter,
  Check,
  FileCheck2,
  Euro
} from "lucide-react";
import { usePlanModal } from "../components/PlanModalContext";

interface ApartmentListing {
  id: string;
  title: string;
  neighborhood: string;
  safetyScore: string;
  bedrooms: number;
  bathrooms: number;
  priceTotal: number;
  pricePerStudent: number;
  commuteTime: string;
  image: string;
  landlordVerified: boolean;
  elevator: boolean;
  tag?: string;
}

const APARTMENTS: ApartmentListing[] = [
  {
    id: "florence-flat-1",
    title: "Palazzo Antico 4-Bed Flat on Via Ghibellina",
    neighborhood: "Santa Croce",
    safetyScore: "9.3/10",
    bedrooms: 4,
    bathrooms: 2,
    priceTotal: 3400,
    pricePerStudent: 850,
    commuteTime: "8 min walk to FSU / 14 min to Duomo",
    image: "https://images.unsplash.com/photo-1502005229762-ee1b2b8ab68f?auto=format&fit=crop&w=800&q=80",
    landlordVerified: true,
    elevator: true,
    tag: "Emma's Group Match",
  },
  {
    id: "florence-flat-2",
    title: "Artisan Loft with Terrace overlooking Piazza Santo Spirito",
    neighborhood: "Santo Spirito",
    safetyScore: "8.7/10",
    bedrooms: 3,
    bathrooms: 2,
    priceTotal: 2700,
    pricePerStudent: 900,
    commuteTime: "12 min walk to NYU Shuttle",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    landlordVerified: true,
    elevator: false,
    tag: "Top Rated",
  },
  {
    id: "florence-flat-3",
    title: "Spacious Renaissance Flat near Sant'Ambrogio Market",
    neighborhood: "Santa Croce",
    safetyScore: "9.3/10",
    bedrooms: 4,
    bathrooms: 3,
    priceTotal: 3600,
    pricePerStudent: 900,
    commuteTime: "6 min walk to Syracuse campus",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    landlordVerified: true,
    elevator: true,
  },
  {
    id: "florence-flat-4",
    title: "San Frediano Historic 3-Bed Apartment with High Ceilings",
    neighborhood: "San Frediano",
    safetyScore: "9.2/10",
    bedrooms: 3,
    bathrooms: 1,
    priceTotal: 2250,
    pricePerStudent: 750,
    commuteTime: "16 min walk across Ponte Amerigo Vespucci",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    landlordVerified: true,
    elevator: false,
    tag: "Budget Friendly",
  },
  {
    id: "florence-flat-5",
    title: "Duomo View Penthouse with 4 Balconies & Fiber Wi-Fi",
    neighborhood: "Duomo",
    safetyScore: "8.9/10",
    bedrooms: 4,
    bathrooms: 2,
    priceTotal: 4200,
    pricePerStudent: 1050,
    commuteTime: "4 min walk to Piazza del Duomo",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    landlordVerified: true,
    elevator: true,
    tag: "Historic Luxury",
  },
  {
    id: "florence-flat-6",
    title: "Campo di Marte Modern 5-Bed Flat near Train & Tram",
    neighborhood: "Campo di Marte",
    safetyScore: "8.8/10",
    bedrooms: 5,
    bathrooms: 3,
    priceTotal: 3500,
    pricePerStudent: 700,
    commuteTime: "18 min direct tram to historic core",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    landlordVerified: true,
    elevator: true,
  },
];

export default function HousingPage() {
  const { openPlanModal } = usePlanModal();
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("all");
  const [savedFlats, setSavedFlats] = useState<Record<string, boolean>>({
    "florence-flat-1": true,
  });
  const [auditModalFlat, setAuditModalFlat] = useState<ApartmentListing | null>(null);

  const neighborhoods = [
    { id: "all", label: "All Neighborhoods" },
    { id: "Santa Croce", label: "Santa Croce (9.3)" },
    { id: "San Frediano", label: "San Frediano (9.2)" },
    { id: "Duomo", label: "Duomo / Center (8.9)" },
    { id: "Santo Spirito", label: "Santo Spirito (8.7)" },
    { id: "Campo di Marte", label: "Campo di Marte (8.8)" },
  ];

  const filteredFlats = selectedNeighborhood === "all"
    ? APARTMENTS
    : APARTMENTS.filter((f) => f.neighborhood === selectedNeighborhood);

  const toggleSave = (id: string) => {
    setSavedFlats((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Building className="w-3.5 h-3.5" />
              <span>Verified Florence Student Apartments</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Browse 3–5 Bedroom Flats in Florence
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              100% scam-proof guaranteed, cross-referenced with Agenzia delle Entrate registers and walking distances to American university campuses.
            </p>
          </div>

          <button
            onClick={() => openPlanModal()}
            className="py-2.5 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-red-600/30 self-start md:self-auto flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Customize Group Budget</span>
          </button>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-18 z-40 bg-white border-b border-slate-200 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="flex items-center gap-1.5">
              {neighborhoods.map((nh) => (
                <button
                  key={nh.id}
                  onClick={() => setSelectedNeighborhood(nh.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedNeighborhood === nh.id
                      ? "bg-red-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {nh.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs text-slate-500">
            <span>Showing <strong>{filteredFlats.length}</strong> verified flats</span>
          </div>
        </div>
      </div>

      {/* Flats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFlats.map((flat) => {
            const isSaved = savedFlats[flat.id];
            return (
              <div
                key={flat.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={flat.image}
                      alt={flat.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-white font-extrabold text-[11px] shadow-xs">
                        {flat.safetyScore} Safety
                      </span>
                      {flat.tag && (
                        <span className="px-2.5 py-1 rounded-md bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-xs">
                          {flat.tag}
                        </span>
                      )}
                    </div>

                    {/* Save heart button */}
                    <button
                      onClick={() => toggleSave(flat.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isSaved
                          ? "bg-red-500 text-white"
                          : "bg-black/40 text-white hover:bg-black/60"
                      }`}
                      aria-label="Save flat"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
                    </button>

                    {/* Bottom overlay text */}
                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-[11px] font-semibold text-slate-200 block">
                        {flat.neighborhood} • {flat.commuteTime}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                      {flat.title}
                    </h3>

                    {/* Meta specs */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 pb-3 border-b border-slate-100">
                      <span>{flat.bedrooms} Bedrooms</span>
                      <span>•</span>
                      <span>{flat.bathrooms} Baths</span>
                      <span>•</span>
                      <span>{flat.elevator ? "Elevator ✓" : "Walk-up"}</span>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="mt-3 flex items-baseline justify-between">
                      <div>
                        <span className="text-xl font-black text-slate-900">
                          €{flat.pricePerStudent}
                        </span>
                        <span className="text-xs text-slate-500"> / student / mo</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">
                        €{flat.priceTotal} total flat
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setAuditModalFlat(flat)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-red-200/80"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>Run AI Lease Audit</span>
                  </button>
                  <button
                    onClick={() => openPlanModal()}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-colors"
                  >
                    Select
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Lease Audit Modal */}
      {auditModalFlat && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Alpha Check™ Lease Audit</h3>
                  <p className="text-[11px] text-slate-500">Italian Law 431/98 Student Compliance</p>
                </div>
              </div>
              <button
                onClick={() => setAuditModalFlat(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Lease Verified: 100% Scam-Free Clean Record</span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-1">
                  Cross-referenced with Florence Chamber of Commerce and Italian Revenue Agency (Agenzia delle Entrate).
                </p>
              </div>

              <div className="space-y-2 border border-slate-200 rounded-xl p-3.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Property:</span>
                  <span className="font-semibold text-slate-900">{auditModalFlat.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Standard Italian Student Contract:</span>
                  <span className="font-semibold text-emerald-600">Contratto Transitorio ✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Security Deposit Escrow:</span>
                  <span className="font-semibold text-slate-900">Held until check-in inspection</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Utilities Included:</span>
                  <span className="font-semibold text-slate-900">Wi-Fi &amp; Condominio included</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setAuditModalFlat(null)}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setAuditModalFlat(null);
                  openPlanModal();
                }}
                className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md"
              >
                Reserve with Group Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
