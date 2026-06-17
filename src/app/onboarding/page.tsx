"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/client";
import { syncUserToDatabase } from "@/actions/authActions";
import { checkUserExists } from "@/actions/userActions";

import { XPLevel } from "./types";
import { DEV_TOOLS, YEAR_OPTIONS, XP_LEVELS } from "./constants";

export default function OnboardingPage() {
  const router = useRouter();

  const [isLoginMode, setIsLoginMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [year, setYear] = useState("1st");
  const [selectedTools, setSelectedTools] = useState<string[]>(["Unity"]);
  const [xpLevel, setXpLevel] = useState<XPLevel>("Newbie");
  
  const [submitting, setSubmitting] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push("/dashboard/quests");
      }
    };
    checkUser();
  }, [router]);

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleJoinOrLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError("");
    const trimmedEmail = email.trim();

    // 1. Email check (required for both login and signup)
    if (!trimmedEmail) {
      setAuthError("Please enter your email.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setAuthError("Please enter a valid email address.");
      return;
    }

    // 2. Extra validations for signup mode only
    if (!isLoginMode) {
      const trimmedFullName = fullName.trim();
      const trimmedPhone = phone.trim();
      const trimmedRollNo = rollNo.trim();

      if (!trimmedFullName || !trimmedPhone || !trimmedRollNo) {
        setAuthError("Please fill all required fields.");
        return;
      }

      // Roll Number Validation (Format: SCT22CS001, case-insensitive check but auto-capitalized)
      const rollNoRegex = /^SCT\d{2}[A-Z]{2}\d{3}$/i;
      if (!rollNoRegex.test(trimmedRollNo)) {
        setAuthError("Roll number must follow the format: SCT[Year][Branch][RollNo] (e.g., SCT22CS001).");
        return;
      }

      // Phone Number Validation (10-digit number with optional country code/spacers)
      const phoneRegex = /^(\+?\d{1,4}[- ]?)?\d{10}$/;
      if (!phoneRegex.test(trimmedPhone)) {
        setAuthError("Please enter a valid 10-digit phone number (e.g., +91 9876543210 or 9876543210).");
        return;
      }

      // Development Tools Validation
      if (selectedTools.length === 0) {
        setAuthError("Please select at least one development tool.");
        return;
      }
    }

    setSubmitting(true);
    
    if (isLoginMode) {
      const exists = await checkUserExists(trimmedEmail);
      if (!exists) {
        setAuthError("No account found with this email. Please sign up instead.");
        setSubmitting(false);
        return;
      }
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: trimmedEmail,
    });

    if (error) {
      setAuthError(error.message);
      setSubmitting(false);
    } else {
      setShowOtpModal(true);
      setSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    setAuthError("");
    const supabase = createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: otp,
      type: 'email',
    });

    if (error) {
      setAuthError(error.message);
      setSubmitting(false);
    } else {
      try {
        const userData = isLoginMode ? null : {
          fullName: fullName.trim(),
          phone: phone.trim(),
          rollNo: rollNo.trim(),
          year,
          selectedTools,
          xpLevel
        };
        await syncUserToDatabase(userData);
        router.push("/onboarding/success");
      } catch (err: any) {
        setAuthError(err.message || "Failed to sync user data. If logging in, you may need to sign up first.");
        await supabase.auth.signOut();
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-[#131314] to-[#1C1B1C] text-[#E5E2E3] relative overflow-x-hidden">
      {/* ── Ambient blobs ── */}
      <div className="absolute w-[512px] h-[746px] left-[-136px] top-[79px] bg-[#FFB68B]/3 blur-[60px] rotate-12 pointer-events-none" />
      <div className="absolute w-[640px] h-[622px] left-[870px] top-[242px] bg-[#00DBE9]/3 blur-[75px] -rotate-12 pointer-events-none" />

      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── MAIN ── */}
      <main className="max-w-[1440px] mx-auto px-4 md:px-[64px] pb-[80px]">
        <form onSubmit={handleJoinOrLogin}>
        {/* ── PROGRESS HEADER ── */}
        <div className="text-center pt-[48px] md:pt-[96px] mb-[32px] md:mb-[56px]">
          {/* Phase label */}
          <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#00DBE9] mb-[28px]">
            {isLoginMode ? "PHASE 01 / RECONNECT" : "PHASE 02 / CHARACTER DATA"}
          </p>

          {/* Heading */}
          <h1 className="font-sora font-bold text-[32px] md:text-[48px] leading-[38px] md:leading-[53px] tracking-[-2.4px] uppercase text-[#FFB68B] mb-[24px]">
            {isLoginMode ? "Enter Terminal" : "Initialize Protocol"}
          </h1>

          {/* Progress bar */}
          <div className="inline-block w-[128px] relative mb-[24px]">
            <div className="absolute w-[128px] h-[4px] top-0 left-0 bg-transparent shadow-[0_4px_20px_-5px_rgba(255,182,139,0.6)]" />
            <div className="w-[128px] h-[4px] bg-[#FFB68B]" />
          </div>
        </div>

        {isLoginMode ? (
          <div className="max-w-[420px] mx-auto w-full">
            {/* Credentials Header */}
            <div className="flex items-center gap-[16px] mb-[24px] md:mb-[48px] justify-center">
              <span className="font-sora font-bold text-[36px] md:text-[48px] leading-none tracking-[-0.96px] text-[#353436]">
                03
              </span>
              <span className="font-sora font-bold text-[24px] md:text-[32px] leading-none uppercase text-[#E5E2E3]">
                CREDENTIALS
              </span>
            </div>

            {/* Email input only */}
            <div className="mb-[36px] w-full">
              <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
                EMAIL ADDRESS <span className="text-[#FF7A00] ml-[2px]">*</span>
              </label>
              <div className="border-b border-[#D0D0D0] pb-[13px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jaxen@gmail.com"
                  className="w-full bg-transparent border-none outline-none font-sora font-normal text-[16px] leading-[20px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B]"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-[64px] items-start max-w-[1280px] mx-auto">
            {/* ───── LEFT: BASE STATS ───── */}
            <div>
              <div className="flex items-center gap-[16px] mb-[24px] md:mb-[48px]">
                <span className="font-sora font-bold text-[36px] md:text-[48px] leading-none tracking-[-0.96px] text-[#353436]">
                  03
                </span>
                <span className="font-sora font-bold text-[24px] md:text-[32px] leading-none uppercase text-[#E5E2E3]">
                  BASE STATS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-[36px] w-full">
                <div>
                  <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
                    FULL NAME <span className="text-[#FF7A00] ml-[2px]">*</span>
                  </label>
                  <div className="border-b border-[#D0D0D0] pb-[13px]">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Jaxen Sterling"
                      className="w-full bg-transparent border-none outline-none font-sora font-normal text-[16px] leading-[20px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B]"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
                    EMAIL ADDRESS <span className="text-[#FF7A00] ml-[2px]">*</span>
                  </label>
                  <div className="border-b border-[#D0D0D0] pb-[13px]">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jaxen@gmail.com"
                      className="w-full bg-transparent border-none outline-none font-sora font-normal text-[16px] leading-[20px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B]"
                    />
                  </div>
                </div>
              </div>

              {/* Roll No + Phone Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-[36px] w-full">
                <div>
                  <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
                    ROLL NO. <span className="text-[#FF7A00] ml-[2px]">*</span>
                  </label>
                  <div className="border-b border-[#D0D0D0] pb-[13px]">
                    <input
                      type="text"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value.toUpperCase())}
                      placeholder="SCT22CS001"
                      className="w-full bg-transparent border-none outline-none font-sora font-normal text-[16px] leading-[20px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B] uppercase"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
                    PHONE NUMBER <span className="text-[#FF7A00] ml-[2px]">*</span>
                  </label>
                  <div className="border-b border-[#D0D0D0] pb-[13px]">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full bg-transparent border-none outline-none font-sora font-normal text-[16px] leading-[20px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B]"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Year */}
              <div className="w-full mb-[36px]">
                <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
                  ACADEMIC YEAR
                </label>
                <div className="flex flex-wrap gap-[8px]">
                  {YEAR_OPTIONS.map((y) => {
                    const isActive = year === y;
                    return (
                      <button
                        type="button"
                        key={y}
                        onClick={() => setYear(y)}
                        className={`flex items-center justify-center w-[83.33px] h-[48px] font-mono font-normal text-[10px] leading-[15px] cursor-pointer uppercase transition-all duration-150 border ${isActive ? "bg-[#FF7A00] text-[#522300] border-[#FF7A00]" : "bg-transparent text-[#E5E2E3] border-[#353436] hover:border-[#FFB68B]/50"}`}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ───── RIGHT: LOADOUT ───── */}
            <div>
              {/* Section title */}
              <div className="flex items-center gap-[16px] mb-[24px] md:mb-[48px]">
                <span className="font-sora font-bold text-[36px] md:text-[48px] leading-none tracking-[-0.96px] text-[#353436]">
                  04
                </span>
                <span className="font-sora font-bold text-[24px] md:text-[32px] leading-none uppercase text-[#E5E2E3]">
                  LOADOUT
                </span>
              </div>

              {/* Development Tools */}
              <div className="mb-[56px]">
                <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[28px]">
                  DEVELOPMENT TOOLS
                </p>
                <div className="flex gap-[8px] flex-wrap">
                  {DEV_TOOLS.map((tool) => {
                    const isSelected = selectedTools.includes(tool);
                    return (
                      <button
                        type="button"
                        key={tool}
                        onClick={() => toggleTool(tool)}
                        className={`h-[33px] px-[16px] font-mono font-normal text-[10px] leading-[15px] cursor-pointer transition-all duration-150 ${isSelected ? "bg-[#FFB68B] text-[#522300] border-none shadow-[0_4px_20px_-5px_rgba(255,182,139,0.6)]" : "bg-transparent text-[#E0C0AF] border border-[#353436] hover:border-[#FFB68B]"}`}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* XP Classification */}
              <div>
                <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[28px]">
                  XP CLASSIFICATION
                </p>
                <div className="flex flex-col gap-[12px]">
                  {XP_LEVELS.map((lvl) => {
                    const isSelected = xpLevel === lvl.id;
                    return (
                      <button
                        type="button"
                        key={lvl.id}
                        onClick={() => setXpLevel(lvl.id)}
                        className={`w-full h-[69px] bg-[#1C1B1C] pl-[49px] pr-[17px] py-[17px] text-left cursor-pointer relative box-border transition-colors duration-150 border ${isSelected ? "border-[#FFB68B]" : "border-[#353436] hover:border-[#FFB68B]/50"}`}
                      >
                        {/* Radio circle */}
                        <span className={`absolute left-[17px] top-[26.5px] w-[16px] h-[16px] border-2 border-[#353436] rounded-full inline-block box-border ${isSelected ? "bg-[#FFB68B]" : "bg-transparent"}`} />
                        <p className="font-mono font-normal text-[12px] leading-[18px] text-[#FFB68B] m-0 mb-[2px]">
                          {lvl.label}
                        </p>
                        <p className="font-sora font-normal text-[11px] leading-[16px] text-[#E0C0AF] m-0 truncate">
                          {lvl.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CTA BUTTON ── */}
        <div className={`text-center ${isLoginMode ? "mt-[48px]" : "mt-[96px]"} flex flex-col items-center`}>
          {authError && <p className="text-red-500 font-mono text-[12px] mb-4">{authError}</p>}
          <div className="inline-block relative w-full max-w-[420px]">
            <div className="absolute inset-0 bg-[#FF7A00] blur-[15px] opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-40" />
            <button
              type="submit"
              disabled={submitting}
              className={`relative flex items-center justify-center w-full h-[60px] border border-[#FF7A00] font-mono font-bold text-[14px] tracking-[2px] uppercase transition-all duration-300 ${submitting ? "bg-[#1C1B1C] text-[#A78B7C] opacity-60 cursor-not-allowed border-[#584235]" : "bg-[#FF7A00] text-[#131314] cursor-pointer hover:bg-[#131314] hover:text-[#FF7A00] hover:shadow-[0_0_20px_rgba(255,122,0,0.3)]"}`}
            >
              {submitting ? "INITIALIZING..." : (isLoginMode ? "ENTER THE CLUB" : "JOIN THE COLLECTIVE")}
            </button>
          </div>
          
          <button 
            type="button"
            onClick={() => { setIsLoginMode(!isLoginMode); setAuthError(""); }}
            className="font-mono text-[12px] text-[#E0C0AF] underline hover:text-[#FFB68B] transition-colors bg-transparent border-none cursor-pointer mt-[24px]"
          >
            {isLoginMode ? "Need an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
        </form>
      </main>

      {/* OTP MODAL */}
      {showOtpModal && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handleVerifyOtp} className="bg-[#1C1B1C] border border-[#584235] p-8 max-w-[400px] w-full text-center relative shadow-2xl">
            <h2 className="font-sora font-bold text-[24px] text-[#FFB68B] mb-2 uppercase tracking-tight">Security Checkpoint</h2>
            <p className="font-mono text-[12px] text-[#E0C0AF] mb-6">
              Enter the access code sent to {email}
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="00000000"
              className="w-full bg-[#131314] border border-[#584235] p-4 text-center font-mono text-[24px] text-[#FFB68B] tracking-[8px] outline-none mb-4 focus:border-[#FFB68B]"
            />
            {authError && <p className="text-red-500 mb-4 text-[12px]">{authError}</p>}
            <button
              type="submit"
              disabled={submitting || otp.length !== 8}
              className="w-full h-[48px] bg-[#FF7A00] text-[#522300] font-mono font-bold tracking-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "VERIFYING..." : "VERIFY CODE"}
            </button>
            <button
              type="button"
              onClick={() => setShowOtpModal(false)}
              className="mt-4 text-[12px] text-[#E0C0AF] underline bg-transparent border-none cursor-pointer hover:text-[#FFB68B]"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
