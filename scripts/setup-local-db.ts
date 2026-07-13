import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { loadEnvFile } from "node:process";

import { PGlite } from "@electric-sql/pglite";

import { runLocalMigrations } from "../src/db/local-migrations";

const localEnvironment = resolve(process.cwd(), ".env.local");
if (existsSync(localEnvironment)) {
  loadEnvFile(localEnvironment);
}
const dataDirectory = resolve(
  process.cwd(),
  process.env.PGLITE_DATA_DIR ?? ".data/postgres",
);

async function main() {
  mkdirSync(dirname(dataDirectory), { recursive: true });
  const database = new PGlite(dataDirectory);

  try {
    const result = await runLocalMigrations(database);

    if (result.applied.length === 0) {
      console.log(
        `Lokale database is actueel (${result.available} migratie(s)): ${dataDirectory}`,
      );
    } else {
      console.log(
        `Lokale database bijgewerkt met ${result.applied.length} migratie(s): ${result.applied.join(", ")}`,
      );
      console.log(`Data opgeslagen in: ${dataDirectory}`);
    }
  } finally {
    await database.close();
  }
}

main().catch((error: unknown) => {
  console.error("Lokale database kon niet worden bijgewerkt.", error);
  process.exitCode = 1;
});
