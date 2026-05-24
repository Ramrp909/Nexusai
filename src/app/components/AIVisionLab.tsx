import { X, Activity, Target, Camera, AlertCircle } from "lucide-react";
import { useAI } from "../../context/AIContext";
import { useState } from "react";


export default function AIVisionLab() {
  const { modals, closeModal, faceDetection } = useAI();
  const isOpen = modals.aiVisionLab;
  const [telemetryData, setTelemetryData] = useState({
    eyeMovement: 0,
    blinkRate: 18,
    gazeStability: 95,
    attentionTrend: [45, 52, 58, 62, 68, 75, 82, 88, 92, 95],
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-md flex flex-col">
      {/* Header */}
      <div className="h-16 shrink-0 border-b border-border/30 flex items-center justify-between px-6">
        <div>
          <div className="text-sm font-semibold">AI Vision Lab</div>
          <div className="text-[9px] text-muted-foreground uppercase tracking-wide mt-0.5">
            Face Detection Debug Panel
          </div>
        </div>
        <button
          onClick={() => closeModal("aiVisionLab")}
          className="rounded-lg p-2 hover:bg-accent transition-colors text-muted-foreground"
          aria-label="Close AI Vision Lab"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Content */}
      <div className="
            flex-1
            p-6
            overflow-hidden
            min-h-0
          ">
          <div className="
            max-w-7xl
            mx-auto
            grid
            grid-cols-1
            lg:grid-cols-[1.15fr_0.85fr]
            gap-4
            h-full
            min-h-0
          ">
  {/* LEFT SIDE */}
        <div className="
          grid
          h-full
          min-h-0
          grid-rows-[60%_40%]
          gap-4
        ">
  {/* Webcam Feed with Mesh Overlay */}
          <div className="
              h-full
              rounded-2xl
              border border-border/30
              bg-card/80
              backdrop-blur-md
              overflow-hidden
            ">
            {/* Webcam Placeholder */}
            <div className="
                relative
                w-full
                h-full
                min-h-[320px]
                bg-gradient-to-br
                from-muted/40
                to-muted/20
                flex
                items-center
                justify-center
              ">
              {/* Grid Mesh Overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Face Mesh Visualization */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Draw face outline */}
                <circle
                  cx="50%"
                  cy="45%"
                  r="15%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary opacity-40"
                />
                {/* Eyes */}
                <circle
                  cx="40%"
                  cy="40%"
                  r="3%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-cyan-400/60"
                />
                <circle
                  cx="60%"
                  cy="40%"
                  r="3%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-cyan-400/60"
                />
                {/* Gaze direction lines */}
                <line
                  x1="40%"
                  y1="40%"
                  x2="35%"
                  y2="35%"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-cyan-400/40"
                  strokeDasharray="5,5"
                />
                <line
                  x1="60%"
                  y1="40%"
                  x2="65%"
                  y2="35%"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-cyan-400/40"
                  strokeDasharray="5,5"
                />
              </svg>

              {/* Status Overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2 rounded-lg bg-black/50 px-3 py-2 backdrop-blur-md">
                <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-white">LIVE</span>
              </div>

              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <Camera className="size-8 text-muted/30 mx-auto mb-2" />
                  <div className="text-sm text-muted/50 font-medium">Webcam Feed</div>
                  <div className="text-xs text-muted/40 mt-1">Face detection active with mesh overlay</div>
                </div>
              </div>
            </div>

            {/* Analytics Below Video */}
            {/* <div className="border-t border-border/20 p-4 grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{telemetryData.blinkRate}</div>
                <div className="text-[9px] uppercase tracking-wide text-muted-foreground mt-1">Blinks/min</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{telemetryData.eyeMovement}°</div>
                <div className="text-[9px] uppercase tracking-wide text-muted-foreground mt-1">Eye Movement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{telemetryData.gazeStability}%</div>
                <div className="text-[9px] uppercase tracking-wide text-muted-foreground mt-1">Gaze Stability</div>
              </div>
            </div> */}
            {/* Analytics Overlay */}
<div className="
  absolute

  bottom-3
  left-3
  right-3

  grid
  grid-cols-3

  gap-2

  z-10
">

  <div className="
    rounded-xl

    bg-black/40

    backdrop-blur-md

    border border-white/10

    p-2

    text-center
  ">

    <div className="
      text-lg

      font-bold

      text-primary
    ">

      {telemetryData.blinkRate}

    </div>

    <div className="
      text-[8px]

      uppercase
      tracking-wide

      text-white/60
    ">

      Blinks/min

    </div>

  </div>

  <div className="
    rounded-xl

    bg-black/40

    backdrop-blur-md

    border border-white/10

    p-2

    text-center
  ">

    <div className="
      text-lg

      font-bold

      text-cyan-400
    ">

      {telemetryData.eyeMovement}°

    </div>

    <div className="
      text-[8px]

      uppercase
      tracking-wide

      text-white/60
    ">

      Eye Movement

    </div>

  </div>

  <div className="
    rounded-xl

    bg-black/40

    backdrop-blur-md

    border border-white/10

    p-2

    text-center
  ">

    <div className="
      text-lg

      font-bold

      text-emerald-400
    ">

      {telemetryData.gazeStability}%

    </div>

    <div className="
      text-[8px]

      uppercase
      tracking-wide

      text-white/60
    ">

      Gaze Stability

    </div>

  </div>

</div>
           </div>


           {/* Backend Response Status */}
          <div className="rounded-2xl border border-border/30 bg-card/80 backdrop-blur-md p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="size-5 text-primary" />
              <div className="text-sm font-semibold">Backend Response Status</div>
            </div>

            {/* <div className="space-y-3"> */}
              <div className="
              grid
              grid-cols-2
              gap-3
              h-full
            ">
              <div className="
              min-w-0
              rounded-2xl
              border border-border/15
              bg-card/40
              p-3
                  ">
  <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="size-2 rounded-full bg-green-500" />
                  <span className="text-[10px] uppercase tracking-wide text-green-500">
                    API Status
                  </span>
                </div>
                <div className="text-xs font-semibold">Connected</div>
              </div>

              <div className="rounded-lg border border-border/30 bg-muted/40 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Response Latency
                  </span>
                </div>
                <div
                  className="text-xs font-semibold text-primary"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  42ms
                </div>
              </div>

              <div className="rounded-lg border border-border/30 bg-muted/40 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Model Accuracy
                  </span>
                </div>
                <div
                  className="text-xs font-semibold text-green-500"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  98.7%
                </div>
              </div>
</div>

<div className="
  min-w-0

  rounded-2xl

  border border-border/15

  bg-card/40

  p-3

  overflow-hidden
">
  
              <div className="pt-2 border-t border-border/30">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">
                  Error Logs
                </div>
                <div className="rounded-lg border border-border/30 bg-background/50 p-2 h-24 overflow-y-auto">
                  <div className="text-[9px] text-muted-foreground space-y-1">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="size-3 text-green-500 shrink-0 mt-0.5" />
                      <span>[12:34:22] Detection initialized</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="size-3 text-green-500 shrink-0 mt-0.5" />
                      <span>[12:34:23] Model loaded successfully</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="size-3 text-green-500 shrink-0 mt-0.5" />
                      <span>[12:34:24] Face tracking active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              

            </div>
          </div>
           </div>
          
          {/* RIGHT SIDE */}
<div className="
  grid

  grid-rows-2

  gap-4

  min-h-0
">
  {/* Face Mesh Metrics */}
          <div className="rounded-2xl border border-border/30 bg-card/80 backdrop-blur-md p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="size-5 text-primary" />
              <div className="text-sm font-semibold">Face Mesh Metrics</div>
            </div>

            {/* <div className="space-y-3"> */}
              <div className="
  grid

  grid-cols-2

  gap-2
">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Detection State
                </span>
                <span className="text-xs font-semibold text-green-500">Active</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Confidence Score
                </span>
                <span
                  className="text-xs font-semibold text-primary"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {(faceDetection.confidence * 100).toFixed(1)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Landmarks
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {faceDetection.faceMesh?.landmarks || 468}
                </span>
              </div>

              <div className="pt-2 border-t border-border/30">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">
                  Face Pose
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-muted-foreground">Yaw</span>
                    <span
                      className="text-xs font-medium"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {faceDetection.faceMesh?.yaw.toFixed(2)}°
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-muted-foreground">Pitch</span>
                    <span
                      className="text-xs font-medium"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {faceDetection.faceMesh?.pitch.toFixed(2)}°
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-muted-foreground">Roll</span>
                    <span
                      className="text-xs font-medium"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {faceDetection.faceMesh?.roll.toFixed(2)}°
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Face Tracking Data */}
          <div className="rounded-2xl border border-border/30 bg-card/80 backdrop-blur-md p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="size-5 text-primary" />
              <div className="text-sm font-semibold">Face Tracking Data</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Face ID
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {faceDetection.tracking?.faceId || "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Tracking Confidence
                </span>
                <span
                  className="text-xs font-semibold text-green-500"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {((faceDetection.tracking?.confidence || 0) * 100).toFixed(1)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Frame Rate
                </span>
                <span
                  className="text-xs font-semibold text-primary"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {faceDetection.tracking?.fps || 30} fps
                </span>
              </div>

              <div className="pt-2 border-t border-border/30">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">
                  Bounding Box
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[9px] text-muted-foreground">X:</span>
                    <span
                      className="text-xs font-medium ml-1"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {faceDetection.tracking?.boundingBox.x || 0}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-muted-foreground">Y:</span>
                    <span
                      className="text-xs font-medium ml-1"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {faceDetection.tracking?.boundingBox.y || 0}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-muted-foreground">W:</span>
                    <span
                      className="text-xs font-medium ml-1"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {faceDetection.tracking?.boundingBox.w || 0}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-muted-foreground">H:</span>
                    <span
                      className="text-xs font-medium ml-1"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {faceDetection.tracking?.boundingBox.h || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}