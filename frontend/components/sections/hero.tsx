"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { AuroraGlow } from "../backgrounds/aurora-glow";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      <AuroraGlow />
      <div className="container relative z-10 flex flex-col-reverse items-center gap-12 py-32 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.3em] text-ice"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            A Public Second Brain
          </motion.p>

          <motion.h1
            className="mt-6 font-display text-5xl font-medium leading-[1.05] text-balance sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            className="mt-5 font-mono text-sm uppercase tracking-widest text-muted sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Web3 Developer • Quant Builder • Eternal Student
          </motion.p>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/80"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            I build decentralized systems, experiment with algorithms, and
            document strange ideas that happen to pass through my mind.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link href="/journal">
              <Button size="lg">Explore Journal</Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline">
                View Projects
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          {/* Aurora ring glow behind the photo */}
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-ice via-sky-400/40 to-transparent blur-2xl" />

          <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-[0_0_40px_-8px_rgba(125,211,252,0.45)] backdrop-blur-sm sm:h-48 sm:w-48 md:h-56 md:w-56">
            <Image
              src="/profile.jpeg"
              alt="Portrait of John Doe"
              fill
              sizes="(min-width: 768px) 224px, 192px"
              className="object-cover"
              priority
            />
          </div>

          {/* Thin orbiting ring for the "observatory" motif */}
          <div className="pointer-events-none absolute inset-[-14px] rounded-full border border-ice/20" />
        </motion.div>
      </div>
    </section>
  );
}