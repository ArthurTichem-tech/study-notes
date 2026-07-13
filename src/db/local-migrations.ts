import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import type { PGliteInterface } from "@electric-sql/pglite";

const migrationTable = "__study_notes_migrations";

export type MigrationResult = {
  applied: string[];
  available: number;
};

export async function runLocalMigrations(
  database: PGliteInterface,
  migrationDirectory = join(process.cwd(), "drizzle"),
): Promise<MigrationResult> {
  const migrations = readdirSync(migrationDirectory)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  await database.exec(`
    create table if not exists ${migrationTable} (
      name text primary key,
      applied_at timestamp with time zone default now() not null
    )
  `);

  const recorded = await database.query<{ name: string }>(
    `select name from ${migrationTable}`,
  );
  const appliedNames = new Set(recorded.rows.map(({ name }) => name));
  const applied: string[] = [];

  for (const migration of migrations) {
    if (appliedNames.has(migration)) {
      continue;
    }

    const sql = readFileSync(join(migrationDirectory, migration), "utf8");

    await database.transaction(async (transaction) => {
      await transaction.exec(sql);
      await transaction.query(
        `insert into ${migrationTable} (name) values ($1)`,
        [migration],
      );
    });

    applied.push(migration);
  }

  return { applied, available: migrations.length };
}
