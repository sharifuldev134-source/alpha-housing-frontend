"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MessageSquare,
  Mail,
  FileCheck,
  Calendar,
  User,
  Phone,
  ArrowRight,
  Lock,
  Check,
  ShieldCheck,
  LayoutDashboard,
  Users,
} from "lucide-react";

function GetHelpContent() {
  const searchParams = useSearchParams();

  // If redirected with ?submitted=true, show success view
  const [isSubmitted, setIsSubmitted] = useState(
    searchParams.get("submitted") === "true"
  );

  // Form input state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitted(true);
  };

  // -------------------------------------------------------------
  // SUCCESS STATE (Matching Screenshot 2 - Cinque Terre Background)
  // -------------------------------------------------------------
  if (isSubmitted) {
    return (
      <div className="relative min-h-[calc(100vh-72px)] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-slate-900">
        {/* Cinque Terre Cliff Seaside Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cinque_terre_banner.jpg"
            alt="Cinque Terre, Italy Coastline"
            fill
            priority
            className="object-cover object-center scale-100"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Centered Success Card */}
        <div className="relative z-10 w-full max-w-xl bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-100 dark:border-slate-800 text-center animate-in fade-in zoom-in-95 duration-300">
          {/* Green Check Circle */}
          <div className="w-14 h-14 rounded-full bg-[#00B074] text-white flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            We&apos;ve Received Your Request!
          </h1>

          <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-2">
            Thank you for reaching out to AlphaHousing.
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
            A member of our housing assistance team will contact you soon to learn more about your situation and discuss the next steps.
          </p>

          {/* 3 Step Timeline Box */}
          <div className="my-6 p-3 sm:p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-2">
            {/* Step 1 */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/70 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 text-left">
                We&apos;ll reach out to you
              </span>
            </div>

            {/* Red Arrow */}
            <div className="hidden sm:flex w-5 h-5 rounded-full bg-[#E52535] text-white items-center justify-center shrink-0 text-[10px]">
              <ArrowRight className="w-3 h-3 stroke-[3]" />
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/70 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 text-left">
                We&apos;ll discuss your needs
              </span>
            </div>

            {/* Red Arrow */}
            <div className="hidden sm:flex w-5 h-5 rounded-full bg-[#E52535] text-white items-center justify-center shrink-0 text-[10px]">
              <ArrowRight className="w-3 h-3 stroke-[3]" />
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/70 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 text-left">
                We&apos;ll recommend the best next steps
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/"
              className="py-3 px-8 rounded-xl bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs sm:text-sm font-bold shadow-md shadow-red-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Return to Home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard?tab=communication"
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium mt-1 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>View All Requests in Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // FORM STATE (Matching Screenshot 1 - Florence Panorama, Woman & Form)
  // -------------------------------------------------------------
  return (
    <div className="flex flex-col w-full bg-white dark:bg-[#0B0F17]">
      {/* Hero Banner Section */}
      <section className="relative w-full overflow-hidden min-h-[420px] sm:min-h-[440px] lg:h-[440px] flex items-center bg-white dark:bg-[#0B0F17]">
        {/* Full-width pristine composite background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/how_it_works_student.jpg"
            alt="AlphaHousing Assistance Banner"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Content Container (max-w-5xl matches 1024px screenshot proportions) */}
        <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Content (6 cols): Badge, Titles, Subtitle & 3 Feature Cards */}
            <div className="lg:col-span-6 text-left space-y-3">
              {/* Red Tag / Badge */}
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#E52535] uppercase tracking-wider">
                <span className="w-3.5 h-3.5 rounded-xs bg-[#E52535] text-white flex items-center justify-center">
                  <MessageSquare className="w-2.5 h-2.5 fill-current" />
                </span>
                <span>HOUSING ASSISTANCE</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[38px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Found an Apartment?
                <span className="block text-[#E52535] mt-0.5">Let Us Help.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm pt-0.5">
                You&apos;ve done the searching. Now let our housing assistance team help with the communication, follow-ups, and next steps.
              </p>

              {/* 3 Mini Feature Cards */}
              <div className="flex items-start gap-4 sm:gap-6 pt-2">
                {/* Feature 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-2xs">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10.5px] font-semibold text-slate-700 dark:text-slate-300 mt-1.5 leading-tight max-w-[75px]">
                    Contact providers for you
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-2xs">
                    <FileCheck className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10.5px] font-semibold text-slate-700 dark:text-slate-300 mt-1.5 leading-tight max-w-[75px]">
                    Follow up for answers
                  </span>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-2xs">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10.5px] font-semibold text-slate-700 dark:text-slate-300 mt-1.5 leading-tight max-w-[75px]">
                    Keep you updated
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content (6 cols): "Let's Get in Touch" Floating White Card */}
            <div className="lg:col-span-6 flex justify-end">
              <div className="w-full max-w-[340px] bg-white dark:bg-[#111827] rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-left">
                {/* Card Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#E52535] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                      Let&apos;s Get in Touch
                    </h3>
                    <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      Share your contact information and a member of our AlphaHousing team will reach out soon.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name */}
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name *"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 px-3.5 py-2 pl-10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address *"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 px-3.5 py-2 pl-10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number *"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 px-3.5 py-2 pl-10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#E52535] hover:bg-[#C8102E] text-white text-xs font-bold shadow-md shadow-red-600/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] cursor-pointer"
                  >
                    <span>Have AlphaHousing Contact Me</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Security Note */}
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 pt-0.5">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>Your information is kept private and secure.</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Bottom Bar: What Happens Next? (Centered & Overlapping Banner) */}
      <div className="relative z-20 max-w-4xl mx-auto w-full px-4 -mt-6 sm:-mt-7 mb-14 sm:mb-20">
        <div className="bg-white dark:bg-[#111827] rounded-2xl sm:rounded-full py-3 px-6 sm:px-8 shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white pr-4 sm:border-r border-slate-200 dark:border-slate-700 shrink-0">
            <span>What Happens Next?</span>
          </div>

          {/* Step 1 */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="w-4.5 h-4.5 rounded-full bg-[#E52535] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
              1
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-slate-700 dark:text-slate-300">
              We&apos;ll contact you to learn more.
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="w-4.5 h-4.5 rounded-full bg-[#E52535] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
              2
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-slate-700 dark:text-slate-300">
              We&apos;ll discuss your needs and how we can help.
            </span>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="w-4.5 h-4.5 rounded-full bg-[#E52535] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
              3
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-slate-700 dark:text-slate-300">
              We&apos;ll handle the agreed follow-ups and next steps.
            </span>
          </div>
        </div>
      </div>

      {/* Clean White Breathing Space above Footer */}
      <div className="min-h-[80px] sm:min-h-[120px] bg-white dark:bg-[#0B0F17]" />
    </div>
  );
}

export default function GetHelpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <GetHelpContent />
    </Suspense>
  );
}
