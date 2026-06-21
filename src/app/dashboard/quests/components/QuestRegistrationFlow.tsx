"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Bell, Users } from "lucide-react";
import QRCode from "react-qr-code";
import { Quest } from "@/types";
import { registerForQuest } from "@/actions/userActions";

interface QuestRegistrationFlowProps {
  quest: Quest;
  user: any;
  isUpcoming: boolean;
  onClose: () => void;
  onSuccess: (status: string) => void;
}

export function QuestRegistrationFlow({ quest, user, isUpcoming, onClose, onSuccess }: QuestRegistrationFlowProps) {
  const router = useRouter();
  const [registering, setRegistering] = useState(false);
  const [regError, setRegError] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [upiRef, setUpiRef] = useState("");

  const [teamName, setTeamName] = useState("");
  const [teammates, setTeammates] = useState<string[]>(
    Array(Math.max(0, (quest.minTeamSize || 1) - 1)).fill("")
  );

  const isTeamQuest = (quest.maxTeamSize || 1) > 1;
  const minMates = Math.max(0, (quest.minTeamSize || 1) - 1);
  const maxMates = Math.max(0, (quest.maxTeamSize || 1) - 1);

  const numMembers = 1 + teammates.filter(t => t.trim() !== "").length;
  const totalPrice = quest.price ? quest.price * numMembers : 0;

  const getDynamicUpiLink = (baseLink: string, amount: number) => {
    if (!baseLink) return "";
    let link = baseLink;
    if (!link.includes("am=")) {
      link = link.includes("?") ? `${link}&am=${amount}` : `${link}?am=${amount}`;
    }
    if (!link.includes("cu=")) {
      link = `${link}&cu=INR`;
    }
    return link;
  };

  const dynamicUpiLink = getDynamicUpiLink(quest.upiLink || "", totalPrice);

  const handleRegisterClick = () => {
    if (!user) {
      router.push("/onboarding");
      return;
    }
    if (isTeamQuest && !teamName.trim()) {
      setRegError("Team name is required.");
      return;
    }
    const filledTeammates = teammates.filter(t => t.trim() !== "");
    if (filledTeammates.length < minMates) {
      setRegError(`You must provide at least ${minMates} teammate email(s).`);
      return;
    }

    setRegError("");
    if (quest.price && quest.price > 0) {
      setShowPayment(true);
    } else {
      executeRegistration();
    }
  };

  const executeRegistration = async () => {
    try {
      setRegistering(true);
      setRegError("");
      const finalTeammates = teammates.filter(t => t.trim() !== "");
      // Pass upiRef, teamName, and teammateEmails to server action
      const res = await registerForQuest(quest.id, upiRef, teamName, finalTeammates);
      if (res.success) {
        onSuccess(res.status === "PENDING" ? "PENDING APPROVAL" : "REGISTERED ✓");
        onClose();
      }
    } catch (err: any) {
      setRegError(err.message);
    } finally {
      setRegistering(false);
    }
  };

  const updateTeammate = (idx: number, val: string) => {
    const next = [...teammates];
    next[idx] = val;
    setTeammates(next);
  };

  const addTeammateField = () => {
    if (teammates.length < maxMates) {
      setTeammates([...teammates, ""]);
    }
  };

  const removeTeammateField = (idx: number) => {
    const next = [...teammates];
    next.splice(idx, 1);
    setTeammates(next);
  };

  return (
    <div 
      className="border border-[#FF7A00] p-6 relative mt-4 overflow-hidden"
      style={{ backgroundColor: '#131314', minHeight: isUpcoming ? '150px' : '400px' }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#93000A] via-[#FF7A00] to-[#FDD400]" />

      {isUpcoming ? (
        <>
          <h3 className="font-sora text-[16px] text-[#FFB68B] mb-4">QUEST LOCKED</h3>
          <button
            onClick={() => { 
              if (!user) {
                router.push("/onboarding"); 
              } else {
                alert("Notification enabled! We will notify you when this quest starts.");
              }
            }}
            className="w-full h-[48px] border border-[#FFB68B] flex items-center justify-center gap-2 hover:bg-[#FFB68B]/10 transition-colors"
            style={{ backgroundColor: '#1C1B1C', color: '#FFB68B' }}
          >
            <Bell className="w-4 h-4 text-[#FFB68B]" />
            <span className="font-mono text-[12px] tracking-[1.2px] text-[#FFB68B]">NOTIFY ME</span>
          </button>
        </>
      ) : showPayment ? (
        // PAYMENT FLOW
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-[#584235] pb-4">
            <h3 className="font-sora text-[18px] text-white uppercase flex items-center gap-2">
              PAYMENT REQUIRED
            </h3>
            {totalPrice > 0 && (
              <div className="text-right">
                <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px]">TOTAL FEE (₹{quest.price} × {numMembers})</p>
                <p className="font-mono text-[20px] text-emerald-400 font-bold">₹{totalPrice}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            {dynamicUpiLink ? (
              <div className="flex flex-col items-center">
                <div className="bg-white p-2 mb-2 flex items-center justify-center" style={{ width: 150, height: 150 }}>
                  <QRCode value={dynamicUpiLink} size={134} />
                </div>
                <a href={dynamicUpiLink} className="font-mono text-[10px] text-[#FF7A00] underline hover:text-[#FFB68B] transition-colors">Pay on Mobile</a>
              </div>
            ) : (
              <p className="text-red-400 text-xs font-mono text-center">No UPI link configured.</p>
            )}
            <div>
              <input
                type="text"
                value={upiRef}
                onChange={(e) => setUpiRef(e.target.value)}
                placeholder="Enter UTR / Ref No."
                className="w-full bg-[#1C1B1C] border border-[#584235] p-3 font-mono text-[14px] text-[#E5E2E3] outline-none focus:border-[#FFB68B]"
              />
            </div>
            {regError && <p className="text-red-500 text-[12px] font-mono leading-tight bg-red-500/10 p-3 border border-red-500/30">{regError}</p>}
            <button
              onClick={executeRegistration}
              disabled={registering || !upiRef.trim()}
              className="w-full h-[56px] bg-[#FF7A00] text-[#522300] font-mono font-bold text-[14px] tracking-[2px] disabled:opacity-50 hover:brightness-110 transition-all"
            >
              {registering ? "PROCESSING..." : "REGISTER"}
            </button>
            <button onClick={() => setShowPayment(false)} className="text-[#A78B7C] font-mono text-[10px] hover:text-white underline text-center">Back to Registration</button>
          </div>
        </div>
      ) : (
        // REGISTRATION FLOW
        <div className="flex flex-col gap-6">
          <div className="flex  justify-between items-center border-b border-[#584235] pb-4">
            <h3 className="font-sora text-[18px] text-white uppercase flex items-center gap-2">
              <Users className="w-5 h-5 text-[#FF7A00]" />
              {isTeamQuest ? "TEAM REGISTRATION" : "SOLO REGISTRATION"}
            </h3>
            {totalPrice > 0 && (
              <div className="text-right">
                <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px]">TOTAL FEE (₹{quest.price} × {numMembers})</p>
                <p className="font-mono text-[20px] text-emerald-400 font-bold">₹{totalPrice}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {isTeamQuest && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-[#FFB68B] tracking-[1.2px] mb-2">TEAM NAME</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Awesome Team"
                    className="w-full bg-[#1C1B1C] border border-[#584235] p-3 font-mono text-[14px] text-white outline-none focus:border-[#FFB68B]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block font-mono text-[10px] text-[#FFB68B] tracking-[1.2px]">TEAM MEMBERS (GDC Users)</label>
                    <span className="font-mono text-[10px] text-[#A78B7C]">Min: {quest.minTeamSize || 1} | Max: {quest.maxTeamSize || 1}</span>
                  </div>

                  <div className="flex flex-col gap-2 border border-[#3A2D25]/30 p-2 bg-[#1C1B1C]/40 rounded-sm">
                    {/* Member 1 (Current User) */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[12px] text-[#A78B7C] w-4 text-right">1.</span>
                      <input
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="flex-1 bg-[#1C1B1C] border border-[#3A2D25] p-3 font-mono text-[14px] text-zinc-500 outline-none cursor-not-allowed"
                      />
                    </div>

                    {/* Added Teammates */}
                    {teammates.map((mate, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="font-mono text-[12px] text-[#A78B7C] w-4 text-right">{idx + 2}.</span>
                        <input
                          type="email"
                          value={mate}
                          onChange={(e) => updateTeammate(idx, e.target.value)}
                          placeholder="Teammate Email"
                          className="flex-1 bg-[#1C1B1C] border border-[#584235] p-3 font-mono text-[14px] text-white outline-none focus:border-[#FFB68B]"
                        />
                        {idx >= minMates && (
                          <button onClick={() => removeTeammateField(idx)} className="text-red-500 hover:text-red-400 p-2 transition-colors">
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {teammates.length < maxMates && (
                    <button onClick={addTeammateField} className="mt-3 text-[#FF7A00] font-mono text-[12px] text-left hover:text-[#FFB68B] transition-colors flex items-center gap-1">
                      <span>+</span> ADD ANOTHER MEMBER
                    </button>
                  )}
                </div>
              </div>
            )}

            {regError && <p className="text-red-500 text-[12px] font-mono leading-tight bg-red-500/10 p-3 border border-red-500/30">{regError}</p>}

            <button
              onClick={handleRegisterClick}
              disabled={registering}
              className="w-full h-[56px] bg-[#FF7A00] text-[#522300] font-mono font-bold text-[14px] tracking-[2px] disabled:opacity-50 hover:brightness-110 transition-all mt-4"
            >
              {registering ? "PROCESSING..." : (totalPrice > 0 ? `PAY ₹${totalPrice} & JOIN QUEST` : "ACCEPT QUEST")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
