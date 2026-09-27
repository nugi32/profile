import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { fetchSiteMeta, getSocialHref } from "@/lib/cms";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { themeInitScript } from "@/lib/theme-script";
import { ViewModeProvider } from "@/components/providers/view-mode-provider";
import { CmsProvider } from "@/components/providers/cms-provider";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Footer } from "@/components/layout/footer";

// Display: a quirky, friendly grotesque with a lot of personality at large sizes.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body: clean and round, easy to read at any size.
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Only used for code blocks in journal entries.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/**
 * Fully CMS-driven: the `<title>`, description, and Open Graph/Twitter card
 * all come from the `profile` and `social-links` collections. There is no
 * hardcoded name/role/description fallback here — if the CMS profile is
 * empty, the site simply renders with generic, content-free defaults
 * instead of a stale placeholder identity.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { profile, socialLinks } = await fetchSiteMeta();

  const name = profile?.displayName ?? "";
  const fullName = profile?.name ?? "";
  const shortRole = profile?.shortRole ?? "";
  const role = profile?.role ?? "";
  const location = profile?.location ?? "";

  const title = fullName
    ? `${fullName}${name ? ` (${name})` : ""}${shortRole ? ` — ${shortRole}` : ""}`
    : name || "Portfolio";

  const description =
    fullName && role && location
      ? `${fullName} — ${role} based in ${location}. A public second brain: decentralized systems, quantitative trading research, and strange questions about reality, documented in the open.`
      : "A public second brain, documented in the open.";

  const rss = getSocialHref(socialLinks, "rss") ?? "/feed.xml";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: name ? `%s — ${name}` : "%s",
    },
    description,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: name || undefined,
      images: [{ url: siteConfig.ogImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
    alternates: {
      types: {
        "application/rss+xml": rss,
      },
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${bricolage.variable} ${figtree.variable} ${jetbrainsMono.variable} flex min-h-screen flex-col font-body`}
      >
        <ThemeProvider>
          <ViewModeProvider>
            {/* Nothing below this point renders until every CMS collection
                has loaded — the whole page stays on the loading screen. */}
            <CmsProvider>
              <div className="no-print">
                <SiteChrome />
              </div>
              {/* pt clears the floating navbar; flex-1 keeps the footer at
                  the bottom of the viewport on short pages. */}
              <main className="relative z-10 flex-1 pt-24">{children}</main>
              <div className="no-print mt-auto">
                <Footer />
              </div>
            </CmsProvider>
          </ViewModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
