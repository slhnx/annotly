import { describe, it, beforeEach } from "node:test"
import assert from "node:assert/strict"
import { prisma } from "../lib/db"
import { ProjectService } from "../features/projects/services/project-service"

describe("Core Relational Schema & Models (Phase 6 Plan 06-02)", () => {
  beforeEach(async () => {
    await ProjectService._clearStore()
  })

  it("should create and retrieve a User record with email uniqueness", async () => {
    const user = await prisma.user.create({
      data: {
        id: "usr_test_1",
        email: "designer@studio.example.com",
        name: "Jane Designer",
        avatarUrl: "https://avatar.example.com/jane.png",
      },
    })

    assert.equal(user.id, "usr_test_1")
    assert.equal(user.email, "designer@studio.example.com")
    assert.equal(user.name, "Jane Designer")

    // Verify duplicate email throws unique constraint error
    await assert.rejects(
      async () => {
        await prisma.user.create({
          data: {
            id: "usr_test_2",
            email: "designer@studio.example.com", // Duplicate
            name: "Duplicate User",
          },
        })
      },
      (err: Error) => {
        assert.ok(err.message.includes("Unique constraint failed") || err.name === "PrismaClientKnownRequestError")
        return true
      }
    )
  })

  it("should create Project linked to User and automatically provision Canvas", async () => {
    const user = await prisma.user.create({
      data: {
        id: "usr_owner_1",
        email: "agency@example.com",
        name: "Acme Agency",
      },
    })

    const project = await ProjectService.createProject(user.id, {
      name: "Staging Client Review",
      websiteUrl: "https://staging.client.com",
      description: "Q4 responsive redesign review canvas",
    })

    assert.ok(project.id.startsWith("prj_"))
    assert.equal(project.userId, user.id)

    // Verify Canvas was automatically created and linked in the database
    const canvases = await prisma.canvas.findMany({
      where: { projectId: project.id },
    })

    assert.equal(canvases.length, 1)
    assert.equal(canvases[0].token, project.reviewCanvasId)
    assert.equal(canvases[0].url, "https://staging.client.com")
    assert.equal(canvases[0].reviewAccess, "public")
  })

  it("should create Annotation with 5-tier selector, percentage offsets, and device context", async () => {
    const user = await prisma.user.create({
      data: {
        id: "usr_annotator_1",
        email: "dev@studio.example.com",
        name: "Dev Reviewer",
      },
    })

    const project = await ProjectService.createProject(user.id, {
      name: "Live Marketing Site",
      websiteUrl: "https://marketing.example.com",
    })

    const canvas = await prisma.canvas.findUniqueOrThrow({
      where: { token: project.reviewCanvasId },
    })

    // Create an annotation with element-relative percentage offsets
    const annotation = await prisma.annotation.create({
      data: {
        canvasId: canvas.id,
        projectId: project.id,
        userId: user.id,
        authorName: "Dev Reviewer",
        authorEmail: "dev@studio.example.com",
        elementSelector: "#hero > div.cta-container > button.primary-btn",
        elementXPath: "/html/body/div[1]/div[2]/button",
        elementTag: "BUTTON",
        elementTextSnippet: "Start 14-Day Free Trial",
        offsetX: 52.4, // 52.4% from left edge of button
        offsetY: 78.1, // 78.1% from top edge of button
        viewportWidth: 1440,
        viewportHeight: 900,
        devicePixelRatio: 2.0,
        browser: "Chrome 120.0",
        os: "macOS 14.2",
        content: "Button text contrast is slightly too low against the hero gradient.",
        status: "open",
        screenshotUrl: "https://storage.annotly.local/screenshots/shot_01.webp",
      },
    })

    assert.ok(annotation.id)
    assert.equal(annotation.elementSelector, "#hero > div.cta-container > button.primary-btn")
    assert.equal(annotation.elementTag, "BUTTON")
    assert.equal(annotation.offsetX, 52.4)
    assert.equal(annotation.offsetY, 78.1)
    assert.equal(annotation.viewportWidth, 1440)
    assert.equal(annotation.devicePixelRatio, 2.0)
    assert.equal(annotation.status, "open")
    assert.equal(annotation.resolvedAt, null)
  })

  it("should support guest reviewer annotations and threaded replies", async () => {
    const owner = await prisma.user.create({
      data: {
        id: "usr_proj_owner",
        email: "owner@agency.com",
      },
    })

    const project = await ProjectService.createProject(owner.id, {
      name: "Guest Feedback Portal",
      websiteUrl: "https://client-portal.example.com",
    })

    const canvas = await prisma.canvas.findUniqueOrThrow({
      where: { token: project.reviewCanvasId },
    })

    // Guest reviewer leaves an annotation (userId is null)
    const guestAnnotation = await prisma.annotation.create({
      data: {
        canvasId: canvas.id,
        projectId: project.id,
        userId: null,
        authorName: "Sarah Client",
        authorEmail: "sarah@clientbrand.com",
        elementSelector: "header.nav-header > a.logo",
        offsetX: 20.0,
        offsetY: 50.0,
        viewportWidth: 375,
        viewportHeight: 812,
        browser: "Mobile Safari 17.2",
        os: "iOS 17",
        content: "Can we use our updated 2026 brand mark here?",
        status: "open",
      },
    })

    assert.equal(guestAnnotation.userId, null)
    assert.equal(guestAnnotation.authorName, "Sarah Client")
    assert.equal(guestAnnotation.authorEmail, "sarah@clientbrand.com")

    // Project owner replies to the annotation
    const reply1 = await prisma.annotationReply.create({
      data: {
        annotationId: guestAnnotation.id,
        userId: owner.id,
        authorName: "Agency Lead",
        authorEmail: "owner@agency.com",
        content: "Absolutely Sarah, we have the SVG ready in the asset bundle.",
      },
    })

    // Guest replies back in thread
    const reply2 = await prisma.annotationReply.create({
      data: {
        annotationId: guestAnnotation.id,
        userId: null,
        authorName: "Sarah Client",
        authorEmail: "sarah@clientbrand.com",
        content: "Awesome, please deploy that to staging!",
      },
    })

    // Query annotation with full replies thread
    const thread = await prisma.annotation.findUniqueOrThrow({
      where: { id: guestAnnotation.id },
      include: {
        replies: {
          orderBy: { createdAt: "asc" },
        },
      },
    })

    assert.equal(thread.replies.length, 2)
    assert.equal(thread.replies[0].id, reply1.id)
    assert.equal(thread.replies[0].authorName, "Agency Lead")
    assert.equal(thread.replies[1].id, reply2.id)
    assert.equal(thread.replies[1].authorName, "Sarah Client")

    // Mark annotation as resolved
    const resolvedAnnotation = await prisma.annotation.update({
      where: { id: guestAnnotation.id },
      data: {
        status: "resolved",
        resolvedAt: new Date(),
        resolvedBy: owner.id,
      },
    })

    assert.equal(resolvedAnnotation.status, "resolved")
    assert.ok(resolvedAnnotation.resolvedAt)
    assert.equal(resolvedAnnotation.resolvedBy, owner.id)
  })

  it("should cascade delete all Canvases, Annotations, and Replies when a Project is deleted", async () => {
    const user = await prisma.user.create({
      data: {
        id: "usr_cascade_test",
        email: "cascade@example.com",
      },
    })

    const project = await ProjectService.createProject(user.id, {
      name: "Temporary Project To Delete",
      websiteUrl: "https://temp.example.com",
    })

    const canvas = await prisma.canvas.findUniqueOrThrow({
      where: { token: project.reviewCanvasId },
    })

    const annotation = await prisma.annotation.create({
      data: {
        canvasId: canvas.id,
        projectId: project.id,
        authorName: "Reviewer",
        authorEmail: "reviewer@example.com",
        elementSelector: "footer",
        offsetX: 10,
        offsetY: 10,
        viewportWidth: 1200,
        viewportHeight: 800,
        content: "Check footer links",
      },
    })

    await prisma.annotationReply.create({
      data: {
        annotationId: annotation.id,
        authorName: "Lead",
        authorEmail: "lead@example.com",
        content: "Will do",
      },
    })

    // Confirm records exist before deletion
    assert.equal(await prisma.canvas.count({ where: { projectId: project.id } }), 1)
    assert.equal(await prisma.annotation.count({ where: { projectId: project.id } }), 1)
    assert.equal(await prisma.annotationReply.count({ where: { annotationId: annotation.id } }), 1)

    // Delete the project via ProjectService
    const deleted = await ProjectService.deleteProject(user.id, project.id)
    assert.strictEqual(deleted, true)

    // Verify cascade deletion wiped child records
    assert.equal(await prisma.project.count({ where: { id: project.id } }), 0)
    assert.equal(await prisma.canvas.count({ where: { projectId: project.id } }), 0)
    assert.equal(await prisma.annotation.count({ where: { projectId: project.id } }), 0)
    assert.equal(await prisma.annotationReply.count({ where: { annotationId: annotation.id } }), 0)
  })
})
