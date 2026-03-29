import { storage, db } from "./storage";
import { services, reviews, blogPosts, galleryImages, adminUsers } from "@shared/schema";
import { log } from "./index";

export async function seedDatabase() {
  try {
    const existingServices = await storage.getServices();
    if (existingServices.length > 0) {
      log("Database already seeded, skipping...");
      return;
    }

    log("Seeding database...");

    await db.insert(services).values([
      { title: "Terrace Waterproofing", description: "Complete terrace waterproofing with high-quality membrane and chemical coating. Stops water seepage permanently.", category: "waterproofing", image: "/images/service-terrace.png", featured: true, priceRange: "Rs. 25/sq.ft onwards" },
      { title: "Bathroom Waterproofing", description: "Professional bathroom leakage repair using injection grouting and waterproof chemical treatment.", category: "waterproofing", image: "/images/service-bathroom.png", featured: true, priceRange: "Rs. 8,000 onwards" },
      { title: "Roof Leakage Repair", description: "Expert roof leakage repair using advanced waterproofing methods. No breaking of tiles required.", category: "waterproofing", image: "/images/service-terrace.png", featured: false, priceRange: "Rs. 5,000 onwards" },
      { title: "Basement Waterproofing", description: "Protect your basement from water seepage with our comprehensive waterproofing solutions.", category: "waterproofing", image: "/images/service-bathroom.png", featured: false, priceRange: "Rs. 30/sq.ft onwards" },
      { title: "Wall Crack Repair", description: "Professional wall crack filling and damp proofing to prevent water damage and protect your walls.", category: "waterproofing", image: "/images/before-after-1.png", featured: false, priceRange: "Rs. 3,000 onwards" },
      { title: "Interior Painting", description: "Transform your home with premium interior painting. Smooth finish with top brands like Asian Paints & Berger.", category: "painting", image: "/images/service-interior.png", featured: true, priceRange: "Rs. 18/sq.ft onwards" },
      { title: "Exterior Painting", description: "Weather-resistant exterior painting that protects and beautifies your building. Long-lasting finish guaranteed.", category: "painting", image: "/images/service-exterior.png", featured: true, priceRange: "Rs. 22/sq.ft onwards" },
      { title: "Texture Painting", description: "Add designer texture paint to your walls for a unique and modern look. Multiple patterns available.", category: "painting", image: "/images/service-texture.png", featured: false, priceRange: "Rs. 35/sq.ft onwards" },
      { title: "Waterproof Painting", description: "Special waterproof paint coating that prevents moisture damage and keeps your walls dry.", category: "painting", image: "/images/service-exterior.png", featured: false, priceRange: "Rs. 20/sq.ft onwards" },
      { title: "Building Painting", description: "Complete building painting services for residential and commercial properties. Professional scaffolding setup.", category: "painting", image: "/images/service-exterior.png", featured: false, priceRange: "Contact for quote" },
    ]);

    await db.insert(reviews).values([
      { customerName: "Rajesh Sharma", rating: 5, review: "Excellent terrace waterproofing work. No leakage even after heavy monsoon rains. Highly recommended!", location: "Andheri West", approved: true },
      { customerName: "Priya Patel", rating: 5, review: "Very professional painting work. The interior of my flat looks brand new. Clean work and fair pricing.", location: "Borivali East", approved: true },
      { customerName: "Amit Kumar", rating: 4, review: "Good waterproofing service for my bathroom. The team was on time and completed work within 2 days. Happy with results.", location: "Dadar", approved: true },
      { customerName: "Sunita Desai", rating: 5, review: "Rain Guard solved our building leakage problem that other companies couldn't fix. 5 star service!", location: "Bandra", approved: true },
      { customerName: "Mohammed Ali", rating: 5, review: "Best painting service in Mumbai. Used Asian Paints premium and the finish is amazing. Workers were very skilled.", location: "Kurla West", approved: true },
      { customerName: "Neha Joshi", rating: 4, review: "Texture painting turned out beautiful. The team gave great suggestions for color combinations.", location: "Thane", approved: true },
    ]);

    await db.insert(galleryImages).values([
      { title: "Terrace Waterproofing - Andheri", imageUrl: "/images/service-terrace.png", category: "waterproofing" },
      { title: "Bathroom Repair - Dadar", imageUrl: "/images/service-bathroom.png", category: "waterproofing" },
      { title: "Before & After - Wall Repair", imageUrl: "/images/before-after-1.png", category: "before-after" },
      { title: "Interior Painting - Bandra Flat", imageUrl: "/images/service-interior.png", category: "painting" },
      { title: "Exterior Building Paint", imageUrl: "/images/service-exterior.png", category: "painting" },
      { title: "Texture Wall Design", imageUrl: "/images/service-texture.png", category: "painting" },
      { title: "Waterproofing in Progress", imageUrl: "/images/hero-waterproofing.png", category: "waterproofing" },
      { title: "Fresh Painted Interior", imageUrl: "/images/hero-painting.png", category: "painting" },
    ]);

    await db.insert(blogPosts).values([
      {
        title: "Best Waterproofing Solutions for Terrace in Mumbai",
        slug: "best-waterproofing-terrace-mumbai",
        excerpt: "Learn about the most effective waterproofing methods for your terrace in Mumbai's heavy monsoon climate.",
        content: `Mumbai's heavy monsoon season makes terrace waterproofing essential for every building. Without proper waterproofing, water seepage can damage your ceiling, walls, and even the structure of your building.

Best Methods for Terrace Waterproofing:

1. Membrane Waterproofing - This involves applying a waterproof membrane layer on the terrace surface. It's one of the most effective methods for flat terraces.

2. Chemical Waterproofing - High-quality waterproofing chemicals are applied to the terrace surface. This is ideal for terraces with minor cracks.

3. Cementitious Coating - A cement-based waterproof coating that provides a strong protective layer against water seepage.

4. Polyurethane Coating - Advanced coating that provides excellent flexibility and waterproofing protection.

Why Choose Professional Waterproofing?

DIY waterproofing may seem cheaper, but it often fails within a year. Professional waterproofing by experienced companies like Rain Guard ensures:
- Proper surface preparation
- Use of high-quality chemicals
- Expert application technique
- 5-year warranty on all work

Contact Rain Guard for a free terrace inspection and get the best waterproofing solution for your home.`,
        image: "/images/service-terrace.png",
        published: true,
      },
      {
        title: "How to Stop Wall Leakage Permanently",
        slug: "stop-wall-leakage-permanently",
        excerpt: "Wall leakage can cause serious damage to your home. Here's how to fix it permanently with professional solutions.",
        content: `Wall leakage is one of the most common problems faced by homeowners in Mumbai. If left untreated, it can lead to dampness, mold growth, paint peeling, and even structural damage.

Common Causes of Wall Leakage:

1. Cracks in external walls
2. Poor waterproofing during construction
3. Damaged plumbing pipes inside walls
4. Rainwater seepage through windows
5. Rising dampness from the ground

How to Fix Wall Leakage:

Step 1: Identify the Source
The first step is to identify where the water is coming from. This requires expert inspection to find the exact source of leakage.

Step 2: Choose the Right Treatment
- Injection Grouting: For internal wall cracks
- External Waterproof Coating: For external wall protection
- Crack Filling: For visible cracks on walls
- Damp Proofing: For rising dampness issues

Step 3: Professional Application
Always hire experienced professionals for wall leakage repair. Improper treatment can make the problem worse.

Prevention Tips:
- Regular inspection of walls during monsoon
- Apply waterproof paint on external walls
- Fix cracks immediately, don't wait
- Ensure proper drainage around your building

Rain Guard specializes in permanent wall leakage solutions. Call us for a free inspection.`,
        image: "/images/before-after-1.png",
        published: true,
      },
      {
        title: "Cost of House Painting in Mumbai 2024",
        slug: "cost-house-painting-mumbai",
        excerpt: "Complete guide to house painting costs in Mumbai. Learn about rates per sq ft, paint brands, and what affects pricing.",
        content: `Planning to paint your house? Understanding the cost structure helps you budget properly and avoid surprises.

Painting Cost Breakdown (Per Sq Ft):

Interior Painting:
- Economy: Rs. 12-15/sq.ft (local brands)
- Standard: Rs. 18-22/sq.ft (Asian Paints, Berger)
- Premium: Rs. 25-35/sq.ft (Dulux, Nerolac premium)

Exterior Painting:
- Standard: Rs. 20-25/sq.ft
- Premium: Rs. 28-40/sq.ft
- Texture: Rs. 35-55/sq.ft

What's Included in the Cost:
1. Wall preparation (putty, primer)
2. Two coats of paint
3. Labor charges
4. Basic protection of furniture

Factors That Affect Cost:
- Quality of paint brand chosen
- Condition of existing walls
- Number of coats needed
- Height of the building (for exterior)
- Texture or special finishes

Tips to Save Money:
1. Get multiple quotes and compare
2. Choose the right quality for each room
3. Paint during off-season (non-monsoon months)
4. Bundle interior and exterior painting

Rain Guard offers competitive painting rates with premium finish quality. Contact us for a free estimate.`,
        image: "/images/service-interior.png",
        published: true,
      },
      {
        title: "Bathroom Waterproofing Guide: Everything You Need to Know",
        slug: "bathroom-waterproofing-guide",
        excerpt: "Complete guide to bathroom waterproofing. Learn why it's important and how professionals handle it.",
        content: `Bathroom waterproofing is crucial to prevent water damage to your home. Water from bathrooms can seep through floors and walls, causing damage to the structure below.

Signs You Need Bathroom Waterproofing:
1. Water spots on ceiling below bathroom
2. Damp or wet walls near bathroom
3. Paint peeling or bubbling near bathroom area
4. Musty smell in bathroom area
5. Visible water stains on tiles or grout

Professional Bathroom Waterproofing Process:

Step 1: Inspection
Expert inspection to identify all leakage points and assess the condition of existing waterproofing.

Step 2: Treatment Selection
Based on inspection, the right treatment method is selected:
- Injection Grouting (without tile breaking)
- Full Waterproofing (with tile replacement)
- Chemical Treatment (for minor issues)

Step 3: Application
Professional application of waterproofing chemicals and membranes by skilled workers.

Step 4: Testing
Water retention test to ensure complete waterproofing before finishing.

Cost of Bathroom Waterproofing:
- Without tile breaking: Rs. 8,000 - 15,000
- With tile replacement: Rs. 20,000 - 40,000

Rain Guard provides bathroom waterproofing with a 5-year warranty. Contact us for an inspection.`,
        image: "/images/service-bathroom.png",
        published: true,
      },
    ]);

    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await db.insert(adminUsers).values({
      email: "admin@rainguard.com",
      password: hashedPassword,
      role: "owner",
    });

    log("Database seeded successfully!");
  } catch (error) {
    log(`Seed error: ${error}`);
  }
}
