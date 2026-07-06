import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getProjects } from "../api/getProjects";
import type { ProjectsResponse, GetProjectsParams } from "./types";

const INIT_STALE_TIME = 5 * 60 * 1000;
const INIT_GC_TIME = 10 * 60 * 1000;

export function useProjectsQuery(
  params: GetProjectsParams,
): UseQueryResult<ProjectsResponse> {
  // Убеждаемся, что все параметры включены в queryKey
  const queryKey = [
    "projects",
    params.limit,
    params.offset,
    params.search || "",
    params.type || "",
    params.tag?.join(",") || "",
  ];

  return useQuery({
    queryKey,
    queryFn: ({ signal }) => getProjects(params, signal),
    staleTime: INIT_STALE_TIME,
    gcTime: INIT_GC_TIME,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    placeholderData: (previousData) => previousData,
  });
}