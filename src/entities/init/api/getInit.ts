import { apiClient } from "@/shared/api/client";
import type { InitResponse } from "../model/types";

export function getInit(signal?: AbortSignal): Promise<InitResponse> {
  return apiClient.get<InitResponse>("/init", { signal });
}
