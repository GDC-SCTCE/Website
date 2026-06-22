import React from "react";
import Navbar from "@/components/Navbar";
import FloatingHUD from "@/components/FloatingHUD";
import { verifyAdmin } from "@/actions/authActions";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = await verifyAdmin();

  return (
    <div className="min-h-screen bg-[#131314] flex flex-col relative overflow-x-hidden">
      <Navbar />
      {/* ── PAGE CONTENT ── */}
      <main className="flex-1">
        {children}
      </main>
      {!isAdmin && <FloatingHUD />}
    </div>
  );
}
