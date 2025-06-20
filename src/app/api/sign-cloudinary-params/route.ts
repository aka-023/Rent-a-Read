// src/app/api/sign-cloudinary-params/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  const { paramsToSign } = await req.json();
  if (!paramsToSign) {
    return NextResponse.json({ error: "Missing paramsToSign" }, { status: 400 });
  }

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!
  );
  return NextResponse.json({ signature });
}
