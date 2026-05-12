import { useQuery } from "@tanstack/react-query";
import { getInit } from "../api/getInit";

export const initQueryKey = ["init"] as const;

const INIT_STALE_TIME = 30 * 60 * 1000;
const INIT_GC_TIME = 60 * 60 * 1000;

export function useInitQuery() {
  return useQuery({
    queryKey: initQueryKey,
    queryFn: ({ signal }) => getInit(signal),
    staleTime: INIT_STALE_TIME,
    gcTime: INIT_GC_TIME,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
