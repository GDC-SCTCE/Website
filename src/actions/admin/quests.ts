"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyAuth, deleteImageIfPresent } from "./shared";
import { getQuestEmailTemplate } from "@/utils/emailTemplates";

export async function createQuest(data: any) {
  await verifyAuth();
  await prisma.quest.create({ data });
  revalidatePath("/admin/quests");
  revalidatePath("/");
  revalidatePath("/dashboard/quests");
}

export async function updateQuest(id: string, data: any) {
  await verifyAuth();
  
  const oldQuest = await prisma.quest.findUnique({ where: { id } });
  
  await prisma.quest.update({ where: { id }, data });

  if (oldQuest && oldQuest.status !== "ACTIVE" && data.status === "ACTIVE") {
    // Quest just became ACTIVE!
    const notifications = await prisma.questNotification.findMany({ where: { questId: id } });
    if (notifications.length > 0) {
      const apiKey = process.env.BREVO_API_KEY;
      const senderEmail = process.env.BREVO_FROM_EMAIL;
      
      if (apiKey) {
        try {
          await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              "api-key": apiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sender: { name: "GDC SCTCE", email: senderEmail },
              subject: `Quest is Live: ${data.title || oldQuest.title}!`,
              htmlContent: getQuestEmailTemplate(data.title || oldQuest.title, id, data.category || oldQuest.category),
              messageVersions: notifications.map(n => ({
                to: [{ email: n.email }]
              }))
            })
          });
          
          await prisma.questNotification.deleteMany({ where: { questId: id } });
        } catch (e) {
          console.error("Failed to send Brevo notifications", e);
        }
      } else {
        console.warn("BREVO_API_KEY not configured");
      }
    }
  }

  revalidatePath("/admin/quests");
  revalidatePath("/");
  revalidatePath("/dashboard/quests");
}

export async function deleteQuest(id: string) {
  await verifyAuth();
  const quest = await prisma.quest.findUnique({ where: { id } });
  if (quest?.image) await deleteImageIfPresent(quest.image, "quests");
  await prisma.quest.delete({ where: { id } });
  revalidatePath("/admin/quests");
  revalidatePath("/");
  revalidatePath("/dashboard/quests");
}

export async function deleteAllQuests() {
  await verifyAuth();
  const quests = await prisma.quest.findMany({ where: { image: { not: null } } });
  for (const q of quests) {
    if (q.image) await deleteImageIfPresent(q.image, "quests");
  }
  await prisma.quest.deleteMany({});
  revalidatePath("/admin/quests");
  revalidatePath("/");
  revalidatePath("/dashboard/quests");
}

export async function getPaginatedAdminQuests(
  page: number,
  pageSize: number,
  search: string,
  categoryFilter: string,
  statusFilter: string
) {
  await verifyAuth();

  const whereClause: any = {};
  
  if (search) {
    whereClause.title = { contains: search, mode: "insensitive" };
  }
  if (categoryFilter !== "All") {
    whereClause.category = categoryFilter;
  }
  if (statusFilter !== "ALL") {
    whereClause.status = statusFilter;
  }

  const [quests, totalCount] = await Promise.all([
    prisma.quest.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip: page * pageSize,
      take: pageSize,
      include: { ratings: true }
    }),
    prisma.quest.count({ where: whereClause })
  ]);

  return { quests, totalCount };
}
