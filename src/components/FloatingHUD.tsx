"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User } from "lucide-react";
import { checkIsAdminEmail } from "@/actions/authActions";
import { useState, useEffect } from "react";

export default function FloatingHUD() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(true); // default true to hide initially

  useEffect(() => {
    if (user?.email) {
      checkIsAdminEmail(user.email).then(setIsAdmin);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  if (loading || !user || isAdmin) return null;

  // Hide the floating profile button if the user is already on the profile page
  if (pathname === "/dashboard/profile") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 group flex items-center gap-3">
      {/* Tooltip Label */}
      <span className="font-mono text-[10px] tracking-wider text-[#E0C0AF] bg-[#131314]/90 border border-[#584235]/40 px-3 py-1.5 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-[0_0_10px_rgba(0,0,0,0.5)]">
        Profile Dossier
      </span>

      <Link
        href="/dashboard/profile"
        className="w-14 h-14 rounded-full flex items-center justify-center bg-[#1C1B1C]/95 text-[#FFB68B] border border-[#584235] hover:border-[#FFB68B] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,122,0,0.15)] transition-all duration-300"
        aria-label="View Profile Dossier"
      >
        <User className="w-5 h-5" />
      </Link>
    </div>
  );
}
