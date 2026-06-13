"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

async function verifyAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
}

// QUESTS
export async function createQuest(data: any) {
  await verifyAuth();
  await prisma.quest.create({ data });
  revalidatePath("/admin/quests");
}

export async function updateQuest(id: string, data: any) {
  await verifyAuth();
  await prisma.quest.update({ where: { id }, data });
  revalidatePath("/admin/quests");
}

export async function deleteQuest(id: string) {
  await verifyAuth();
  await prisma.quest.delete({ where: { id } });
  revalidatePath("/admin/quests");
}

export async function deleteAllQuests() {
  await verifyAuth();
  await prisma.quest.deleteMany({});
  revalidatePath("/admin/quests");
}

// GAMES
export async function createGame(data: any) {
  await verifyAuth();
  await prisma.game.create({ data });
  revalidatePath("/admin/games");
}

export async function updateGame(id: string, data: any) {
  await verifyAuth();
  await prisma.game.update({ where: { id }, data });
  revalidatePath("/admin/games");
}

export async function deleteGame(id: string) {
  await verifyAuth();
  await prisma.game.delete({ where: { id } });
  revalidatePath("/admin/games");
}

// TEAM MEMBERS
export async function createTeamMember(data: any) {
  await verifyAuth();
  await prisma.teamMember.create({ data });
  revalidatePath("/admin/team");
}

export async function updateTeamMember(id: string, data: any) {
  await verifyAuth();
  await prisma.teamMember.update({ where: { id }, data });
  revalidatePath("/admin/team");
}

export async function deleteTeamMember(id: string) {
  await verifyAuth();
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/admin/team");
}
