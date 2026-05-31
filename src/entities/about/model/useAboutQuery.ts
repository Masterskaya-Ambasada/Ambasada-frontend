import { useQuery } from "@tanstack/react-query";
import { getAbout } from "../api/getAbout";

export const aboutQueryKey = ["about"] as const;

const ABOUT_STALE_TIME = 5 * 60 * 1000;
const ABOUT_GC_TIME = 10 * 60 * 1000;

export function useAboutQuery() {
  return useQuery({
    queryKey: aboutQueryKey,
    queryFn: ({ signal }) => getAbout(signal),
    staleTime: ABOUT_STALE_TIME,
    gcTime: ABOUT_GC_TIME,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}
