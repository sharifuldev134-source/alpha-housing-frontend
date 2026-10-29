"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  Check,
  Users,
  Building,
  Home,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  ChevronDown,
  Clock,
  Euro,
  MapPin,
  CheckCircle2,
  Plus
} from "lucide-react";

// Dynamically import Leaflet map to prevent SSR window issues
const FlorenceSafetyMap = dynamic(
  () => import("../components/FlorenceSafetyMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[340px] bg-slate-100 dark:bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-2">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-medium">Loading Florence map...</span>
      </div>
    ),
  }
);

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  status: "Group Admin" | "Invited" | "Joined";
  statusColor: string;
  isLead?: boolean;
}

interface NeighborhoodDetail {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  image: string;
  description: string;
  walkTime: string;
  price: string;
  safety: string;
}

const NEIGHBORHOODS_LIST: NeighborhoodDetail[] = [
  {
    id: "santa-croce",
    name: "Santa Croce",
    tag: "Most Popular for Students",
    tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900/50",
    image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=400&q=80",
    description: "A historic and vibrant neighborhood with cafes, restaurants, shops, and a great student atmosphere. Walkable to university campuses and the Duomo.",
    walkTime: "10-20 min walk",
    price: "€700 - €1,200 /mo",
    safety: "Safety: 8.8 / 10",
  },
  {
    id: "san-lorenzo",
    name: "San Lorenzo",
    tag: "Central & Convenient",
    tagColor: "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:border-rose-900/50",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80",
    description: "Central location near Florence's famous leather market and Mercato Centrale. Fast commutes and unbeatable connectivity for weekend European travel.",
    walkTime: "10-15 min walk",
    price: "€650 - €1,100 /mo",
    safety: "Safety: 8.5 / 10",
  },
  {
    id: "santo-spirito",
    name: "Santo Spirito",
    tag: "Artisan & Trendy",
    tagColor: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:border-amber-900/50",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80",
    description: "Charming cobblestone streets, antique stores, and lively piazzas. A favorite for students seeking authentic Florentine character and local nightlife.",
    walkTime: "15-20 min walk",
    price: "€700 - €1,150 /mo",
    safety: "Safety: 9.0 / 10",
  },
  {
    id: "oltrarno",
    name: "Oltrarno",
    tag: "Authentic & Local Feel",
    tagColor: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/40 dark:border-blue-900/50",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80",
    description: "South bank of the Arno with panoramic views, craft studios, and quiet residential lanes. Ideal for students wanting a quieter, authentic Italian lifestyle.",
    walkTime: "15-25 min walk",
    price: "€680 - €1,100 /mo",
    safety: "Safety: 9.2 / 10",
  },
  {
    id: "campo-di-marte",
    name: "Campo di Marte",
    tag: "Best Value & Space",
    tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900/50",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80",
    description: "A green residential district offering significantly larger bedrooms and modern amenities at the most affordable price per student.",
    walkTime: "20-25 min transit",
    price: "€550 - €900 /mo",
    safety: "Safety: 9.4 / 10",
  },
];

export default function CreatePlanPage() {
  const router = useRouter();

  // Wizard Step: 1 = Group, 2 = Preferences, 3 = Summary / Confirmation
  const [currentStep, setCurrentStep] = useState<number>(1);

  // STEP 1 STATE
  const [groupName, setGroupName] = useState("Emma's Florence Group");
  const [semester, setSemester] = useState("Spring 2027");
  const [city, setCity] = useState("Florence");
  const [studentCount, setStudentCount] = useState<number>(4);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteFeedback, setInviteFeedback] = useState<string | null>(null);

  const [members, setMembers] = useState<GroupMember[]>([
    {
      id: "emma",
      name: "Emma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      status: "Group Admin",
      statusColor: "text-slate-500 dark:text-slate-400",
      isLead: true,
    },
    {
      id: "sophia",
      name: "Sophia",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      status: "Invited",
      statusColor: "text-amber-600 dark:text-amber-400",
    },
    {
      id: "olivia",
      name: "Olivia",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
      status: "Joined",
      statusColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "isabella",
      name: "Isabella",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80",
      status: "Joined",
      statusColor: "text-emerald-600 dark:text-emerald-400",
    },
  ]);

  // Modal State for adding student
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");

  // STEP 2 STATE
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [budgetMax, setBudgetMax] = useState<number>(1100);
  const [housingType, setHousingType] = useState<"apartment" | "shared" | "residence" | "studio">("apartment");
  const [bedroomsNeeded, setBedroomsNeeded] = useState<number | string>(4);

  // Must Haves Checkboxes
  const [mustHaves, setMustHaves] = useState({
    closeToUniversity: true,
    walkableRestaurants: true,
    publicTransit: true,
    safeArea: true,
    airConditioning: false,
  });

  // Map Filter Layers
  const [mapLayers, setMapLayers] = useState({
    campus: true,
    grocery: true,
    restaurants: true,
    transit: true,
  });

  // Selected Neighborhood for details / map zoom
  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState<string>("santa-croce");
  const [neighborhoodModal, setNeighborhoodModal] = useState<NeighborhoodDetail | null>(null);

  // Handlers
  const handleRemoveMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const emailName = inviteEmail.split("@")[0] || "New Student";
    const capitalized = emailName.charAt(0).toUpperCase() + emailName.slice(1);

    const newMember: GroupMember = {
      id: `member-${Date.now()}`,
      name: capitalized,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      status: "Invited",
      statusColor: "text-amber-600 dark:text-amber-400",
    };

    setMembers((prev) => [...prev, newMember]);
    setInviteEmail("");
    setInviteFeedback(`Invite sent to ${capitalized}!`);
    setTimeout(() => setInviteFeedback(null), 3000);
  };

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const newMember: GroupMember = {
      id: `member-${Date.now()}`,
      name: newStudentName,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      status: "Joined",
      statusColor: "text-emerald-600 dark:text-emerald-400",
    };

    setMembers((prev) => [...prev, newMember]);
    setNewStudentName("");
    setNewStudentEmail("");
    setAddStudentModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-[#0B0F17] py-6 sm:py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      {/* ------------------------------------------------------------- */}
      {/* MAIN WIZARD CARD CONTAINER */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-4xl mx-auto w-full">
        {/* ============================================================= */}
        {/* STEP 1: CREATE YOUR GROUP (SCREENSHOT 1) */}
        {/* ============================================================= */}
        {currentStep === 1 && (
          <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-200">
            {/* Top Header Row with Title on Left and Pisa Card on Right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Column (7 cols) */}
              <div className="md:col-span-7 text-left space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                  Let&apos;s Plan <br />
                  <span className="text-[#DC2626]">Your Housing Together.</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                  Create your group, set your preferences, and we&apos;ll help you find the best areas and housing options in Florence.
                </p>
              </div>

              {/* Right Column: Pisa Preview Card (5 cols) */}
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <div className="relative aspect-[16/10] w-full max-w-[280px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 dark:border-slate-800">
                  <Image
                    src="/images/pisa_banner.jpg"
                    alt="Piazzale Michelangelo, Florence, Italy"
                    fill
                    className="object-cover brightness-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2.5 text-[10px] font-medium text-white/90 drop-shadow-xs">
                    Piazzale Michelangelo, Florence, Italy
                  </div>
                  <div className="absolute bottom-2 right-2.5 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold shadow-xs">
                    Spring 2027
                  </div>
                </div>
              </div>
            </div>

            {/* Inner Form Card: 1. Create Your Group */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 space-y-5 text-left bg-white dark:bg-[#111827]">
              {/* Form Title & Subtitle */}
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                  1. Create Your Group
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Invite your child&apos;s roommates to plan together.
                </p>
              </div>

              {/* Row 1: GROUP NAME & UNIVERSITY / PROGRAM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    GROUP NAME
                  </label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    UNIVERSITY / PROGRAM
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <select
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-100 appearance-none focus:outline-none focus:border-red-500 pr-7"
                      >
                        <option value="Spring 2027">Spring 2027</option>
                        <option value="Fall 2026">Fall 2026</option>
                        <option value="Full Year 2026-27">Full Year 2026-27</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
                    </div>

                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: NUMBER OF STUDENTS */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  NUMBER OF STUDENTS
                </label>
                <div className="flex items-center gap-2">
                  {[2, 3, 4, 5, "6+"].map((count) => {
                    const numVal = typeof count === "number" ? count : 6;
                    const isSelected = studentCount === numVal;
                    return (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setStudentCount(numVal)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                          isSelected
                            ? "bg-[#DC2626] text-white shadow-sm"
                            : "bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {count}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: INVITE STUDENTS (OPTIONAL) */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  INVITE STUDENTS (OPTIONAL)
                </label>
                <form onSubmit={handleSendInvite} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-xs"
                  >
                    Send Invite
                  </button>
                </form>
                {inviteFeedback && (
                  <p className="text-[11px] font-semibold text-emerald-600 mt-1">
                    {inviteFeedback}
                  </p>
                )}
              </div>

              {/* Row 4: GROUP MEMBERS */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  GROUP MEMBERS ({members.length})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="relative p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex flex-col items-center text-center gap-1.5 shadow-2xs group"
                    >
                      {!member.isLead && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(member.id)}
                          className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                          title="Remove member"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <div className="w-11 h-11 rounded-full overflow-hidden relative ring-2 ring-white dark:ring-slate-800 bg-slate-200 shrink-0">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                        {member.name}
                      </span>
                      <span className={`text-[10px] font-semibold ${member.statusColor}`}>
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 5: Add Student Dotted Button */}
              <button
                type="button"
                onClick={() => setAddStudentModalOpen(true)}
                className="w-full py-2.5 rounded-xl border border-dashed border-red-300 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Student (3-5 total)</span>
              </button>

              {/* Row 6: Primary Continue Button */}
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full py-3.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Continue to Group Preferences</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* STEP 2: SET GROUP PREFERENCES (MAP VIEW / LIST VIEW) */}
        {/* ============================================================= */}
        {currentStep === 2 && (
          <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 sm:p-7 space-y-6 animate-in fade-in duration-200 text-left">
            {/* Header: Title + Subtitle on Left, Map/List Toggle on Right */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                  2. Set Group Preferences
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Tell us what&apos;s important to your group. We&apos;ll use this to suggest the best neighborhoods and housing options.
                </p>
              </div>

              {/* Toggle Buttons: [ Map View ] [ List View ] */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "map"
                      ? "bg-[#DC2626] text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                  }`}
                >
                  Map View
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-[#DC2626] text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                  }`}
                >
                  List View
                </button>
              </div>
            </div>

            {/* 2-Column Content Grid: Left = Preferences Form, Right = Map or List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* ------------------------------------------------------------- */}
              {/* LEFT COLUMN: PREFERENCES FORM (5 cols) */}
              {/* ------------------------------------------------------------- */}
              <div className="lg:col-span-5 space-y-5">
                {/* 1. Monthly Budget Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      MONTHLY BUDGET PER STUDENT
                    </span>
                    <span className="text-xs font-extrabold text-[#DC2626]">
                      €500 – €{budgetMax}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={600}
                    max={1500}
                    step={50}
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(Number(e.target.value))}
                    className="w-full accent-[#DC2626] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>€500</span>
                    <span>€1,500+</span>
                  </div>
                </div>

                {/* 2. Housing Type 2x2 Grid */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    HOUSING TYPE
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Apartment */}
                    <button
                      type="button"
                      onClick={() => setHousingType("apartment")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                        housingType === "apartment"
                          ? "border-rose-400 bg-rose-50/50 dark:bg-rose-950/20 ring-1 ring-rose-400 text-slate-900 dark:text-white"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <Home className="w-4 h-4 text-red-500" />
                      <span className="font-bold text-xs">Apartment</span>
                    </button>

                    {/* Shared Home */}
                    <button
                      type="button"
                      onClick={() => setHousingType("shared")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                        housingType === "shared"
                          ? "border-rose-400 bg-rose-50/50 dark:bg-rose-950/20 ring-1 ring-rose-400 text-slate-900 dark:text-white"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="font-bold text-xs">Shared Home</span>
                    </button>

                    {/* Student Residence */}
                    <button
                      type="button"
                      onClick={() => setHousingType("residence")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                        housingType === "residence"
                          ? "border-rose-400 bg-rose-50/50 dark:bg-rose-950/20 ring-1 ring-rose-400 text-slate-900 dark:text-white"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <Building className="w-4 h-4 text-emerald-500" />
                      <span className="font-bold text-xs">Student Residence</span>
                    </button>

                    {/* Studio / 1BR */}
                    <button
                      type="button"
                      onClick={() => setHousingType("studio")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                        housingType === "studio"
                          ? "border-rose-400 bg-rose-50/50 dark:bg-rose-950/20 ring-1 ring-rose-400 text-slate-900 dark:text-white"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span className="font-bold text-xs">Studio / 1BR</span>
                    </button>
                  </div>
                </div>

                {/* 3. Bedrooms Needed */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    BEDROOMS NEEDED
                  </label>
                  <div className="flex items-center gap-2">
                    {[2, 3, 4, "5+"].map((count) => {
                      const isSelected = bedroomsNeeded === count;
                      return (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setBedroomsNeeded(count)}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                            isSelected
                              ? "bg-[#DC2626] text-white shadow-sm"
                              : "bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          {count}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Must Haves Checkboxes */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    MUST HAVES
                  </label>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mustHaves.closeToUniversity}
                        onChange={(e) =>
                          setMustHaves((prev) => ({
                            ...prev,
                            closeToUniversity: e.target.checked,
                          }))
                        }
                        className="rounded accent-[#DC2626] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        Close to university
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mustHaves.walkableRestaurants}
                        onChange={(e) =>
                          setMustHaves((prev) => ({
                            ...prev,
                            walkableRestaurants: e.target.checked,
                          }))
                        }
                        className="rounded accent-[#DC2626] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        Walkable to restaurants &amp; cafes
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mustHaves.publicTransit}
                        onChange={(e) =>
                          setMustHaves((prev) => ({
                            ...prev,
                            publicTransit: e.target.checked,
                          }))
                        }
                        className="rounded accent-[#DC2626] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        Good public transportation
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mustHaves.safeArea}
                        onChange={(e) =>
                          setMustHaves((prev) => ({
                            ...prev,
                            safeArea: e.target.checked,
                          }))
                        }
                        className="rounded accent-[#DC2626] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        Safe area
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mustHaves.airConditioning}
                        onChange={(e) =>
                          setMustHaves((prev) => ({
                            ...prev,
                            airConditioning: e.target.checked,
                          }))
                        }
                        className="rounded accent-[#DC2626] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        Air conditioning
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Button & Back Link */}
                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="w-full py-3.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Save and Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="w-full py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Group Setup</span>
                  </button>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* RIGHT COLUMN: MAP VIEW OR LIST VIEW (7 cols) */}
              {/* ------------------------------------------------------------- */}
              <div className="lg:col-span-7 space-y-3.5">
                {/* --------------------------------------------------------- */}
                {/* 2A. MAP VIEW (SCREENSHOT 2) */}
                {/* --------------------------------------------------------- */}
                {viewMode === "map" && (
                  <div className="space-y-3.5">
                    {/* Layer Filter Pills above Map */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        Show on map:
                      </span>
                      <label className="flex items-center gap-1 cursor-pointer px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                        <input
                          type="checkbox"
                          checked={mapLayers.campus}
                          onChange={(e) =>
                            setMapLayers((p) => ({ ...p, campus: e.target.checked }))
                          }
                          className="accent-purple-600 w-3 h-3"
                        />
                        <span>University / Campus</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                        <input
                          type="checkbox"
                          checked={mapLayers.grocery}
                          onChange={(e) =>
                            setMapLayers((p) => ({ ...p, grocery: e.target.checked }))
                          }
                          className="accent-amber-500 w-3 h-3"
                        />
                        <span>Grocery Stores</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                        <input
                          type="checkbox"
                          checked={mapLayers.restaurants}
                          onChange={(e) =>
                            setMapLayers((p) => ({ ...p, restaurants: e.target.checked }))
                          }
                          className="accent-rose-500 w-3 h-3"
                        />
                        <span>Restaurants &amp; Cafes</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                        <input
                          type="checkbox"
                          checked={mapLayers.transit}
                          onChange={(e) =>
                            setMapLayers((p) => ({ ...p, transit: e.target.checked }))
                          }
                          className="accent-blue-500 w-3 h-3"
                        />
                        <span>Public Transportation</span>
                      </label>
                    </div>

                    {/* Interactive Leaflet Map */}
                    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 min-h-[320px] relative bg-slate-100 dark:bg-slate-900">
                      <FlorenceSafetyMap
                        selectedId={selectedNeighborhoodId}
                        onSelectNeighborhood={(id) => setSelectedNeighborhoodId(id)}
                      />
                    </div>

                    {/* 3 Snapshot Cards Below Map matching screenshot */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {NEIGHBORHOODS_LIST.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedNeighborhoodId(item.id);
                            setNeighborhoodModal(item);
                          }}
                          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs cursor-pointer flex flex-col justify-between"
                        >
                          <div>
                            <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                              {item.name}
                            </h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                              {item.walkTime}
                            </p>
                          </div>
                          <span className="text-[10px] font-bold text-red-600 hover:underline pt-1.5 flex items-center justify-end">
                            Details &gt;
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* --------------------------------------------------------- */}
                {/* 2B. LIST VIEW (SCREENSHOT 3) */}
                {/* --------------------------------------------------------- */}
                {viewMode === "list" && (
                  <div className="space-y-3">
                    {/* Header: Title + "List Mode Active" Badge */}
                    <div className="flex items-center justify-between pb-1">
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                          Florence Neighborhoods (5)
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Ranked by convenience, safety, and student feedback
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold">
                        List Mode Active
                      </span>
                    </div>

                    {/* 5 Neighborhood Cards */}
                    <div className="space-y-2.5">
                      {NEIGHBORHOODS_LIST.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                                  {item.name}
                                </h4>
                                <span
                                  className={`px-2 py-0.5 rounded-md border text-[9px] font-bold ${item.tagColor}`}
                                >
                                  {item.tag}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                                {item.description}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-400 font-semibold pt-1">
                                <span>{item.walkTime}</span>
                                <span>•</span>
                                <span className="text-[#DC2626]">{item.price}</span>
                                <span>•</span>
                                <span className="text-emerald-600">{item.safety}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setNeighborhoodModal(item)}
                            className="text-xs font-bold text-slate-600 hover:text-red-600 transition-colors shrink-0 whitespace-nowrap self-end sm:self-center cursor-pointer"
                          >
                            Details &gt;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* STEP 3: CONFIRMATION / SUMMARY */}
        {/* ============================================================= */}
        {currentStep === 3 && (
          <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6 animate-in fade-in duration-200 text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Your Housing Plan is Ready!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                We&apos;ve customized verified student apartments in Florence based on {groupName}&apos;s preferences.
              </p>
            </div>

            {/* Summary Details Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-500">Group Name</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{groupName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-500">Destination &amp; Semester</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{city}, Italy • {semester}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-500">Students / Roommates</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{members.length} Members ({members.map(m => m.name).join(", ")})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-500">Budget Range</span>
                <span className="font-bold text-red-600">€500 – €{budgetMax} / student</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Top Recommended Area</span>
                <span className="font-bold text-emerald-600">Santa Croce &amp; San Lorenzo</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/housing"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Browse Matching Florentine Flats</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
              >
                Edit Preferences
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODAL: ADD STUDENT */}
      {/* ------------------------------------------------------------- */}
      {addStudentModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111827] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Add Student Roommate
              </h3>
              <button
                type="button"
                onClick={() => setAddStudentModalOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="py-4 space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  STUDENT NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam, Chloe"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="student@university.edu"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddStudentModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Add Roommate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: NEIGHBORHOOD DETAIL */}
      {/* ------------------------------------------------------------- */}
      {neighborhoodModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111827] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {neighborhoodModal.name}
                </h3>
                <span className={`px-2 py-0.5 rounded-md border text-[9px] font-bold ${neighborhoodModal.tagColor}`}>
                  {neighborhoodModal.tag}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setNeighborhoodModal(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src={neighborhoodModal.image}
                  alt={neighborhoodModal.name}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {neighborhoodModal.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Commute Time:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{neighborhoodModal.walkTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Typical Rent:</span>
                  <span className="font-bold text-red-600">{neighborhoodModal.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Safety Index:</span>
                  <span className="font-bold text-emerald-600">{neighborhoodModal.safety}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setNeighborhoodModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <Link
                href={`/housing?neighborhood=${encodeURIComponent(neighborhoodModal.name)}`}
                className="px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>View Flats in Area</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
