"use client";

import { useState } from "react";
import { Check, X, Search, Download, Users } from "lucide-react";
import { approveRegistration, rejectRegistration, updateAttendance } from "@/actions/admin/registrations";
import { RegistrationRowGroup } from "./RegistrationRowGroup";

export default function RegistrationAdminClient({ registrations }: { registrations: any[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const downloadCSV = () => {
    const headers = ["Name", "Email", "Phone", "Status", "Team Name", "Price", "UPI Ref", "Date Registered"];
    const rows = filtered.map(r => [
      `"${r.user.fullName}"`,
      `"${r.user.email}"`,
      `"${r.user.phone}"`,
      `"${r.status}"`,
      `"${r.teamName || 'Solo'}"`,
      r.quest.price || 0,
      `"${r.upiRef || ''}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "registrations.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
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
          
          <button 
            onClick={downloadCSV}
            className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 px-3 h-[36px] font-mono text-[10px] tracking-[1.2px] transition-colors ml-auto"
          >
            <Download className="w-[14px] h-[14px]" /> EXPORT CSV
          </button>
        </div>
      </div>

      <div className="bg-[#1A1A1B] border border-[#584235] overflow-x-auto max-h-[70vh] overflow-y-auto relative">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-[#131314] shadow-[0_1px_0_#584235]">
            <tr>
              <th className="p-4 font-mono text-[10px] text-[#A78B7C] tracking-[1.2px]">USER</th>
              <th className="p-4 font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] border-l border-[#584235]">TEAM / DETAILS</th>
              <th className="p-4 font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] border-l border-[#584235]">PRICE / UPI REF</th>
              <th className="p-4 font-mono text-[10px] text-[#A78B7C] tracking-[1.2px]">STATUS</th>
              <th className="p-4 font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] text-right">ACTIONS</th>
            </tr>
          </thead>
          {Object.entries(
            filtered.reduce((acc: Record<string, any[]>, r: any) => {
              const key = r.teamName ? `TEAM_${r.teamName}` : `SOLO_${r.userId}`;
              if (!acc[key]) acc[key] = [];
              acc[key].push(r);
              return acc;
            }, {})
          ).map(([key, membersRaw]) => (
            <RegistrationRowGroup
              key={key}
              teamKey={key}
              members={membersRaw as any[]}
              loadingId={loadingId}
              setLoadingId={setLoadingId}
              onApprove={approveRegistration}
              onReject={rejectRegistration}
              onUpdateAttendance={updateAttendance}
            />
          ))}
          {filtered.length === 0 && (
            <tbody>
              <tr>
                <td colSpan={5} className="p-8 text-center font-mono text-[12px] text-[#A78B7C]">
                  NO REGISTRATIONS FOUND.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
