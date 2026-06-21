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
<<<<<<< HEAD
=======
import { API_BASE } from "../../services/api";
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03

type EventLog = {
  type: "info" | "warning" | "critical" | "system";
  message: string;
  time: string;
};

import TestPanel from "./TestPanel";

export default function AIVisionLab() {
  const { modals, closeModal, faceDetection,setParkingAssistActive,telemetryData,setTelemetryData,simulateTelemetry,
globalTestMode, setGlobalTestMode} = useAI();
  const isOpen = modals.aiVisionLab;

const liveTelemetry = [
  {
    label: "Focused",
    active: telemetryData.attentionScore > 75,
    color: "emerald",
  },
  {
    label: "Distracted",
    active: telemetryData.attentionScore < 75 && telemetryData.attentionScore > 45,
    color: "yellow",
  },
  {
    label: "Drowsy",
    active: telemetryData.attentionScore <= 45,
    color: "red",
  },
  {
    label: "Tracking",
    active: telemetryData.trackingConfidence > 70,
    color: "cyan",
  },
  {
    label: "Face Lock",
    active: telemetryData.trackingConfidence > 85,
    color: "emerald",
  },
  {
    label: "Mesh Active",
    active: true,
    color: "cyan",
  },
  {
    label: "Realtime",
    active: telemetryData.fps > 20,
    color: "cyan",
  },
  {
    label: "FPS Stable",
    active: telemetryData.fps >= 24,
    color: "emerald",
  },
  {
    label: "Backend",
    active: true,
    color: "emerald",
  },
  {
    label: "Eye Active",
    active: telemetryData.eyeMovement > 0,
    color: "cyan",
  },
  {
    label: "Blinking",
    active: telemetryData.blinkRate > 15,
    color: "yellow",
  },
  {
    label: "Gaze Stable",
    active: telemetryData.gazeStability > 80,
    color: "emerald",
  },
];

const telemetryColors = {
  emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  yellow: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
  red: "border-red-500/20 bg-red-500/10 text-red-400",
};



const [eventLogs, setEventLogs] = useState<EventLog[]>([
  {
    type: "info",
    message: "Vision system initialized",
    time: new Date().toLocaleTimeString(),
  },
   {
    type: "info",
    message: "Telemetry reset complete",
    time: new Date().toLocaleTimeString(),
  },
]);

const eventColors = {
  info: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
  warning: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
  critical: "text-red-400 border-red-500/20 bg-red-500/10",
  system: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
};

useEffect(() => {

  const logs: EventLog[] = [];

  if (telemetryData.attentionScore < 45) {

    logs.push({
      type: "critical",
      message: "Drowsiness detected",
      time: new Date().toLocaleTimeString(),
    });
  }

  if (
    telemetryData.attentionScore >= 45 &&
    telemetryData.attentionScore < 70
  ) {

    logs.push({
      type: "warning",
      message: "Attention score dropping",
      time: new Date().toLocaleTimeString(),
    });
  }

  if (telemetryData.trackingConfidence < 50) {

    logs.push({
      type: "system",
      message: "Tracking confidence unstable",
      time: new Date().toLocaleTimeString(),
    });
  }

  if (telemetryData.fps < 20) {

    logs.push({
      type: "system",
      message: "Frame rate drop detected",
      time: new Date().toLocaleTimeString(),
    });
  }

  if (telemetryData.gazeStability > 85) {

    logs.push({
      type: "info",
      message: "Driver attention stabilized",
      time: new Date().toLocaleTimeString(),
    });
  }

  if (logs.length > 0) {

    setEventLogs((prev) => {

      const updated = [
        ...logs,
        ...prev,
      ];

      return updated.slice(0, 12);
    });
  }

}, [
  telemetryData.attentionScore,
  telemetryData.trackingConfidence,
  telemetryData.fps,
  telemetryData.gazeStability,
]);

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
        if (globalTestMode) return;

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

<<<<<<< HEAD
                    "http://127.0.0.1:8000/detect-face",
=======
                    `${API_BASE}/detect-face`,
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03

                    formData
                  );

                const data =
                  response.data;
setTelemetryData(prev => ({
  ...prev,

  eyeMovement:
    data?.driver?.eyeMovement ?? 0,

  blinkRate:
    data?.driver?.blinkRate ?? 0,

  gazeStability:
    data?.driver?.gazeStability ?? 0,

  attentionScore:
    data?.driver?.attentionScore ?? 0,

  fps:
    data?.system?.fps ?? 0,

  latency:
    data?.system?.latency ?? 0,

  trackingConfidence:
    data?.tracking?.confidence ?? 0,

  faceDetected:
    data?.tracking?.faceDetected ?? false,

  isDrowsy:
    data?.driver?.isDrowsy ?? false,
<<<<<<< HEAD
  isYawning: data.driver.isYawning,
isTalking: data.driver.isTalking,
phoneDetected: data.driver.phoneDetected,

fatigueLevel: data.driver.fatigueLevel,

safetyScore: data.driver.safetyScore,
=======
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03

  attentionStatus:
    data?.driver?.attentionStatus ?? "Focused",

  lookingAway:
    data?.driver?.lookingAway ?? false,

  faceCount:
    data?.tracking?.faceCount ?? 0,

  trackingState:
    data?.tracking?.state ?? "stable",

  meshEnabled:
    data?.vision?.meshEnabled ?? false,

  meshConfidence:
    data?.vision?.meshConfidence ?? 0,

  pipelineStatus:
    data?.vision?.pipelineStatus ?? "",

  riskLevel:
    data?.vehicle?.riskLevel ?? "Low",

  safetyMode:
    data?.vehicle?.safetyMode ?? "Monitoring",

  assistState:
    data?.vehicle?.assistState ?? "Active",
}));

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

}, [globalTestMode]);

useEffect(() => {

  if (telemetryData.attentionScore <= 60) {

    setEventLogs(prev => [
      {
        type: "warning",
        message: "Driver distraction detected",
        time: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 14),
    ]);
  }

}, [telemetryData.attentionScore]);
useEffect(() => {

  if (telemetryData.attentionScore <= 35) {

    setEventLogs(prev => [
      {
        type: "critical",
        message: "Drowsiness risk detected",
        time: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 14),
    ]);
  }

}, [telemetryData.attentionScore]);

useEffect(() => {

  if (
    telemetryData.trackingConfidence <= 20
  ) {

    setEventLogs(prev => [
      {
        type: "warning",
        message: "Face tracking lost",
        time: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 14),
    ]);
  }

}, [telemetryData.trackingConfidence]);

const resetTelemetry = () => {

  setTelemetryData(prev => ({
    ...prev,

    eyeMovement: 0,
    blinkRate: 18,
    gazeStability: 95,
    attentionScore: 92,
    fps: 30,
    latency: 42,
    trackingConfidence: 97,

    faceDetected: false,
    faceCount: 0,
    isDrowsy: false,
<<<<<<< HEAD
    isYawning: false,
isTalking: false,
phoneDetected: false,

fatigueLevel: "Low",

safetyScore: 100,
=======
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03
  }));

  setParkingAssistActive(false);
};



if (!isOpen) return null; 

  return (
    <>
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
                  {telemetryData.latency}ms
                </div>
              </div>

              <div className="rounded-lg border border-border/30 bg-muted/40 p-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Model Accuracy- Trackconf
                  </span>
                </div>
                <div
                  className="text-xs font-semibold text-green-500"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {telemetryData.trackingConfidence}%
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
<div className="grid grid-rows-2  gap-4 min-h-0">
  <div className="flex h-full flex-col gap-3">

  <div className="grid grid-cols-2 gap-3">

            {/* AI Telemetry */}
            <div className="rounded-2xl border border-border/20 bg-card/60 p-3">
              <div className="mb-2 flex items-center gap-2">
                <Activity className="size-5 text-cyan-400" />
                <div className="text-s font-semibold uppercase tracking-wider">
                  AI Telemetry
                </div>
              </div>

              <div className="flex flex-wrap gap-2">

                <div className="rounded-md border border-border/20 bg-muted/20 px-2 py-1">
                  <div className="text-[8px] uppercase text-muted-foreground">
                    State
                  </div>
                  <div className="text-s font-semibold text-cyan-400">
                    Active
                  </div>
                </div>

                <div className="rounded-md border border-border/20 bg-muted/20 px-2 py-1">
                  <div className="text-[8px] uppercase text-muted-foreground">
                    Confidence
                  </div>
                  <div className="text-s font-semibold text-emerald-400">
                    {telemetryData.trackingConfidence}%
                  </div>
                </div>

                <div className="rounded-md border border-border/20 bg-muted/20 px-2 py-1">
                  <div className="text-[8px] uppercase text-muted-foreground">
                    Landmarks
                  </div>
                  <div className="text-s font-semibold text-primary">
                    468
                  </div>
                </div>

              </div>

              <div className="mt-3 flex flex-wrap gap-2">

                <div className="rounded-md border border-border/20 px-2 py-1">
                  <div className="text-[8px] uppercase text-muted-foreground">
                    Yaw
                  </div>
                  <div className="text-s font-semibold">
                    12°
                  </div>
                </div>

                <div className="rounded-md border border-border/20 px-2 py-1">
                  <div className="text-[8px] uppercase text-muted-foreground">
                    Pitch
                  </div>
                  <div className="text-s font-semibold">
                    4°
                  </div>
                </div>

                <div className="rounded-md border border-border/20 px-2 py-1">
                  <div className="text-[8px] uppercase text-muted-foreground">
                    Roll
                  </div>
                  <div className="text-s font-semibold">
                    2°
                  </div>
                </div>

              </div>
            </div>

            {/* Face Tracking */}
            <div className="rounded-2xl border border-border/20 bg-card/60 p-3">

              <div className="mb-2 flex items-center gap-2">
                <Target className="size-4 text-primary" />
                <div className="text-s font-semibold uppercase tracking-wider">
                  Face Tracking
                </div>
              </div>

              <div className="flex flex-wrap gap-2">

                <div className="rounded-md border border-border/20 px-2 py-1">
                  <div className="text-[8px] uppercase text-muted-foreground">
                    Face ID
                  </div>
                  <div className="text-s font-semibold">
                    FACE-01
                  </div>
                </div>

                <div className="rounded-md border border-border/20 px-2 py-1">
                  <div className="text-[8px] uppercase text-muted-foreground">
                    Status
                  </div>
                  <div className="text-s font-semibold text-emerald-400">
                    Tracking
                  </div>
                </div>

                <div className="rounded-md border border-border/20 px-2 py-1">
                  <div className="text-[8px] uppercase text-muted-foreground">
                    FPS
                  </div>
                  <div className="text-s font-semibold text-cyan-400">
                    {telemetryData.fps}
                  </div>
                </div>

              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">

                <div className="rounded-md border border-border/20 px-2 py-1">
                  <div className="text-[8px] uppercase text-muted-foreground">
                    X
                  </div>
                  <div className="text-s font-semibold">
                    120
                  </div>
                </div>

                <div className="rounded-md border border-border/20 px-2 py-1">
                  <div className="text-[8px] uppercase text-muted-foreground">
                    Y
                  </div>
                  <div className="text-s font-semibold">
                    84
                  </div>
                </div>

                <div className="rounded-md border border-border/20 px-2 py-1">
                  <div className="text-[8px] uppercase text-muted-foreground">
                    W
                  </div>
                  <div className="text-s font-semibold">
                    240
                  </div>
                </div>

                <div className="rounded-md border border-border/20 px-2 py-1">
                  <div className="text-[8px] uppercase text-muted-foreground">
                    H
                  </div>
                  <div className="text-s font-semibold">
                    260
                  </div>
                </div>

              </div>

            </div>     
            </div> 
            
            <div className="rounded-2xl border border-border/20 bg-card/60 p-3">

  <div className="mb-3 flex items-center gap-2">
    <Activity className="size-4 text-cyan-400" />
    <div className="text-xs font-semibold uppercase tracking-wider">
      Live Telemetry
    </div>
  </div>

  <div className="grid grid-cols-3 gap-2">

    {liveTelemetry.map((item) => (

      <div
        key={item.label}
        className={`rounded-full border px-2 py-1 text-[12px] font-semibold uppercase tracking-wide text-center transition-all duration-300 ${
          item.active
            ? telemetryColors[item.color as keyof typeof telemetryColors]
            : "border-border/20 bg-muted/20 text-muted-foreground/40"
        }`}
      >
        {item.label}
      </div>

    ))}

  </div>
  {/* Intelligent Event Console */}
  {/* <div className="flex-1 min-h-0 rounded-2xl border border-border/20 bg-card/60 p-3"> */}
  <div
  className="
    flex
    flex-col
    gap-2
    overflow-y-auto
    pr-1
    max-h-[260px]
    min-h-0
    scrollbar-thin
    scrollbar-thumb-cyan-500/20
    scrollbar-track-transparent
  "
>

    <div className="mb-3 flex items-center gap-2">
      <AlertCircle className="size-4 text-yellow-400" />
      <div className="text-xs font-semibold uppercase tracking-wider">
        Intelligent Event Console
      </div>
    </div>

    {/* Event Logs Here */}
    <div className="flex h-full flex-col gap-2 overflow-y-auto pr-1">

  {eventLogs.map((log, index) => (

    <div
      key={index}
      className={`rounded-xl border p-1 text-xs ${
        eventColors[log.type as keyof typeof eventColors]
      }`}
    >

      <div className="mb-1 flex items-center justify-between">

        <span className="font-semibold uppercase tracking-wide">
          {log.type}
        </span>

        <span className="text-[9px] opacity-70">
          {log.time}
        </span>

      </div>

      <div className="text-[11px]">
        {log.message}
      </div>

    </div>

  ))}

</div>

  </div>

</div>

  
          </div>
          </div>

          
        </div>
      </div>
      
    </div>
    <TestPanel
  telemetryData={telemetryData}
  simulateTelemetry={simulateTelemetry}
  testMode={globalTestMode}
  setTestMode={setGlobalTestMode}
  setParkingAssistActive={setParkingAssistActive}
  resetTelemetry={resetTelemetry}
  
/>
    </>
  );
}