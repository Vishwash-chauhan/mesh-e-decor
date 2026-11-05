import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/data/products";

export const dynamic = "force-dynamic";

function buildPublicImageUrl(baseUrl: string, code: string, image: string): string {
  if (image.startsWith("/")) {
    return `${baseUrl}${encodeURI(image)}`;
  }
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${baseUrl}/api/products/${encodeURIComponent(code)}/image`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  let productList: Array<{
    code: string;
    image: string;
    updatedAt?: Date;
  }> = [];

  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: {
        code: true,
        image: true,
        updatedAt: true,
      },
    });
    if (dbProducts.length > 0) {
      productList = dbProducts;
    }
  } catch {
    // Fallback to static PRODUCTS
  }

  if (productList.length === 0) {
    productList = PRODUCTS.map((p) => ({
      code: p.code,
      image: p.image,
    }));
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/catalogue`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = productList.map((p) => ({
    url: `${baseUrl}/products/${encodeURIComponent(p.code)}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
    images: [buildPublicImageUrl(baseUrl, p.code, p.image)],
  }));

  return [...staticRoutes, ...productRoutes];
}

