import { useState, useEffect } from "react";
import { Bell, User, Sun, Moon, Cloud, Car, Settings, Home, LayoutDashboard, Bot } from "lucide-react";
import { AIContextProvider, useAI } from "../context/AIContext";
import NotificationSystem from "./components/NotificationSystem";
import {
  motion,
  AnimatePresence,
} from "motion/react";
import emergencyOverlay from "./emergencyOverlay";

// Components
import DriverMonitor from "./components/DriverMonitor";
import VehicleStatus from "./components/VehicleStatus";
import VehicleMetrics from "./components/VehicleMetrics";
import AINavigationCenter from "./components/AINavigationCenter";
import AIAlerts from "./components/AIAlerts";
import VehicleControls from "./components/VehicleControls";
import AIAssistant from "./components/AIAssistant";
import TelemetryPanel from "./components/TelemetryPanel";
import AIVisionLab from "./components/AIVisionLab";
import DriverProfile from "./components/DriverProfile";
import EmergencyOverlay from "./emergencyOverlay";
import IntroScreen from "./components/IntroScreen";
import ParkingAssist from "./components/ParkingAssist";

const NAV_ITEMS = [
  { icon: Home, label: "Home", action: "home" },
  { icon: LayoutDashboard, label: "Dash", action: "dash" },
  { icon: Bot, label: "AI Lab", action: "aiLab" },
  { icon: Settings, label: "Config", action: "config" },
  { icon: User, label: "Profile", action: "profile" },
];

function AppContent() {
  const { isDark, setIsDark, openModal } = useAI();
  const [activeNav, setActiveNav] = useState(1);
  const [showIntro, setShowIntro] = useState(true);
  const {
    notifications,
    dismissNotification,
    showDangerAlert,
  } = useAI();
  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleNavClick = (index: number, action: string) => {
    setActiveNav(index);
    if (action === "aiLab") {
      openModal("aiVisionLab");
    } else if (action === "profile") {
      openModal("driverProfile");
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground flex flex-col select-none">
      {/* Intro Screen */}
      <AnimatePresence>
        {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* ── HEADER ── */}
      <header className="h-16 shrink-0 border-b border-border/30 bg-background/80 backdrop-blur-md flex items-center justify-between px-6 gap-4 z-20">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_22px_rgba(6,182,212,0.3)] dark:shadow-[0_0_22px_rgba(16,185,129,0.3)]">
            <Car className="size-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight leading-none">NEXUS AI</div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
              Smart Vehicle System
            </div>
          </div>
        </div>

        {/* Center status pill */}
        <div className="flex items-center gap-2.5 rounded-full border border-border/40 bg-muted/40 px-5 py-1.5 backdrop-blur-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          <span className="text-sm font-medium">Tesla Model S</span>
          <span className="hidden lg:inline text-xs text-muted-foreground">
            · Autonomous Mode
          </span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1.5 rounded-xl border border-border/30 bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
            <Cloud className="size-3.5" />
            <span>24°C · Sunny</span>
          </div>
          <button
            className="relative rounded-xl p-2 hover:bg-accent transition-colors"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-red-500" />
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="rounded-xl p-2 hover:bg-accent transition-all duration-300"
            aria-label="Toggle theme"
          >
            {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="flex flex-1 gap-3 p-3 overflow-hidden min-h-0">
        {/* NAV RAIL */}
        <nav
          className="w-20 shrink-0 flex flex-col items-center gap-2 rounded-[28px] border border-border/30 bg-card/80 backdrop-blur-md shadow-sm p-3"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item, i) => {
            const Icon = item.icon;
            const active = activeNav === i;
            return (
              <button
                key={i}
                onClick={() => handleNavClick(i, item.action)}
                className={`flex w-full flex-col items-center gap-1 rounded-2xl py-2.5 px-1 transition-all duration-200 hover:scale-105 ${
                  active
                    ? "bg-primary/15 text-primary shadow-[0_0_16px_rgba(6,182,212,0.18)] dark:shadow-[0_0_16px_rgba(16,185,129,0.18)]"
                    : "text-muted-foreground/60 hover:text-muted-foreground hover:bg-accent/50"
                }`}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-5" />
                <span className="text-[8px] uppercase tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* MAIN AREA */}
        <div className="flex flex-1 flex-col gap-3 overflow-hidden min-h-0">
          {/* TOP GRID — 3 equal columns */}
          <div className="flex-1 grid grid-cols-3 gap-3 overflow-hidden min-h-0">
            {/* ── LEFT: DRIVER MONITOR ── */}
            <DriverMonitor />

            {/* ── MIDDLE: AI NAVIGATION CENTER ── */}
            <AINavigationCenter />

            {/* ── RIGHT STACK ── */}
            <div className="flex flex-col gap-2 min-h-0 overflow-hidden">
              {/* VEHICLE STATUS */}
              <VehicleMetrics />

              {/* VEHICLE METRICS */}
              <VehicleStatus />

              {/* AI ALERTS */}
              <AIAlerts />
            </div>
          </div>

          {/* ── BOTTOM: CONTROLS + ASSISTANT ── */}
          <div className="h-32 shrink-0 grid grid-cols-[1.2fr_0.8fr] gap-3">
            {/* VEHICLE CONTROLS */}
            <VehicleControls />

            {/* AI ASSISTANT */}
            <AIAssistant />
          </div>
        </div>
      </div>

      {/* ── MODALS ── */}
      <TelemetryPanel />
      <AIVisionLab />
      <DriverProfile />
     <EmergencyOverlay />
      
      <NotificationSystem
  notifications={notifications}
  onDismiss={dismissNotification}
/>

    </div>
    
  );
}

export default function App() {
  return (
    <AIContextProvider>
      <AppContent />
    </AIContextProvider>
  );
}
