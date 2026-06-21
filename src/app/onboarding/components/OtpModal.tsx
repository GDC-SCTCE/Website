import React from "react";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  otp: string;
  setOtp: (val: string) => void;
  submitting: boolean;
  authError: string;
  onVerify: (e: React.FormEvent) => void;
}

export default function OtpModal({
  isOpen,
  onClose,
  email,
  otp,
  setOtp,
  submitting,
  authError,
  onVerify,
}: OtpModalProps) {
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
          className="w-full h-[48px] bg-[#FF7A00] text-[#522300] font-mono font-bold tracking-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "VERIFYING..." : "VERIFY CODE"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 text-[12px] text-[#E0C0AF] underline bg-transparent border-none cursor-pointer hover:text-[#FFB68B]"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
