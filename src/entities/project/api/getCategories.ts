import { apiClient } from "@/shared/api/client";
import type { CategoriesResponse, Category } from "../model/types";
import { apiPaths } from "@/shared/api/config/apiPaths";

export function getCategories(signal?: AbortSignal): Promise<Category[]> {
  return apiClient
    .get<CategoriesResponse>(apiPaths.projects.categories, { signal })
    .then((response) => response.types);
}
