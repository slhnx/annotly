import { describe, it, beforeEach } from "node:test"
import assert from "node:assert/strict"
import { ProjectService } from "../features/projects/services/project-service"
import { createProjectSchema } from "../features/projects/schemas/project.schema"

describe("Project Lifecycle & Security Validation", () => {
  const userA = "usr_alice_001"
  const userB = "usr_bob_002"

  beforeEach(async () => {
    await ProjectService._clearStore()
  })

  it("should create project with URL normalization and default public reviewAccess", async () => {
    const project = await ProjectService.createProject(userA, {
      name: "Stripe Checkout Redesign",
      websiteUrl: "AcmeStore.COM/checkout?ref=test#step2",
      description: "Reviewing checkout button styling",
    })

    assert.ok(project.id.startsWith("prj_"))
    assert.equal(project.userId, userA)
    assert.equal(project.name, "Stripe Checkout Redesign")
    assert.equal(project.websiteUrl, "https://acmestore.com/checkout?ref=test#step2")
    assert.equal(project.reviewAccess, "public")
    assert.ok(project.reviewCanvasId.startsWith("cnv_"))
    assert.equal(project.reviewUrl, `/review/${project.reviewCanvasId}`)
  })

  it("should reject duplicate project names for the same user (case-insensitive)", async () => {
    await ProjectService.createProject(userA, {
      name: "Client Portal",
      websiteUrl: "https://portal.client.com",
    })

    await assert.rejects(
      async () => {
        await ProjectService.createProject(userA, {
          name: "  client portal  ",
          websiteUrl: "https://other.client.com",
        })
      },
      {
        message: /A project with this name already exists in your workspace/,
      }
    )
  })

  it("should allow another user to have a project with the same name", async () => {
    const projectA = await ProjectService.createProject(userA, {
      name: "Marketing Landing",
      websiteUrl: "https://landing-a.com",
    })

    const projectB = await ProjectService.createProject(userB, {
      name: "Marketing Landing",
      websiteUrl: "https://landing-b.com",
    })

    assert.notEqual(projectA.id, projectB.id)
    assert.equal(projectA.name, projectB.name)
    assert.equal(projectA.userId, userA)
    assert.equal(projectB.userId, userB)
  })

  it("should validate and reject invalid URLs and protocols via schema", () => {
    const invalidInputs = [
      { name: "FTP Target", websiteUrl: "ftp://files.example.com" },
      { name: "Javascript Target", websiteUrl: "javascript:alert(1)" },
      { name: "No Domain Dot", websiteUrl: "https://localhostwithoutdot" },
      { name: "", websiteUrl: "https://example.com" },
    ]

    for (const input of invalidInputs) {
      const result = createProjectSchema.safeParse(input)
      assert.equal(result.success, false, `Expected input to fail: ${JSON.stringify(input)}`)
    }
  })

  it("should update project details, reviewAccess, and prevent duplicate renaming", async () => {
    const p1 = await ProjectService.createProject(userA, {
      name: "Project One",
      websiteUrl: "https://p1.com",
    })
    const p2 = await ProjectService.createProject(userA, {
      name: "Project Two",
      websiteUrl: "https://p2.com",
    })

    // Duplicate rename should be blocked
    await assert.rejects(
      async () => {
        await ProjectService.updateProject(userA, p2.id, {
          name: "Project One",
        })
      },
      {
        message: /A project with this name already exists in your workspace/,
      }
    )

    // Updating own name, review access to paused, and URL should succeed
    const updated = await ProjectService.updateProject(userA, p1.id, {
      name: "Project One Enhanced",
      websiteUrl: "NEW-DOMAIN.DEV/preview",
      reviewAccess: "paused",
      status: "in_review",
    })

    assert.equal(updated.name, "Project One Enhanced")
    assert.equal(updated.websiteUrl, "https://new-domain.dev/preview")
    assert.equal(updated.reviewAccess, "paused")
    assert.equal(updated.status, "in_review")
  })

  it("should regenerate review link and revoke previous token", async () => {
    const project = await ProjectService.createProject(userA, {
      name: "Token Test Project",
      websiteUrl: "https://token.example.com",
    })

    const initialCanvasId = project.reviewCanvasId
    const initialReviewUrl = project.reviewUrl

    const regenerated = await ProjectService.regenerateReviewLink(userA, project.id)

    assert.notEqual(regenerated.reviewCanvasId, initialCanvasId)
    assert.notEqual(regenerated.reviewUrl, initialReviewUrl)
    assert.equal(regenerated.reviewUrl, `/review/${regenerated.reviewCanvasId}`)
  })

  it("should prevent unauthorized users from regenerating another user's review link", async () => {
    const project = await ProjectService.createProject(userA, {
      name: "Protected Project",
      websiteUrl: "https://protected.example.com",
    })

    await assert.rejects(
      async () => {
        await ProjectService.regenerateReviewLink(userB, project.id)
      },
      {
        message: /Forbidden: You do not have permission to update this project/,
      }
    )
  })

  it("should block non-owner read/update/delete operations", async () => {
    const project = await ProjectService.createProject(userA, {
      name: "Owner Isolation Project",
      websiteUrl: "https://isolation.example.com",
    })

    // Read by non-owner
    await assert.rejects(
      () => ProjectService.getProjectById(userB, project.id),
      { message: /Forbidden/ }
    )

    // Update by non-owner
    await assert.rejects(
      () => ProjectService.updateProject(userB, project.id, { name: "Hijacked" }),
      { message: /Forbidden/ }
    )

    // Delete by non-owner
    await assert.rejects(
      () => ProjectService.deleteProject(userB, project.id),
      { message: /Forbidden/ }
    )
  })

  it("should handle project deletion and subsequent stale ID operations", async () => {
    const project = await ProjectService.createProject(userA, {
      name: "Ephemeral Project",
      websiteUrl: "https://ephemeral.example.com",
    })

    // Delete succeeds
    const deleted = await ProjectService.deleteProject(userA, project.id)
    assert.equal(deleted, true)

    // Stale read returns null
    const staleGet = await ProjectService.getProjectById(userA, project.id)
    assert.equal(staleGet, null)

    // Stale update throws not found
    await assert.rejects(
      () => ProjectService.updateProject(userA, project.id, { name: "Ghost Update" }),
      { message: /Project not found/ }
    )

    // Stale link regeneration throws not found
    await assert.rejects(
      () => ProjectService.regenerateReviewLink(userA, project.id),
      { message: /Project not found/ }
    )

    // Stale delete returns false
    const staleDelete = await ProjectService.deleteProject(userA, project.id)
    assert.equal(staleDelete, false)
  })
})
