import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, X, AlertTriangle } from "lucide-react";
import { useAI } from "../../context/AIContext";

export default function ParkingAssist() {
  const { 
    parkingAssistActive, 
    setParkingAssistActive,
    drowsiness,
    testEmergencyMode,
testCollisionWarning,
  } = useAI();
  
  const [laneSelection, setLaneSelection] = useState<"left" | "right" | null>(null);
  const [slowing, setSlowing] = useState(false);
  const [stopped, setStopped] = useState(false);



  // Animation sequence
  useEffect(() => {
    if (!parkingAssistActive) return;

    const slowingTimer = setTimeout(() => {
      setSlowing(false);
      setStopped(true);
    }, 2500);

    return () => clearTimeout(slowingTimer);
  }, [parkingAssistActive]);

  const handleClose = () => {
    setParkingAssistActive(false);
    setSlowing(false);
    setStopped(false);
    setLaneSelection(null);
  };

  const handleEmergency = () => {
    // Trigger emergency call
    console.log("Emergency call initiated");
  };

  useEffect(() => {

  if (
    testEmergencyMode ||
    testCollisionWarning
  ) {

    setParkingAssistActive(true);
  }

}, [
  testEmergencyMode,
  testCollisionWarning,
  setParkingAssistActive,
]);

  if (!parkingAssistActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-border/30 bg-card/95 backdrop-blur-md shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
        >
          {/* Header */}
          <div className="border-b border-border/20 bg-gradient-to-r from-red-500/10 to-orange-500/10 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-500/20">
                <AlertTriangle className="size-6 text-red-400" />
              </div>
              <div>
                <div className="text-lg font-semibold">Parking Assist Activated</div>
                <div className="text-sm text-muted-foreground">Driver fatigue detected - Automatic safety intervention</div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-muted/30 rounded-lg transition-colors text-muted-foreground"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Main Content */}
          <div className="p-8 space-y-8">
            {/* Road Visualization */}
            <div className="relative w-full h-48 rounded-2xl bg-gradient-to-b from-muted/30 to-muted/60 overflow-hidden border border-border/20">
              {/* Road */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Lane markings */}
                <div className="absolute w-full h-1 top-1/3 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
                <div className="absolute w-full h-1 top-2/3 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

                {/* Vehicle */}
                <motion.div
                  animate={{
                    x: laneSelection === "left" ? -60 : laneSelection === "right" ? 60 : 0,
                    y: slowing ? 20 : stopped ? 40 : 0,
                    opacity: slowing || stopped ? 1 : 0.9,
                  }}
                  transition={{ duration: 1.5, type: "spring" }}
                  className="relative w-16 h-32 bg-gradient-to-b from-primary/50 to-primary/30 rounded-2xl border-2 border-primary flex items-center justify-center"
                >
                  <div className="text-xs font-bold text-white">VEHICLE</div>
                </motion.div>

                {/* Status Text */}
                <motion.div
                  animate={{ opacity: [0.5, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute bottom-4 text-sm font-semibold text-yellow-400"
                >
                  {slowing ? "🚗 Slowing down..." : stopped ? "✓ Vehicle stopped" : "Moving to side lane"}
                </motion.div>
              </div>
            </div>

            {/* Lane Selection */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setLaneSelection("left")}
                className={`p-4 rounded-xl border-2 transition-all font-semibold uppercase tracking-wide ${
                  laneSelection === "left"
                    ? "border-primary bg-primary/15 text-primary shadow-[0_0_16px_rgba(6,182,212,0.2)]"
                    : "border-border/20 bg-muted/30 text-muted-foreground hover:border-primary/30"
                }`}
              >
                ← Left Lane
              </button>
              <button
                onClick={() => setLaneSelection("right")}
                className={`p-4 rounded-xl border-2 transition-all font-semibold uppercase tracking-wide ${
                  laneSelection === "right"
                    ? "border-primary bg-primary/15 text-primary shadow-[0_0_16px_rgba(6,182,212,0.2)]"
                    : "border-border/20 bg-muted/30 text-muted-foreground hover:border-primary/30"
                }`}
              >
                Right Lane →
              </button>
            </div>

            {/* Status Info */}
            <div className="rounded-xl border border-border/20 bg-muted/40 p-4 space-y-2">
              <div className="text-sm font-semibold text-foreground">Safety Status</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{drowsiness.duration}s</div>
                  <div className="text-xs text-muted-foreground mt-1">Fatigue Duration</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{drowsiness.count}</div>
                  <div className="text-xs text-muted-foreground mt-1">Detections</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">85%</div>
                  <div className="text-xs text-muted-foreground mt-1">Safety Ready</div>
                </div>
              </div>
            </div>

            {/* Emergency Button */}
            <motion.button
              onClick={handleEmergency}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold uppercase tracking-wider flex items-center justify-center gap-3 hover:shadow-[0_0_24px_rgba(239,68,68,0.4)] transition-all"
            >
              <Phone className="size-5" />
              Emergency SOS Call
            </motion.button>

            {/* Dismiss Button */}
            <button
              onClick={handleClose}
              className="w-full p-3 rounded-lg border border-border/20 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors text-sm font-medium"
            >
              Dismiss & Manual Control
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
