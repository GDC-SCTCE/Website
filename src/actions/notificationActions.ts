"use server";

import prisma from "@/lib/prisma";
import { verifyUser } from "@/actions/authActions";

export async function registerForNotification(questId: string) {
  const user = await verifyUser();
  if (!user || !user.email) {
    throw new Error("Not authenticated");
  }

  if (!questId) {
    throw new Error("Quest ID is required");
  }

  try {
    await prisma.questNotification.create({
      data: {
        email: user.email,
        questId,
      },
    });
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: true, message: "Already registered" };
    }
    console.error("Failed to register notification:", error);
    throw new Error("Failed to register for notifications");
  }
}
