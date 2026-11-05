import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/data/products";

export const dynamic = "force-dynamic";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildPublicImageUrl(baseUrl: string, code: string, image: string): string {
  if (image.startsWith("/")) {
    return `${baseUrl}${encodeURI(image)}`;
  }
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${baseUrl}/api/products/${encodeURIComponent(code)}/image`;
}

export async function GET() {
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  let items: Array<{
    code: string;
    numericPrice: number;
    category: string;
    image: string;
    description?: string | null;
  }> = [];

  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: {
        code: true,
        numericPrice: true,
        category: true,
        image: true,
        description: true,
      },
    });
    if (dbProducts.length > 0) {
      items = dbProducts;
    }
  } catch {
    // Fallback to static PRODUCTS if DB is unavailable
  }

  if (items.length === 0) {
    items = PRODUCTS;
  }

  const xmlItems = items
    .map((p) => {
      const productUrl = `${baseUrl}/products/${encodeURIComponent(p.code)}`;
      const imageUrl = buildPublicImageUrl(baseUrl, p.code, p.image);
      const title = `${p.code} — Handcrafted ${p.category} | Mesh ‘E’ Decor`;
      const description =
        p.description && p.description.trim().length > 0
          ? p.description.trim()
          : `Handcrafted luxury ${p.category.toLowerCase()} specimen (${p.code}) by Mesh ‘E’ Decor.`;
      const priceInr = `${Number(p.numericPrice || 0).toFixed(2)} INR`;

      return `    <item>
      <g:id>${escapeXml(p.code)}</g:id>
      <g:title>${escapeXml(title)}</g:title>
      <g:description>${escapeXml(description)}</g:description>
      <g:link>${escapeXml(productUrl)}</g:link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>${escapeXml(priceInr)}</g:price>
      <g:brand>Mesh ‘E’ Decor</g:brand>
      <g:mpn>${escapeXml(p.code)}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
      <g:product_type>${escapeXml(`Home & Garden > Decor > ${p.category}`)}</g:product_type>
      <g:google_product_category>Home &amp; Garden &gt; Decor</g:google_product_category>
      <g:shipping>
        <g:country>IN</g:country>
        <g:service>Express Insured Shipping</g:service>
        <g:price>0.00 INR</g:price>
      </g:shipping>
    </item>`;
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Mesh ‘E’ Decor — Haute Artisanal Decor &amp; Luxury Gifting</title>
    <link>${escapeXml(baseUrl)}</link>
    <description>Official Google Merchant product feed for Mesh ‘E’ Decor handcrafted brassware, silver-plated decor, and bespoke luxury gifts.</description>
${xmlItems}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, s-maxage=1800",
    },
  });
}

