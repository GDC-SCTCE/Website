"use client";

import React, { useRef, useState } from "react";
import { createTool, updateTool } from "@/actions/admin/tools";
import { handleImageUpload } from "@/utils/uploadHelper";
import GDCPlaceholder from "@/components/GDCPlaceholder";

export default function ToolForm({ tool, onComplete }: { tool?: any, onComplete?: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setUploadError("");
    
    const formData = new FormData(e.currentTarget);
    let finalIconUrl = tool?.iconUrl || "";

    // Handle Image Upload
    const imageFile = formData.get("imageFile") as File;
    if (imageFile && imageFile.size > 0) {
      const toolName = formData.get("name") as string || "tool";
      const fileName = `${toolName.replace(/\s+/g, '_')}_${Date.now()}`;
      const newUrl = await handleImageUpload(
        imageFile,
        "tools",
        fileName,
        finalIconUrl,
        setUploadError
      );
      if (!newUrl) {
        setLoading(false);
        return;
      }
      finalIconUrl = newUrl;
    }

    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      rating: parseInt(formData.get("rating") as string) || 5,
      pricing: formData.get("pricing") as string,
      platforms: formData.get("platforms") as string,
      description: formData.get("description") as string,
      url: formData.get("url") as string,
      iconUrl: finalIconUrl || "",
    };

    if (tool?.id) {
      await updateTool(tool.id, data);
    } else {
      await createTool(data);
      formRef.current?.reset();
    }
    
    if (onComplete) onComplete();
    setLoading(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Icon Image */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-center mb-2">
          <div className="w-[80px] h-[80px] shrink-0 border border-[#584235] overflow-hidden relative flex items-center justify-center bg-[#1C1B1C]">
            {tool?.iconUrl ? (
              <img src={tool?.iconUrl} alt="Icon" className="w-full h-full object-contain p-2" />
            ) : (
              <GDCPlaceholder textClassName="text-[14px]" />
            )}
          </div>
        </div>
        <label className="block font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] uppercase">
          ICON IMAGE (Optional - Upload to replace)
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
          Tool Name
        </label>
        <input 
          name="name" 
          defaultValue={tool?.name} 
          required
          className="w-full bg-[#131314] border border-[#584235] p-3 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-mono text-[10px] text-[#A78B7C] mb-2 tracking-[1.2px] uppercase">
          Category
        </label>
        <select
          name="category"
          defaultValue={tool?.category || "ENGINES"}
          className="w-full bg-[#131314] border border-[#584235] p-3 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
        >
          <option value="ENGINES">ENGINES</option>
          <option value="ART">ART</option>
          <option value="AUDIO">AUDIO</option>
          <option value="COLLAB">COLLAB</option>
          <option value="LEARNING">LEARNING</option>
        </select>
      </div>

      {/* Pricing */}
      <div>
        <label className="block font-mono text-[10px] text-[#A78B7C] mb-2 tracking-[1.2px] uppercase">
          Pricing Model
        </label>
        <select
          name="pricing"
          defaultValue={tool?.pricing || "FREE"}
          className="w-full bg-[#131314] border border-[#584235] p-3 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
        >
          <option value="FREE">FREE</option>
          <option value="FREEMIUM">FREEMIUM</option>
          <option value="PAID">PAID</option>
        </select>
      </div>

      {/* Rating & Platforms */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-mono text-[10px] text-[#A78B7C] mb-2 tracking-[1.2px] uppercase">
            Rating (1-5)
          </label>
          <input 
            name="rating" 
            type="number"
            min="1" max="5"
            defaultValue={tool?.rating || 5} 
            className="w-full bg-[#131314] border border-[#584235] p-3 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
          />
        </div>
        <div className="flex-1">
          <label className="block font-mono text-[10px] text-[#A78B7C] mb-2 tracking-[1.2px] uppercase">
            Platforms
          </label>
          <input 
            name="platforms" 
            defaultValue={tool?.platforms || "Win / Mac / Linux"} 
            className="w-full bg-[#131314] border border-[#584235] p-3 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block font-mono text-[10px] text-[#A78B7C] mb-2 tracking-[1.2px] uppercase">
          Description
        </label>
        <textarea 
          name="description" 
          defaultValue={tool?.description} 
          required
          rows={3}
          className="w-full bg-[#131314] border border-[#584235] p-3 text-white font-sora text-[14px] outline-none focus:border-[#FF7A00] resize-none"
        />
      </div>

      {/* URL */}
      <div>
        <label className="block font-mono text-[10px] text-[#A78B7C] mb-2 tracking-[1.2px] uppercase">
          Tool URL
        </label>
        <input 
          name="url" 
          type="url"
          defaultValue={tool?.url} 
          required
          className="w-full bg-[#131314] border border-[#584235] p-3 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={loading}
        className="bg-[#FF7A00] text-[#5C2800] font-mono font-bold text-[12px] tracking-[1.2px] p-3 hover:brightness-110 disabled:opacity-50 transition-all mt-4 uppercase"
      >
        {loading ? "SAVING..." : (tool ? "UPDATE TOOL" : "CREATE TOOL")}
      </button>
    </form>
  );
}
