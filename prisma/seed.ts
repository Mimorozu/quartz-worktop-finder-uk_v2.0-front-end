import { readFileSync } from "node:fs";
import { join } from "node:path";
import { prisma } from "../src/lib/prisma";

/**
 * Seeds companies + coverage_postcodes from the original PHP project's
 * `stonemasons.sql` dump (sibling folder, not part of this repo).
 * website_clicks is intentionally skipped - that's live analytics data
 * and starts empty in the new app.
 */
const DUMP_PATH = join(
  __dirname,
  "../../quartz-worktop-finder-uk/stonemasons.sql"
);

type SqlValue = string | number | null;

// Splits a `VALUES (...), (...), ...;` block into raw per-row tuple strings,
// respecting single-quoted strings (with '' as an escaped quote) so commas
// and parens inside string values don't break the split.
function splitTuples(valuesBlock: string): string[] {
  const tuples: string[] = [];
  let depth = 0;
  let inString = false;
  let current = "";

  for (let i = 0; i < valuesBlock.length; i++) {
    const ch = valuesBlock[i];

    if (inString) {
      current += ch;
      if (ch === "'") {
        // '' is an escaped quote inside a string, not the closing quote
        if (valuesBlock[i + 1] === "'") {
          current += "'";
          i++;
        } else {
          inString = false;
        }
      }
      continue;
    }

    if (ch === "'") {
      inString = true;
      current += ch;
      continue;
    }

    if (ch === "(") {
      depth++;
      if (depth === 1) {
        current = "";
        continue;
      }
    }

    if (ch === ")") {
      depth--;
      if (depth === 0) {
        tuples.push(current);
        continue;
      }
    }

    if (depth > 0) {
      current += ch;
    }
  }

  return tuples;
}

// Parses a single tuple's raw text into typed values, splitting on
// top-level commas (i.e. commas outside of quoted strings).
function parseTuple(tuple: string): SqlValue[] {
  const fields: SqlValue[] = [];
  let inString = false;
  let current = "";

  const pushField = () => {
    const trimmed = current.trim();
    if (trimmed === "NULL") {
      fields.push(null);
    } else if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
      fields.push(trimmed.slice(1, -1).replace(/''/g, "'"));
    } else {
      fields.push(Number(trimmed));
    }
    current = "";
  };

  for (let i = 0; i < tuple.length; i++) {
    const ch = tuple[i];

    if (inString) {
      current += ch;
      if (ch === "'") {
        if (tuple[i + 1] === "'") {
          current += "'";
          i++;
        } else {
          inString = false;
        }
      }
      continue;
    }

    if (ch === "'") {
      inString = true;
      current += ch;
      continue;
    }

    if (ch === ",") {
      pushField();
      continue;
    }

    current += ch;
  }
  pushField();

  return fields;
}

function extractValuesBlock(sql: string, tableName: string): string {
  const insertMarker = `INSERT INTO \`${tableName}\``;
  const start = sql.indexOf(insertMarker);
  if (start === -1) {
    throw new Error(`Could not find INSERT statement for ${tableName}`);
  }
  const valuesStart = sql.indexOf("VALUES", start);
  const end = sql.indexOf(";", valuesStart);
  return sql.slice(valuesStart + "VALUES".length, end);
}

async function seedCompanies(sql: string) {
  const rows = splitTuples(extractValuesBlock(sql, "companies")).map(
    parseTuple
  );

  // Columns: id, company_name, contact_name, phone, email, website,
  // address_line1, address_line2, city, county, postcode, coverage_area,
  // description, services_offered, logo_url, featured, active, date_added,
  // last_updated. coverage_area/services_offered/logo_url are always
  // empty in the dump and unused by the original app, so they're skipped.
  await prisma.company.createMany({
    data: rows.map((r) => ({
      id: r[0] as number,
      companyName: (r[1] as string).trim(),
      contactName: (r[2] as string) || null,
      phone: r[3] as string,
      email: (r[4] as string) || null,
      website: (r[5] as string) || null,
      addressLine1: (r[6] as string) || null,
      addressLine2: (r[7] as string) || null,
      city: (r[8] as string) || null,
      county: (r[9] as string) || null,
      postcode: (r[10] as string) || null,
      description: (r[12] as string) || null,
      featured: r[15] === 1,
      active: r[16] === 1,
      dateAdded: new Date(r[17] as string),
      lastUpdated: new Date(r[18] as string),
    })),
  });

  console.log(`Seeded ${rows.length} companies`);
}

async function seedCoveragePostcodes(sql: string) {
  const rows = splitTuples(extractValuesBlock(sql, "coverage_postcodes")).map(
    parseTuple
  );

  await prisma.coveragePostcode.createMany({
    data: rows.map((r) => ({
      id: r[0] as number,
      companyId: r[1] as number,
      postcodeArea: r[2] as string,
    })),
  });

  console.log(`Seeded ${rows.length} coverage postcodes`);
}

async function resetSequences() {
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('companies', 'id'), (SELECT MAX(id) FROM companies))`
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('coverage_postcodes', 'id'), (SELECT MAX(id) FROM coverage_postcodes))`
  );
}

async function main() {
  const sql = readFileSync(DUMP_PATH, "utf-8");

  await seedCompanies(sql);
  await seedCoveragePostcodes(sql);
  await resetSequences();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
