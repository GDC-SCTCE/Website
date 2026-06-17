"use client";

import React, { useRef, useState, useEffect } from "react";
import { updateTeamMember } from "@/actions/adminActions";
import { handleImageUpload } from "@/utils/uploadHelper";
import Avatar from "@/components/Avatar";
import { filters } from "@/constants/members";

export default function TeamForm({ member }: { member: any }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [department, setDepartment] = useState(member.department || "ALL");
  const [stats, setStats] = useState<{label: string, value: number | ""}[]>(() => {
    const s = member.stats || [];
    return [
      { label: s[0]?.label || "STAT 1", value: s[0]?.value ?? 50 },
      { label: s[1]?.label || "STAT 2", value: s[1]?.value ?? 50 },
      { label: s[2]?.label || "STAT 3", value: s[2]?.value ?? 50 }
    ];
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setUploadError("");
    
    const formData = new FormData(e.currentTarget);
    let finalAvatarUrl = member.avatar || "";
    let finalGpImageUrl = member.gamePreview?.image || "";

    // Handle Avatar Image Upload
    const imageFile = formData.get("imageFile") as File;
    if (imageFile && imageFile.size > 0) {
      const newUrl = await handleImageUpload(
        imageFile,
        "team",
        member.name,
        member.avatar || null,
        setUploadError
      );
      if (!newUrl) {
        setLoading(false);
        return;
      }
      finalAvatarUrl = newUrl;
    }

    // Handle Game Preview Image Upload
    if (department === "ALL") {
      const gpImageFile = formData.get("gpImageFile") as File;
      if (gpImageFile && gpImageFile.size > 0) {
        const newGpUrl = await handleImageUpload(
          gpImageFile,
          "team/game",
          `${member.name}_gp`,
          member.gamePreview?.image || null,
          setUploadError
        );
        if (!newGpUrl) {
          setLoading(false);
          return;
        }
        finalGpImageUrl = newGpUrl;
      }
    }

    const newName = formData.get("name") as string;
    const newRole = formData.get("role") as string;

    const changes: any = {};
    
    if (newName !== member.name) changes.name = newName;
    if (newRole !== member.role) changes.role = newRole;
    if (department !== (member.department || "ALL")) changes.department = department;
    
    // finalAvatarUrl is initialized to member.avatar. It only changes if an upload succeeds.
    if (finalAvatarUrl !== (member.avatar || "")) {
      changes.avatar = finalAvatarUrl || null;
    }

    if (department === "ALL") {
      // Compare stats
      const finalStats = stats.map(s => ({
        label: s.label,
        value: s.value === "" ? 0 : s.value
      }));

      if (JSON.stringify(finalStats) !== JSON.stringify(member.stats || [])) {
        changes.stats = finalStats;
      }
      
      // Compare game preview
      const newGpTitle = formData.get("gpTitle") as string;
      const oldGpTitle = member.gamePreview?.title || "";
      const oldGpImage = member.gamePreview?.image || "";
      
      if (newGpTitle !== oldGpTitle || finalGpImageUrl !== oldGpImage) {
        changes.gamePreview = {
          title: newGpTitle,
          image: finalGpImageUrl
        };
      }
    } else {
      // If department changed FROM "ALL" to something else, clear these
      if (member.stats !== null) changes.stats = null;
      if (member.gamePreview !== null) changes.gamePreview = null;
    }

    // Only hit the database if something actually changed!
    if (Object.keys(changes).length > 0) {
      await updateTeamMember(member.id, changes);
      
      // Clear file inputs visually
      const avatarInput = formRef.current?.querySelector('input[name="imageFile"]') as HTMLInputElement;
      if (avatarInput) avatarInput.value = "";
      
      const gpInput = formRef.current?.querySelector('input[name="gpImageFile"]') as HTMLInputElement;
      if (gpInput) gpInput.value = "";
    }
    setLoading(false);
  };


  const handleStatChange = (index: number, field: "label" | "value", val: string | number) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: val };
    setStats(newStats);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Avatar Preview */}
      <div className="flex justify-center mb-2">
        <div className="w-[120px] h-[120px] shrink-0 border border-[#584235] overflow-hidden mix-blend-luminosity relative group">
          {member.avatar ? (
            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <Avatar name={member.name} size={120} />
          )}
        </div>
      </div>
      <div>
        <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">AVATAR IMAGE (Optional - Upload to replace)</label>
        <input name="imageFile" type="file" accept="image/*" className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00] file:bg-[#FF7A00] file:text-[#5C2800] file:border-none file:px-3 file:py-1 file:mr-4 file:font-mono file:text-[10px] file:tracking-[1.2px] hover:file:brightness-110 cursor-pointer" />
      </div>

      <div>
        <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">NAME</label>
        <input name="name" type="text" required defaultValue={member.name} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">ROLE</label>
          <input name="role" type="text" required defaultValue={member.role} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">DEPARTMENT</label>
          <select 
            name="department" 
            value={department} 
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
          >
            {filters.map((f) => (
              <option key={f} value={f}>
                {f === "ALL" ? "ALL (Campus Lead)" : f}
              </option>
            ))}
          </select>
        </div>
      </div>

      {department === "ALL" && (
        <div className="mt-4 border-t border-[#584235] pt-4">
          <h3 className="font-mono text-[#FF7A00] font-bold text-[14px] mb-4">PROFILE SETTINGS</h3>
          
          {/* Stats Config */}
          <div className="mb-6">
            <label className="block font-mono text-[10px] text-[#FFB68B] tracking-[1.2px] mb-2">STAT BARS</label>
            {stats.map((stat, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <input 
                  type="text" 
                  value={stat.label} 
                  onChange={(e) => handleStatChange(i, "label", e.target.value)}
                  placeholder="LABEL (e.g. TECH)"
                  className="flex-1 bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" 
                />
                <input 
                  type="number" 
                  value={stat.value} 
                  onChange={(e) => {
                    const val = e.target.value;
                    handleStatChange(i, "value", val === "" ? "" : parseInt(val, 10));
                  }}
                  placeholder="VALUE (0-100)"
                  min="0" max="100"
                  className="w-1/3 bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" 
                />
              </div>
            ))}
          </div>

          {/* Game Preview Config */}
          <div>
            <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">GAME PREVIEW (Signature Game)</label>
            <div className="bg-[#1C1B1C] border border-[#584235] p-4 flex flex-col gap-4">
              <div>
                <label className="block font-mono text-[10px] text-[#E0C0AF] mb-1">TITLE</label>
                <input name="gpTitle" type="text" defaultValue={member.gamePreview?.title || ""} placeholder="e.g. NEON DRIFT" className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
              </div>
              <div>
                <label className="block font-mono text-[10px] text-[#E0C0AF] mb-1">IMAGE OVERRIDE</label>
                {member.gamePreview?.image && (
                  <div className="mb-2 w-[120px] h-[72px] border border-[#584235]">
                    <img src={member.gamePreview.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <input name="gpImageFile" type="file" accept="image/*" className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00] file:bg-[#FF7A00] file:text-[#5C2800] file:border-none file:px-3 file:py-1 file:mr-4 file:font-mono file:text-[10px] file:tracking-[1.2px] hover:file:brightness-110 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      )}


      {uploadError && (
        <div className="text-red-500 font-mono text-[10px] tracking-[1.2px]">{uploadError}</div>
      )}

      <button type="submit" disabled={loading} className="mt-4 bg-[#FF7A00] text-[#5C2800] font-mono font-bold text-[12px] tracking-[1.2px] p-3 hover:brightness-110 disabled:opacity-50 transition-all">
        {loading ? "TRANSMITTING..." : "SAVE CHANGES"}
      </button>
    </form>
  );
}
