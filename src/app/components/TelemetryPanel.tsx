import { X, Maximize2, Minimize2,  ShieldCheck,
  ScanFace,
  BrainCircuit,
  Activity,
  Radar,
<<<<<<< HEAD
  Target, Eye, Camera, Thermometer, Gauge, Battery, Wind, Smartphone,
  icons} from "lucide-react";
import { useAI } from "../../context/AIContext";

=======
  Target, Eye, Camera, Thermometer, Gauge, Battery, Wind, 
  icons} from "lucide-react";
import { useAI } from "../../context/AIContext";

// const EXTENDED_TELEMETRY = [
//   { icon: Target, title: "AI Scan Status", value: "Active", status: "green" },
//   { icon: Eye, title: "Attention Level", value: "95%", status: "green" },
//   { icon: Camera, title: "Detected Faces", value: "1", status: "green" },
//   { icon: Activity, title: "Posture Quality", value: "Good", status: "green" },
//   { icon: Thermometer, title: "Cabin Temperature", value: "22°C", status: "green" },
//   { icon: Gauge, title: "Engine RPM", value: "3200", status: "yellow" },
//   { icon: Battery, title: "Battery Health", value: "87%", status: "green" },
//   { icon: Wind, title: "Air Quality", value: "Excellent", status: "green" },
//   { icon: Activity, title: "Vibration Sensors", value: "Normal", status: "green" },
//   { icon: Thermometer, title: "Tire Pressure", value: "32 PSI", status: "green" },
//   { icon: Camera, title: "Blind Spot", value: "Clear", status: "green" },
//   { icon: Target, title: "Lane Assist", value: "Engaged", status: "green" },
// ];



>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03

export default function TelemetryPanel() {

  
  const { modals, closeModal, toggleModal,

  attentionScore,

  attentionStatus,

  headDirection,

  isDrowsy,
<<<<<<< HEAD
  isYawning,
isTalking,
phoneDetected,

fatigueLevel,

safetyScore,
=======
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03

  lookingAway,
  blinkRate,

   } = useAI();
  const EXTENDED_TELEMETRY = [

  {
    title: "AI Confidence",

    value: `${attentionScore}%`,

    status:
      attentionScore > 80
        ? "Stable"
        : attentionScore > 50
        ? "Warning"
        : "Critical",

    icon: BrainCircuit,
  },
<<<<<<< HEAD
  {
  title: "Safety Score",

  value: `${safetyScore}/100`,

  status:
    safetyScore >= 80
      ? "Stable"
      : safetyScore >= 60
      ? "Warning"
      : "Critical",

  icon: ShieldCheck,
},
=======
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03

  {
    title: "Face Tracking",

    value:
      lookingAway
        ? "Unstable"
        : "Locked",

    status:
      lookingAway
        ? "Warning"
        : "Stable",

    icon: ScanFace,
  },

  {
    title: "Head Pose",

    value: headDirection,

    status:
      headDirection === "Center"
        ? "Stable"
        : "Tracking",

    icon: Radar,
  },
<<<<<<< HEAD
  
{
  title: "Fatigue",

  value: fatigueLevel,

  status:
    fatigueLevel === "High"
      ? "Critical"
      : fatigueLevel === "Medium"
      ? "Warning"
      : "Stable",

  icon: Thermometer,
},
{
  title: "Phone Usage",

  value:
    phoneDetected
      ? "Detected"
      : "Clear",

  status:
    phoneDetected
      ? "Critical"
      : "Stable",

  icon: Smartphone,
},
{
  title: "Yawning",

  value:
    isYawning
      ? "Detected"
      : "Normal",

  status:
    isYawning
      ? "Warning"
      : "Stable",

  icon: Wind,
},
// {
//   title: "Talking",

//   value:
//     isTalking
//       ? "Detected"
//       : "Silent",

//   status:
//     isTalking
//       ? "Tracking"
//       : "Stable",

//   icon: Activity,
// },

  {
    title: "Driver State",
    value:
  phoneDetected
    ? "Phone Usage"

    : isDrowsy
    ? "Drowsy"

    : isYawning
    ? "Yawning"

    : attentionStatus,
=======

  {
    title: "Driver State",

    value:
      isDrowsy
        ? "Drowsy"
        : attentionStatus,
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03

    status:
      isDrowsy
        ? "Critical"
        : "Stable",

    icon: Eye,
  },

<<<<<<< HEAD
  
=======
  {
    title: "AI Pipeline",

    value:
      isDrowsy
        ? "Escalated"
        : "Operational",

    status:
      isDrowsy
        ? "Critical"
        : "Stable",

    icon: Activity,
  },
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03

  {
    title: "Monitoring",

    value:
      attentionStatus,

    status:
      attentionStatus ===
      "Focused"
        ? "Stable"
        : "Warning",

    icon: ShieldCheck,
  },
  {title: "BlinkRate", value: blinkRate, status: blinkRate > 2
        ? "Stable"
        : attentionScore > 4
        ? "Warning"
        : "Critical",
<<<<<<< HEAD
        icon: Eye, },
        {
    title: "AI Pipeline",

    value:
      isDrowsy
        ? "Escalated"
        : "Operational",

    status:
      isDrowsy
        ? "Critical"
        : "Stable",

    icon: Activity,
  },
=======
        icon: Eye, }
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03

];

const STATUS_COLORS = {
  green: {
    border: "border-green-500/30",
    bg: "bg-green-500/10",
    text: "text-green-500",
    dot: "bg-green-500",
  },
  yellow: {
    border: "border-amber-400/30",
    bg: "bg-amber-400/10",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
  red: {
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    text: "text-red-500",
    dot: "bg-red-500",
  },
};


const telemetryStyles = {

  Stable: {

    text:
      "text-emerald-400",

    border:
      "border-emerald-500/15",

    bg:
      "bg-emerald-500/10",
  },

  Warning: {

    text:
      "text-yellow-400",

    border:
      "border-yellow-500/15",

    bg:
      "bg-yellow-500/10",
  },

  Critical: {

    text:
      "text-red-400",

    border:
      "border-red-500/15",

    bg:
      "bg-red-500/10",
  },

  Tracking: {

    text:
      "text-blue-400",

    border:
      "border-blue-500/15",

    bg:
      "bg-blue-500/10",
  },

};
<<<<<<< HEAD


=======
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03
  const isOpen = modals.telemetryPanel;
  const isFullscreen = modals.telemetryFullscreen;

  if (!isOpen) return null;

  const handleMaximize = () => {
    toggleModal("telemetryFullscreen");
  };

  const handleClose = () => {
    closeModal("telemetryPanel");
    closeModal("telemetryFullscreen");
  };

 
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col hover:border-primary/30 hover:shadow-[0_4px_24px_rgba(6,182,212,0.12)] dark:hover:shadow-[0_4px_24px_rgba(16,185,129,0.12)]">
        {/* Header */}
        <div className="h-16 shrink-0 border-b border-border/30 flex items-center justify-between px-6">
          <div>
            <div className="text-sm font-semibold">Extended Telemetry</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wide mt-0.5">
              Full Screen View
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMaximize}
              className="rounded-lg p-2 hover:bg-accent transition-colors text-muted-foreground"
              aria-label="Minimize to panel"
            >
              <Minimize2 className="size-4" />
            </button>
            <button
              onClick={handleClose}
              className="rounded-lg p-2 hover:bg-accent transition-colors text-muted-foreground"
              aria-label="Close telemetry"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {EXTENDED_TELEMETRY.map((item, i) => {
              const Icon = item.icon;
              // const colors = STATUS_COLORS[item.status as keyof typeof STATUS_COLORS];
              const colors =
  telemetryStyles[
    item.status as keyof typeof telemetryStyles
  ] ??
  telemetryStyles.Stable;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border ${colors.border} ${colors.bg} p-4 transition-all hover:scale-105`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`size-4 ${colors.text}`} />
                    <div className={`size-2 rounded-full ${STATUS_COLORS.green.dot}`} />
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">
                    {item.title}
                  </div>
                  <div className={`text-lg font-semibold ${colors.text}`}>{item.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed

top-[80px]
left-[38%]

h-[66vh]

w-[500px]

z-50  flex items-center justify-end "
      onClick={handleClose}
    >
      <div
       className="
  h-full
  w-full

  bg-card/95

  border border-border/30

  rounded-[32px]

  shadow-2xl

  flex
  flex-col

  overflow-hidden

  animate-slide-in-right

  backdrop-blur-xl
"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: "slideInRight 300ms ease-out",
        }}
      >
        {/* Header */}
        <div className="h-16 shrink-0 border-b border-border/30 flex items-center justify-between px-4">
          <div>
            <div className="text-sm font-semibold">Extended Telemetry</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wide mt-0.5">
              Additional Status Cards
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleMaximize}
              className="rounded-lg p-1.5 hover:bg-accent transition-colors text-muted-foreground"
              aria-label="Maximize to fullscreen"
            >
              <Maximize2 className="size-3.5" />
            </button>
            <button
              onClick={handleClose}
              className="rounded-lg p-1.5 hover:bg-accent transition-colors text-muted-foreground"
              aria-label="Close telemetry panel"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        
          <div
  className="
    flex-1

    overflow-y-auto

    p-4

    grid
    grid-cols-2

    auto-rows-min

    gap-3
  "
>
          {EXTENDED_TELEMETRY.map((item, i) => {
            const Icon = item.icon;
           
            const colors =
  telemetryStyles[
    item.status as keyof typeof telemetryStyles
  ] ??
  telemetryStyles.Stable;

            return (
              <div
                key={i}
                // className={`rounded-xl border ${colors.border} ${colors.bg} p-3 flex items-center gap-3`}
                className={`
  relative

  rounded-xl

  border

  ${colors.border}
  ${colors.bg}

  p-3

  flex
  items-center
  gap-3

  overflow-hidden
`}
                
              >
                {/* Active Glow Line */}
<div
  className={`
    absolute

    left-0
    top-0
    bottom-0

    w-[2px]

    ${
      colors.text.includes("green")
        ? "bg-green-400"

        : colors.text.includes("red")
        ? "bg-red-400"

        : colors.text.includes("yellow")
        ? "bg-yellow-400"

        : "bg-blue-500 dark:bg-emerald-400"
    }
  `}
/>
                <Icon className={`size-5 shrink-0 ${colors.text}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {item.title}
                  </div>
                  <div className={`text-sm font-semibold ${colors.text} mt-0.5`}>
                    {item.value}
                  </div>
                </div>
                <div className={`size-2 rounded-full ${STATUS_COLORS.green.dot} shrink-0`} />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
