export function QuestsDynamicSkeleton() {
  return (
    <>
      {/* ── Active Quest Cards ── */}
      <div className="px-6 md:px-8 xl:px-16 mt-10">
        <div className="flex overflow-hidden gap-[44px] pb-8">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="w-full md:w-[calc(50%-22px)] shrink-0 flex"
            >
              {/* Card shell — mirrors: flex flex-col flex-1 bg-gradient-to-b from-[#161618] to-[#131314] border-t border-[#FF7A00] */}
              <div className="flex flex-col flex-1 bg-gradient-to-b from-[#161618] to-[#131314] border-t border-[#FF7A00]/30">

                {/* Image area — relative mx-4 md:mx-6 mt-4 md:mt-6 h-[200px] md:h-[290px] */}
                <div className="relative mx-4 md:mx-6 mt-4 md:mt-6 h-[200px] md:h-[290px] bg-[#1C1B1C] animate-pulse">
                  {/* Badge — absolute top-[16px] left-[16px] h-[25px] */}
                  <div className="absolute top-[16px] left-[16px] h-[25px] w-[68px] bg-[#131314]/80 border border-[#584235]" />
                </div>

                {/* Card body — mx-4 md:mx-6 mt-4 md:mt-6 flex flex-col flex-1 pb-4 md:pb-6 */}
                <div className="mx-4 md:mx-6 mt-4 md:mt-6 flex flex-col flex-1 pb-4 md:pb-6">

                  {/* Title — font-sora text-[24px] sm:text-[32px] leading-[36px] sm:leading-[48px] */}
                  <div className="h-9 sm:h-12 w-4/5 bg-[#1C1B1C] animate-pulse mb-1" />
                  <div className="h-9 sm:h-12 w-3/5 bg-[#1C1B1C] animate-pulse" />

                  {/* Date/location — mt-1 font-mono text-[14px] sm:text-[16px] */}
                  <div className="h-4 w-2/3 bg-[#1C1B1C] animate-pulse mt-3" />

                  {/* Separator — mt-6 border-t border-[#584235] */}
                  <div className="mt-6 border-t border-[#584235]" />

                  {/* Timer + Stats row — flex items-start justify-between mt-4 md:mt-6 */}
                  <div className="flex items-start justify-between mt-4 md:mt-6">
                    <div className="flex flex-col gap-2">
                      {/* "Time Remaining" label — font-mono text-[10px] */}
                      <div className="h-[10px] w-24 bg-[#1C1B1C] animate-pulse" />
                      {/* Timer value — font-mono text-[14px] sm:text-[16px] */}
                      <div className="h-4 w-32 bg-[#1C1B1C] animate-pulse" />
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {/* "Seats Available" label */}
                      <div className="h-[10px] w-24 bg-[#1C1B1C] animate-pulse" />
                      {/* Seat number */}
                      <div className="h-4 w-16 bg-[#1C1B1C] animate-pulse" />
                    </div>
                  </div>

                  {/* Seat progress bar — mt-4 h-[3px] */}
                  <div className="mt-4 h-[3px] w-full bg-[#1C1B1C] animate-pulse" />

                  {/* Register/View button — mt-4 md:mt-6 h-[50px] md:h-[60px] */}
                  <div className="mt-4 md:mt-6 h-[50px] md:h-[60px] w-full bg-[#FF7A00]/10 border border-[#584235] animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
