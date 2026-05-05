import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        role: "Admin",
        password: "Admin@123",
      },

      // Control Owners
      {
        name: "Megha Thomas",
        role: "Control Owner",
        password: "MeghaThomas@123",
      },
      {
        name: "Satyam Chadha",
        role: "Control Owner",
        password: "SatyamChadha@123",
      },
      {
        name: "Neha Kunche Naidu",
        role: "Control Owner",
        password: "NehaKuncheNaidu@123",
      },

      // Testers
      {
        name: "Sudarshan Singh",
        role: "Tester",
        password: "SudarshanSingh@123",
      },
      {
        name: "Ponnakka",
        role: "Tester",
        password: "Ponnakka@123",
      },
      {
        name: "Mitali Hegde",
        role: "Tester",
        password: "MitaliHegde@123",
      },
    ],
  });

  console.log("Seeded users successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });