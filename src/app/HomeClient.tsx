"use client";

import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Quest } from "@prisma/client";

import SplashOverlay from "./components/home/SplashOverlay";
import HeroSection from "./components/home/HeroSection";
import FeaturesSection from "./components/home/FeaturesSection";
import StatsSection from "./components/home/StatsSection";
import CommunitySection from "./components/home/CommunitySection";
import ActiveQuestsSection from "./components/home/ActiveQuestsSection";

export default function HomeClient({ activeQuestsPromise }: { activeQuestsPromise: Promise<Quest[]> }) {
  return (
    <div className="bg-[#131314] text-[#E5E2E3] min-h-screen">
      <SplashOverlay />
      <Navbar />

      <main className="overflow-x-hidden">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CommunitySection />
        <Suspense fallback={<div className="bg-[#1C1B1C] border-b border-[#584235]/30 py-[96px] h-[600px] w-full animate-pulse" />}>
          <ActiveQuestsSection activeQuestsPromise={activeQuestsPromise} />
        </Suspense>
      </main>
    </div>
  );
}
