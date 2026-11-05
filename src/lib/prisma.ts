import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prismaClientInstance: PrismaClient | undefined;
  prismaDatabaseUrl: string | undefined;
};

const currentUrl = process.env.DATABASE_URL;

export const prisma =
  globalForPrisma.prismaClientInstance &&
  globalForPrisma.prismaDatabaseUrl === currentUrl
    ? globalForPrisma.prismaClientInstance
    : new PrismaClient({
        datasources: currentUrl ? { db: { url: currentUrl } } : undefined,
        log:
          process.env.NODE_ENV === "development"
            ? ["warn", "error"]
            : ["error"],
      });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaClientInstance = prisma;
  globalForPrisma.prismaDatabaseUrl = currentUrl;
}

export default prisma;
