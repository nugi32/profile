"use client";

import { Component, useEffect, useMemo, useRef, useState, useCallback, type MutableRefObject, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Canvas } from "@react-three/fiber";
import { Html, Line, OrbitControls, Grid } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import {
  LuX,
  LuMaximize2,
  LuMinimize2,
  LuRotateCcw,
  LuPause,
  LuPlay,
  LuTriangleAlert,
} from "react-icons/lu";
import type { KnowledgeEdge, KnowledgeNode } from "@/types";

interface Laid3DNode extends KnowledgeNode {
  x: number;
  y: number;
  z: number;
}

// Same palette as the 2D map, just as plain hex so three.js materials can
// use it directly (no CSS custom properties inside a WebGL context).
const GROUP_COLOR: Record<string, string> = {
  technology: "#45c4ff",
  finance: "#ffd84d",
  foundation: "#2ed8a3",
  abstract: "#ff5fa2",
};
const FALLBACK_COLOR = "#8f7bff";
const colorFor = (group: string) => GROUP_COLOR[group] ?? FALLBACK_COLOR;

const FIELD_RADIUS = 190;
const EDGE_TARGET_DIST = 130;

/** Best-effort check: can this browser/device actually create a WebGL context? */
function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

function Viewer3DFallback({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center text-white">
      <LuTriangleAlert size={40} aria-hidden="true" className="text-white/70" />
      <h2 className="font-display text-2xl font-extrabold">3D view isn&apos;t available here</h2>
      <p className="max-w-md text-white/70">
        This browser or device couldn&apos;t create a WebGL context — often because hardware
        acceleration is off, or you&apos;re in a sandboxed/remote environment without GPU access.
        Try a different browser, turn on hardware acceleration in your browser&apos;s settings, or
        open this on another device.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-2 flex items-center gap-2 rounded-full border-2 border-white/25 bg-white/10 px-5 py-2 text-sm font-bold text-white transition hover:bg-white/20"
      >
        Back to the 2D map
      </button>
    </div>
  );
}

/**
 * Three.js/R3F can throw synchronously while constructing the WebGLRenderer
 * (e.g. "Error creating WebGL context") which otherwise bubbles up as an
 * unhandled runtime error and takes down the whole page. Catching it here
 * keeps the failure contained to the viewer itself.
 */
class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error("3D idea map failed to render:", error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/**
 * Lays nodes out on a sphere (golden-angle spiral, so the starting spread is
 * already even in 3D) then relaxes them with simple repulsion/attraction
 * physics — the 3D sibling of the 2D map's layout algorithm.
 */
function computeLayout3D(nodes: KnowledgeNode[], edges: KnowledgeEdge[]): Laid3DNode[] {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  const laid: Laid3DNode[] = nodes.map((n, i) => {
    const t = nodes.length <= 1 ? 0 : i / (nodes.length - 1);
    const inclination = Math.acos(1 - 2 * t);
    const azimuth = goldenAngle * i;
    return {
      ...n,
      x: FIELD_RADIUS * Math.sin(inclination) * Math.cos(azimuth) * 0.85,
      y: FIELD_RADIUS * Math.sin(inclination) * Math.sin(azimuth) * 0.85,
      z: FIELD_RADIUS * Math.cos(inclination) * 0.85,
    };
  });

  const idIndex = new Map(laid.map((n, i) => [n.id, i]));

  for (let iter = 0; iter < 260; iter++) {
    for (let i = 0; i < laid.length; i++) {
      for (let j = i + 1; j < laid.length; j++) {
        const a = laid[i];
        const b = laid[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy + dz * dz), 1);
        const force = 5200 / (dist * dist);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        const fz = (dz / dist) * force;
        a.x += fx;
        a.y += fy;
        a.z += fz;
        b.x -= fx;
        b.y -= fy;
        b.z -= fz;
      }
    }

    for (const edge of edges) {
      const ai = idIndex.get(edge.source);
      const bi = idIndex.get(edge.target);
      if (ai === undefined || bi === undefined) continue;
      const a = laid[ai];
      const b = laid[bi];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dz = b.z - a.z;
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy + dz * dz), 1);
      const force = (dist - EDGE_TARGET_DIST) * 0.02 * edge.strength;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      const fz = (dz / dist) * force;
      a.x += fx;
      a.y += fy;
      a.z += fz;
      b.x -= fx;
      b.y -= fy;
      b.z -= fz;
    }

    // Gentle pull back toward the origin so the whole cluster stays centered.
    for (const n of laid) {
      n.x += -n.x * 0.006;
      n.y += -n.y * 0.006;
      n.z += -n.z * 0.006;
    }
  }

  return laid;
}

function NodeSphere({
  node,
  isDim,
  isFocus,
  onHover,
  onLeave,
  onSelect,
}: {
  node: Laid3DNode;
  isDim: boolean;
  isFocus: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
}) {
  const radius = 6 + node.weight * 1.1;
  const color = colorFor(node.group);

  return (
    <group position={[node.x, node.y, node.z]}>
      <mesh
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          onHover();
        }}
        onPointerOut={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          document.body.style.cursor = "auto";
          onLeave();
        }}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <sphereGeometry args={[isFocus ? radius * 1.18 : radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isFocus ? 0.6 : 0.22}
          roughness={0.35}
          metalness={0.15}
          transparent
          opacity={isDim ? 0.22 : 1}
        />
      </mesh>

      <Html center distanceFactor={220} occlude={false} zIndexRange={[10, 0]}>
        <div
          style={{
            pointerEvents: "none",
            whiteSpace: "nowrap",
            fontSize: "13px",
            fontWeight: 700,
            fontFamily: "var(--font-body), system-ui, sans-serif",
            color: "#f4f2ff",
            textShadow: "0 1px 3px rgba(0,0,0,0.85), 0 0 10px rgba(0,0,0,0.5)",
            opacity: isDim ? 0.25 : 1,
            transform: "translateY(-26px)",
            transition: "opacity 150ms",
          }}
        >
          {node.label}
        </div>
      </Html>
    </group>
  );
}

function Scene({
  nodes,
  edges,
  autoRotate,
  controlsRef,
}: {
  nodes: Laid3DNode[];
  edges: KnowledgeEdge[];
  autoRotate: boolean;
  controlsRef: MutableRefObject<any>;
}) {
  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const focusId = hovered ?? pinned;

  const connected = useMemo(() => {
    if (!focusId) return new Set<string>();
    const set = new Set<string>([focusId]);
    for (const edge of edges) {
      if (edge.source === focusId) set.add(edge.target);
      if (edge.target === focusId) set.add(edge.source);
    }
    return set;
  }, [focusId, edges]);

  return (
    <>
      <color attach="background" args={["#131318"]} />
      <fog attach="fog" args={["#131318", 320, 920]} />

      <ambientLight intensity={0.55} />
      <directionalLight position={[220, 260, 200]} intensity={0.9} />
      <pointLight position={[-220, -140, -180]} intensity={0.35} color="#6c4dff" />

      <Grid
        position={[0, -230, 0]}
        args={[10, 10]}
        cellSize={30}
        cellThickness={0.6}
        cellColor="#33333f"
        sectionSize={150}
        sectionThickness={1.2}
        sectionColor="#4a4a5c"
        fadeDistance={900}
        fadeStrength={1.3}
        infiniteGrid
      />

      {edges.map((edge) => {
        const a = nodeMap.get(edge.source);
        const b = nodeMap.get(edge.target);
        if (!a || !b) return null;
        const dim = focusId && !(connected.has(edge.source) && connected.has(edge.target));
        return (
          <Line
            key={`${edge.source}-${edge.target}`}
            points={[
              [a.x, a.y, a.z],
              [b.x, b.y, b.z],
            ]}
            color="#a9a3c9"
            transparent
            opacity={dim ? 0.06 : 0.3 + edge.strength * 0.35}
            lineWidth={dim ? 1 : 1.5 + edge.strength * 1.5}
          />
        );
      })}

      {nodes.map((node) => (
        <NodeSphere
          key={node.id}
          node={node}
          isDim={Boolean(focusId) && !connected.has(node.id)}
          isFocus={focusId === node.id}
          onHover={() => setHovered(node.id)}
          onLeave={() => setHovered(null)}
          onSelect={() => setPinned((prev) => (prev === node.id ? null : node.id))}
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.55}
        zoomSpeed={0.7}
        minDistance={160}
        maxDistance={760}
        autoRotate={autoRotate}
        autoRotateSpeed={0.7}
        makeDefault
      />
    </>
  );
}

export function KnowledgeGraph3D({
  nodes,
  edges,
  onClose,
}: {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  onClose: () => void;
}) {
  const laidOut = useMemo(() => computeLayout3D(nodes, edges), [nodes, edges]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    setWebglOk(supportsWebGL());
  }, []);

  // Lock page scroll while the immersive viewer is open.
  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.()?.catch(() => {
        /* fullscreen can be denied by the browser; the overlay still fills the viewport */
      });
    } else {
      document.exitFullscreen?.()?.catch(() => {});
    }
  }, []);

  const handleClose = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.()?.catch(() => {});
    }
    onClose();
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] bg-[#131318]"
      role="dialog"
      aria-modal="true"
      aria-label="Full-screen 3D idea map"
    >
      {webglOk === false ? (
        <Viewer3DFallback onClose={handleClose} />
      ) : webglOk === true ? (
        <WebGLErrorBoundary fallback={<Viewer3DFallback onClose={handleClose} />}>
          <Canvas
            camera={{ position: [0, 60, 440], fov: 50, near: 1, far: 2000 }}
            dpr={[1, 1.8]}
            gl={{ antialias: true, failIfMajorPerformanceCaveat: false, powerPreference: "default" }}
          >
            <Scene nodes={laidOut} edges={edges} autoRotate={autoRotate} controlsRef={controlsRef} />
          </Canvas>
        </WebGLErrorBoundary>
      ) : null}

      {/* HUD — overlaid plainly on top of the canvas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 md:p-6">
        <div className="pointer-events-auto rounded-2xl border-2 border-white/15 bg-black/40 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur">
          <span className="hidden sm:inline">Drag to orbit · scroll to zoom · click a node to focus</span>
          <span className="sm:hidden">Drag · pinch · tap a node</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAutoRotate((v) => !v)}
            title={autoRotate ? "Pause auto-rotate" : "Auto-rotate"}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/15 bg-black/40 text-white/90 backdrop-blur transition hover:bg-black/60"
          >
            {autoRotate ? <LuPause size={16} /> : <LuPlay size={16} />}
          </button>
          <button
            type="button"
            onClick={() => controlsRef.current?.reset?.()}
            title="Reset view"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/15 bg-black/40 text-white/90 backdrop-blur transition hover:bg-black/60"
          >
            <LuRotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/15 bg-black/40 text-white/90 backdrop-blur transition hover:bg-black/60"
          >
            {isFullscreen ? <LuMinimize2 size={16} /> : <LuMaximize2 size={16} />}
          </button>
          <button
            type="button"
            onClick={handleClose}
            title="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/15 bg-black/40 text-white/90 backdrop-blur transition hover:bg-red-500/70"
          >
            <LuX size={18} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
