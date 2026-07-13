import { randomUUID } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

let database: PGlite;

async function applyMigrations(db: PGlite) {
  const migrationDirectory = join(process.cwd(), "drizzle");
  const migrations = readdirSync(migrationDirectory)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const migration of migrations) {
    await db.exec(readFileSync(join(migrationDirectory, migration), "utf8"));
  }
}

async function createDossier(label: string) {
  const userId = randomUUID();
  const dossierId = randomUUID();

  await database.query(
    "insert into users (id, name, email) values ($1, $2, $3)",
    [userId, `User ${label}`, `${label}@example.test`],
  );
  await database.query(
    "insert into research_dossiers (id, user_id, title, central_question) values ($1, $2, $3, $4)",
    [dossierId, userId, `Dossier ${label}`, `Question ${label}?`],
  );

  return { dossierId, userId };
}

async function createStudyItem(dossierId: string, content: string) {
  const itemId = randomUUID();

  await database.query(
    "insert into study_items (id, dossier_id, type, content) values ($1, $2, 'note', $3)",
    [itemId, dossierId, content],
  );

  return itemId;
}

beforeAll(async () => {
  database = new PGlite();
  await applyMigrations(database);
});

beforeEach(async () => {
  await database.exec("truncate table users cascade");
});

afterAll(async () => {
  await database.close();
});

describe("database migration", () => {
  it("creates every table in the research model", async () => {
    const result = await database.query<{ tablename: string }>(
      "select tablename from pg_tables where schemaname = 'public' order by tablename",
    );

    expect(result.rows.map((row) => row.tablename)).toEqual([
      "bible_references",
      "connections",
      "research_dossiers",
      "research_questions",
      "source_references",
      "sources",
      "study_items",
      "themes",
      "users",
      "writing_section_items",
      "writing_sections",
    ]);
  });
});

describe("connection integrity", () => {
  it("rejects a connection from an item to itself", async () => {
    const { dossierId } = await createDossier("self-link");
    const itemId = await createStudyItem(dossierId, "A single note");

    await expect(
      database.query(
        "insert into connections (dossier_id, source_item_id, target_item_id, type) values ($1, $2, $2, 'supports')",
        [dossierId, itemId],
      ),
    ).rejects.toThrow(/connections_distinct_items/);
  });

  it("rejects connections between different dossiers", async () => {
    const first = await createDossier("first");
    const second = await createDossier("second");
    const sourceItemId = await createStudyItem(first.dossierId, "First dossier");
    const targetItemId = await createStudyItem(second.dossierId, "Second dossier");

    await expect(
      database.query(
        "insert into connections (dossier_id, source_item_id, target_item_id, type) values ($1, $2, $3, 'supports')",
        [first.dossierId, sourceItemId, targetItemId],
      ),
    ).rejects.toThrow(/connections_target_same_dossier_fk/);
  });

  it("rejects an exact duplicate connection", async () => {
    const { dossierId } = await createDossier("duplicate");
    const sourceItemId = await createStudyItem(dossierId, "Source");
    const targetItemId = await createStudyItem(dossierId, "Target");
    const query =
      "insert into connections (dossier_id, source_item_id, target_item_id, type) values ($1, $2, $3, 'supports')";
    const parameters = [dossierId, sourceItemId, targetItemId];

    await database.query(query, parameters);
    await expect(database.query(query, parameters)).rejects.toThrow(/connections_unique/);
  });
});

describe("reference integrity", () => {
  it("rejects invalid Bible chapters and verse ranges", async () => {
    const { dossierId } = await createDossier("bible-reference");
    const itemId = await createStudyItem(dossierId, "Romans 1");

    await expect(
      database.query(
        "insert into bible_references (study_item_id, book, chapter) values ($1, 'Romans', 0)",
        [itemId],
      ),
    ).rejects.toThrow(/bible_references_chapter_positive/);

    await expect(
      database.query(
        "insert into bible_references (study_item_id, book, chapter, verse_from, verse_to) values ($1, 'Romans', 1, 17, 16)",
        [itemId],
      ),
    ).rejects.toThrow(/bible_references_verse_to_valid/);
  });
});
