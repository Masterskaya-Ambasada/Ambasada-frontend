import { useMemo, useEffect, useCallback, useRef } from 'react';
import { useUrlFilters } from './useUrlFilters';
import { useProjectsQuery } from '@entities/project/model/useProjectsQuery';
import { useCategoriesQuery } from '@entities/project/model/useCategoriesQuery';
import { useTagsQuery } from '@entities/project/model/useTagsQuery';
import { useViewportWidth } from '@shared/lib/useWidthViewPort';
import { usePagination } from './usePagination';

export const useGetProjectsData = () => {
  const { 
    search: urlSearch, 
    type: urlType, 
    tags: urlTags, 
    updateFilters: urlUpdateFilters 
  } = useUrlFilters();
  
  const { isMobile, isTablet } = useViewportWidth();
  
  const isFirstRender = useRef(true);
  
  const limit = useMemo(() => {
    return (isMobile || isTablet) ? 6 : 12;
  }, [isMobile, isTablet]);

  const pagination = usePagination({
    totalItems: 0,
    initialPage: 1,
    initialLimit: limit,
  });

  const queryResult = useProjectsQuery({
    limit: pagination.limit,
    offset: pagination.offset,
    search: urlSearch,
    type: urlType,
    tag: urlTags,
  });

  const categoriesQuery = useCategoriesQuery();
  const tagsQuery = useTagsQuery();

  const handleUpdateFilters = useCallback(
    (filters: { search?: string; type?: string; tags?: string[] }) => {
      const nextSearch = filters.search ?? urlSearch;
      const nextType = filters.type ?? urlType;
      const nextTags = filters.tags ?? urlTags;

      const tagsChanged = 
        nextTags.length !== urlTags.length || 
        nextTags.some((tag, index) => tag !== urlTags[index]);

      const hasChanges = 
        nextSearch !== urlSearch || 
        nextType !== urlType || 
        tagsChanged;

      if (hasChanges) {
        pagination.resetPage();
        urlUpdateFilters(filters);
      }
    },
    [urlUpdateFilters, urlSearch, urlType, urlTags, pagination]
  );

  // 
  useEffect(() => {
    if (!isFirstRender.current) {
      pagination.resetPage();
    }
    isFirstRender.current = false;
  }, [urlSearch, urlType, urlTags, pagination]);

  useEffect(() => {
    pagination.setLimit(limit);
  }, [limit, pagination]);

  // показываем loading только если нет данных И это первый рендер
  const isLoading = isFirstRender.current && queryResult.isLoading;
  
  return useMemo(() => ({
    projects: queryResult.data?.items || [],
    categories: categoriesQuery.data || [],
    availableTags: tagsQuery.data || [],
    loading: isLoading, // Используем вычисленное значение
    isFetching: queryResult.isFetching,
    error: queryResult.error || categoriesQuery.error || tagsQuery.error,
    filters: {
      search: urlSearch,
      type: urlType,
      tags: urlTags,
    },
    updateFilters: handleUpdateFilters,
    pagination: {
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      totalItems: queryResult.data?.pagination?.totalItems || 0,
      visiblePages: pagination.visiblePages,
      goToPage: pagination.goToPage,
      goToNext: pagination.goToNext,
      goToPrev: pagination.goToPrev,
      hasNext: pagination.hasNext,
      hasPrev: pagination.hasPrev,
      limit: pagination.limit,
      resetPage: pagination.resetPage,
    },
  }), [
    queryResult.data,
    queryResult.isFetching,
    queryResult.error,
    categoriesQuery.data,
    categoriesQuery.error,
    tagsQuery.data,
    tagsQuery.error,
    urlSearch,
    urlType,
    urlTags,
    handleUpdateFilters,
    pagination,
    isLoading,
  ]);
};