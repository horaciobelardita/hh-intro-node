import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearDatabase() {
  // Elimina todos los estudiantes
  await prisma.student.deleteMany({});
  // Elimina todos los instructores
  await prisma.instructor.deleteMany({});

  console.log("Todos los datos han sido eliminados.");
}

async function main() {
  await clearDatabase();
  const instructor1 = await prisma.instructor.create({
    data: {
      name: "John Doe",
      students: {
        create: [{ name: "Alice Johnson" }, { name: "Bob Smith" }],
      },
    },
  });

  const instructor2 = await prisma.instructor.create({
    data: {
      name: "Jane Doe",
      students: {
        create: [{ name: "Charlie Brown" }, { name: "Diana Prince" }],
      },
    },
  });

  const instructor3 = await prisma.instructor.create({
    data: {
      name: "Emily Davis",
      students: {
        create: [
          { name: "Ethan Hunt" },
          { name: "Olivia Benson" },
          { name: "Sophia Loren" },
        ],
      },
    },
  });

  const instructor4 = await prisma.instructor.create({
    data: {
      name: "Michael Scott",
      students: {
        create: [
          { name: "Jim Halpert" },
          { name: "Pam Beesly" },
          { name: "Dwight Schrute" },
          { name: "Stanley Hudson" },
        ],
      },
    },
  });

  console.log("Instructores y estudiantes creados:", {
    instructor1,
    instructor2,
    instructor3,
    instructor4,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
