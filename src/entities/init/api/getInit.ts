import { apiClient } from "@/shared/api/client";
import type { InitResponse } from "../model/types";
import { apiPaths } from "@/shared/api/config/apiPaths";

export function getInit(signal?: AbortSignal): Promise<InitResponse> {
  return apiClient.get<InitResponse>(apiPaths.init, { signal });
}
