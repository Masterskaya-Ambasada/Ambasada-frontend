import { useIsFetching } from "@tanstack/react-query";

export const useProjectsLoading = () => {
  // Отслеживаем все запросы с ключом "projects"
  const fetchCount = useIsFetching({
    queryKey: ["projects"],
    exact: false, // отслеживаем все вариации
  });

  const isFetching = fetchCount > 0;

  return {
    isFetching,
    fetchCount,
  };
};
