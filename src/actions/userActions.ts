"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyUser } from "./authActions";
import { XPLevel } from "@prisma/client";

export async function checkUserExists(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true }
  });
  return !!user;
}

export async function validateQuestRegistration(questId: string, teammates: string[] = []) {
  const user = await verifyUser();
  if (!user) throw new Error("Unauthorized");

  const quest = await prisma.quest.findUnique({ where: { id: questId } });
  if (!quest) throw new Error("Quest not found");

  const requiredSeats = 1 + teammates.length;
  if (quest.capacity && quest.seatsTaken + requiredSeats > quest.capacity) {
    throw new Error(`Quest is full or not enough seats for ${requiredSeats} members`);
  }

  const teamUsers = [];
  for (const email of teammates) {
    const tUser = await prisma.user.findUnique({ where: { email } });
    if (!tUser) throw new Error(`User with email ${email} is not registered on GDC.`);
    if (tUser.id === user.id) throw new Error(`You cannot add yourself as a teammate.`);
    teamUsers.push(tUser);
  }

  const allUserIds = [user.id, ...teamUsers.map(u => u.id)];
  
  const existing = await prisma.registration.findMany({
    where: { questId, userId: { in: allUserIds } }
  });

  if (existing.length > 0) {
    throw new Error("One or more team members are already registered for this quest.");
  }

  return { success: true };
}

export async function registerForQuest(questId: string, upiRef?: string, teamName?: string, teammates: string[] = []) {
  const user = await verifyUser();
  if (!user) throw new Error("Unauthorized");

  const quest = await prisma.quest.findUnique({ where: { id: questId } });
  if (!quest) throw new Error("Quest not found");

  const requiredSeats = 1 + teammates.length;
  if (quest.capacity && quest.seatsTaken + requiredSeats > quest.capacity) {
    throw new Error(`Quest is full or not enough seats for ${requiredSeats} members`);
  }

  // Validate teammates
  const teamUsers = [];
  for (const email of teammates) {
    const tUser = await prisma.user.findUnique({ where: { email } });
    if (!tUser) throw new Error(`User with email ${email} is not registered on GDC.`);
    if (tUser.id === user.id) throw new Error(`You cannot add yourself as a teammate.`);
    teamUsers.push(tUser);
  }

  const allUserIds = [user.id, ...teamUsers.map(u => u.id)];
  
  // Check if any is already registered
  const existing = await prisma.registration.findMany({
    where: { questId, userId: { in: allUserIds } }
  });

  if (existing.length > 0) {
    throw new Error("One or more team members are already registered for this quest.");
  }

  const status = quest.price > 0 ? "PENDING" : "REGISTERED";

  const data = allUserIds.map(uid => ({
    userId: uid,
    questId,
    status: status as any,
    upiRef: uid === user.id ? (upiRef || null) : null,
    teamName: teamName || null,
  }));

  await prisma.registration.createMany({ data });

  if (status === "REGISTERED") {
    await prisma.quest.update({
      where: { id: questId },
      data: { seatsTaken: { increment: requiredSeats } },
    });
  }

  revalidatePath("/dashboard/quests");
  return { success: true, status };
}

export async function updateUserProfile(data: {
  fullName: string;
  phone: string;
  rollNo: string;
  academicYear: string;
  tools: string[];
  xpLevel: XPLevel;
}) {
  const user = await verifyUser();
  if (!user) throw new Error("Unauthorized");

  const trimmedFullName = data.fullName.trim();
  const trimmedPhone = data.phone.trim();
  const trimmedRollNo = data.rollNo.trim();

  if (!trimmedFullName || !trimmedPhone || !trimmedRollNo) {
    throw new Error("Base stats cannot be empty.");
  }

  const rollNoRegex = /^SCT\d{2}[A-Z]{2}\d{3}$/i;
  if (!rollNoRegex.test(trimmedRollNo)) {
    throw new Error("Roll number must follow the format: SCT[Year][Branch][RollNo] (e.g., SCT22CS001).");
  }

  const phoneRegex = /^(\+?\d{1,4}[- ]?)?\d{10}$/;
  if (!phoneRegex.test(trimmedPhone)) {
    throw new Error("Please enter a valid 10-digit phone number.");
  }

  if (data.tools.length === 0) {
    throw new Error("Please select at least one development tool.");
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      fullName: trimmedFullName,
      phone: trimmedPhone,
      rollNo: trimmedRollNo.toUpperCase(),
      academicYear: data.academicYear,
      tools: data.tools,
      xpLevel: data.xpLevel,
    },
  });

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard/inventory");
  return { success: true, user: updatedUser };
}

