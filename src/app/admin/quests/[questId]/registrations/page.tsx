import React from "react";
import prisma from "@/lib/prisma";
import RegistrationAdminClient from "./RegistrationAdminClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function QuestRegistrations(props: { params: Promise<{ questId: string }> }) {
  const params = await props.params;
  const questId = params.questId;

  const quest = await prisma.quest.findUnique({
    where: { id: questId },
  });

  const registrations = await prisma.registration.findMany({
    where: { questId },
    include: {
      user: true,
      quest: true,
    },
    orderBy: { createdAt: "desc" }
  });

  if (!quest) {
    return (
      <div className="text-white">
        Quest not found.
        <Link href="/admin/quests" className="text-[#FF7A00] block mt-4">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/admin/quests" className="flex items-center gap-2 text-[#A78B7C] hover:text-[#FFB68B] transition-colors w-fit mb-4 font-mono text-[12px]">
          <ArrowLeft className="w-4 h-4" />
          BACK TO QUESTS
        </Link>
        <h1 className="font-sora font-extrabold text-[32px] text-[#FF7A00] mb-2 uppercase break-words">
          {quest.title} REGISTRATIONS
        </h1>
        <p className="font-mono text-[14px] text-[#E0C0AF] tracking-[1.2px]">
          MANAGE ALL REGISTRATIONS AND APPROVE PAYMENTS FOR THIS QUEST.
        </p>
      </div>

      <RegistrationAdminClient registrations={registrations} />
    </div>
  );
}
