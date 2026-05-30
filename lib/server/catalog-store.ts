import { promises as fs } from "fs";
import path from "path";
import type { CatalogData, ServiceItem } from "@/lib/catalog-types";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "catalog.json");

const defaultCatalog: CatalogData = {
  products: [
    {
      id: "prod-cctv-kit",
      name: "HD CCTV Camera System (8 Channel)",
      category: "CCTV",
      price: 45999,
      description: "Complete 8-channel surveillance kit for office and factory setups.",
      imageUrl:
        "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80",
    },
    {
      id: "prod-biometric-terminal",
      name: "Biometric Access Control Terminal",
      category: "Access",
      price: 28999,
      description: "Fingerprint and RFID based access terminal for secure entry.",
      imageUrl:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
    },
  ],
  services: [
    {
      id: "srv-access-control-system",
      title: "Access Control System",
      slug: "access-control-system",
      summary: "Secure entry management with biometric, card, and controller solutions.",
      imageUrl:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80",
    },
    {
      id: "srv-cctv-system",
      title: "CCTV System",
      slug: "cctv-system",
      summary: "IP and HD surveillance infrastructure with monitoring and recording.",
      imageUrl:
        "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=1200&q=80",
    },
  ],
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureDataFile() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(defaultCatalog, null, 2), "utf-8");
  }
}

export async function readCatalog(): Promise<CatalogData> {
  await ensureDataFile();
  const raw = await fs.readFile(dataFile, "utf-8");
  const parsed = JSON.parse(raw) as Partial<CatalogData>;
  return {
    products: Array.isArray(parsed.products) ? parsed.products : [],
    services: Array.isArray(parsed.services) ? parsed.services : [],
  };
}

async function writeCatalog(next: CatalogData) {
  await ensureDataFile();
  await fs.writeFile(dataFile, JSON.stringify(next, null, 2), "utf-8");
}

export {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/server/products-store";

export async function listServices() {
  const data = await readCatalog();
  return data.services;
}

export async function createService(input: Omit<ServiceItem, "id" | "slug"> & { slug?: string }) {
  const data = await readCatalog();
  const id = `srv-${Date.now()}`;
  const slug = slugify(input.slug || input.title);
  const nextService: ServiceItem = { id, slug, title: input.title, summary: input.summary, imageUrl: input.imageUrl };
  const next = { ...data, services: [nextService, ...data.services] };
  await writeCatalog(next);
  return nextService;
}

export async function updateService(id: string, input: Omit<ServiceItem, "id" | "slug"> & { slug?: string }) {
  const data = await readCatalog();
  const idx = data.services.findIndex((item) => item.id === id);
  if (idx < 0) return null;
  const slug = slugify(input.slug || input.title);
  const updated: ServiceItem = { id, slug, title: input.title, summary: input.summary, imageUrl: input.imageUrl };
  data.services[idx] = updated;
  await writeCatalog(data);
  return updated;
}

export async function deleteService(id: string) {
  const data = await readCatalog();
  const nextServices = data.services.filter((item) => item.id !== id);
  if (nextServices.length === data.services.length) return false;
  await writeCatalog({ ...data, services: nextServices });
  return true;
}
