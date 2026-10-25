import React, { Suspense } from "react";
import AuthPortal from "../components/AuthPortal";

export const metadata = {
  title: "Login | Alpha Housing Florence",
  description: "Log in to your student or parent portal account.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-400">Loading Alpha Login...</div>}>
      <AuthPortal initialMode="login" />
    </Suspense>
  );
}
