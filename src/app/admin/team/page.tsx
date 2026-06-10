import React from "react";
import prisma from "@/lib/prisma";
import TeamAdminClient from "./TeamAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminTeam() {
  const members = await prisma.teamMember.findMany({
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-sora font-extrabold text-[32px] text-[#FF7A00] mb-2">TEAM REGISTRY</h1>
        <p className="font-mono text-[14px] text-[#E0C0AF] tracking-[1.2px]">
          MANAGE ALL MEMBERS OF THE GAME DEV COLLECTIVE.
        </p>
      </div>

      <TeamAdminClient members={members} />
    </div>
  );
}
