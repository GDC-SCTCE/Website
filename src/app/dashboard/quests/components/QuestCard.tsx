"use client";

import React from "react";
import Image from "next/image";
import { useCountdown } from "@/hooks/useCountdown";
import { Bell } from "lucide-react";
import { Quest } from "@/types";
import GDCPlaceholder from "@/components/GDCPlaceholder";
import { registerForQuest } from "@/actions/userActions";

export interface QuestCardProps {
  quest: Quest;
  user: any; // Using any for simplicity as per original
  delay?: number;
  visible?: boolean;
}

export function QuestCard({
  quest,
  user,
  delay = 0,
  visible = true,
}: QuestCardProps) {
  const isUpcoming = quest.status === "UPCOMING";
  const imageAlt = quest.title;
  const targetMs = quest.targetDate ? new Date(quest.targetDate).getTime() : Date.now();
  const seatsTaken = quest.seatsTaken || 0;
  const seatsTotal = quest.capacity || 30;
  const progressPct = seatsTotal > 0 ? (seatsTaken / seatsTotal) * 100 : 0;
  const timer = useCountdown(targetMs);
  const pad = (n: number) => String(n).padStart(2, "0");

  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [upiRef, setUpiRef] = React.useState("");
  const [registering, setRegistering] = React.useState(false);
  const [regError, setRegError] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");

  React.useEffect(() => {
    if (quest.registrations && quest.registrations.length > 0) {
      const regStatus = quest.registrations[0].status;
      if (regStatus === "PENDING") {
        setSuccessMsg("Registration pending admin approval.");
      } else {
        setSuccessMsg("Successfully registered!");
      }
    }
  }, [quest.registrations]);

  const handleRegister = async () => {
    setRegError("");
    setSuccessMsg("");
    if (quest.price && quest.price > 0) {
      setShowPaymentModal(true);
      return;
    }
    await executeRegistration();
  };

  const executeRegistration = async () => {
    try {
      setRegistering(true);
      setRegError("");
      const res = await registerForQuest(quest.id, upiRef);
      if (res.success) {
        setSuccessMsg(res.status === "PENDING" ? "Registration pending admin approval." : "Successfully registered!");
        setShowPaymentModal(false);
      }
    } catch (err: any) {
      setRegError(err.message);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className={`flex flex-col flex-1 bg-gradient-to-b from-[#161618] to-[#131314] border-t border-[#FF7A00] ${isUpcoming ? "opacity-90" : ""} relative`}>
      {/* Image area */}
      <div className="relative mx-4 md:mx-6 mt-4 md:mt-6 h-[200px] md:h-[290px]">
        {quest.image ? (
          <Image
            src={quest.image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#1C1B1C] flex items-center justify-center overflow-hidden">
            <GDCPlaceholder />
          </div>
        )}
        {/* Badge */}
        {isUpcoming ? (
          <div className="absolute top-[16px] left-[16px] flex items-center gap-1.5 px-[13px] h-[25px] bg-[#131314]/80 border border-[#A78B7C] backdrop-blur-[2px] box-border">
            <span className="text-[10px] leading-[15px]">🔒</span>
            <span className="font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF] flex items-center">
              Soon
            </span>
          </div>
        ) : (
          <div className="absolute top-[16px] left-[16px] flex items-center gap-1.5 px-[13px] h-[25px] bg-[#131314]/80 border border-[#FFB68B] backdrop-blur-[2px] box-border">
            <span className="text-[10px] leading-[15px]">⚡</span>
            <span className="font-mono font-normal text-[10px] leading-[15px] text-[#FFB68B] flex items-center">
              Active
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="mx-4 md:mx-6 mt-4 md:mt-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-sora font-normal text-[24px] sm:text-[32px] leading-[36px] sm:leading-[48px] text-[#E5E2E3]">
          {quest.title}
        </h3>

        {/* Date / Location */}
        <p className="mt-1 font-mono font-normal text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#E0C0AF]">
          {quest.dateText} · {quest.location}
        </p>

        {/* Separator */}
        <div className="mt-6 border-t border-[#584235]" />

        {/* Timer + Stats */}
        <div className="flex items-start justify-between mt-4 md:mt-6">
          <div>
            <p className="font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF]">
              {isUpcoming ? "Unlocks In" : "Time Remaining"}
            </p>
            <p className={`mt-1 font-mono font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] ${isUpcoming ? "text-[#E5E2E3]" : "text-[#FFB68B]"}`}>
              {pad(timer.d)}d : {pad(timer.h)}h : {pad(timer.m)}m
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF]">
              {isUpcoming ? "Reservation" : "Seats Available"}
            </p>
            <p className="mt-1 font-mono font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#E5E2E3]">
              {seatsTaken} / {seatsTotal}
            </p>
          </div>
        </div>

        {/* Progress or Divider */}
        {isUpcoming ? (
          <div className="mt-4 h-[2px] bg-[#353436]" />
        ) : (
          <div className="mt-4 relative h-[2px] bg-[#353436]">
            {/* Active fill with gradient */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#93000A] via-[#FF7A00] to-[#FDD400]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        )}

        {user && (
          isUpcoming ? (
            <button className="mt-4 md:mt-6 mb-4 md:mb-6 w-full h-[56px] border-2 border-[#FFB68B] bg-transparent flex items-center justify-center gap-2 transition-colors hover:bg-[#FFB68B]/5 cursor-pointer">
              <Bell className="w-4 h-5 text-[#FFB68B]" />
              <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFB68B]">
                Notify Me
              </span>
            </button>
          ) : (
            <div className="mt-4 md:mt-6 mb-4 md:mb-6 flex flex-col gap-2">
              {regError && <p className="text-red-500 text-[12px] font-mono">{regError}</p>}
              {successMsg && <p className="text-green-500 text-[12px] font-mono">{successMsg}</p>}
              <button 
                onClick={handleRegister}
                disabled={registering || !!successMsg}
                className="w-full h-[48px] bg-[#FF7A00] flex items-center justify-center gap-2 transition-opacity hover:opacity-90 cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#5C2800]">
                  {registering ? "Processing..." : (quest.price && quest.price > 0 ? `Pay ₹${quest.price} & Register` : "Accept Quest →")}
                </span>
              </button>
            </div>
          )
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && quest.price && quest.price > 0 && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#1C1B1C] border border-[#584235] p-8 max-w-[400px] w-full text-center relative shadow-2xl">
            <h2 className="font-sora font-bold text-[24px] text-[#FFB68B] mb-2 uppercase tracking-tight">Payment Required</h2>
            <p className="font-mono text-[12px] text-[#E0C0AF] mb-6">
              Please pay ₹{quest.price} using the QR code below.
            </p>
            
            {quest.upiLink ? (
              <div className="mb-6 flex flex-col items-center">
                <div className="bg-white p-2 rounded mb-4 inline-block">
                  <Image 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(quest.upiLink)}`} 
                    alt="UPI QR Code" 
                    width={200} 
                    height={200}
                    unoptimized 
                  />
                </div>
                <a 
                  href={quest.upiLink} 
                  className="font-mono text-[12px] text-[#FF7A00] underline"
                >
                  Or click here to pay on mobile
                </a>
              </div>
            ) : (
              <p className="text-red-500 mb-6 font-mono text-[12px]">No UPI link configured for this quest.</p>
            )}

            <div className="mb-6 text-left">
              <label className="block font-mono font-bold text-[10px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[8px]">
                TRANSACTION REFERENCE NO.
              </label>
              <input
                type="text"
                value={upiRef}
                onChange={(e) => setUpiRef(e.target.value)}
                placeholder="Enter UTR / Ref No."
                className="w-full bg-[#131314] border border-[#584235] p-3 font-mono text-[14px] text-[#E5E2E3] outline-none focus:border-[#FFB68B]"
              />
            </div>

            {regError && <p className="text-red-500 mb-4 text-[12px]">{regError}</p>}
            
            <button
              onClick={executeRegistration}
              disabled={registering || !upiRef.trim()}
              className="w-full h-[48px] bg-[#FF7A00] text-[#522300] font-mono font-bold tracking-[2px] disabled:opacity-50 disabled:cursor-not-allowed mb-3 border-none"
            >
              {registering ? "SUBMITTING..." : "VERIFY PAYMENT"}
            </button>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="mt-2 text-[12px] text-[#E0C0AF] underline bg-transparent border-none cursor-pointer hover:text-[#FFB68B]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
