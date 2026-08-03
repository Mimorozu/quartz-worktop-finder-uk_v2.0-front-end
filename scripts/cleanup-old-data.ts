// Deletes search_logs and website_clicks rows older than the retention
// period stated in the privacy policy (24 months). Not wired to a scheduler
// — run manually or hook up to a cron (e.g. Railway cron, GitHub Actions
// scheduled workflow) to actually enforce the stated policy.
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const RETENTION_MONTHS = 24;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - RETENTION_MONTHS);

  const [searchLogs, websiteClicks] = await Promise.all([
    prisma.searchLog.deleteMany({ where: { searchedAt: { lt: cutoff } } }),
    prisma.websiteClick.deleteMany({ where: { clickedAt: { lt: cutoff } } }),
  ]);

  console.log(`Deleted ${searchLogs.count} search_logs rows older than ${cutoff.toISOString()}`);
  console.log(`Deleted ${websiteClicks.count} website_clicks rows older than ${cutoff.toISOString()}`);
}

main().finally(() => prisma.$disconnect());
