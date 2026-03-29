import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { storage, db } from "./storage";
import { insertLeadSchema, insertServiceSchema, insertReviewSchema, insertBlogPostSchema, insertGalleryImageSchema } from "@shared/schema";
import { seedDatabase } from "./seed";
import bcrypt from "bcryptjs";
import MemoryStore from "memorystore";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => cb(null, uploadsDir),
    filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    cb(null, ext && mime);
  },
});

const SessionStore = MemoryStore(session);

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session && (req.session as any).adminId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "rain-guard-secret-key-2024",
      resave: false,
      saveUninitialized: false,
      store: new SessionStore({ checkPeriod: 86400000 }),
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
    })
  );

  try {
    const { exec } = await import("child_process");
    const { promisify } = await import("util");
    const execAsync = promisify(exec);
    await execAsync("npx drizzle-kit push --force");
    await seedDatabase();
  } catch (error) {
    console.error("DB setup error:", error);
  }

  app.use("/uploads", (await import("express")).default.static(uploadsDir));

  // ============= PUBLIC API =============

  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok", message: "Server is alive" });
  });

  app.get("/api/services", async (_req: Request, res: Response) => {
    const result = await storage.getServices();
    res.json(result);
  });

  app.get("/api/reviews", async (_req: Request, res: Response) => {
    const result = await storage.getApprovedReviews();
    res.json(result);
  });

  app.get("/api/gallery", async (_req: Request, res: Response) => {
    const result = await storage.getGalleryImages();
    res.json(result);
  });

  app.get("/api/blog", async (_req: Request, res: Response) => {
    const result = await storage.getBlogPosts();
    res.json(result.filter(p => p.published));
  });

  app.get("/api/blog/:slug", async (req: Request, res: Response) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  app.post("/api/leads", async (req: Request, res: Response) => {
    const parsed = insertLeadSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
    const lead = await storage.createLead(parsed.data);
    res.status(201).json(lead);
  });

  // ============= ADMIN AUTH =============

  app.post("/api/admin/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });
    const admin = await storage.getAdminByEmail(email);
    if (!admin) return res.status(401).json({ message: "Invalid email or password" });
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: "Invalid email or password" });
    (req.session as any).adminId = admin.id;
    (req.session as any).adminRole = admin.role;
    res.json({ message: "Login successful", role: admin.role });
  });

  app.post("/api/admin/logout", (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });

  app.get("/api/admin/me", requireAdmin, (req: Request, res: Response) => {
    res.json({ adminId: (req.session as any).adminId, role: (req.session as any).adminRole });
  });

  // ============= ADMIN: LEADS =============

  app.get("/api/admin/leads", requireAdmin, async (_req: Request, res: Response) => {
    const result = await storage.getLeads();
    res.json(result);
  });

  app.patch("/api/admin/leads/:id", requireAdmin, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const lead = await storage.updateLeadStatus(id, status);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  });

  // ============= ADMIN: SERVICES =============

  app.post("/api/admin/services", requireAdmin, async (req: Request, res: Response) => {
    const parsed = insertServiceSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
    const service = await storage.createService(parsed.data);
    res.status(201).json(service);
  });

  app.patch("/api/admin/services/:id", requireAdmin, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const service = await storage.updateService(id, req.body);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  });

  app.delete("/api/admin/services/:id", requireAdmin, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await storage.deleteService(id);
    res.json({ message: "Deleted" });
  });

  // ============= ADMIN: REVIEWS =============

  app.get("/api/admin/reviews", requireAdmin, async (_req: Request, res: Response) => {
    const result = await storage.getReviews();
    res.json(result);
  });

  app.post("/api/admin/reviews", requireAdmin, async (req: Request, res: Response) => {
    const parsed = insertReviewSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
    const review = await storage.createReview(parsed.data);
    res.status(201).json(review);
  });

  app.delete("/api/admin/reviews/:id", requireAdmin, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await storage.deleteReview(id);
    res.json({ message: "Deleted" });
  });

  // ============= ADMIN: GALLERY =============

  app.get("/api/admin/gallery", requireAdmin, async (_req: Request, res: Response) => {
    const result = await storage.getGalleryImages();
    res.json(result);
  });

  app.post("/api/admin/gallery", requireAdmin, upload.single("image"), async (req: Request, res: Response) => {
    if (!req.file) return res.status(400).json({ message: "Image file is required" });
    const imageUrl = `/uploads/${req.file.filename}`;
    const data = {
      title: req.body.title || "Untitled",
      imageUrl,
      category: req.body.category || "waterproofing",
      isBefore: req.body.isBefore === "true",
    };
    const parsed = insertGalleryImageSchema.safeParse(data);
    if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
    const image = await storage.createGalleryImage(parsed.data);
    res.status(201).json(image);
  });

  app.delete("/api/admin/gallery/:id", requireAdmin, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await storage.deleteGalleryImage(id);
    res.json({ message: "Deleted" });
  });

  return httpServer;
}
