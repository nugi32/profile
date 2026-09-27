"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { ScrollProgress } from "./scroll-progress";
import { CommandPalette } from "../search/command-palette";

export function SiteChrome() {
  const [searchOpen, setSearchOpen] = useState(false);

  // Global shortcut: Cmd/Ctrl + K toggles the palette from anywhere, and "/"
  // opens it as long as the visitor is not already typing in a field.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
        return;
      }

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        setSearchOpen(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
