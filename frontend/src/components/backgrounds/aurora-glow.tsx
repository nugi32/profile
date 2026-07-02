export function AuroraGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-aurora ${className ?? ""}`}
    />
  );
}
