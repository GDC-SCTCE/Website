"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyAuth, deleteImageIfPresent } from "./shared";

export async function createQuest(data: any) {
  await verifyAuth();
  await prisma.quest.create({ data });
  revalidatePath("/admin/quests");
  revalidatePath("/");
  revalidatePath("/dashboard/quests");
}

export async function updateQuest(id: string, data: any) {
  await verifyAuth();
  await prisma.quest.update({ where: { id }, data });
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
