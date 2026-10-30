import { PrismaClient } from "@prisma/client"

const createPrismaClient = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  })

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// In development, ensure the cached instance has current models (like user, canvas, annotation).
// If models are missing (e.g. after schema migration or prisma generate), re-instantiate.
const isPrismaClientCurrent = (client: PrismaClient | undefined): boolean => {
  if (!client) return false
  return "user" in client && "canvas" in client && "annotation" in client
}

export const prisma =
  isPrismaClientCurrent(globalForPrisma.prisma)
    ? (globalForPrisma.prisma as PrismaClient)
    : createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
