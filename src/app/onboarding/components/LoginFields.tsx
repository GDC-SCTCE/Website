interface LoginFieldsProps {
  email: string;
  setEmail: (val: string) => void;
}

export default function LoginFields({ email, setEmail }: LoginFieldsProps) {
  return (
    <div className="max-w-[420px] mx-auto w-full">
      {/* Credentials Header */}
      <div className="flex items-center gap-[16px] mb-[24px] md:mb-[48px] justify-center">
        <span className="font-sora font-bold text-[36px] md:text-[48px] leading-none tracking-[-0.96px] text-[#353436]">
          03
        </span>
        <span className="font-sora font-bold text-[24px] md:text-[32px] leading-none uppercase text-[#E5E2E3]">
          CREDENTIALS
        </span>
      </div>

      {/* Email input only */}
      <div className="mb-[36px] w-full">
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
  );
}
