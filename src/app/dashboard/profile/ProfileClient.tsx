"use client";

import React, { useState, useEffect } from "react";
import { DEV_TOOLS, YEAR_OPTIONS, XP_LEVELS } from "@/app/onboarding/constants";
import { XPLevel } from "@prisma/client";
import { updateUserProfile } from "@/actions/userActions";


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

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };


  // Generate name initials for Avatar
  const getInitials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "??";
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // 1. Validation
    const trimmedFullName = fullName.trim();
    const trimmedPhone = phone.trim();
    const trimmedRollNo = rollNo.trim();

    if (!trimmedFullName || !trimmedPhone || !trimmedRollNo) {
      setErrorMessage("Base stats cannot be empty.");
      return;
    }

    // Roll Number: e.g. SCT22CS001
    const rollNoRegex = /^SCT\d{2}[A-Z]{2}\d{3}$/i;
    if (!rollNoRegex.test(trimmedRollNo)) {
      setErrorMessage("Roll number must match standard format: SCT[Year][Branch][RollNo] (e.g. SCT22CS001).");
      return;
    }

    // Phone: 10-digit check
    const phoneRegex = /^(\+?\d{1,4}[- ]?)?\d{10}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    // Tools: At least one tool
    if (selectedTools.length === 0) {
      setErrorMessage("Loadout must contain at least one tool.");
      return;
    }

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
          <div
            className="bg-[#1C1B1C] border border-[#201F20] relative p-6 md:p-8 flex flex-col items-center clip-cyber transition-all duration-500 delay-100"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {/* Top orange status light line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF7A00] to-transparent z-20" />

            {/* Locked Badge corner indicator */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 border border-[#353436] px-2 py-0.5 font-mono text-[9px] text-[#E0C0AF] opacity-60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00DBE9]" />
              ONLINE
            </div>

            {/* Avatar block */}
            <div className="w-[120px] h-[120px] relative flex items-center justify-center mb-6 mt-4 group">
              <span className="font-sora font-extrabold text-[48px] leading-none text-[#FFB68B]/80 tracking-[-2px] select-none glow-orange transition-transform duration-300 group-hover:scale-105">
                {getInitials(fullName)}
              </span>
            </div>

            {/* Text Summary */}
            <div className="text-center w-full border-b border-[#201F20] pb-6 mb-6">
              <h2 className="font-sora font-extrabold text-[22px] leading-snug tracking-[-0.5px] uppercase text-[#E5E2E3] m-0 mb-1">
                {fullName || "RECRUIT"}
              </h2>
              <span className="font-mono text-[11px] text-[#00DBE9] uppercase tracking-[1.5px] font-semibold">
                {xpLevel} DIVISION
              </span>
              <p className="font-mono text-[12px] text-[#E0C0AF] opacity-50 m-0 mt-2 truncate">
                {initialUser.email}
              </p>
            </div>

            {/* Static Attribute details */}
            <div className="w-full space-y-4">
              <div className="flex justify-between border-b border-[#201F20]/50 pb-2">
                <span className="font-mono text-[10px] tracking-[1px] text-[#584235] uppercase">ROLL ID</span>
                <span className="font-mono text-[11px] text-[#E5E2E3] uppercase">{rollNo || "PENDING"}</span>
              </div>
              <div className="flex justify-between border-b border-[#201F20]/50 pb-2">
                <span className="font-mono text-[10px] tracking-[1px] text-[#584235] uppercase">CLASS YEAR</span>
                <span className="font-mono text-[11px] text-[#E5E2E3] uppercase">{year || "PENDING"}</span>
              </div>
            </div>

            {/* Character Score Card */}
            <div className="w-full mt-8 bg-[#131314] border border-[#FF7A00]/20 p-5 relative overflow-hidden clip-cyber-sm">
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#FF7A00]/10 to-transparent pointer-events-none" />
              <p className="font-mono font-bold text-[10px] tracking-[1.5px] text-[#584235] uppercase mb-2">
                TOTAL HUB SCORE
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-sora font-extrabold text-[36px] leading-none text-[#FF7A00] tracking-tight glow-orange">
                  {initialUser.score ?? 0}
                </span>
                <span className="font-mono text-[10px] text-[#E0C0AF] opacity-50 uppercase tracking-[1px]">
                  XP PTS
                </span>
              </div>
            </div>

          </div>

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

                  {/* Name Input */}
                  <div>
                    <label className="block font-mono font-bold text-[11px] tracking-[1.2px] text-[#E0C0AF] mb-3 uppercase pl-0.5">
                      Full Name <span className="text-[#FF7A00]">*</span>
                    </label>
                    <div className="border-b border-[#353436] focus-within:border-[#FF7A00] pb-2 transition-colors duration-200">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-transparent border-none outline-none font-sora text-[15px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B]"
                        placeholder="E.g. Jaxen Sterling"
                      />
                    </div>
                  </div>

                  {/* Email Input (Locked) */}
                  <div>
                    <label className="block font-mono font-bold text-[11px] tracking-[1.2px] text-[#E0C0AF] mb-3 uppercase pl-0.5 flex items-center gap-1.5">
                      Email Address 
                      <svg className="w-3.5 h-3.5 text-[#584235]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </label>
                    <div className="border-b border-[#353436]/40 pb-2">
                      <input
                        type="email"
                        value={initialUser.email}
                        disabled
                        className="w-full bg-transparent border-none outline-none font-sora text-[15px] text-[#584235] cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block font-mono font-bold text-[11px] tracking-[1.2px] text-[#E0C0AF] mb-3 uppercase pl-0.5">
                      Phone Number <span className="text-[#FF7A00]">*</span>
                    </label>
                    <div className="border-b border-[#353436] focus-within:border-[#FF7A00] pb-2 transition-colors duration-200">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-transparent border-none outline-none font-sora text-[15px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B]"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  {/* Roll No Input */}
                  <div>
                    <label className="block font-mono font-bold text-[11px] tracking-[1.2px] text-[#E0C0AF] mb-3 uppercase pl-0.5">
                      Roll Number <span className="text-[#FF7A00]">*</span>
                    </label>
                    <div className="border-b border-[#353436] focus-within:border-[#FF7A00] pb-2 transition-colors duration-200">
                      <input
                        type="text"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value.toUpperCase())}
                        className="w-full bg-transparent border-none outline-none font-sora text-[15px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B] uppercase"
                        placeholder="SCT22CS001"
                      />
                    </div>
                  </div>

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

                  {/* Dev Tools Multi-select */}
                  <div>
                    <p className="font-mono font-semibold text-[11px] tracking-[1.2px] text-[#E0C0AF] mb-4 uppercase">
                      DEVELOPMENT TOOLS
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {DEV_TOOLS.map((tool) => {
                        const isSelected = selectedTools.includes(tool);
                        return (
                          <button
                            type="button"
                            key={tool}
                            onClick={() => toggleTool(tool)}
                            className={`h-[30px] px-4 font-mono text-[10px] cursor-pointer transition-all duration-150 ${
                              isSelected
                                ? "bg-[#FFB68B] text-[#522300] border-none shadow-[0_4px_12px_-3px_rgba(255,182,139,0.4)]"
                                : "bg-transparent text-[#E0C0AF] border border-[#353436] hover:border-[#FFB68B]"
                            }`}
                          >
                            {tool}
                          </button>
                        );
                      })}
                    </div>
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
