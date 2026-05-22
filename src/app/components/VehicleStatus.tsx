import { useState } from "react";
import { Lightbulb, Zap, CloudRain } from "lucide-react";

export default function VehicleStatus() {
  const [speed] = useState(72);
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [isCharging] = useState(true);
  const [wipersOn, setWipersOn] = useState(false);
  const [currentGear, setCurrentGear] = useState("D");

  return (
    <div className="flex-1 rounded-[28px] border border-border/30 bg-card/80 backdrop-blur-md shadow-sm p-4 flex flex-col gap-3 min-h-0">
      <div className="flex items-center justify-between shrink-0">
        <span className="text-[11px] font-semibold uppercase tracking-wider">
          Vehicle Status
        </span>
        <span className="rounded-full border border-green-500/30 bg-green-500/15 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-green-500">
          Active
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 justify-center min-h-0">
        {/* Speedometer */}
        <div className="flex items-center justify-center">
          <div className="relative flex size-20 shrink-0 items-center justify-center">
            <svg className="absolute inset-0 size-full -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                className="text-muted/20"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeDasharray={`${(speed / 200) * 201} 201`}
                className="text-primary transition-all duration-500"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex flex-col items-center">
              <div
                className="text-xl font-semibold leading-none"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {speed}
              </div>
              <div className="text-[8px] uppercase tracking-wider text-muted-foreground mt-0.5">
                km/h
              </div>
            </div>
          </div>
        </div>

        {/* Status Icons Row */}
        <div className="flex items-center justify-center gap-4 px-4">
          <button
            onClick={() => setHeadlightsOn(!headlightsOn)}
            className={`flex flex-col items-center gap-1 transition-all ${
              headlightsOn ? "text-primary" : "text-muted-foreground/40"
            }`}
            aria-label={`Headlights ${headlightsOn ? "on" : "off"}`}
          >
            <Lightbulb className="size-5" />
            <span className="text-[8px] uppercase tracking-wide">Lights</span>
          </button>

          <div
            className={`flex flex-col items-center gap-1 ${
              isCharging ? "text-green-500" : "text-muted-foreground/40"
            }`}
            aria-label={isCharging ? "Fast charging" : "Not charging"}
          >
            <Zap className="size-5" />
            <span className="text-[8px] uppercase tracking-wide">Charging</span>
          </div>

          <button
            onClick={() => setWipersOn(!wipersOn)}
            className={`flex flex-col items-center gap-1 transition-all ${
              wipersOn ? "text-primary" : "text-muted-foreground/40"
            }`}
            aria-label={`Wipers ${wipersOn ? "on" : "off"}`}
          >
            <CloudRain className="size-5" />
            <span className="text-[8px] uppercase tracking-wide">Wipers</span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/30" />

        {/* Gear Selector */}
        <div className="flex items-center gap-1 rounded-xl border border-border/20 bg-muted/30 p-1 mx-auto">
          {["P", "R", "N", "D"].map((g) => (
            <button
              key={g}
              onClick={() => setCurrentGear(g)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentGear === g
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground/50 hover:text-muted-foreground"
              }`}
              aria-label={`Gear ${g}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
