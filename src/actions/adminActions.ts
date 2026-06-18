"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "./authActions";
import { supabaseAdmin } from "@/lib/supabase";

async function verifyAuth() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) throw new Error("Unauthorized");
}

async function deleteImageIfPresent(imageUrl: string | null, bucket: string) {
  if (imageUrl && imageUrl.includes(`/public/${bucket}/`)) {
    const filePath = imageUrl.split(`/public/${bucket}/`)[1];
    if (filePath) {
      await supabaseAdmin.storage.from(bucket).remove([decodeURIComponent(filePath)]);
    }
  }
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
  const quest = await prisma.quest.findUnique({ where: { id } });
  if (quest?.image) await deleteImageIfPresent(quest.image, "quests");
  await prisma.quest.delete({ where: { id } });
  revalidatePath("/admin/quests");
}

export async function deleteAllQuests() {
  await verifyAuth();
  const quests = await prisma.quest.findMany({ where: { image: { not: null } } });
  for (const q of quests) {
    if (q.image) await deleteImageIfPresent(q.image, "quests");
  }
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
  const game = await prisma.game.findUnique({ where: { id } });
  if (game?.coverUrl) await deleteImageIfPresent(game.coverUrl, "games");
  await prisma.game.delete({ where: { id } });
  revalidatePath("/admin/games");
}

export async function deleteAllGames() {
  await verifyAuth();
  const games = await prisma.game.findMany({ where: { coverUrl: { not: null } } });
  for (const g of games) {
    if (g.coverUrl) await deleteImageIfPresent(g.coverUrl, "games");
  }
  await prisma.game.deleteMany({});
  revalidatePath("/admin/games");
}

export async function setEditorsChoiceGame(id: string) {
  await verifyAuth();
  // Set the current editor's pick(s) to false first
  await prisma.game.updateMany({
    where: { isEditorsChoice: true },
    data: { isEditorsChoice: false },
  });
  // Set the specific one to true
  await prisma.game.update({
    where: { id },
    data: { isEditorsChoice: true },
  });
  revalidatePath("/admin/games");
  revalidatePath("/dashboard/arcade");
}

// TEAM MEMBERS

export async function updateTeamMember(id: string, data: any) {
  await verifyAuth();
  await prisma.teamMember.update({ where: { id }, data });
  revalidatePath("/admin/team");
}

// REGISTRATIONS
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
  revalidatePath("/dashboard/quests");
}

export async function rejectRegistration(userId: string, questId: string) {
  await verifyAuth();
  await prisma.registration.delete({
    where: { userId_questId: { userId, questId } }
  });
  revalidatePath("/admin/registrations");
}

export async function uploadAdminImage(formData: FormData) {
  await verifyAuth();

  const file = formData.get("file") as File;
  const bucketAndPath = formData.get("bucketAndPath") as string;
  const fileNamePrefix = formData.get("fileNamePrefix") as string;
  const oldImageUrl = formData.get("oldImageUrl") as string | null;

  if (!file || !file.type.startsWith('image/')) {
    throw new Error("Only image files are allowed.");
  }

  const supabase = supabaseAdmin;

  const [bucket, ...folders] = bucketAndPath.split('/');
  const folderPath = folders.length > 0 ? folders.join('/') + '/' : '';

  if (oldImageUrl && oldImageUrl.includes(`/public/${bucket}/`)) {
    const oldFilePath = oldImageUrl.split(`/public/${bucket}/`)[1];
    if (oldFilePath) {
      await supabase.storage.from(bucket).remove([decodeURIComponent(oldFilePath)]);
    }
  }

  const fileExt = file.name.split('.').pop() || 'png';
  const sanitizedPrefix = fileNamePrefix.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const fileName = `${folderPath}${sanitizedPrefix}_${Date.now()}.${fileExt}`;

  const { error: uploadErr } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (uploadErr) {
    throw new Error(uploadErr.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
