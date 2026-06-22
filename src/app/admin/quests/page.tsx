import prisma from "@/lib/prisma";
import QuestAdminClient from "./QuestAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminQuests() {
  const quests = await prisma.quest.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-sora font-extrabold text-[32px] text-[#FF7A00] mb-2">QUEST ARCHIVE</h1>
        <p className="font-mono text-[14px] text-[#E0C0AF] tracking-[1.2px]">
          MANAGE ALL ACTIVE QUESTS IN THE SYSTEM.
        </p>
      </div>

      <QuestAdminClient quests={quests} />
    </div>
  );
}
