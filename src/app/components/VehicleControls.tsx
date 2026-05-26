import {
  AirVent,
  Armchair,
  Lightbulb,
  Camera,
  AlertTriangle,
  Lock,
  Wifi,
  MoreHorizontal,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { useAI } from "../../context/AIContext";

const CONTROLS = [
  { key: "ac", icon: AirVent, label: "AC" },
  { key: "seat", icon: Armchair, label: "Seat" },
  { key: "ambient", icon: Lightbulb, label: "Ambient" },
  { key: "camera", icon: Camera, label: "Camera" },
  { key: "hazard", icon: AlertTriangle, label: "Hazard" },
  { key: "lock", icon: Lock, label: "Lock" },
  { key: "wifi", icon: Wifi, label: "WiFi" },
  { key: "more", icon: MoreHorizontal, label: "More" },
];

export default function VehicleControls() {
  const {
    activeControls,
    toggleControl,
    temperature,
    setTemperature,
    modals,
    openModal,
    closeModal,
  } = useAI();

  const handleControlClick = (key: string) => {
    if (key === "hazard" && !activeControls.hazard) {
      openModal("hazardDialog");
    } else if (key === "lock") {
      openModal("lockDialog");
    } else if (key === "more") {
      openModal("vehicleControls");
    } else {
      toggleControl(key);
    }
  };

  return (
    <>
      {/* Control Strip */}
      <div className="rounded-[28px] border border-border/30 bg-card/80 backdrop-blur-md shadow-sm p-3 flex items-center hover:border-primary/30 hover:shadow-[0_4px_24px_rgba(6,182,212,0.12)] dark:hover:shadow-[0_4px_24px_rgba(16,185,129,0.12)]">
        <div className="grid grid-cols-8 gap-2 w-full h-full">
          {CONTROLS.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => handleControlClick(key)}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl py-2 px-1 transition-all duration-200 hover:scale-105 ${
                activeControls[key as keyof typeof activeControls]
                  ? key === "hazard"
                    ? "bg-red-500/15 text-red-500 shadow-[0_0_12px_rgba(239,68,68,0.18)]"
                    : "bg-primary/15 text-primary shadow-[0_0_12px_rgba(6,182,212,0.18)] dark:shadow-[0_0_12px_rgba(16,185,129,0.18)]"
                  : "text-muted-foreground/50 hover:text-muted-foreground/70 hover:bg-accent/40"
              }`}
              aria-label={`${label} ${activeControls[key as keyof typeof activeControls] ? "on" : "off"}`}
            >
              <Icon className="size-5" />
              <span className="text-[9px] uppercase tracking-wide">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Expanded Modal */}
      {modals.vehicleControls && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => closeModal("vehicleControls")}
        >
          <div
            className="w-full max-w-4xl bg-card rounded-[28px] border border-border shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="h-16 shrink-0 border-b border-border/30 flex items-center justify-between px-6">
              <div>
                <div className="text-sm font-semibold">Vehicle Controls</div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-wide mt-0.5">
                  Complete Control Panel
                </div>
              </div>
              <button
                onClick={() => closeModal("vehicleControls")}
                className="rounded-lg p-1.5 hover:bg-accent transition-colors text-muted-foreground"
                aria-label="Close vehicle controls"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Climate Control */}
                <div className="rounded-2xl border border-border/30 bg-muted/20 p-5 space-y-4">
                  <div className="text-xs font-semibold">Climate Control</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        AC Temperature
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTemperature(Math.max(16, temperature - 1))}
                          className="size-7 rounded-lg border border-border/30 flex items-center justify-center hover:bg-accent"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span
                          className="text-sm font-semibold min-w-[3rem] text-center"
                          style={{ fontFamily: "JetBrains Mono, monospace" }}
                        >
                          {temperature}°C
                        </span>
                        <button
                          onClick={() => setTemperature(Math.min(32, temperature + 1))}
                          className="size-7 rounded-lg border border-border/30 flex items-center justify-center hover:bg-accent"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Fan Speed
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        defaultValue="5"
                        className="w-32"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Mode
                      </span>
                      <select className="px-2 py-1 text-xs bg-background border border-border/30 rounded-lg">
                        <option>Auto</option>
                        <option>Manual</option>
                        <option>ECO</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Lighting Controls */}
                <div className="rounded-2xl border border-border/30 bg-muted/20 p-5 space-y-4">
                  <div className="text-xs font-semibold">Lighting Controls</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Headlights
                      </span>
                      <select className="px-2 py-1 text-xs bg-background border border-border/30 rounded-lg">
                        <option>Auto</option>
                        <option>On</option>
                        <option>Off</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        High Beam
                      </span>
                      <button className="px-3 py-1 text-xs bg-primary/10 border border-primary/30 rounded-lg text-primary">
                        Off
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Interior Brightness
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="60"
                        className="w-32"
                      />
                    </div>
                  </div>
                </div>

                {/* Seat Adjustments */}
                <div className="rounded-2xl border border-border/30 bg-muted/20 p-5 space-y-4">
                  <div className="text-xs font-semibold">Seat Adjustments</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Position (H)
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="50"
                        className="w-32"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Height
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="50"
                        className="w-32"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Lumbar Support
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="50"
                        className="w-32"
                      />
                    </div>
                  </div>
                </div>

                {/* Sound System */}
                <div className="rounded-2xl border border-border/30 bg-muted/20 p-5 space-y-4">
                  <div className="text-xs font-semibold">Sound System</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Volume
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="50"
                        className="w-32"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Equalizer
                      </span>
                      <select className="px-2 py-1 text-xs bg-background border border-border/30 rounded-lg">
                        <option>Balanced</option>
                        <option>Bass Boost</option>
                        <option>Treble</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hazard Dialog */}
      {modals.hazardDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-[28px] border border-border bg-card p-6 shadow-2xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-red-500/10">
                <AlertTriangle className="size-5 text-red-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Enable Hazard Lights?</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Activates vehicle warning system.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => closeModal("hazardDialog")}
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toggleControl("hazard");
                  closeModal("hazardDialog");
                }}
                className="flex-1 rounded-xl bg-red-500 px-3 py-2 text-xs font-medium text-white hover:bg-red-600 transition-colors"
              >
                Enable
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lock Dialog */}
      {modals.lockDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-[28px] border border-border bg-card p-6 shadow-2xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10">
                <Lock className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Lock All Doors?</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  All vehicle doors will be secured.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => closeModal("lockDialog")}
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toggleControl("lock");
                  closeModal("lockDialog");
                }}
                className="flex-1 rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 transition-all"
              >
                Lock
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
