"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { validateUserData } from "@/utils/validation";
import { cache } from "react";

export async function syncUserToDatabase(data: any, accessToken?: string) {
  const supabase = await createClient();
  
  let user;
  if (accessToken) {
    const { data: userData } = await supabase.auth.getUser(accessToken);
    user = userData?.user;
  } else {
    const { data: userData } = await supabase.auth.getUser();
    user = userData?.user;
  }

  if (!user || !user.email) throw new Error("Not authenticated");

  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) ?? [];
  if (adminEmails.includes(user.email)) {
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

export const verifyUser = cache(async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) return null;
  
  const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
  return dbUser;
});

export const verifyAdmin = cache(async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) return false;
  
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) ?? [];
  return adminEmails.includes(user.email);
});

export async function checkIsAdminEmail(email: string) {
  if (!email) return false;
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) ?? [];
  return adminEmails.includes(email);
}
