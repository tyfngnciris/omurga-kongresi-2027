const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function upsertUser(email, name, role, plainPassword) {
  const passwordHash = await bcrypt.hash(plainPassword, 10);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name, role, passwordHash },
  });
  console.log(`Hazir: ${role} -> ${email}`);
}

async function main() {
  await upsertUser("admin@turkomurga.org.tr", "Kongre Yoneticisi", "ADMIN", "OmurgaAdmin2027!");
  await upsertUser("hakem1@turkomurga.org.tr", "Ornek Hakem", "REVIEWER", "OmurgaHakem2027!");
  console.log("Seed tamamlandi.");
}

main()
  .catch((e) => {
    console.error("Seed hatasi:", e);
    process.exit(0);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
