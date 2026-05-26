import { Mic,Bot } from "lucide-react";
import { useAI } from "../../context/AIContext";
import { useState, useEffect} from "react";


type AssistantMode =
  | "welcome"
  | "normal"
  | "warning"
  | "critical"
  | "tracking-lost";

type VoiceState =
  | "idle"
  | "listening"
  | "speaking"
  | "alert";

export default function AIAssistant() {
  const { 
    isVoiceActive, 
    setVoiceActive,
    attentionStatus,
    attentionScore,
    isDrowsy,
    lookingAway,
    telemetryData,
    recognizedDriver
  } = useAI();
const [voiceState, setVoiceState] =
  useState<VoiceState>("idle");

const assistantMode: AssistantMode =
  telemetryData.trackingConfidence <= 20
    ? "tracking-lost"
    : telemetryData.isDrowsy
    ? "critical"
    : telemetryData.lookingAway
    ? "warning"
    : recognizedDriver
    ? "welcome"
    : "normal";

  const assistantMessage = {

  welcome:
    `Welcome back ${
      recognizedDriver?.name || "Driver"
    }`,

  normal:
    "Driver attention stable",

  warning:
    "Eyes off road detected",

  critical:
    "Fatigue signs detected",

  "tracking-lost":
    "Driver tracking lost",

}[assistantMode];

const assistantStatus = {

  welcome:
    "Personalized Mode",

  normal:
    "Monitoring",

  warning:
    "Attention Warning",

  critical:
    "Critical Alert",

  "tracking-lost":
    "Tracking Error",

}[assistantMode];

const assistantColor = {

  welcome:
    "text-cyan-300",

  normal:
    "text-emerald-300",

  warning:
    "text-yellow-300",

  critical:
    "text-red-300",

  "tracking-lost":
    "text-orange-300",

}[assistantMode];

const recommendationCards = {

  welcome: [
    {
      label: "Profile Loaded",
      color:
        "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
    },
    {
      label: "Cabin Synced",
      color:
        "border-blue-500/20 bg-blue-500/10 text-blue-300",
    },
    {
      label: "Drive Ready",
      color:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    },
    {
      label: "Voice Ready",
      color:
        "border-purple-500/20 bg-purple-500/10 text-purple-300",
    },
  ],

  normal: [
    {
      label: "Focus Stable",
      color:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    },
    {
      label: "Assist Active",
      color:
        "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
    },
    {
      label: "Low Fatigue",
      color:
        "border-yellow-500/20 bg-yellow-500/10 text-yellow-300",
    },
    {
      label: "Voice Ready",
      color:
        "border-purple-500/20 bg-purple-500/10 text-purple-300",
    },
  ],

  warning: [
    {
      label: "Refocus Road",
      color:
        "border-yellow-500/20 bg-yellow-500/10 text-yellow-300",
    },
    {
      label: "Attention Drop",
      color:
        "border-orange-500/20 bg-orange-500/10 text-orange-300",
    },
    {
      label: "Reduce Speed",
      color:
        "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
    },
    {
      label: "Voice Alert",
      color:
        "border-purple-500/20 bg-purple-500/10 text-purple-300",
    },
  ],

  critical: [
    {
      label: "Take Break",
      color:
        "border-red-500/20 bg-red-500/10 text-red-300",
    },
    {
      label: "Fatigue High",
      color:
        "border-orange-500/20 bg-orange-500/10 text-orange-300",
    },
    {
      label: "Emergency Ready",
      color:
        "border-yellow-500/20 bg-yellow-500/10 text-yellow-300",
    },
    {
      label: "Alert Active",
      color:
        "border-red-500/20 bg-red-500/10 text-red-300",
    },
  ],

  "tracking-lost": [
    {
      label: "Tracking Lost",
      color:
        "border-orange-500/20 bg-orange-500/10 text-orange-300",
    },
    {
      label: "Camera Blocked",
      color:
        "border-yellow-500/20 bg-yellow-500/10 text-yellow-300",
    },
    {
      label: "Recover Face",
      color:
        "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
    },
    {
      label: "Monitor Reset",
      color:
        "border-purple-500/20 bg-purple-500/10 text-purple-300",
    },
  ],

}[assistantMode];

useEffect(() => {

  if (
    assistantMode === "critical"
  ) {

    setVoiceState("alert");

  } else if (
    assistantMode === "warning"
  ) {

    setVoiceState("speaking");

  } else {

    setVoiceState("idle");
  }

}, [assistantMode]);

  const aiInsight = isDrowsy
    ? {
        title: "Fatigue Alert",
        message: "Critical attention levels detected",
        status: "Critical",
      }
    : lookingAway
    ? {
        title: "Distraction Detected",
        message: "Attention deviation from road",
        status: "Warning",
      }
    : {
        title: "Attention Optimal",
        message: "Safe operational status",
        status: "Stable",
      };

  const recommendations = isDrowsy
    ? ["Find rest stop", "Enable safety assist", "Emergency alert"]
    : lookingAway
    ? ["Focus on road", "Reduce distractions", "Adjust mirrors"]
    : ["Maintain focus", "Adaptive monitoring", "Stay alert"];

  const statusColors = {
    Stable: "text-emerald-400",
    Warning: "text-yellow-400",
    Critical: "text-red-400",
  };

  return (
    <div className="rounded-[28px] border border-border/30 bg-card/80 backdrop-blur-md shadow-sm p-2 flex flex-col gap-3 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_4px_24px_rgba(6,182,212,0.12)] dark:hover:shadow-[0_4px_24px_rgba(16,185,129,0.12)]">
      {/* Header with Voice Button */}
     <div className="grid grid-cols-3 divide-x divide-cyan-500/10">

    {/* SECTION 1 */}
    {/* <div className="p-2 flex flex-col justify-between min-h-0 h-full"> */}
      <div className="p-2 flex flex-col gap-1 h-full">

      <div className="flex items-center justify-between">

       <div className="flex items-center gap-2">

  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">

    <Bot className="w-3 h-3 text-cyan-300" />

  </div>

  <div>
    <p className="text-xs text-cyan-500 uppercase tracking-wider">
      AI Copilot
    </p>

    <p className={`text-[10px] font-medium ${assistantColor}`}>
      {assistantStatus}
    </p>
  </div>

</div>

<div className="flex items-center gap-2">

  <div className={`w-2 h-2 rounded-full ${
  assistantMode === "critical"
    ? "bg-red-400"
    : assistantMode === "warning"
    ? "bg-yellow-400"
    : "bg-emerald-400"
}  animate-pulse`} />
 

  <button className={`
  w-7 h-7 rounded-lg
  flex items-center justify-center
  transition-all duration-300

  ${
    voiceState === "alert"
      ? "bg-red-500 animate-pulse"
      : voiceState === "speaking"
      ? "bg-yellow-500"
      : "bg-cyan-500"
  }
`}
  >
    

    <Mic className="w-3 h-3" />

  </button>

</div>

      </div>

      <div className="mt-0.5 space-y-0.5">
        <p className="text-xs font-semibold text-white leading-snug">
          {assistantMessage}
        </p>

          <p className="text-[10px] text-slate-400 leading-tight">
          Cabin systems operating normally
        </p>
      </div>

    </div>

    {/* SECTION 2 */}
      <div className="p-2 flex flex-col gap-1 h-full">

      <div>
        <p className="text-xs text-cyan-500 uppercase tracking-wider">
          Driver Profile
        </p>

        <div className="mt-1 flex items-center gap-2">

          <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 font-semibold">
            R
          </div>

          <div>
            <p className="text-sm font-medium text-white">
              Ramprasad
            </p>

            <p className="text-xs text-slate-400">
              Safe Driver
            </p>
          </div>

        </div>
      </div>

      <div className="space-y-1 mt-1">

        <div className="flex items-center justify-between text-xs">

          <span className="text-slate-400">
            Attention
          </span>

          <span className="text-emerald-400 font-medium">
            Stable
          </span>

        </div>

        <div className="flex items-center justify-between text-xs">

          <span className="text-slate-400">
            Safety Mode
          </span>

          <span className="text-cyan-300 font-medium">
            Active
          </span>

        </div>

      </div>

    </div>

    {/* SECTION 3 */}
   <div className="mt-1 grid grid-cols-2 gap-1">

  {recommendationCards.map(
    (card, index) => (

      <div
        key={index}
        className={`
          rounded-lg border px-2 py-1
          transition-all duration-300
          ${card.color}
        `}
      >

        <p className="text-[10px] font-medium">
          {card.label}
        </p>

      </div>
    )
  )}

</div>

  </div>
    </div>
  );
}
