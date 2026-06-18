"use client";

import React, { useRef, useState } from "react";
import { createGame, updateGame } from "@/actions/admin/games";
import { handleImageUpload } from "@/utils/uploadHelper";
import GDCPlaceholder from "@/components/GDCPlaceholder";

export default function GameForm({ game, onComplete }: { game?: any, onComplete?: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setUploadError("");
    
    const formData = new FormData(e.currentTarget);
    let finalCoverUrl = game?.coverUrl || "";

    // Handle Image Upload
    const imageFile = formData.get("imageFile") as File;
    if (imageFile && imageFile.size > 0) {
      const newUrl = await handleImageUpload(
        imageFile,
        "games",
        Math.random().toString(36).substring(7),
        finalCoverUrl,
        setUploadError
      );
      if (!newUrl) {
        setLoading(false);
        return;
      }
      finalCoverUrl = newUrl;
    }

    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      genre: formData.get("genre") as string,
      engine: formData.get("engine") as string,
      dimension: (formData.get("dimension") as string) || null,
      duration: (formData.get("duration") as string) || null,
      year: (formData.get("year") as string) || null,
      developer: formData.get("developer") as string || "GDSC SCTCE",
      coverUrl: finalCoverUrl || null,
      playUrl: (formData.get("playUrl") as string) || null,
    };

    if (game?.id) {
      await updateGame(game.id, data);
    } else {
      await createGame(data);
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
          {game?.coverUrl ? (
            <img src={game.coverUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <GDCPlaceholder />
          )}
        </div>
        <label className="block font-mono text-[10px] text-[#FFB68B] tracking-[1.2px]">COVER IMAGE (Optional - Upload to replace)</label>
        <input name="imageFile" type="file" accept="image/*" className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00] file:bg-[#FF7A00] file:text-[#5C2800] file:border-none file:px-3 file:py-1 file:mr-4 file:font-mono file:text-[10px] file:tracking-[1.2px] hover:file:brightness-110 cursor-pointer" />
      </div>

      <div>
        <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">TITLE</label>
        <input name="title" type="text" required defaultValue={game?.title || ""} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
      </div>
      <div>
        <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">DESCRIPTION</label>
        <textarea name="description" required defaultValue={game?.description || ""} rows={3} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">GENRE</label>
          <input name="genre" type="text" required defaultValue={game?.genre || ""} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">ENGINE (Godot, Unity...)</label>
          <input name="engine" type="text" required defaultValue={game?.engine || ""} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">DIMENSION (2D, 3D, etc)</label>
          <input name="dimension" type="text" defaultValue={game?.dimension || ""} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">DURATION (e.g. 2h)</label>
          <input name="duration" type="text" defaultValue={game?.duration || ""} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">YEAR (e.g. 2024)</label>
          <input name="year" type="text" defaultValue={game?.year || ""} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
        </div>
      </div>
      <div>
        <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">DEVELOPER</label>
        <input name="developer" type="text" defaultValue={game?.developer || "GDSC SCTCE"} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
      </div>
      <div>
        <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">PLAY URL (Optional)</label>
        <input name="playUrl" type="url" defaultValue={game?.playUrl || ""} className="w-full bg-[#131314] border border-[#584235] p-2 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]" />
      </div>

      {uploadError && (
        <div className="text-red-500 font-mono text-[10px] tracking-[1.2px]">{uploadError}</div>
      )}

      <button type="submit" disabled={loading} className="mt-4 bg-[#FF7A00] text-[#5C2800] font-mono font-bold text-[12px] tracking-[1.2px] p-3 hover:brightness-110 disabled:opacity-50 transition-all">
        {loading ? "TRANSMITTING..." : game?.id ? "UPDATE GAME" : "CREATE GAME"}
      </button>
    </form>
  );
}
