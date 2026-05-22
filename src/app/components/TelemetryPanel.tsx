import { X, Maximize2, Minimize2, Target, Eye, Camera, Activity, Thermometer, Gauge, Battery, Wind } from "lucide-react";
import { useAI } from "../../context/AIContext";

const EXTENDED_TELEMETRY = [
  { icon: Target, title: "AI Scan Status", value: "Active", status: "green" },
  { icon: Eye, title: "Attention Level", value: "95%", status: "green" },
  { icon: Camera, title: "Detected Faces", value: "1", status: "green" },
  { icon: Activity, title: "Posture Quality", value: "Good", status: "green" },
  { icon: Thermometer, title: "Cabin Temperature", value: "22°C", status: "green" },
  { icon: Gauge, title: "Engine RPM", value: "3200", status: "yellow" },
  { icon: Battery, title: "Battery Health", value: "87%", status: "green" },
  { icon: Wind, title: "Air Quality", value: "Excellent", status: "green" },
  { icon: Activity, title: "Vibration Sensors", value: "Normal", status: "green" },
  { icon: Thermometer, title: "Tire Pressure", value: "32 PSI", status: "green" },
  { icon: Camera, title: "Blind Spot", value: "Clear", status: "green" },
  { icon: Target, title: "Lane Assist", value: "Engaged", status: "green" },
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

export default function TelemetryPanel() {
  const { modals, closeModal, toggleModal } = useAI();
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
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col">
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
              const colors = STATUS_COLORS[item.status as keyof typeof STATUS_COLORS];
              return (
                <div
                  key={i}
                  className={`rounded-2xl border ${colors.border} ${colors.bg} p-4 transition-all hover:scale-105`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`size-4 ${colors.text}`} />
                    <div className={`size-2 rounded-full ${colors.dot}`} />
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
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-end"
      onClick={handleClose}
    >
      <div
        className="h-full w-full max-w-md bg-card border-l border-border shadow-2xl flex flex-col animate-slide-in-right"
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
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {EXTENDED_TELEMETRY.map((item, i) => {
            const Icon = item.icon;
            const colors = STATUS_COLORS[item.status as keyof typeof STATUS_COLORS];
            return (
              <div
                key={i}
                className={`rounded-xl border ${colors.border} ${colors.bg} p-3 flex items-center gap-3`}
              >
                <Icon className={`size-5 shrink-0 ${colors.text}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {item.title}
                  </div>
                  <div className={`text-sm font-semibold ${colors.text} mt-0.5`}>
                    {item.value}
                  </div>
                </div>
                <div className={`size-2 rounded-full ${colors.dot} shrink-0`} />
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
