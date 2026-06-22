"use client";

import React, { useState, useEffect } from "react";
import { YEAR_OPTIONS, XP_LEVELS } from "@/app/onboarding/constants";
import { XPLevel } from "@prisma/client";
import { updateUserProfile } from "@/actions/userActions";
import { validateUserData } from "@/utils/validation";
import ProfileSummaryCard from "./components/ProfileSummaryCard";
import CyberInput from "./components/CyberInput";


interface ProfileClientProps {
  initialUser: {
    id: string;
    email: string;
    phone: string;
    fullName: string;
    rollNo: string;
    academicYear: string;
    tools: string[];
    xpLevel: XPLevel;
    score: number;
  };
}

export default function ProfileClient({ initialUser }: ProfileClientProps) {
  const [mounted, setMounted] = useState(false);

  // Form states initialized with initial mock user
  const [fullName, setFullName] = useState(initialUser.fullName);
  const [phone, setPhone] = useState(initialUser.phone);
  const [rollNo, setRollNo] = useState(initialUser.rollNo);
  const [year, setYear] = useState(initialUser.academicYear);
  const [selectedTools, setSelectedTools] = useState<string[]>(initialUser.tools);
  const [xpLevel, setXpLevel] = useState<XPLevel>(initialUser.xpLevel);

  // Submission/interaction states
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Entrance animation trigger
  useEffect(() => {
    setMounted(true);
  }, []);



  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // 1. Validation
    const validationError = validateUserData({
      fullName,
      phone,
      rollNo,
      selectedTools
    });

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const trimmedFullName = fullName.trim();
    const trimmedPhone = phone.trim();
    const trimmedRollNo = rollNo.trim();

    // 2. Real database submission
    setSubmitting(true);
    updateUserProfile({
      fullName: trimmedFullName,
      phone: trimmedPhone,
      rollNo: trimmedRollNo,
      academicYear: year,
      tools: selectedTools,
      xpLevel,
    })
      .then((res) => {
        if (res.success) {
          setSuccessMessage("CHARACTER DOSSIER SYNCED SUCCESSFULLY!");
        } else {
          setErrorMessage("Failed to sync profile.");
        }
      })
      .catch((err: any) => {
        setErrorMessage(err.message || "An error occurred during submission.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="bg-[#131314] text-[#E5E2E3] min-h-screen relative overflow-hidden">
      {/* ── Ambient Glow Blobs ── */}
      <div className="absolute w-[512px] h-[746px] left-[-136px] top-[79px] bg-[#FFB68B]/3 blur-[60px] rotate-12 pointer-events-none" />
      <div className="absolute w-[640px] h-[622px] left-[870px] top-[242px] bg-[#00DBE9]/3 blur-[75px] -rotate-12 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-8 xl:px-16 pt-[60px] md:pt-[100px] pb-16">
        {/* ── PAGE HEADER ── */}
        <div
          className="transition-all duration-700 mb-12"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <div className="flex items-center gap-0 mb-6">
            <div className="w-[32px] h-[2px] bg-[#FF7A00] mr-[8px]" />
            <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FF7A00] uppercase">
              CHARACTER DOSSIER / SYSTEM
            </span>
          </div>

          <h1 className="font-sora font-extrabold text-[40px] md:text-[80px] leading-[48px] md:leading-[80px] tracking-[-3.2px] uppercase text-[#E5E2E3] m-0">
            MY <span className="text-[#FF7A00]">PROFILE</span>.
          </h1>
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 xl:gap-[64px] items-start">
          
          {/* ───── LEFT SIDEBAR: PROFILE SUMMARY ───── */}
          <ProfileSummaryCard
            fullName={fullName}
            email={initialUser.email}
            rollNo={rollNo}
            year={year}
            xpLevel={xpLevel}
            score={initialUser.score}
            mounted={mounted}
          />

          {/* ───── RIGHT FORM EDITING AREA ───── */}
          <div
            className="space-y-8 transition-all duration-500 delay-200"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <form onSubmit={handleSaveProfile} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#1C1B1C] border border-[#201F20] p-6 md:p-8 clip-cyber relative">
                {/* Top cyan status line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00DBE9] to-transparent z-20" />

                {/* Left Column: Form inputs */}
                <div className="space-y-6">
                  {/* Title */}
                  <div className="flex items-center gap-[12px] mb-4">
                    <span className="font-sora font-bold text-[24px] leading-none text-[#353436]">01</span>
                    <span className="font-sora font-bold text-[18px] uppercase tracking-tight text-[#E5E2E3]">
                      BASE STATS
                    </span>
                  </div>

                  <CyberInput
                    label="Full Name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g. Jaxen Sterling"
                  />

                  <CyberInput
                    label="Email Address"
                    disabled
                    value={initialUser.email}
                    icon={
                      <svg className="w-3.5 h-3.5 text-[#584235]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    }
                  />

                  <CyberInput
                    label="Phone Number"
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                  />

                  <CyberInput
                    label="Roll Number"
                    required
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value.toUpperCase())}
                    placeholder="SCT22CS001"
                    className="uppercase"
                  />

                  {/* Academic Year Group */}
                  <div>
                    <label className="block font-mono font-bold text-[11px] tracking-[1.2px] text-[#E0C0AF] mb-3 uppercase pl-0.5">
                      Academic Year
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {YEAR_OPTIONS.map((y) => {
                        const isActive = year === y;
                        return (
                          <button
                            type="button"
                            key={y}
                            onClick={() => setYear(y)}
                            className={`flex items-center justify-center w-[65px] h-[38px] font-mono text-[10px] cursor-pointer uppercase transition-all duration-150 border ${
                              isActive
                                ? "bg-[#FF7A00] text-[#522300] border-[#FF7A00]"
                                : "bg-transparent text-[#E5E2E3] border-[#353436] hover:border-[#FFB68B]/50"
                            }`}
                          >
                            {y}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Column: Loadout controls */}
                <div className="space-y-6">
                  {/* Title */}
                  <div className="flex items-center gap-[12px] mb-4">
                    <span className="font-sora font-bold text-[24px] leading-none text-[#353436]">02</span>
                    <span className="font-sora font-bold text-[18px] uppercase tracking-tight text-[#E5E2E3]">
                      LOADOUT
                    </span>
                  </div>

                  {/* Dev Tools display (static loadout list) */}
                  <div>
                    <p className="font-mono font-semibold text-[11px] tracking-[1.2px] text-[#E0C0AF] mb-4 uppercase">
                      DEVELOPMENT TOOLS
                    </p>
                    {selectedTools.length > 0 ? (
                      <div className="flex gap-2 flex-wrap">
                        {selectedTools.map((tool) => (
                          <div
                            key={tool}
                            className="h-[30px] px-4 flex items-center justify-center font-mono text-[10px] bg-[#FFB68B] text-[#522300] shadow-[0_4px_12px_-3px_rgba(255,182,139,0.4)]"
                          >
                            {tool}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="font-mono text-[11px] text-[#584235] uppercase pl-0.5 leading-relaxed">
                        No tools equipped. Visit the inventory tab to manage your loadout.
                      </p>
                    )}
                  </div>

                  {/* XP Levels Radio List */}
                  <div>
                    <p className="font-mono font-semibold text-[11px] tracking-[1.2px] text-[#E0C0AF] mb-4 uppercase">
                      XP CLASSIFICATION
                    </p>
                    <div className="flex flex-col gap-3">
                      {XP_LEVELS.map((lvl) => {
                        const isSelected = xpLevel === lvl.id;
                        return (
                          <button
                            type="button" // type is button, avoiding forms submitting on radio click
                            onClick={() => setXpLevel(lvl.id as XPLevel)}
                            key={lvl.id}
                            className={`w-full p-4 text-left cursor-pointer relative transition-all duration-150 border bg-[#131314]/30 ${
                              isSelected ? "border-[#FFB68B]" : "border-[#353436] hover:border-[#FFB68B]/40"
                            }`}
                          >
                            {/* Bullet dot indicator */}
                            <span
                              className={`absolute left-4 top-[24px] w-3.5 h-3.5 border border-[#353436] rounded-full flex items-center justify-center ${
                                isSelected ? "border-[#FFB68B]" : "border-[#353436]"
                              }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FFB68B]" />}
                            </span>

                            <div className="pl-7">
                              <p className="font-mono font-bold text-[12px] text-[#FFB68B] m-0 mb-1">
                                {lvl.label}
                              </p>
                              <p className="font-sans font-normal text-[11px] leading-[1.4] text-[#E0C0AF] opacity-80 m-0">
                                {lvl.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── ACTION FOOTER / SAVE BUTTON ── */}
              <div className="flex flex-col items-center">
                {errorMessage && (
                  <p className="text-red-500 font-mono text-[12px] mb-4 glow-orange">
                    ⚠️ {errorMessage}
                  </p>
                )}

                {successMessage && (
                  <p className="text-[#00DBE9] font-mono text-[12px] mb-4 uppercase tracking-[1px] glow-blue">
                    ✅ {successMessage}
                  </p>
                )}

                <div className="w-full relative">
                  <div className="absolute inset-0 bg-[#FF7A00] blur-[15px] opacity-10 pointer-events-none transition-opacity duration-300 hover:opacity-30" />
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`relative flex items-center justify-center w-full h-[55px] border border-[#FF7A00] font-mono font-bold text-[13px] tracking-[2px] uppercase transition-all duration-300 ${
                      submitting
                        ? "bg-[#1C1B1C] text-[#A78B7C] opacity-60 cursor-not-allowed border-[#584235]"
                        : "bg-[#FF7A00] text-[#131314] cursor-pointer hover:bg-[#131314] hover:text-[#FF7A00] hover:shadow-[0_0_20px_rgba(255,122,0,0.35)]"
                    }`}
                  >
                    {submitting ? "SYNCING INTERFACE TRANSMISSION..." : "SYNC DOSSIER TO DATABASE"}
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
