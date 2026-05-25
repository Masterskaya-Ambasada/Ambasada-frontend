import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

interface Filters {
  search: string;
  type: string;
  tags: string[];
}

export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [type, setType] = useState(() => searchParams.get("type") || "");
  const [tags, setTags] = useState<string[]>(() => {
    const tagsParam = searchParams.get("tags");
    return tagsParam ? tagsParam.split(",") : [];
  });

  // Синхронизация состояния с URL параметрами
  useEffect(() => {
    const newSearch = searchParams.get("search") || "";
    const newType = searchParams.get("type") || "";
    const newTagsParam = searchParams.get("tags");
    const newTags = newTagsParam ? newTagsParam.split(",") : [];

    if (newSearch !== search) setSearch(newSearch);
    if (newType !== type) setType(newType);
    if (JSON.stringify(newTags) !== JSON.stringify(tags)) setTags(newTags);
  }, [searchParams, search, type, tags]);


  const updateFilters = useCallback(
    (updates: Partial<Filters>) => {
      const newParams = new URLSearchParams(searchParams);

      if (updates.search !== undefined) {
        if (updates.search) {
          newParams.set("search", updates.search);
        } else {
          newParams.delete("search");
        }
        setSearch(updates.search);
      }

      if (updates.type !== undefined) {
        if (updates.type && updates.type !== "all") {
          newParams.set("type", updates.type);
        } else {
          newParams.delete("type");
        }
        setType(updates.type);
      }

      if (updates.tags !== undefined) {
        if (updates.tags.length > 0) {
          newParams.set("tags", updates.tags.join(","));
        } else {
          newParams.delete("tags");
        }
        setTags(updates.tags);
      }

      setSearchParams(newParams, { replace: false });
    },
    [searchParams, setSearchParams]
  );

  return {
    search,
    type,
    tags,
    updateFilters,
  };
};
