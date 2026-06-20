import { apiClient } from "@/shared/api/client";
import type { AboutPageResponse } from "../model/types";
import { apiPaths } from "@/shared/api/config/apiPaths";

export function getAbout(signal?: AbortSignal): Promise<AboutPageResponse> {
  return apiClient.get<AboutPageResponse>(apiPaths.about, { signal });
}
