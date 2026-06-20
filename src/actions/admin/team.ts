"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "./shared";

export async function updateTeamMember(id: string, data: any) {
  await verifyAuth();
  await prisma.teamMember.update({ where: { id }, data });
  revalidatePath("/admin/team");
  revalidatePath("/dashboard/members");
}
