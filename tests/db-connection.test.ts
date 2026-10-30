import { describe, it } from "node:test"
import assert from "node:assert/strict"
import { prisma } from "../lib/db"

describe("Database & Prisma ORM Configuration", () => {
  it("should successfully execute a raw SQL query against PostgreSQL", async () => {
    const result = await prisma.$queryRaw<Array<{ connected: number }>>`SELECT 1 as connected`
    assert.ok(Array.isArray(result), "Expected query result to be an array")
    assert.strictEqual(result.length, 1, "Expected exactly 1 result row")
    assert.strictEqual(Number(result[0].connected), 1, "Expected connected to equal 1")
  })

  it("should connect to the Project model table and perform queries", async () => {
    const count = await prisma.project.count()
    assert.strictEqual(typeof count, "number", "Expected count to return a number")
    assert.ok(count >= 0, "Expected project count to be non-negative")
  })

  it("should ensure prisma client instance is a shared singleton", () => {
    const globalPrisma = (globalThis as unknown as { prisma: typeof prisma }).prisma
    if (process.env.NODE_ENV !== "production") {
      assert.strictEqual(globalPrisma, prisma, "Expected prisma to match global singleton")
    }
    assert.ok(prisma.$connect, "Expected prisma client to have $connect method")
    assert.ok(prisma.project, "Expected prisma client to have project delegate")
  })

  it("should gracefully catch database query errors without unhandled exceptions", async () => {
    await assert.rejects(
      async () => {
        // Query an intentionally non-existent table to verify error handling
        await prisma.$queryRaw`SELECT * FROM non_existent_table_for_testing_12345`
      },
      (err: Error) => {
        assert.ok(err.message.includes("non_existent_table_for_testing_12345") || err.name === "PrismaClientKnownRequestError")
        return true
      }
    )
  })
})
