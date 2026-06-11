import { apiClient } from "@/shared/api/client";
import type { CategoriesResponse, Category } from "../model/types";

export function getCategories(signal?: AbortSignal): 
Promise<Category[]> {
  return apiClient
  .get<CategoriesResponse>("/projects/categories", { signal })
    .then((response) => response.types);
}
