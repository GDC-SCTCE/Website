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
  
  const reg = await prisma.registration.findUnique({
    where: { userId_questId: { userId, questId } }
  });

  if (!reg) return;

  await prisma.registration.update({
    where: { userId_questId: { userId, questId } },
    data: { status: "REJECTED" }
  });

  if (reg.status === "REGISTERED" || reg.status === "ATTENDED") {
    await prisma.quest.update({
      where: { id: questId },
      data: { seatsTaken: { decrement: 1 } }
    });
  }

  revalidatePath("/admin/registrations");
  revalidatePath("/");
  revalidatePath("/dashboard/quests");
}

export async function updateAttendance(userId: string, questId: string, status: "ATTENDED" | "NOT_ATTENDED") {
  await verifyAuth();
  await prisma.registration.update({
    where: { userId_questId: { userId, questId } },
    data: { status }
  });
  revalidatePath("/admin/registrations");
  revalidatePath("/");
  revalidatePath("/dashboard/quests");
}
