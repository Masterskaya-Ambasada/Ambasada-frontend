import { useState, useMemo, useCallback, useEffect } from 'react';

interface UsePaginationProps {
  totalItems: number;
  initialPage?: number;
  initialLimit?: number;
  onPageChange?: (page: number) => void;
}

interface UsePaginationReturn {
  currentPage: number;
  setPage: (page: number) => void;
  goToPage: (page: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  totalPages: number;
  totalItems: number;
  visiblePages: (number | string)[];
  hasNext: boolean;
  hasPrev: boolean;
  limit: number;
  setLimit: (limit: number) => void;
  offset: number;
  resetPage: () => void;
}

export const usePagination = ({
  totalItems,
  initialPage = 1,
  initialLimit = 12,
  onPageChange,
}: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  // Сброс страницы при изменении лимита
  useEffect(() => {
    setCurrentPage(1);
  }, [limit]);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / limit) || 1;
  }, [totalItems, limit]);

  const offset = useMemo(() => { 
    return (currentPage - 1) * limit;
  }, [currentPage, limit]);

  const hasNext = useMemo(() => {
    return currentPage < totalPages;
  }, [currentPage, totalPages]);

  const hasPrev = useMemo(() => {
    return currentPage > 1;
  }, [currentPage]);

  // Универсальная логика отображения страниц
  const visiblePages = useMemo(() => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 4) {
      pages.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
    } else {
      const currentPages = [currentPage, currentPage + 1, currentPage + 2]
        .filter(p => p <= totalPages);
      
      pages.push(1);
      
      if (currentPages[0] > 2) pages.push('...');
      
      currentPages.forEach(p => {
        if (p !== 1 && p !== totalPages) {
          pages.push(p);
        }
      });
      
      const lastVisible = currentPages[currentPages.length - 1];
      if (lastVisible < totalPages - 1) pages.push('...');
      
      pages.push(totalPages);
    }
    
    return pages;
  }, [currentPage, totalPages]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange?.(page);
      
      // Скролл к верху
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalPages, onPageChange]);

  const goToNext = useCallback(() => {
    if (hasNext) goToPage(currentPage + 1);
  }, [hasNext, currentPage, goToPage]);

  const goToPrev = useCallback(() => {
    if (hasPrev) goToPage(currentPage - 1);
  }, [hasPrev, currentPage, goToPage]);

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    setPage: setCurrentPage,
    goToPage,
    goToNext,
    goToPrev,
    totalPages,
    totalItems,
    visiblePages,
    hasNext,
    hasPrev,
    limit,
    setLimit,
    offset,
    resetPage,
  };
};