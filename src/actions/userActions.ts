"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyUser } from "./authActions";

export async function checkUserExists(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true }
  });
  return !!user;
}

export async function registerForQuest(questId: string, upiRef?: string) {
  const user = await verifyUser();
  if (!user) throw new Error("Unauthorized");

  const quest = await prisma.quest.findUnique({ where: { id: questId } });
  if (!quest) throw new Error("Quest not found");

  if (quest.capacity && quest.seatsTaken >= quest.capacity) {
    throw new Error("Quest is full");
  }

  // Check if already registered
  const existing = await prisma.registration.findUnique({
    where: {
      userId_questId: {
        userId: user.id,
        questId: questId,
      }
    }
  });

  if (existing) {
    throw new Error("Already registered for this quest.");
  }

  const status = quest.price > 0 ? "PENDING" : "REGISTERED";

  await prisma.registration.create({
    data: {
      userId: user.id,
      questId: questId,
      status: status,
      upiRef: upiRef || null,
    }
  });

  if (status === "REGISTERED") {
    await prisma.quest.update({
      where: { id: questId },
      data: { seatsTaken: { increment: 1 } },
    });
  }

  revalidatePath("/dashboard/quests");
  return { success: true, status };
}
