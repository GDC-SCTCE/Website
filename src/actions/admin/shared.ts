"use server";

import { verifyAdmin } from "../authActions";
import { supabaseAdmin } from "@/lib/supabase";

export async function verifyAuth() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) throw new Error("Unauthorized");
}

export async function deleteImageIfPresent(imageUrl: string | null, bucket: string) {
  if (imageUrl && imageUrl.includes(`/public/${bucket}/`)) {
    const filePath = imageUrl.split(`/public/${bucket}/`)[1];
    if (filePath) {
      await supabaseAdmin.storage.from(bucket).remove([decodeURIComponent(filePath)]);
    }
  }
}
