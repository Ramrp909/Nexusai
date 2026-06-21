import { API_BASE } from "./api";



export interface DriverMonitorResponse {

  driver: {

    faceDetected: boolean;

    faceCount: number;

    isDrowsy: boolean;
     isYawning: boolean;
  isTalking: boolean;

  phoneDetected: boolean;

  fatigueLevel: string;

  safetyScore: number;

    attentionStatus: string;
    blinkRate :number;
    gazeStability: number;

    headDirection: string;

    lookingAway: boolean;

    attentionScore: number;
  };

  vision: {

    trackingState: string;

    meshEnabled: boolean;

    meshConfidence: number;

    pipelineStatus: string;

    fps: number;

    latency: number;
  };

  vehicle: {

    riskLevel: string;

    safetyMode: string;

    assistState: string;
  };

  events: {

    type: string;

    severity: string;

  }[];
}

export async function detectFace(
  file: File
): Promise<DriverMonitorResponse> {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await fetch(
      `${API_BASE}/detect-face`,
      {
        method: "POST",
        body: formData,
      }
    );

  if (!response.ok) {

    throw new Error(
      "Driver monitor request failed"
    );

  }

  return response.json();

}