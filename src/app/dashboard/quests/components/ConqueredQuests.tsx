import { useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Quest } from "@/types";
import { useInView } from "@/hooks/useInView";
import GDCPlaceholder from "@/components/GDCPlaceholder";
import { QuestRatingStars } from "./QuestRatingStars";

interface ConqueredQuestsProps {
  completedQuests: Quest[];
  isLoading?: boolean;
}

export function ConqueredQuests({ completedQuests, isLoading = false }: ConqueredQuestsProps) {
  const [completedPage, setCompletedPage] = useState(0);
  const COMPLETED_PER_PAGE = 5;

  const { ref: pastRef, inView: pastVisible } = useInView(0.15);

  const totalCompletedPages = Math.ceil(completedQuests.length / COMPLETED_PER_PAGE);
  const displayedCompletedQuests = completedQuests.slice(
    completedPage * COMPLETED_PER_PAGE,
    (completedPage + 1) * COMPLETED_PER_PAGE
  );

  return (
    <div ref={pastRef} className="px-6 md:px-16 mt-16 pb-16">
      {/* "Completed" label */}
      <p
        className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFF3D2] transition-all duration-700"
        style={{
          opacity: pastVisible ? 1 : 0,
          transform: pastVisible ? "translateY(0)" : "translateY(16px)",
        }}
      >
        Completed
      </p>

      {/* QUESTS CONQUERED. */}
      <h2
        className="mt-7 uppercase font-sora font-bold text-[clamp(28px,3.5vw,48px)] leading-[1.1] tracking-[-0.96px] text-[#E5E2E3] transition-all duration-700"
        style={{
          opacity: pastVisible ? 1 : 0,
          transform: pastVisible ? "translateY(0)" : "translateY(24px)",
          transitionDelay: "100ms",
        }}
      >
        QUESTS CONQUERED.
      </h2>

      {/* Past Quests List */}
      <div
        className="mt-8 transition-all duration-700"
        style={{
          opacity: pastVisible ? 1 : 0,
          transitionDelay: "200ms",
        }}
      >
        {displayedCompletedQuests.length > 0 ? (
          displayedCompletedQuests.map((quest, idx) => (
            <div
              key={quest.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-[25px] border-t border-[#584235] transition-all duration-300 hover:bg-[#201F20]/30 hover:px-4 group cursor-pointer"
              style={{
                opacity: pastVisible ? 1 : 0,
                transform: pastVisible ? "translateX(0)" : "translateX(-24px)",
                transition: "all 0.6s ease",
                transitionDelay: `${idx * 80}ms`,
              }}
            >
              {/* Left: thumbnail + info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-7">
                {/* Thumbnail */}
                <div className="relative shrink-0 overflow-hidden w-[96px] h-[64px] bg-[#1C1B1C] transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
                  {quest.image ? (
                    <Image
                      src={quest.image}
                      alt={quest.title}
                      fill
                      sizes="96px"
                      className="object-cover transition-all duration-300"
                    />
                  ) : (
                    <GDCPlaceholder textClassName="text-[24px]" />
                  )}
                </div>

                {/* Title + meta */}
                <div>
                  <p className="font-sora font-normal text-[16px] leading-[26px] text-[#E5E2E3] transition-colors duration-200 group-hover:text-[#FFB68B]">
                    {quest.title}
                  </p>
                  <p className="mt-1 font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF]">
                    {quest.seatsTaken || 0} Attendees
                  </p>
                </div>
              </div>

              {/* Right: View Report link & Ratings */}
              <div className="flex flex-col sm:items-end gap-3 self-start sm:self-auto">
                {/* View Report Link */}
                <a
                  href={quest.recapUrl || "#"}
                  className="flex items-center gap-2 hover:opacity-100 transition-all duration-200 group/report"
                >
                  <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFF3D2] group-hover:text-[#FFB68B] transition-colors duration-200">
                    View Report
                  </span>
                  <ExternalLink className="w-[10.67px] h-[10.67px] text-[#FFF3D2] group-hover:text-[#FFB68B] group-hover:translate-x-1 transition-transform duration-200" />
                </a>

                {/* Star Rating (Only for approved registrations) */}
                {quest.registrations && quest.registrations.some(r => r.status === "REGISTERED") && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <QuestRatingStars 
                      questId={quest.id} 
                      initialRating={quest.ratings && quest.ratings.length > 0 ? quest.ratings[0].rating : undefined} 
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-[40px] border-t border-[#584235] text-center">
            <p className="font-mono text-[12px] text-[#E0C0AF] tracking-[1.2px] uppercase">
              No completed quests found.
            </p>
          </div>
        )}

        {/* Bottom border of last row */}
        {displayedCompletedQuests.length > 0 && <div className="border-b border-[#584235]" />}

        {/* Pagination Controls */}
        {totalCompletedPages > 1 && (
          <div className="flex justify-between items-center mt-6 pt-2 pb-8">
            <button 
              onClick={() => setCompletedPage(p => Math.max(0, p - 1))}
              disabled={completedPage === 0}
              className="font-mono font-bold text-[12px] tracking-[1.2px] text-[#FFB68B] disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
            >
              &lt; PREV
            </button>
            <span className="font-mono text-[10px] text-[#E0C0AF] tracking-[1.2px]">
              PAGE {completedPage + 1} OF {totalCompletedPages}
            </span>
            <button 
              onClick={() => setCompletedPage(p => Math.min(totalCompletedPages - 1, p + 1))}
              disabled={completedPage === totalCompletedPages - 1}
              className="font-mono font-bold text-[12px] tracking-[1.2px] text-[#FFB68B] disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
            >
              NEXT &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
