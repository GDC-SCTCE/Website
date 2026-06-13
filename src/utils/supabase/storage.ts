import { createClient } from "@/utils/supabase/client";

/**
 * Uploads an image to Supabase storage, optionally deleting an old image first.
 * @param file The File object to upload
 * @param bucket The Supabase storage bucket name
 * @param fileNamePrefix A prefix for the generated file name (e.g., username or context)
 * @param oldImageUrl The URL of an existing image to delete before uploading the new one
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  bucketAndPath: string, // e.g. 'team' or 'team/game'
  fileNamePrefix: string,
  oldImageUrl?: string | null
): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error("Only image files are allowed.");
  }

  const supabase = createClient();

  const [bucket, ...folders] = bucketAndPath.split('/');
  const folderPath = folders.length > 0 ? folders.join('/') + '/' : '';

  // Delete old image if it exists in our bucket
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
