import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getTags } from "../api/getTags";
import type { Tag } from "./types";

const INIT_STALE_TIME = 30 * 60 * 1000; // 30 минут
const INIT_GC_TIME = 60 * 60 * 1000; // 1 час

export function useTagsQuery(): UseQueryResult<Tag[]> {
  return useQuery({
    queryKey: ["projects-tags"],
    queryFn: ({ signal }) => getTags(signal),
    staleTime: INIT_STALE_TIME,
    gcTime: INIT_GC_TIME,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
