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
import { usePalette } from "../../hooks/use-palette";
import type { QuarterlyReading } from "@/types";

export function ReadingChart({ data }: { data: QuarterlyReading[] }) {
  const c = usePalette();

  return (
    <div className="sticker h-72 w-full bg-card p-5">
      <h3 className="mb-3 font-display text-xl font-extrabold">Books finished, by quarter</h3>
      <ResponsiveContainer width="100%" height="82%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid stroke={c.grid} vertical={false} strokeDasharray="4 6" />
          <XAxis dataKey="quarter" stroke={c.soft} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke={c.soft} fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: c.grid }}
            contentStyle={{
              background: c.card,
              color: c.ink,
              border: `2px solid ${c.ink}`,
              borderRadius: 14,
              fontSize: 13,
              fontWeight: 600,
            }}
            formatter={(value) => [`${value} books`, "Read"]}
          />
          <Bar
            dataKey="books"
            fill={c.tangerine}
            stroke={c.ink}
            strokeWidth={2}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
