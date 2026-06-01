import { useQuery } from "@tanstack/react-query";
import { getHome } from "../api/getHome";
import type { HomeResponse } from "./types";

export const homeQueryKey = ["home"] as const;

const HOME_STALE_TIME = 30 * 60 * 1000;
const HOME_GC_TIME = 60 * 60 * 1000;

export function useHomeQuery() {
  return useQuery<HomeResponse>({
    queryKey: homeQueryKey,
    queryFn: ({ signal }) => getHome(signal),

    staleTime: HOME_STALE_TIME,
    gcTime: HOME_GC_TIME,

    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
