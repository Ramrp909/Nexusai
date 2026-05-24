import { X, Activity, Target, Camera, AlertCircle } from "lucide-react";
import { useAI } from "../../context/AIContext";
import { useEffect, useState,useRef} from "react";
import {
  FaceMesh,
  FACEMESH_CONTOURS,
  FACEMESH_TESSELATION,
} from "@mediapipe/face_mesh";
import  Webcam from "react-webcam";
import axios from "axios"

import { drawConnectors }
from "@mediapipe/drawing_utils";

export default function AIVisionLab() {

  const { modals, closeModal, faceDetection} = useAI();
  const isOpen = modals.aiVisionLab;
 const [telemetryData, setTelemetryData] = useState({

  eyeMovement: 0,

  blinkRate: 18,

  gazeStability: 95,

  attentionScore: 92,

  fps: 30,

  latency: 42,

  trackingConfidence: 97,
});

const webcamRef =
  useRef<Webcam>(null);

const canvasRef =
  useRef<HTMLCanvasElement>(null);

useEffect(() => {

  const faceMesh = new FaceMesh({

    locateFile: (file: string) => {

      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    },
  });

  faceMesh.setOptions({

    maxNumFaces: 1,

    refineLandmarks: false,

    minDetectionConfidence: 0.5,

    minTrackingConfidence: 0.5,
  });

  faceMesh.onResults((results: any) => {

    const canvas =
      canvasRef.current;

    const video =
      webcamRef.current?.video;

    if (
      !canvas ||
      !video
    ) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    canvas.width =
      video.videoWidth;

    canvas.height =
      video.videoHeight;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
    ctx.save();

ctx.translate(
  canvas.width,
  0
);

ctx.scale(-1, 1);

    if (
      results.multiFaceLandmarks
    ) {

      for (
        const landmarks of
        results.multiFaceLandmarks
      ) {

        drawConnectors(

          ctx,

          landmarks,

          FACEMESH_TESSELATION,

          {

            color:
              "rgba(34,211,238,0.55)",

            lineWidth: 0.6,
          }
        );

        drawConnectors(

          ctx,

          landmarks,

          FACEMESH_CONTOURS,

          {

            color:
              "rgba(34,211,238,0.95)",

            lineWidth: 1,
          }
        );
      }
    }
    ctx.restore();
  });

  let animationFrame: number;

  const detectMesh =
    async () => {

      const video =
        webcamRef.current?.video;

      if (
        video &&
        video.readyState === 4
      ) {

        await faceMesh.send({

          image: video,
        });
      }

      animationFrame =
        requestAnimationFrame(
          detectMesh
        );
    };

  detectMesh();

  const backendInterval =
    setInterval(

      async () => {

        const video =
          webcamRef.current?.video;

        if (
          video &&
          video.readyState === 4
        ) {

          const captureCanvas =
            document.createElement(
              "canvas"
            );

          captureCanvas.width =
            video.videoWidth;

          captureCanvas.height =
            video.videoHeight;

          const captureCtx =
            captureCanvas.getContext(
              "2d"
            );

          if (!captureCtx)
            return;

          captureCtx.drawImage(

            video,

            0,

            0,

            captureCanvas.width,

            captureCanvas.height
          );

          captureCanvas.toBlob(

            async (blob) => {

              if (!blob) return;

              const formData =
                new FormData();

              formData.append(

                "file",

                blob,

                "frame.jpg"
              );

              try {

                const response =
                  await axios.post(

                    "http://127.0.0.1:8000/detect-face",

                    formData
                  );

                const data =
                  response.data;

                setTelemetryData({

                  eyeMovement:
                    data?.vision
                      ?.eye_movement ?? 0,

                  blinkRate:
                    data?.driver
                      ?.blink_rate ?? 18,

                  gazeStability:
                    data?.vision
                      ?.gaze_stability ?? 95,

                  attentionScore:
                    data?.driver
                      ?.attention_score ?? 92,

                  fps:
                    data?.vision
                      ?.fps ?? 30,

                  latency:
                    data?.system
                      ?.latency ?? 42,

                  trackingConfidence:
                    data?.tracking
                      ?.confidence ?? 97,
                });

              } catch (error) {

                console.error(
                  "Backend error:",
                  error
                );
              }
            },

            "image/jpeg",

            0.7
          );
        }
      },

      1000
    );

  return () => {

    cancelAnimationFrame(
      animationFrame
    );

    clearInterval(
      backendInterval
    );
  };

}, []);

if (!isOpen) return null; 



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
  relative

  h-full

  rounded-2xl

  border border-border/30

  bg-card/80

  backdrop-blur-md

  overflow-hidden
">
 
  <div className="relative w-full h-full">

  <Webcam
    ref={webcamRef}
    audio={false}
    mirrored={true}
    screenshotFormat="image/jpeg"
    className="
      absolute
      inset-0
      w-full
      h-full
      object-contain
      z-0
    "
  />

  <canvas
    ref={canvasRef}
    className="
      absolute
      inset-0
      w-full
      h-full
      pointer-events-none
      z-10
      object-contain
    "
  />

</div>

        

            {/* Analytics Below Video */}
            
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
          <div className="rounded-2xl border border-border/30 bg-card/80 backdrop-blur-md p-4 space-y-4">
            <div className="flex items-center gap-1 mb-2">
              <Activity className="size-3 text-primary" />
              <div className="text-sm font-semibold">Backend Response Status</div>
            </div>

            {/* <div className="space-y-3"> */}
              <div className="
              grid
              grid-cols-2
              gap-2
              h-full
            ">
              <div className="
              min-w-0
              rounded-2xl
              border border-border/15
              bg-card/40
              p-2
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

              <div className="rounded-lg border border-border/30 bg-muted/40 p-2">
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

              <div className="rounded-lg border border-border/30 bg-muted/40 p-2">
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