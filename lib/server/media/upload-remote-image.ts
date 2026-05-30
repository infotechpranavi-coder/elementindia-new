import { CLOUDINARY_UPLOAD_FOLDER, getCloudinary } from "@/lib/server/media/cloudinary";

export function isCloudinaryUrl(url: string) {
  return url.includes("res.cloudinary.com");
}

export async function uploadRemoteImageToCloudinary(imageUrl: string) {
  const cloudinary = getCloudinary();
  const result = await cloudinary.uploader.upload(imageUrl, {
    folder: CLOUDINARY_UPLOAD_FOLDER,
    resource_type: "image",
  });
  if (!result.secure_url) {
    throw new Error("Cloudinary upload returned no URL.");
  }
  return result.secure_url;
}
