"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { QuarterlyReading } from "@/types";

export function ReadingChart({ data }: { data: QuarterlyReading[] }) {
  return (
    <div className="h-64 w-full rounded-2xl border border-panel-border bg-panel/50 p-4">
      <p className="mb-2 px-2 font-mono text-xs uppercase tracking-wider text-muted">
        Books Read — By Quarter
      </p>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid stroke="hsl(220 20% 16%)" vertical={false} />
          <XAxis
            dataKey="quarter"
            stroke="hsl(215 16% 58%)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke="hsl(215 16% 58%)" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "hsl(220 28% 8%)",
              border: "1px solid hsl(220 20% 16%)",
              borderRadius: 12,
              fontSize: 12,
            }}
          />
          <Bar dataKey="books" fill="#f0b429" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
