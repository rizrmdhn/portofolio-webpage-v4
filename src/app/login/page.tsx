import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import LoginForm from "@/app/login/login-form";

export default async function LoginPage() {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <LoginForm />
    </div>
  );
}
