"use client";

import React, { useState } from "react";
import GameForm from "./GameForm";
import GDCPlaceholder from "@/components/GDCPlaceholder";
import { Search, Trash2 } from "lucide-react";
import { deleteGame, deleteAllGames, setEditorsChoiceGame } from "@/actions/admin/games";
import { Game } from "@prisma/client";

export default function GameAdminClient({ games }: { games: Game[] }) {
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAll = async () => {
    if (window.confirm("WARNING: Are you sure you want to delete ALL games? This cannot be undone!")) {
      setIsDeleting(true);
      await deleteAllGames();
      setSelectedGame(null);
      setIsDeleting(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this game?")) {
      setIsDeleting(true);
      await deleteGame(id);
      if (selectedGame?.id === id) {
        setSelectedGame(null);
      }
      setIsDeleting(false);
    }
  };

  const handleSetEditorChoice = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await setEditorsChoiceGame(id);
  };

  // keep selected up to date if items change
  React.useEffect(() => {
    if (selectedGame) {
      const updated = games.find(g => g.id === selectedGame.id);
      if (updated) setSelectedGame(updated);
    }
  }, [games, selectedGame]);

  const filteredGames = games.filter((g) => {
    return g.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Admin Unified Filter Bar */}
      <div className="bg-[#1A1A1B] border border-[#584235] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A78B7C]" />
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#131314] border border-[#584235] h-[36px] pl-10 pr-4 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
          />
        </div>

        {/* Delete All Action */}
        <button
          onClick={handleDeleteAll}
          disabled={isDeleting || games.length === 0}
          className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 px-3 h-[36px] font-mono text-[10px] tracking-[1.2px] transition-colors disabled:opacity-50 ml-auto shrink-0"
        >
          <Trash2 className="w-[14px] h-[14px]" /> DELETE ALL GAMES
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN: LIST */}
        <div className="lg:col-span-2 flex flex-col gap-2">
          {filteredGames.length === 0 ? (
            <div className="text-center font-mono text-[12px] text-[#A78B7C] p-8 border border-dashed border-[#584235]">
              NO GAMES MATCHING YOUR FILTERS.
            </div>
          ) : (
            filteredGames.map((game) => (
              <div
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className={`bg-[#1A1A1B] border ${selectedGame?.id === game.id ? 'border-[#FF7A00]' : 'border-[#584235] hover:border-[#FF7A00]/50'} p-4 flex flex-col sm:flex-row gap-4 cursor-pointer transition-colors items-start sm:items-center`}
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-[96px] h-[120px] sm:h-[64px] shrink-0 border border-[#584235] overflow-hidden relative flex items-center justify-center bg-[#1C1B1C]">
                  {game.coverUrl ? (
                    <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover" />
                  ) : (
                    <GDCPlaceholder textClassName="text-[20px]" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-1 w-full">
                  <div className="flex flex-col xl:flex-row items-start justify-between gap-2 xl:gap-0">
                    <div>
                      <h3 className="font-sora font-bold text-[16px] text-[#FFB68B]">{game.title}</h3>
                      <p className="font-sans text-[12px] text-zinc-400 line-clamp-1">{game.description}</p>
                    </div>
                    {game.isEditorsChoice && (
                      <span className="font-mono text-[10px] bg-[#00DBE9] text-[#131314] px-2 py-1 rounded-sm font-bold shrink-0 xl:ml-2">
                        EDITOR&apos;S PICK
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 sm:mt-2 gap-4 sm:gap-2">
                    <div className="flex flex-wrap gap-2">
                      <span className="font-mono text-[10px] bg-[#584235] text-[#FFB68B] px-2 py-1 rounded-sm">
                        {game.genre}
                      </span>
                      {game.dimension && (
                        <span className="font-mono text-[10px] bg-zinc-800 text-zinc-300 px-2 py-1 rounded-sm">
                          {game.dimension}
                        </span>
                      )}
                      {game.year && (
                        <span className="font-mono text-[10px] bg-zinc-800 text-zinc-300 px-2 py-1 rounded-sm">
                          {game.year}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => handleSetEditorChoice(e, game.id)}
                        disabled={game.isEditorsChoice}
                        className="font-mono text-[10px] tracking-[1.2px] px-2 py-1 bg-[#584235] text-[#FFB68B] hover:bg-[#FF7A00] hover:text-[#5C2800] disabled:opacity-50 transition-colors"
                      >
                        {game.isEditorsChoice ? "★ EDITOR'S PICK" : "SET EDITOR'S PICK"}
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, game.id)}
                        disabled={isDeleting}
                        className="text-[#A78B7C] hover:text-red-500 p-1 transition-colors disabled:opacity-50"
                        title="Delete Game"
                      >
                        <Trash2 className="w-[14px] h-[14px]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT COLUMN: FORM / DETAILS */}
        <div className="lg:col-span-1 bg-[#1A1A1B] border border-[#584235] p-6 h-fit sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-sora font-bold text-[20px] text-white">
              {selectedGame ? "EDIT GAME" : "ADD NEW GAME"}
            </h2>
            {selectedGame && (
              <button
                onClick={() => setSelectedGame(null)}
                className="font-mono text-[10px] bg-[#FF7A00]/10 text-[#FF7A00] px-2 py-1 hover:bg-[#FF7A00]/20 transition-colors"
              >
                + NEW
              </button>
            )}
          </div>
          
          <GameForm 
            key={selectedGame?.id || "new"} 
            game={selectedGame} 
            onComplete={() => {
              setSelectedGame(null);
            }}
          />
        </div>
      </div>
    </div>
  );
}
