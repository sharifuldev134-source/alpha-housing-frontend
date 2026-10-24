"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Check, 
  Users, 
  Wallet, 
  Bed, 
  Bath, 
  AlertCircle, 
  ArrowRight, 
  Pencil, 
  Trash2, 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Home, 
  Building, 
  Sparkles, 
  ArrowLeft,
  CheckCircle2,
  Sliders,
  ChevronDown,
  Compass
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  avatar: string;
  budget: number;
  isLead?: boolean;
}

export default function CreatePlanPage() {
  const router = useRouter();

  // Wizard Step: 1, 2, 3, 4
  const [currentStep, setCurrentStep] = useState<number>(1);

  // STEP 1 STATE: Students
  const [students, setStudents] = useState<Student[]>([
    {
      id: "emma",
      name: "Emma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      budget: 1300,
      isLead: true,
    },
    {
      id: "sophie",
      name: "Sophie",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      budget: 1200,
    },
    {
      id: "olivia",
      name: "Olivia",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
      budget: 1400,
    },
    {
      id: "mia",
      name: "Mia",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80",
      budget: 1300,
    },
  ]);

  // Add / Edit Student Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberBudget, setNewMemberBudget] = useState(1150);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // STEP 2 STATE: Program & Dates
  const [university, setUniversity] = useState("IES Abroad - Florence");
  const [moveInDate, setMoveInDate] = useState("Jan 8, 2027");
  const [moveOutDate, setMoveOutDate] = useState("May 15, 2027");
  const [maxCommute, setMaxCommute] = useState(25);

  // STEP 3 STATE: Preferences
  const [housingType, setHousingType] = useState("Entire apartment");
  const [budgetSlider, setBudgetSlider] = useState(2000);
  const [bedroomsNeeded, setBedroomsNeeded] = useState(4);
  const [bathroomsPreferred, setBathroomsPreferred] = useState("2+");
  const [mustHaves, setMustHaves] = useState<Record<string, boolean>>({
    furnished: true,
    utilities: true,
    shortTerm: true,
    elevator: false,
    washingMachine: false,
    balcony: false,
  });

  // Calculate Group Totals
  const totalPooledBudget = students.reduce((sum, s) => sum + s.budget, 0);

  // Handlers for Step 1
  const handleRemoveStudent = (id: string) => {
    if (students.length <= 2) return;
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleOpenAddModal = () => {
    setEditingStudent(null);
    setNewMemberName("");
    setNewMemberBudget(1150);
    setAddModalOpen(true);
  };

  const handleOpenEditModal = (st: Student) => {
    setEditingStudent(st);
    setNewMemberName(st.name);
    setNewMemberBudget(st.budget);
    setAddModalOpen(true);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    if (editingStudent) {
      setStudents(
        students.map((s) =>
          s.id === editingStudent.id
            ? { ...s, name: newMemberName.trim(), budget: newMemberBudget }
            : s
        )
      );
    } else {
      if (students.length >= 5) return;
      const avatarList = [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      ];
      const newStudent: Student = {
        id: `student-${Date.now()}`,
        name: newMemberName.trim(),
        avatar: avatarList[students.length % avatarList.length],
        budget: newMemberBudget,
      };
      setStudents([...students, newStudent]);
    }

    setAddModalOpen(false);
  };

  const toggleMustHave = (key: string) => {
    setMustHaves((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FDFDFD] text-slate-900 pb-20">
      {/* ------------------------------------------------------------- */}
      {/* STEP PROGRESS BAR (MATCHING SCREENSHOTS) */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full bg-white border-b border-slate-200/80 py-4 sm:py-5 shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          {[
            { step: 1, label: "Group" },
            { step: 2, label: "Program & Dates" },
            { step: 3, label: "Preferences" },
            { step: 4, label: "Review" },
          ].map((item, idx, arr) => {
            const isCompleted = currentStep > item.step;
            const isCurrent = currentStep === item.step;

            return (
              <React.Fragment key={item.step}>
                <div 
                  onClick={() => setCurrentStep(item.step)}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  {isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-[#DC2626] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-6 h-6 rounded-full bg-[#DC2626] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      {item.step}
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center text-xs font-medium">
                      {item.step}
                    </div>
                  )}

                  <span
                    className={`text-xs font-bold transition-colors ${
                      isCurrent
                        ? "text-[#DC2626]"
                        : isCompleted
                        ? "text-slate-800"
                        : "text-slate-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                {idx < arr.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 sm:mx-6 rounded transition-colors ${
                      currentStep > item.step ? "bg-[#DC2626]" : "bg-slate-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STEP 1: CREATE YOUR HOUSING GROUP */}
      {/* ------------------------------------------------------------- */}
      {currentStep === 1 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 w-full">
          <div className="text-center sm:text-left mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create Your Housing Group
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Add 3–5 students so we can find the best options for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Students List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  STUDENTS ({students.length})
                </span>
                <span className="text-[11px] font-semibold text-[#DC2626]">
                  Click any student to adjust budget
                </span>
              </div>

              {/* Student Cards */}
              <div className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 flex items-center justify-between shadow-2xs hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden relative bg-slate-100 ring-2 ring-slate-100 shrink-0">
                        <Image
                          src={student.avatar}
                          alt={student.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-slate-900">
                            {student.name}
                          </span>
                          {student.isLead && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                              Group Lead
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-[#DC2626] mt-0.5">
                          ${student.budget.toLocaleString()} / month
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400">
                      <button
                        onClick={() => handleOpenEditModal(student)}
                        className="p-1.5 hover:text-slate-700 transition-colors"
                        title="Edit student"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      {!student.isLead && (
                        <button
                          onClick={() => handleRemoveStudent(student.id)}
                          className="p-1.5 hover:text-red-600 transition-colors"
                          title="Remove student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Student Button */}
              {students.length < 5 && (
                <button
                  onClick={handleOpenAddModal}
                  className="w-full py-3.5 rounded-2xl border-2 border-dashed border-red-200/90 hover:border-red-300 bg-[#FFF8F8] text-[#DC2626] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Student (3–5 total)</span>
                </button>
              )}
            </div>

            {/* Right: Group Summary Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-5">
                <h3 className="text-base font-bold text-slate-900">
                  Group Summary
                </h3>

                {/* 2x2 Specs Grid matching screenshot */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Students */}
                  <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between min-h-[75px]">
                    <Users className="w-4 h-4 text-[#DC2626]" />
                    <div>
                      <p className="text-xl font-black text-slate-900 leading-none">
                        {students.length}
                      </p>
                      <p className="text-[11px] font-medium text-slate-400 mt-1">
                        Students
                      </p>
                    </div>
                  </div>

                  {/* Combined Monthly Budget */}
                  <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between min-h-[75px]">
                    <Wallet className="w-4 h-4 text-[#10B981]" />
                    <div>
                      <p className="text-xl font-black text-slate-900 leading-none">
                        ${totalPooledBudget.toLocaleString()}
                      </p>
                      <p className="text-[11px] font-medium text-slate-400 mt-1">
                        Combined Monthly Budget
                      </p>
                    </div>
                  </div>

                  {/* Bedrooms Needed */}
                  <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between min-h-[75px]">
                    <Bed className="w-4 h-4 text-[#F97316]" />
                    <div>
                      <p className="text-xl font-black text-slate-900 leading-none">
                        {students.length}
                      </p>
                      <p className="text-[11px] font-medium text-slate-400 mt-1">
                        Bedrooms Needed
                      </p>
                    </div>
                  </div>

                  {/* Bathrooms Preferred */}
                  <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between min-h-[75px]">
                    <Bath className="w-4 h-4 text-[#8B5CF6]" />
                    <div>
                      <p className="text-xl font-black text-slate-900 leading-none">
                        2+
                      </p>
                      <p className="text-[11px] font-medium text-slate-400 mt-1">
                        Bathrooms Preferred
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Note Callout */}
                <div className="p-3.5 rounded-2xl bg-[#FFF6F6] border border-red-100 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#7A1F2D] leading-relaxed">
                    Each student can set their own budget and preferences. The AI advisor balances cost splits automatically.
                  </p>
                </div>

                {/* Next Button */}
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-3.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Next: Program &amp; Dates</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Add / Edit Group Member Modal matching screenshot */}
          {addModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 sm:p-6 w-full max-w-sm animate-in fade-in zoom-in-95 duration-150">
                <h3 className="text-base font-bold text-slate-900">
                  {editingStudent ? "Edit Group Member" : "Add Group Member"}
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
                  Invite your study abroad roommate to set up pooled budget &amp; preferences.
                </p>

                <form onSubmit={handleSaveMember} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      placeholder="e.g. Mia Jenkins"
                      className="w-full px-3.5 py-2 rounded-xl border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm font-medium text-slate-800"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Monthly Budget ($USD)
                    </label>
                    <input
                      type="number"
                      required
                      min={500}
                      max={4000}
                      step={50}
                      value={newMemberBudget}
                      onChange={(e) => setNewMemberBudget(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm font-semibold text-slate-800"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setAddModalOpen(false)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1.5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      {editingStudent ? "Save Changes" : "Add to Group"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STEP 2: STUDY PROGRAM & DATES */}
      {/* ------------------------------------------------------------- */}
      {currentStep === 2 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 w-full">
          {/* Header */}
          <div className="text-center sm:text-left mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#DC2626] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 2 of 4 • University &amp; Location Parameters</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Study Program &amp; Dates
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Where are you attending classes, and when do your classes begin and end?
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            {/* University Select */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                WHERE ARE YOU STUDYING IN FLORENCE?
              </label>
              <div className="relative">
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 appearance-none cursor-pointer"
                >
                  <option value="IES Abroad - Florence">IES Abroad - Florence</option>
                  <option value="FSU Florence Study Center">FSU Florence Study Center</option>
                  <option value="NYU Florence (Villa La Pietra)">NYU Florence (Villa La Pietra)</option>
                  <option value="Syracuse University Florence">Syracuse University Florence</option>
                  <option value="Stanford in Florence">Stanford in Florence</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                We calibrate walking times and bus connections specifically to this campus location.
              </p>
            </div>

            {/* Semester Lease Dates */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                SEMESTER LEASE DATES
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#DC2626] shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">MOVE IN DATE</span>
                    <span className="text-sm font-bold text-slate-800">{moveInDate}</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">MOVE OUT DATE</span>
                    <span className="text-sm font-bold text-slate-800">{moveOutDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Maximum Commute Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  MAXIMUM COMMUTE TO PROGRAM
                </label>
                <span className="px-2.5 py-0.5 rounded-md bg-red-50 text-[#DC2626] text-xs font-bold border border-red-100">
                  {maxCommute} minutes
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={45}
                step={5}
                value={maxCommute}
                onChange={(e) => setMaxCommute(Number(e.target.value))}
                className="w-full accent-[#DC2626] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>10 min (Walk only)</span>
                <span className="font-bold text-slate-700">25 min (Standard)</span>
                <span>45 min (Max)</span>
              </div>
            </div>

            {/* Florence Map Preview Card matching screenshot */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
              <div className="relative h-44 w-full bg-[#E5EEF4] flex items-center justify-center overflow-hidden">
                {/* Styled Map Background */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Concentric distance rings */}
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-red-300/80 absolute" />
                <div className="w-56 h-56 rounded-full border border-red-200/50 absolute" />

                {/* Campus Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-md ring-4 ring-red-100">
                    <MapPin className="w-4 h-4 fill-white" />
                  </div>
                  <div className="mt-1 px-3 py-1 rounded-full bg-slate-900/90 text-white text-[10px] font-bold shadow-md">
                    {university}
                  </div>
                </div>
              </div>

              {/* Commute bar footer */}
              <div className="p-3 bg-white border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-xs">
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  15 min Walk
                </span>
                <span className="inline-flex items-center gap-1.5 text-red-700 font-semibold bg-red-50 px-2.5 py-1 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  15 min Transit
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-semibold bg-slate-100 px-2.5 py-1 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  22 min Drive
                </span>
              </div>
              <p className="text-center text-[10.5px] text-slate-400 py-1.5 bg-slate-50/50">
                Typical commute times from Santa Croce, Duomo &amp; Santo Spirito
              </p>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setCurrentStep(1)}
              className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Group Setup</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="py-2.5 px-6 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5"
            >
              <span>Next: Preferences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STEP 3: GROUP PREFERENCES */}
      {/* ------------------------------------------------------------- */}
      {currentStep === 3 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 w-full">
          {/* Header */}
          <div className="text-center sm:text-left mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#DC2626] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 3 of 4 • Living Style &amp; Non-Negotiables</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Group Preferences
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Choose your group&apos;s preferred property layout, budget thresholds, and must-have amenities.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Housing Type (4 cards) */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                HOUSING TYPE
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "Entire apartment", label: "Entire apartment", icon: Home },
                  { id: "Shared apartment", label: "Shared apartment", icon: Building },
                  { id: "Student residence", label: "Student residence", icon: Bed },
                  { id: "Flexible", label: "Flexible", icon: Sliders },
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = housingType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setHousingType(type.id)}
                      className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        isSelected
                          ? "border-[#DC2626] bg-red-50/20 text-[#DC2626] shadow-2xs font-bold"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? "text-[#DC2626]" : "text-slate-400"}`} />
                      <span className="text-xs">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Range (Per Student / Month) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  BUDGET RANGE (PER STUDENT / MONTH)
                </label>
                <span className="px-2.5 py-0.5 rounded-md bg-red-50 text-[#DC2626] text-xs font-bold border border-red-100">
                  €600 — €2000
                </span>
              </div>
              <input
                type="range"
                min={600}
                max={2500}
                step={50}
                value={budgetSlider}
                onChange={(e) => setBudgetSlider(Number(e.target.value))}
                className="w-full accent-[#DC2626] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>€600</span>
                <span className="font-bold text-[#DC2626]">Max €2000 / student</span>
                <span>€2,000+</span>
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  BEDROOMS NEEDED
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 4, 5].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setBedroomsNeeded(cnt)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                        bedroomsNeeded === cnt
                          ? "bg-[#DC2626] text-white border-[#DC2626] shadow-xs"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {cnt} Bedrooms
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  BATHROOMS PREFERRED
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["1 Baths", "2+ Baths", "3+ Baths"].map((bth) => (
                    <button
                      key={bth}
                      type="button"
                      onClick={() => setBathroomsPreferred(bth)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                        bathroomsPreferred === bth
                          ? "bg-[#DC2626] text-white border-[#DC2626] shadow-xs"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {bth}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Must Haves (2 columns of 3) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  MUST HAVES
                </label>
                <span className="text-[11px] text-slate-400">select up to 3 (3/3)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { key: "furnished", label: "Furnished" },
                  { key: "elevator", label: "Elevator (preferred)" },
                  { key: "utilities", label: "Utilities included" },
                  { key: "washingMachine", label: "In-unit washing machine" },
                  { key: "shortTerm", label: "Allow short-term lease" },
                  { key: "balcony", label: "Outdoor space / balcony" },
                ].map((item) => {
                  const isChecked = mustHaves[item.key];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleMustHave(item.key)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                        isChecked
                          ? "border-red-200 bg-[#FFF8F8] text-slate-900"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{item.label}</span>
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center ${
                          isChecked
                            ? "bg-[#DC2626] text-white"
                            : "border border-slate-300"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setCurrentStep(2)}
              className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Program &amp; Dates</span>
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="py-2.5 px-6 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5"
            >
              <span>Next: Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STEP 4: REVIEW YOUR HOUSING PLAN */}
      {/* ------------------------------------------------------------- */}
      {currentStep === 4 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 w-full">
          {/* Header */}
          <div className="text-center sm:text-left mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#DC2626] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 4 of 4 • Final Confirmation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Review Your Housing Plan
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Everything is set! Confirm your group configuration and proceed to explore verified flats.
            </p>
          </div>

          {/* Review Summary Cards Stack */}
          <div className="space-y-4">
            {/* Card 1: Housing Group */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#DC2626]" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Housing Group ({students.length} Roommates)
                  </h3>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-semibold text-[#DC2626] flex items-center gap-1 hover:underline"
                >
                  <Pencil className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Roommate pills in horizontal row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {students.map((st) => (
                  <div
                    key={st.id}
                    className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0">
                      <Image
                        src={st.avatar}
                        alt={st.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">
                        {st.name}
                      </p>
                      <p className="text-[10.5px] font-bold text-[#DC2626]">
                        ${st.budget}/mo
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Combined Monthly Purchasing Power:</span>
                <span className="text-base font-black text-slate-900">
                  ${totalPooledBudget.toLocaleString()} / month
                </span>
              </div>
            </div>

            {/* Card 2: University & Commute Limits */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#DC2626]" />
                  <h3 className="text-sm font-bold text-slate-900">
                    University &amp; Commute Limits
                  </h3>
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-semibold text-[#DC2626] flex items-center gap-1 hover:underline"
                >
                  <Pencil className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">STUDY PROGRAM</span>
                  <span className="text-xs font-bold text-slate-900 block">{university}</span>
                  <span className="text-[10px] text-slate-500">Florence, Italy</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">SEMESTER LEASE DATES</span>
                  <span className="text-xs font-bold text-slate-900 block">{moveInDate} – {moveOutDate}</span>
                  <span className="text-[10px] text-slate-500">Spring 2027</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">MAX COMMUTE LIMIT</span>
                  <span className="text-xs font-bold text-[#DC2626] flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{maxCommute} minutes walking/transit</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Filtered strictly</span>
                </div>
              </div>
            </div>

            {/* Card 3: Housing Layout & Non-Negotiables */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-[#DC2626]" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Housing Layout &amp; Non-Negotiables
                  </h3>
                </div>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-xs font-semibold text-[#DC2626] flex items-center gap-1 hover:underline"
                >
                  <Pencil className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  {housingType}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  {bedroomsNeeded} Bedrooms
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  {bathroomsPreferred} Bathrooms
                </span>
                <span className="px-3 py-1 rounded-full bg-red-50 text-[#DC2626] text-xs font-bold border border-red-100">
                  €600 – €2000 / student
                </span>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  SELECTED MUST-HAVES
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                    <Check className="w-3 h-3 text-emerald-600" />
                    Furnished
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                    <Check className="w-3 h-3 text-emerald-600" />
                    Utilities included
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                    <Check className="w-3 h-3 text-emerald-600" />
                    Allow short-term lease
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA to View Verified Matching Flats */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setCurrentStep(3)}
              className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Preferences</span>
            </button>
            <Link
              href="/housing"
              className="py-3 px-7 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/30 flex items-center gap-2 transition-all"
            >
              <span>Explore Matching Flats</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
