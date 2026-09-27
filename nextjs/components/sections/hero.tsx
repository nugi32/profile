"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LuLaptop, LuMapPin, LuFlame, LuSparkles, LuHand } from "react-icons/lu";
import type { IconType } from "react-icons";
import { buttonVariants } from "../ui/button";
import { useViewMode } from "../providers/view-mode-provider";
import { useCms } from "../providers/cms-provider";
import { cn } from "@/lib/utils";
import { tint, type Tone } from "@/lib/tones";

interface StickerSpec {
  key: string;
  icon: IconType;
  text: string;
  tone: Tone;
  rotate: number;
  /** Tailwind position classes inside the board. */
  position: string;
}

/**
 * The one memorable thing on the page: a little board of stickers around the
 * portrait. Every sticker can be picked up and flung around.
 */
function StickerBoard({
  imageSrc,
  alt,
  initials,
  stickers,
}: {
  imageSrc: string;
  alt: string;
  initials: string;
  stickers: StickerSpec[];
}) {
  const boardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  return (
    <div
      ref={boardRef}
      className="relative mx-auto h-[380px] w-full max-w-[460px] sm:h-[460px]"
    >
      {/* Blob behind the portrait */}
      <div
        aria-hidden="true"
        className="absolute inset-x-6 inset-y-6 border-2 border-line bg-grape-tint shadow-pop-lg"
        style={{ borderRadius: "42% 58% 55% 45% / 50% 44% 56% 50%" }}
      />

      {/* Portrait */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 sm:h-56 sm:w-56"
        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
        whileTap={{ scale: 0.94, rotate: -4 }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-line bg-sun shadow-pop">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={alt}
              fill
              sizes="(min-width: 640px) 224px, 176px"
              className="object-cover"
              priority
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-display text-6xl font-extrabold text-onaccent">
              {initials}
            </div>
          )}
        </div>
      </motion.div>

      {/* Draggable stickers */}
      {stickers.map((sticker, i) => (
        <motion.div
          key={sticker.key}
          drag
          dragConstraints={boardRef}
          dragElastic={0.25}
          dragMomentum={false}
          whileHover={{ scale: 1.06 }}
          whileDrag={{ scale: 1.1, rotate: 0, zIndex: 30 }}
          initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: sticker.rotate - 25 }}
          animate={{ opacity: 1, scale: 1, rotate: sticker.rotate }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: reduce ? 0 : 0.35 + i * 0.12 }}
          className={cn(
            "absolute z-20 max-w-[190px] cursor-grab touch-none rounded-2xl border-2 border-line px-4 py-2.5 text-sm font-bold leading-snug shadow-pop active:cursor-grabbing",
            sticker.position,
            sticker.tone === "grape" ? "bg-grape text-white" : tint[sticker.tone],
            // Tinted stickers keep ink-colored text in both themes.
            sticker.tone !== "grape" && "text-ink"
          )}
        >
          {(() => {
            const StickerIcon = sticker.icon;
            return (
              <span className="flex items-start gap-2">
                <StickerIcon size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>{sticker.text}</span>
              </span>
            );
          })()}
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  // CMS collections: profile, current-focus. Every field is CMS-only and
  // simply doesn't render when the collection is empty.
  const { profile: cmsProfile, currentFocus } = useCms();
  const { setMode } = useViewMode();
  const reduceMotion = useReducedMotion();

  const fullName = cmsProfile?.name ?? "";
  const displayName = cmsProfile?.displayName ?? "";
  const shortRole = cmsProfile?.shortRole ?? "";
  const location = cmsProfile?.location ?? "";
  const initials = cmsProfile?.initials ?? "";
  const bio = cmsProfile?.bio ?? "";
  const imageSrc = cmsProfile?.photoUrl ?? "";
  const focus = currentFocus[0]?.title ?? "";

  const stickers: StickerSpec[] = [
    shortRole && {
      key: "role",
      icon: LuLaptop,
      text: shortRole,
      tone: "bubblegum",
      rotate: -6,
      position: "left-0 top-2 sm:left-2",
    },
    location && {
      key: "location",
      icon: LuMapPin,
      text: location,
      tone: "mint",
      rotate: 5,
      position: "right-0 top-16 sm:right-2",
    },
    focus && {
      key: "focus",
      icon: LuFlame,
      text: `Into right now: ${focus}`,
      tone: "sun",
      rotate: -3,
      position: "bottom-8 left-0 sm:left-4",
    },
    {
      key: "hint",
      icon: LuSparkles,
      text: "Psst, drag us around!",
      tone: "grape",
      rotate: 4,
      position: "bottom-2 right-0 sm:right-4",
    },
  ].filter(Boolean) as StickerSpec[];

  return (
    <section className="container pb-16 pt-6 md:pb-24 md:pt-12">
      <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="chip inline-flex items-center gap-2 px-4 py-1.5 text-sm font-bold">
            <span aria-hidden="true" className="inline-flex origin-[70%_70%] animate-wiggle">
              <LuHand size={16} />
            </span>
            Hey, welcome in!
          </p>

          <h1 className="mt-6 font-display text-6xl font-extrabold leading-[0.98] tracking-tight text-balance sm:text-7xl lg:text-8xl">
            {displayName ? `Hi, I'm ${displayName}.` : "Welcome!"}
          </h1>

          {(fullName || shortRole) && (
            <p className="mt-5 text-lg font-semibold text-soft">
              {[fullName, shortRole].filter(Boolean).join(" · ")}
            </p>
          )}

          {bio && <p className="mt-6 max-w-xl text-xl leading-relaxed text-ink/85">{bio}</p>}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/projects" className={buttonVariants({ size: "lg" })}>
              See what I&apos;ve built
            </Link>
            <Link href="/journal" className={buttonVariants({ size: "lg", variant: "outline" })}>
              Read my journal
            </Link>
            <button
              type="button"
              onClick={() => setMode("resume")}
              className={buttonVariants({ size: "lg", variant: "ghost" })}
            >
              Just show me the CV
            </button>
          </div>
        </motion.div>

        <StickerBoard imageSrc={imageSrc} alt={fullName} initials={initials} stickers={stickers} />
      </div>
    </section>
  );
}
