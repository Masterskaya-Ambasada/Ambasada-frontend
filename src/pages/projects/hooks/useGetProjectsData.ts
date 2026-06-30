import { useMemo, useEffect, useCallback } from 'react';
import { useUrlFilters } from './useUrlFilters';
import { useProjectsQuery } from '@entities/project/model/useProjectsQuery';
import { useCategoriesQuery } from '@entities/project/model/useCategoriesQuery';
import { useTagsQuery } from '@entities/project/model/useTagsQuery';
import { useViewportWidth } from '@shared/lib/useWidthViewPort';
import { usePagination } from './usePagination';

// хук для получения данных проектов с учетом фильтров и пагинации
export const useGetProjectsData = () => {
  const { 
    search: urlSearch, 
    type: urlType, 
    tags: urlTags, 
    updateFilters: urlUpdateFilters 
  } = useUrlFilters();
  
  const { isMobile, isTablet } = useViewportWidth();
  
  // Мемоизируем лимит
  const limit = useMemo(() => {
    return (isMobile || isTablet) ? 6 : 12;
  }, [isMobile, isTablet]);

  // Пагинация
  const pagination = usePagination({
    totalItems: 0,
    initialPage: 1,
    initialLimit: limit,
  });

  // Запрос проектов с пагинацией
  const queryResult = useProjectsQuery({
    limit: pagination.limit,
    offset: pagination.offset,
    search: urlSearch,
    type: urlType,
    tag: urlTags,
  });

  // Категории и теги
  const categoriesQuery = useCategoriesQuery();
  const tagsQuery = useTagsQuery();

  // функция обновления фильтров с проверкой изменений
  const handleUpdateFilters = useCallback(
    (filters: { search?: string; type?: string; tags?: string[] }) => {
      const nextSearch = filters.search ?? urlSearch;
      const nextType = filters.type ?? urlType;
      const nextTags = filters.tags ?? urlTags;

      // Проверяем изменения в тегах (сравниваем длину и содержимое)
      const tagsChanged = 
        nextTags.length !== urlTags.length || 
        nextTags.some((tag, index) => tag !== urlTags[index]);

      // Проверяем изменения в поиске и типе
      const hasChanges = 
        nextSearch !== urlSearch || 
        nextType !== urlType || 
        tagsChanged;

      // Если есть изменения - сбрасываем страницу и обновляем фильтры
      if (hasChanges) {
        pagination.resetPage();
        urlUpdateFilters(filters);
      }
    },
    [urlUpdateFilters, urlSearch, urlType, urlTags, pagination.resetPage]
  );

  // Сброс страницы при изменении фильтров (дополнительная страховка)
  useEffect(() => {
    pagination.resetPage();
  }, [urlSearch, urlType, urlTags]);

  // Обновляем лимит при изменении вьюпорта
  useEffect(() => {
    pagination.setLimit(limit);
  }, [limit, pagination]);

  // Мемоизируем возвращаемые значения
  return useMemo(() => ({
    projects: queryResult.data?.items || [],
    categories: categoriesQuery.data || [],
    availableTags: tagsQuery.data || [],
    loading: queryResult.isLoading || categoriesQuery.isLoading || tagsQuery.isLoading,
    isFetching: queryResult.isFetching,
    error: queryResult.error || categoriesQuery.error || tagsQuery.error,
    filters: {
      search: urlSearch,
      type: urlType,
      tags: urlTags,
    },
    updateFilters: handleUpdateFilters, // Используем улучшенную версию
    pagination: {
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      totalItems: queryResult.data?.pagination.totalItems || 0,
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
    queryResult.isLoading,
    queryResult.isFetching,
    queryResult.error,
    categoriesQuery.data,
    categoriesQuery.isLoading,
    categoriesQuery.error,
    tagsQuery.data,
    tagsQuery.isLoading,
    tagsQuery.error,
    urlSearch,
    urlType,
    urlTags,
    handleUpdateFilters,
    pagination,
  ]);
};