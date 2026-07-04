"use client";

import { useEffect, useState } from "react";

export function useRouteData<T>(route: string) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setError("");
        setNoData(false);
        setLoading(true);

        const response = await fetch(route, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.statusText}`);
        }

        const json = await response.json();

        if (!json?.docs || !Array.isArray(json.docs) || json.docs.length === 0) {
          if (!mounted) return;
          setNoData(true);
          return;
        }

        if (mounted) {
          setData(json.docs);
        }
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message || "Failed to load data");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [route]);

  return { data, loading, error, noData };
}
