import "reflect-metadata";
import "dotenv/config";
import { readdirSync } from "fs";
import { join } from "path";

interface SeedModule {
  seed?: () => Promise<void>;
}

const SEED_DIR = __dirname;

async function runAll(): Promise<void> {
  const files = readdirSync(SEED_DIR)
    .filter(
      (file) =>
        file.endsWith(".seed.ts") &&
        file !== "seedAll.ts" &&
        file !== "index.ts"
    )
    .sort((a, b) => {
      if (a.includes("role")) return -1;
      if (b.includes("role")) return 1;
      return a.localeCompare(b);
    });

  for (const file of files) {
    console.log(`Ejecutando seed: ${file}`);
    const mod: SeedModule = await import(join(SEED_DIR, file));

    if (typeof mod.seed === "function") {
      await mod.seed();
    } else {
      console.warn(`⚠️  ${file} no exporta una función 'seed'.`);
    }
  }

  console.log("✅ Todos los seeds finalizaron.");
}

runAll().catch((error) => {
  console.error("Error al ejecutar los seeds:", error);
  process.exit(1);
});
