export const siteConfig = {
  name: "Nugi",
  title: "Nugi — Web3 Developer & Quant Builder",
  description:
    "A public second brain: decentralized systems, quantitative trading research, and strange questions about reality, documented in the open.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://johndoe.dev",
  ogImage: "/og.png",
  links: {
    github: "https://github.com/nugi32",
    twitter: "https://x.com/Nug_320",
    email: "mailto:nugrohoadhipratama135@gmail.com",
    rss: "/feed.xml",
    notion: "https://app.notion.com/p/4edad03367d5460592856d5809b92f8b?v=32b31dfa5a69413a83b3427c12df2008&source=copy_link",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Journal", href: "/journal" },
    { label: "Knowledge Map", href: "/knowledge" },
    { label: "Progress", href: "/progress" },
    { label: "About", href: "/about" },
  ],
};