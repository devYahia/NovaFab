import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log(" Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@novafab.com" },
    update: {},
    create: {
      email: "admin@novafab.com",
      password: adminPassword,
      firstName: "Ahmed",
      lastName: "Hassan",
      role: "ADMIN",
      phone: "+201012345678",
    },
  });

  // Create Egyptian customers
  const customerPassword = await bcrypt.hash("customer123", 12);

  const customers = [
    {
      email: "mohamed.ali@gmail.com",
      firstName: "Mohamed",
      lastName: "Ali",
      phone: "+201098765432",
    },
    {
      email: "fatma.ahmed@yahoo.com",
      firstName: "Fatma",
      lastName: "Ahmed",
      phone: "+201123456789",
    },
    {
      email: "omar.mahmoud@hotmail.com",
      firstName: "Omar",
      lastName: "Mahmoud",
      phone: "+201234567890",
    },
    {
      email: "sara.hassan@gmail.com",
      firstName: "Sara",
      lastName: "Hassan",
      phone: "+201156789012",
    },
  ];

  for (const customerData of customers) {
    await prisma.user.upsert({
      where: { email: customerData.email },
      update: {},
      create: {
        ...customerData,
        password: customerPassword,
        role: "CUSTOMER",
      },
    });
  }

  // Create service types
  const serviceTypes = [
    {
      name: "3D Printing",
      description: "High-quality 3D printing services using various materials",
      basePrice: 25.0,
      category: "Additive Manufacturing",
      isActive: true,
    },
    {
      name: "CNC Machining",
      description: "Precision CNC machining for metal and plastic parts",
      basePrice: 50.0,
      category: "Subtractive Manufacturing",
      isActive: true,
    },
    {
      name: "Laser Cutting",
      description: "Precise laser cutting for various materials",
      basePrice: 30.0,
      category: "Cutting Services",
      isActive: true,
    },
    {
      name: "Injection Molding",
      description: "High-volume injection molding services",
      basePrice: 100.0,
      category: "Molding Services",
      isActive: true,
    },
  ];

  for (const serviceType of serviceTypes) {
    await prisma.serviceType.upsert({
      where: { name: serviceType.name },
      update: {},
      create: serviceType,
    });
  }

  // Create sample gallery items
  const galleryItems = [
    {
      title: "Custom Drone Frame",
      description:
        "Lightweight carbon fiber drone frame with precision CNC machining",
      imageUrl: "/gallery/drone-frame.jpg",
      category: "3D Printing",
      isPublic: true,
    },
    {
      title: "Automotive Prototype",
      description:
        "Functional automotive part prototype using advanced materials",
      imageUrl: "/gallery/auto-prototype.jpg",
      category: "CNC Machining",
      isPublic: true,
    },
    {
      title: "Architectural Model",
      description: "Detailed architectural scale model with intricate details",
      imageUrl: "/gallery/arch-model.jpg",
      category: "Laser Cutting",
      isPublic: true,
    },
  ];

  for (const item of galleryItems) {
    await prisma.galleryItem.create({
      data: item,
    });
  }

  console.log("✅ Database seeded successfully!");
  console.log("👤 Admin user: admin@novafab.com / admin123");
  console.log("👤 Customer users:");
  console.log("   - mohamed.ali@gmail.com / customer123");
  console.log("   - fatma.ahmed@yahoo.com / customer123");
  console.log("   - omar.mahmoud@hotmail.com / customer123");
  console.log("   - sara.hassan@gmail.com / customer123");
}

main()
  .catch((e) => {
    console.error(" Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
