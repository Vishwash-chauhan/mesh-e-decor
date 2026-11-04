import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "admin_auth_token";
const SESSION_VALUE = "authenticated_atelier_curator_session_token";
const MAX_FEATURED = 6;

async function isAuthenticated(req: Request): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (token && token.value === SESSION_VALUE) return true;

  const authHeader = req.headers.get("authorization");
  const expectedPasscode = process.env.ADMIN_PASSCODE || "meshedecor2026";
  if (authHeader && authHeader === `Bearer ${expectedPasscode}`) return true;

  return false;
}

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { code: id.toUpperCase() }],
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let categoriesList: string[] = [];
    try {
      categoriesList = JSON.parse(product.categories || "[]");
    } catch {
      categoriesList = [product.category];
    }

    let imagesList: string[] = [];
    try {
      imagesList = JSON.parse(product.images || "[]");
    } catch {
      imagesList = [];
    }

    return NextResponse.json({
      ...product,
      categories: categoriesList,
      images: imagesList,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to find product", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated(req);
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { id } = await params;

  try {
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

    // Find the record first by id or code
    const existing = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { code: id.toUpperCase() }],
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check max featured limit if turning featured on
    if (featured === true && !existing.featured) {
      const featuredCount = await prisma.product.count({
        where: {
          featured: true,
          id: { not: existing.id },
        },
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

    const newCode = code ? code.trim().toUpperCase() : undefined;

    const hasPriceUpdate = price !== undefined || numericPrice !== undefined;
    const parsedNumeric = hasPriceUpdate
      ? typeof numericPrice === "number"
        ? numericPrice
        : parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0
      : existing.numericPrice;

    const formattedPrice = hasPriceUpdate
      ? price && String(price).startsWith("₹")
        ? String(price)
        : `₹${parsedNumeric.toLocaleString("en-IN")}`
      : existing.price;

    const categoriesJson =
      categories !== undefined
        ? JSON.stringify(Array.isArray(categories) ? categories : [category || existing.category])
        : category !== undefined
        ? JSON.stringify([category])
        : existing.categories;

    const updated = await prisma.product.update({
      where: { id: existing.id },
      data: {
        ...(newCode ? { code: newCode } : {}),
        price: formattedPrice,
        numericPrice: parsedNumeric,
        ...(category ? { category: category.trim() } : {}),
        categories: categoriesJson,
        ...(image ? { image } : {}),
        ...(images !== undefined ? { images: JSON.stringify(Array.isArray(images) ? images : []) } : {}),
        description: description ?? existing.description,
        ...(featured !== undefined ? { featured: Boolean(featured) } : {}),
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated(req);
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const existing = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { code: id.toUpperCase() }],
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id: existing.id },
    });

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product", details: String(error) },
      { status: 500 }
    );
  }
}
