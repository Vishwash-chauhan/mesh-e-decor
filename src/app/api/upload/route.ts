import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;

    const allFilesToProcess: File[] = [];
    if (singleFile && singleFile instanceof File && singleFile.size > 0) {
      allFilesToProcess.push(singleFile);
    }
    if (files && files.length > 0) {
      for (const f of files) {
        if (f instanceof File && f.size > 0 && !allFilesToProcess.includes(f)) {
          allFilesToProcess.push(f);
        }
      }
    }

    if (allFilesToProcess.length === 0) {
      return NextResponse.json(
        { error: "No image files provided for upload" },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];

    for (const file of allFilesToProcess) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: `File "${file.name}" is not an image. Please upload JPG, PNG, WEBP, or AVIF.` },
          { status: 400 }
        );
      }

      // Max 15MB size limit
      if (file.size > 15 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds the maximum 15MB limit.` },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = file.type || "image/jpeg";
      const dataUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;

      uploadedUrls.push(dataUrl);
    }

    return NextResponse.json({
      success: true,
      url: uploadedUrls[0],
      urls: uploadedUrls,
      count: uploadedUrls.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Image upload failed on server", details: String(error) },
      { status: 500 }
    );
  }
}
