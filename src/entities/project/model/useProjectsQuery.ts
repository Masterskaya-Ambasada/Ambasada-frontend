import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getProjects } from "../api/getProjects";
import type { ProjectsResponse, GetProjectsParams } from "./types";

const INIT_STALE_TIME = 0; // 5 минут
const INIT_GC_TIME = 10 * 60 * 1000; // 10 минут

export function useProjectsQuery(
  params: GetProjectsParams,
): UseQueryResult<ProjectsResponse> {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: ({ signal }) => getProjects(params, signal),
    staleTime: INIT_STALE_TIME,
    gcTime: INIT_GC_TIME,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
