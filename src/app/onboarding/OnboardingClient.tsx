"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/client";
import { syncUserToDatabase } from "@/actions/authActions";
import { checkUserExists } from "@/actions/userActions";

import { XPLevel } from "@prisma/client";
import OtpModal from "./components/OtpModal";
import LoginFields from "./components/LoginFields";
import SignupFields from "./components/SignupFields";

export default function OnboardingClient() {
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
          <LoginFields email={email} setEmail={setEmail} />
        ) : (
          <SignupFields
            fullName={fullName} setFullName={setFullName}
            email={email} setEmail={setEmail}
            rollNo={rollNo} setRollNo={setRollNo}
            phone={phone} setPhone={setPhone}
            year={year} setYear={setYear}
            selectedTools={selectedTools} toggleTool={toggleTool}
            xpLevel={xpLevel} setXpLevel={setXpLevel}
          />
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

      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        email={email}
        otp={otp}
        setOtp={setOtp}
        submitting={submitting}
        authError={authError}
        onVerify={handleVerifyOtp}
      />
    </div>
  );
}
