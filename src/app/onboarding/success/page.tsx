import React from "react";
import { redirect } from "next/navigation";
import { verifyUser } from "@/actions/authActions";
import { createClient } from "@/utils/supabase/server";
import SuccessClient from "./SuccessClient";

export default async function OnboardingSuccessPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/onboarding");
  }

  const dbUser = await verifyUser();
  
  let actualName = "Player";
  if (dbUser && typeof dbUser !== 'boolean' && dbUser.fullName) {
    actualName = dbUser.fullName.split(' ')[0];
  } else if (user.email) {
    actualName = user.email.split('@')[0];
  }

  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#131314]" />}>
      <SuccessClient actualName={actualName} />
    </React.Suspense>
  );
}
