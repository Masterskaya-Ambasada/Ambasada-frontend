import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getProjectDetails } from "../api/getProjectDetails";
import type { IProjectDetailsResponse } from "../model/types";

const INIT_STALE_TIME = 30 * 60 * 1000;
const INIT_GC_TIME = 60 * 60 * 1000;

export function useProjectDetailsQuery(
  id: string,
): UseQueryResult<IProjectDetailsResponse> {
  return useQuery({
    queryKey: ["projectDetails", id],
    queryFn: ({ signal }) => getProjectDetails(id, signal),
    staleTime: INIT_STALE_TIME,
    gcTime: INIT_GC_TIME,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    enabled: !!id,
  });
}
