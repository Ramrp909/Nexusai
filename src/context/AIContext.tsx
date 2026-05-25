import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import NotificationSystem, { Notification } from "../app/components/NotificationSystem";

// Driver Profile Type
export interface DriverProfile {
  id: string;
  name: string;
  avatar?: string;
  isActive: boolean;
  preferences: {
    acTemperature: number;
    seatPosition: {
      horizontal: number;
      vertical: number;
      lumbar: number;
    };
    ambientLighting: "off" | "dim" | "medium" | "bright" | "rainbow";
    steeringWheel: {
      tilt: number;
      telescope: number;
    };
    mirrors: {
      driver: number;
      passenger: number;
    };
    sound: {
      volume: number;
      equalizer: string;
    };
  };
}

// Face Detection Status
export interface FaceDetectionStatus {
  isActive: boolean;
  detectedProfileId?: string;
  confidence: number;
  faceMesh?: {
    yaw: number;
    pitch: number;
    roll: number;
    landmarks: number;
  };
  tracking?: {
    boundingBox: { x: number; y: number; w: number; h: number };
    faceId: string;
    confidence: number;
    fps: number;
  };
}

// Modal States
export interface ModalStates {
  telemetryPanel: boolean;
  telemetryFullscreen: boolean;
  aiVisionLab: boolean;
  driverProfile: boolean;
  vehicleControls: boolean;
  hazardDialog: boolean;
  lockDialog: boolean;
}

// AI Context State
interface AIContextState {
  // Driver Management
  currentProfile: DriverProfile | null;
  profiles: DriverProfile[];
  setCurrentProfile: (profile: DriverProfile | null) => void;
  addProfile: (profile: DriverProfile) => void;
  updateProfile: (id: string, updates: Partial<DriverProfile>) => void;
  deleteProfile: (id: string) => void;

  // Vehicle Mode
  vehicleMode: "fuel" | "ev";
  setVehicleMode: (mode: "fuel" | "ev") => void;

  // Modal States
  modals: ModalStates;
  openModal: (modal: keyof ModalStates) => void;
  closeModal: (modal: keyof ModalStates) => void;
  toggleModal: (modal: keyof ModalStates) => void;

  // Driver Monitor State
  isDriverMonitorMinimized: boolean;
  setDriverMonitorMinimized: (minimized: boolean) => void;

  // Face Detection
  faceDetection: FaceDetectionStatus;
  setFaceDetection: (status: Partial<FaceDetectionStatus>) => void;

  //globalstate
  globalTestMode: boolean;
  setGlobalTestMode: (mode: boolean) => void;
  testDriverProfile: "known" | "guest" | "unknown";
  setTestDriverProfile: (profile: "known" | "guest" | "unknown") => void;
  testEmergencyMode: boolean;
  setTestEmergencyMode: (mode: boolean) => void;
  testCollisionWarning: boolean;
  setTestCollisionWarning: (warning: boolean) => void;



  // Theme
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  
  //Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  dismissNotification: (id: string) => void;


  // Vehicle Controls
  activeControls: Record<string, boolean>;
  toggleControl: (key: string) => void;
  setControl: (key: string, value: boolean) => void;

  // Temperature
  temperature: number;
  setTemperature: (temp: number) => void;

  //Attention Score
  attentionScore: number;
  setAttentionScore: (score: number) => void;

  //BlinkRate Score
  blinkRate : number;
  setBlinkRate: (score: number) => void;

  //gazeStability
  gazeStability: number;
  setGazeStability: (score: number) => void;

  //Attention Status
  attentionStatus: string;
  setAttentionStatus: (status: string) => void;

  //Head Direction
  headDirection: string;
  setHeadDirection: (direction: string) => void;

  //Drowsiness
  isDrowsy: boolean;
  setIsDrowsy: (drowsy: boolean) => void;

  //Looking Away
  lookingAway: boolean;
  setLookingAway: (lookingAway: boolean) => void;

  visionTelemetry: any;
setVisionTelemetry: (data: any) => void;

vehicleTelemetry: any;
setVehicleTelemetry: (data: any) => void;

backendEvents: any[];
setBackendEvents: (events: any[]) => void;

  //Danger Alert
  showDangerAlert: boolean;
  setShowDangerAlert: (show: boolean) => void;

  // AI Assistant
  isVoiceActive: boolean;
  setVoiceActive: (active: boolean) => void;
  aiMessages: { id: string; type: "user" | "system"; content: string; timestamp: Date }[];
  addAIMessage: (type: "user" | "system", content: string) => void;

  // Cache for backend responses
  apiCache: Record<string, any>;
  updateCache: (key: string, data: any) => void;

  // Drowsiness Tracking
  drowsiness: {
    duration: number;
    count: number;
    lastDetectedAt: number | null;
  };
  resetDrowsiness: () => void;
  incrementDrowsiness: () => void;

  // Parking Assist
  parkingAssistActive: boolean;
  setParkingAssistActive: (active: boolean) => void;
}

const AIContext = createContext<AIContextState | undefined>(undefined);

export function AIContextProvider({ children }: { children: ReactNode }) {
  // Default profile
  const defaultProfile: DriverProfile = {
    id: "default-1",
    name: "Alex Driver",
    isActive: true,
    preferences: {
      acTemperature: 22,
      seatPosition: { horizontal: 50, vertical: 50, lumbar: 50 },
      ambientLighting: "medium",
      steeringWheel: { tilt: 50, telescope: 50 },
      mirrors: { driver: 50, passenger: 50 },
      sound: { volume: 50, equalizer: "balanced" },
    },
  };
  const [
  notifications,
  setNotifications,
] = useState<Notification[]>([]);

const [globalTestMode, setGlobalTestMode] = useState(false);
const [testDriverProfile, setTestDriverProfile] = useState<
  "known" | "guest" | "unknown"
>("unknown");

const [testEmergencyMode, setTestEmergencyMode] =
  useState(false);

const [testCollisionWarning, setTestCollisionWarning] =
  useState(false);

  const [
  attentionScore,
  setAttentionScore
] = useState(100);

const [blinkRate,setBlinkRate] = useState(100);
const [gazeStability,setGazeStability] = useState(100)

const [
  attentionStatus,
  setAttentionStatus
] = useState("Focused");

const [
  headDirection,
  setHeadDirection
] = useState("Center");

const [
  isDrowsy,
  setIsDrowsy
] = useState(false);

const [
  lookingAway,
  setLookingAway
] = useState(false);

const [
  visionTelemetry,
  setVisionTelemetry
] = useState(null);

const [
  vehicleTelemetry,
  setVehicleTelemetry
] = useState(null);

const [
  backendEvents,
  setBackendEvents
] = useState<any[]>([]);

useEffect(() => {

  const emergencyEvent =
    backendEvents.some(

      event =>

        event.type ===
          "Emergency Intervention"

        &&

        event.severity ===
          "critical"
    );

  setParkingAssistActive(
    emergencyEvent
  );

}, [backendEvents]);

const [
  showDangerAlert,
  setShowDangerAlert,
] = useState(false);

  const [currentProfile, setCurrentProfile] = useState<DriverProfile | null>(defaultProfile);
  const [profiles, setProfiles] = useState<DriverProfile[]>([defaultProfile]);
  const [vehicleMode, setVehicleMode] = useState<"fuel" | "ev">("fuel");
  const [modals, setModals] = useState<ModalStates>({
    telemetryPanel: false,
    telemetryFullscreen: false,
    aiVisionLab: false,
    driverProfile: false,
    vehicleControls: false,
    hazardDialog: false,
    lockDialog: false,
  });
  const [isDriverMonitorMinimized, setDriverMonitorMinimized] = useState(false);
  const [faceDetection, setFaceDetectionState] = useState<FaceDetectionStatus>({
    isActive: true,
    confidence: 0.95,
    faceMesh: { yaw: 0, pitch: 0, roll: 0, landmarks: 468 },
    tracking: {
      boundingBox: { x: 0, y: 0, w: 0, h: 0 },
      faceId: "face-001",
      confidence: 0.95,
      fps: 30,
    },
  });

  const addNotification = (
  notification: Omit<
    Notification,
    "id"
  >
) => {

  const id =
    Math.random()
      .toString(36)
      .substring(7);

  const newNotification = {
    ...notification,
    id,
  };

  setNotifications(prev => [
    ...prev,
    newNotification,
  ]);

  if (notification.duration) {

    setTimeout(() => {

      dismissNotification(id);

    }, notification.duration);

  }
  

};
const dismissNotification = (
  id: string
) => {

  setNotifications(prev =>
    prev.filter(
      notification =>
        notification.id !== id
    )
  );

};
  const [isDark, setIsDark] = useState(false);
  const [activeControls, setActiveControls] = useState<Record<string, boolean>>({
    ac: true,
    seat: false,
    ambient: true,
    camera: false,
    hazard: false,
    lock: true,
    wifi: true,
    more: false,
  });
  const [temperature, setTemperature] = useState(22);
  const [isVoiceActive, setVoiceActive] = useState(false);
  const [aiMessages, setAIMessages] = useState<
    { id: string; type: "user" | "system"; content: string; timestamp: Date }[]
  >([]);
  const [apiCache, setApiCache] = useState<Record<string, any>>({});
  const [drowsiness, setDrowsiness] = useState({ duration: 0, count: 0, lastDetectedAt: null as number | null });
  const [parkingAssistActive, setParkingAssistActive] = useState(false);

  const addProfile = (profile: DriverProfile) => {
    setProfiles((prev) => [...prev, profile]);
  };

  const updateProfile = (id: string, updates: Partial<DriverProfile>) => {
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    if (currentProfile?.id === id) {
      setCurrentProfile((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    if (currentProfile?.id === id) {
      setCurrentProfile(profiles[0] || null);
    }
  };

  const openModal = (modal: keyof ModalStates) => {
    setModals((prev) => ({ ...prev, [modal]: true }));
  };

  const closeModal = (modal: keyof ModalStates) => {
    setModals((prev) => ({ ...prev, [modal]: false }));
  };

  const toggleModal = (modal: keyof ModalStates) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const setFaceDetection = (status: Partial<FaceDetectionStatus>) => {
    setFaceDetectionState((prev) => ({ ...prev, ...status }));
  };

  const toggleControl = (key: string) => {
    setActiveControls((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setControl = (key: string, value: boolean) => {
    setActiveControls((prev) => ({ ...prev, [key]: value }));
  };

  const addAIMessage = (type: "user" | "system", content: string) => {
    setAIMessages((prev) => [
      ...prev,
      { id: `msg-${Date.now()}`, type, content, timestamp: new Date() },
    ]);
  };

  const updateCache = (key: string, data: any) => {
    setApiCache((prev) => ({ ...prev, [key]: data }));
  };

  const resetDrowsiness = () => {
    setDrowsiness({ duration: 0, count: 0, lastDetectedAt: null });
  };

  const incrementDrowsiness = () => {
    setDrowsiness((prev) => ({
      duration: prev.duration + 1,
      count: prev.lastDetectedAt === Math.floor(Date.now() / 1000) ? prev.count : prev.count + 1,
      lastDetectedAt: Math.floor(Date.now() / 1000),
    }));
  };

  return (
    <AIContext.Provider
      value={{
        currentProfile,
        profiles,
        setCurrentProfile,
        addProfile,
        updateProfile,
        deleteProfile,
        vehicleMode,
        setVehicleMode,
        modals,
        openModal,
        closeModal,
        toggleModal,
        isDriverMonitorMinimized,
        setDriverMonitorMinimized,
        faceDetection,
        setFaceDetection,
        isDark,
        setIsDark,
        activeControls,
        toggleControl,
        setControl,
        temperature,
        setTemperature,
        isVoiceActive,
        setVoiceActive,
        aiMessages,
        addAIMessage,
        apiCache,
        updateCache,
        attentionScore,
        setAttentionScore,
        blinkRate,
        setBlinkRate,
        gazeStability,
        setGazeStability,
        attentionStatus,
        setAttentionStatus,
        headDirection,
        setHeadDirection,
        isDrowsy,
        setIsDrowsy,
        lookingAway,
        setLookingAway, 
        notifications,
        addNotification,
        dismissNotification,
        showDangerAlert,
        setShowDangerAlert,
        drowsiness,
        resetDrowsiness,
        incrementDrowsiness,
        parkingAssistActive,
        setParkingAssistActive,
        visionTelemetry,
        setVisionTelemetry,

        vehicleTelemetry,
        setVehicleTelemetry,

        backendEvents,
        setBackendEvents,

        globalTestMode,
setGlobalTestMode,

testDriverProfile,
setTestDriverProfile,

testEmergencyMode,
setTestEmergencyMode,

testCollisionWarning,
setTestCollisionWarning,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAI must be used within AIContextProvider");
  }
  return context;
}
