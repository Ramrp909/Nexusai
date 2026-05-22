import { useState } from "react";
import { Lightbulb, Zap, CloudRain } from "lucide-react";
import {useAI} from "../../context/AIContext"

export default function VehicleStatus() {
  const [speed] = useState(72);
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [isCharging] = useState(true);
  const [wipersOn, setWipersOn] = useState(false);
  const [currentGear, setCurrentGear] = useState("D");

  const {
  attentionScore,
  attentionStatus,
  isDrowsy,
  lookingAway,
} = useAI();

const driveMode =

  isDrowsy
    ? "Safe Mode"

    : lookingAway
    ? "Assist"

    : "Comfort";

const ringColor =

  isDrowsy
    ? "text-red-500"

    : lookingAway
    ? "text-yellow-400"

    : "text-primary";

    const vehicleState =

  isDrowsy
    ? "Critical"

    : lookingAway
    ? "Assist"

    : "Active";

    const vehicleStateStyle =

  isDrowsy
    ? `
      border-red-500/30
      bg-red-500/15
      text-red-400
    `

    : lookingAway
    ? `
      border-yellow-500/30
      bg-yellow-500/15
      text-yellow-400
    `

    : `
      border-green-500/30
      bg-green-500/15
      text-green-500
    `;

  return (
    <div className="flex-1 rounded-[28px] border border-border/30 bg-card/80 backdrop-blur-md shadow-sm p-4 flex flex-col gap-3 min-h-0">
      <div className="flex items-center justify-between shrink-0">
        <span className="text-[11px] font-semibold uppercase tracking-wider">
          Vehicle Status
        </span>
        <span
  className={`
    rounded-full

    border

    px-2
    py-0.5

    text-[8px]
    font-semibold

    uppercase
    tracking-wide

    transition-all
    duration-300

    ${vehicleStateStyle}
  `}
>

  {vehicleState}

</span>
      </div>

      
      <div className="flex-1 flex flex-col justify-between min-h-0">

  <div className="flex items-center justify-between flex-1 gap-4">

    {/* Left Speedometer */}
    <div className="flex-1 flex items-center justify-center h-full">

      <div className="relative flex items-center justify-center size-24 shrink-0">

        <svg className="absolute inset-0 size-full -rotate-90">

          <circle
            cx="48"
            cy="48"
            r="38"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-muted/20"
          />

          <circle
            cx="48"
            cy="48"
            r="38"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeDasharray={`${(speed / 200) * 238} 238`}
            // className="text-primary transition-all duration-500"
            className={`
  ${ringColor}

  transition-all
  duration-500

  ${
    isDrowsy
      ? "animate-pulse"
      : ""
  }
`}
            strokeLinecap="round"
          />

        </svg>

        <div className="flex flex-col items-center">

          <div
            className="text-2xl font-semibold leading-none"
            style={{
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {speed}
          </div>

          <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1">
            km/h
          </div>

        </div>

      </div>
      <div className="
  mt-2

  rounded-full

  border border-border/20

  bg-muted/30

  px-2.5
  py-1

  text-[8px]
  font-semibold

  uppercase
  tracking-[0.2em]

  text-primary
">
  {driveMode}
</div>

    </div>

    {/* Right Side */}
    <div className="h-full flex flex-col items-center justify-between py-1">

      {/* Horizontal Controls */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => setHeadlightsOn(!headlightsOn)}
          className={`transition-all ${
            headlightsOn
              ? "text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.35)] dark:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)]"
              : "text-muted-foreground/40"
          }`}
        >

          <Lightbulb className="size-5" />

        </button>

        <div
          className={`${
            isCharging
              ? "text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]"
              : "text-muted-foreground/40"
          }`}
        >

          <Zap className="size-5" />

        </div>

        <button
          onClick={() => setWipersOn(!wipersOn)}
          className={`transition-all ${
            wipersOn
              ? "text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.35)] dark:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)]"
              : "text-muted-foreground/40"
          }`}
        >

          <CloudRain className="size-5" />

        </button>

      </div>

      {/* Gear Strip */}
      <div className="flex items-center gap-1 rounded-xl border border-border/20 bg-muted/30 p-1">

        {["P", "R", "N", "D"].map((g) => (

          <button
            key={g}
            onClick={() => setCurrentGear(g)}
            className={`px-3 py-1 rounded-lg text-[10px] font-semibold transition-all ${
              currentGear === g
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground/50 hover:text-muted-foreground"
            }`}
          >

            {g}

          </button>

        ))}

      </div>

    </div>

  </div>

</div>
    </div>
  );
}
