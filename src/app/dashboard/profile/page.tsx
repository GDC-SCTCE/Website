import React from "react";
import ProfileClient from "@/app/dashboard/profile/ProfileClient";
import { verifyUser } from "@/actions/authActions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await verifyUser();
  
  if (!user) {
    redirect("/onboarding");
  }

  return (
    <ProfileClient initialUser={user} />
  );
}
