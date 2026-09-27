import { getDb } from "./mongodb";

/**
 * CORS whitelist, persisted in MongoDB (not the filesystem).
 *
 * This used to be written to a JSON file on disk, which does not work on
 * serverless hosts (e.g. Vercel): the filesystem there is read-only outside
 * /tmp, and /tmp itself isn't shared across instances or deploys, so writes
 * would either throw or silently disappear. A single document in Mongo is
 * shared and durable across every instance.
 */
const SETTINGS_ID = "cors-whitelist";

interface CorsSettingsDoc {
  _id: string;
  origins: string[];
}

async function settings() {
  const db = await getDb();
  return db.collection<CorsSettingsDoc>("settings");
}

export async function getStoredOrigins(): Promise<string[]> {
  const doc = await (await settings()).findOne({ _id: SETTINGS_ID });
  return doc?.origins ?? [];
}

export async function setStoredOrigins(origins: string[]): Promise<string[]> {
  await (await settings()).updateOne(
    { _id: SETTINGS_ID },
    { $set: { origins } },
    { upsert: true }
  );
  return origins;
}
