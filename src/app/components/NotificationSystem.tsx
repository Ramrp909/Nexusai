import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, AlertCircle, CheckCircle, Info, X } from "lucide-react";

export interface Notification {
  id: string;
  type: "danger" | "warning" | "safe" | "info";
  title: string;
  message: string;
  duration?: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export default function NotificationSystem({
  notifications,
  onDismiss,
}: NotificationSystemProps) {
  const getNotificationStyles = (type: Notification["type"]) => {
    const baseStyles = "backdrop-blur-xl rounded-2xl border shadow-2xl";
    
    switch (type) {
      case "danger":
        return {
          bg: `${baseStyles} bg-red-50/95 dark:bg-red-950/30 border-red-200/50 dark:border-red-900/50`,
          text: "text-red-900 dark:text-red-100",
          title: "font-semibold text-red-900 dark:text-red-200",
          icon: AlertCircle,
          iconColor: "text-red-600 dark:text-red-400",
          progressColor: "bg-red-500/50",
        };
      case "warning":
        return {
          bg: `${baseStyles} bg-amber-50/95 dark:bg-amber-950/30 border-amber-200/50 dark:border-amber-900/50`,
          text: "text-amber-900 dark:text-amber-100",
          title: "font-semibold text-amber-900 dark:text-amber-200",
          icon: AlertTriangle,
          iconColor: "text-amber-600 dark:text-amber-400",
          progressColor: "bg-amber-500/50",
        };
      case "safe":
        return {
          bg: `${baseStyles} bg-green-50/95 dark:bg-green-950/30 border-green-200/50 dark:border-green-900/50`,
          text: "text-green-900 dark:text-green-100",
          title: "font-semibold text-green-900 dark:text-green-200",
          icon: CheckCircle,
          iconColor: "text-green-600 dark:text-green-400",
          progressColor: "bg-green-500/50",
        };
      case "info":
        return {
          bg: `${baseStyles} bg-blue-50/95 dark:bg-blue-950/30 border-blue-200/50 dark:border-blue-900/50`,
          text: "text-blue-900 dark:text-blue-100",
          title: "font-semibold text-blue-900 dark:text-blue-200",
          icon: Info,
          iconColor: "text-blue-600 dark:text-blue-400",
          progressColor: "bg-blue-500/50",
        };
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 max-w-md pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => {
          const styles = getNotificationStyles(notification.type);
          const Icon = styles.icon;

          return (
            <motion.div
              key={notification.id}
              layout
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                exit: { duration: 0.2 },
              }}
              className={`${styles.bg} ${styles.text} p-4 pointer-events-auto`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon className={`w-5 h-5 ${styles.iconColor}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className={`${styles.title} mb-0.5`}>
                    {notification.title}
                  </h4>
                  <p className="text-sm opacity-90">{notification.message}</p>
                </div>

                <button
                  onClick={() => onDismiss(notification.id)}
                  className="flex-shrink-0 p-1.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors duration-200"
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Auto-dismiss progress bar */}
              {notification.duration && (
                <motion.div
                  className={`mt-3 h-1 ${styles.progressColor} rounded-full overflow-hidden`}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{
                    duration: notification.duration / 1000,
                    ease: "linear",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// Hook to manage notifications
// export function useNotifications() {
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   const addNotification = (notification: Omit<Notification, "id">) => {
//     const id = Math.random().toString(36).substring(7);
//     const newNotification = { ...notification, id };

//     setNotifications((prev) => [...prev, newNotification]);

//     if (notification.duration) {
//       setTimeout(() => {
//         dismissNotification(id);
//       }, notification.duration);
//     }
//   };

//   const dismissNotification = (id: string) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

//   return {
//     notifications,
//     addNotification,
//     dismissNotification,
//   };
// }

// Demo notification examples (can be triggered from anywhere in the app)
export const demoNotifications = {
  drowsinessDetected: {
    type: "danger" as const,
    title: "Drowsiness Detected",
    message: "Please pull over and take a break. Your safety is our priority.",
    duration: 8000,
  },
  distractionWarning: {
    type: "warning" as const,
    title: "Driver Distraction Detected",
    message: "Please focus on the road ahead.",
    duration: 5000,
  },
  collisionWarning: {
    type: "danger" as const,
    title: "Collision Warning",
    message: "Obstacle detected ahead. Reduce speed immediately.",
    duration: 6000,
  },
  fatigueAlert: {
    type: "warning" as const,
    title: "Fatigue Alert",
    message: "Consider taking a 15-minute break soon.",
    duration: 5000,
  },
  safeDriving: {
    type: "safe" as const,
    title: "Safe Driving",
    message: "You're doing great! Keep up the excellent driving.",
    duration: 4000,
  },
  aiRecommendation: {
    type: "info" as const,
    title: "AI Recommendation",
    message: "Traffic ahead. Alternate route suggested.",
    duration: 5000,
  },
};