import { NextResponse } from "next/server";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "s21m3wpb";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "업로드할 파일이 없습니다." },
        { status: 400 }
      );
    }

    if (!token) {
      return NextResponse.json(
        { success: false, message: ".env.local에 SANITY_API_TOKEN 이 설정되어 있지 않습니다." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/assets/images/${dataset}?filename=${encodeURIComponent(
      file.name
    )}`;

    const sanityRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": file.type || "image/jpeg",
        Authorization: `Bearer ${token}`,
      },
      body: buffer,
    });

    if (!sanityRes.ok) {
      const errText = await sanityRes.text();
      throw new Error(`Sanity Asset Upload Failed (${sanityRes.status}): ${errText}`);
    }

    const data = await sanityRes.json();
    const asset = data.document;

    return NextResponse.json({
      success: true,
      assetId: asset._id,
      url: asset.url,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "이미지 업로드 실패" },
      { status: 500 }
    );
  }
}
