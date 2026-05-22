import { API_BASE } from "./api";

export interface DriverMonitorResponse {

  faceDetected: boolean;

  faceCount: number;

  isDrowsy: boolean;

  attentionStatus: string;

  headDirection: string;

  lookingAway: boolean;

  attentionScore: number;

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