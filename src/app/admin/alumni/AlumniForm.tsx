"use client";

import React, { useRef, useState } from "react";
import { createAlumni, updateAlumni } from "@/actions/admin/alumni";
import { handleImageUpload } from "@/utils/uploadHelper";
import Avatar from "@/components/Avatar";

export default function AlumniForm({ alumnus, onComplete }: { alumnus?: any, onComplete?: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setUploadError("");
    
    const formData = new FormData(e.currentTarget);
    let finalAvatarUrl = alumnus?.avatar || "";

    // Handle Image Upload
    const imageFile = formData.get("imageFile") as File;
    if (imageFile && imageFile.size > 0) {
      const name = formData.get("name") as string || "alumni";
      const fileName = `${name.replace(/\s+/g, '_')}_${Date.now()}`;
      const newUrl = await handleImageUpload(
        imageFile,
        "alumni", // bucket name
        fileName,
        finalAvatarUrl,
        setUploadError
      );
      if (!newUrl) {
        setLoading(false);
        return;
      }
      finalAvatarUrl = newUrl;
    }

    const data = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      company: formData.get("company") as string,
      companyLink: formData.get("companyLink") as string,
      avatar: finalAvatarUrl || "",
    };

    if (alumnus?.id) {
      await updateAlumni(alumnus.id, data);
    } else {
      await createAlumni(data);
      formRef.current?.reset();
    }
    
    if (onComplete) onComplete();
    setLoading(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Avatar Image */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-center mb-2">
          <div className="w-[120px] h-[120px] shrink-0 border border-[#584235] overflow-hidden bg-[#1A1A1B] flex items-center justify-center text-[#A78B7C]">
            {alumnus?.avatar ? (
              <img src={alumnus.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <Avatar name={alumnus?.name || "?"} size={120} />
            )}
          </div>
        </div>
        <label className="block font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] uppercase">
          AVATAR IMAGE (Optional - Upload to replace)
        </label>
        <input 
          name="imageFile" 
          type="file" 
          accept="image/*"
          className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00] file:bg-[#FF7A00] file:text-[#5C2800] file:border-none file:px-3 file:py-1 file:mr-4 file:font-mono file:text-[10px] file:tracking-[1.2px] hover:file:brightness-110 cursor-pointer"
        />
        {uploadError && <p className="text-red-500 font-mono text-[10px]">{uploadError}</p>}
      </div>

      {/* Name */}
      <div>
        <label className="block font-mono text-[10px] text-[#A78B7C] mb-2 tracking-[1.2px] uppercase">
          Full Name
        </label>
        <input 
          name="name" 
          defaultValue={alumnus?.name} 
          required
          className="w-full bg-[#131314] border border-[#584235] p-3 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
        />
      </div>

      {/* Role */}
      <div>
        <label className="block font-mono text-[10px] text-[#A78B7C] mb-2 tracking-[1.2px] uppercase">
          Role (e.g., FOUNDER)
        </label>
        <input 
          name="role" 
          defaultValue={alumnus?.role} 
          required
          className="w-full bg-[#131314] border border-[#584235] p-3 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
        />
      </div>

      {/* Company */}
      <div>
        <label className="block font-mono text-[10px] text-[#A78B7C] mb-2 tracking-[1.2px] uppercase">
          Company
        </label>
        <input 
          name="company" 
          defaultValue={alumnus?.company} 
          required
          className="w-full bg-[#131314] border border-[#584235] p-3 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
        />
      </div>

      {/* Company Link */}
      <div>
        <label className="block font-mono text-[10px] text-[#A78B7C] mb-2 tracking-[1.2px] uppercase">
          Company Link (Optional)
        </label>
        <input 
          name="companyLink" 
          type="url"
          defaultValue={alumnus?.companyLink || ""} 
          className="w-full bg-[#131314] border border-[#584235] p-3 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={loading}
        className="bg-[#FF7A00] text-[#5C2800] font-mono font-bold text-[12px] tracking-[1.2px] p-3 hover:brightness-110 disabled:opacity-50 transition-all mt-4 uppercase"
      >
        {loading ? "SAVING..." : (alumnus ? "UPDATE LEGEND" : "CREATE LEGEND")}
      </button>
    </form>
  );
}
