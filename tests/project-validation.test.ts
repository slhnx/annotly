import { describe, it } from "node:test"
import assert from "node:assert/strict"
import {
  sanitizeUrl,
  createProjectSchema,
  updateProjectSchema,
  projectFilterSchema,
} from "../features/projects/schemas/project.schema"

describe("Project Validation Schemas", () => {
  describe("sanitizeUrl()", () => {
    it("should prepend https:// when protocol is missing", () => {
      assert.equal(sanitizeUrl("example.com"), "https://example.com")
      assert.equal(sanitizeUrl("app.mysite.dev/path"), "https://app.mysite.dev/path")
    })

    it("should preserve existing http and https protocols", () => {
      assert.equal(sanitizeUrl("https://example.com"), "https://example.com")
      assert.equal(sanitizeUrl("http://localhost:3000"), "http://localhost:3000")
    })

    it("should handle empty or whitespace strings gracefully", () => {
      assert.equal(sanitizeUrl("   "), "")
    })
  })

  describe("createProjectSchema", () => {
    it("should successfully parse valid project creation input", () => {
      const input = {
        name: "Acme Web App",
        websiteUrl: "https://acme.example.com",
        description: "Review of the dashboard redesign",
      }

      const result = createProjectSchema.safeParse(input)
      assert.equal(result.success, true)
      if (result.success) {
        assert.equal(result.data.name, "Acme Web App")
        assert.equal(result.data.websiteUrl, "https://acme.example.com")
        assert.equal(result.data.description, "Review of the dashboard redesign")
      }
    })

    it("should automatically normalize URLs without protocol", () => {
      const input = {
        name: "Client Portal",
        websiteUrl: "client-portal.test",
      }

      const result = createProjectSchema.safeParse(input)
      assert.equal(result.success, true)
      if (result.success) {
        assert.equal(result.data.websiteUrl, "https://client-portal.test")
      }
    })

    it("should reject names shorter than 2 characters", () => {
      const input = {
        name: "A",
        websiteUrl: "https://example.com",
      }

      const result = createProjectSchema.safeParse(input)
      assert.equal(result.success, false)
      if (!result.success) {
        assert.ok(result.error.issues.some((i) => i.path.includes("name")))
      }
    })

    it("should reject names longer than 100 characters", () => {
      const input = {
        name: "A".repeat(101),
        websiteUrl: "https://example.com",
      }

      const result = createProjectSchema.safeParse(input)
      assert.equal(result.success, false)
      if (!result.success) {
        assert.ok(result.error.issues.some((i) => i.path.includes("name")))
      }
    })

    it("should reject malformed website URLs missing domain periods", () => {
      const input = {
        name: "Broken Project",
        websiteUrl: "notadomain",
      }

      const result = createProjectSchema.safeParse(input)
      assert.equal(result.success, false)
      if (!result.success) {
        assert.ok(result.error.issues.some((i) => i.path.includes("websiteUrl")))
      }
    })
  })

  describe("updateProjectSchema", () => {
    it("should allow updating status to valid ProjectStatus values", () => {
      const statuses = ["active", "in_review", "completed", "archived"] as const
      for (const status of statuses) {
        const result = updateProjectSchema.safeParse({ status })
        assert.equal(result.success, true)
      }
    })

    it("should reject invalid status strings", () => {
      const result = updateProjectSchema.safeParse({ status: "invalid_status" })
      assert.equal(result.success, false)
    })
  })

  describe("projectFilterSchema", () => {
    it("should parse query, status, and sort filters", () => {
      const input = {
        query: "marketing",
        status: "active" as const,
        sortBy: "lastActivity" as const,
        sortOrder: "desc" as const,
      }

      const result = projectFilterSchema.safeParse(input)
      assert.equal(result.success, true)
    })
  })
})
