import { Camera, Eye, Target, Activity, Minus, Settings, ChevronRight, Maximize2 } from "lucide-react";
import { useAI } from "../../context/AIContext";
import MusicPlayer from "./MusicPlayer";
import {
  detectFace,
} from "../../services/driverMonitor";
import { useEffect,useRef } from "react";

// const STATUS_CARDS = [
//   {
//     label: "AI Scan",
//     icon: Target,
//     value: "Active",
//     color: "text-primary",
//   },
//   {
//     label: "Attention",
//     icon: Eye,
//     value: "95%",
//     color: "text-green-500",
//   },
//   {
//     label: "Faces",
//     icon: Camera,
//     value: "1",
//     color: "text-primary",
//   },
//   {
//     label: "Posture",
//     icon: Activity,
//     value: "Good",
//     color: "text-green-500",
//   },
// ];


export default function DriverMonitor() {
  const { isDriverMonitorMinimized, setDriverMonitorMinimized, openModal } = useAI();
  const videoRef =
  useRef<HTMLVideoElement>(null);

const canvasRef =
  useRef<HTMLCanvasElement>(null);
  const streamRef =
  useRef<MediaStream | null>(null);
  const {
  setAttentionScore,
  setAttentionStatus,
  setHeadDirection,
  setIsDrowsy,
  setLookingAway,
  attentionScore,
  attentionStatus,
  headDirection,
  isDrowsy,
  lookingAway,

} = useAI();


  const handleMoreClick = () => {
    openModal("telemetryPanel");
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

            setAttentionScore(
              result.attentionScore
            );

            setAttentionStatus(
              result.attentionStatus
            );

            setHeadDirection(
              result.headDirection
            );

            setIsDrowsy(
              result.isDrowsy
            );

            setLookingAway(
              result.lookingAway
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
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <Camera className="size-14 text-zinc-700" />
            <div className="absolute -inset-10 border-2 border-primary/50 rounded-lg">
              <div className="absolute -top-px -left-px size-3 border-t-2 border-l-2 border-primary rounded-tl" />
              <div className="absolute -top-px -right-px size-3 border-t-2 border-r-2 border-primary rounded-tr" />
              <div className="absolute -bottom-px -left-px size-3 border-b-2 border-l-2 border-primary rounded-bl" />
              <div className="absolute -bottom-px -right-px size-3 border-b-2 border-r-2 border-primary rounded-br" />
            </div>
          </div>
        </div> */}
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
            <div key={i} className="rounded-xl border border-border/30 bg-muted/40 p-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className={`size-3 ${c.color}`} />
                <span className="text-[9px] uppercase tracking-wide text-muted-foreground">
                  {c.label}
                </span>
              </div>
              <div className={`text-sm font-semibold ${c.color}`}>{c.value}</div>
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
