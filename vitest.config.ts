import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    include: ["**/*.test.{ts,tsx}"],
    pool: "forks",
    restoreMocks: true,
    testTimeout: 15_000,
  },
});
