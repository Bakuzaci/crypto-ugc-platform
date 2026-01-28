// examples/components/StatsCard.tsx
// Reusable stats card component for dashboards

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  format?: "number" | "currency" | "percentage" | "compact";
  prefix?: string;
  suffix?: string;
  className?: string;
  animate?: boolean;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  format = "number",
  prefix,
  suffix,
  className,
  animate = true,
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);

  useEffect(() => {
    if (!animate || typeof value !== "number") {
      setDisplayValue(value);
      return;
    }

    const duration = 1000; // 1 second
    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = startValue + (endValue - startValue) * easeOut;
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayValue(endValue);
      }
    };

    requestAnimationFrame(tick);
  }, [value, animate]);

  const formatValue = (val: number | string): string => {
    if (typeof val === "string") return val;

    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      
      case "percentage":
        return `${val.toFixed(1)}%`;
      
      case "compact":
        if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(1)}B`;
        if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
        if (val >= 1_000) return `${(val / 1_000).toFixed(1)}K`;
        return val.toFixed(0);
      
      default:
        return new Intl.NumberFormat("en-US").format(Math.round(val));
    }
  };

  return (
    <Card className={cn("bg-zinc-900 border-zinc-800", className)}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-400">{title}</p>
            <div className="flex items-baseline gap-1 mt-2">
              {prefix && (
                <span className="text-2xl font-bold text-zinc-400">{prefix}</span>
              )}
              <span className="text-3xl font-bold text-white tabular-nums">
                {formatValue(displayValue as number)}
              </span>
              {suffix && (
                <span className="text-lg font-medium text-zinc-400">{suffix}</span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-zinc-500 mt-1">{subtitle}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span
                  className={cn(
                    "text-sm font-medium",
                    trend.isPositive ? "text-emerald-400" : "text-red-400"
                  )}
                >
                  {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </span>
                <span className="text-sm text-zinc-500">vs last period</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className="p-3 rounded-lg bg-zinc-800">
              <Icon className="h-6 w-6 text-blue-400" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Example usage for brand dashboard:
//
// import { DollarSign, Eye, Users, TrendingUp } from "lucide-react";
//
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//   <StatsCard
//     title="Total Views"
//     value={2500000}
//     format="compact"
//     icon={Eye}
//     trend={{ value: 12.5, isPositive: true }}
//   />
//   <StatsCard
//     title="Total Spent"
//     value={75000}
//     format="currency"
//     icon={DollarSign}
//     trend={{ value: 8.2, isPositive: false }}
//   />
//   <StatsCard
//     title="Active Creators"
//     value={145}
//     icon={Users}
//     trend={{ value: 23, isPositive: true }}
//   />
//   <StatsCard
//     title="Avg CPA"
//     value={0.6}
//     prefix="$"
//     icon={TrendingUp}
//     subtitle="Cost per acquisition"
//   />
// </div>

// Example usage for creator dashboard:
//
// <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//   <StatsCard
//     title="Available Balance"
//     value={1234.56}
//     format="currency"
//     className="bg-gradient-to-br from-emerald-900/20 to-zinc-900 border-emerald-800/50"
//   />
//   <StatsCard
//     title="Pending"
//     value={567.89}
//     format="currency"
//     subtitle="Awaiting verification"
//   />
//   <StatsCard
//     title="Total Earned"
//     value={4321}
//     format="currency"
//     trend={{ value: 45, isPositive: true }}
//   />
// </div>
