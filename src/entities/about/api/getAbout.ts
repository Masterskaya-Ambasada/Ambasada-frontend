import { apiClient } from "@/shared/api/client";
import type { AboutPageResponse } from "../model/types";

export function getAbout(signal?: AbortSignal): Promise<AboutPageResponse> {
  return apiClient.get<AboutPageResponse>("/about", { signal });
}
