import { apiClient } from "@/shared/api/client";
import type { IProjectDetailsResponse } from "../model/types";
import { apiPaths } from "@/shared/api/config/apiPaths";

export function getProjectDetails(
  id: string,
  signal?: AbortSignal,
): Promise<IProjectDetailsResponse> {
  return apiClient.get<IProjectDetailsResponse>(apiPaths.projects.details(id), {
    signal,
  });
}
