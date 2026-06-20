"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyAuth, deleteImageIfPresent } from "./shared";

export async function createTool(data: any) {
  await verifyAuth();
  await prisma.tool.create({ data });
  revalidatePath("/admin/tools");
  revalidatePath("/dashboard/inventory");
}

export async function updateTool(id: string, data: any) {
  await verifyAuth();
  await prisma.tool.update({ where: { id }, data });
  revalidatePath("/admin/tools");
  revalidatePath("/dashboard/inventory");
}

export async function deleteTool(id: string) {
  await verifyAuth();
  const tool = await prisma.tool.findUnique({ where: { id } });
  if (tool?.iconUrl) await deleteImageIfPresent(tool.iconUrl, "tools");
  await prisma.tool.delete({ where: { id } });
  revalidatePath("/admin/tools");
  revalidatePath("/dashboard/inventory");
}

export async function deleteAllTools() {
  await verifyAuth();
  const tools = await prisma.tool.findMany({ where: { iconUrl: { not: "" } } });
  for (const t of tools) {
    if (t.iconUrl) await deleteImageIfPresent(t.iconUrl, "tools");
  }
  await prisma.tool.deleteMany({});
  revalidatePath("/admin/tools");
  revalidatePath("/dashboard/inventory");
}
