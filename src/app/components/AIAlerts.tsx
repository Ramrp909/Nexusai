import { useState,useEffect } from "react";
import { CheckCircle, AlertTriangle, X,LucideIcon,Activity,

  Coffee,
  User, } from "lucide-react";

import { useAI } from "../../context/AIContext";

type AlertPriority =
  | "critical"
  | "warning"
  | "info"
  | "recommendation"
  | "monitoring";

interface AIAlert {

  id: string;

  title: string;

  message: string;

  priority: AlertPriority;

  active: boolean;

  timestamp: string;

  icon: LucideIcon;

}

export default function AIAlerts() {

  const {
  backendEvents,
  testCollisionWarning,
testEmergencyMode,
testDriverProfile,
} = useAI();

const priorityStyles = {

  critical: {

    text:
      "text-red-400",

    surface: `
      bg-red-500/10

      border-red-500/15
    `,

    chip: `
      bg-red-500/15

      text-red-400
    `,
  },

  warning: {

    text:
      "text-yellow-400",

    surface: `
      bg-yellow-500/10

      border-yellow-500/15
    `,

    chip: `
      bg-yellow-500/15

      text-yellow-400
    `,
  },

  info: {

    text:
      "text-blue-500 dark:text-emerald-400",

    surface: `
      bg-blue-500/10
      dark:bg-emerald-400/10

      border-blue-500/15
      dark:border-emerald-400/15
    `,

    chip: `
      bg-blue-500/15
      dark:bg-emerald-400/15

      text-blue-500
      dark:text-emerald-400
    `,
  },

  recommendation: {

    text:
      "text-purple-400",

    surface: `
      bg-purple-500/10

      border-purple-500/15
    `,

    chip: `
      bg-purple-500/15

      text-purple-400
    `,
  },

  monitoring: {

    text:
      "text-muted-foreground",

    surface: `
      bg-card/50

      border-border/15
    `,

    chip: `
      bg-muted/20

      text-muted-foreground
    `,
  },

};

const alerts: AIAlert[] =
  backendEvents.map(

    (
      event,
      index
    ) => ({

      id: String(index),

      title: event.type,

      message:

        event.severity ===
        "critical"

          ? "Immediate driver intervention required."

        : event.severity ===
          "warning"

          ? "Driver attention monitoring active."

        : event.severity ===
          "info"

          ? "Behavioral telemetry update."

        : "Vehicle AI operating normally.",

      priority:

        event.severity ===
        "critical"

          ? "critical"

        : event.severity ===
          "warning"

          ? "warning"

        : event.severity ===
          "info"

          ? "info"

        : "monitoring",

      active:
        event.severity !==
        "monitoring",

      timestamp: "now",

      icon:

        event.severity ===
        "critical"

          ? AlertTriangle

        : event.severity ===
          "warning"

          ? AlertTriangle

        : CheckCircle,
    })
  );

  const simulatedAlerts: AIAlert[] = [];
  if (testCollisionWarning) {

  simulatedAlerts.push({
    id: "collision-warning",
    title: "Collision Warning",
    message: "Potential frontal obstacle detected.",
    priority: "critical",
    active: true,
    timestamp: "now",
    icon: AlertTriangle,
  });
}
if (testEmergencyMode) {

  simulatedAlerts.push({
    id: "emergency-mode",
    title: "Emergency Mode",
    message: "Emergency intervention activated.",
    priority: "critical",
    active: true,
    timestamp: "now",
    icon: AlertTriangle,
  });
}
if (testDriverProfile === "known") {

  simulatedAlerts.push({
    id: "known-driver",
    title: "Driver Profile Loaded",
    message: "Welcome back Ramprasad.",
    priority: "info",
    active: true,
    timestamp: "now",
    icon: User,
  });
}




  return (
    <div className="flex-1 rounded-[28px] border border-border/30 bg-card/80 backdrop-blur-md shadow-sm p-2.5 flex flex-col gap-1 min-h-0 hover:border-primary/30 hover:shadow-[0_4px_24px_rgba(6,182,212,0.12)] dark:hover:shadow-[0_4px_24px_rgba(16,185,129,0.12)]">
      <div className="flex items-center justify-between shrink-0">
        
        <span className="text-[11px] font-semibold uppercase tracking-wider">AI Alerts</span>
        <span className="rounded-full border border-red-500/30 bg-red-500/15 px-2 py-0.5 text-[9px] font-bold text-red-500">
          {alerts.length}
        </span>
      </div>
      {/* <div className="flex flex-col gap-1.5 overflow-y-auto flex-1 min-h-0"> */}
        <div className="
  grid
  grid-cols-2

  gap-3

  overflow-y-auto

  pr-1

  flex-1
">

        {[...simulatedAlerts, ...alerts].slice(0,4).map((alert) => {
          const Icon = alert.icon;
          
          const priorityColor =
  priorityStyles[
    alert.priority
  ];
          return (
            <div
              key={alert.id}
className={`
  flex
  items-center
  gap-2

  rounded-xl

  border

  p-2

  transition-all
  duration-300

  ${
    priorityStyles[
      alert.priority
    ].surface
  }


${
  alert.active
    ? "opacity-100"
    : "opacity-80"
}
`}
            >
              {/* <Icon className={`size-3.5 shrink-0 ${s.icon}`} /> */}
              <Icon
  className={`
    size-3.5

    shrink-0

    ${
  priorityStyles[
    alert.priority
  ].text
}
  `}
/>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold truncate">{alert.title}</div>
                <div className="text-[9px] text-muted-foreground truncate">{alert.message}</div>
              </div>
              {/* <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[8px] font-bold uppercase ${s.badge}`}>
                {alert.badge}
              </span> */}
              <div
  className={`
    shrink-0

    rounded-md

    px-1.5
    py-0.5

    text-[8px]
    font-bold
    uppercase

    ${
      alert.active
        ? `
          bg-blue-500/15
          dark:bg-emerald-400/15

          text-blue-500
          dark:text-emerald-400
        `
        : `
          bg-muted/20

          text-muted-foreground
        `
    }
  `}
>

  {alert.active
    ? "ACTIVE"
    : "MONITOR"}

</div>
              <button
                // onClick={() => setAlerts((prev) => prev.filter((a) => a.id !== alert.id))}
                onClick={()=>{}}
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
