"use client";

import { useState } from "react";
import { Navbar } from "./navbar";
import { CommandPalette } from "../search/command-palette";

export function SiteChrome() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
