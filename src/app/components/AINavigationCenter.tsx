import { Radar, Car } from "lucide-react";

export default function AINavigationCenter() {
  return (
    <div className="rounded-[32px] border border-border/30 bg-card/80 backdrop-blur-md shadow-sm flex flex-col overflow-hidden min-h-0 hover:border-primary/30 hover:shadow-[0_4px_24px_rgba(6,182,212,0.12)] dark:hover:shadow-[0_4px_24px_rgba(16,185,129,0.12)]">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 shrink-0 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider">AI Navigation</div>
          <div className="text-[9px] text-primary font-medium mt-0.5">
            Autonomous Assistance Active
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Radar className="size-3.5 text-primary" />
          <span className="text-[9px] uppercase tracking-wide">LIDAR ON</span>
        </div>
      </div>

      {/* Radar canvas */}
      <div className="flex-1 relative overflow-hidden min-h-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Concentric radar circles */}
        <svg className="absolute inset-0 size-full">
          <defs>
            <radialGradient id="rg" cx="50%" cy="56%" r="45%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.07" />
              <stop offset="100%" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="50%" cy="56%" rx="42%" ry="42%" fill="url(#rg)" />
          <circle
            cx="50%"
            cy="56%"
            r="115"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
            className="text-primary"
          />
          <circle
            cx="50%"
            cy="56%"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.2"
            className="text-primary"
          />
          <circle
            cx="50%"
            cy="56%"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.1"
            className="text-primary"
          />
          {/* Crosshairs */}
          <line
            x1="50%"
            y1="8%"
            x2="50%"
            y2="92%"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.06"
            className="text-primary"
          />
          <line
            x1="8%"
            y1="56%"
            x2="92%"
            y2="56%"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.06"
            className="text-primary"
          />
        </svg>

        {/* Rotating radar sweep */}
        <div
          className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 size-[230px]"
          style={{
            animation: "radarSpin 3s linear infinite",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "115px",
              height: "1px",
              background: "linear-gradient(90deg, rgba(6,182,212,0.85), transparent)",
              transformOrigin: "left center",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "115px",
              height: "115px",
              background:
                "conic-gradient(from 0deg, rgba(6,182,212,0.12) 0deg, transparent 60deg)",
              transformOrigin: "0% 0%",
              borderRadius: "0 50% 50% 0 / 50%",
            }}
          />
        </div>

        {/* Lane guides */}
        <div className="absolute inset-y-0 left-[36%] w-px border-l border-dashed border-foreground/10" />
        <div className="absolute inset-y-0 right-[36%] w-px border-r border-dashed border-foreground/10" />
        {/* Route path */}
        <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

        {/* Own vehicle */}
        <div className="absolute left-1/2 bottom-[25%] -translate-x-1/2 flex size-11 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 animate-pulse">
          <Car className="size-5 text-primary" />
        </div>

        {/* Detection dots */}
        <div className="absolute left-[38%] top-[22%] size-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
        <div
          className="absolute left-[29%] top-[42%] size-2 rounded-full bg-amber-400/70 animate-pulse"
          style={{ animationDelay: "0.4s" }}
        />
        <div className="absolute right-[27%] top-[30%] size-2 rounded-full bg-red-400 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
        <div
          className="absolute right-[34%] top-[18%] size-1.5 rounded-full bg-primary/70 animate-pulse"
          style={{ animationDelay: "0.7s" }}
        />

        {/* Labels */}
        <div className="absolute left-[32%] top-[17%] rounded border border-amber-400/35 px-1.5 py-0.5">
          <span className="text-[8px] uppercase tracking-wide text-amber-400">
            Vehicle · 45m
          </span>
        </div>
        <div className="absolute right-[18%] top-[25%] rounded border border-red-400/35 px-1.5 py-0.5">
          <span className="text-[8px] uppercase tracking-wide text-red-400">Cyclist</span>
        </div>

        {/* HUD overlays */}
        <div className="absolute top-2 left-3 space-y-0.5">
          <div className="text-[8px] uppercase tracking-widest text-muted-foreground/70">
            🧭 Route Optimized
          </div>
          <div className="text-[8px] uppercase tracking-widest text-muted-foreground/70">
            📍 Lane Tracking ON
          </div>
        </div>
        <div className="absolute top-2 right-3 text-right">
          <div className="text-[10px] font-semibold">Downtown Hub</div>
          <div className="text-[9px] text-muted-foreground">via I-405 N</div>
        </div>
      </div>

      {/* Telemetry bar */}
      <div className="px-4 pb-3 pt-2 shrink-0 border-t border-border/20 grid grid-cols-4 gap-2">
        {[
          { label: "ETA", value: "18m", color: "text-primary" },
          { label: "Traffic", value: "Moderate", color: "text-amber-400" },
          { label: "Speed", value: "72 km/h", color: "text-primary" },
          { label: "Dist", value: "12.4 km", color: "text-primary" },
        ].map((t) => (
          <div key={t.label} className="text-center">
            <div className="text-[8px] uppercase tracking-widest text-muted-foreground/70">
              {t.label}
            </div>
            <div className={`text-[10px] font-semibold ${t.color}`}>{t.value}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes radarSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
