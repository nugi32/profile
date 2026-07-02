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
import { monthlyDeepWork } from "../../data/metrics";

export function DeepWorkChart() {
  return (
    <div className="h-64 w-full rounded-2xl border border-panel-border bg-panel/50 p-4">
      <p className="mb-2 px-2 font-mono text-xs uppercase tracking-wider text-muted">
        Deep Work Hours — Last 6 Months
      </p>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={monthlyDeepWork} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="deepWorkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="hsl(220 20% 16%)" vertical={false} />
          <XAxis
            dataKey="month"
            stroke="hsl(215 16% 58%)"
            fontSize={11}
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
          <Area
            type="monotone"
            dataKey="hours"
            stroke="#7dd3fc"
            strokeWidth={2}
            fill="url(#deepWorkFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
