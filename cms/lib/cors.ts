import { getStoredOrigins, setStoredOrigins } from "./cors-store";

function normalizeOrigin(value: string): string {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return "";

  try {
    const parsed = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return trimmed.replace(/\/+$/, "");
  }
}

export async function getAllowedOrigins(): Promise<string[]> {
  const stored = await getStoredOrigins();
  return stored.map((entry) => normalizeOrigin(entry)).filter(Boolean);
}

export async function isOriginAllowed(origin?: string | null): Promise<boolean> {
  if (!origin) return false;
  const normalized = normalizeOrigin(origin);
  if (!normalized) return false;
  const allowed = await getAllowedOrigins();
  return allowed.includes(normalized);
}

export async function addAllowedOrigin(candidate: string): Promise<string[]> {
  const normalized = normalizeOrigin(candidate);
  if (!normalized) {
    throw new Error("Origin is required.");
  }

  const existing = await getAllowedOrigins();
  const next = [...new Set([...existing, normalized])].sort();
  await setStoredOrigins(next);
  return next;
}

export async function removeAllowedOrigin(candidate: string): Promise<string[]> {
  const normalized = normalizeOrigin(candidate);
  if (!normalized) {
    throw new Error("Origin is required.");
  }

  const current = await getAllowedOrigins();
  const next = current.filter((origin) => origin !== normalized);
  await setStoredOrigins(next);
  return next;
}
