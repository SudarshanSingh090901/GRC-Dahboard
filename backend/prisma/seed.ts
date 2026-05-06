// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   await prisma.user.deleteMany();

//   await prisma.user.createMany({
//     data: [
//       {
//         name: "Admin",
//         role: "Admin",
//         password: "Admin@123",
//       },

//       // Control Owners
//       {
//         name: "Megha Thomas",
//         role: "Control Owner",
//         password: "MeghaThomas@123",
//       },
//       {
//         name: "Satyam Chadha",
//         role: "Control Owner",
//         password: "SatyamChadha@123",
//       },
//       {
//         name: "Neha Kunche Naidu",
//         role: "Control Owner",
//         password: "NehaKuncheNaidu@123",
//       },

//       // Testers
//       {
//         name: "Sudarshan Singh",
//         role: "Tester",
//         password: "SudarshanSingh@123",
//       },
//       {
//         name: "Ponnakka",
//         role: "Tester",
//         password: "Ponnakka@123",
//       },
//       {
//         name: "Mitali Hegde",
//         role: "Tester",
//         password: "MitaliHegde@123",
//       },
//     ],
//   });

//   console.log("Seeded users successfully");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });





// import { PrismaClient } from "@prisma/client";
// import { frameworkControls } from "../src/data/frameworkControls"; // adjust path

// const prisma = new PrismaClient();

// async function main() {
//   console.log("Seeding controls...");

//   await prisma.control.deleteMany();

//   await prisma.control.createMany({
//     data: frameworkControls.map((c) => ({
//       framework: c.framework,
//       controlId: c.controlId,
//       controlName: c.controlName,
//     })),
//     skipDuplicates: true,
//   });

//   console.log("✅ Controls seeded:", frameworkControls.length);
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(() => prisma.$disconnect());












import { PrismaClient } from "@prisma/client";
import { frameworkControls } from "../src/data/frameworkControls";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 🔥 Clear only assignments + controls
  await prisma.assignment.deleteMany();
  await prisma.control.deleteMany();

  // 📋 CONTROLS
  await prisma.control.createMany({
    data: frameworkControls.map((c) => ({
      framework: c.framework,
      controlId: c.controlId,
      controlName: c.controlName,
    })),
    skipDuplicates: true,
  });

  console.log("✅ Controls seeded:", frameworkControls.length);

  // 🔍 FETCH YOUR REAL USERS
  const users = await prisma.user.findMany();

  const owners = users.filter((u) => u.role === "Control Owner");
  const testers = users.filter((u) => u.role === "Tester");

  if (owners.length === 0 || testers.length === 0) {
    throw new Error("❌ Required users not found in DB");
  }

  console.log("👤 Owners:", owners.map((o) => o.name));
  console.log("🧪 Testers:", testers.map((t) => t.name));

  // 🔍 CONTROLS
  const controls = await prisma.control.findMany({
    take: 30, // adjust if needed
  });

  // 🔗 ASSIGNMENTS (REAL DISTRIBUTION)
  const assignmentsData = controls.map((c, index) => ({
    framework: c.framework,
    controlId: c.controlId,
    controlName: c.controlName,

    // 👇 rotating assignment among your actual people
    // owner: owners[index % owners.length].name,
    // tester: testers[index % testers.length].name,

    ownerName: owners[index % owners.length].name,
    testerName: testers[index % testers.length].name,

    status: "Pending",
  }));

  await prisma.assignment.createMany({
    data: assignmentsData,
  });

  console.log("✅ Assignments seeded:", assignmentsData.length);
}

main()
  .catch((e) => {
    console.error("🔥 SEED ERROR:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });