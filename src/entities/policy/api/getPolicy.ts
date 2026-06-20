import { apiClient } from "@/shared/api/client";
import type { PoliticsResponse } from "../model/types";
import { apiPaths } from "@/shared/api/config/apiPaths";

export async function getPolicy(): Promise<string> {
  const response = await apiClient.get<PoliticsResponse>(apiPaths.politics);
  return response.text;
}
