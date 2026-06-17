import { apiClient } from "@/shared/api/client";
import type { ProjectsResponse, GetProjectsParams } from "../model/types";

export function getProjects(
  params: GetProjectsParams,
  signal?: AbortSignal,
): Promise<ProjectsResponse> {
  const urlParams = new URLSearchParams({
    limit: String(params.limit),
    offset: String(params.offset),
  });

  if (params.search) {
    urlParams.append("search", params.search);
  }

  if (params.type && params.type !== "all") {
    urlParams.append("project_type", params.type);
  }

  if (params.tag && params.tag.length > 0) {
    urlParams.append("tag", params.tag.join(","));
  }

  return apiClient.get<ProjectsResponse>(`/projects?${urlParams.toString()}`, {
    signal,
  });
}
