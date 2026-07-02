// src/pages/projects/hooks/useProjectsLoading.ts
import { useIsFetching } from "@tanstack/react-query";
import { useEffect } from "react";

export const useProjectsLoading = () => {
  // Отслеживаем все запросы с ключом "projects"
  const fetchCount = useIsFetching({
    queryKey: ["projects"],
    exact: false, // Важно: отслеживаем все вариации
  });

  const isFetching = fetchCount > 0;

  return {
    isFetching,
    fetchCount,
  };
};
