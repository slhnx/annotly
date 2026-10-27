import { describe, it, beforeEach } from "node:test"
import assert from "node:assert/strict"
import { ProjectService } from "../features/projects/services/project-service"

describe("ProjectService & Ownership Isolation", () => {
  const userA = "user_alpha_123"
  const userB = "user_bravo_456"

  beforeEach(() => {
    ProjectService._clearStore()
  })

  it("should create a project and assign correct ownership and reviewUrl", async () => {
    const project = await ProjectService.createProject(userA, {
      name: "Alpha Landing Page",
      websiteUrl: "https://alpha.example.com",
      description: "Initial client feedback review",
    })

    assert.ok(project.id.startsWith("prj_"))
    assert.equal(project.userId, userA)
    assert.equal(project.name, "Alpha Landing Page")
    assert.equal(project.websiteUrl, "https://alpha.example.com")
    assert.ok(project.reviewCanvasId.startsWith("cnv_"))
    assert.equal(project.reviewUrl, `/review/${project.reviewCanvasId}`)
    assert.equal(project.status, "active")
    assert.equal(project.summary.totalComments, 0)
  })

  it("should isolate projects so user B cannot see user A's projects", async () => {
    await ProjectService.createProject(userA, {
      name: "Alpha Project 1",
      websiteUrl: "https://alpha1.example.com",
    })
    await ProjectService.createProject(userA, {
      name: "Alpha Project 2",
      websiteUrl: "https://alpha2.example.com",
    })
    await ProjectService.createProject(userB, {
      name: "Bravo Project 1",
      websiteUrl: "https://bravo1.example.com",
    })

    const alphaProjects = await ProjectService.getUserProjects(userA)
    const bravoProjects = await ProjectService.getUserProjects(userB)

    assert.equal(alphaProjects.length, 2)
    assert.equal(bravoProjects.length, 1)
    assert.ok(alphaProjects.every((p) => p.userId === userA))
    assert.ok(bravoProjects.every((p) => p.userId === userB))
  })

  it("should strictly deny non-owner from accessing another user's project by ID", async () => {
    const projectA = await ProjectService.createProject(userA, {
      name: "Private Project A",
      websiteUrl: "https://private-a.example.com",
    })

    // Owner can access
    const fetchedByA = await ProjectService.getProjectById(userA, projectA.id)
    assert.ok(fetchedByA)
    assert.equal(fetchedByA.id, projectA.id)

    // Non-owner is denied with Forbidden error
    await assert.rejects(
      async () => {
        await ProjectService.getProjectById(userB, projectA.id)
      },
      {
        message: /Forbidden: You do not have permission to access this project/,
      }
    )
  })

  it("should strictly deny non-owner from updating another user's project", async () => {
    const projectA = await ProjectService.createProject(userA, {
      name: "Secure Project",
      websiteUrl: "https://secure.example.com",
    })

    // Non-owner attempt fails
    await assert.rejects(
      async () => {
        await ProjectService.updateProject(userB, projectA.id, {
          name: "Malicious Tampering",
        })
      },
      {
        message: /Forbidden: You do not have permission to update this project/,
      }
    )

    // Owner update succeeds
    const updated = await ProjectService.updateProject(userA, projectA.id, {
      name: "Authorized Rename",
      status: "in_review",
    })
    assert.equal(updated.name, "Authorized Rename")
    assert.equal(updated.status, "in_review")
  })

  it("should strictly deny non-owner from deleting another user's project", async () => {
    const projectA = await ProjectService.createProject(userA, {
      name: "Do Not Delete",
      websiteUrl: "https://nodelete.example.com",
    })

    // Non-owner attempt fails
    await assert.rejects(
      async () => {
        await ProjectService.deleteProject(userB, projectA.id)
      },
      {
        message: /Forbidden: You do not have permission to delete this project/,
      }
    )

    // Owner delete succeeds
    const deleted = await ProjectService.deleteProject(userA, projectA.id)
    assert.equal(deleted, true)

    // Verify it is removed
    const checkDeleted = await ProjectService.getProjectById(userA, projectA.id)
    assert.equal(checkDeleted, null)
  })

  it("should accurately calculate dashboard aggregate metrics", async () => {
    const p1 = await ProjectService.createProject(userA, {
      name: "P1",
      websiteUrl: "https://p1.example.com",
    })
    p1.summary = {
      activeReviews: 2,
      totalComments: 10,
      openComments: 4,
      resolvedComments: 6,
      lastActivityAt: new Date().toISOString(),
    }

    const p2 = await ProjectService.createProject(userA, {
      name: "P2",
      websiteUrl: "https://p2.example.com",
    })
    p2.summary = {
      activeReviews: 1,
      totalComments: 5,
      openComments: 1,
      resolvedComments: 4,
      lastActivityAt: new Date().toISOString(),
    }

    const metrics = await ProjectService.getDashboardMetrics(userA)
    assert.equal(metrics.totalProjects, 2)
    assert.equal(metrics.activeReviews, 2)
    assert.equal(metrics.openComments, 5)
    assert.equal(metrics.resolvedComments, 10)
    assert.equal(metrics.resolutionRate, 67) // 10 / 15 * 100 = 66.66% -> 67%
  })

  it("should seed sample projects for onboarding", async () => {
    const seeded = await ProjectService.seedSampleProjects(userA)
    assert.equal(seeded.length, 2)

    const projects = await ProjectService.getUserProjects(userA)
    assert.equal(projects.length, 2)
    assert.ok(projects.some((p) => p.name.includes("Acme SaaS")))
  })
})
