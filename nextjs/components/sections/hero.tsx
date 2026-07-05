"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { AuroraGlow } from "../backgrounds/aurora-glow";
import { useCmsData } from "@/hooks/useCmsData";

type ProfileDoc = {
  name?: string;
  bio?: string;
  photo?: {
    url: string;
    alt?: string;
  } | null;
};

const CMS_BASE_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001";

export function Hero() {
  const { data, loading, error, noData } = useCmsData<ProfileDoc>("api/profile");
  const profileData = data?.[0];
  const name = profileData?.name?.trim() || "";

  let imageSrc = profileData?.photo?.url || "";

  if (imageSrc && !imageSrc.startsWith("http")) {
    imageSrc = `${CMS_BASE_URL}/${imageSrc}`;
  }

  // Error state
  if (error) {
    return (
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <AuroraGlow />
        <div className="container relative z-10 max-w-md px-6 text-center">
          <div className="mx-auto mb-6 text-6xl">⚠️</div>
          <h2 className="mb-4 font-display text-3xl font-medium text-foreground">
            Unable to Load Profile
          </h2>
          <p className="mb-8 text-foreground/70">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </section>
    );
  }

  // No data state (successful response but empty/missing data)
  if (noData) {
    return (
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <AuroraGlow />
        <div className="container relative z-10 flex flex-col items-center justify-center py-32 text-center">
          <div className="mx-auto mb-8 text-7xl opacity-40">📭</div>
          <h2 className="mb-4 font-display text-4xl font-medium text-foreground">
            No Profile Data Yet
          </h2>
          <p className="max-w-md text-foreground/70">
            The backend responded successfully, but no profile information is available at the moment.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-8"
            variant="outline"
          >
            Refresh
          </Button>
        </div>
      </section>
    );
  }

  // Loading state
  if (loading) {
    return (
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <AuroraGlow />
        <div className="relative z-10 font-mono text-sm uppercase tracking-widest text-ice">
          Loading profile...
        </div>
      </section>
    );
  }

  // Normal render (data available)
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      <AuroraGlow />
      <div className="container relative z-10 flex flex-col-reverse items-center gap-12 py-32 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <motion.p className="font-mono text-xs uppercase tracking-[0.3em] text-ice">
            A Public Second Brain
          </motion.p>

          <motion.h1 className="mt-6 font-display text-5xl font-medium leading-[1.05] text-balance sm:text-6xl md:text-7xl">
            {name || "Untitled"}
          </motion.h1>

          <motion.p className="mt-5 font-mono text-sm uppercase tracking-widest text-muted sm:text-base">
            Web3 Developer • Quant Builder • Eternal Student
          </motion.p>

          <motion.p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/80">
            I build decentralized systems, experiment with algorithms, and document strange ideas that happen to pass through my mind.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap gap-4">
            <Link href="/journal"><Button size="lg">Explore Journal</Button></Link>
            <Link href="/projects"><Button size="lg" variant="outline">View Projects</Button></Link>
          </motion.div>
        </div>

        <motion.div
          className="relative shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-ice via-sky-400/40 to-transparent blur-2xl" />

          <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-[0_0_40px_-8px_rgba(125,211,252,0.45)] backdrop-blur-sm sm:h-48 sm:w-48 md:h-56 md:w-56">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="Profile picture"
                fill
                sizes="(min-width: 768px) 224px, 192px"
                className="object-cover"
                priority
                onError={(e) => {
                  console.error("Image failed to load:", imageSrc);
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-xs text-muted-foreground">
                No image available
              </div>
            )}
          </div>

          <div className="pointer-events-none absolute inset-[-14px] rounded-full border border-ice/20" />
        </motion.div>
      </div>
    </section>
  );
}