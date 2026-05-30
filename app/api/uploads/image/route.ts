import { NextResponse } from "next/server";
import { CLOUDINARY_UPLOAD_FOLDER, getCloudinary } from "@/lib/server/media/cloudinary";
import { uploadRemoteImageToCloudinary } from "@/lib/server/media/upload-remote-image";

async function uploadFileBuffer(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const cloudinary = getCloudinary();

  return new Promise<string>((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: CLOUDINARY_UPLOAD_FOLDER,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(error || new Error("Upload failed."));
          return;
        }
        resolve(result.secure_url);
      },
    );

    upload.end(buffer);
  });
}

async function uploadImageUrl(imageUrl: string) {
  return uploadRemoteImageToCloudinary(imageUrl);
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const imageUrlRaw = form.get("imageUrl");
    let secureUrl = "";

    if (file instanceof File && file.size > 0) {
      secureUrl = await uploadFileBuffer(file);
    } else if (typeof imageUrlRaw === "string" && imageUrlRaw.trim()) {
      secureUrl = await uploadImageUrl(imageUrlRaw.trim());
    } else {
      return NextResponse.json(
        { error: "Provide a file upload or image URL." },
        { status: 400 },
      );
    }

    return NextResponse.json({ url: secureUrl }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Image upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
