import { useState } from "react";
import { CheckCircle, AlertTriangle, X,LucideIcon,Activity,

  Coffee,
  User, } from "lucide-react";


// const ALERT_STYLES = {
//   green: {
//     wrap: "bg-green-500/10 border-green-500/20",
//     icon: "text-green-500",
//     badge: "bg-green-500/20 text-green-600 dark:text-green-400",
//   },
//   amber: {
//     wrap: "bg-amber-500/10 border-amber-400/25",
//     icon: "text-amber-400",
//     badge: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
//   },
//   red: {
//     wrap: "bg-red-500/10 border-red-500/20",
//     icon: "text-red-500",
//     badge: "bg-red-500/20 text-red-600 dark:text-red-400",
//   },
// };

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
  // const [alerts, setAlerts] = useState([
  //   {
  //     id: 1,
  //     icon: CheckCircle,
  //     title: "AI Assistant Active",
  //     message: "All systems operational",
  //     badge: "OK",
  //     color: "green" as const,
  //   },
  //   {
  //     id: 2,
  //     icon: AlertTriangle,
  //     title: "Rest Suggestion",
  //     message: "Consider a break in 45 min",
  //     badge: "Warn",
  //     color: "amber" as const,
  //   },
  //   {
  //     id: 3,
  //     icon: AlertTriangle,
  //     title: "Blind Spot Detected",
  //     message: "Vehicle on left rear",
  //     badge: "Alert",
  //     color: "red" as const,
  //   },
  // ]);
  const INITIAL_ALERTS: AIAlert[] = [

  {
    id: "1",

    title: "AI Monitoring Active",

    message:
      "Driver telemetry operating normally.",

    priority: "monitoring",

    active: false,

    timestamp: "now",

    icon: Activity,
  },

  {
    id: "2",

    title: "Driver Profile Loaded",

    message:
      "Adaptive cockpit preferences restored.",

    priority: "info",

    active: false,

    timestamp: "2m",

    icon: User,
  },

  {
    id: "3",

    title: "Rest Recommendation",

    message:
      "Extended driving detected. Consider a short break.",

    priority: "recommendation",

    active: true,

    timestamp: "5m",

    icon: Coffee,
  },

  {
    id: "4",

    title: "Blind Spot Activity",

    message:
      "Vehicle detected in adjacent lane.",

    priority: "warning",

    active: true,

    timestamp: "now",

    icon: AlertTriangle,
  },

];
const [alerts, setAlerts] =
  useState<AIAlert[]>(
    INITIAL_ALERTS
  );
// const priorityStyles = {

//   critical:
//     "text-red-400",

//   warning:
//     "text-yellow-400",

//   info:
//     "text-blue-500 dark:text-emerald-400",

//   recommendation:
//     "text-purple-400",

//   monitoring:
//     "text-muted-foreground",

// };
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
const pushAlert = (
  newAlert: AIAlert
) => {

  setAlerts(prev => {

    const updated = [
      newAlert,
      ...prev,
    ];

    if (
      updated.length <= 4
    ) {

      return updated;

    }

    const inactiveIndex =
      updated.findIndex(
        alert =>
          !alert.active
      );

    if (
      inactiveIndex !== -1
    ) {

      updated.splice(
        inactiveIndex,
        1
      );

      return updated;
    }

    updated.pop();

    return updated;

  });

};

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

        {alerts.slice(0,4).map((alert) => {
          const Icon = alert.icon;
          
          const priorityColor =
  priorityStyles[
    alert.priority
  ];
          return (
            <div
              key={alert.id}
              // className={`flex items-center gap-2 rounded-xl border p-2 ${s.wrap}
              // `}
//               className={`
//   flex
//   items-center
//   gap-2

//   rounded-xl

//   border

//   p-2

//   transition-all
//   duration-300

//   ${
//     alert.active
//       ? `
//         opacity-100

//         bg-card/90

//         border-border/40

//         shadow-[0_0_18px_rgba(59,130,246,0.08)]
//         dark:shadow-[0_0_20px_rgba(16,185,129,0.08)]
//       `
//       : `
//         opacity-80

//         bg-card/40

//         border-border/10
//       `
//   }
// `}
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
    ? priorityStyles[
        alert.priority
      ].chip
    : `
        bg-muted/20

        text-muted-foreground
      `
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
