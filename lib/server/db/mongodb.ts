import { MongoClient, type Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const CLIENT_OPTIONS = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

export function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI?.trim());
}

export function getMongoDatabaseName(): string | undefined {
  const explicit = process.env.MONGODB_DB?.trim();
  if (explicit) return explicit;

  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) return undefined;

  const match = uri.match(/mongodb(?:\+srv)?:\/\/[^/]+\/([^/?]+)/i);
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

export function resetMongoClient() {
  global._mongoClientPromise = undefined;
}

function getClientPromise() {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error("MONGODB_URI is not set in environment variables.");
  }

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(uri, CLIENT_OPTIONS).catch((err) => {
      resetMongoClient();
      throw err;
    });
  }

  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  try {
    const client = await getClientPromise();
    const dbName = getMongoDatabaseName();
    return dbName ? client.db(dbName) : client.db();
  } catch (err) {
    resetMongoClient();
    throw err;
  }
}

/** Ping MongoDB; returns false when not configured or unreachable. */
export async function pingMongo(): Promise<{ ok: boolean; dbName?: string; error?: string }> {
  if (!isMongoConfigured()) {
    return { ok: false, error: "MONGODB_URI is not set" };
  }

  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return { ok: true, dbName: db.databaseName };
  } catch (err) {
    resetMongoClient();
    const message = err instanceof Error ? err.message : "MongoDB connection failed";
    return { ok: false, dbName: getMongoDatabaseName(), error: message };
  }
}

export const PRODUCTS_COLLECTION = "products";
export const BLOGS_COLLECTION = "blogs";
export const PRODUCT_CATEGORIES_COLLECTION = "product_categories";
export const CUSTOMERS_COLLECTION = "customers";
