"use client";

import AuthForm from "@/app/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <AuthForm type="Login" />
    </div>
  );
}
