import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/data/products";

const COOKIE_NAME = "admin_auth_token";
const SESSION_VALUE = "authenticated_atelier_curator_session_token";

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

export async function GET() {
  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (dbProducts.length === 0) {
      return NextResponse.json(PRODUCTS);
    }

    const formatted = dbProducts.map((p) => {
      let categoriesList: string[] = [];
      try {
        categoriesList = JSON.parse(p.categories || "[]");
      } catch {
        categoriesList = [p.category];
      }

      let imagesList: string[] = [];
      try {
        imagesList = JSON.parse(p.images || "[]");
      } catch {
        imagesList = [];
      }

      return {
        id: p.id,
        code: p.code,
        price: p.price,
        numericPrice: p.numericPrice,
        category: p.category,
        categories: categoriesList,
        image: p.image,
        images: imagesList,
        description: p.description || "",
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
    } = body;

    const productCode = code ? String(code).trim().toUpperCase() : "";

    if (!productCode || !category) {
      return NextResponse.json(
        { error: "Product code and category are required" },
        { status: 400 }
      );
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
