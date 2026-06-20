"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "./shared";

export async function approveRegistration(userId: string, questId: string) {
  await verifyAuth();
  await prisma.registration.update({
    where: { userId_questId: { userId, questId } },
    data: { status: "REGISTERED" }
  });
  
  // Increment seats taken
  await prisma.quest.update({
    where: { id: questId },
    data: { seatsTaken: { increment: 1 } }
  });
  
  revalidatePath("/admin/registrations");
  revalidatePath("/");
  revalidatePath("/dashboard/quests");
}

export async function rejectRegistration(userId: string, questId: string) {
  await verifyAuth();
  await prisma.registration.delete({
    where: { userId_questId: { userId, questId } }
  });
  revalidatePath("/admin/registrations");
  revalidatePath("/");
  revalidatePath("/dashboard/quests");
}
