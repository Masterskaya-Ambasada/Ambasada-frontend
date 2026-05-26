import { apiClient } from "@/shared/api/client";
import type { IProjectDetailsResponse } from "../model/types";

export function getProjectDetails(
  id: string,
  signal?: AbortSignal,
): Promise<IProjectDetailsResponse> {
  return apiClient.get<IProjectDetailsResponse>(`/projects/${id}`, { signal });
}
