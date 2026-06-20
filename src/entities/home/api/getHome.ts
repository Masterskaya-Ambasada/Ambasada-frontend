import { apiClient } from "@/shared/api/client";
import type { HomeResponse } from "../model/types";
import { apiPaths } from "@/shared/api/config/apiPaths";

export function getHome(signal?: AbortSignal): Promise<HomeResponse> {
  return apiClient.get<HomeResponse>(apiPaths.home, { signal });
}
