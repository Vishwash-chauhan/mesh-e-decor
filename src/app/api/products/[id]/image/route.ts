import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/data/products";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id).trim();

  let imageUrl: string | undefined;

  try {
    const dbProduct = await prisma.product.findFirst({
      where: {
        OR: [{ id: decodedId }, { code: decodedId.toUpperCase() }],
      },
      select: { image: true },
    });
    if (dbProduct?.image) {
      imageUrl = dbProduct.image;
    }
  } catch {
    // Fallback to static PRODUCTS if DB query fails
  }

  if (!imageUrl) {
    const staticProduct = PRODUCTS.find(
      (p) =>
        p.id === decodedId ||
        p.code.toLowerCase() === decodedId.toLowerCase()
    );
    imageUrl = staticProduct?.image;
  }

  if (!imageUrl) {
    return NextResponse.redirect(new URL("/logo.jpg", req.url));
  }

  // 1. Handle Base64 data URLs (stored in Postgres from Admin uploads)
  if (imageUrl.startsWith("data:")) {
    const match = imageUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      const mimeType = match[1] || "image/jpeg";
      const buffer = Buffer.from(match[2], "base64");
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": mimeType,
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    }
  }

  // 2. Handle local public folder paths (e.g. /catalog/JG-002.png)
  if (imageUrl.startsWith("/")) {
    try {
      const filePath = path.join(
        process.cwd(),
        "public",
        decodeURIComponent(imageUrl)
      );
      const fileBuffer = await readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const mimeType =
        ext === ".png"
          ? "image/png"
          : ext === ".webp"
          ? "image/webp"
          : "image/jpeg";

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": mimeType,
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    } catch {
      return NextResponse.redirect(new URL(encodeURI(imageUrl), req.url));
    }
  }

  // 3. Handle external URLs
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return NextResponse.redirect(imageUrl);
  }

  return NextResponse.redirect(new URL("/logo.jpg", req.url));
}

