import React from "react";
import Navbar from "@/components/Navbar";
import FloatingHUD from "@/components/FloatingHUD";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#131314] flex flex-col relative">
      <Navbar />
      {/* ── PAGE CONTENT ── */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
      <FloatingHUD />
    </div>
  );
}
