import { useState } from "react";
import { CheckCircle, AlertTriangle, X } from "lucide-react";

const ALERT_STYLES = {
  green: {
    wrap: "bg-green-500/10 border-green-500/20",
    icon: "text-green-500",
    badge: "bg-green-500/20 text-green-600 dark:text-green-400",
  },
  amber: {
    wrap: "bg-amber-500/10 border-amber-400/25",
    icon: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
  },
  red: {
    wrap: "bg-red-500/10 border-red-500/20",
    icon: "text-red-500",
    badge: "bg-red-500/20 text-red-600 dark:text-red-400",
  },
};

export default function AIAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      icon: CheckCircle,
      title: "AI Assistant Active",
      message: "All systems operational",
      badge: "OK",
      color: "green" as const,
    },
    {
      id: 2,
      icon: AlertTriangle,
      title: "Rest Suggestion",
      message: "Consider a break in 45 min",
      badge: "Warn",
      color: "amber" as const,
    },
    {
      id: 3,
      icon: AlertTriangle,
      title: "Blind Spot Detected",
      message: "Vehicle on left rear",
      badge: "Alert",
      color: "red" as const,
    },
  ]);

  return (
    <div className="flex-1 rounded-[28px] border border-border/30 bg-card/80 backdrop-blur-md shadow-sm p-4 flex flex-col gap-2 min-h-0">
      <div className="flex items-center justify-between shrink-0">
        <span className="text-[11px] font-semibold uppercase tracking-wider">AI Alerts</span>
        <span className="rounded-full border border-red-500/30 bg-red-500/15 px-2 py-0.5 text-[9px] font-bold text-red-500">
          {alerts.length}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 overflow-y-auto flex-1 min-h-0">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          const s = ALERT_STYLES[alert.color];
          return (
            <div
              key={alert.id}
              className={`flex items-center gap-2 rounded-xl border p-2 ${s.wrap}`}
            >
              <Icon className={`size-3.5 shrink-0 ${s.icon}`} />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold truncate">{alert.title}</div>
                <div className="text-[9px] text-muted-foreground truncate">{alert.message}</div>
              </div>
              <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[8px] font-bold uppercase ${s.badge}`}>
                {alert.badge}
              </span>
              <button
                onClick={() => setAlerts((prev) => prev.filter((a) => a.id !== alert.id))}
                className="shrink-0 rounded p-0.5 hover:bg-background/50 transition-colors"
                aria-label={`Dismiss ${alert.title}`}
              >
                <X className="size-3 text-muted-foreground" />
              </button>
            </div>
          );
        })}
        {alerts.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-[10px] text-muted-foreground/60">
            No active alerts
          </div>
        )}
      </div>
    </div>
  );
}
