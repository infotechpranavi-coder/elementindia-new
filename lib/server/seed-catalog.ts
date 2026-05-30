import { promises as fs } from "fs";
import path from "path";
import type { CatalogData, ProductItem } from "@/lib/catalog-types";

const dataFile = path.join(process.cwd(), "data", "catalog.json");

export async function readSeedProducts(): Promise<ProductItem[]> {
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(raw) as Partial<CatalogData>;
    return Array.isArray(parsed.products) ? parsed.products : [];
  } catch {
    return [];
  }
}
