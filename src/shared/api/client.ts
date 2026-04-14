import { createApiClient } from "./lib/api-client";

const getCurrentLanguage = (): string => {
  return "ru";
};

export const apiClient = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL,
  getLanguage: getCurrentLanguage,
});
