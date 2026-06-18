import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

// ── Animated count-up hook ───────────────────────────────────────────
function useCountUp(target: number, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === 0) { setValue(0); return; }
    let start: number | null = null;
    let id: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setValue(Math.round(eased * target));
      if (progress < 1) id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return value;
}

// ── Tone palette ─────────────────────────────────────────────────────
const TONE = {
  primary: {
    gradient: "from-primary/18 via-primary/6 to-transparent",
    text: "text-primary",
    iconBg: "bg-primary/12",
    glowBg: "bg-primary/20",
    borderGlow: "from-primary/50 via-primary/20 to-transparent",
  },
  success: {
    gradient: "from-success/18 via-success/6 to-transparent",
    text: "text-success",
    iconBg: "bg-success/12",
    glowBg: "bg-success/18",
    borderGlow: "from-success/50 via-success/20 to-transparent",
  },
  accent: {
    gradient: "from-accent/18 via-accent/6 to-transparent",
    text: "text-accent",
    iconBg: "bg-accent/12",
    glowBg: "bg-accent/18",
    borderGlow: "from-accent/50 via-accent/20 to-transparent",
  },
  warning: {
    gradient: "from-warning/18 via-warning/6 to-transparent",
    text: "text-warning",
    iconBg: "bg-warning/12",
    glowBg: "bg-warning/18",
    borderGlow: "from-warning/50 via-warning/20 to-transparent",
  },
  destructive: {
    gradient: "from-destructive/18 via-destructive/6 to-transparent",
    text: "text-destructive",
    iconBg: "bg-destructive/12",
    glowBg: "bg-destructive/18",
    borderGlow: "from-destructive/50 via-destructive/20 to-transparent",
  },
} as const;

// ── StatCard ─────────────────────────────────────────────────────────
export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  tone = "primary",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  tone?: keyof typeof TONE;
}) {
  const numericVal = typeof value === "number" ? value : Number(value) || 0;
  const isNumeric = typeof value === "number" || (!isNaN(Number(value)) && String(value).trim() !== "");
  const animated = useCountUp(numericVal);
  const display = isNumeric ? animated : value;

  const trendUp = trend?.includes("+") || trend?.startsWith("↑");
  const trendDown = !trendUp && (trend?.includes("-") || trend?.startsWith("↓"));
  const s = TONE[tone];

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className="group relative"
    >
      {/* Ambient glow blob */}
      <div
        className={`pointer-events-none absolute -inset-3 rounded-2xl ${s.glowBg} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-80`}
      />
      {/* Gradient border ring */}
      <div
        className={`pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-br ${s.borderGlow} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      {/* Card body */}
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card/90 p-5 backdrop-blur-sm">
        {/* Inner gradient fill */}
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.gradient}`} />
        {/* Top shimmer line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {label}
            </p>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight tabular-nums">
              {display}
            </p>
            {trend && (
              <p
                className={`mt-1.5 inline-flex items-center gap-1 text-xs font-semibold ${
                  trendUp
                    ? "text-success"
                    : trendDown
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {trendUp ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : trendDown ? (
                  <TrendingDown className="h-3.5 w-3.5" />
                ) : null}
                {trend}
              </p>
            )}
          </div>

          <motion.div
            whileHover={{ rotate: 10, scale: 1.18 }}
            transition={{ type: "spring", stiffness: 300, damping: 14 }}
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${s.iconBg} ${s.text} ring-1 ring-border/30 transition-shadow duration-300 group-hover:shadow-elegant`}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
