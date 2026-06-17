"use client";

import React, { useTransition } from "react";
import { setEditorsChoiceGame, deleteGame } from "@/actions/adminActions";

export function GameActionButtons({ gameId, isEditorsChoice }: { gameId: string, isEditorsChoice: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleSetEditorChoice = () => {
    startTransition(async () => {
      await setEditorsChoiceGame(gameId);
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this game?")) {
      startTransition(async () => {
        await deleteGame(gameId);
      });
    }
  };

  return (
    <div className="flex gap-4 mt-4 pt-4 border-t border-[#584235]/40">
      <button 
        onClick={handleSetEditorChoice}
        disabled={isPending || isEditorsChoice}
        className="font-mono text-[10px] tracking-[1.2px] px-3 py-1 bg-[#584235] text-[#FFB68B] hover:bg-[#FF7A00] hover:text-[#5C2800] disabled:opacity-50 transition-colors"
      >
        {isEditorsChoice ? "★ EDITOR'S PICK" : "SET EDITOR'S PICK"}
      </button>
      
      <button 
        onClick={handleDelete}
        disabled={isPending}
        className="font-mono text-[10px] tracking-[1.2px] px-3 py-1 border border-red-900/50 text-red-500 hover:bg-red-500/10 disabled:opacity-50 transition-colors ml-auto"
      >
        DELETE GAME
      </button>
    </div>
  );
}
