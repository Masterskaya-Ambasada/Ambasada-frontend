import { apiClient } from "@/shared/api/client";
import type { Tag } from "../model/types";

export function getTags(signal?: AbortSignal): Promise<Tag[]> {
  return apiClient.get<string[]>("/projects/tags", { signal }).then((tags) =>
    tags.map((tagName: string, index: number) => ({
      id: `${index}-${tagName.toLowerCase().replace(/\s+/g, "-")}`,
      name: tagName,
    })),
  );
}
