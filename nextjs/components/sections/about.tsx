"use client";

import Image from "next/image";
import { LuUserRound } from "react-icons/lu";
import { SectionHeader } from "../layout/section-header";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { useCms } from "../providers/cms-provider";

export function About() {
  // CMS collection: profile (name, role, location, photo). The bio is shown
  // in the hero, so it isn't repeated here.
  const { profile: cmsProfile } = useCms();
  const role = cmsProfile?.role ?? "";
  const location = cmsProfile?.location ?? "";
  const fullName = cmsProfile?.name ?? "";
  const initials = cmsProfile?.initials ?? "";
  const photoUrl = cmsProfile?.photoUrl ?? "";

  return (
    <Reveal as="section" id="about" className="container py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-[minmax(0,280px)_1fr] md:items-start md:gap-14">
        <div className="relative mx-auto w-full max-w-[280px]">
          <div className="sticker relative aspect-square rotate-3 overflow-hidden bg-mint">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={fullName}
                fill
                sizes="280px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-display text-8xl font-extrabold text-onaccent">
                {initials}
              </div>
            )}
          </div>
          <span
            aria-hidden="true"
            className="chip absolute -bottom-4 -left-3 -rotate-6 bg-sun px-4 py-1.5 text-sm font-bold text-onaccent"
          >
            That&apos;s me!
          </span>
        </div>

        <div>
          <SectionHeader icon={LuUserRound} title="A few things about me" tone="mint" className="mb-8" />
          <Stagger className="grid gap-5 sm:grid-cols-2">
            <StaggerItem className="sticker bg-grape-tint p-6">
              <h3 className="font-display text-xl font-extrabold">Who I am</h3>
              <p className="mt-2 text-ink/80">
                {fullName}
                {role && ` — ${role}`}
                {location && `, based in ${location}`}.
              </p>
            </StaggerItem>
            <StaggerItem className="sticker bg-sun-tint p-6">
              <h3 className="font-display text-xl font-extrabold">What I&apos;m learning</h3>
              <p className="mt-2 text-ink/80">
                Decentralized systems, market microstructure, zero-knowledge systems, and the
                philosophy of mind.
              </p>
            </StaggerItem>
            <StaggerItem className="sticker bg-bubblegum-tint p-6 sm:col-span-2">
              <h3 className="font-display text-xl font-extrabold">My rule of thumb</h3>
              <p className="mt-2 text-ink/80">
                Treat knowledge like capital: deposit consistently, connect ideas deliberately,
                and let compounding do the rest. Publish the thinking, not just the conclusions.
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </Reveal>
  );
}
