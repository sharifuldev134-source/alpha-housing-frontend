import React, { Suspense } from "react";
import AuthPortal from "../components/AuthPortal";

export const metadata = {
  title: "Sign Up | Alpha Housing Florence",
  description: "Register your student account with university email and OTP verification.",
};

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-400">Loading Alpha Sign Up...</div>}>
      <AuthPortal initialMode="signup" />
    </Suspense>
  );
}
