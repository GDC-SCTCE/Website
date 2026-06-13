import React from "react";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#131314] flex flex-col">
      <Navbar />
      {/* ── PAGE CONTENT ── */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
