"use client";

import React, { useState } from "react";
import AlumniForm from "./AlumniForm";
import Avatar from "@/components/Avatar";
import { Search, Trash2 } from "lucide-react";
import { deleteAlumni, deleteAllAlumni } from "@/actions/admin/alumni";
import { Alumni } from "@prisma/client";

export default function AlumniAdminClient({ initialAlumni }: { initialAlumni: Alumni[] }) {
  const [search, setSearch] = useState("");
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAll = async () => {
    if (window.confirm("WARNING: Are you sure you want to delete ALL alumni? This cannot be undone!")) {
      setIsDeleting(true);
      await deleteAllAlumni();
      setSelectedAlumni(null);
      setIsDeleting(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this alumni?")) {
      setIsDeleting(true);
      await deleteAlumni(id);
      if (selectedAlumni?.id === id) {
        setSelectedAlumni(null);
      }
      setIsDeleting(false);
    }
  };

  React.useEffect(() => {
    if (selectedAlumni) {
      const updated = initialAlumni.find(a => a.id === selectedAlumni.id);
      if (updated) setSelectedAlumni(updated);
    }
  }, [initialAlumni, selectedAlumni]);

  const filteredAlumni = initialAlumni.filter((a) => {
    return a.name.toLowerCase().includes(search.toLowerCase()) || a.company.toLowerCase().includes(search.toLowerCase());
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
            placeholder="Search legends..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#131314] border border-[#584235] h-[36px] pl-10 pr-4 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
          />
        </div>

        {/* Delete All Action */}
        <button
          onClick={handleDeleteAll}
          disabled={isDeleting || initialAlumni.length === 0}
          className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 px-3 h-[36px] font-mono text-[10px] tracking-[1.2px] transition-colors disabled:opacity-50 ml-auto shrink-0"
        >
          <Trash2 className="w-[14px] h-[14px]" /> DELETE ALL ALUMNI
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN: LIST */}
        <div className="lg:col-span-2 flex flex-col gap-2">
          {filteredAlumni.length === 0 ? (
            <div className="text-center font-mono text-[12px] text-[#A78B7C] p-8 border border-dashed border-[#584235]">
              NO ALUMNI MATCHING YOUR FILTERS.
            </div>
          ) : (
            filteredAlumni.map((alumnus) => (
              <div
                key={alumnus.id}
                onClick={() => setSelectedAlumni(alumnus)}
                className={`bg-[#1A1A1B] border ${selectedAlumni?.id === alumnus.id ? 'border-[#FF7A00]' : 'border-[#584235] hover:border-[#FF7A00]/50'} p-4 flex gap-4 cursor-pointer transition-colors items-center`}
              >
                {/* Thumbnail */}
                <div className="w-[64px] h-[64px] shrink-0 border border-[#584235] overflow-hidden transition-all">
                  {alumnus.avatar ? (
                    <img src={alumnus.avatar} alt={alumnus.name} className="w-full h-full object-cover" />
                  ) : (
                    <Avatar name={alumnus.name} size={64} />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-sora font-bold text-[16px] text-white truncate mb-1">
                    {alumnus.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-[1.2px] text-[#A78B7C] uppercase">
                      {alumnus.role}
                    </span>
                    <span className="font-mono text-[10px] tracking-[1.2px] text-[#A78B7C] uppercase">
                      • {alumnus.company}
                    </span>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => handleDelete(e, alumnus.id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT COLUMN: FORM */}
        <div className="lg:col-span-1 bg-[#1A1A1B] border border-[#584235] p-6 h-fit sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-sora font-bold text-[20px] text-white uppercase">
              {selectedAlumni ? `EDIT ALUMNI` : "ADD NEW ALUMNI"}
            </h2>
            {selectedAlumni && (
              <button 
                onClick={() => setSelectedAlumni(null)}
                className="font-mono text-[10px] bg-[#FF7A00]/10 text-[#FF7A00] px-2 py-1 hover:bg-[#FF7A00]/20 transition-colors"
              >
                + NEW
              </button>
            )}
          </div>
          <AlumniForm 
            key={selectedAlumni?.id || "new"}
            alumnus={selectedAlumni} 
            onComplete={() => setSelectedAlumni(null)} 
          />
        </div>
      </div>
    </div>
  );
}
