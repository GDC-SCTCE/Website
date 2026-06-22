"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyAuth, deleteImageIfPresent } from "./shared";

export async function createAlumni(data: { name: string; role: string; company: string; companyLink?: string; avatar?: string }) {
  await verifyAuth();
  await prisma.alumni.create({ data });
  revalidatePath("/admin/alumni");
  revalidatePath("/dashboard/leaderboard");
}

export async function updateAlumni(id: string, data: { name: string; role: string; company: string; companyLink?: string; avatar?: string }) {
  await verifyAuth();
  await prisma.alumni.update({ where: { id }, data });
  revalidatePath("/admin/alumni");
  revalidatePath("/dashboard/leaderboard");
}

export async function deleteAlumni(id: string) {
  await verifyAuth();
  const alumnus = await prisma.alumni.findUnique({ where: { id } });
  if (alumnus?.avatar) await deleteImageIfPresent(alumnus.avatar, "alumni");
  await prisma.alumni.delete({ where: { id } });
  revalidatePath("/admin/alumni");
  revalidatePath("/dashboard/leaderboard");
}

export async function deleteAllAlumni() {
  await verifyAuth();
  const alumni = await prisma.alumni.findMany({ where: { avatar: { not: null } } });
  for (const a of alumni) {
    if (a.avatar) await deleteImageIfPresent(a.avatar, "alumni");
  }
  await prisma.alumni.deleteMany({});
  revalidatePath("/admin/alumni");
  revalidatePath("/dashboard/leaderboard");
}
