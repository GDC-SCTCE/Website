import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

import { questsData } from './seeds/quests.ts'
import { gamesData } from './seeds/games.ts'
import { teamMembersData } from './seeds/teamMembers.ts'
import { alumniData } from './seeds/alumni.ts'
import { toolsData } from './seeds/tools.ts'

dotenv.config({ path: '.env.local' })
dotenv.config()

const connectionString = `${process.env.DIRECT_URL || process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Cleaning database...");
  await prisma.game.deleteMany();
  await prisma.quest.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.alumni.deleteMany();
  await prisma.tool.deleteMany();

  console.log("Seeding Quests...");
  for (const item of questsData) {
    await prisma.quest.create({ data: item as any });
  }

  console.log("Seeding Games...");
  for (const item of gamesData) {
    await prisma.game.create({ data: item as any });
  }

  console.log("Seeding TeamMembers...");
  for (const item of teamMembersData) {
    await prisma.teamMember.create({ data: item as any });
  }

  console.log("Seeding Alumnis...");
  for (const item of alumniData) {
    await prisma.alumni.create({ data: item as any });
  }

  console.log("Seeding Tools...");
  for (const item of toolsData) {
    await prisma.tool.create({ data: item as any });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });