import React, { Suspense } from "react";
import AuthPortal from "../components/AuthPortal";

export const metadata = {
  title: "Authentication | Alpha Housing Florence",
  description: "Secure login, sign up, and account verification for foreign university students and parents.",
};

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-400">Loading Alpha Authentication...</div>}>
      <AuthPortal />
    </Suspense>
  );
}
