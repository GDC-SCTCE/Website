import React, { useState, useEffect } from "react";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  otp: string;
  setOtp: (val: string) => void;
  submitting: boolean;
  resending?: boolean;
  authError: string;
  onVerify: (e: React.FormEvent) => void;
  onResend?: () => void;
}

export default function OtpModal({
  isOpen,
  onClose,
  email,
  otp,
  setOtp,
  submitting,
  resending,
  authError,
  onVerify,
  onResend,
}: OtpModalProps) {
  const [cooldown, setCooldown] = useState(60);

  useEffect(() => {
    if (!isOpen) {
      setCooldown(60);
      return;
    }
    
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, cooldown]);

  const handleResendClick = () => {
    if (onResend) {
      onResend();
      setCooldown(60);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
      <form onSubmit={onVerify} className="bg-[#1C1B1C] border border-[#584235] p-8 max-w-[400px] w-full text-center relative shadow-2xl">
        <h2 className="font-sora font-bold text-[24px] text-[#FFB68B] mb-2 uppercase tracking-tight">Security Checkpoint</h2>
        <p className="font-mono text-[12px] text-[#E0C0AF] mb-6">
          Enter the access code sent to {email}
        </p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="000000"
          className="w-full bg-[#131314] border border-[#584235] p-4 text-center font-mono text-[24px] text-[#FFB68B] tracking-[8px] outline-none mb-4 focus:border-[#FFB68B]"
        />
        {authError && <p className="text-red-500 mb-4 text-[12px]">{authError}</p>}
        <button
          type="submit"
          disabled={submitting || otp.length !== 6}
          className="w-full h-[48px] bg-[#FF7A00] text-[#522300] font-mono font-bold tracking-[2px] disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {submitting ? "VERIFYING..." : "VERIFY CODE"}
        </button>
        
        <div className="flex justify-between items-center mt-2">
          {onResend && (
            <button
              type="button"
              onClick={handleResendClick}
              disabled={submitting || cooldown > 0 || resending}
              className={`text-[12px] bg-transparent border-none font-mono tracking-[1px] transition-colors ${cooldown > 0 || resending ? 'text-[#A78B7C]/50 cursor-not-allowed' : 'text-[#00DBE9] cursor-pointer hover:text-white disabled:opacity-50 hover:underline hover:underline-offset-4'}`}
            >
              {resending ? "RESENDING..." : cooldown > 0 ? `RESEND IN ${cooldown}S` : "RESEND CODE"}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-[12px] text-[#E0C0AF] bg-transparent border-none cursor-pointer hover:text-[#FFB68B] font-mono tracking-[1px] transition-colors hover:underline hover:underline-offset-4 uppercase"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
