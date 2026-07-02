import type { KnowledgeEdge, KnowledgeNode } from "@/types";

export const knowledgeNodes: KnowledgeNode[] = [
  { id: "web3", label: "Web3", group: "technology", weight: 9 },
  { id: "finance", label: "Finance", group: "finance", weight: 10 },
  { id: "mathematics", label: "Mathematics", group: "foundation", weight: 8 },
  { id: "systems", label: "Systems", group: "foundation", weight: 8 },
  { id: "philosophy", label: "Philosophy", group: "abstract", weight: 7 },
  { id: "psychology", label: "Psychology", group: "abstract", weight: 6 },
  { id: "computer-science", label: "Computer Science", group: "technology", weight: 9 },
  { id: "economics", label: "Economics", group: "finance", weight: 7 },
  { id: "ai", label: "Artificial Intelligence", group: "technology", weight: 8 },
];

export const knowledgeEdges: KnowledgeEdge[] = [
  { source: "web3", target: "computer-science", strength: 0.9 },
  { source: "web3", target: "economics", strength: 0.6 },
  { source: "finance", target: "economics", strength: 0.85 },
  { source: "finance", target: "mathematics", strength: 0.8 },
  { source: "finance", target: "systems", strength: 0.55 },
  { source: "mathematics", target: "computer-science", strength: 0.75 },
  { source: "systems", target: "philosophy", strength: 0.65 },
  { source: "systems", target: "economics", strength: 0.5 },
  { source: "philosophy", target: "psychology", strength: 0.7 },
  { source: "philosophy", target: "ai", strength: 0.5 },
  { source: "psychology", target: "economics", strength: 0.45 },
  { source: "ai", target: "computer-science", strength: 0.85 },
  { source: "ai", target: "mathematics", strength: 0.6 },
  { source: "ai", target: "psychology", strength: 0.4 },
];
