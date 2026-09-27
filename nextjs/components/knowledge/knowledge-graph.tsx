"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { LuBox } from "react-icons/lu";
import { useCms } from "../providers/cms-provider";
import type { KnowledgeEdge, KnowledgeNode } from "@/types";

// Three.js/R3F is a heavy, browser-only dependency, so the 3D viewer is only
// ever pulled into the bundle once someone actually opens it, and never
// rendered on the server.
const KnowledgeGraph3D = dynamic(
  () => import("./knowledge-graph-3d").then((m) => m.KnowledgeGraph3D),
  { ssr: false }
);

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
const CHAR_W = 7.2; // approx width of a 12px bold glyph
const LINE_H = 14;
const LABEL_GAP = 8; // gap between node edge and label block
const PADDING = 4; // padding used only for collision math, not rendering

// Group → CSS variable holding the RGB channels (see app/globals.css). Using
// variables lets the same graph follow the light/dark theme with no re-render.
const groupVar: Record<string, string> = {
  technology: "--sky",
  finance: "--sun",
  foundation: "--mint",
  abstract: "--bubblegum",
};
const FALLBACK_VAR = "--grape";

const colorFor = (group: string) => `rgb(var(${groupVar[group] ?? FALLBACK_VAR}))`;

function computeLayout(
  knowledgeNodes: KnowledgeNode[],
  knowledgeEdges: KnowledgeEdge[]
): LaidOutNode[] {
  const nodes = knowledgeNodes.map((n, i) => {
    const angle = (i / Math.max(knowledgeNodes.length, 1)) * Math.PI * 2;
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
      const aIndex = idIndex.get(edge.source);
      const bIndex = idIndex.get(edge.target);
      // A CMS edge can point at a node id that was never created; skip it
      // rather than crashing the whole graph.
      if (aIndex === undefined || bIndex === undefined) continue;
      const a = nodes[aIndex];
      const b = nodes[bIndex];
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
  // CMS collections: knowledge-nodes + knowledge-edges
  const { knowledgeNodes, knowledgeEdges } = useCms();

  const nodes = useMemo(
    () => computeLayout(knowledgeNodes, knowledgeEdges),
    [knowledgeNodes, knowledgeEdges]
  );
  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const labelPlacements = useMemo(() => computeLabelPlacements(nodes), [nodes]);

  // `hovered` follows the mouse; `pinned` is set by tap / Enter, so the map
  // is usable on touch screens and from the keyboard too.
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [open3D, setOpen3D] = useState(false);
  const focusId = hovered ?? pinned;

  const connected = useMemo(() => {
    if (!focusId) return new Set<string>();
    const set = new Set<string>([focusId]);
    for (const edge of knowledgeEdges) {
      if (edge.source === focusId) set.add(edge.target);
      if (edge.target === focusId) set.add(edge.source);
    }
    return set;
  }, [focusId, knowledgeEdges]);

  const groups = useMemo(
    () => Array.from(new Set(knowledgeNodes.map((n) => n.group))),
    [knowledgeNodes]
  );

  if (knowledgeNodes.length === 0) {
    return (
      <p className="py-10 text-center text-soft">
        The idea map is empty for now. Bubbles will pop up here soon!
      </p>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen3D(true)}
          className="chip flex items-center gap-2 px-4 py-2 text-sm font-bold"
        >
          <LuBox size={16} aria-hidden="true" />
          Open in 3D
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="mx-auto h-auto w-full min-w-[600px] max-w-3xl"
          role="group"
          aria-label="Interactive map of how topics connect"
          onClick={() => setPinned(null)}
        >
          {knowledgeEdges.map((edge) => {
            const a = nodeMap.get(edge.source);
            const b = nodeMap.get(edge.target);
            if (!a || !b) return null; // edge references a missing node
            const dim = focusId && !(connected.has(edge.source) && connected.has(edge.target));
            return (
              <line
                key={`${edge.source}-${edge.target}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                style={{ stroke: "rgb(var(--ink))" }}
                strokeOpacity={dim ? 0.1 : 0.35 + edge.strength * 0.4}
                strokeWidth={dim ? 1.5 : 2 + edge.strength * 1.5}
                strokeLinecap="round"
              />
            );
          })}

          {nodes.map((node) => {
            const isDim = focusId && !connected.has(node.id);
            const isFocus = focusId === node.id;
            const radius = 10 + node.weight * 1.6;
            const placement = labelPlacements.get(node.id)!;
            const color = colorFor(node.group);

            const textX =
              placement.anchor === "start"
                ? placement.boxX
                : placement.anchor === "end"
                ? placement.boxX + placement.boxWidth
                : placement.boxX + placement.boxWidth / 2;

            return (
              <g
                key={node.id}
                tabIndex={0}
                role="button"
                aria-label={`${node.label}. Press to see its connections.`}
                aria-pressed={pinned === node.id}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(node.id)}
                onBlur={() => setHovered(null)}
                onClick={(event) => {
                  event.stopPropagation();
                  setPinned((prev) => (prev === node.id ? null : node.id));
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setPinned((prev) => (prev === node.id ? null : node.id));
                  }
                }}
                style={{ cursor: "pointer", outline: "none", transition: "opacity 150ms" }}
                opacity={isDim ? 0.25 : 1}
              >
                {/* hard offset shadow, like everything else on the site */}
                <circle
                  cx={node.x + 3}
                  cy={node.y + 3}
                  r={radius}
                  style={{ fill: "rgb(var(--shadow))" }}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isFocus ? radius + 3 : radius}
                  style={{ fill: color, stroke: "rgb(var(--line))", transition: "r 150ms" }}
                  strokeWidth={2.5}
                />
                {/* little highlight */}
                <circle
                  cx={node.x - radius * 0.32}
                  cy={node.y - radius * 0.32}
                  r={Math.max(2, radius * 0.16)}
                  fill="#fff"
                  fillOpacity={0.7}
                />

                <text
                  x={textX}
                  y={placement.boxY + LINE_H - 3}
                  textAnchor={placement.anchor}
                  fontSize={12}
                  fontWeight={700}
                  style={{
                    fill: "rgb(var(--ink))",
                    stroke: "rgb(var(--bg))",
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                  }}
                  strokeWidth={4}
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

      {groups.length > 1 && (
        <ul className="mt-6 flex flex-wrap justify-center gap-3" aria-label="Legend">
          {groups.map((group) => (
            <li
              key={group}
              className="flex items-center gap-2 rounded-full border-2 border-line bg-card px-3 py-1 text-sm font-semibold capitalize"
            >
              <span
                aria-hidden="true"
                className="h-3.5 w-3.5 rounded-full border-2 border-line"
                style={{ background: colorFor(group) }}
              />
              {group}
            </li>
          ))}
        </ul>
      )}

      {open3D && (
        <KnowledgeGraph3D
          nodes={knowledgeNodes}
          edges={knowledgeEdges}
          onClose={() => setOpen3D(false)}
        />
      )}
    </div>
  );
}
