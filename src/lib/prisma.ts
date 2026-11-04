import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prismaPostgresOrdered: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prismaPostgresOrdered ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaPostgresOrdered = prisma;
}

export default prisma;
