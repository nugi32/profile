// lib/fetcher.ts
import axios from "axios";

const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL ?? process.env.CMS_URL ?? "";

function resolveCmsUrl(endpoint: string) {
  const base = cmsUrl.replace(/\/+$/, "");
  const path = endpoint.replace(/^\/+/, "");
  return `${base}/${path}`;
}

export async function fetchFromCms<T>(endpoint: string): Promise<T> {
  if (!cmsUrl) {
    throw new Error("CMS URL is not configured. Please set NEXT_PUBLIC_CMS_URL");
  }

  try {
    const response = await axios.get(resolveCmsUrl(endpoint), {
      timeout: 8000,
      headers: { "Content-Type": "application/json" },
    });

    const data = response.data;

    if (data && typeof data === "object" && Array.isArray(data.docs)) {
      console.log("✅ CMS data loaded successfully");
      return data as T;
    }

    throw new Error("Invalid CMS response format");
  } catch (error: any) {
    console.error("❌ fetchFromCms failed:", error.message || error);
    throw error; // Re-throw so component can handle it
  }
}