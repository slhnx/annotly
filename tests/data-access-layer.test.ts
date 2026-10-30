import { describe, it, beforeEach } from "node:test"
import assert from "node:assert/strict"
import { ProjectService } from "../features/projects/services/project-service"
import { CanvasService } from "../features/reviews/services/canvas-service"
import { AnnotationService } from "../features/annotations/services/annotation-service"

describe("Data Access Layer: Canvases, Annotations & Replies (Phase 6 Plan 06-03)", () => {
  const ownerId = "usr_agency_lead"
  const guestEmail = "sarah@client.example.com"
  const intruderId = "usr_malicious_actor"

  beforeEach(async () => {
    await ProjectService._clearStore()
  })

  it("should look up public canvas by token without leaking owner identity", async () => {
    const project = await ProjectService.createProject(ownerId, {
      name: "Public Design Review",
      websiteUrl: "https://public-design.example.com",
    })

    const publicCanvas = await CanvasService.getCanvasByToken(project.reviewCanvasId)
    assert.ok(publicCanvas)
    assert.equal(publicCanvas.token, project.reviewCanvasId)
    assert.equal(publicCanvas.name, "Initial Review Canvas")
    assert.equal(publicCanvas.url, "https://public-design.example.com")
    assert.equal(publicCanvas.reviewAccess, "public")
    assert.equal(publicCanvas.projectName, "Public Design Review")
    // Assert sensitive owner data is not exposed on public payload
    assert.equal((publicCanvas as unknown as Record<string, unknown>).userId, undefined)
    assert.equal((publicCanvas as unknown as Record<string, unknown>).ownerId, undefined)
  })

  it("should enforce owner authorization on CanvasService operations", async () => {
    const project = await ProjectService.createProject(ownerId, {
      name: "Private Canvases Project",
      websiteUrl: "https://private.example.com",
    })

    // Owner can fetch canvases
    const canvases = await CanvasService.getProjectCanvases(ownerId, project.id)
    assert.equal(canvases.length, 1)

    // Intruder is blocked
    await assert.rejects(
      async () => {
        await CanvasService.getProjectCanvases(intruderId, project.id)
      },
      /Forbidden/
    )

    // Intruder cannot modify review access
    await assert.rejects(
      async () => {
        await CanvasService.updateCanvasAccess(intruderId, canvases[0].id, "paused")
      },
      /Forbidden/
    )

    // Owner can pause canvas access
    const updated = await CanvasService.updateCanvasAccess(ownerId, canvases[0].id, "paused")
    assert.equal(updated.reviewAccess, "paused")

    // Project should also reflect paused state
    const refreshedProject = await ProjectService.getProjectById(ownerId, project.id)
    assert.equal(refreshedProject?.reviewAccess, "paused")
  })

  it("should validate coordinates and reject out-of-bound percentage offsets", async () => {
    const project = await ProjectService.createProject(ownerId, {
      name: "Coordinate Test Project",
      websiteUrl: "https://coords.example.com",
    })

    // Negative offsetX
    await assert.rejects(
      async () => {
        await AnnotationService.createAnnotation({
          canvasToken: project.reviewCanvasId,
          content: "Invalid pin",
          elementSelector: "button",
          offsetX: -5.0,
          offsetY: 50.0,
          viewportWidth: 1440,
          viewportHeight: 900,
          authorName: "Guest",
          authorEmail: "guest@example.com",
        })
      },
      /Offset X cannot be negative/
    )

    // Excess offsetX (> 100%)
    await assert.rejects(
      async () => {
        await AnnotationService.createAnnotation({
          canvasToken: project.reviewCanvasId,
          content: "Invalid pin",
          elementSelector: "button",
          offsetX: 105.0,
          offsetY: 50.0,
          viewportWidth: 1440,
          viewportHeight: 900,
          authorName: "Guest",
          authorEmail: "guest@example.com",
        })
      },
      /Offset X cannot exceed 100%/
    )
  })

  it("should prevent creating comments or replies when review canvas is paused", async () => {
    const project = await ProjectService.createProject(ownerId, {
      name: "Paused Feedback Canvas",
      websiteUrl: "https://paused.example.com",
    })

    const canvases = await CanvasService.getProjectCanvases(ownerId, project.id)
    await CanvasService.updateCanvasAccess(ownerId, canvases[0].id, "paused")

    await assert.rejects(
      async () => {
        await AnnotationService.createAnnotation({
          canvasToken: project.reviewCanvasId,
          content: "Should fail because paused",
          elementSelector: "h1",
          offsetX: 10,
          offsetY: 10,
          viewportWidth: 1440,
          viewportHeight: 900,
          authorName: "Client",
          authorEmail: guestEmail,
        })
      },
      /Review canvas is currently paused/
    )
  })

  it("should create annotations, increment project rollup metrics, and filter by status", async () => {
    const project = await ProjectService.createProject(ownerId, {
      name: "Annotation Metrics Project",
      websiteUrl: "https://metrics.example.com",
    })

    // Initial metrics should be 0 comments
    const initialProject = await ProjectService.getProjectById(ownerId, project.id)
    assert.equal(initialProject?.summary.totalComments, 0)
    assert.equal(initialProject?.summary.openComments, 0)
    assert.equal(initialProject?.summary.resolvedComments, 0)

    // Add first annotation
    const pin1 = await AnnotationService.createAnnotation({
      canvasToken: project.reviewCanvasId,
      content: "First feedback pin",
      elementSelector: "nav.navbar",
      offsetX: 15.5,
      offsetY: 40.0,
      viewportWidth: 1440,
      viewportHeight: 900,
      authorName: "Sarah Client",
      authorEmail: guestEmail,
    })

    // Add second annotation
    const pin2 = await AnnotationService.createAnnotation({
      canvasToken: project.reviewCanvasId,
      content: "Second feedback pin",
      elementSelector: "footer.footer-main",
      offsetX: 50.0,
      offsetY: 80.0,
      viewportWidth: 1440,
      viewportHeight: 900,
      authorName: "Sarah Client",
      authorEmail: guestEmail,
    })

    // Check project metrics updated atomically
    const updatedProject = await ProjectService.getProjectById(ownerId, project.id)
    assert.equal(updatedProject?.summary.totalComments, 2)
    assert.equal(updatedProject?.summary.openComments, 2)
    assert.equal(updatedProject?.summary.resolvedComments, 0)

    // Add threaded reply to pin1
    const reply = await AnnotationService.addReply({
      annotationId: pin1.id,
      authorName: "Agency Lead",
      authorEmail: "owner@agency.com",
      content: "We are reviewing this element now.",
    })
    assert.ok(reply.id)

    // Query canvas annotations with replies
    const allPins = await AnnotationService.getCanvasAnnotations(project.reviewCanvasId, "all")
    assert.equal(allPins.length, 2)
    const pin1WithReplies = allPins.find((p) => p.id === pin1.id)
    assert.equal(pin1WithReplies?.replies?.length, 1)
    assert.equal(pin1WithReplies?.replies?.[0].content, "We are reviewing this element now.")

    // Resolve pin1 (owner authorization)
    const resolvedPin1 = await AnnotationService.updateAnnotationStatus(
      { userId: ownerId },
      pin1.id,
      "resolved"
    )
    assert.equal(resolvedPin1.status, "resolved")
    assert.ok(resolvedPin1.resolvedAt)

    // Check updated project metrics
    const afterResolveProject = await ProjectService.getProjectById(ownerId, project.id)
    assert.equal(afterResolveProject?.summary.totalComments, 2)
    assert.equal(afterResolveProject?.summary.openComments, 1)
    assert.equal(afterResolveProject?.summary.resolvedComments, 1)

    // Filter by open pins
    const openPins = await AnnotationService.getCanvasAnnotations(project.reviewCanvasId, "open")
    assert.equal(openPins.length, 1)
    assert.equal(openPins[0].id, pin2.id)

    // Filter by resolved pins
    const resolvedPins = await AnnotationService.getCanvasAnnotations(project.reviewCanvasId, "resolved")
    assert.equal(resolvedPins.length, 1)
    assert.equal(resolvedPins[0].id, pin1.id)
  })

  it("should enforce authorization on resolution and deletion", async () => {
    const project = await ProjectService.createProject(ownerId, {
      name: "Security Authorization Project",
      websiteUrl: "https://security.example.com",
    })

    const pin = await AnnotationService.createAnnotation({
      canvasToken: project.reviewCanvasId,
      content: "Protected pin",
      elementSelector: "button.submit",
      offsetX: 25.0,
      offsetY: 25.0,
      viewportWidth: 1440,
      viewportHeight: 900,
      authorName: "Sarah Client",
      authorEmail: guestEmail,
    })

    // Malicious actor tries to resolve pin
    await assert.rejects(
      async () => {
        await AnnotationService.updateAnnotationStatus(
          { userId: intruderId },
          pin.id,
          "resolved"
        )
      },
      /Forbidden/
    )

    // Malicious actor tries to delete pin
    await assert.rejects(
      async () => {
        await AnnotationService.deleteAnnotation(
          { userId: intruderId },
          pin.id
        )
      },
      /Forbidden/
    )

    // Original author (guest email match) can resolve their pin
    const resolvedByAuthor = await AnnotationService.updateAnnotationStatus(
      { authorEmail: guestEmail },
      pin.id,
      "resolved"
    )
    assert.equal(resolvedByAuthor.status, "resolved")

    // Project owner can delete pin
    const deleted = await AnnotationService.deleteAnnotation(
      { userId: ownerId },
      pin.id
    )
    assert.strictEqual(deleted, true)

    // Project metrics should be decremented back to 0
    const finalProject = await ProjectService.getProjectById(ownerId, project.id)
    assert.equal(finalProject?.summary.totalComments, 0)
    assert.equal(finalProject?.summary.resolvedComments, 0)
  })
})
