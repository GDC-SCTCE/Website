"use client";

import React, { useState } from "react";
import { Check, X, Search } from "lucide-react";
import { approveRegistration, rejectRegistration } from "@/actions/adminActions";

export default function RegistrationAdminClient({ registrations }: { registrations: any[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleApprove = async (userId: string, questId: string) => {
    setLoadingId(`${userId}-${questId}`);
    try {
      await approveRegistration(userId, questId);
    } catch (err) {
      console.error(err);
      alert("Failed to approve");
    }
    setLoadingId(null);
  };

  const handleReject = async (userId: string, questId: string) => {
    if (!window.confirm("Are you sure you want to reject this registration?")) return;
    setLoadingId(`${userId}-${questId}`);
    try {
      await rejectRegistration(userId, questId);
    } catch (err) {
      console.error(err);
      alert("Failed to reject");
    }
    setLoadingId(null);
  };

  const filtered = registrations.filter((r) => {
    const matchesSearch = r.user.fullName.toLowerCase().includes(search.toLowerCase()) || 
                          (r.upiRef && r.upiRef.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[#1A1A1B] border border-[#584235] p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A78B7C]">
            <Search className="w-[14px] h-[14px]" />
          </div>
          <input
            type="text"
            placeholder="Search by user, quest, or UPI ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[36px] bg-[#131314] border border-[#584235] pl-9 pr-4 font-mono text-[12px] text-white outline-none focus:border-[#FF7A00] transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px]">STATUS:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#131314] border border-[#584235] h-[36px] px-2 text-[#FFB68B] font-mono text-[12px] outline-none focus:border-[#FF7A00] min-w-[120px]"
            >
              <option value="ALL">ALL</option>
              <option value="PENDING">PENDING</option>
              <option value="REGISTERED">REGISTERED</option>
              <option value="ATTENDED">ATTENDED</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1B] border border-[#584235] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#584235] bg-[#131314]">
              <th className="p-4 font-mono text-[10px] text-[#A78B7C] tracking-[1.2px]">USER</th>
              <th className="p-4 font-mono text-[10px] text-[#A78B7C] tracking-[1.2px]">PRICE / UPI REF</th>
              <th className="p-4 font-mono text-[10px] text-[#A78B7C] tracking-[1.2px]">STATUS</th>
              <th className="p-4 font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={`${r.userId}-${r.questId}`} className="border-b border-[#584235]/50 hover:bg-[#1C1B1C] transition-colors">
                <td className="p-4">
                  <p className="font-sora font-bold text-[14px] text-[#FFB68B]">{r.user.fullName}</p>
                  <p className="font-mono text-[10px] text-[#A78B7C] mt-1">{r.user.email} • {r.user.phone || 'No phone'}</p>
                </td>
                <td className="p-4">
                  <p className="font-mono text-[12px] text-[#FF7A00]">₹{r.quest.price || 0}</p>
                  <p className="font-mono text-[10px] text-[#E0C0AF] mt-1">{r.upiRef || 'N/A'}</p>
                </td>
                <td className="p-4">
                  <span className={`font-mono text-[10px] px-2 py-1 rounded-sm border ${
                    r.status === 'REGISTERED' || r.status === 'ATTENDED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    r.status === 'PENDING' ? 'bg-[#FF7A00]/10 text-[#FF7A00] border-[#FF7A00]/20' :
                    'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {r.status === "PENDING" && (
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleApprove(r.userId, r.questId)}
                        disabled={loadingId === `${r.userId}-${r.questId}`}
                        className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 p-2 hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
                        title="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleReject(r.userId, r.questId)}
                        disabled={loadingId === `${r.userId}-${r.questId}`}
                        className="bg-red-500/10 text-red-500 border border-red-500/20 p-2 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        title="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center font-mono text-[12px] text-[#A78B7C]">
                  NO REGISTRATIONS FOUND.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
