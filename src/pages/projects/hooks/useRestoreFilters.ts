import { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUrlFilters } from './useUrlFilters';

export const useRestoreFilters = () => {
  const location = useLocation();
  const { updateFilters } = useUrlFilters();
  const [isRestoring, setIsRestoring] = useState(true);

  useLayoutEffect(() => {
    const state = location.state as {
      fromProjects?: { search?: string; type?: string; tags?: string[] };
    } | null;

    if (state?.fromProjects) {
      const { search = '', type = '', tags = [] } = state.fromProjects;
      updateFilters({ search, type, tags });
      window.history.replaceState({}, document.title);
    }
    setIsRestoring(false);
  }, [location.state, updateFilters]);

  return { isRestoring };
};