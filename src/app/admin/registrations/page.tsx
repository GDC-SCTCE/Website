import React from "react";
import prisma from "@/lib/prisma";
import RegistrationAdminClient from "./RegistrationAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminRegistrations() {
  const registrations = await prisma.registration.findMany({
    include: {
      user: true,
      quest: true,
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-sora font-extrabold text-[32px] text-[#FF7A00] mb-2">REGISTRATIONS</h1>
        <p className="font-mono text-[14px] text-[#E0C0AF] tracking-[1.2px]">
          MANAGE ALL QUEST REGISTRATIONS AND APPROVE PAYMENTS.
        </p>
      </div>

      <RegistrationAdminClient registrations={registrations} />
    </div>
  );
}
