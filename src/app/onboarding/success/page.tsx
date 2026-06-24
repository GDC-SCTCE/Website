import React from "react";
import { redirect } from "next/navigation";
import { verifyUser } from "@/actions/authActions";
import SuccessClient from "./SuccessClient";

export default async function OnboardingSuccessPage() {
  const dbUser = await verifyUser();

  if (!dbUser) {
    redirect("/onboarding");
  }

  let actualName = "Player";
  if (dbUser.fullName) {
    actualName = dbUser.fullName.split(' ')[0];
  }

  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#131314]" />}>
      <SuccessClient actualName={actualName} />
    </React.Suspense>
  );
}
