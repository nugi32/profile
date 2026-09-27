import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB || "headless_cms";

if (!uri) {
  throw new Error("Missing MONGODB_URI in .env.local");
}

let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Cache the connection on `global` in every environment, not just dev.
// This module runs at import time, so on a warm serverless instance
// (Vercel etc.) it only re-executes on cold start — but caching on
// `global` explicitly (rather than relying on module-scope survival)
// makes that reuse intentional and consistent between dev and prod,
// instead of two different code paths that happen to behave similarly.
if (!global._mongoClientPromise) {
  global._mongoClientPromise = new MongoClient(uri).connect();
}
clientPromise = global._mongoClientPromise;

export async function getDb(): Promise<Db> {
  const c = await clientPromise;
  return c.db(dbName);
}

export default clientPromise;
