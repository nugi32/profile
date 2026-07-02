"use client";

import { useMemo, useState } from "react";
import { knowledgeNodes, knowledgeEdges } from "@/data/knowledge-graph";

interface LaidOutNode {
  id: string;
  label: string;
  group: string;
  weight: number;
  x: number;
  y: number;
}

const WIDTH = 720;
const HEIGHT = 480;

const groupColor: Record<string, string> = {
  technology: "#7dd3fc",
  finance: "#f0b429",
  foundation: "#a7f3d0",
  abstract: "#f3a8f0",
};

function computeLayout(): LaidOutNode[] {
  const nodes = knowledgeNodes.map((n, i) => {
    const angle = (i / knowledgeNodes.length) * Math.PI * 2;
    return {
      ...n,
      x: WIDTH / 2 + Math.cos(angle) * 160,
      y: HEIGHT / 2 + Math.sin(angle) * 140,
    };
  });

  const idIndex = new Map(nodes.map((n, i) => [n.id, i]));

  for (let iter = 0; iter < 300; iter++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const force = 1800 / (dist * dist);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        a.x += fx;
        a.y += fy;
        b.x -= fx;
        b.y -= fy;
      }
    }

    for (const edge of knowledgeEdges) {
      const a = nodes[idIndex.get(edge.source)!];
      const b = nodes[idIndex.get(edge.target)!];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      const targetDist = 150;
      const force = (dist - targetDist) * 0.015 * edge.strength;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      a.x += fx;
      a.y += fy;
      b.x -= fx;
      b.y -= fy;
    }

    for (const n of nodes) {
      n.x += (WIDTH / 2 - n.x) * 0.004;
      n.y += (HEIGHT / 2 - n.y) * 0.004;
      n.x = Math.min(Math.max(n.x, 60), WIDTH - 60);
      n.y = Math.min(Math.max(n.y, 60), HEIGHT - 60);
    }
  }

  return nodes;
}

export function KnowledgeGraph() {
  const nodes = useMemo(() => computeLayout(), []);
  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const [hovered, setHovered] = useState<string | null>(null);

  const connected = useMemo(() => {
    if (!hovered) return new Set<string>();
    const set = new Set<string>([hovered]);
    for (const edge of knowledgeEdges) {
      if (edge.source === hovered) set.add(edge.target);
      if (edge.target === hovered) set.add(edge.source);
    }
    return set;
  }, [hovered]);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mx-auto h-auto w-full max-w-3xl"
        role="img"
        aria-label="Interactive knowledge map showing relationships between topics"
      >
        {knowledgeEdges.map((edge) => {
          const a = nodeMap.get(edge.source)!;
          const b = nodeMap.get(edge.target)!;
          const dim = hovered && !(connected.has(edge.source) && connected.has(edge.target));
          return (
            <line
              key={`${edge.source}-${edge.target}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={dim ? "hsl(220 20% 20%)" : "#7dd3fc"}
              strokeOpacity={dim ? 0.3 : 0.35 + edge.strength * 0.3}
              strokeWidth={dim ? 1 : 1 + edge.strength * 1.5}
            />
          );
        })}

        {nodes.map((node) => {
          const isDim = hovered && !connected.has(node.id);
          const radius = 10 + node.weight * 1.6;
          return (
            <g
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
              opacity={isDim ? 0.35 : 1}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={radius}
                fill={groupColor[node.group] ?? "#7dd3fc"}
                fillOpacity={0.18}
                stroke={groupColor[node.group] ?? "#7dd3fc"}
                strokeWidth={1.5}
              />
              <circle cx={node.x} cy={node.y} r={3} fill={groupColor[node.group] ?? "#7dd3fc"} />
              <text
                x={node.x}
                y={node.y + radius + 16}
                textAnchor="middle"
                className="font-mono"
                fontSize={11}
                fill="#c7d0dd"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
