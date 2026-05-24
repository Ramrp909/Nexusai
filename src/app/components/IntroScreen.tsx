import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Car } from "lucide-react";

interface IntroScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export default function IntroScreen({ onComplete, duration = 2000 }: IntroScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-background via-background to-primary/5 flex flex-col items-center justify-center select-none"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-primary/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full border border-secondary/10"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 22px rgba(6, 182, 212, 0.2)",
                "0 0 44px rgba(6, 182, 212, 0.4)",
                "0 0 22px rgba(6, 182, 212, 0.2)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="size-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl"
          >
            <Car className="size-10 text-white" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center space-y-2"
        >
          <div className="text-4xl font-bold tracking-tight">NEXUS AI</div>
          <div className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Smart Vehicle System
          </div>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="w-48 h-1 rounded-full bg-muted/30 overflow-hidden"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: duration / 1000, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
          />
        </motion.div>

        {/* Status Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xs uppercase tracking-wider text-muted-foreground text-center"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Initializing AI systems...
          </motion.span>
        </motion.div>
      </div>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={() => setIsVisible(false)}
        className="absolute bottom-8 right-8 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
      >
        Skip
      </motion.button>
    </motion.div>
  );
}
