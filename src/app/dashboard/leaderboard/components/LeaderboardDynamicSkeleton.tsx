export function LeaderboardDynamicSkeleton() {
  return (
    <>
      {/* Rows skeleton */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center border-b border-[#353436]/30 py-0 min-h-[171px]">
          <div className="w-[140px] shrink-0 pl-4">
            <div className="h-8 w-10 bg-[#1C1B1C] animate-pulse" />
          </div>
          <div className="flex-[2] min-w-[300px] py-10 pl-0 pr-4">
            <div className="h-6 w-48 bg-[#1C1B1C] animate-pulse mb-2" />
            <div className="h-4 w-24 bg-[#1C1B1C] animate-pulse" />
          </div>
          <div className="flex-1 min-w-[180px] shrink-0 flex flex-col gap-2 py-10">
            <div className="h-6 w-16 bg-[#1C1B1C] animate-pulse" />
            <div className="h-4 w-20 bg-[#1C1B1C] animate-pulse" />
          </div>
          <div className="flex-[0.8] min-w-[140px] shrink-0 flex items-center justify-end py-10 pr-8">
            <div className="h-10 w-20 bg-[#1C1B1C] animate-pulse" />
          </div>
        </div>
      ))}
    </>
  );
}

export function AlumniDynamicSkeleton() {
  return (
    <div className="w-full mt-8">
      <div className="flex overflow-hidden pb-8 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 flex flex-col gap-4">
            <div className="w-full aspect-square bg-[#1C1B1C] animate-pulse border-2 border-[#353436]" />
            <div className="h-6 w-3/4 bg-[#1C1B1C] animate-pulse mt-1" />
            <div className="h-4 w-1/2 bg-[#1C1B1C] animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
