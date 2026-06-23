"use client";

import React, { useState } from "react";
import TeamForm from "./TeamForm";
import Avatar from "@/components/Avatar";
import DepartmentFilter from "@/components/DepartmentFilter";
import { Department } from "@/types";

export default function TeamAdminClient({ members }: { members: any[] }) {
  // Select the first member initially, which should be Campus Lead due to createdAt asc sorting
  const [selectedMember, setSelectedMember] = useState(members[0] || null);
  const [activeFilter, setActiveFilter] = useState<Department>("ALL");

  React.useEffect(() => {
    if (selectedMember) {
      const updated = members.find(m => m.id === selectedMember.id);
      if (updated) setSelectedMember(updated);
    } else {
      setSelectedMember(members[0] || null);
    }
  }, [members]);

  const filteredMembers = activeFilter === "ALL" ? members : members.filter(m => m.department === activeFilter);

  return (
    <div className="flex flex-col gap-6">
      <DepartmentFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cards List (Left side, col-span-2) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {filteredMembers.map((member, index) => (
          <div 
            key={member.id} 
            onClick={() => setSelectedMember(member)}
            className={`bg-[#1A1A1B] border ${selectedMember?.id === member.id ? 'border-[#FF7A00]' : 'border-[#584235] hover:border-[#FF7A00]/50'} p-4 flex gap-4 cursor-pointer transition-colors items-center`}
          >
            {/* Avatar / Photo */}
            <div className="w-[64px] h-[64px] shrink-0 border border-[#584235] overflow-hidden transition-all">
              {member.avatar ? (
                 <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <Avatar name={member.name} size={64} />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col gap-1 overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0 w-full">
                <h3 className="font-sora font-bold text-[18px] text-[#FFB68B] truncate w-full sm:w-auto">
                  {member.name}
                </h3>
                <span className="font-mono text-[10px] bg-[#584235] text-[#FFB68B] px-2 py-1 rounded-sm shrink-0">
                  {member.role}
                </span>
              </div>
            </div>
          </div>
        ))}
        {filteredMembers.length === 0 && (
          <div className="text-center font-mono text-[12px] text-[#A78B7C] p-8 border border-dashed border-[#584235]">
            NO TEAM MEMBERS FOUND IN THIS DEPARTMENT.
          </div>
        )}
      </div>

      {/* Edit Form (Right side, col-span-1) */}
      <div className="lg:col-span-1 bg-[#1A1A1B] border border-[#584235] p-6 h-fit sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <h2 className="font-sora font-bold text-[20px] text-white mb-6">EDIT MEMBER</h2>
        {selectedMember ? (
          <TeamForm key={`${selectedMember.id}-${selectedMember.updatedAt}`} member={selectedMember} />
        ) : (
          <p className="text-white font-mono text-[12px]">NO MEMBERS FOUND.</p>
        )}
      </div>
    </div>
    </div>
  );
}
