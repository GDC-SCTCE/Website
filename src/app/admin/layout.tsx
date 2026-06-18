"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Navbar from "@/components/Navbar";
import { ADMIN_NAV_LINKS } from "@/constants/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/admin/login");
        router.refresh();
      } else if (event === "SIGNED_IN") {
        if (pathname === "/admin/login") router.push("/admin");
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router, supabase]);

  // If on login page, don't show the dashboard shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#131314] flex flex-col font-sans text-zinc-100">
      <Navbar 
        links={ADMIN_NAV_LINKS} 
        logoText="ADMIN OVERRIDE"
        logoHref="/admin"
        isAdmin={true} 
      />

      <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-16">
        {children}
      </main>
    </div>
  );
}
