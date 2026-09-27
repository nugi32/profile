"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ViewMode = "explore" | "resume";

interface ViewModeContextValue {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  toggleMode: () => void;
}

const ViewModeContext = createContext<ViewModeContextValue>({
  mode: "explore",
  setMode: () => {},
  toggleMode: () => {},
});

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>("explore");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("view-mode") as ViewMode | null;
      if (stored === "resume" || stored === "explore") {
        setModeState(stored);
      }
    } catch {
      /* private mode / storage disabled: just start from the default mode */
    }
  }, []);

  const setMode = (next: ViewMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem("view-mode", next);
    } catch {
      /* private mode / storage disabled: the choice just won't persist */
    }
    // Both views live on the home route; jump to the top so the switch
    // reads as instant rather than leaving the visitor mid-scroll.
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const toggleMode = () => setMode(mode === "explore" ? "resume" : "explore");

  return (
    <ViewModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewModeContext);
}
