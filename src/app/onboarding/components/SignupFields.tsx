import { XPLevel } from "@prisma/client";
import { DEV_TOOLS, YEAR_OPTIONS, XP_LEVELS } from "../constants";

interface SignupFieldsProps {
  fullName: string;
  setFullName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  rollNo: string;
  setRollNo: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  year: string;
  setYear: (val: string) => void;
  selectedTools: string[];
  toggleTool: (tool: string) => void;
  xpLevel: XPLevel;
  setXpLevel: (val: XPLevel) => void;
}

export default function SignupFields({
  fullName, setFullName,
  email, setEmail,
  rollNo, setRollNo,
  phone, setPhone,
  year, setYear,
  selectedTools, toggleTool,
  xpLevel, setXpLevel
}: SignupFieldsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-[64px] items-start max-w-[1280px] mx-auto">
      {/* ───── LEFT: BASE STATS ───── */}
      <div>
        <div className="flex items-center gap-[16px] mb-[24px] md:mb-[48px]">
          <span className="font-sora font-bold text-[36px] md:text-[48px] leading-none tracking-[-0.96px] text-[#353436]">
            03
          </span>
          <span className="font-sora font-bold text-[24px] md:text-[32px] leading-none uppercase text-[#E5E2E3]">
            BASE STATS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-[36px] w-full">
          <div>
            <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
              FULL NAME <span className="text-[#FF7A00] ml-[2px]">*</span>
            </label>
            <div className="border-b border-[#D0D0D0] pb-[13px]">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jaxen Sterling"
                className="w-full bg-transparent border-none outline-none font-sora font-normal text-[16px] leading-[20px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B]"
              />
            </div>
          </div>
          
          <div>
            <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
              EMAIL ADDRESS <span className="text-[#FF7A00] ml-[2px]">*</span>
            </label>
            <div className="border-b border-[#D0D0D0] pb-[13px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jaxen@gmail.com"
                className="w-full bg-transparent border-none outline-none font-sora font-normal text-[16px] leading-[20px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B]"
              />
            </div>
          </div>
        </div>

        {/* Roll No + Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-[36px] w-full">
          <div>
            <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
              ROLL NO. <span className="text-[#FF7A00] ml-[2px]">*</span>
            </label>
            <div className="border-b border-[#D0D0D0] pb-[13px]">
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value.toUpperCase())}
                placeholder="SCT22CS001"
                className="w-full bg-transparent border-none outline-none font-sora font-normal text-[16px] leading-[20px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B] uppercase"
              />
            </div>
          </div>
          
          <div>
            <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
              PHONE NUMBER <span className="text-[#FF7A00] ml-[2px]">*</span>
            </label>
            <div className="border-b border-[#D0D0D0] pb-[13px]">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full bg-transparent border-none outline-none font-sora font-normal text-[16px] leading-[20px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B]"
              />
            </div>
          </div>
        </div>

        {/* Academic Year */}
        <div className="w-full mb-[36px]">
          <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
            ACADEMIC YEAR
          </label>
          <div className="flex flex-wrap gap-[8px]">
            {YEAR_OPTIONS.map((y) => {
              const isActive = year === y;
              return (
                <button
                  type="button"
                  key={y}
                  onClick={() => setYear(y)}
                  className={`flex items-center justify-center w-[83.33px] h-[48px] font-mono font-normal text-[10px] leading-[15px] cursor-pointer uppercase transition-all duration-150 border ${isActive ? "bg-[#FF7A00] text-[#522300] border-[#FF7A00]" : "bg-transparent text-[#E5E2E3] border-[#353436] hover:border-[#FFB68B]/50"}`}
                >
                  {y}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ───── RIGHT: LOADOUT ───── */}
      <div>
        {/* Section title */}
        <div className="flex items-center gap-[16px] mb-[24px] md:mb-[48px]">
          <span className="font-sora font-bold text-[36px] md:text-[48px] leading-none tracking-[-0.96px] text-[#353436]">
            04
          </span>
          <span className="font-sora font-bold text-[24px] md:text-[32px] leading-none uppercase text-[#E5E2E3]">
            LOADOUT
          </span>
        </div>

        {/* Development Tools */}
        <div className="mb-[56px]">
          <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[28px]">
            DEVELOPMENT TOOLS
          </p>
          <div className="flex gap-[8px] flex-wrap">
            {DEV_TOOLS.map((tool) => {
              const isSelected = selectedTools.includes(tool);
              return (
                <button
                  type="button"
                  key={tool}
                  onClick={() => toggleTool(tool)}
                  className={`h-[33px] px-[16px] font-mono font-normal text-[10px] leading-[15px] cursor-pointer transition-all duration-150 ${isSelected ? "bg-[#FFB68B] text-[#522300] border-none shadow-[0_4px_20px_-5px_rgba(255,182,139,0.6)]" : "bg-transparent text-[#E0C0AF] border border-[#353436] hover:border-[#FFB68B]"}`}
                >
                  {tool}
                </button>
              );
            })}
          </div>
        </div>

        {/* XP Classification */}
        <div>
          <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[28px]">
            XP CLASSIFICATION
          </p>
          <div className="flex flex-col gap-[12px]">
            {XP_LEVELS.map((lvl) => {
              const isSelected = xpLevel === lvl.id;
              return (
                <button
                  type="button"
                  key={lvl.id}
                  onClick={() => setXpLevel(lvl.id as XPLevel)}
                  className={`w-full h-[69px] bg-[#1C1B1C] pl-[49px] pr-[17px] py-[17px] text-left cursor-pointer relative box-border transition-colors duration-150 border ${isSelected ? "border-[#FFB68B]" : "border-[#353436] hover:border-[#FFB68B]/50"}`}
                >
                  {/* Radio circle */}
                  <span className={`absolute left-[17px] top-[26.5px] w-[16px] h-[16px] border-2 border-[#353436] rounded-full inline-block box-border ${isSelected ? "bg-[#FFB68B]" : "bg-transparent"}`} />
                  <p className="font-mono font-normal text-[12px] leading-[18px] text-[#FFB68B] m-0 mb-[2px]">
                    {lvl.label}
                  </p>
                  <p className="font-sora font-normal text-[11px] leading-[16px] text-[#E0C0AF] m-0 truncate">
                    {lvl.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
