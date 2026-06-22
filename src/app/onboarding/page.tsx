import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import OnboardingClient from "./OnboardingClient";

export default async function OnboardingPage({ searchParams }: { searchParams: Promise<{ redirect?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const params = await searchParams;
  if (user) {
    redirect(params?.redirect || "/dashboard/quests");
  }

  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#131314]" />}>
      <OnboardingClient />
    </React.Suspense>
  );
}
