"use client";

import React, { useState, useEffect } from "react";
import { Loader2, ArrowLeft, Sparkles, RefreshCw, CheckCircle2 } from "lucide-react";

interface DashboardPageLoadingProps {
  pageTitle: string;
  categoryName?: string;
  onBackToOverview?: () => void;
}

export default function DashboardPageLoading({
  pageTitle,
  categoryName = "RESOURCE MODULE",
  onBackToOverview,
}: DashboardPageLoadingProps) {
  const [progress, setProgress] = useState(24);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    "Establishing secure session with Florence housing network...",
    "Querying verified local partners and student safety logs...",
    "Preparing real-time guides, hotline contacts, and resources...",
    "Finalizing layout rendering...",
  ];

  useEffect(() => {
    // Reset progress on pageTitle change
    setProgress(28);
    setCurrentStep(0);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      setProgress((prev) => Math.min(prev + 22, 92));
    }, 1200);

    return () => clearInterval(stepInterval);
  }, [pageTitle]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2626]">
              {categoryName}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-400 text-xs font-medium">Under Live Synchronization</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <span>{pageTitle}</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-[#DC2626] border border-red-200 text-xs font-semibold">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#DC2626]" />
              Loading...
            </span>
          </h1>
        </div>

        {onBackToOverview && (
          <button
            onClick={onBackToOverview}
            className="self-start sm:self-auto py-2 px-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </button>
        )}
      </div>

      {/* Main Loading Status Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-red-50 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Animated Spinner with pulse */}
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#DC2626] to-rose-400 flex items-center justify-center text-white shadow-lg shadow-red-500/20 shrink-0">
            <Loader2 className="w-7 h-7 animate-spin text-white" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                Loading {pageTitle}...
              </h3>
              <span className="text-xs font-bold text-[#DC2626]">{progress}%</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Fetching verified student safety databases, Florence emergency liaison contacts, and local daily life orientation guides for Florence Spring 2025.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#DC2626] via-rose-500 to-[#DC2626] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 font-medium text-slate-600">
              <Sparkles className="w-3 h-3 text-[#DC2626]" />
              {loadingSteps[currentStep]}
            </span>
            <span>Estimated time: ~1.5s</span>
          </div>
        </div>

        {/* Live sync checklist pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100">
          {loadingSteps.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;
            return (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-[11px] flex items-center gap-2 transition-all ${
                  isDone
                    ? "bg-emerald-50/60 border-emerald-200 text-emerald-800 font-medium"
                    : isCurrent
                    ? "bg-red-50/60 border-red-200 text-[#DC2626] font-semibold"
                    : "bg-slate-50/40 border-slate-100 text-slate-400"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#DC2626] shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                )}
                <span className="truncate">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shimmering Content Skeletons (representing the page being assembled) */}
      <div className="space-y-4">
        {/* Row of 3 skeleton KPI stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-slate-100 animate-pulse" />
                <div className="w-12 h-4 rounded-md bg-slate-100 animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <div className="w-24 h-6 rounded-lg bg-slate-200 animate-pulse" />
                <div className="w-36 h-3 rounded-md bg-slate-100 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Big 2-column skeleton preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="w-40 h-5 rounded-lg bg-slate-200 animate-pulse" />
              <div className="w-20 h-4 rounded-md bg-slate-100 animate-pulse" />
            </div>
            <div className="h-48 w-full rounded-xl bg-slate-100 animate-pulse" />
            <div className="space-y-2 pt-2">
              <div className="w-full h-3 rounded bg-slate-100 animate-pulse" />
              <div className="w-4/5 h-3 rounded bg-slate-100 animate-pulse" />
              <div className="w-2/3 h-3 rounded bg-slate-100 animate-pulse" />
            </div>
          </div>

          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
            <div className="w-32 h-5 rounded-lg bg-slate-200 animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="w-20 h-3 rounded bg-slate-200 animate-pulse" />
                    <div className="w-28 h-2.5 rounded bg-slate-100 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
