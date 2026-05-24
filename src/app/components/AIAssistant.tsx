import { Mic } from "lucide-react";
import { useAI } from "../../context/AIContext";

export default function AIAssistant() {
  const { 
    isVoiceActive, 
    setVoiceActive,
    attentionStatus,
    attentionScore,
    isDrowsy,
    lookingAway,
  } = useAI();

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
    <div className="rounded-[28px] border border-border/30 bg-card/80 backdrop-blur-md shadow-sm p-4 flex flex-col gap-3 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_4px_24px_rgba(6,182,212,0.12)] dark:hover:shadow-[0_4px_24px_rgba(16,185,129,0.12)]">
      {/* Header with Voice Button */}
      {/* <div className="flex items-center gap-4 shrink-0"> */}
        {/* Left Section */}
<div className="
  flex
  items-center
  gap-2
  shrink-0
  w-[120px]
">
        
        {/* Voice Toggle Button */}
        <button
          onClick={() => setVoiceActive(!isVoiceActive)}
          className={`relative size-08 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
            isVoiceActive
              ? "bg-primary text-primary-foreground shadow-[0_0_22px_rgba(6,182,212,0.45)] dark:shadow-[0_0_22px_rgba(16,185,129,0.45)]"
              : "bg-primary/10 text-primary hover:bg-primary/15"
          }`}
          aria-label={`AI Assistant — ${isVoiceActive ? "Listening" : "Ready"}`}
          aria-pressed={isVoiceActive}
        >
          {isVoiceActive && (
            <span className="absolute inset-0 rounded-2xl bg-primary animate-ping opacity-25" />
          )}
          <Mic className="size-5 relative z-10" />
        </button>

        {/* Title */}
        <div className="flex flex-col gap-0.5 min-w-0">
          {/* <div className="text-[11px] font-semibold uppercase tracking-wider">AI Assistant</div> */}
          <div className="
  text-[11px]

  font-semibold

  uppercase
  tracking-wider

  leading-none

  whitespace-nowrap
">AI Assistant</div>
          <div className="text-[9px] text-muted-foreground">{isVoiceActive ? "Listening…" : "Ready"}</div>
        </div>
      </div>


      {/* AI Context */}
<div className="
  flex-1

  grid

  grid-cols-[1fr_auto]

  items-center

  gap-4

  min-w-0
">

  {/* Insight */}
  <div className="
    rounded-xl

    border border-border/20

    bg-muted/30

    px-3
    py-2

    min-w-0
  ">

    <div
      className={`
        text-[9px]

        font-semibold

        uppercase
        tracking-wide

        ${
          statusColors[
            aiInsight.status as keyof typeof statusColors
          ]
        }
      `}
    >

      {aiInsight.title}

    </div>

    <div className="
      text-[10px]

      text-foreground

      truncate
    ">

      {aiInsight.message}

    </div>

    <div className="
      text-[8px]

      text-muted-foreground
    ">

      Score:
      {Math.round(attentionScore)}%
      •
      {attentionStatus}

    </div>

  </div>

  {/* Recommendations */}
  <div className="
    flex
    items-center

    gap-1.5

    shrink-0
  ">

    {recommendations
      .slice(0, 2)
      .map((rec, idx) => (

        <div
          key={idx}
          className="
            rounded-full

            border border-border/15

            bg-primary/10

            px-2
            py-1

            text-[8px]

            uppercase
            tracking-wide

            text-primary

            font-medium

            whitespace-nowrap
          "
        >

          {rec}

        </div>

      ))}
  </div>

</div>
    </div>
  );
}
