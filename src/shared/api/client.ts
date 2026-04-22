import { createApiClient } from "./lib/api-client";
import i18n from "../../i18n";

const getCurrentLanguage = (): string => {
  return i18n.language;
};

export const apiClient = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL,
  getLanguage: getCurrentLanguage,
});
