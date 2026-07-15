// // lib/api/client.ts
// import axios from "axios";
// import { useAuthStore } from "@/stores/auth.store";

// export const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// apiClient.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().accessToken;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// apiClient.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       const isLoginPage = window.location.pathname === "/login";
//       if (!isLoginPage) {
//         // only clear and redirect if NOT already on login page
//         useAuthStore.getState().clearAuth();
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(err);
//   },
// );
// lib/api/client.ts
import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true", // ← add this
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      const isLoginPage = window.location.pathname === "/login";
      if (!isLoginPage) {
        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
      }
    }

    // [ADDED] extract backend error message from response body,
    // fallback to axios error message, then generic string.
    // this ensures onError in useAppMutation receives a readable message
    // instead of a generic AxiosError object.
    const message =
      err.response?.data?.message || err.message || "Something went wrong.";
    return Promise.reject(new Error(message));
  },
);
