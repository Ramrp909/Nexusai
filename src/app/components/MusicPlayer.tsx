import { useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, Shuffle, Repeat } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(65);
  const [progress, setProgress] = useState(42);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  return (
    <div className="rounded-2xl border border-border/30 bg-muted/20 p-3 space-y-2">
      {/* Track Info */}
      <div className="flex items-center gap-3">
        <div className="size-12 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center shrink-0">
          <span className="text-[10px] font-bold">🎵</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold truncate">Night Drive</div>
          <div className="text-[9px] text-muted-foreground truncate">Synthwave Radio</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full h-1 rounded-full bg-muted/40 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          aria-label="Track progress"
        />
        <div className="flex items-center justify-between text-[8px] text-muted-foreground">
          <span>2:15</span>
          <span>5:23</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShuffle(!shuffle)}
            className={`p-1 rounded transition-colors ${
              shuffle ? "text-primary" : "text-muted-foreground/50 hover:text-muted-foreground"
            }`}
            aria-label="Toggle shuffle"
          >
            <Shuffle className="size-3" />
          </button>
          <button
            onClick={() => setRepeat(!repeat)}
            className={`p-1 rounded transition-colors ${
              repeat ? "text-primary" : "text-muted-foreground/50 hover:text-muted-foreground"
            }`}
            aria-label="Toggle repeat"
          >
            <Repeat className="size-3" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Previous track"
          >
            <SkipBack className="size-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-all"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="size-3" /> : <Play className="size-3 ml-0.5" />}
          </button>
          <button
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Next track"
          >
            <SkipForward className="size-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <Volume2 className="size-3 text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-12 h-1 rounded-full bg-muted/40 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-1.5 [&::-webkit-slider-thumb]:h-1.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
