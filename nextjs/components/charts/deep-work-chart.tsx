"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { usePalette } from "../../hooks/use-palette";
import type { MonthlyDeepWork } from "@/types";

export function DeepWorkChart({ data }: { data: MonthlyDeepWork[] }) {
  const c = usePalette();

  return (
    <div className="sticker h-72 w-full bg-card p-5">
      <h3 className="mb-3 font-display text-xl font-extrabold">Hours of deep focus</h3>
      <ResponsiveContainer width="100%" height="82%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="deepWorkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c.grape} stopOpacity={0.45} />
              <stop offset="100%" stopColor={c.grape} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={c.grid} vertical={false} strokeDasharray="4 6" />
          <XAxis dataKey="month" stroke={c.soft} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke={c.soft} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ stroke: c.ink, strokeDasharray: "3 3" }}
            contentStyle={{
              background: c.card,
              color: c.ink,
              border: `2px solid ${c.ink}`,
              borderRadius: 14,
              fontSize: 13,
              fontWeight: 600,
            }}
            formatter={(value) => [`${value} hrs`, "Focus"]}
          />
          <Area
            type="monotone"
            dataKey="hours"
            stroke={c.grape}
            strokeWidth={3}
            fill="url(#deepWorkFill)"
            dot={{ r: 4, fill: c.card, stroke: c.grape, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
