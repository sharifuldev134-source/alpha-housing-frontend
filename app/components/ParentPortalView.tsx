"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Download,
  FileText,
  Lock,
  PhoneCall,
  MessageSquare,
  MapPin,
  Users,
  Calendar,
  Wallet,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Scale,
  X,
  Send,
  Building,
  Clock,
  HeartHandshake,
  CheckCheck,
} from "lucide-react";

interface ParentPortalViewProps {
  onBackToStudentView?: () => void;
  onOpenAdvisorChat?: (topic: string) => void;
}

export default function ParentPortalView({
  onBackToStudentView,
  onOpenAdvisorChat,
}: ParentPortalViewProps) {
  // Navigation Tabs: overview, verified, documents
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "verified" | "documents">("overview");

  // Selected Student Ward
  const [selectedStudent, setSelectedStudent] = useState({
    name: "Olivia Watson",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    role: "Housing as Parent of",
  });
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);

  // Parent Approval State for Apartments
  const [approvedApartments, setApprovedApartments] = useState<Record<string, boolean>>({});
  const [showApprovalToast, setShowApprovalToast] = useState<string | null>(null);

  // Photo Gallery Modal State
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Legal Inspection Modal State
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [selectedDocForModal, setSelectedDocForModal] = useState<{
    title: string;
    code: string;
    badge: string;
  }>({
    title: "Standard Italian Legge 431/98 Transitorio",
    code: "Legge 431/98",
    badge: "Official Legal Contract",
  });
  const [contractSigned, setContractSigned] = useState(false);

  // Chat Liaison Modal State
  const [helplineChatOpen, setHelplineChatOpen] = useState(false);
  const [liaisonMessages, setLiaisonMessages] = useState([
    {
      sender: "liaison",
      text: "Buongiorno! I'm Matteo, Alpha's bilingual parent coordinator based in Florence. How can I assist with Olivia's housing agreement or safety checks today?",
      time: "Just now",
    },
  ]);
  const [liaisonInput, setLiaisonInput] = useState("");

  const roommates = [
    {
      name: "Emma",
      status: "Verified",
      share: "€1,200/mo",
      clean: "Very Tidy",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "Sophie",
      status: "Verified",
      share: "€1,125/mo",
      clean: "Moderate",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "Olivia",
      status: "Verified",
      share: "€1,200/mo",
      clean: "Very Tidy",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      highlight: true,
    },
    {
      name: "Mia",
      status: "Verified",
      share: "€1,200/mo",
      clean: "Tidy",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    },
  ];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      label: "Main Living Room & Dining Area",
    },
    {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      label: "Bedroom 1 (Olivia's Dedicated Study Desk)",
    },
    {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      label: "Modern Italian Kitchen & Appliances",
    },
    {
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      label: "Bathroom 1 (Independent Water Heater)",
    },
    {
      url: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80",
      label: "Floorplan & Emergency Exit Blueprint",
    },
  ];

  const handleApprove = (id: string, name: string) => {
    setApprovedApartments((prev) => ({ ...prev, [id]: true }));
    setShowApprovalToast(`You have officially registered Parent Approval for ${name}!`);
    setTimeout(() => {
      setShowApprovalToast(null);
    }, 4000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liaisonInput.trim()) return;
    const msg = liaisonInput.trim();
    setLiaisonMessages((prev) => [
      ...prev,
      { sender: "parent", text: msg, time: "Just now" },
    ]);
    setLiaisonInput("");
    setTimeout(() => {
      setLiaisonMessages((prev) => [
        ...prev,
        {
          sender: "liaison",
          text: "Thank you! I've logged this in our Florence central liaison office and cross-checked with the landlord's registered notary. Your guarantee coverage is active.",
          time: "Just now",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Toast Notification */}
      {showApprovalToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-100" />
          <span>{showApprovalToast}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* TOP HEADER SECTION */}
      {/* ========================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-3 text-xs mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
              PARENT PORTAL &amp; FAMILY PEACE OF MIND
            </span>
            {onBackToStudentView && (
              <>
                <span className="text-slate-300">•</span>
                <button
                  onClick={onBackToStudentView}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Student View</span>
                </button>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Parent Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Direct oversight for parents: verified safety ratings, lease compliance, roommate status, and escrow protection.
          </p>
        </div>

        {/* Viewing as Parent of Dropdown */}
        <div className="relative">
          <button
            onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
            className="flex items-center gap-3 bg-white border border-slate-200 hover:border-slate-300 px-3.5 py-2 rounded-2xl shadow-2xs transition-all text-left"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200">
              <Image
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-medium block leading-none">
                Viewing As Parent Of
              </span>
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                {selectedStudent.name}
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </span>
            </div>
          </button>

          {studentDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Select Family Ward
              </div>
              {roommates.map((r) => (
                <button
                  key={r.name}
                  onClick={() => {
                    setSelectedStudent({
                      name: `${r.name} Watson`,
                      avatar: r.avatar,
                      role: "Housing as Parent of",
                    });
                    setStudentDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left hover:bg-slate-50 transition-colors ${
                    selectedStudent.name.startsWith(r.name)
                      ? "bg-red-50 text-[#DC2626] font-bold"
                      : "text-slate-700"
                  }`}
                >
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image src={r.avatar} alt={r.name} fill className="object-cover" />
                  </div>
                  <span>{r.name} Watson</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* NAVIGATION TABS BAR (Overview, Verified Options, Documents) */}
      {/* ========================================================= */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveSubTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "overview"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Overview &amp; Status
        </button>
        <button
          onClick={() => setActiveSubTab("verified")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeSubTab === "verified"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <span>Verified Options (2)</span>
        </button>
        <button
          onClick={() => setActiveSubTab("documents")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeSubTab === "documents"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <span>Leases &amp; Documents (4)</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: OVERVIEW & STATUS (IMAGE 1) */}
      {/* ========================================================= */}
      {activeSubTab === "overview" && (
        <div className="space-y-6">
          {/* Status Alert Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-emerald-950">
                  Housing search is on track for {selectedStudent.name.split(" ")[0]}&apos;s group in Florence.
                </h3>
                <p className="text-[11px] sm:text-xs text-emerald-700 mt-0.5">
                  2 verified, background-checked options are ready with authentic interior photos and legal lease audits.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveSubTab("verified")}
              className="py-2 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs whitespace-nowrap transition-colors shadow-2xs"
            >
              Review 2 Available Options
            </button>
          </div>

          {/* Top Apartment Under Parent Review For Olivia */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  TOP APARTMENT UNDER PARENT REVIEW FOR {selectedStudent.name.split(" ")[0].toUpperCase()}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Safety Score: 95/100
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Photos & Summary */}
              <div className="lg:col-span-7 space-y-3">
                {/* Main Large Photo */}
                <div
                  className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden cursor-pointer group shadow-2xs"
                  onClick={() => {
                    setActivePhotoIdx(0);
                    setGalleryModalOpen(true);
                  }}
                >
                  <Image
                    src={galleryImages[0].url}
                    alt="Via del Neri Apartment"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Verified Florence Safe Stay
                  </div>

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-base sm:text-lg font-bold leading-tight">
                      Via del Neri Apartment
                    </h3>
                    <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>Via dei Neri, 42, 50122 Firenze FI, Italy</span>
                    </p>
                  </div>
                </div>

                {/* 4 Thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                  {galleryImages.slice(1, 5).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActivePhotoIdx(idx + 1);
                        setGalleryModalOpen(true);
                      }}
                      className="relative h-16 sm:h-20 rounded-xl overflow-hidden border border-slate-200 hover:opacity-90 transition-opacity"
                    >
                      <Image src={img.url} alt={img.label} fill className="object-cover" />
                    </button>
                  ))}
                </div>

                {/* Specs row & Inspect Photos link */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 pt-1 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">4 Independent Bedrooms</span>
                    <span>•</span>
                    <span>Dedicated Desks</span>
                    <span>•</span>
                    <span>2 Full Bathrooms</span>
                  </div>
                  <button
                    onClick={() => setGalleryModalOpen(true)}
                    className="text-[#DC2626] hover:text-[#B91C1C] font-bold text-xs flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Inspect all 8 photos &amp; floorplan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Financial Share & Inspection Checklist */}
              <div className="lg:col-span-5 bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    FINANCIAL SHARE
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-slate-900">€1,200</span>
                    <span className="text-xs text-slate-500 font-medium">/month per student</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Total apartment: €4,800/mo split equitably among 4 roommates.
                  </p>
                </div>

                <div className="border-t border-slate-200/80 pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block mb-2">
                    PARENT INSPECTION CHECKLIST
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>12 minutes flat pedestrian walk to IES Abroad Florence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Double deadbolt cylinder locks &amp; intercom building gate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Deposit protected in segregated Santander EU Escrow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Heating &amp; Electrical (Non-DLCI) certificates checked</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleApprove("via-dei-neri", "Via del Neri Apartment")}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                      approvedApartments["via-dei-neri"]
                        ? "bg-emerald-600 text-white"
                        : "bg-[#DC2626] hover:bg-[#B91C1C] text-white"
                    }`}
                  >
                    {approvedApartments["via-dei-neri"] ? (
                      <>
                        <CheckCheck className="w-4 h-4" />
                        <span>Option Approved as Parent ✓</span>
                      </>
                    ) : (
                      <>
                        <HeartHandshake className="w-4 h-4" />
                        <span>Approve This Option as Parent</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Neighborhood & Surroundings: Santa Croce, Florence */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Neighborhood &amp; Surroundings: Santa Croce, Florence
                </h3>
                <p className="text-xs text-slate-500">
                  See the environment where {selectedStudent.name.split(" ")[0]} and roommates will be living.
                </p>
              </div>
              <Link
                href="/safety"
                className="text-xs font-bold text-[#DC2626] hover:text-[#B91C1C] flex items-center gap-1"
              >
                <span>Full Safety Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Vibrant Student Hub */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="relative h-40 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80"
                    alt="Santa Croce Square"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                    Piazza Santa Croce • 4 Min Walk
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">Vibrant Student Hub</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    High pedestrian traffic, illuminated evening squares, and authentic trattorias.
                  </p>
                </div>
              </div>

              {/* Card 2: Safe Evening Walkability */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="relative h-40 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"
                    alt="Florence street"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                    Well-Lit Walking Route
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">Safe Evening Walkability</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    ZTL restricted traffic zone, well-lit street lanterns, and active local shops.
                  </p>
                </div>
              </div>

              {/* Card 3: Immediate Healthcare */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="relative h-40 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                    alt="Healthcare clinic"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                    Santa Maria Nuova Hospital • 7 Min Walk
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">Immediate Healthcare</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Central hospital with 24/7 English emergency triage and student pharmacy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid: Group Summary & Roommates (Left) + Support & Guarantees (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Group Summary Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  GROUP SUMMARY
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">4</div>
                      <div className="text-[11px] text-slate-500">Students</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">€5,200</div>
                      <div className="text-[11px] text-slate-500">Monthly Budget</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Florence</div>
                      <div className="text-[11px] text-slate-500">Spring 2025</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roommate Group Roster */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  ROOMMATE GROUP ROSTER
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {roommates.map((r) => (
                    <div
                      key={r.name}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${
                        r.highlight
                          ? "bg-red-50/50 border-red-200"
                          : "bg-slate-50/50 border-slate-200/80"
                      }`}
                    >
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
                        <Image src={r.avatar} alt={r.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {r.name} {r.highlight ? "(Your Student)" : ""}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            Verified
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          Share: {r.share} • Clean: {r.clean}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Florence Parent Support Helpline */}
              <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-5 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-indigo-700">
                  <PhoneCall className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    FLORENCE PARENT SUPPORT HELPLINE
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Need direct assistance speaking with the Italian rental agency, verifying lease contract terms, or arranging airport pickup?
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-indigo-100/80">
                  <div>
                    <div className="text-sm font-bold text-slate-900">+39 055 238 9102</div>
                    <div className="text-[11px] text-slate-500">English Speaking Florence Liaison</div>
                  </div>
                  <button
                    onClick={() => setHelplineChatOpen(true)}
                    className="py-1.5 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs transition-colors"
                  >
                    Open Chat
                  </button>
                </div>
              </div>

              {/* Guaranteed Protections */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold text-slate-900">Guaranteed Protections</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Zero Wire-Transfer Scams:</strong> Payments held in segregated EU escrow until physical walkthrough.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Individual Liability Only:</strong> Parents only sponsor their own student&apos;s rent share, not the entire flat.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Italian Law 431/98 Compliant:</strong> Registered student leases protecting deposit return rights.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: VERIFIED OPTIONS (2) (IMAGE 2) */}
      {/* ========================================================= */}
      {activeSubTab === "verified" && (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Verified Properties for Parent Review
              </h2>
              <p className="text-xs text-slate-500">
                Inspected by Alpha AI for student safety, authentic landlord credentials, and Italian lease compliance.
              </p>
            </div>
            <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              2 Verified Options
            </span>
          </div>

          {/* 2 Apartments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Property 1: Via del Neri Apartment */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative h-56 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
                    alt="Via del Neri Apartment"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white text-[10px] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Safety 95/100
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-500" />
                      12 min walk to campus
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] font-bold">
                    €1,200/mo per student
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Via del Neri Apartment
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-red-400" />
                        Via dei Neri, 42, 50122 Firenze FI, Italy
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-slate-900">€4,800</span>
                      <span className="text-xs text-slate-500 font-medium">/mo</span>
                    </div>
                  </div>

                  {/* Badges / Specs row */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Bedrooms</div>
                      <div className="font-bold text-slate-800">4 Private</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Agency</div>
                      <div className="font-bold text-slate-800">SpotAHome</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Deposit</div>
                      <div className="font-bold text-emerald-700">EU Escrow</div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      PARENT SAFETY &amp; SECURITY CHECKLIST
                    </span>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Certified autonomous gas heating (inspection stamp Sept 2024)</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Di.Co electrical safety certificate issued</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Electronic keypad street access + double security cylinder locks</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Safe, highly pedestrianized historic street with 24/7 foot traffic</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>7 minutes walk to Santa Maria Nuova Hospital Emergency Center</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => handleApprove("via-dei-neri", "Via del Neri Apartment")}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    approvedApartments["via-dei-neri"]
                      ? "bg-emerald-600 text-white"
                      : "bg-[#DC2626] hover:bg-[#B91C1C] text-white"
                  }`}
                >
                  {approvedApartments["via-dei-neri"] ? (
                    <>
                      <CheckCheck className="w-4 h-4" />
                      <span>Approved for {selectedStudent.name.split(" ")[0]}</span>
                    </>
                  ) : (
                    <>
                      <HeartHandshake className="w-4 h-4" />
                      <span>Approve for {selectedStudent.name.split(" ")[0]}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setHelplineChatOpen(true)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message Agency</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedDocForModal({
                      title: "Standard Italian Legge 431/98 Transitorio - Via dei Neri",
                      code: "Legge 431/98",
                      badge: "Official Legal Contract",
                    });
                    setLegalModalOpen(true);
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                  title="View Contract Clauses"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Property 2: Borgo dei Greci Residence */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative h-56 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                    alt="Borgo dei Greci Residence"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white text-[10px] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Safety 96/100
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-500" />
                      15 min walk to campus
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] font-bold">
                    €1,125/mo per student
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Borgo dei Greci Residence
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-red-400" />
                        Borgo dei Greci, 18, 50122 Firenze FI, Italy
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-slate-900">€4,500</span>
                      <span className="text-xs text-slate-500 font-medium">/mo</span>
                    </div>
                  </div>

                  {/* Badges / Specs row */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Bedrooms</div>
                      <div className="font-bold text-slate-800">4 Private</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Agency</div>
                      <div className="font-bold text-slate-800">HousingAnywhere</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Deposit</div>
                      <div className="font-bold text-emerald-700">EU Escrow</div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      PARENT SAFETY &amp; SECURITY CHECKLIST
                    </span>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Quiet residential courtyard setting</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Certified smoke &amp; CO detectors installed</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Utilities pre-included with utility cost guarantee cap</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Direct pedestrian route to IES Abroad (15 mins walk)</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Building concierge on duty weekdays, 8:00 AM - 1:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => handleApprove("borgo-dei-greci", "Borgo dei Greci Residence")}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    approvedApartments["borgo-dei-greci"]
                      ? "bg-emerald-600 text-white"
                      : "bg-[#DC2626] hover:bg-[#B91C1C] text-white"
                  }`}
                >
                  {approvedApartments["borgo-dei-greci"] ? (
                    <>
                      <CheckCheck className="w-4 h-4" />
                      <span>Approved for {selectedStudent.name.split(" ")[0]}</span>
                    </>
                  ) : (
                    <>
                      <HeartHandshake className="w-4 h-4" />
                      <span>Approve for {selectedStudent.name.split(" ")[0]}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setHelplineChatOpen(true)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message Agency</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedDocForModal({
                      title: "Standard Italian Legge 431/98 Transitorio - Borgo dei Greci",
                      code: "Legge 431/98",
                      badge: "Official Legal Contract",
                    });
                    setLegalModalOpen(true);
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                  title="View Contract Clauses"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Parent Safety & Standards Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              Parent Safety &amp; Standards Comparison
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 pr-4">Safety Feature</th>
                    <th className="py-2.5 px-4 text-slate-900 font-bold">Via dei Neri</th>
                    <th className="py-2.5 px-4 text-slate-900 font-bold">Borgo dei Greci</th>
                    <th className="py-2.5 pl-4 text-slate-500">Italian Standard Req.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 pr-4 font-semibold text-slate-700">
                      Electrical Plant Certification (Di.Co)
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-700">
                      ✓ Certified Compliant
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-700">
                      ✓ Certified Compliant
                    </td>
                    <td className="py-3 pl-4 text-slate-500">
                      Mandatory (DM 37/08)
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 pr-4 font-semibold text-slate-700">
                      Boiler &amp; Gas Maintenance Stamp
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-700">
                      ✓ Sept 2024 Stamp
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-700">
                      ✓ Nov 2023 Stamp
                    </td>
                    <td className="py-3 pl-4 text-slate-500">
                      Annual (per DPR 74/13)
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 pr-4 font-semibold text-slate-700">
                      Commute to IES Abroad Campus
                    </td>
                    <td className="py-3 px-4 text-slate-800">
                      12 min flat walk
                    </td>
                    <td className="py-3 px-4 text-slate-800">
                      15 min flat walk
                    </td>
                    <td className="py-3 pl-4 text-slate-500">
                      Walkable recommended
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 pr-4 font-semibold text-slate-700">
                      Emergency Hospital Distance
                    </td>
                    <td className="py-3 px-4 text-slate-800">
                      7 min (Santa Maria Nuova)
                    </td>
                    <td className="py-3 px-4 text-slate-800">
                      10 min (Santa Maria Nuova)
                    </td>
                    <td className="py-3 pl-4 text-slate-500">
                      Urban central
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 pr-4 font-semibold text-slate-700">
                      Damage Deposit Custody
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-700">
                      100% Segregated EU Escrow
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-700">
                      100% Segregated EU Escrow
                    </td>
                    <td className="py-3 pl-4 text-slate-500">
                      Bank guarantee required
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: LEASES & DOCUMENTS (4) (IMAGE 3) */}
      {/* ========================================================= */}
      {activeSubTab === "documents" && (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Verified Legal Leases &amp; Parent Documents
              </h2>
              <p className="text-xs text-slate-500">
                Official Italian residential rental contracts, parent guarantor paperwork, and escrow booking certificates.
              </p>
            </div>
            <button
              onClick={() => {
                setShowApprovalToast("Downloading Complete Parent Dossier (4 PDF Bundle)...");
                setTimeout(() => setShowApprovalToast(null), 3000);
              }}
              className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-2xs self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Complete Dossier</span>
            </button>
          </div>

          {/* 4 Document Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: Legal Contract */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-[#DC2626] text-[10px] font-bold uppercase tracking-wider">
                    LEGAL CONTRACT
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Ready for Review
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  Italian Standard Student Lease Agreement (Contratto Transitorio a Canone Concordato)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Official Italian residential student lease under Italian National Law 431/98. Pre-audited by Alpha AI for student-tenant protection clauses, fixed rent caps, and transparent exit terms.
                </p>

                {/* Protection clauses box */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-[11px] text-slate-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    KEY PARENT PROTECTION CLAUSES:
                  </span>
                  <p>• Clause 4: Security deposit limited to standard 1-month equivalent in EU escrow.</p>
                  <p>• Clause 9: Maintenance repairs categorized under Italian Civil Code Art. 1576 (landlord covers structural).</p>
                  <p>• Clause 13: Permitted 30-day early termination notice with academic justification.</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">1.4 MB PDF</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedDocForModal({
                        title: "Standard Italian Legge 431/98 Transitorio",
                        code: "Legge 431/98",
                        badge: "LEGAL CONTRACT",
                      });
                      setLegalModalOpen(true);
                    }}
                    className="py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold transition-colors"
                  >
                    View Clauses
                  </button>
                  <button
                    onClick={() => {
                      setShowApprovalToast("Downloading Italian Student Lease Agreement (1.4 MB)...");
                      setTimeout(() => setShowApprovalToast(null), 3000);
                    }}
                    className="py-1.5 px-3 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold flex items-center gap-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Parent Form */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                    PARENT FORM
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Action Required
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  Parent Financial Guarantor Authorization (Fideiussione Bancaria per Genitori)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Standard guarantor form allowing international parents to act as legal financial sponsor without requiring local Italian credit accounts or invasive banking records.
                </p>

                {/* Protection clauses box */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-[11px] text-slate-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    KEY PARENT PROTECTION CLAUSES:
                  </span>
                  <p>• Guarantor liability strictly capped at individual student share (€1,200/mo).</p>
                  <p>• No joint liability across unrelated student roommates.</p>
                  <p>• Electronic signature verified under EU eIDAS regulation.</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">480 KB PDF</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedDocForModal({
                        title: "Parent Financial Guarantor Authorization",
                        code: "Fideiussione Bancaria",
                        badge: "PARENT FORM",
                      });
                      setLegalModalOpen(true);
                    }}
                    className="py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold transition-colors"
                  >
                    View Clauses
                  </button>
                  <button
                    onClick={() => {
                      setShowApprovalToast("Downloading Parent Guarantor Authorization (480 KB)...");
                      setTimeout(() => setShowApprovalToast(null), 3000);
                    }}
                    className="py-1.5 px-3 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold flex items-center gap-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Financial Protection */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-wider">
                    FINANCIAL PROTECTION
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Active Protection
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  EU Escrow Deposit Custody Certificate (IRT-9128-ESCROW)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Official escrow agreement holding student damage deposit in a segregated European custody account until 48 hours after move-in walkthrough inspection.
                </p>

                {/* Protection clauses box */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-[11px] text-slate-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    KEY PARENT PROTECTION CLAUSES:
                  </span>
                  <p>• 100% anti-fraud escrow lock: Landlord cannot draw funds without tenant sign-off.</p>
                  <p>• Automatic arbitration protection via Florence Chamber of Commerce.</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">620 KB PDF</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedDocForModal({
                        title: "EU Escrow Deposit Custody Certificate",
                        code: "IRT-9128-ESCROW",
                        badge: "FINANCIAL PROTECTION",
                      });
                      setLegalModalOpen(true);
                    }}
                    className="py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold transition-colors"
                  >
                    View Clauses
                  </button>
                  <button
                    onClick={() => {
                      setShowApprovalToast("Downloading EU Escrow Deposit Custody Certificate (620 KB)...");
                      setTimeout(() => setShowApprovalToast(null), 3000);
                    }}
                    className="py-1.5 px-3 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold flex items-center gap-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4: University Guidance */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-wider">
                    UNIVERSITY GUIDANCE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Guide
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  Codice Fiscale (Italian Fiscal Code) Parent &amp; Student Guidance
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Step-by-step instructions for registering students with the Italian Agenzia delle Entrate upon arrival in Florence, facilitated by university orientation staff.
                </p>

                {/* Protection clauses box */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-[11px] text-slate-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    KEY PARENT PROTECTION CLAUSES:
                  </span>
                  <p>• Free registration with Italian Ministry of Economy &amp; Finance.</p>
                  <p>• Required for registered lease agreement tax stamps (Imposta di Registro).</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">340 KB PDF</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedDocForModal({
                        title: "Codice Fiscale Parent & Student Guidance",
                        code: "Agenzia delle Entrate",
                        badge: "UNIVERSITY GUIDANCE",
                      });
                      setLegalModalOpen(true);
                    }}
                    className="py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold transition-colors"
                  >
                    View Clauses
                  </button>
                  <button
                    onClick={() => {
                      setShowApprovalToast("Downloading Codice Fiscale Guidance (340 KB)...");
                      setTimeout(() => setShowApprovalToast(null), 3000);
                    }}
                    className="py-1.5 px-3 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold flex items-center gap-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Protection Guarantee Banner */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-emerald-950">
                100% Escrow Protection Guarantee for Parents
              </h4>
              <p className="text-[11px] sm:text-xs text-emerald-800 mt-1 leading-relaxed">
                Under European Union Consumer Protection Directive 2011/83/EU, your deposit is held in a segregated European bank account until 48 hours after your student physically moves in and confirms apartment keys, heating, and room inventory.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: DOCUMENT LEGAL INSPECTION (IMAGE 4) */}
      {/* ========================================================= */}
      {legalModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 text-left space-y-4 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#DC2626]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Document Legal Inspection
                </h3>
              </div>
              <button
                onClick={() => setLegalModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-base font-bold p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Red Highlight Callout */}
            <div className="bg-red-50/70 border border-red-200/80 rounded-xl p-3.5 space-y-1">
              <h4 className="text-xs font-bold text-[#DC2626]">
                {selectedDocForModal.title}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                This contract has been reviewed and verified by certified Italian tenancy attorneys to ensure fair terms for foreign university students and parents.
              </p>
            </div>

            {/* Contract Articles */}
            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1 text-xs">
              <div>
                <h5 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                  ARTICLE 1 - SUBJECT AND PERIOD
                </h5>
                <p className="text-slate-600 leading-relaxed mt-0.5">
                  The Landlord grants in temporary tenancy to the Students of IES Abroad the residential unit situated in Florence, Via dei Neri 42, for study purposes.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                  ARTICLE 2 - RENT AND ESCROW DEPOSIT
                </h5>
                <p className="text-slate-600 leading-relaxed mt-0.5">
                  The monthly agreed fee is divided proportionally among registered students (€1,200 each). Security deposit is deposited in escrow custody.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                  ARTICLE 3 - PARENT GUARANTEE CLAUSE
                </h5>
                <p className="text-slate-600 leading-relaxed mt-0.5">
                  Parent guarantee is limited solely to the student ward&apos;s specified quota. No joint or secondary liability across non-family roommates.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setLegalModalOpen(false)}
                className="py-2 px-4 rounded-xl text-slate-600 hover:text-slate-900 font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setContractSigned(true);
                  setLegalModalOpen(false);
                  setShowApprovalToast("Parent Signature Registered with Timestamp (EU eIDAS Verified)!");
                  setTimeout(() => setShowApprovalToast(null), 4000);
                }}
                className="py-2 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Sign &amp; Approve as Parent</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: FLOORPLAN & FULL PHOTO INSPECTOR */}
      {/* ========================================================= */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Via del Neri Apartment — Parent Inspection Gallery
                </h3>
                <p className="text-[11px] text-slate-500">
                  {galleryImages[activePhotoIdx].label} ({activePhotoIdx + 1} of {galleryImages.length})
                </p>
              </div>
              <button
                onClick={() => setGalleryModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Main Carousel Image */}
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900">
              <Image
                src={galleryImages[activePhotoIdx].url}
                alt={galleryImages[activePhotoIdx].label}
                fill
                className="object-contain"
              />
            </div>

            {/* Thumbnail selector */}
            <div className="grid grid-cols-5 gap-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`relative h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    activePhotoIdx === idx
                      ? "border-[#DC2626] scale-102"
                      : "border-slate-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img.url} alt={img.label} fill className="object-cover" />
                </button>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-slate-500">
                All photos verified with geo-timestamp by Alpha Florence Inspection Team.
              </span>
              <button
                onClick={() => setGalleryModalOpen(false)}
                className="py-2 px-4 rounded-xl bg-slate-900 text-white font-bold"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: PARENT HELPLINE LIVE CHAT */}
      {/* ========================================================= */}
      {helplineChatOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 text-left flex flex-col h-[520px]">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Florence Parent Liaison Support
                  </h3>
                  <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Online • English &amp; Italian Speaking
                  </p>
                </div>
              </div>
              <button
                onClick={() => setHelplineChatOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1 text-base"
              >
                ✕
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3 text-xs">
              {liaisonMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "parent" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 leading-relaxed ${
                      msg.sender === "parent"
                        ? "bg-[#DC2626] text-white rounded-br-none"
                        : "bg-slate-100 text-slate-800 rounded-bl-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[9px] block mt-1 ${
                        msg.sender === "parent" ? "text-red-200" : "text-slate-400"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={liaisonInput}
                onChange={(e) => setLiaisonInput(e.target.value)}
                placeholder="Ask about lease clauses, deposits, or safety..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
