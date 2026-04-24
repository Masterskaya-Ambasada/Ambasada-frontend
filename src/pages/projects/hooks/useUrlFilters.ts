import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const tags = searchParams.get("tags")?.split(",")?.filter(Boolean) || [];

  const updateFilters = useCallback(
    (updates: { search?: string; type?: string; tags?: string[] }) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        if (updates.search !== undefined) {
          if (updates.search) newParams.set("search", updates.search);
          else newParams.delete("search");
        }

        if (updates.type !== undefined) {
          if (updates.type) newParams.set("type", updates.type);
          else newParams.delete("type");
        }

        if (updates.tags !== undefined) {
          if (updates.tags.length)
            newParams.set("tags", updates.tags.join(","));
          else newParams.delete("tags");
        }

        return newParams;
      });
    },
    [setSearchParams],
  );

  return { search, type, tags, updateFilters };
};