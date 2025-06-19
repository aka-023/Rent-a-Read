// src/app/api/add/upload_image/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IncomingForm, File as FormidableFile } from "formidable";
import cloudinary from "@/lib/cloudinary";
import fs from "fs";

// 1) Tell Next.js not to parse the body (we’ll do it ourselves)
export const config = {
  api: {
    bodyParser: false,
  },
};

// 2) Parse exactly one file from the incoming request
async function parseSingleFile(req: NextRequest): Promise<FormidableFile> {
  const form = new IncomingForm({ multiples: false });

  return new Promise((resolve, reject) => {
    // Formidable expects a Node IncomingMessage; NextRequest is close enough
    form.parse(req as any, (_err, _fields, files) => {
      // files.image is guaranteed a single File, because multiples:false
      const file = files.image as FormidableFile;
      if (!file) {
        return reject(new Error("No file uploaded under field ‘image’"));
      }
      resolve(file);
    });
  });
}

// 3) Handle the POST
export async function POST(request: NextRequest) {
  try {
    // ✂️  parse the uploaded file
    const file = await parseSingleFile(request);

    // ✂️  upload its temp path to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.filepath, {
      folder: "inkspire-books",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    });

    // ✂️  delete the temp file
    fs.unlinkSync(file.filepath);

    // ✂️  return the URL
    return NextResponse.json({ imageUrl: uploadResult.secure_url });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
