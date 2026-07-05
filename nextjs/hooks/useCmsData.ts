"use client";

import { useEffect, useState } from "react";
import { fetchFromCms } from "@/lib/fetcher";

export type CmsResponse<T> = {
  docs: T[];
};

export function useCmsData<T>(endpoint: string) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCmsData() {
      try {
        setError("");
        setNoData(false);
        setLoading(true);

        const response = await fetchFromCms<CmsResponse<T>>(endpoint, controller.signal);

        if (!response?.docs || !Array.isArray(response.docs) || response.docs.length === 0) {
          setNoData(true);
          return;
        }

        setData(response.docs);
      } catch (err: any) {
        if (err.name === "CanceledError" || err.name === "AbortError") return; // ignore aborted/duplicate calls
        setError(err?.message || "Failed to load data from CMS");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadCmsData();

    return () => {
      controller.abort();
    };
  }, [endpoint]);

  return { data, loading, error, noData };
}