<<<<<<< HEAD
export const API_BASE =
  "http://127.0.0.1:8000";
=======
// src/services/api.ts

const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const API_BASE = isLocalhost
  ? "http://127.0.0.1:8000"
  : "/api";
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03
