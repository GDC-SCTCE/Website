"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyUser } from "./authActions";

export async function toggleToolEquip(toolName: string) {
  const user = await verifyUser();
  if (!user) throw new Error("Unauthorized");

  const currentTools = user.tools || [];
  
  let newTools;
  if (currentTools.includes(toolName)) {
    // Unequip
    newTools = currentTools.filter((t: string) => t !== toolName);
  } else {
    // Equip
    newTools = [...currentTools, toolName];
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { tools: newTools }
  });

  revalidatePath("/dashboard/inventory");
  return newTools;
}
