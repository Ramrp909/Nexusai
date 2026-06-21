import { useState } from "react";
<<<<<<< HEAD
import { FlaskConical, X } from "lucide-react";
import { motion } from "framer-motion";

=======
import { FlaskConical, Import, X } from "lucide-react";
import { motion } from "framer-motion";


>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03
type TestPanelProps = {
  telemetryData: {
    eyeMovement: number;
    blinkRate: number;
    gazeStability: number;
    attentionScore: number;
    fps: number;
    latency: number;
    trackingConfidence: number;
  
  };

  simulateTelemetry: (
    data: Partial<TestPanelProps["telemetryData"]>
  ) => void;

  testMode: boolean;

  setTestMode: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  setParkingAssistActive: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  resetTelemetry: () => void;
};

import { useAI } from "../../context/AIContext";
<<<<<<< HEAD
=======
import { API_BASE } from "../../services/api";
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03

export default function TestPanel({
  telemetryData,
  simulateTelemetry,
  testMode,
  setTestMode,
  setParkingAssistActive,
  resetTelemetry,
}: TestPanelProps) {
    const [open, setOpen] = useState(false);
    const driverStates = [
  {
    label: "Focused",
    action: () =>
      simulateTelemetry({
        attentionScore: 95,
        blinkRate: 12,
        gazeStability: 92,
      }),
  },

  {
    label: "Distracted",
    action: () =>
      simulateTelemetry({
        attentionScore: 58,
        gazeStability: 50,
      }),
  },

  {
    label: "Drowsy",
    action: () =>
      simulateTelemetry({
        attentionScore: 30,
        blinkRate: 35,
      }),
  },

  {
    label: "Sleeping",
    action: () =>
      simulateTelemetry({
        attentionScore: 10,
        blinkRate: 2,
        trackingConfidence: 40,
      }),
  },
];

const trackingStates = [
  {
    label: "Tracking Lost",
    action: () =>
      simulateTelemetry({
        trackingConfidence: 15,
      }),
  },

  {
    label: "Low FPS",
    action: () =>
      simulateTelemetry({
        fps: 10,
        latency: 180,
      }),
  },

  {
    label: "Low Confidence",
    action: () =>
      simulateTelemetry({
        trackingConfidence: 42,
      }),
  },

  {
    label: "Tracking Stable",
    action: () =>
      simulateTelemetry({
        trackingConfidence: 97,
        fps: 30,
      }),
  },
];

const vehicleStates = [
  {
    label: "Parking Assist",
    action: () => {
      simulateTelemetry({
        attentionScore: 12,
      });

      setParkingAssistActive(true);
    },
  },

  {
    label: "Emergency Mode",
    action: () =>
      simulateTelemetry({
        attentionScore: 5,
        trackingConfidence: 20,
      }),
  },

  {
    label: "Collision Warning",
    action: () =>
      simulateTelemetry({
        latency: 200,
      }),
  },
];
const {setTestDriverProfile,setTestEmergencyMode,setTestCollisionWarning} = useAI();

const resetGlobalStates = () => {

  setTestDriverProfile("unknown");

  setTestEmergencyMode(false);

  setTestCollisionWarning(false);

  setParkingAssistActive(false);
};

const clearDriverProfiles =
  async () => {

    try {

      const response =
        await fetch(
<<<<<<< HEAD
          "http://127.0.0.1:8000/clear-drivers",
=======
          `${API_BASE}/clear-drivers`,
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      console.log(data);

      alert(
        "All saved driver profiles cleared"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to clear profiles"
      );
    }
};

const Section = ({
  title,
  items,
  color,
}: {
  title: string;

  items: {
    label: string;
    action: () => void;
  }[];

  color: string;
}) => (
  <div className="mb-4">

    <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
      {title}
    </div>

    <div className="grid grid-cols-2 gap-2">

      {items.map((item) => (

        <button
          key={item.label}
          onClick={item.action}
          className={`rounded-lg border px-2 py-2 text-[10px] font-semibold uppercase tracking-wide transition-all duration-200 ${color}`}
        >
          {item.label}
        </button>

      ))}

    </div>

  </div>
);
return (
  <>
    {!open && (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[999] flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-400 backdrop-blur-md transition-all hover:bg-cyan-500/20"
      >
        <FlaskConical className="size-4" />
        TEST PANEL
      </button>
    )}

    {open ? (
      <motion.div
        drag
  dragMomentum={false}
  dragElastic={0.08}
 className="fixed bottom-20 right-4 z-[999] max-h-[80vh] w-[320px] overflow-y-auto rounded-2xl border border-border/20 bg-card/95 p-4 shadow-2xl backdrop-blur-md">

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">

          <div className="text-sm font-semibold uppercase tracking-wider">
            AI Test Panel
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1 transition-colors hover:bg-muted/30"
          >
            <X className="size-4" />
          </button>

        </div>

        {/* Test Mode Toggle */}
        <button
          onClick={() => setTestMode(prev => !prev)}
          className={`mb-4 w-full rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-all ${
            testMode
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
              : "border-border/20 bg-muted/20 text-muted-foreground"
          }`}
        >
          {testMode ? "Test Mode Active" : "Backend Mode"}
        </button>

        {/* Driver States */}
        <Section
          title="Driver States"
          items={driverStates}
          color="border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
        />

        {/* Tracking States */}
        <Section
          title="Tracking States"
          items={trackingStates}
          color="border-cyan-500/20 bg-cyan-500/10 text-cyan-400"
        />

        {/* Vehicle States */}
        <Section
          title="Vehicle States"
          items={vehicleStates}
          color="border-red-500/20 bg-red-500/10 text-red-400"
        />

        <button
  onClick={resetTelemetry}
  className="mt-2 w-full rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-red-400"
>
  Reset Telemetry
</button>

<button
  onClick={
    clearDriverProfiles
  }
  className="
    px-4 py-2
    mt-2
    rounded-xl
    bg-red-500/20
    border border-red-500/30
    text-red-300
    text-sm
    hover:bg-red-500/30
    transition
  "
>
  Clear Driver Profiles
</button>

      </motion.div>
    ) : null}
  </>
);
}