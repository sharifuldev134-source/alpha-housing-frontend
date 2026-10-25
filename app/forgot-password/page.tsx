import React, { Suspense } from "react";
import AuthPortal from "../components/AuthPortal";

export const metadata = {
  title: "Reset Password | Alpha Housing Florence",
  description: "Reset your student or parent account password via secure OTP verification.",
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-400">Loading Password Recovery...</div>}>
      <AuthPortal initialMode="forgot" />
    </Suspense>
  );
}
