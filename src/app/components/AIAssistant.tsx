import { Mic } from "lucide-react";
import { useAI } from "../../context/AIContext";

export default function AIAssistant() {
  const { isVoiceActive, setVoiceActive } = useAI();

  return (
    <button
      onClick={() => setVoiceActive(!isVoiceActive)}
      className="rounded-[28px] border border-border/30 bg-card/80 backdrop-blur-md shadow-sm p-4 flex items-center gap-4 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_4px_24px_rgba(6,182,212,0.12)] dark:hover:shadow-[0_4px_24px_rgba(16,185,129,0.12)]"
      aria-label={`AI Assistant — ${isVoiceActive ? "Listening" : "Ready"}`}
      aria-pressed={isVoiceActive}
    >
      {/* Mic button */}
      <div
        className={`relative size-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
          isVoiceActive
            ? "bg-primary text-primary-foreground shadow-[0_0_22px_rgba(6,182,212,0.45)] dark:shadow-[0_0_22px_rgba(16,185,129,0.45)]"
            : "bg-primary/10 text-primary"
        }`}
      >
        {isVoiceActive && (
          <span className="absolute inset-0 rounded-2xl bg-primary animate-ping opacity-25" />
        )}
        <Mic className="size-5 relative z-10" />
      </div>

      {/* Label */}
      <div className="flex flex-col gap-0.5 shrink-0">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-left">
          AI Assistant
        </div>
        <div className="text-[9px] text-muted-foreground text-left">
          {isVoiceActive ? "Listening…" : "Ready"}
        </div>
      </div>

      {/* Waveform */}
      <div className="flex-1 flex items-center justify-center gap-0.5 h-8 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className={`w-0.5 rounded-full transition-colors duration-300 ${
              isVoiceActive ? "bg-primary" : "bg-muted-foreground/25"
            }`}
            style={{
              height: "30%",
              animation: isVoiceActive ? `waveBar 0.9s ease-in-out infinite` : "none",
              animationDelay: `${i * 55}ms`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes waveBar {
          0%, 100% { height: 15%; }
          50%       { height: 90%; }
        }
      `}</style>
    </button>
  );
}
