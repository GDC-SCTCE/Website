"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { validateUserData } from "@/utils/validation";

export async function syncUserToDatabase(data: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) throw new Error("Not authenticated");

  // Check if admin
  if (process.env.ADMIN_EMAILS?.includes(user.email)) {
    return { success: true, isAdmin: true };
  }

  let dbUser = await prisma.user.findUnique({ where: { email: user.email } });
  
  if (!dbUser && data) {
    const validationError = validateUserData({
      fullName: data.fullName,
      phone: data.phone,
      rollNo: data.rollNo,
      selectedTools: data.selectedTools
    });

    if (validationError) {
      throw new Error(validationError);
    }

    dbUser = await prisma.user.create({
      data: {
        id: user.id, // match supabase auth id
        email: user.email,
        fullName: data.fullName,
        phone: data.phone,
        rollNo: data.rollNo,
        academicYear: data.year,
        tools: data.selectedTools,
        xpLevel: data.xpLevel
      }
    });
  } else if (!dbUser && !data) {
    throw new Error("User not found in database. Please sign up.");
  }

  return { success: true, user: dbUser };
}

export async function verifyUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) return null;
  
  const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
  return dbUser;
}

export async function verifyAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) return false;
  
  const adminEmails = process.env.ADMIN_EMAILS || "";
  return adminEmails.includes(user.email);
}
