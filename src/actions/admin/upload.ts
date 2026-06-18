"use server";

import { verifyAuth } from "./shared";
import { supabaseAdmin } from "@/lib/supabase";

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
