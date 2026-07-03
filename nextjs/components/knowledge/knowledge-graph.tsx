"use client";

import { useMemo, useState } from "react";
import { knowledgeNodes, knowledgeEdges } from "../../data/knowledge-graph";

interface LaidOutNode {
  id: string;
  label: string;
  group: string;
  weight: number;
  x: number;
  y: number;
}

interface LabelPlacement {
  lines: string[];
  side: "above" | "below";
  anchor: "start" | "middle" | "end";
  boxX: number;
  boxY: number;
  boxWidth: number;
  boxHeight: number;
}

const WIDTH = 720;
const HEIGHT = 480;
const CHAR_W = 6.6; // approx width of an 11px mono glyph
const LINE_H = 14;
const LABEL_GAP = 8; // gap between node edge and label block
const PADDING = 4; // padding used only for collision math, not rendering

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
        // Increased from 1800 -> 2600 so nodes (and their labels) keep more distance
        const force = 2600 / (dist * dist);
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
      const targetDist = 170;
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

// Break a label into at most two lines, splitting on the space nearest
// the middle so "Artificial Intelligence" becomes ["Artificial", "Intelligence"]
// rather than one long horizontal run.
function wrapLabel(label: string, maxLineChars = 12): string[] {
  if (label.length <= maxLineChars) return [label];
  const words = label.split(" ");
  if (words.length === 1) return [label]; // single long word, can't wrap further

  let bestSplit = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const line1 = words.slice(0, i).join(" ");
    const line2 = words.slice(i).join(" ");
    const diff = Math.abs(line1.length - line2.length);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestSplit = i;
    }
  }
  return [words.slice(0, bestSplit).join(" "), words.slice(bestSplit).join(" ")];
}

function boxesOverlap(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number }
) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

// Computes label lines, side (above/below), anchor, and bounding box per
// node, then runs a few passes flipping any label that collides with a
// previously-placed one to the opposite side of its own node.
function computeLabelPlacements(nodes: LaidOutNode[]): Map<string, LabelPlacement> {
  const placements = new Map<string, LabelPlacement>();

  nodes.forEach((node, i) => {
    const radius = 10 + node.weight * 1.6;
    const lines = wrapLabel(node.label);
    const lineWidth = Math.max(...lines.map((l) => l.length)) * CHAR_W;
    const blockHeight = lines.length * LINE_H;

    const anchor: LabelPlacement["anchor"] =
      node.x < 90 ? "start" : node.x > WIDTH - 90 ? "end" : "middle";

    const side: LabelPlacement["side"] = i % 2 === 0 ? "below" : "above";

    const boxX =
      anchor === "start" ? node.x : anchor === "end" ? node.x - lineWidth : node.x - lineWidth / 2;
    const boxY =
      side === "below" ? node.y + radius + LABEL_GAP : node.y - radius - LABEL_GAP - blockHeight;

    placements.set(node.id, {
      lines,
      side,
      anchor,
      boxX,
      boxY,
      boxWidth: lineWidth,
      boxHeight: blockHeight,
    });
  });

  // Collision resolution: for every pair of labels that overlap, flip the
  // later one to the opposite side of its own node and recompute its box.
  for (let pass = 0; pass < 4; pass++) {
    let anyFlip = false;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i];
        const nodeB = nodes[j];
        const placeA = placements.get(nodeA.id)!;
        const placeB = placements.get(nodeB.id)!;

        const boxA = {
          x: placeA.boxX - PADDING,
          y: placeA.boxY - PADDING,
          w: placeA.boxWidth + PADDING * 2,
          h: placeA.boxHeight + PADDING * 2,
        };
        const boxB = {
          x: placeB.boxX - PADDING,
          y: placeB.boxY - PADDING,
          w: placeB.boxWidth + PADDING * 2,
          h: placeB.boxHeight + PADDING * 2,
        };

        if (!boxesOverlap(boxA, boxB)) continue;

        // Flip the second node's label to the other side of its own node.
        const radiusB = 10 + nodeB.weight * 1.6;
        const newSide: LabelPlacement["side"] = placeB.side === "below" ? "above" : "below";
        const newBoxY =
          newSide === "below"
            ? nodeB.y + radiusB + LABEL_GAP
            : nodeB.y - radiusB - LABEL_GAP - placeB.boxHeight;

        placements.set(nodeB.id, { ...placeB, side: newSide, boxY: newBoxY });
        anyFlip = true;
      }
    }

    if (!anyFlip) break;
  }

  return placements;
}

export function KnowledgeGraph() {
  const nodes = useMemo(() => computeLayout(), []);
  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const labelPlacements = useMemo(() => computeLabelPlacements(nodes), [nodes]);
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
          const placement = labelPlacements.get(node.id)!;

          const textX =
            placement.anchor === "start"
              ? placement.boxX
              : placement.anchor === "end"
              ? placement.boxX + placement.boxWidth
              : placement.boxX + placement.boxWidth / 2;

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
                x={textX}
                y={placement.boxY + LINE_H - 3}
                textAnchor={placement.anchor}
                className="font-mono"
                fontSize={11}
                fill="#c7d0dd"
                stroke="#0b0f19"
                strokeWidth={3}
                strokeLinejoin="round"
                paintOrder="stroke"
              >
                {placement.lines.map((line, li) => (
                  <tspan key={li} x={textX} dy={li === 0 ? 0 : LINE_H}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}