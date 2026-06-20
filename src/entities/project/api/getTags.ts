import { apiClient } from "@/shared/api/client";
import type { Tag } from "../model/types";
import { apiPaths } from "@/shared/api/config/apiPaths";

export function getTags(signal?: AbortSignal): Promise<Tag[]> {
  return apiClient
    .get<string[]>(apiPaths.projects.tags, { signal })
    .then((tags) =>
      tags.map((tagName: string) => ({
        id: tagName,
        name: tagName,
      })),
    );
}
