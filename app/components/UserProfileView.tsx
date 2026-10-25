"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  User,
  ShieldCheck,
  Bell,
  HelpCircle,
  Camera,
  CheckCircle2,
  Lock,
  Smartphone,
  Laptop,
  Check,
  Eye,
  EyeOff,
  LayoutDashboard,
  Users,
  Send,
  ChevronDown,
  ChevronUp,
  FileText,
  LifeBuoy,
  PhoneCall,
  MessageSquare,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

interface UserProfileViewProps {
  onBackToOverview?: () => void;
  onOpenParentPortal?: () => void;
}

export default function UserProfileView({
  onBackToOverview,
  onOpenParentPortal,
}: UserProfileViewProps) {
  const searchParams = useSearchParams();
  const subtabParam = searchParams.get("subtab");
  const initialSubtab =
    subtabParam === "security" ||
    subtabParam === "notification" ||
    subtabParam === "support"
      ? subtabParam
      : "edit";

  // Sub-tabs: edit, security, notification, support
  const [activeTab, setActiveTab] = useState<"edit" | "security" | "notification" | "support">(initialSubtab);

  // Theme hook
  const { theme, setTheme } = useTheme();

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Form State: Edit Profile
  const [profileData, setProfileData] = useState({
    fullName: "Emma",
    email: "emma.student@college.edu",
    phone: "+1 (555) 234-5678",
    homeUniversity: "Boston University",
    major: "Art History & European Studies",
    bio: "Junior studying abroad in Florence for Spring 2027. Excited about Renaissance art, cooking Italian pasta, and weekend trips to Tuscany!",
    monthlyBudget: 1300,
    cleanliness: "Very tidy (clean dishes immediately)",
    sleepSchedule: "Early Bird (11:00 PM - 7:30 AM)",
    emergencyContact: "Sarah Watson (Mother) - +1 (555) 987-6543",
  });

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("••••••••••••");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessions, setSessions] = useState([
    {
      id: "macbook",
      device: "MacBook Pro (Chrome 128)",
      location: "Florence, Italy • IP: 93.45.120.***",
      time: "Active now",
      isCurrent: true,
    },
    {
      id: "iphone",
      device: "iPhone 15 Pro (Safari Mobile)",
      location: "Boston, MA • IP: 24.112.87.***",
      time: "3 hours ago",
      isCurrent: false,
    },
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState({
    matchingFlats: true,
    roommateVoting: true,
    agencyMessages: true,
    smsAlerts: true,
    parentSync: true,
  });

  // Help & Support State
  const [supportCategory, setSupportCategory] = useState("Lease & Italian Contract (Contratto Transitorio) Review");
  const [supportMessage, setSupportMessage] = useState("");
  const [faqExpanded, setFaqExpanded] = useState<number | null>(0);

  // Group Members Data
  const crewMembers = [
    {
      name: "Emma",
      share: "$1300/mo share",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "Sophie",
      share: "$1200/mo share",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "Olivia",
      share: "$1400/mo share",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "Mia",
      share: "$1300/mo share",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-100" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* TOP USER PROFILE HEADER BANNER */}
      {/* ========================================================= */}
      <div className="bg-rose-50/40 border border-red-100/80 rounded-2xl p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Avatar and Info */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white shadow-sm shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                alt="Emma"
                fill
                className="object-cover"
              />
              <button
                type="button"
                className="absolute bottom-1 right-1 w-6 h-6 rounded-lg bg-[#DC2626] text-white flex items-center justify-center shadow-xs hover:bg-[#B91C1C] transition-colors"
                title="Change Avatar"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Emma
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#DC2626] text-white text-[10px] font-bold uppercase tracking-wider">
                  GROUP LEAD
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Boston University • IES Abroad - Florence
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-0.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Identity &amp; Visa Verified
                </span>
                <span>•</span>
                <span>Florence Spring 2027</span>
              </div>
            </div>
          </div>

          {/* Top Right Action Buttons */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            {onBackToOverview ? (
              <button
                onClick={onBackToOverview}
                className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
                <span>Dashboard Overview</span>
              </button>
            ) : (
              <Link
                href="/dashboard"
                className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
                <span>Dashboard Overview</span>
              </Link>
            )}

            {onOpenParentPortal ? (
              <button
                onClick={onOpenParentPortal}
                className="py-2.5 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5 text-white" />
                <span>Parent Portal</span>
              </button>
            ) : (
              <Link
                href="/dashboard?tab=parent"
                className="py-2.5 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5 text-white" />
                <span>Parent Portal</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* PROFILE SUB-TABS NAVIGATION BAR */}
      {/* ========================================================= */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab("edit")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "edit"
              ? "bg-[#FFF4F4] text-[#DC2626] border border-red-200/80 shadow-2xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "security"
              ? "bg-[#FFF4F4] text-[#DC2626] border border-red-200/80 shadow-2xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Security</span>
        </button>

        <button
          onClick={() => setActiveTab("notification")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "notification"
              ? "bg-[#FFF4F4] text-[#DC2626] border border-red-200/80 shadow-2xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Notification</span>
        </button>

        <button
          onClick={() => setActiveTab("support")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "support"
              ? "bg-[#FFF4F4] text-[#DC2626] border border-red-200/80 shadow-2xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Help &amp; Support</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* MAIN TWO-COLUMN CONTENT GRID */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: ACTIVE TAB CONTENT (8 COLS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* ----------------------------------------------------- */}
          {/* TAB 1: EDIT PROFILE */}
          {/* ----------------------------------------------------- */}
          {activeTab === "edit" && (
            <div className="space-y-6">
              {/* Card 1: Personal & University Details */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <User className="w-4 h-4 text-[#DC2626]" />
                    <span>Personal &amp; University Details</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                    VERIFIED STUDENT
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, fullName: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      UNIVERSITY (.EDU) EMAIL
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      STUDENT PHONE NUMBER
                    </label>
                    <input
                      type="text"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      HOME UNIVERSITY
                    </label>
                    <input
                      type="text"
                      value={profileData.homeUniversity}
                      onChange={(e) =>
                        setProfileData({ ...profileData, homeUniversity: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      ACADEMIC MAJOR
                    </label>
                    <input
                      type="text"
                      value={profileData.major}
                      onChange={(e) =>
                        setProfileData({ ...profileData, major: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      SHORT BIO FOR ROOMMATES &amp; LANDLORDS
                    </label>
                    <textarea
                      rows={3}
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      className="w-full p-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Living Habits & Roommate Compatibility */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-[#DC2626]" />
                    <span>Living Habits &amp; Roommate Compatibility</span>
                  </div>
                </div>

                {/* Monthly Budget Share Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      MONTHLY BUDGET SHARE
                    </span>
                    <span className="text-sm font-bold text-[#DC2626]">
                      ${profileData.monthlyBudget} / month
                    </span>
                  </div>
                  <input
                    type="range"
                    min="800"
                    max="2200"
                    step="50"
                    value={profileData.monthlyBudget}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        monthlyBudget: Number(e.target.value),
                      })
                    }
                    className="w-full accent-[#DC2626] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>Min: $800</span>
                    <span>Avg Florence: $1,200</span>
                    <span>Max: $2,200</span>
                  </div>
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      CLEANLINESS STANDARD
                    </label>
                    <select
                      value={profileData.cleanliness}
                      onChange={(e) =>
                        setProfileData({ ...profileData, cleanliness: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    >
                      <option>Very tidy (clean dishes immediately)</option>
                      <option>Moderate (tidy up weekly)</option>
                      <option>Relaxed</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      SLEEP SCHEDULE
                    </label>
                    <select
                      value={profileData.sleepSchedule}
                      onChange={(e) =>
                        setProfileData({ ...profileData, sleepSchedule: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    >
                      <option>Early Bird (11:00 PM - 7:30 AM)</option>
                      <option>Night Owl (1:00 AM - 9:00 AM)</option>
                      <option>Flexible</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      EMERGENCY PARENT / GUARDIAN CONTACT
                    </label>
                    <input
                      type="text"
                      value={profileData.emergencyContact}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          emergencyContact: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                  </div>
                </div>

                {/* Footer Save Button */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-400">
                    Auto-saved to Emma&apos;s Housing Crew
                  </span>
                  <button
                    type="button"
                    onClick={() => showToast("Profile changes saved successfully!")}
                    className="py-2.5 px-5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors self-start sm:self-auto"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------- */}
          {/* TAB 2: SECURITY */}
          {/* ----------------------------------------------------- */}
          {activeTab === "security" && (
            <div className="space-y-6">
              {/* Card 1: Change Password */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Lock className="w-4 h-4 text-[#DC2626]" />
                    <span>Change Password</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Last changed 42 days ago
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      CURRENT PASSWORD
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3 py-2 pr-10 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                        title={showCurrentPassword ? "Hide password" : "Show password"}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        NEW PASSWORD
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Min 8 characters"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 pr-10 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                          title={showNewPassword ? "Hide password" : "Show password"}
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        CONFIRM NEW PASSWORD
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Re-type new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 pr-10 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                          title={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      showToast("Password updated securely!");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                    className="py-2.5 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs shadow-2xs transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>

              {/* Card 2: Two-Factor Authentication (2FA) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Two-Factor Authentication (2FA)
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Protect your study abroad apartment bookings, lease signatures, and parent links with SMS or Authenticator verification.
                      </p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      twoFactorEnabled ? "bg-[#DC2626]" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        twoFactorEnabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified via +1 (555) ***-5678
                  </span>
                  <button
                    onClick={() => showToast("Switched to Authenticator App mode")}
                    className="text-[#DC2626] hover:underline text-[11px] font-semibold"
                  >
                    Switch to Authenticator App
                  </button>
                </div>
              </div>

              {/* Card 3: Active Login Devices & Sessions */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                  <Laptop className="w-4 h-4 text-[#DC2626]" />
                  <span>Active Login Devices &amp; Sessions</span>
                </div>

                <div className="space-y-3">
                  {sessions.map((sess) => (
                    <div
                      key={sess.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/60 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600">
                          {sess.id === "macbook" ? (
                            <Laptop className="w-4 h-4" />
                          ) : (
                            <Smartphone className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{sess.device}</span>
                            {sess.isCurrent && (
                              <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                                Current Device
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {sess.location} • {sess.time}
                          </p>
                        </div>
                      </div>

                      <div>
                        {sess.isCurrent ? (
                          <span className="text-emerald-600 font-bold text-[11px]">Online</span>
                        ) : (
                          <button
                            onClick={() => {
                              setSessions(sessions.filter((s) => s.id !== sess.id));
                              showToast("Device session revoked successfully");
                            }}
                            className="text-[#DC2626] hover:underline font-bold text-[11px]"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-right">
                  <button
                    onClick={() => {
                      setSessions(sessions.filter((s) => s.isCurrent));
                      showToast("Logged out from all other devices");
                    }}
                    className="text-xs font-bold text-[#DC2626] hover:underline"
                  >
                    Log out from all other devices
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------- */}
          {/* TAB 3: NOTIFICATION & PREFERENCES */}
          {/* ----------------------------------------------------- */}
          {activeTab === "notification" && (
            <div className="space-y-6">
              {/* Appearance & Dark/Light Mode Preference Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                      {theme === "dark" ? (
                        <Moon className="w-4 h-4 text-indigo-400" />
                      ) : (
                        <Sun className="w-4 h-4 text-amber-500" />
                      )}
                      <span>Appearance &amp; Theme Mode</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Choose between White Mode and Dark Mode for the entire website.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
                    {theme === "dark" ? "🌙 Dark Active" : "☀️ Light Active"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Light Mode Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setTheme("light");
                      showToast("Switched to White / Light Mode!");
                    }}
                    className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-left ${
                      theme === "light"
                        ? "border-[#DC2626] bg-red-50/30 ring-2 ring-red-500/10 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                        <Sun className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">White Mode</p>
                        <p className="text-[11px] text-slate-500">Crisp, clean high-contrast daylight</p>
                      </div>
                    </div>
                    {theme === "light" && (
                      <CheckCircle2 className="w-4 h-4 text-[#DC2626]" />
                    )}
                  </button>

                  {/* Dark Mode Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setTheme("dark");
                      showToast("Switched to Dark Mode!");
                    }}
                    className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-left ${
                      theme === "dark"
                        ? "border-[#DC2626] bg-red-50/30 ring-2 ring-red-500/10 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                        <Moon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Dark Mode</p>
                        <p className="text-[11px] text-slate-500">Sleek, low-strain night aesthetic</p>
                      </div>
                    </div>
                    {theme === "dark" && (
                      <CheckCircle2 className="w-4 h-4 text-[#DC2626]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Bell className="w-4 h-4 text-[#DC2626]" />
                    <span>Notification Preferences</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Choose what updates you want to receive about your Florence apartment search, roommates, and landlord responses.
                  </p>
                </div>

              <div className="divide-y divide-slate-100 space-y-3 pt-1">
                {/* 1. New Matching Flats */}
                <div className="pt-3 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      New Matching 3–5 Bed Flats
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Alert me when new apartments in Santa Croce or Santo Spirito meet our group budget.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.matchingFlats}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        matchingFlats: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-[#DC2626] accent-[#DC2626] mt-0.5 cursor-pointer"
                  />
                </div>

                {/* 2. Roommate Voting */}
                <div className="pt-3 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Roommate Voting &amp; Shortlists
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Notify me when Sophie, Olivia, or Mia votes or leaves a comment on a flat.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.roommateVoting}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        roommateVoting: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-[#DC2626] accent-[#DC2626] mt-0.5 cursor-pointer"
                  />
                </div>

                {/* 3. Agency Messages */}
                <div className="pt-3 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Italian Landlord &amp; Agency Messages
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Instant notification when a property manager accepts our viewing inquiry.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.agencyMessages}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        agencyMessages: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-[#DC2626] accent-[#DC2626] mt-0.5 cursor-pointer"
                  />
                </div>

                {/* 4. SMS Alerts */}
                <div className="pt-3 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      SMS / WhatsApp Urgent Alerts
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Send text alerts to +1 (555) 234-5678 for time-sensitive lease approvals.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.smsAlerts}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        smsAlerts: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-[#DC2626] accent-[#DC2626] mt-0.5 cursor-pointer"
                  />
                </div>

                {/* 5. Parent Sync */}
                <div className="pt-3 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Parent Portal Notification Sync
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Keep parents updated on safety score verifications and deposit milestones.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.parentSync}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        parentSync: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-[#DC2626] accent-[#DC2626] mt-0.5 cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast("Notification settings saved!")}
                  className="py-2.5 px-5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs shadow-2xs transition-colors"
                >
                  Save Notification Settings
                </button>
              </div>
            </div>
          </div>
          )}

          {/* ----------------------------------------------------- */}
          {/* TAB 4: HELP & SUPPORT */}
          {/* ----------------------------------------------------- */}
          {activeTab === "support" && (
            <div className="space-y-6">
              {/* Row of 3 Quick Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1.5 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center mx-auto">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Student Advisor</h4>
                  <p className="text-[11px] text-slate-500">
                    Bilingual assistance with Italian landlords &amp; contracts.
                  </p>
                  <button
                    onClick={() => showToast("Opening Advisor live chat...")}
                    className="text-xs font-bold text-[#DC2626] hover:underline pt-1 inline-block"
                  >
                    Start Chat
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1.5 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Emergency Hotline</h4>
                  <p className="text-[11px] text-slate-500">
                    24/7 Florence emergency &amp; police liaison (112 / 113).
                  </p>
                  <Link
                    href="/safety"
                    className="text-xs font-bold text-emerald-700 hover:underline pt-1 inline-block"
                  >
                    View Safety Guide
                  </Link>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1.5 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                    <Eye className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Parent Support</h4>
                  <p className="text-[11px] text-slate-500">
                    Reassuring briefings and deposit verification for families.
                  </p>
                  <button
                    onClick={onOpenParentPortal}
                    className="text-xs font-bold text-indigo-600 hover:underline pt-1 inline-block"
                  >
                    Parent Portal
                  </button>
                </div>
              </div>

              {/* Send a Request to Alpha Housing Support */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Send className="w-4 h-4 text-[#DC2626]" />
                  <span>Send a Request to Alpha Housing Support</span>
                </div>
                <p className="text-xs text-slate-500">
                  Our team in Florence responds in under 2 hours during European business hours.
                </p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      TOPIC / CATEGORY
                    </label>
                    <select
                      value={supportCategory}
                      onChange={(e) => setSupportCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    >
                      <option>Lease &amp; Italian Contract (Contratto Transitorio) Review</option>
                      <option>Payment &amp; EU Escrow Verification</option>
                      <option>Roommate Dispute or Profile Changes</option>
                      <option>Landlord Communication Assistance</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      DESCRIBE WHAT YOU NEED HELP WITH
                    </label>
                    <textarea
                      rows={3}
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      placeholder="e.g. Can you review clause 4 of the Santa Croce apartment lease regarding winter heating charges?"
                      className="w-full p-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626] resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span className="text-[11px] text-slate-500">
                    Attached: Emma&apos;s Student Group (Florence Spring 2027)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!supportMessage.trim()) {
                        showToast("Please enter your question before submitting.");
                        return;
                      }
                      showToast("Support ticket submitted! Ticket #FL-8921 opened.");
                      setSupportMessage("");
                    }}
                    className="py-2.5 px-5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors self-start sm:self-auto"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Request</span>
                  </button>
                </div>
              </div>

              {/* Top Help Articles & Answers */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  TOP HELP ARTICLES &amp; ANSWERS
                </h4>

                <div className="space-y-2 text-xs">
                  {/* FAQ 1 */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setFaqExpanded(faqExpanded === 0 ? null : 0)}
                      className="w-full flex items-center justify-between p-3.5 text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <span>How do I add a new roommate to Emma&apos;s Housing Crew?</span>
                      {faqExpanded === 0 ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    {faqExpanded === 0 && (
                      <div className="px-3.5 pb-3.5 text-slate-600 text-[11px] leading-relaxed border-t border-slate-100 pt-2">
                        Navigate to &quot;Group Setup&quot; from the top navigation or click &quot;Manage Group Members&quot;. You can invite students by email or copy your private group invite code.
                      </div>
                    )}
                  </div>

                  {/* FAQ 2 */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setFaqExpanded(faqExpanded === 1 ? null : 1)}
                      className="w-full flex items-center justify-between p-3.5 text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <span>How does Alpha Check™ review our Italian rental contract?</span>
                      {faqExpanded === 1 ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    {faqExpanded === 1 && (
                      <div className="px-3.5 pb-3.5 text-slate-600 text-[11px] leading-relaxed border-t border-slate-100 pt-2">
                        Upload your PDF draft or photo of the Italian lease. Our AI checks national rent cap laws (Legge 431/98), verifies landlord identity, and flags unfair clauses or hidden charges.
                      </div>
                    )}
                  </div>

                  {/* FAQ 3 */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setFaqExpanded(faqExpanded === 2 ? null : 2)}
                      className="w-full flex items-center justify-between p-3.5 text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <span>Can parents pay the security deposit on our behalf?</span>
                      {faqExpanded === 2 ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    {faqExpanded === 2 && (
                      <div className="px-3.5 pb-3.5 text-slate-600 text-[11px] leading-relaxed border-t border-slate-100 pt-2">
                        Yes! Via the Parent Portal, parents can wire directly to our segregated European custody escrow account with individual liability protection.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: PERMANENT SIDEBAR CARDS (4 COLS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card 1: Emma's Housing Crew */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#DC2626]" />
                <h3 className="text-xs font-bold text-slate-900">Emma&apos;s Housing Crew</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-[#DC2626] text-[10px] font-bold">
                4 Members
              </span>
            </div>

            <div className="space-y-2.5">
              {crewMembers.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200">
                      <Image src={m.avatar} alt={m.name} fill className="object-cover" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 leading-tight truncate">
                        {m.name}
                      </div>
                      <div className="text-[10px] text-slate-500 leading-tight">
                        {m.share}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                    Verified
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => showToast("Opening Group Management dialog...")}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors shadow-2xs"
            >
              Manage Group Members
            </button>
          </div>

          {/* Card 2: Parent Portal Sync (Red Solid Card from screenshot!) */}
          <div className="bg-[#991B1B] text-white rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-red-200" />
              <h3 className="text-xs font-bold">Parent Portal Sync</h3>
            </div>
            <p className="text-[11px] text-red-100 leading-relaxed">
              Your parents Sarah &amp; David Watson have read-only access to view neighborhood safety and apartment check results.
            </p>
            <button
              onClick={onOpenParentPortal}
              className="w-full py-2.5 px-4 rounded-xl bg-white text-[#991B1B] hover:bg-slate-50 font-bold text-xs transition-all shadow-xs"
            >
              Open Parent View
            </button>
          </div>

          {/* Card 3: Lease Verification Documents */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <FileText className="w-4 h-4 text-[#DC2626]" />
              <span>Lease Verification Documents</span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Doc 1: Codice Fiscale */}
              <div className="flex items-start justify-between pb-2.5 border-b border-slate-100">
                <div>
                  <div className="font-bold text-slate-900">Codice Fiscale</div>
                  <div className="text-[10px] text-emerald-700 flex items-center gap-1 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Registered: WTSNMM04A41Z404X</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  Active
                </span>
              </div>

              {/* Doc 2: University Acceptance */}
              <div className="flex items-start justify-between pb-2.5 border-b border-slate-100">
                <div>
                  <div className="font-bold text-slate-900">University Acceptance</div>
                  <div className="text-[10px] text-emerald-700 flex items-center gap-1 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>IES Abroad Spring 2027</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  Verified
                </span>
              </div>

              {/* Doc 3: Move-in Inspection Form */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-slate-900">Move-in Inspection Form</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Contratto Transitorio
                  </div>
                </div>
                <button
                  onClick={() => showToast("Opening Move-in Inspection Form...")}
                  className="text-[10px] font-bold text-[#DC2626] hover:underline"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
