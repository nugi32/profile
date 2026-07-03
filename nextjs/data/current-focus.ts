import type { CurrentFocusItem } from "@/types";

export const currentFocus: CurrentFocusItem[] = [
  {
    title: "Building Personal Quant Infrastructure",
    description:
      "A self-hosted research environment for backtesting, signal generation, and live paper-trading experiments.",
    icon: "terminal",
  },
  {
    title: "Researching On-chain Data",
    description:
      "Mapping wallet behavior, liquidity flows, and MEV patterns across EVM chains to find durable signals.",
    icon: "chain",
  },
  {
    title: "Studying Market Microstructure",
    description:
      "Order books, liquidity provision, and the mechanics of price formation at short time horizons.",
    icon: "chart",
  },
  {
    title: "Writing Public Notes",
    description:
      "Turning half-formed ideas into public journal entries so thinking compounds instead of evaporating.",
    icon: "notebook",
  },
  {
    title: "Exploring Philosophy of Technology",
    description:
      "How tools reshape cognition, and what it means to build systems that think alongside you.",
    icon: "brain",
  },
];
