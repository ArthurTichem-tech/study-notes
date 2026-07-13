import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { PGlite } from "@electric-sql/pglite";
import { afterEach, describe, expect, it } from "vitest";

import { runLocalMigrations } from "./local-migrations";

const temporaryDirectories: string[] = [];

function createMigrationDirectory() {
  const directory = mkdtempSync(join(tmpdir(), "study-notes-migrations-"));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { force: true, recursive: true });
  }
});

describe("local migration runner", () => {
  it("applies each migration once in filename order", async () => {
    const directory = createMigrationDirectory();
    writeFileSync(
      join(directory, "0000_first.sql"),
      "create table first_table (id integer primary key);",
    );
    writeFileSync(
      join(directory, "0001_second.sql"),
      "create table second_table (id integer primary key);",
    );
    const database = new PGlite();

    try {
      const firstRun = await runLocalMigrations(database, directory);
      const secondRun = await runLocalMigrations(database, directory);

      expect(firstRun).toEqual({
        applied: ["0000_first.sql", "0001_second.sql"],
        available: 2,
      });
      expect(secondRun).toEqual({ applied: [], available: 2 });

      const tables = await database.query<{ tablename: string }>(
        "select tablename from pg_tables where schemaname = 'public' order by tablename",
      );
      expect(tables.rows.map(({ tablename }) => tablename)).toEqual([
        "__study_notes_migrations",
        "first_table",
        "second_table",
      ]);
    } finally {
      await database.close();
    }
  });

  it("rolls back and does not record a failed migration", async () => {
    const directory = createMigrationDirectory();
    writeFileSync(
      join(directory, "0000_broken.sql"),
      "create table should_rollback (id integer); select missing_column from should_rollback;",
    );
    const database = new PGlite();

    try {
      await expect(runLocalMigrations(database, directory)).rejects.toThrow();

      const migrationRows = await database.query<{ count: number }>(
        "select count(*) from __study_notes_migrations",
      );
      const rolledBackTable = await database.query<{ count: number }>(
        "select count(*) from pg_tables where schemaname = 'public' and tablename = 'should_rollback'",
      );

      expect(migrationRows.rows[0]?.count).toBe(0);
      expect(rolledBackTable.rows[0]?.count).toBe(0);
    } finally {
      await database.close();
    }
  });
});
