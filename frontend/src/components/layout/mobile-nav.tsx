"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LuX } from "react-icons/lu";
import { siteConfig } from "@/lib/site-config";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-display text-lg">{siteConfig.name}</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-full border border-panel-border p-2 text-muted hover:text-foreground"
            >
              <LuX size={18} />
            </button>
          </div>
          <motion.nav
            className="flex flex-col gap-1 px-6 pt-8"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {siteConfig.nav.map((item) => (
              <motion.div
                key={item.href}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block border-b border-panel-border py-4 font-display text-2xl text-foreground/90 hover:text-ice"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
