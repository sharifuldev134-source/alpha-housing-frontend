"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { PlanModalProvider, usePlanModal } from "./PlanModalContext";

function ShellInner({ children }: { children: React.ReactNode }) {
  const { openPlanModal } = usePlanModal();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 selection:bg-red-500 selection:text-white">
      <Navbar onOpenPlanModal={() => openPlanModal()} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <PlanModalProvider>
      <ShellInner>{children}</ShellInner>
    </PlanModalProvider>
  );
}
