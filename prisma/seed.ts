import { PrismaClient } from "@prisma/client";
import { PRODUCTS } from "../src/data/products";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding initial products into SQLite database...");

  for (const p of PRODUCTS) {
    await prisma.product.upsert({
      where: { code: p.code },
      update: {
        name: p.name,
        price: p.price,
        numericPrice: p.numericPrice,
        category: p.category,
        categories: JSON.stringify(p.categories || [p.category]),
        image: p.image,
        description: p.description || "",
        material: p.material || "",
        dimensions: p.dimensions || "",
      },
      create: {
        code: p.code,
        name: p.name,
        price: p.price,
        numericPrice: p.numericPrice,
        category: p.category,
        categories: JSON.stringify(p.categories || [p.category]),
        image: p.image,
        description: p.description || "",
        material: p.material || "",
        dimensions: p.dimensions || "",
      },
    });
  }

  const count = await prisma.product.count();
  console.log(`Seeding complete! Total products in database: ${count}`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
