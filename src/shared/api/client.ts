import { createApiClient } from "./lib/api-client";
import i18n from "../config/i18n.ts";
import { ENV } from "../config/env.ts";

const getCurrentLanguage = (): string => {
  return i18n.language || "ru";
};

export const apiClient = createApiClient({
  baseUrl: ENV.API_URL,
  getLanguage: getCurrentLanguage,
});
