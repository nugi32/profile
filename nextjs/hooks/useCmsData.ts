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
    let mounted = true;

    async function loadCmsData() {
      try {
        setError("");
        setNoData(false);
        setLoading(true);

        const response = await fetchFromCms<CmsResponse<T>>(endpoint);

        if (!response?.docs || !Array.isArray(response.docs) || response.docs.length === 0) {
          if (!mounted) return;
          setNoData(true);
          return;
        }

        if (mounted) {
          setData(response.docs);
        }
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message || "Failed to load data from CMS");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    loadCmsData();

    return () => {
      mounted = false;
    };
  }, [endpoint]);

  return { data, loading, error, noData };
}
