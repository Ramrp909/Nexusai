import { Camera, Eye, Target, Activity, Minus, Settings, ChevronRight, Maximize2 } from "lucide-react";
import { useAI } from "../../context/AIContext";
import MusicPlayer from "./MusicPlayer";
import {
  detectFace,
} from "../../services/driverMonitor";
import { useEffect,useRef } from "react";
import {
  demoNotifications,
} from "../components/NotificationSystem";



export default function DriverMonitor() {
  const { isDriverMonitorMinimized, setDriverMonitorMinimized, openModal } = useAI();
  const videoRef =
  useRef<HTMLVideoElement>(null);

const canvasRef =
  useRef<HTMLCanvasElement>(null);
  const streamRef =
  useRef<MediaStream | null>(null);

  const drowsyTimeoutRef =
  useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const {
  setAttentionScore,
  setAttentionStatus,
  setBlinkRate,
  blinkRate,
  setHeadDirection,
  setIsDrowsy,
  setLookingAway,
  attentionScore,
  gazeStability,
  setGazeStability,
  attentionStatus,
  headDirection,
  isDrowsy,
  lookingAway,
    addNotification,
    setShowDangerAlert,
    modals,closeModal,
    setVisionTelemetry,
setVehicleTelemetry,
setBackendEvents,
setDriverFrame,
canTriggerAlert,
playAlertSound,
speak,
setParkingAssistActive
} = useAI();

const previousDrowsyRef =
  useRef(false);

const previousLookingAwayRef =
  useRef(false);

const previousAttentionRef =
  useRef("");
const appReadyRef =
  useRef(false);

  const handleMoreClick = () => {

  if (
    modals.telemetryPanel
  ) {

    closeModal(
      "telemetryPanel"
    );

  } else {

    openModal(
      "telemetryPanel"
    );

  }

};

const liveStatusCards = [

  {
    label: "AI Status",
    icon: Target,

    value:
      attentionStatus === "Focused"
        ? "Active"
        : attentionStatus,

    color:
      attentionStatus === "Focused"
        ? "text-emerald-400"
        : attentionStatus === "Distracted"
        ? "text-yellow-400"
        : "text-red-400",
  },

  {
    label: "Attention",
    icon: Eye,

    value: `${attentionScore}%`,

    color:
      attentionScore > 80
        ? "text-emerald-400"
        : attentionScore > 50
        ? "text-yellow-400"
        : "text-red-400",
  },
  {
    label: "Driver State",
    icon: Activity,

    value:
      isDrowsy
        ? "Drowsy"
        : lookingAway
        ? "Distracted"
        : "Normal",

    color:
      isDrowsy
        ? "text-red-400"
        : lookingAway
        ? "text-yellow-400"
        : "text-emerald-400",
  },

  {
    label: "Head Pose",
    icon: Camera,

    value: headDirection,

    color:
      headDirection === "Center"
        ? "text-emerald-400"
        : "text-yellow-400",
  },

  

];
  const displayCards = liveStatusCards.slice(0, 3);
  const moreCard = {
    label: "More",
    icon: ChevronRight,
    value: `+${liveStatusCards.length - 3}`,
    color: "text-primary",
  };

  const initializedRef =
  useRef(false);
useEffect(() => {

  const timer =
    setTimeout(() => {

      appReadyRef.current =
        true;

    }, 3000);

  return () =>
    clearTimeout(timer);

}, []);

  useEffect(() => {

  async function startWebcam() {

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });
      streamRef.current =
        stream;
      if (videoRef.current) {
        videoRef.current.srcObject =
          stream;
      }

    } catch (error) {
      console.error(
        "Webcam access failed",
        error
      );
    }
  }
    startWebcam();
  return () => {
    if (streamRef.current) {
      streamRef.current = null;
    }
  };

}, [isDriverMonitorMinimized]);

useEffect(() => {
  const interval =
    setInterval(async () => {
      if (
  !videoRef.current ||
  !canvasRef.current
) return;

const video =
  videoRef.current;

if (
  video.readyState < 2 ||
  !video.videoWidth ||
  !video.videoHeight
) return;
      const canvas =
        canvasRef.current;
      const ctx =
        canvas.getContext("2d");
      if (!ctx) return;
      canvas.width =
        video.videoWidth;
      canvas.height =
        video.videoHeight;
      ctx.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
      );

      canvas.toBlob(
        async (blob) => {
          if (!blob) return;
          setDriverFrame(blob);
          const file =
            new File(
              [blob],
              "frame.jpg",
              {
                type: "image/jpeg",
              }
            );

          try {
            const result =
              await detectFace(file);

            const driver =
                  result.driver;

                const vision =
                  result.vision;

                const vehicle =
                  result.vehicle;

                const events =
                  result.events;

           setAttentionScore(
  driver.attentionScore
);

setBlinkRate(driver.blinkRate);
setGazeStability(driver.gazeStability);

setAttentionStatus(
  driver.attentionStatus
);

setHeadDirection(
  driver.headDirection
);

setIsDrowsy(
  driver.isDrowsy
);

setLookingAway(
  driver.lookingAway
);
setVisionTelemetry(
  vision
);

setVehicleTelemetry(
  vehicle
);

setBackendEvents(
  events
);
          } catch (error) {

            console.error(
              "Driver monitor error",
              error
            );

          }

        },
        "image/jpeg",
        0.7
      );

    }, 1500);

  return () =>
    clearInterval(interval);

}, []);

useEffect(() => {

  /* Drowsiness */

  if (
    isDrowsy &&
    !previousDrowsyRef.current &&
    canTriggerAlert(
      "drowsy-alert",
      12000
    )
  ) {

    addNotification({
      ...demoNotifications
        .drowsinessDetected,
    });

    playAlertSound(
      "warning"
    );

    speak(
      "Drowsiness detected",
      "critical"
    );
  }

  previousDrowsyRef.current =
    isDrowsy;

  /* Driver Distraction */

  if (
    lookingAway &&
    !previousLookingAwayRef.current &&
    canTriggerAlert(
      "distraction-alert",
      8000
    )
  ) {

    addNotification({
      ...demoNotifications
        .distractionWarning,
    });

    playAlertSound(
      "warning"
    );
  }

  previousLookingAwayRef.current =
    lookingAway;

  /* Attention Recovery */

  if (
    attentionStatus ===
      "Focused" &&
    previousAttentionRef.current ===
      "Distracted"
  ) {

    addNotification({
      ...demoNotifications
        .safeDriving,
    });

    if (
      canTriggerAlert(
        "safe-driving",
        10000
      )
    ) {

      playAlertSound(
        "success"
      );
    }
  }

  previousAttentionRef.current =
    attentionStatus;

}, [
  isDrowsy,
  lookingAway,
  attentionStatus,
]);

useEffect(() => {
    if (
  !initializedRef.current ||
  !appReadyRef.current
) {

    initializedRef.current =
      true;

    return;
  }

  /* DRIVER RECOVERED */

  if (!isDrowsy) {

    if (
      drowsyTimeoutRef.current
    ) {

      clearTimeout(
        drowsyTimeoutRef.current
      );

      drowsyTimeoutRef.current =
        null;
    }

    return;
  }

  /* STAGE 1
     DROWSINESS WARNING
  */

  if (
    canTriggerAlert(
      "drowsy-warning",
      10000
    )
  ) {

    addNotification({
      ...demoNotifications
        .drowsinessDetected,
    });

    playAlertSound(
      "warning"
    );
  }

  /* STAGE 2
     EMERGENCY OVERLAY
  */

  if (
    !drowsyTimeoutRef.current
  ) {

    drowsyTimeoutRef.current =
      setTimeout(() => {

        if (!isDrowsy)
          return;

        setShowDangerAlert(
          true
        );

        playAlertSound(
          "critical"
        );

        speak(
          "Critical fatigue detected",
          "critical"
        );

        /* HIDE OVERLAY */

        setTimeout(() => {

          setShowDangerAlert(
            false
          );

        }, 5000);

        /* STAGE 3
           PARKING ASSIST
        */

        setTimeout(() => {

          if (!isDrowsy)
            return;

          setParkingAssistActive(
            true
          );

          playAlertSound(
            "critical"
          );

          speak(
            "Emergency mode detected. Parking assist activated for safety.",
            "critical"
          );

          /* KEEP PA OPEN */

          setTimeout(() => {

            setParkingAssistActive(
              false
            );

          }, 3000);

        }, 5000);

        drowsyTimeoutRef.current =
          null;

      }, 5000);
  }

}, [isDrowsy]);

  if (isDriverMonitorMinimized) {
    return (
      <div className="rounded-[32px] border border-border/30 bg-card/80 backdrop-blur-md shadow-sm p-4 flex flex-col gap-3 overflow-hidden min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between shrink-0">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider">
              Driver Monitoring
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
              </span>
              <span className="text-[9px] font-medium text-green-500">
                Active (Minimized)
              </span>
            </div>
          </div>
          <button
            onClick={() => setDriverMonitorMinimized(false)}
            className="rounded-lg p-1.5 hover:bg-accent transition-colors text-muted-foreground"
            aria-label="Maximize driver monitor"
          >
            <Maximize2 className="size-3.5" />
          </button>
        </div>

        {/* Status cards grid (2x2 compact) */}
        <div className="grid grid-cols-2 gap-2 shrink-0">
          {[...displayCards, moreCard].map((c, i) => {
            const Icon = c.icon;
            const isMore = i === 3;
            return (
              <button
                key={i}
                onClick={isMore ? handleMoreClick : undefined}
                className={`rounded-xl border border-border/30 bg-muted/40 p-2.5 text-left transition-all ${
                  isMore ? "hover:bg-primary/10 hover:border-primary/30 cursor-pointer" : ""
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className={`size-3 ${c.color}`} />
                  <span className="text-[9px] uppercase tracking-wide text-muted-foreground">
                    {c.label}
                  </span>
                </div>
                <div className={`text-sm font-semibold ${c.color}`}>{c.value}</div>
              </button>
            );
          })}
        </div>

        {/* Music Player */}
        <MusicPlayer />
        {/* Hidden AI Processing Elements */}

<video
  ref={videoRef}
  autoPlay
  playsInline
  muted
  className="hidden"
/>

<canvas
  ref={canvasRef}
  className="hidden"
/>
      </div>
    );
  }

  return (
    <div className="rounded-[32px] border border-border/30 bg-card/80 backdrop-blur-md shadow-sm p-4 flex flex-col gap-3 overflow-hidden min-h-0 hover:border-primary/30 hover:shadow-[0_4px_24px_rgba(6,182,212,0.12)] dark:hover:shadow-[0_4px_24px_rgba(16,185,129,0.12)]">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider">
            Driver Monitoring
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
            </span>
            <span className="text-[9px] font-medium text-green-500">Active</span>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setDriverMonitorMinimized(true)}
            className="rounded-lg p-1.5 hover:bg-accent transition-colors text-muted-foreground"
            aria-label="Minimize driver monitor"
          >
            <Minus className="size-3.5" />
          </button>
          <button
            className="rounded-lg p-1.5 hover:bg-accent transition-colors text-muted-foreground"
            aria-label="Driver monitor settings"
          >
            <Settings className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Camera feed */}
      <div className="relative flex-1 min-h-0 overflow-hidden rounded-2xl bg-zinc-950 border border-border/20">
        {/* Detection frame */}
        <div className="absolute inset-0 flex items-center justify-center">
        <Camera className="size-14 text-zinc-700" />
        {/* Live Webcam Feed */}
<video
  ref={videoRef}
  autoPlay
  playsInline
  muted

  className="
    absolute inset-0

    w-full
    h-full

    object-cover
  "
/>

{/* AI Overlay Layer */}
<div className="
  absolute inset-0

  pointer-events-none
">
  <div className="
  absolute
  top-3
  left-3

  flex
  flex-wrap
  gap-2
">

  {/* Attention Status */}
  <div className={`
    px-3
    py-1.5

    rounded-full

    text-[10px]
    uppercase
    tracking-wide

    backdrop-blur-md

    border

    ${
      attentionStatus === "Focused"
        ? `
          bg-emerald-400/15
          text-emerald-300
          border-emerald-400/20
        `
        : attentionStatus === "Distracted"
        ? `
          bg-yellow-400/15
          text-yellow-300
          border-yellow-400/20
        `
        : `
          bg-red-400/15
          text-red-300
          border-red-400/20
        `
    }
  `}>

    {attentionStatus}

  </div>

  {/* Head Direction */}
  <div className="
    px-3
    py-1.5

    rounded-full

    text-[10px]
    uppercase
    tracking-wide

    backdrop-blur-md

    border border-white/10

    bg-black/30

    text-white/80
  ">

    {headDirection}

  </div>

  {/* Attention Score */}
  <div className="
    px-3
    py-1.5

    rounded-full

    text-[10px]
    uppercase
    tracking-wide

    backdrop-blur-md

    border border-white/10

    bg-black/30

    text-white/80
  ">

    {attentionScore}%

  </div>

</div>

  {/* Future:
      YOLO boxes
      face mesh
      telemetry overlays
  */}

</div>

{/* Hidden Processing Canvas */}
<canvas
  ref={canvasRef}
  className="hidden"
/>
</div>
        {/* Recording dot */}
        <div className="absolute top-2.5 right-3 flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] text-white/60 font-medium">REC</span>
        </div>
        {/* Drowsiness bar */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-1.5 rounded-lg bg-green-500/20 border border-green-500/30 px-2 py-1">
          <Eye className="size-3 text-green-400 shrink-0" />
          <span className="text-[9px] text-green-400 font-medium">Attention Optimal</span>
        </div>
      </div>

      {/* Status cards with MORE card */}
      <div className="grid grid-cols-2 gap-2 shrink-0">
        {displayCards.map((c, i) => {
          const Icon = c.icon;
          return (
            // <div key={i} className="rounded-xl border border-border/30 bg-muted/40 p-2.5">
              
            //   <div className="flex items-center gap-1.5 mb-1">
            //     <Icon className={`size-3 ${c.color}`} />
            //     <span className="text-[9px] uppercase tracking-wide text-muted-foreground">
            //       {c.label}
            //     </span>
            //   </div>
            //   <div className={`text-sm font-semibold ${c.color}`}>{c.value}</div>
            // </div>
            <div
  key={i}
  className="
    relative

    flex
    items-center
    gap-2

    rounded-xl

    border
    border-border/30

    bg-muted/40

    px-3
    py-2

    overflow-hidden
  "
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
        c.color.includes("green")
          ? "bg-green-400"

          : c.color.includes("red")
          ? "bg-red-400"

          : c.color.includes("yellow")
          ? "bg-yellow-400"

          : "bg-blue-500 dark:bg-emerald-400"
      }
    `}
  />

  {/* Icon */}
  <Icon
    className={`
      size-3.5

      shrink-0

      ${c.color}
    `}
  />

  {/* Content */}
  <div className="
    min-w-0
    flex-1
  ">

    {/* Label */}
    <div className="
      text-[9px]

      uppercase
      tracking-wide

      text-muted-foreground
    ">
      {c.label}
    </div>

    {/* Value */}
    <div
      className={`
        text-sm
        font-semibold

        truncate

        ${c.color}
      `}
    >

      {c.value}

    </div>

  </div>

</div>
          );
        })}
        {/* MORE Card */}
        <button
          onClick={handleMoreClick}
          className="rounded-xl border border-border/30 bg-muted/40 p-2.5 hover:bg-primary/10 hover:border-primary/30 transition-all"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <ChevronRight className="size-3 text-primary" />
            <span className="text-[9px] uppercase tracking-wide text-muted-foreground">More</span>
          </div>
          <div className="text-sm font-semibold text-primary">View All</div>
        </button>
      </div>
      {/* Hidden AI Processing Elements */}


    </div>
  );
}
