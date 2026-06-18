"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyAuth, deleteImageIfPresent } from "./shared";

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
