import { useState, useEffect, useCallback } from "react";
import { useUrlFilters } from "./useUrlFilters";

export const useSearchString = () => {
  const { search: urlSearch, updateFilters } = useUrlFilters();
  const [localSearch, setLocalSearch] = useState(urlSearch);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Синхронизация с URL
  useEffect(() => {
    setLocalSearch(urlSearch);
  }, [urlSearch]);

  // Debounce для поиска
  useEffect(() => {
    const timer = window.setTimeout(() => {
      updateFilters({ search: localSearch });
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, updateFilters]);

  const handleSearchChange = useCallback((value: string) => {
    setLocalSearch(value);
  }, []);

  return {
    localSearch,
    setLocalSearch: handleSearchChange,
    isSearchOpen,
    setIsSearchOpen,
  };
};
