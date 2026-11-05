import type { Metadata } from "next";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/data/products";

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id).trim();

  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  let product: {
    code: string;
    price: string;
    category: string;
    image: string;
    description?: string | null;
  } | null = null;

  try {
    product = await prisma.product.findFirst({
      where: {
        OR: [{ id: decodedId }, { code: decodedId.toUpperCase() }],
      },
      select: {
        code: true,
        price: true,
        category: true,
        image: true,
        description: true,
      },
    });
  } catch {
    // Fallback to static PRODUCTS if DB is unreachable
  }

  if (!product) {
    const staticMatch = PRODUCTS.find(
      (p) =>
        p.id === decodedId ||
        p.code.toLowerCase() === decodedId.toLowerCase()
    );
    if (staticMatch) {
      product = staticMatch;
    }
  }

  if (!product) {
    return {
      title: "Specimen Not Found | Mesh ‘E’ Decor",
    };
  }

  const title = `${product.code} — ${product.price} | Mesh ‘E’ Decor`;
  const description = `${product.code} • Price: ${product.price} • ${product.category}. ${
    product.description ||
    "Handcrafted luxury brassware and silver-plated decor by Mesh ‘E’ Decor."
  }`;

  // Build an HTTP(S) image URL that WhatsApp & social crawlers can fetch directly
  let ogImageUrl = `${baseUrl}/api/products/${encodeURIComponent(
    product.code
  )}/image`;
  if (product.image.startsWith("/")) {
    ogImageUrl = `${baseUrl}${encodeURI(product.image)}`;
  } else if (
    product.image.startsWith("http://") ||
    product.image.startsWith("https://")
  ) {
    ogImageUrl = product.image;
  }

  const productUrl = `${baseUrl}/products/${encodeURIComponent(product.code)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: productUrl,
      siteName: "Mesh ‘E’ Decor",
      images: [
        {
          url: ogImageUrl,
          width: 800,
          height: 800,
          alt: `${product.code} — ${product.price}`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return <>{children}</>;
}

