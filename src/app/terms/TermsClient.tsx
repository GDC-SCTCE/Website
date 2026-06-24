"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Scale, HelpCircle, Trophy, ChevronDown } from "lucide-react";

import { useRouter } from "next/navigation";

interface ProtocolSection {
  id: string;
  num: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function TermsClient() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>("acceptance");

  const handleSectionClick = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const protocols: ProtocolSection[] = [
    {
      id: "acceptance",
      num: "01",
      title: "Acceptance of Terms",
      icon: <Shield className="w-4 h-4" />,
      content: (
        <div className="flex flex-col gap-4 font-sans text-[14px] sm:text-[15px] text-zinc-300 leading-relaxed">
          <p>
            By establishing a connection to the Ignition Collective terminal, registering for GDC Quests, uploading gameplay files to the GDC Arcade, or joining GDC offline sessions, you agree to be bound by this legal protocol.
          </p>
          <div className="border-l-2 border-[#FF7A00] pl-4 py-1.5 my-2">
            <p className="text-[13px] text-[#A78B7C] italic leading-normal">
              If you do not agree to this protocol, you must disconnect from our systems immediately. Continued profile activity constitutes explicit legal consent.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "onboarding",
      num: "02",
      title: "Identity & Integrity",
      icon: <Scale className="w-4 h-4" />,
      content: (
        <div className="flex flex-col gap-4 font-sans text-[14px] sm:text-[15px] text-zinc-300 leading-relaxed">
          <p>
            To participate in GDC Quests, earn scores, and log entries in the leaderboard database, you must complete onboarding. You warrant that all credentials provided match your actual SCTCE campus records.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            <div className="bg-[#0D0D10] border border-[#1b1e26] p-4 rounded-sm">
              <h5 className="font-mono text-[10px] text-[#00f0ff] uppercase tracking-wider mb-1 font-bold">[01] Profile Lock</h5>
              <p className="text-[12px] text-[#A78B7C] leading-normal">
                Your profile token is strictly unique. Sharing dashboard codes or falsifying academic roll numbers violates GDC integrity policies.
              </p>
            </div>
            <div className="bg-[#0D0D10] border border-[#1b1e26] p-4 rounded-sm">
              <h5 className="font-mono text-[10px] text-[#00f0ff] uppercase tracking-wider mb-1 font-bold">[02] Automated entries</h5>
              <p className="text-[12px] text-[#A78B7C] leading-normal">
                Creating bot scripts, multiple fake profiles, or spam registrations will lead to direct IP blocklisting from the collective servers.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "quests",
      num: "03",
      title: "Quest Operations & Leaderboard",
      icon: <Trophy className="w-4 h-4" />,
      content: (
        <div className="flex flex-col gap-4 font-sans text-[14px] sm:text-[15px] text-zinc-300 leading-relaxed">
          <p>
            Quests are club units comprising game design jams, workshops, and lectures. XP points are awarded based on active attendance, milestones achieved, and podium rankings.
          </p>
          <ul className="list-disc list-inside text-[13px] text-[#A78B7C] flex flex-col gap-2 ml-1">
            <li><span className="text-white font-semibold">Team Integrity:</span> All team members must be active, registered GDC users. Entries with false emails are rejected.</li>
            <li><span className="text-white font-semibold">Transaction Proof:</span> Paid quests require a valid 12-digit transaction UTR/Reference number. False receipts trigger score resets.</li>
          </ul>
        </div>
      )
    },
    {
      id: "arcade",
      num: "04",
      title: "Arcade submissions & IP Rights",
      icon: <HelpCircle className="w-4 h-4" />,
      content: (
        <div className="flex flex-col gap-4 font-sans text-[14px] sm:text-[15px] text-zinc-300 leading-relaxed">
          <p>
            All game builds, visual art, audio, and source code files submitted to GDC events remain 100% the intellectual property of their developers.
          </p>
          <p className="text-[13px] text-zinc-400">
            By hosting your build in GDC systems, you grant the club a non-exclusive, royalty-free license to deploy, showcase, and play your builds during workshops, public campus fairs, and promotion cycles.
          </p>
        </div>
      )
    },
    {
      id: "conduct",
      num: "05",
      title: "Community Code of Conduct",
      icon: <Shield className="w-4 h-4" />,
      content: (
        <div className="flex flex-col gap-4 font-sans text-[14px] sm:text-[15px] text-zinc-300 leading-relaxed">
          <p>
            We curate an inclusive space for programmers, designers, writers, and audio artists. Harassment, plagiarizing code/assets without licensing credit, or toxic behaviour across GDC chat servers will result in removal from club channels.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="bg-[#050506] text-[#E5E2E3] min-h-screen py-16 px-4 sm:px-6 md:px-12 lg:px-24 flex flex-col items-center relative overflow-hidden cyber-grid-dots">
      {/* Visual background glows */}
      <div className="absolute top-[-300px] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-[#FF7A00]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-200px] left-[10%] w-[500px] h-[300px] bg-[#00f0ff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[800px] w-full flex flex-col relative z-10">
        
        {/* Navigation back */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[1.5px] text-[#A78B7C] hover:text-[#FFB68B] mb-12 group self-start border border-[#1b1e26] px-4 py-1.5 rounded-sm bg-[#0d0d10]/40 transition-colors duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Terminal
        </button>

        {/* Title */}
        <div className="mb-10 text-center sm:text-left">
          <p className="font-mono text-[11px] font-bold text-[#FF7A00] tracking-[3px] uppercase">GDC SCTCE OPERATIONS</p>
          <h1 className="font-sora font-extrabold text-[36px] sm:text-[48px] text-white leading-tight uppercase mt-2 tracking-[-1.5px]">
            Terms of Service.
          </h1>
          <p className="font-mono text-[11px] text-[#A78B7C] mt-3 uppercase tracking-[1px]">
            Revision: 2026.06.23 // SECURE FEED
          </p>
        </div>

        {/* Accordions Deck wrapper */}
        <div className="flex flex-col gap-3.5">
          {protocols.map((p) => {
            const isExpanded = expandedSection === p.id;

            return (
              <div
                key={p.id}
                className={`bg-[#0C0C0E] border rounded-lg transition-all duration-300 overflow-hidden relative ${
                  isExpanded
                    ? "border-[#FF7A00] shadow-[0_0_15px_rgba(255,107,0,0.08)] bg-[#0f0e0d]"
                    : "border-[#1b1e26] hover:border-[#3A2D25] hover:bg-[#111113]"
                }`}
              >
                {/* Visual side accent bar when expanded */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                    isExpanded ? "bg-[#FF7A00] scale-y-100" : "bg-transparent scale-y-0"
                  }`}
                />

                {/* Header accordion row */}
                <button
                  onClick={() => handleSectionClick(p.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer select-none bg-transparent border-none outline-none relative z-10"
                >
                  <div className="flex items-center gap-4">
                    {/* Index badge */}
                    <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-sm border ${
                      isExpanded 
                        ? "bg-[#FF7A00]/15 text-[#FFB68B] border-[#FF7A00]/30" 
                        : "bg-[#17171B] text-[#A78B7C] border-[#1b1e26]"
                    }`}>
                      {p.num}
                    </span>
                    <span className={`font-sora font-semibold text-[14px] uppercase tracking-wide transition-colors ${
                      isExpanded ? "text-white" : "text-[#E0C0AF] hover:text-white"
                    }`}>
                      {p.title}
                    </span>
                  </div>
                  
                  {/* Chevron/indicator icon */}
                  <ChevronDown className={`w-4 h-4 text-[#A78B7C] transition-transform duration-300 ${
                    isExpanded ? "rotate-180 text-[#FF7A00]" : ""
                  }`} />
                </button>

                {/* Content collapsible wrapper */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-[500px] border-t border-[#1b1e26] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="p-6 sm:p-8 bg-[#070708]/30">
                    {p.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* System Code Footer */}
        <div className="mt-16 text-center">
          <p className="font-mono text-[9px] text-[#3A2D25] tracking-[2px] uppercase">
            © 2026 IGNITION COLLECTIVE • PROTOCOL: GDC-TOS-2026 • PORTAL: ACTIVE
          </p>
        </div>
      </div>
    </div>
  );
}
