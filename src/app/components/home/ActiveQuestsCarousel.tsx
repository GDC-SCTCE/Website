"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Quest } from "@prisma/client";
import GDCPlaceholder from "@/components/GDCPlaceholder";

interface ActiveQuestsCarouselProps {
  activeQuests: Quest[];
  currentQuestIdx: number;
  setCurrentQuestIdx: React.Dispatch<React.SetStateAction<number>>;
  jamVisible: boolean;
}

export default function ActiveQuestsCarousel({
  activeQuests,
  currentQuestIdx,
  setCurrentQuestIdx,
  jamVisible,
}: ActiveQuestsCarouselProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const minSwipeDistance = 50;

  // --- Touch Handlers (Mobile) ---
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // --- Mouse Handlers (Desktop/Laptop) ---
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setTouchEnd(null);
    setTouchStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const onMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    processSwipe();
  };

  const processSwipe = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentQuestIdx((prev) => (prev + 1) % activeQuests.length);
    } else if (isRightSwipe) {
      setCurrentQuestIdx((prev) => (prev - 1 + activeQuests.length) % activeQuests.length);
    }

    // Reset points
    setTouchStart(null);
    setTouchEnd(null);
  };

  // --- Wheel/Trackpad Handlers (Sliding) ---
  const [isWheeling, setIsWheeling] = useState(false);
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

  const onWheel = (e: React.WheelEvent) => {
    if (isWheeling) return;

    // Detect significant scroll
    if (Math.abs(e.deltaX) > 30 || Math.abs(e.deltaY) > 30) {
      if (e.deltaX > 0 || e.deltaY > 0) {
        setCurrentQuestIdx((prev) => (prev + 1) % activeQuests.length);
      } else {
        setCurrentQuestIdx((prev) => (prev - 1 + activeQuests.length) % activeQuests.length);
      }
      setIsWheeling(true);
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        setIsWheeling(false);
      }, 700); // Cooldown matches the CSS transition time
    }
  };

  const currentQuest = activeQuests[currentQuestIdx];

  if (activeQuests.length === 1) {
    return (
      <div key={currentQuest.id} className="animate-slide-right w-full flex flex-col items-center lg:items-end">
        <div className="w-[518.39px] max-w-full h-[699.33px] bg-[#201F20] border-2 border-[#FF7A00]/30 rounded-[8px] relative overflow-hidden shadow-2xl transition-all duration-300 hover:border-[#FF7A00] hover:shadow-[#FF7A00]/10 group/jam-poster">
          <div className="absolute inset-[14px] rounded-[4px] overflow-hidden">
            {currentQuest.image ? (
              <Image
                src={currentQuest.image}
                alt={currentQuest.title}
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                className="object-cover transition-transform duration-[8s] ease-out group-hover/jam-poster:scale-102"
              />
            ) : (
              <div className="w-full h-full bg-[#1A1A1B] flex flex-col items-center justify-center border border-[#584235] relative">
                <GDCPlaceholder textClassName="text-[120px]" />
              </div>
            )}
          </div>
        </div>

        {/* Below poster: labels + progress */}
        <div className="mt-[16px] flex justify-between items-center w-[518.39px] max-w-full px-2">
          <span className="font-mono font-normal text-[11px] leading-[16px] tracking-[1.1px] text-[#E0C0AF]">
            Registrations
          </span>
          <span className="font-mono font-bold text-[11px] leading-[16px] text-[#FF7A00]">
            {currentQuest.seatsTaken} / {currentQuest.capacity}
          </span>
        </div>
        {/* Progress bar */}
        <div className="mt-[8px] w-[502.39px] max-w-full h-[4px] bg-[#584235]/20 rounded-full overflow-hidden mx-auto lg:mx-0">
          <div
            className="h-full bg-[#FF7A00] rounded-full transition-all duration-[1200ms] ease-out"
            style={{ width: jamVisible ? `${Math.min(100, Math.round((currentQuest.seatsTaken / currentQuest.capacity) * 100))}%` : "0%" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center lg:items-end select-none overflow-visible">
      <div
        className="w-full h-[580px] relative flex items-center justify-center overflow-visible touch-pan-y cursor-grab active:cursor-grabbing"
        style={{ perspective: "1200px" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={processSwipe}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpOrLeave}
        onMouseLeave={onMouseUpOrLeave}
        onWheel={onWheel}
      >
        {activeQuests.map((quest, idx) => {
          let offset = idx - currentQuestIdx;
          const total = activeQuests.length;
          if (offset < -total / 2) offset += total;
          if (offset > total / 2) offset -= total;

          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2 || total <= 3;

          if (!isVisible) return null;

          let zIndex = 30 - Math.abs(offset) * 10;
          let opacity = 1;
          if (Math.abs(offset) === 1) opacity = 0.65;
          if (Math.abs(offset) > 1) opacity = 0;

          let translateX = "0px";
          let translateY = "0px";
          let rotateY = "0deg";
          let scale = 1;

          if (offset !== 0) {
            translateX = `${offset * 75}px`;
            translateY = `10px`;
            rotateY = `${offset * -20}deg`;
            scale = 0.82;
          }

          return (
            <div
              key={quest.id}
              onClick={() => setCurrentQuestIdx(idx)}
              className={`absolute w-[360px] sm:w-[400px] max-w-[80vw] h-[500px] sm:h-[540px] bg-[#201F20] border-2 rounded-[8px] overflow-hidden shadow-2xl transition-all duration-700 ease-out cursor-pointer ${
                isActive
                  ? "border-[#FF7A00] shadow-[#FF7A00]/20"
                  : "border-[#FF7A00]/20 hover:border-[#FF7A00]/50 hover:opacity-90"
              }`}
              style={{
                transform: `translateX(${translateX}) translateY(${translateY}) scale(${scale}) rotateY(${rotateY})`,
                zIndex,
                opacity,
                pointerEvents: "auto",
              }}
            >
              <div className="absolute inset-[10px] rounded-[4px] overflow-hidden">
                {quest.image ? (
                  <Image
                    src={quest.image}
                    alt={quest.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-[#1A1A1B] flex flex-col items-center justify-center border border-[#584235] relative">
                    <GDCPlaceholder textClassName="text-[100px]" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot Navigation */}
      <div className="flex items-center gap-3 mt-4 mb-2 justify-center w-full max-w-[400px] lg:mr-[50px]">
        {activeQuests.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentQuestIdx(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 border-none cursor-pointer ${
              currentQuestIdx === idx ? "w-8 bg-[#FF7A00]" : "w-2.5 bg-[#584235]/40 hover:bg-[#FF7A00]/40"
            }`}
            aria-label={`Go to quest ${idx + 1}`}
          />
        ))}
      </div>

      {/* Progress details */}
      <div className="w-full max-w-[400px] lg:mr-[50px] transition-all duration-300">
        <div className="mt-[16px] flex justify-between items-center w-full px-2">
          <span className="font-mono font-normal text-[11px] leading-[16px] tracking-[1.1px] text-[#E0C0AF]">
            Registrations
          </span>
          <span className="font-mono font-bold text-[11px] leading-[16px] text-[#FF7A00]">
            {currentQuest.seatsTaken} / {currentQuest.capacity}
          </span>
        </div>
        <div className="mt-[8px] w-full h-[4px] bg-[#584235]/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF7A00] rounded-full transition-all duration-[800ms] ease-out"
            style={{ width: `${Math.min(100, Math.round((currentQuest.seatsTaken / currentQuest.capacity) * 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
