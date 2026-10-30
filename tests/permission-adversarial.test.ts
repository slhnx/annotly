import { describe, it, beforeEach } from "node:test"
import assert from "node:assert/strict"
import { ProjectService } from "../features/projects/services/project-service"
import { CanvasService } from "../features/reviews/services/canvas-service"
import { AnnotationService } from "../features/annotations/services/annotation-service"

describe("Adversarial Permission & Cross-Tenant Security Tests (Phase 6 Plan 06-04)", () => {
  const tenantA = "usr_tenant_alpha_1"
  const tenantB = "usr_tenant_bravo_2"
  const intruder = "usr_adversary_intruder_9"
  const legitimateGuest = "legit.client@acme.example.com"
  const impersonatorGuest = "hacker@evil.example.com"

  beforeEach(async () => {
    await ProjectService._clearStore()
  })

  describe("Cross-Tenant Isolation & Read Protection", () => {
    it("should prevent User B from reading or listing User A's private projects", async () => {
      const projectA = await ProjectService.createProject(tenantA, {
        name: "Confidential Client Alpha",
        websiteUrl: "https://confidential.alpha.com",
        description: "Strictly confidential M&A portal design",
      })

      // User B listing projects must return empty array
      const userBProjects = await ProjectService.getUserProjects(tenantB)
      assert.equal(userBProjects.length, 0, "Tenant B should see 0 projects")

      // User B querying User A's project directly by ID must throw Forbidden
      await assert.rejects(
        async () => {
          await ProjectService.getProjectById(tenantB, projectA.id)
        },
        /Forbidden/
      )

      // User B dashboard metrics must not include User A's data
      const userBMetrics = await ProjectService.getDashboardMetrics(tenantB)
      assert.equal(userBMetrics.totalProjects, 0)
      assert.equal(userBMetrics.openComments, 0)
    })

    it("should prevent User B from listing User A's project canvases", async () => {
      const projectA = await ProjectService.createProject(tenantA, {
        name: "Alpha Architecture",
        websiteUrl: "https://arch.alpha.com",
      })

      await assert.rejects(
        async () => {
          await CanvasService.getProjectCanvases(tenantB, projectA.id)
        },
        /Forbidden/
      )
    })
  })

  describe("Cross-Tenant Mutation & Destruction Defense", () => {
    it("should block User B from updating, renaming, or toggling User A's project", async () => {
      const projectA = await ProjectService.createProject(tenantA, {
        name: "Untouchable Project",
        websiteUrl: "https://untouchable.example.com",
      })

      // Attempt rename
      await assert.rejects(
        async () => {
          await ProjectService.updateProject(tenantB, projectA.id, {
            name: "Hacked Project Name",
          })
        },
        /Forbidden/
      )

      // Attempt websiteUrl modification
      await assert.rejects(
        async () => {
          await ProjectService.updateProject(tenantB, projectA.id, {
            websiteUrl: "https://malicious-phishing.com",
          })
        },
        /Forbidden/
      )

      // Attempt status change
      await assert.rejects(
        async () => {
          await ProjectService.updateProject(tenantB, projectA.id, {
            status: "archived",
          })
        },
        /Forbidden/
      )

      // Verify project remains unchanged in DB
      const verified = await ProjectService.getProjectById(tenantA, projectA.id)
      assert.equal(verified?.name, "Untouchable Project")
      assert.equal(verified?.websiteUrl, "https://untouchable.example.com")
    })

    it("should block User B from regenerating review tokens on User A's project", async () => {
      const projectA = await ProjectService.createProject(tenantA, {
        name: "Token Defense Project",
        websiteUrl: "https://token.example.com",
      })

      const originalToken = projectA.reviewCanvasId

      await assert.rejects(
        async () => {
          await ProjectService.regenerateReviewLink(tenantB, projectA.id)
        },
        /Forbidden/
      )

      // Token must remain unchanged
      const verified = await ProjectService.getProjectById(tenantA, projectA.id)
      assert.equal(verified?.reviewCanvasId, originalToken)
    })

    it("should block User B from deleting User A's project", async () => {
      const projectA = await ProjectService.createProject(tenantA, {
        name: "Indestructible by Others",
        websiteUrl: "https://safe.example.com",
      })

      await assert.rejects(
        async () => {
          await ProjectService.deleteProject(tenantB, projectA.id)
        },
        /Forbidden/
      )

      // Project must still exist
      const verified = await ProjectService.getProjectById(tenantA, projectA.id)
      assert.ok(verified)
    })

    it("should block User B from toggling User A's canvas access state", async () => {
      const projectA = await ProjectService.createProject(tenantA, {
        name: "Canvas Protection Project",
        websiteUrl: "https://canvas.example.com",
      })

      const canvases = await CanvasService.getProjectCanvases(tenantA, projectA.id)
      assert.equal(canvases.length, 1)

      await assert.rejects(
        async () => {
          await CanvasService.updateCanvasAccess(tenantB, canvases[0].id, "paused")
        },
        /Forbidden/
      )

      // Canvas access must still be public
      const refreshed = await CanvasService.getCanvasByToken(projectA.reviewCanvasId)
      assert.equal(refreshed?.reviewAccess, "public")
    })
  })

  describe("Token Guessing, Malformed Input & Injection Resistance", () => {
    it("should safely return null for non-existent or malformed canvas tokens without error disclosure", async () => {
      // Non-existent token
      const res1 = await CanvasService.getCanvasByToken("non_existent_token_xyz")
      assert.strictEqual(res1, null)

      // Empty or whitespace token
      const res2 = await CanvasService.getCanvasByToken("   ")
      assert.strictEqual(res2, null)

      // SQL injection pattern token
      const res3 = await CanvasService.getCanvasByToken("' OR '1'='1")
      assert.strictEqual(res3, null)

      // Malicious script tag token
      const res4 = await CanvasService.getCanvasByToken("<script>alert(1)</script>")
      assert.strictEqual(res4, null)
    })

    it("should safely return null for non-existent project IDs without leaking schema", async () => {
      const res = await ProjectService.getProjectById(tenantA, "prj_non_existent_999")
      assert.strictEqual(res, null)
    })
  })

  describe("Annotation & Thread Unauthorized Mutation Attacks", () => {
    it("should strictly deny unauthorized intruders from resolving or deleting annotations", async () => {
      const project = await ProjectService.createProject(tenantA, {
        name: "Annotation Security Project",
        websiteUrl: "https://annotation-sec.example.com",
      })

      const annotation = await AnnotationService.createAnnotation({
        canvasToken: project.reviewCanvasId,
        content: "Legitimate client feedback",
        elementSelector: "header > nav",
        offsetX: 10,
        offsetY: 20,
        viewportWidth: 1440,
        viewportHeight: 900,
        authorName: "Sarah Client",
        authorEmail: legitimateGuest,
      })

      // Intruder with different user ID attempts to resolve
      await assert.rejects(
        async () => {
          await AnnotationService.updateAnnotationStatus(
            { userId: intruder },
            annotation.id,
            "resolved"
          )
        },
        /Forbidden/
      )

      // Impersonator with different email attempts to resolve
      await assert.rejects(
        async () => {
          await AnnotationService.updateAnnotationStatus(
            { authorEmail: impersonatorGuest },
            annotation.id,
            "resolved"
          )
        },
        /Forbidden/
      )

      // Intruder attempts to delete annotation
      await assert.rejects(
        async () => {
          await AnnotationService.deleteAnnotation(
            { userId: intruder },
            annotation.id
          )
        },
        /Forbidden/
      )

      // Verify annotation is still open and untouched
      const verifiedPins = await AnnotationService.getCanvasAnnotations(project.reviewCanvasId, "all")
      assert.equal(verifiedPins[0].status, "open")
    })
  })

  describe("Paused Canvas Commenting Enforcement", () => {
    it("should strictly reject new annotations and replies when canvas is paused", async () => {
      const project = await ProjectService.createProject(tenantA, {
        name: "Paused Enforcement Project",
        websiteUrl: "https://paused-sec.example.com",
      })

      const canvases = await CanvasService.getProjectCanvases(tenantA, project.id)

      // Create pin while active
      const activePin = await AnnotationService.createAnnotation({
        canvasToken: project.reviewCanvasId,
        content: "Pin before pause",
        elementSelector: "button.cta",
        offsetX: 30,
        offsetY: 30,
        viewportWidth: 1440,
        viewportHeight: 900,
        authorName: "Sarah Client",
        authorEmail: legitimateGuest,
      })

      // Owner pauses the review canvas
      await CanvasService.updateCanvasAccess(tenantA, canvases[0].id, "paused")

      // Attempt to create new pin on paused canvas
      await assert.rejects(
        async () => {
          await AnnotationService.createAnnotation({
            canvasToken: project.reviewCanvasId,
            content: "Pin after pause attempt",
            elementSelector: "h1",
            offsetX: 40,
            offsetY: 40,
            viewportWidth: 1440,
            viewportHeight: 900,
            authorName: "Sarah Client",
            authorEmail: legitimateGuest,
          })
        },
        /Review canvas is currently paused/
      )

      // Attempt to post reply on paused canvas
      await assert.rejects(
        async () => {
          await AnnotationService.addReply({
            annotationId: activePin.id,
            authorName: "Sarah Client",
            authorEmail: legitimateGuest,
            content: "Reply after pause attempt",
          })
        },
        /Review canvas is currently paused/
      )
    })
  })

  describe("Information Disclosure & Least-Privilege Verification", () => {
    it("should never expose owner userId, email, or private workspace data on public canvas query", async () => {
      const project = await ProjectService.createProject(tenantA, {
        name: "Public Facing Review",
        websiteUrl: "https://public-review.example.com",
      })

      const publicCanvas = await CanvasService.getCanvasByToken(project.reviewCanvasId)
      assert.ok(publicCanvas)

      const rawJson = JSON.stringify(publicCanvas)

      // Verify owner ID is NOT in the serialized output
      assert.ok(!rawJson.includes(tenantA), "Public canvas must not disclose owner userId")
      assert.ok(!rawJson.includes("tenant_alpha"), "Public canvas must not disclose tenant slug")

      // Verify only intended public keys are present
      const publicKeys = Object.keys(publicCanvas)
      const allowedKeys = [
        "id",
        "token",
        "name",
        "url",
        "reviewAccess",
        "projectId",
        "projectName",
        "projectStatus",
        "totalComments",
        "openComments",
        "resolvedComments",
      ]

      for (const key of publicKeys) {
        assert.ok(allowedKeys.includes(key), `Disallowed key found in public payload: ${key}`)
      }
    })
  })
})
