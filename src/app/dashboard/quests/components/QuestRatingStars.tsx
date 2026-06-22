"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { submitQuestRating } from "@/actions/dataActions";

interface QuestRatingStarsProps {
  questId: string;
  initialRating?: number;
}

export function QuestRatingStars({ questId, initialRating }: QuestRatingStarsProps) {
  const [rating, setRating] = useState<number>(initialRating || 0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState<boolean>(!!initialRating);

  const handleRate = async (newRating: number) => {
    if (hasRated || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await submitQuestRating(questId, newRating);
      setRating(newRating);
      setHasRated(true);
    } catch (error) {
      console.error("Failed to submit rating:", error);
      // Optional: show a toast error here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-1">
      {hasRated ? (
        <span className="font-mono text-[10px] text-[#A78B7C] uppercase tracking-[1px]">Your Rating</span>
      ) : (
        <span className="font-mono text-[10px] text-[#FFB68B] uppercase tracking-[1px]">Rate Quest</span>
      )}
      
      <div 
        className="flex items-center gap-1"
        onMouseLeave={() => !hasRated && setHoverRating(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = star <= (hoverRating || rating);
          
          return (
            <button
              key={star}
              disabled={hasRated || isSubmitting}
              onMouseEnter={() => !hasRated && setHoverRating(star)}
              onClick={() => handleRate(star)}
              className={`
                p-0 border-none bg-transparent transition-all duration-200
                ${hasRated ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
                ${isSubmitting ? 'opacity-50 cursor-wait' : ''}
              `}
              aria-label={`Rate ${star} stars`}
            >
              <Star 
                className={`w-5 h-5 transition-colors duration-200 ${
                  isActive 
                    ? "fill-[#FF7A00] text-[#FF7A00]" 
                    : "fill-transparent text-[#584235]"
                } ${hasRated && !isActive ? "opacity-30" : ""}`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
