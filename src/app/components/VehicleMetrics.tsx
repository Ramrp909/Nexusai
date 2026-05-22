import { useAI } from "../../context/AIContext";

const FUEL_METRICS = [
  { label: "Consumption", value: "7.2", unit: "L/100km", pct: 45, bar: "bg-amber-400" },
  { label: "Fuel Level", value: "68", unit: "%", pct: 68, bar: "bg-green-500" },
  { label: "Range", value: "420", unit: "km", pct: 70, bar: "bg-primary" },
  { label: "Engine Temp", value: "87", unit: "°C", pct: 72, bar: "bg-amber-400" },
  { label: "RPM", value: "3200", unit: "rpm", pct: 40, bar: "bg-primary" },
];

const EV_METRICS = [
  { label: "Battery", value: "85", unit: "%", pct: 85, bar: "bg-green-500" },
  { label: "Consumption", value: "18.4", unit: "kWh/100km", pct: 38, bar: "bg-primary" },
  { label: "Range", value: "385", unit: "km", pct: 77, bar: "bg-green-500" },
  { label: "Motor Temp", value: "62", unit: "°C", pct: 52, bar: "bg-green-500" },
  { label: "Regen", value: "24", unit: "%", pct: 24, bar: "bg-primary" },
];

export default function VehicleMetrics() {
  const { vehicleMode, setVehicleMode } = useAI();
  const metrics = vehicleMode === "fuel" ? FUEL_METRICS : EV_METRICS;

  return (
    <div className="flex-1 rounded-[28px] border border-border/30 bg-card/80 backdrop-blur-md shadow-sm p-4 flex flex-col gap-2 min-h-0">
      <div className="flex items-center justify-between shrink-0">
        <span className="text-[11px] font-semibold uppercase tracking-wider">
          Vehicle Metrics
        </span>
        {/* Fuel/EV Toggle */}
        <div className="flex items-center gap-1 rounded-lg border border-border/30 bg-muted/30 p-0.5">
          <button
            onClick={() => setVehicleMode("fuel")}
            className={`px-2.5 py-1 rounded-md text-[9px] font-semibold uppercase tracking-wide transition-all ${
              vehicleMode === "fuel"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground/60 hover:text-muted-foreground"
            }`}
            aria-label="Switch to fuel mode"
          >
            Fuel
          </button>
          <button
            onClick={() => setVehicleMode("ev")}
            className={`px-2.5 py-1 rounded-md text-[9px] font-semibold uppercase tracking-wide transition-all ${
              vehicleMode === "ev"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground/60 hover:text-muted-foreground"
            }`}
            aria-label="Switch to EV mode"
          >
            EV
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-around flex-1 gap-1">
        {metrics.map((m, i) => (
          <div
            key={`${vehicleMode}-${i}`}
            className="flex items-center gap-3 transition-all duration-300"
            style={{
              animation: "fadeIn 300ms ease-out",
            }}
          >
            <div className="w-20 shrink-0 text-[9px] uppercase tracking-wide text-muted-foreground">
              {m.label}
            </div>
            <div className="flex-1 h-1.5 rounded-full bg-muted/40 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${m.bar}`}
                style={{ width: `${m.pct}%` }}
              />
            </div>
            <div
              className="w-20 text-right shrink-0 text-[10px] font-medium"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              {m.value}
              <span className="text-muted-foreground">{m.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
