"use client";

import React, { useRef, useState } from "react";
import { createQuest } from "@/actions/adminActions";

export default function QuestForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      status: formData.get("status") as string,
      dateText: formData.get("dateText") as string,
      location: formData.get("location") as string || null,
      capacity: parseInt(formData.get("capacity") as string) || 0,
      seatsTaken: parseInt(formData.get("seatsTaken") as string) || 0,
    };

    await createQuest(data);
    formRef.current?.reset();
    setLoading(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">TITLE</label>
        <input name="title" type="text" required className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">CATEGORY</label>
          <input name="category" type="text" required className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">STATUS</label>
          <select name="status" className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]">
            <option value="ACTIVE">ACTIVE</option>
            <option value="UPCOMING">UPCOMING</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">DATE TEXT</label>
          <input name="dateText" type="text" required placeholder="May 14-16" className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">LOCATION</label>
          <input name="location" type="text" placeholder="Virtual" className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">CAPACITY</label>
          <input name="capacity" type="number" required defaultValue="50" className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">SEATS TAKEN</label>
          <input name="seatsTaken" type="number" defaultValue="0" className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
      </div>

      <button type="submit" disabled={loading} className="mt-4 bg-[#FF7A00] text-[#5C2800] font-mono font-bold text-[12px] tracking-[1.2px] p-3 hover:brightness-110 disabled:opacity-50 transition-all">
        {loading ? "TRANSMITTING..." : "CREATE QUEST"}
      </button>
    </form>
  );
}
