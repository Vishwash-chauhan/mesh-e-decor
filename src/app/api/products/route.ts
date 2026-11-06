import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/data/products";

const COOKIE_NAME = "admin_auth_token";
const SESSION_VALUE = "authenticated_atelier_curator_session_token";
const MAX_FEATURED = 6;

async function isAuthenticated(req: Request): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (token && token.value === SESSION_VALUE) return true;

  // Alternatively accept header authorization: "Bearer <passcode>"
  const authHeader = req.headers.get("authorization");
  const expectedPasscode = process.env.ADMIN_PASSCODE || "meshedecor2026";
  if (authHeader && authHeader === `Bearer ${expectedPasscode}`) return true;

  return false;
}

export const dynamic = "force-dynamic";

async function ensureSeeded() {
  const count = await prisma.product.count();
  if (count === 0 && PRODUCTS.length > 0) {
    await prisma.product.createMany({
      data: PRODUCTS.map((p, idx) => ({
        id: p.id,
        code: p.code,
        price: p.price,
        numericPrice: p.numericPrice,
        category: p.category,
        categories: JSON.stringify(p.categories || [p.category]),
        image: p.image,
        images: JSON.stringify(p.images || []),
        description: p.description || "",
        featured: Boolean(p.featured),
        sortOrder: typeof p.sortOrder === "number" ? p.sortOrder : idx,
      })),
      skipDuplicates: true,
    });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get("admin") === "1";

    let dbProducts = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    if (dbProducts.length === 0) {
      await ensureSeeded();
      dbProducts = await prisma.product.findMany({
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      });
    }

    if (dbProducts.length === 0) {
      return NextResponse.json(PRODUCTS);
    }

    const formatted = dbProducts.map((p, index) => {
      let categoriesList: string[] = [];
      try {
        categoriesList = JSON.parse(p.categories || "[]");
      } catch {
        categoriesList = [p.category];
      }

      let imagesList: string[] = [];
      if (isAdmin) {
        try {
          imagesList = JSON.parse(p.images || "[]");
        } catch {
          imagesList = [];
        }
      }

      // Serve Base64 DB images via lightweight HTTP image route on storefront to keep JSON tiny
      const resolvedCoverImage =
        !isAdmin && p.image.startsWith("data:")
          ? `/api/products/${encodeURIComponent(p.code)}/image`
          : p.image;

      return {
        id: p.id,
        code: p.code,
        price: p.price,
        numericPrice: p.numericPrice,
        category: p.category,
        categories: categoriesList,
        image: resolvedCoverImage,
        ...(isAdmin ? { images: imagesList } : {}),
        description: p.description || "",
        featured: Boolean(p.featured),
        sortOrder: typeof p.sortOrder === "number" ? p.sortOrder : index,
      };
    });

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch products from database, falling back to static:", error);
    return NextResponse.json(PRODUCTS);
  }
}

export async function POST(req: Request) {
  try {
    const authed = await isAuthenticated(req);
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await ensureSeeded();

    const body = await req.json();
    const {
      code,
      price,
      numericPrice,
      category,
      categories,
      image,
      images,
      description,
      featured,
    } = body;

    const productCode = code ? String(code).trim().toUpperCase() : "";

    if (!productCode || !category) {
      return NextResponse.json(
        { error: "Product code and category are required" },
        { status: 400 }
      );
    }

    const isFeatured = Boolean(featured);
    if (isFeatured) {
      const featuredCount = await prisma.product.count({
        where: { featured: true },
      });
      if (featuredCount >= MAX_FEATURED) {
        return NextResponse.json(
          {
            error: `Featured Collection is limited to ${MAX_FEATURED} specimens. Please unstar an existing featured piece first.`,
          },
          { status: 400 }
        );
      }
    }

    // Clean numeric price
    const parsedNumeric =
      typeof numericPrice === "number"
        ? numericPrice
        : parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;

    const formattedPrice =
      price && price.startsWith("₹")
        ? price
        : `₹${parsedNumeric.toLocaleString("en-IN")}`;

    const categoriesArray = Array.isArray(categories)
      ? categories
      : [category];

    const imagesArray = Array.isArray(images) ? images : [];

    const minOrderAgg = await prisma.product.aggregate({
      _min: { sortOrder: true },
    });
    const nextSortOrder = (minOrderAgg._min.sortOrder ?? 1) - 1;

    const created = await prisma.product.create({
      data: {
        code: productCode,
        price: formattedPrice,
        numericPrice: parsedNumeric,
        category: category.trim(),
        categories: JSON.stringify(categoriesArray),
        image: image || "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        images: JSON.stringify(imagesArray),
        description: description || "",
        featured: isFeatured,
        sortOrder: nextSortOrder,
      },
    });

    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating product:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A product with this specimen code already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create product", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const authed = await isAuthenticated(req);
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { items, orderedIds } = body;

    if (Array.isArray(items) && items.length > 0) {
      await prisma.$transaction(
        items.map((item: { id: string; sortOrder: number }) =>
          prisma.product.update({
            where: { id: item.id },
            data: { sortOrder: Number(item.sortOrder) },
          })
        )
      );
      return NextResponse.json({ success: true });
    }

    if (Array.isArray(orderedIds) && orderedIds.length > 0) {
      await prisma.$transaction(
        orderedIds.map((id: string, idx: number) =>
          prisma.product.update({
            where: { id },
            data: { sortOrder: idx },
          })
        )
      );
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Expected items or orderedIds array" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error reordering products:", error);
    return NextResponse.json(
      { error: "Failed to reorder products", details: String(error) },
      { status: 500 }
    );
  }
}
