import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import { useUrlFilters } from "./hooks/useUrlFilters";
import { ProjectsSearch } from "./ui/projects-search/ProjectsSearch";
import { ProjectsList } from "./ui/projects-list/ProjectsList";
import { TypeFilter, type Category } from "./ui/projects-filter/TypeFilter/TypeFilter";
import styles from "./ProjectsPage.module.css";
import { apiClient } from "@shared/api/client";

type ProjectsResponse = {
  items: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    type?: string;
    action_button: {
      label: string;
      link: string;
    };
  }>;
  pagination: {
    totalItems: number;
    offset: number;
    limit: number;
    isNext: boolean;
  };
};

export const ProjectsPage: React.FC = () => {
  const [projectsData, setProjectsData] = useState<ProjectsResponse | null>(null);
  const [categories, setCategories] = useState<Category[]>([]); 
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  
  const { search: urlSearch, type: urlType, updateFilters } = useUrlFilters();
  const [localSearch, setLocalSearch] = useState(urlSearch);
  const debounceTimerRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Обновление лимита при изменении размера окна
  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;
      setLimit(width >= 1024 ? 12 : 6);
      setPage(1); // Сброс страницы при изменении лимита
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  // Загрузка категорий 
  useEffect(() => {
    async function getCategories() {
      try {
        setLoadingCategories(true);
        const res = await apiClient.get<Category[]>("/projects/categories");
        setCategories(res);
      } catch (err) {
        console.log("Ошибка загрузки категорий:", err);
      } finally {
        setLoadingCategories(false);
      }
    }
    getCategories();
  }, []);

  // Загрузка проектов с сервера
  useEffect(() => {
    async function getProjects() {
      try {
        setLoading(true);

        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        
        const controller = new AbortController();
        abortControllerRef.current = controller;
        
        const offset = (page - 1) * limit;
        const params = new URLSearchParams({
          limit: String(limit),
          offset: String(offset)
        });

        if (urlSearch) {
          params.append("search", urlSearch);
        }

        if (urlType && urlType !== "all") {
          params.append("type", urlType);
        }

        const res = await apiClient.get<ProjectsResponse>(
          `/projects?${params.toString()}`,
          { signal: controller.signal }
        );
        
        setProjectsData(res);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.log("Ошибка загрузки проектов:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    getProjects();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [page, limit, urlSearch, urlType]);

  // Сброс страницы при изменении фильтров
  useEffect(() => {
    setPage(1);
  }, [urlSearch, urlType, limit]);

  // Debounce поиска
  const debouncedUpdate = useCallback((value: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = window.setTimeout(() => {
      updateFilters({ search: value });
      debounceTimerRef.current = null;
    }, 500);
  }, [updateFilters]);

  // Обработка изменения строки поиска
  const handleSearchChange = useCallback((value: string) => {
    setLocalSearch(value);
    debouncedUpdate(value);
  }, [debouncedUpdate]);

  // Синхронизация с URL
  useEffect(() => {
    if (urlSearch !== localSearch) {
      setLocalSearch(urlSearch);
    }
  }, [urlSearch]);

  // Пагинация
  const goToNextPage = () => {
    if (projectsData?.pagination.isNext) {
      setPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Пагинация - назад
  const goToPrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading && !projectsData) {
    return <div className={styles.loader}>Загрузка...</div>;
  }

  const totalItems = projectsData?.pagination.totalItems || 0;
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className={styles.projectsList}>
      <h1>Проекты</h1>

      {!loadingCategories && categories.length > 0 && (
        <TypeFilter
          categories={categories}
          selectedType={urlType || null}
          onChange={(newType) => updateFilters({ type: newType || "" })}
        />
      )}

      <ProjectsSearch
        value={localSearch}
        onChange={handleSearchChange}
      />

      {/* Результаты */}
      {projectsData?.items.length === 0 ? (
        <div className={styles.empty}>Проекты не найдены</div>
      ) : (
        <>
          <div className={styles.resultsCount}>
            Найдено проектов: {totalItems}
          </div>
          
          <ProjectsList projects={projectsData?.items || []} />

          {/* Пагинация */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={goToPrevPage}
                disabled={page === 1}
                className={styles.paginationButton}
                aria-label="Предыдущая страница"
              >
                ← Назад
              </button>
              
              <span className={styles.pageInfo}>
                Страница {page} из {totalPages}
              </span>
              
              <button
                onClick={goToNextPage}
                disabled={!projectsData?.pagination.isNext}
                className={styles.paginationButton}
                aria-label="Следующая страница"
              >
                Вперед →
              </button>
            </div>
          )}
        </>
      )}

      <Link to={routesPaths.home} className={styles.homeLink}>
        На главную
      </Link>
    </div>
  );
};

export default ProjectsPage;