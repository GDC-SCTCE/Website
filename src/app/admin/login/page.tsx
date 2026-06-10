"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#131314] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1A1A1B] border border-[#584235] p-8">
        <h1 className="font-sora font-extrabold text-[24px] text-[#FF7A00] mb-2">RESTRICTED AREA</h1>
        <p className="font-mono text-[12px] text-[#E0C0AF] tracking-[1.2px] mb-8">
          PLEASE AUTHENTICATE TO ACCESS PROTOCOLS
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">IDENTIFIER (EMAIL)</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#131314] border border-[#584235] p-3 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00] transition-colors"
              required
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] text-[#FFB68B] mb-2 tracking-[1.2px]">PASSPHRASE</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#131314] border border-[#584235] p-3 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00] transition-colors"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 font-mono text-[10px] tracking-[1.2px] mt-2">
              ERROR: {error.toUpperCase()}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 bg-[#FF7A00] text-[#5C2800] font-mono font-bold text-[12px] tracking-[1.2px] p-3 hover:brightness-110 disabled:opacity-50 transition-all"
          >
            {loading ? "AUTHENTICATING..." : "INITIATE LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}
