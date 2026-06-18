"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { Quest } from "@prisma/client";

import SplashOverlay from "./components/home/SplashOverlay";
import HeroSection from "./components/home/HeroSection";
import FeaturesSection from "./components/home/FeaturesSection";
import StatsSection from "./components/home/StatsSection";
import CommunitySection from "./components/home/CommunitySection";
import ActiveQuestsSection from "./components/home/ActiveQuestsSection";

export default function HomeClient({ activeQuests }: { activeQuests: Quest[] }) {
  return (
    <div className="bg-[#131314] text-[#E5E2E3] min-h-screen">
      <SplashOverlay />
      <Navbar />

      <main className="overflow-x-hidden">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CommunitySection />
        <ActiveQuestsSection activeQuests={activeQuests} />
      </main>
    </div>
  );
}
