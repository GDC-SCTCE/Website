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
  
  revalidatePath(`/admin/quests/${questId}/registrations`);
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

  revalidatePath(`/admin/quests/${questId}/registrations`);
  revalidatePath("/");
  revalidatePath("/dashboard/quests");
}

export async function updateAttendance(userId: string, questId: string, status: "ATTENDED" | "NOT_ATTENDED", points: number = 0) {
  await verifyAuth();

  const reg = await prisma.registration.findUnique({
    where: { userId_questId: { userId, questId } }
  });

  if (!reg) return;

  if (status === "ATTENDED") {
    const pointDiff = points - reg.pointsAwarded;
    await prisma.$transaction([
      prisma.registration.update({
        where: { id: reg.id },
        data: { status: "ATTENDED", pointsAwarded: points }
      }),
      prisma.user.update({
        where: { id: userId },
        data: { score: { increment: pointDiff } }
      })
    ]);
  } else {
    // NOT_ATTENDED
    await prisma.$transaction([
      prisma.registration.update({
        where: { id: reg.id },
        data: { status: "NOT_ATTENDED", pointsAwarded: 0 }
      }),
      prisma.user.update({
        where: { id: userId },
        data: { score: { decrement: reg.pointsAwarded } }
      })
    ]);
  }

  revalidatePath(`/admin/quests/${questId}/registrations`);
  revalidatePath("/");
  revalidatePath("/dashboard/quests");
  revalidatePath("/dashboard/leaderboard");
}
