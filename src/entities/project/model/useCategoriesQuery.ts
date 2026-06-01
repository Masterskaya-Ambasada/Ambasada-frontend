import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getCategories } from "../api/getCategories";
import type { Category } from "./types";

const INIT_STALE_TIME = 30 * 60 * 1000; // 30 минут
const INIT_GC_TIME = 60 * 60 * 1000; // 1 час

export function useCategoriesQuery(): UseQueryResult<Category[]> {
  return useQuery({
    queryKey: ["projects-categories"],
    queryFn: ({ signal }) => getCategories(signal),
    staleTime: INIT_STALE_TIME,
    gcTime: INIT_GC_TIME,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
