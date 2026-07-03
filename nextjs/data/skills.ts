import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Web3",
    icon: "web3",
    skills: [
      { name: "Solidity", level: 90 },
      { name: "Foundry", level: 85 },
      { name: "Hardhat", level: 80 },
      { name: "EVM Internals", level: 75 },
      { name: "Smart Contract Security", level: 82 },
    ],
  },
  {
    category: "Backend",
    icon: "backend",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "TypeScript", level: 92 },
      { name: "PostgreSQL", level: 78 },
      { name: "Redis", level: 70 },
    ],
  },
  {
    category: "Quant",
    icon: "quant",
    skills: [
      { name: "Python", level: 90 },
      { name: "Pandas", level: 85 },
      { name: "NumPy", level: 83 },
      { name: "Statistical Modeling", level: 76 },
      { name: "Backtesting", level: 80 },
    ],
  },
  {
    category: "Infrastructure",
    icon: "infra",
    skills: [
      { name: "Docker", level: 84 },
      { name: "Linux", level: 88 },
      { name: "AWS", level: 72 },
    ],
  },
];
