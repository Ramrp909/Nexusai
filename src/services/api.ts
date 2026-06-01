// src/services/api.ts

const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const API_BASE = isLocalhost
  ? "http://127.0.0.1:8000"
  : "/api";