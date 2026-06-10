"use client";

import React, { useRef, useState, useEffect } from "react";
import { updateTeamMember } from "@/actions/adminActions";
import { createClient } from "@/utils/supabase/client";
import Avatar from "@/components/Avatar";

export default function TeamForm({ member }: { member: any }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setUploadError("");
    
    const formData = new FormData(e.currentTarget);
    let finalAvatarUrl = member.avatarSeed || "";

    // Handle Image Upload
    const imageFile = formData.get("imageFile") as File;
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop();
      const sanitizedName = member.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const fileName = `${sanitizedName}_${Date.now()}.${fileExt}`;
      
      const supabase = createClient();
      
      // Delete old avatar if it exists in our bucket
      if (member.avatarSeed && member.avatarSeed.includes('/storage/v1/object/public/team/')) {
        const oldFileName = member.avatarSeed.split('/').pop();
        if (oldFileName) {
          await supabase.storage.from("team").remove([oldFileName]);
        }
      }

      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from("team")
        .upload(fileName, imageFile);

      if (uploadErr) {
        setUploadError(`Upload failed: ${uploadErr.message}`);
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("team")
        .getPublicUrl(fileName);
        
      finalAvatarUrl = publicUrlData.publicUrl;
    }

    const data = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      department: formData.get("department") as string || "ALL",
      speciality: formData.get("specialty") ? (formData.get("specialty") as string).split(",").map(s => s.trim()) : [],
      avatarSeed: finalAvatarUrl || null,
    };

    await updateTeamMember(member.id, data);
    setLoading(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Avatar Preview */}
      <div className="flex justify-center mb-2">
        <div className="w-[120px] h-[120px] shrink-0 border border-[#584235] overflow-hidden mix-blend-luminosity">
          {member.avatarSeed && (member.avatarSeed.startsWith('http') || member.avatarSeed.includes('.')) ? (
            <img src={member.avatarSeed} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <Avatar name={member.name} size={120} />
          )}
        </div>
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
          <select name="department" defaultValue={member.department || "ALL"} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]">
            <option value="ALL">ALL</option>
            <option value="DESIGN">DESIGN</option>
            <option value="TECH">TECH</option>
            <option value="MEDIA">MEDIA</option>
            <option value="COMMUNITY">COMMUNITY</option>
            <option value="EVENT">EVENT</option>
            <option value="MARKETING">MARKETING</option>
            <option value="E-SPORTS">E-SPORTS</option>
          </select>
        </div>
      </div>
      {member.isLead && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">SPECIALTY (Comma separated)</label>
            <input name="specialty" type="text" required defaultValue={member.speciality?.join(", ")} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
          </div>
        </div>
      )}
      <div>
        <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">AVATAR IMAGE (Optional - Upload to replace)</label>
        <input name="imageFile" type="file" accept="image/*" className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00] file:bg-[#FF7A00] file:text-[#5C2800] file:border-none file:px-3 file:py-1 file:mr-4 file:font-mono file:text-[10px] file:tracking-[1.2px] hover:file:brightness-110 cursor-pointer" />
      </div>


      {uploadError && (
        <div className="text-red-500 font-mono text-[10px] tracking-[1.2px]">{uploadError}</div>
      )}

      <button type="submit" disabled={loading} className="mt-4 bg-[#FF7A00] text-[#5C2800] font-mono font-bold text-[12px] tracking-[1.2px] p-3 hover:brightness-110 disabled:opacity-50 transition-all">
        {loading ? "TRANSMITTING..." : "SAVE CHANGES"}
      </button>
    </form>
  );
}

