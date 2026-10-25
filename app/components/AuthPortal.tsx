"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Check,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Mail,
  Smartphone,
  GraduationCap,
  Sparkles,
  Users,
  Building,
  KeyRound,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Globe,
  FileCheck2,
} from "lucide-react";

type AuthMode =
  | "login"
  | "signup"
  | "signup-otp"
  | "signup-success"
  | "forgot-request"
  | "forgot-otp"
  | "forgot-newpass"
  | "forgot-success";

interface AuthPortalProps {
  initialMode?: "login" | "signup" | "forgot";
}

export default function AuthPortal({ initialMode = "login" }: AuthPortalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mode state
  const queryMode = searchParams?.get("mode");
  const defaultMode: AuthMode =
    queryMode === "signup"
      ? "signup"
      : queryMode === "forgot"
      ? "forgot-request"
      : initialMode === "signup"
      ? "signup"
      : initialMode === "forgot"
      ? "forgot-request"
      : "login";

  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [role, setRole] = useState<"student" | "parent">("student");

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState("emma.watson@bu.edu");
  const [loginPassword, setLoginPassword] = useState("••••••••••••");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form State
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "Florence, Italy",
    university: "Boston University",
    program: "IES Abroad Florence",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // OTP State (Used for both signup & forgot)
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [timerActive, setTimerActive] = useState(false);

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const startOtpTimer = () => {
    setTimerSeconds(45);
    setTimerActive(true);
  };

  // OTP Input handlers
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(digits.length, 5);
      otpInputsRef.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, key: string) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // 1. Submit Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) {
      showToast("Please enter your email or phone");
      return;
    }
    showToast("Authentication successful! Welcome to Alpha Housing.");
    setTimeout(() => {
      if (role === "parent") {
        router.push("/dashboard?tab=parent");
      } else {
        router.push("/dashboard");
      }
    }, 1000);
  };

  // 2. Submit Signup -> to OTP
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.fullName || !signupData.email || !signupData.password) {
      showToast("Please complete all required fields");
      return;
    }
    if (signupData.password.length < 8) {
      showToast("Password must be at least 8 characters long");
      return;
    }
    setOtp(["", "", "", "", "", ""]);
    startOtpTimer();
    setMode("signup-otp");
    showToast(`Verification code dispatched to ${signupData.email}`);
  };

  // 3. Verify Signup OTP
  const handleVerifySignupOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otp.join("");
    if (enteredCode.length < 6) {
      showToast("Please enter the complete 6-digit verification code");
      return;
    }
    setMode("signup-success");
    showToast("Email & phone verified! Identity confirmed ✓");
  };

  // 4. Request Forgot Password -> to OTP
  const handleForgotRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast("Please enter your registered student or parent email");
      return;
    }
    setOtp(["", "", "", "", "", ""]);
    startOtpTimer();
    setMode("forgot-otp");
    showToast(`Password reset code dispatched to ${forgotEmail}`);
  };

  // 5. Verify Forgot OTP -> to Set New Password
  const handleVerifyForgotOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otp.join("");
    if (enteredCode.length < 6) {
      showToast("Please enter the 6-digit security code");
      return;
    }
    setMode("forgot-newpass");
    showToast("Security code confirmed. Please set your new password.");
  };

  // 6. Submit New Password -> Success
  const handleSetNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      showToast("Password must contain at least 8 characters");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showToast("Passwords do not match");
      return;
    }
    setMode("forgot-success");
    showToast("Password updated successfully!");
  };

  // Quick autofill demo buttons
  const autoFillDemoStudent = () => {
    setRole("student");
    setLoginEmail("emma.watson@bu.edu");
    setLoginPassword("AlphaFlorence2027!");
    showToast("Filled demo student credentials (Emma Watson)");
  };

  const autoFillDemoParent = () => {
    setRole("parent");
    setLoginEmail("sarah.watson@family.com");
    setLoginPassword("ParentPortalFlorence!");
    showToast("Filled demo parent credentials (Sarah Watson)");
  };

  return (
    <div className="min-h-screen bg-[#FDFBFB] dark:bg-[#0B0F17] flex flex-col justify-between text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-300 border border-slate-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* ========================================================= */}
        {/* LEFT COLUMN: BRANDING & IMMERSIVE FLORENCE VISUAL */}
        {/* ========================================================= */}
        <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative bg-slate-950 p-12 flex-col justify-between text-white overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1600&q=80"
              alt="Florence Cathedral"
              fill
              priority
              className="object-cover opacity-40 object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
          </div>

          {/* Top Logo */}
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-white">
                Alpha<span className="text-[#DC2626]">Housing</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-bold border border-red-500/30 uppercase tracking-wider">
                Florence &bull; Spring 2027
              </span>
            </Link>
          </div>

          {/* Center Quotation / Trust Card */}
          <div className="relative z-10 max-w-lg space-y-6">
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
              <div className="flex items-center gap-1.5 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-base">&starf;</span>
                ))}
              </div>
              <p className="text-sm text-slate-100 font-medium leading-relaxed italic">
                &ldquo;Finding housing in Santa Croce as international students was daunting until Alpha Housing verified our Italian lease clauses and set up our parent escrow.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/30">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    alt="Emma Watson"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Emma Watson</div>
                  <div className="text-[11px] text-slate-300">
                    Boston University • IES Abroad Florence
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Safety Guarantees */}
            <div className="grid grid-cols-3 gap-3 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Anti-Scam</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>EU Escrow Lock</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-red-400 shrink-0" />
                <span>Law 431/98 Leases</span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="relative z-10 text-[11px] text-slate-400">
            &copy; 2026 AlphaAbroadrez Technologies, Inc. European Student Housing Security Standard.
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: AUTHENTICATION FLOW CARDS */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-16 py-12 lg:py-16 max-w-2xl mx-auto w-full">
          {/* Top Switcher for Mobile */}
          <div className="lg:hidden mb-6 flex justify-between items-center border-b border-slate-100 pb-4">
            <Link href="/" className="text-xl font-black text-slate-900">
              Alpha<span className="text-[#DC2626]">Housing</span>
            </Link>
            <Link href="/housing" className="text-xs text-slate-500 font-semibold hover:text-slate-900">
              Browse Flats &rarr;
            </Link>
          </div>

          {/* ======================================================= */}
          {/* FLOW 1: LOGIN MODE */}
          {/* ======================================================= */}
          {mode === "login" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2626] block mb-1">
                  SECURE STUDENT &amp; FAMILY ACCESS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Welcome back
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Access your Florence housing shortlist, roommate split, and legal lease dossier.
                </p>
              </div>

              {/* Role Toggle: Student vs Parent */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                    role === "student"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-[#DC2626]" />
                  <span>Student Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("parent")}
                  className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                    role === "parent"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Eye className="w-4 h-4 text-indigo-600" />
                  <span>Parent Portal</span>
                </button>
              </div>

              {/* Quick Demo Pre-fill helper */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Demo Fill:</span>
                <button
                  type="button"
                  onClick={autoFillDemoStudent}
                  className="px-2 py-0.5 rounded-lg bg-red-50 text-[#DC2626] font-semibold hover:bg-red-100 transition-colors"
                >
                  Emma (Student)
                </button>
                <button
                  type="button"
                  onClick={autoFillDemoParent}
                  className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 font-semibold hover:bg-indigo-100 transition-colors"
                >
                  Olivia&apos;s Parent
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {role === "student" ? "STUDENT .EDU EMAIL OR PHONE" : "PARENT REGISTERED EMAIL"}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. emma.watson@bu.edu"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      PASSWORD
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode("forgot-request")}
                      className="text-[11px] font-bold text-[#DC2626] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-[#DC2626] accent-[#DC2626]"
                    />
                    <span>Remember this device for 30 days</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-red-500/20"
                >
                  <span>Sign In as {role === "student" ? "Student" : "Parent"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Bottom Switch Link */}
              <div className="text-center text-xs text-slate-500 pt-3 border-t border-slate-100">
                Don&apos;t have an Alpha Housing account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="font-bold text-[#DC2626] hover:underline"
                >
                  Create Student Account
                </button>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* FLOW 2: SIGN UP MODE */}
          {/* ======================================================= */}
          {mode === "signup" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2626] block mb-1">
                  NEW STUDENT REGISTRATION
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Create your student account
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Start your safe Florence apartment search, roommate group plan, and verified parent portal.
                </p>
              </div>

              {/* Sign Up Form */}
              <form onSubmit={handleSignupSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      placeholder="e.g. Emma Watson"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      UNIVERSITY (.EDU) EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      placeholder="e.g. student@bu.edu"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      PHONE NUMBER (FOR OTP) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={signupData.phone}
                      onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                      placeholder="+1 (555) 234-5678"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      DESTINATION CITY
                    </label>
                    <input
                      type="text"
                      disabled
                      value={signupData.destination}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      HOME UNIVERSITY
                    </label>
                    <input
                      type="text"
                      value={signupData.university}
                      onChange={(e) => setSignupData({ ...signupData, university: e.target.value })}
                      placeholder="e.g. Boston University"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      FLORENCE STUDY PROGRAM
                    </label>
                    <select
                      value={signupData.program}
                      onChange={(e) => setSignupData({ ...signupData, program: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    >
                      <option>IES Abroad Florence</option>
                      <option>FSU / Syracuse</option>
                      <option>NYU Florence</option>
                      <option>Stanford in Florence</option>
                      <option>Gonzaga Florence</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    CREATE PASSWORD (MIN 8 CHARACTERS) *
                  </label>
                  <div className="relative">
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      required
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      placeholder="At least 8 characters with numbers"
                      className="w-full px-3 py-2.5 pr-10 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-2 text-slate-600 text-[11px] pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={signupData.agreeTerms}
                    onChange={(e) => setSignupData({ ...signupData, agreeTerms: e.target.checked })}
                    className="rounded text-[#DC2626] accent-[#DC2626] mt-0.5"
                  />
                  <span>
                    I agree to the Alpha Housing Safety Protocol, Italian Law 431/98 compliance verification, and EU Escrow Terms.
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-red-500/20"
                >
                  <span>Send 6-Digit OTP Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Bottom Link */}
              <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
                Already registered with an active group?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="font-bold text-[#DC2626] hover:underline"
                >
                  Log In
                </button>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* FLOW 3: SIGN UP OTP VERIFICATION */}
          {/* ======================================================= */}
          {mode === "signup-otp" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Registration</span>
              </button>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                  STEP 2 OF 3: IDENTITY CONFIRMATION
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Verify your email &amp; phone
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  We sent a 6-digit verification code to{" "}
                  <strong className="text-slate-800">{signupData.email || "your university email"}</strong>.
                </p>
              </div>

              {/* Demo auto-fill banner */}
              <div className="bg-red-50/70 border border-red-200/80 rounded-2xl p-3 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#DC2626] font-medium">
                  Testing? Use verification OTP: <strong>849201</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setOtp(["8", "4", "9", "2", "0", "1"])}
                  className="px-2.5 py-1 rounded-lg bg-[#DC2626] text-white text-[10px] font-bold shadow-2xs"
                >
                  Auto-Fill OTP
                </button>
              </div>

              <form onSubmit={handleVerifySignupOtp} className="space-y-6">
                {/* 6 Digit Input Boxes */}
                <div className="flex justify-between gap-2 sm:gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputsRef.current[idx] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e.key)}
                      className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-black rounded-2xl border-2 border-slate-200 text-slate-900 focus:outline-none focus:border-[#DC2626] focus:ring-4 focus:ring-red-500/10 transition-all bg-white shadow-2xs"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">
                    {timerActive ? (
                      `Resend code in ${timerSeconds}s`
                    ) : (
                      <button
                        type="button"
                        onClick={startOtpTimer}
                        className="font-bold text-[#DC2626] hover:underline"
                      >
                        Resend Code via SMS
                      </button>
                    )}
                  </span>

                  <button
                    type="button"
                    onClick={() => showToast("Dispatched code via WhatsApp!")}
                    className="text-emerald-700 font-bold hover:underline text-[11px]"
                  >
                    Send via WhatsApp
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-red-500/20"
                >
                  <span>Verify &amp; Activate Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* ======================================================= */}
          {/* FLOW 4: SIGN UP SUCCESS CONFIRMATION */}
          {/* ======================================================= */}
          {mode === "signup-success" && (
            <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                  ACCOUNT CREATION COMPLETE
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Welcome to Alpha Housing, {signupData.fullName || "Student"}!
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Your student identity, university status, and Florence residency profile have been activated.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Registered Email:</span>
                  <span className="font-bold text-slate-800">{signupData.email || "student@bu.edu"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-bold text-slate-800">Florence Spring 2027</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Parent Portal Link:</span>
                  <span className="font-bold text-emerald-700">Ready to share</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="w-full py-3 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Go to Housing Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLoginEmail(signupData.email || "emma.watson@bu.edu");
                    setMode("login");
                  }}
                  className="w-full py-2.5 text-xs text-slate-600 font-bold hover:text-slate-900"
                >
                  Switch to Login Screen
                </button>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* FLOW 5: FORGOT PASSWORD REQUEST */}
          {/* ======================================================= */}
          {mode === "forgot-request" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </button>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2626] block mb-1">
                  ACCOUNT SECURITY RECOVERY
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Reset your password
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Enter your registered student or parent email address. We&apos;ll send an authentication OTP code to verify your identity.
                </p>
              </div>

              <form onSubmit={handleForgotRequestSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    REGISTERED EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="e.g. emma.watson@bu.edu"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Your reset link is protected with encrypted authentication under EU eIDAS regulation.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-red-500/20"
                >
                  <span>Send Password Reset OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* ======================================================= */}
          {/* FLOW 6: FORGOT PASSWORD OTP VERIFY */}
          {/* ======================================================= */}
          {mode === "forgot-otp" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <button
                type="button"
                onClick={() => setMode("forgot-request")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Email Input</span>
              </button>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2626] block mb-1">
                  SECURITY CODE VERIFICATION
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Enter Password Reset Code
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  We sent a 6-digit security code to{" "}
                  <strong className="text-slate-800">{forgotEmail || "your email"}</strong>.
                </p>
              </div>

              {/* Demo auto-fill banner */}
              <div className="bg-red-50/70 border border-red-200/80 rounded-2xl p-3 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#DC2626] font-medium">
                  Testing? Use security OTP: <strong>573912</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setOtp(["5", "7", "3", "9", "1", "2"])}
                  className="px-2.5 py-1 rounded-lg bg-[#DC2626] text-white text-[10px] font-bold shadow-2xs"
                >
                  Auto-Fill OTP
                </button>
              </div>

              <form onSubmit={handleVerifyForgotOtp} className="space-y-6">
                {/* 6 Digit Input Boxes */}
                <div className="flex justify-between gap-2 sm:gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputsRef.current[idx] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e.key)}
                      className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-black rounded-2xl border-2 border-slate-200 text-slate-900 focus:outline-none focus:border-[#DC2626] focus:ring-4 focus:ring-red-500/10 transition-all bg-white shadow-2xs"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">
                    {timerActive ? (
                      `Resend code in ${timerSeconds}s`
                    ) : (
                      <button
                        type="button"
                        onClick={startOtpTimer}
                        className="font-bold text-[#DC2626] hover:underline"
                      >
                        Resend Code
                      </button>
                    )}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-red-500/20"
                >
                  <span>Verify Security Code</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* ======================================================= */}
          {/* FLOW 7: SET NEW PASSWORD */}
          {/* ======================================================= */}
          {mode === "forgot-newpass" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2626] block mb-1">
                  NEW CREDENTIALS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Set your new password
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Choose a strong password to protect your leases and financial escrow deposits.
                </p>
              </div>

              <form onSubmit={handleSetNewPassword} className="space-y-4 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    NEW PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    CONFIRM NEW PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmNewPassword ? "text" : "password"}
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Re-type your new password"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showConfirmNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Password Strength Checklist */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5 text-[11px]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    PASSWORD REQUIREMENTS:
                  </span>
                  <div className="flex items-center gap-2">
                    <Check
                      className={`w-3.5 h-3.5 ${
                        newPassword.length >= 8 ? "text-emerald-600" : "text-slate-300"
                      }`}
                    />
                    <span className={newPassword.length >= 8 ? "text-slate-800 font-semibold" : "text-slate-500"}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check
                      className={`w-3.5 h-3.5 ${
                        /\d/.test(newPassword) ? "text-emerald-600" : "text-slate-300"
                      }`}
                    />
                    <span className={/\d/.test(newPassword) ? "text-slate-800 font-semibold" : "text-slate-500"}>
                      At least 1 number (0–9)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check
                      className={`w-3.5 h-3.5 ${
                        newPassword && newPassword === confirmNewPassword ? "text-emerald-600" : "text-slate-300"
                      }`}
                    />
                    <span
                      className={
                        newPassword && newPassword === confirmNewPassword
                          ? "text-slate-800 font-semibold"
                          : "text-slate-500"
                      }
                    >
                      Passwords match
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-red-500/20"
                >
                  <span>Reset Password &amp; Save</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* ======================================================= */}
          {/* FLOW 8: PASSWORD CHANGED SUCCESS */}
          {/* ======================================================= */}
          {mode === "forgot-success" && (
            <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                  SECURITY UPDATE COMPLETE
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Password Reset Successfully!
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Your new credentials have been updated and encrypted. You can now log into Alpha Housing.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setLoginEmail(forgotEmail || "emma.watson@bu.edu");
                    setLoginPassword("");
                    setMode("login");
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Log In with New Password</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
