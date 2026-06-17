"use client";

import React, { useRef, useState, useEffect } from "react";
import { createQuest, updateQuest } from "@/actions/adminActions";
import { handleImageUpload } from "@/utils/uploadHelper";
import { filters } from "@/constants/quests";
import GDCPlaceholder from "@/components/GDCPlaceholder";

export default function QuestForm({ quest, onComplete }: { quest?: any, onComplete?: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [status, setStatus] = useState(quest?.status || "UPCOMING");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setUploadError("");
    
    const formData = new FormData(e.currentTarget);
    const data: any = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      status: formData.get("status") as string,
      dateText: formData.get("dateText") as string,
      location: formData.get("location") as string || null,
      capacity: parseInt(formData.get("capacity") as string) || 0,
      seatsTaken: parseInt(formData.get("seatsTaken") as string) || 0,
      price: parseInt(formData.get("price") as string) || 0,
      upiLink: formData.get("upiLink") as string || null,
    };

    if (data.status === "ACTIVE" || data.status === "UPCOMING") {
      const td = formData.get("targetDate") as string;
      if (td) data.targetDate = new Date(td);
      const ed = formData.get("endDate") as string;
      if (ed) data.endDate = new Date(ed);
      data.recapUrl = null;
    } else if (data.status === "COMPLETED") {
      data.targetDate = null;
      data.recapUrl = formData.get("recapUrl") as string || null;
    }

    let finalImageUrl = quest?.image || "";
    const imageFile = formData.get("imageFile") as File;
    if (imageFile && imageFile.size > 0) {
      const newUrl = await handleImageUpload(
        imageFile,
        "quests",
        data.title.replace(/\s+/g, '_'),
        finalImageUrl,
        setUploadError
      );
      if (!newUrl) {
        setLoading(false);
        return;
      }
      finalImageUrl = newUrl;
    }

    const finalData = { ...data, image: finalImageUrl };

    if (quest?.id) {
      await updateQuest(quest.id, finalData);
    } else {
      await createQuest(finalData);
      formRef.current?.reset();
    }
    if (onComplete) onComplete();
    setLoading(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Image Preview & Upload */}
      <div className="flex flex-col gap-2">
        <div className="relative w-full h-[180px] bg-[#1C1B1C] border border-[#584235] flex items-center justify-center overflow-hidden">
          {quest?.image ? (
            <img src={quest.image} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <GDCPlaceholder />
          )}
        </div>
        <label className="block font-mono text-[10px] text-[#FFB68B] tracking-[1.2px]">QUEST IMAGE (Optional - Upload to replace)</label>
        <input name="imageFile" type="file" accept="image/*" className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00] file:bg-[#FF7A00] file:text-[#5C2800] file:border-none file:px-3 file:py-1 file:mr-4 file:font-mono file:text-[10px] file:tracking-[1.2px] hover:file:brightness-110 cursor-pointer" />
      </div>

      <div>
        <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">TITLE</label>
        <input name="title" type="text" required defaultValue={quest?.title || ""} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">CATEGORY</label>
          <select name="category" required defaultValue={quest?.category || filters[1]} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]">
            {filters.filter(f => f !== "All").map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">STATUS</label>
          <select 
            name="status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="UPCOMING">UPCOMING</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">DATE TEXT</label>
          <input name="dateText" type="text" required defaultValue={quest?.dateText || ""} placeholder="May 14-16" className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">LOCATION</label>
          <input name="location" type="text" defaultValue={quest?.location || ""} placeholder="Virtual" className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">CAPACITY</label>
          <input name="capacity" type="number" required defaultValue={quest?.capacity || 50} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">SEATS TAKEN</label>
          <input name="seatsTaken" type="number" defaultValue={quest?.seatsTaken || 0} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">PRICE (₹) (0 for free)</label>
          <input name="price" type="number" required defaultValue={quest?.price || 0} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">UPI LINK (if price {'>'} 0)</label>
          <input name="upiLink" type="text" defaultValue={quest?.upiLink || ""} placeholder="upi://pay?pa=..." className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
      </div>

      {(status === "ACTIVE" || status === "UPCOMING") && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">TARGET DATE</label>
            <input 
              name="targetDate" 
              type="datetime-local" 
              defaultValue={quest?.targetDate ? new Date(quest.targetDate).toISOString().slice(0, 16) : ""} 
              className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" 
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">END DATE</label>
            <input 
              name="endDate" 
              type="datetime-local" 
              defaultValue={quest?.endDate ? new Date(quest.endDate).toISOString().slice(0, 16) : ""} 
              className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" 
            />
          </div>
        </div>
      )}

      {status === "COMPLETED" && (
        <>
          <div>
            <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">RECAP URL</label>
            <input name="recapUrl" type="url" placeholder="https://..." defaultValue={quest?.recapUrl || ""} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
          </div>
        </>
      )}

      {uploadError && <p className="font-mono text-[10px] text-red-500">{uploadError}</p>}

      <button type="submit" disabled={loading} className="mt-4 bg-[#FF7A00] text-[#5C2800] font-mono font-bold text-[12px] tracking-[1.2px] p-3 hover:brightness-110 disabled:opacity-50 transition-all">
        {loading ? "TRANSMITTING..." : (quest ? "UPDATE QUEST" : "CREATE QUEST")}
      </button>
    </form>
  );
}
