"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LuX } from "react-icons/lu";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { tint, toneAt } from "@/lib/tones";
import { useCms } from "../providers/cms-provider";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { profile } = useCms();
  const displayName = profile?.displayName ?? "";
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 overflow-y-auto bg-bg/95 backdrop-blur-md md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between px-5 py-5">
            <span className="font-display text-xl font-extrabold">
              {displayName ? `${displayName}'s corner` : "Menu"}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="chip flex h-11 w-11 items-center justify-center"
            >
              <LuX size={20} />
            </button>
          </div>

          <motion.nav
            aria-label="Main"
            className="flex flex-col gap-4 px-5 pb-10 pt-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {siteConfig.nav.map((item, i) => (
              <motion.div
                key={item.href}
                variants={{
                  hidden: { opacity: 0, y: 14, scale: 0.97 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "sticker pressable flex items-center gap-4 px-5 py-4 font-display text-2xl font-extrabold",
                    tint[toneAt(i)]
                  )}
                >
                  <item.icon size={26} aria-hidden="true" />
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
