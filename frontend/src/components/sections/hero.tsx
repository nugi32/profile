"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AuroraGlow } from "@/components/backgrounds/aurora-glow";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      <AuroraGlow />
      <div className="container relative z-10 py-32">
        <motion.p
          className="font-mono text-xs uppercase tracking-[0.3em] text-ice"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          A Public Second Brain
        </motion.p>

        <motion.h1
          className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] text-balance sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          John Doe
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
    </section>
  );
}
