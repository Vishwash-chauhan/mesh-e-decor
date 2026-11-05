import type { Metadata } from "next";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/data/products";

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

async function resolveBaseUrl(): Promise<string> {
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

async function findProductRecord(rawId: string) {
  const decodedId = decodeURIComponent(rawId).trim();

  let product: {
    code: string;
    price: string;
    numericPrice: number;
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
        numericPrice: true,
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

  return product;
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const [baseUrl, product] = await Promise.all([
    resolveBaseUrl(),
    findProductRecord(id),
  ]);

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

  const ogImageUrl = buildPublicImageUrl(baseUrl, product.code, product.image);
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

export default async function ProductLayout({
  children,
  params,
}: ProductLayoutProps) {
  const { id } = await params;
  const [baseUrl, product] = await Promise.all([
    resolveBaseUrl(),
    findProductRecord(id),
  ]);

  if (!product) {
    return <>{children}</>;
  }

  const imageUrl = buildPublicImageUrl(baseUrl, product.code, product.image);
  const productUrl = `${baseUrl}/products/${encodeURIComponent(product.code)}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.code} — ${product.category} | Mesh ‘E’ Decor`,
    sku: product.code,
    mpn: product.code,
    image: [imageUrl],
    description:
      product.description ||
      "Handcrafted luxury brassware and silver-plated decor specimen by Mesh ‘E’ Decor.",
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Mesh ‘E’ Decor",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "INR",
      price: product.numericPrice,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Mesh ‘E’ Decor",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {children}
    </>
  );
}
