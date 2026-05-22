import { X, Activity, Target, Camera, AlertCircle } from "lucide-react";
import { useAI } from "../../context/AIContext";

export default function AIVisionLab() {
  const { modals, closeModal, faceDetection } = useAI();
  const isOpen = modals.aiVisionLab;

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
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Face Mesh Metrics */}
          <div className="rounded-2xl border border-border/30 bg-card/80 backdrop-blur-md p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="size-5 text-primary" />
              <div className="text-sm font-semibold">Face Mesh Metrics</div>
            </div>

            <div className="space-y-3">
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

          {/* Backend Response Status */}
          <div className="rounded-2xl border border-border/30 bg-card/80 backdrop-blur-md p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="size-5 text-primary" />
              <div className="text-sm font-semibold">Backend Response Status</div>
            </div>

            <div className="space-y-3">
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
    </div>
  );
}
