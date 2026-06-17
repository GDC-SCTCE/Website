import { uploadAdminImage } from "@/actions/adminActions";

/**
 * Helper to handle image uploads for admin forms.
 * Abstracts away the FormData logic and error handling.
 * 
 * @param imageFile The File object to upload
 * @param bucketAndPath The bucket and path to upload to (e.g. "games" or "quests")
 * @param fileNamePrefix Prefix for the filename
 * @param oldImageUrl The previous image URL to delete, if any
 * @param setUploadError Function to set the upload error state
 * @returns The new public image URL, or null if upload failed
 */
export async function handleImageUpload(
  imageFile: File,
  bucketAndPath: string,
  fileNamePrefix: string,
  oldImageUrl: string | null,
  setUploadError: (err: string) => void
): Promise<string | null> {
  try {
    const uploadData = new FormData();
    uploadData.append("file", imageFile);
    uploadData.append("bucketAndPath", bucketAndPath);
    uploadData.append("fileNamePrefix", fileNamePrefix);
    if (oldImageUrl) {
      uploadData.append("oldImageUrl", oldImageUrl);
    }
    
    return await uploadAdminImage(uploadData);
  } catch (err: any) {
    setUploadError(`Upload failed: ${err.message}`);
    return null;
  }
}
