import { apiClient } from "@/shared/api/client";
import type { Category } from "../model/types";

export function getCategories(signal?: AbortSignal): Promise<Category[]> {
  return apiClient.get<Category[]>("/projects/categories", { signal });
}