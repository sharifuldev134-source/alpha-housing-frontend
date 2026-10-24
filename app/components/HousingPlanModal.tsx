"use client";

import React, { useState } from "react";
import { 
  X, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Euro,
  Building,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

interface HousingPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCity?: string;
  defaultSemester?: string;
  defaultStudents?: number;
}

export default function HousingPlanModal({
  isOpen,
  onClose,
  defaultCity = "Florence, Italy",
  defaultSemester = "Spring 2027",
  defaultStudents = 4,
}: HousingPlanModalProps) {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState(defaultCity);
  const [semester, setSemester] = useState(defaultSemester);
  const [studentCount, setStudentCount] = useState(defaultStudents);
  const [budgetPerStudent, setBudgetPerStudent] = useState(850);
  const [university, setUniversity] = useState("FSU Florence Study Center");
  const [roommateNames, setRoommateNames] = useState(["Emma Watson", "Sarah Jenkins", "Liam Chen", "Mia Alvarez"]);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalPooledBudget = budgetPerStudent * studentCount;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {submitted ? "Housing Plan Generated!" : "Create Your Housing Plan"}
              </h2>
              <p className="text-xs text-slate-500">
                {submitted ? "Matched with verified apartments" : `Step ${step} of 3: AI-Powered Group Setup`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!submitted ? (
            <div>
              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex-1 flex items-center">
                    <div
                      className={`h-1.5 w-full rounded-full transition-all ${
                        num <= step ? "bg-red-600" : "bg-slate-100"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Step 1: Destination & University */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>Study Abroad Destination</span>
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white"
                    >
                      <option value="Florence, Italy">Florence, Italy (Tuscany)</option>
                      <option value="Barcelona, Spain">Barcelona, Spain (Catalonia)</option>
                      <option value="Paris, France">Paris, France (Île-de-France)</option>
                      <option value="Rome, Italy">Rome, Italy (Lazio)</option>
                      <option value="Madrid, Spain">Madrid, Spain</option>
                      <option value="Lisbon, Portugal">Lisbon, Portugal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-red-500" />
                      <span>University / Study Center in {city.split(",")[0]}</span>
                    </label>
                    <select
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white"
                    >
                      <option value="FSU Florence Study Center">FSU Florence Study Center (Borgo degli Albizi)</option>
                      <option value="NYU Florence (Villa La Pietra)">NYU Florence (Villa La Pietra)</option>
                      <option value="Syracuse University Florence">Syracuse University Florence (Piazza Savonarola)</option>
                      <option value="Stanford in Florence">Stanford in Florence (Palazzo Capponi)</option>
                      <option value="Marist-Lorenzo de' Medici Institute">LdM Institute (San Lorenzo)</option>
                      <option value="Gonzaga in Florence">Gonzaga in Florence</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-red-500" />
                      <span>Academic Semester</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Spring 2027", "Fall 2027", "Full Year 2027/28"].map((sem) => (
                        <button
                          key={sem}
                          type="button"
                          onClick={() => setSemester(sem)}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                            semester === sem
                              ? "bg-red-50 text-red-600 border-red-300 ring-2 ring-red-500/10"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {sem}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Roommates & Group Pool */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-red-500" />
                        <span>Roommates in Your Group</span>
                      </span>
                      <span className="text-red-600 font-bold">{studentCount} Students</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[2, 3, 4, 5].map((cnt) => (
                        <button
                          key={cnt}
                          type="button"
                          onClick={() => setStudentCount(cnt)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                            studentCount === cnt
                              ? "bg-red-600 text-white border-red-600 shadow-sm"
                              : "border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {cnt} People
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Roommate list preview */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Roommate Group Roster
                    </p>
                    <div className="space-y-1.5">
                      {roommateNames.slice(0, studentCount).map((name, i) => (
                        <div key={i} className="flex items-center justify-between text-xs bg-white px-3 py-1.5 rounded-xl border border-slate-200/60">
                          <span className="font-medium text-slate-800">{name}</span>
                          <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                            Invited ✓
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Budget & Commute preference */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Euro className="w-3.5 h-3.5 text-red-500" />
                        <span>Individual Budget (Per Student / Month)</span>
                      </label>
                      <span className="text-sm font-bold text-red-600">€{budgetPerStudent}/mo</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={1400}
                      step={25}
                      value={budgetPerStudent}
                      onChange={(e) => setBudgetPerStudent(Number(e.target.value))}
                      className="w-full accent-red-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>€500 (Budget)</span>
                      <span>€850 (Standard)</span>
                      <span>€1,400+ (Premium)</span>
                    </div>
                  </div>

                  {/* Pooled Budget Callout */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-red-50 via-rose-50 to-orange-50 border border-red-200/80 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-red-700 uppercase tracking-wider">
                        Total Combined Purchasing Power
                      </p>
                      <p className="text-2xl font-black text-slate-900 mt-0.5">
                        €{totalPooledBudget.toLocaleString()} <span className="text-xs font-normal text-slate-600">/ month for {studentCount} beds</span>
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold shadow-md shadow-red-500/20">
                      α
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>Includes 100% Anti-Scam Verification and Parent Portal access link</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md shadow-red-500/20 flex items-center gap-2 transition-all"
                >
                  <span>{step === 3 ? "Generate Plan with AI" : "Continue"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-4 text-center py-2 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 shadow-inner">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Florence Housing Match Generated!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                We calculated your pooled purchasing power of <strong className="text-slate-900">€{totalPooledBudget}/mo</strong> for <strong className="text-slate-900">{studentCount} students</strong> near <strong className="text-slate-900">{university}</strong>.
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Destination</span>
                  <span className="font-semibold text-slate-900">{city}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Recommended Neighborhood</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Santa Croce & San Frediano (9.3 Safety Score)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Commute Time</span>
                  <span className="font-semibold text-slate-900">12 min scenic walk to campus</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <Link
                  href="/housing"
                  onClick={handleReset}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-500/20"
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Browse Matched Flats</span>
                </Link>
                <Link
                  href="/safety"
                  onClick={handleReset}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>View Safety Audit</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
