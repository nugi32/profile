import Link from "next/link";
import type { Metadata } from "next";
import { About } from "../../components/sections/about";
import { FormalIdentity } from "../../components/sections/formal-identity";
import { buttonVariants } from "../../components/ui/button";
import { LuUserRound } from "react-icons/lu";
import { SectionHeader } from "../../components/layout/section-header";
import { fetchSiteMeta, getSocialHref } from "@/lib/cms";

/**
 * CMS-driven metadata: no hardcoded name/role fallback. An empty profile
 * just falls back to a generic "About" title instead of placeholder text.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await fetchSiteMeta();
  const fullName = profile?.name ?? "";
  const displayName = profile?.displayName ?? "";
  const role = profile?.role ?? "";

  const identity = fullName
    ? `${fullName}${displayName ? ` (${displayName})` : ""}`
    : displayName;

  return {
    // `absolute` bypasses the site-wide title template so the full legal
    // name is not duplicated in the browser tab.
    title: { absolute: identity ? `About — ${identity}` : "About" },
    description: identity ? `${identity}${role ? ` — ${role}.` : "."}` : undefined,
  };
}

export default async function AboutPage() {
  const { profile, socialLinks } = await fetchSiteMeta();
  const emailHref = profile?.email
    ? `mailto:${profile.email}`
    : getSocialHref(socialLinks, "email");
  const githubHref = getSocialHref(socialLinks, "github");

  return (
    <div className="pt-4">
      <section className="container py-10">
        <SectionHeader
          icon={LuUserRound}
          title="The person behind the notebook"
          description="Who I am, what I care about, and the best ways to reach me."
          tone="grape"
        />

        <FormalIdentity />
      </section>

      <About />

      <section className="container py-10">
        <div className="sticker bg-mint-tint p-6 md:p-10">
          <h2 className="font-display text-4xl font-extrabold">Let&apos;s talk!</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">
            I share ideas, systems thinking and research notes in the open. Want to collaborate,
            swap feedback, or ask a question? Send me a message, or poke around the source code of
            my projects.
          </p>
          {(emailHref || githubHref) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {emailHref && (
                <Link href={emailHref} className={buttonVariants({ size: "lg" })}>
                  Send an email
                </Link>
              )}
              {githubHref && (
                <Link
                  href={githubHref}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ size: "lg", variant: "outline" })}
                >
                  Visit my GitHub
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
