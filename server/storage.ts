import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import {
  leads, services, galleryImages, reviews, blogPosts, adminUsers,
  type Lead, type InsertLead,
  type Service, type InsertService,
  type GalleryImage, type InsertGalleryImage,
  type Review, type InsertReview,
  type BlogPost, type InsertBlogPost,
  type AdminUser, type InsertAdminUser,
} from "@shared/schema";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);

export interface IStorage {
  getLeads(): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLeadStatus(id: number, status: string): Promise<Lead | undefined>;

  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<void>;

  getGalleryImages(): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  deleteGalleryImage(id: number): Promise<void>;

  getReviews(): Promise<Review[]>;
  getApprovedReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  deleteReview(id: number): Promise<void>;

  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;

  getAdminByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
}

export class DatabaseStorage implements IStorage {
  async getLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [result] = await db.insert(leads).values(lead).returning();
    return result;
  }

  async updateLeadStatus(id: number, status: string): Promise<Lead | undefined> {
    const [result] = await db.update(leads).set({ status }).where(eq(leads.id, id)).returning();
    return result;
  }

  async getServices(): Promise<Service[]> {
    return db.select().from(services);
  }

  async createService(service: InsertService): Promise<Service> {
    const [result] = await db.insert(services).values(service).returning();
    return result;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const [result] = await db.update(services).set(service).where(eq(services.id, id)).returning();
    return result;
  }

  async deleteService(id: number): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return db.select().from(galleryImages);
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const [result] = await db.insert(galleryImages).values(image).returning();
    return result;
  }

  async deleteGalleryImage(id: number): Promise<void> {
    await db.delete(galleryImages).where(eq(galleryImages.id, id));
  }

  async getReviews(): Promise<Review[]> {
    return db.select().from(reviews);
  }

  async getApprovedReviews(): Promise<Review[]> {
    return db.select().from(reviews).where(eq(reviews.approved, true));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [result] = await db.insert(reviews).values(review).returning();
    return result;
  }

  async deleteReview(id: number): Promise<void> {
    await db.delete(reviews).where(eq(reviews.id, id));
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [result] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return result;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [result] = await db.insert(blogPosts).values(post).returning();
    return result;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    const [result] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
    return result;
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const [result] = await db.insert(adminUsers).values(user).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
