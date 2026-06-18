"use client";

import React from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const features = [
  {
    img: "/game_jams.png",
    title: "Game jams and quests",
    desc: "Collaborative sprints where high-speed dev meets narrative depth.",
  },
  {
    img: "/arcade_showcase.png",
    title: "Arcade showcases",
    desc: "Feature your playable builds in our interactive neon-lit virtual lobby.",
  },
  {
    img: "/dev_toolkit.png",
    title: "Dev toolkit access",
    desc: "Proprietary assets and shared libraries for collective innovation.",
  },
];

export default function FeaturesSection() {
  const { ref: featuresRef, inView: featuresVisible } = useInView(0.15);

  return (
    <section
      ref={featuresRef}
      className="max-w-[1280px] mx-auto px-4 md:px-[80px] pb-[96px] md:border-l md:border-r md:border-[#584235]/30"
      id="sprint"
    >
      {/* Header */}
      <div
        className="text-center mb-[48px] pt-[48px] transition-all duration-700 ease-out"
        style={{
          opacity: featuresVisible ? 1 : 0,
          transform: featuresVisible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <p className="font-mono font-semibold text-[12px] tracking-[1.2px] text-[#FFB68B] uppercase mb-[26px]">
          FEATURES
        </p>
        <h2 className="font-sora font-bold text-[clamp(32px,3.33vw,48px)] leading-[53px] tracking-[-0.96px] text-[#E5E2E3] mx-auto mb-[16px] max-w-[672px]">
          Three ways to level up your craft.
        </h2>
        <p className="font-sora font-normal text-[16px] leading-[24px] text-[#E0C0AF] max-w-[672px] mx-auto">
          Give every discipline a forge for growth, collaboration, and high-community activity.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-between gap-[40px] md:gap-[50px] w-full mx-auto">
        {features.map((f, idx) => (
          <div
            key={f.title}
            className="flex flex-col items-center text-center md:items-start md:text-left mx-auto max-w-[340px] transition-all duration-700 ease-out group/feature"
            style={{
              opacity: featuresVisible ? 1 : 0,
              transform: featuresVisible ? "translateY(0)" : "translateY(32px)",
              transitionDelay: `${idx * 150}ms`,
            }}
          >
            {/* Image card */}
            <div className="w-[340px] max-w-full h-[191.25px] bg-[#201F20] border border-[#584235] rounded-[8px] overflow-hidden relative transition-all duration-300 group-hover/feature:border-[#FFB68B]/60 group-hover/feature:shadow-lg group-hover/feature:shadow-[#FFB68B]/5">
              <Image
                src={f.img}
                alt={f.title}
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                className="object-cover transition-transform duration-700 ease-out group-hover/feature:scale-105"
              />
            </div>
            {/* Title */}
            <h3 className="font-sora font-normal text-[24px] leading-[32px] text-[#FFB68B] mt-[24px] mb-[16px] transition-colors duration-300 group-hover/feature:text-white">
              {f.title}
            </h3>
            {/* Desc */}
            <p className="font-sora font-normal text-[16px] leading-[24px] text-[#E0C0AF] mb-[16px] max-w-[322px]">
              {f.desc}
            </p>
            {/* Explore link */}
            <a
              href="#"
              className="inline-flex items-center gap-[8px] font-mono font-semibold text-[12px] tracking-[1.2px] text-[#FF7A00] no-underline hover:text-[#FFB68B] transition-all duration-200 group-hover/feature:translate-x-1"
            >
              Explore <span className="transition-transform duration-200 group-hover/feature:translate-x-1">→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
