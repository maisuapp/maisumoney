// scripts/check_seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const master = await prisma.user.findUnique({
    where: { email: "maisuapp@gmail.com" },
    select: { id: true },
  });
  if (!master) {
    console.log("Master admin not found");
    return;
  }
  const holdingsCount = await prisma.holding.count({ where: { userId: master.id } });
  const gridsCount = await prisma.grid.count({ where: { userId: master.id } });
  console.log(`MASTER_ADMIN holdings: ${holdingsCount}`);
  console.log(`MASTER_ADMIN grids: ${gridsCount}`);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

