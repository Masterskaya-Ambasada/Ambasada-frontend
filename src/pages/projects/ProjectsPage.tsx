import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import { useUrlFilters } from "./hooks/useUrlFilters";
import { useViewportWidth } from "@shared/lib/useWidthViewPort";
import { useTranslation } from "react-i18next";
import { ProjectsSearch } from "./ui/projects-search/ProjectsSearch";
import { ProjectsList } from "./ui/projects-list/ProjectsList";
import {
  TypeFilter,
  type Category,
} from "./ui/projects-filter/TypeFilter/TypeFilter";
import {
  TagsFilter,
  type Tag,
} from "./ui/projects-filter/TagsFilter/TagsFilter";
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
  const { t } = useTranslation();
  // Данные проектов
  const [projectsData, setProjectsData] = useState<ProjectsResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  // Категории для фильтрации
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Теги для фильтрации
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [loadingTags, setLoadingTags] = useState(true);

  // Параметры пагинации
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  // Фильтры из URL
  const {
    search: urlSearch,
    type: urlType,
    tags: urlTags,
    updateFilters,
  } = useUrlFilters();

  const [localSearch, setLocalSearch] = useState(urlSearch);

  // Определение типа устройства
  const { isMobile, isTablet } = useViewportWidth();
  const prevIsMobileOrTablet = useRef<boolean>(false);

  // Обновление лимита в зависимости от устройства
  useEffect(() => {
    const isMobileOrTablet = isMobile || isTablet;
    const newLimit = isMobileOrTablet ? 6 : 12;
    if (prevIsMobileOrTablet.current !== isMobileOrTablet) {
      setLimit(newLimit);
      setPage(1); // сброс страницы при смене количества элементов на странице
      prevIsMobileOrTablet.current = isMobileOrTablet;
    }
  }, [isMobile, isTablet]);

  const debounceTimerRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Объединенный loading state
  const isPageLoading = loading || loadingTags || loadingCategories;

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

  // Загрузка тегов
  useEffect(() => {
    async function getTags() {
      try {
        setLoadingTags(true);
        const res = await apiClient.get<string[]>("/projects/tags");
        // Преобразуем массив строк в массив объектов
        const tagsAsObjects: Tag[] = res.map((tagName: string, index: number) => ({
          id: `${index}-${tagName.toLowerCase().replace(/\s+/g, "-")}`,
          name: tagName,
        }));
        setAvailableTags(tagsAsObjects);
      } catch (err) {
        console.log("Ошибка загрузки тегов:", err);
      } finally {
        setLoadingTags(false);
      }
    }
    getTags();
  }, []);

  // Загрузка проектов с сервера
  useEffect(() => {
    async function getProjects() {
      try {
        setLoading(true);

        // Отмена предыдущего запроса, если он еще выполняется
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Новый контроллер для текущего запроса
        const controller = new AbortController();
        abortControllerRef.current = controller;

        // Формирование параметров запроса
        const offset = (page - 1) * limit;
        // Добавляем параметры пагинации и фильтров в URL
        const params = new URLSearchParams({
          limit: String(limit),
          offset: String(offset),
        });

        if (urlSearch) {
          params.append("search", urlSearch);
        }

        if (urlType && urlType !== "all") {
          params.append("type", urlType);
        }

        if (urlTags.length > 0) {
          params.append("tags", urlTags.join(","));
        }

        // Добавляем параметры к URL запроса
        const res = await apiClient.get<ProjectsResponse>(
          `/projects?${params.toString()}`,
        );
        setProjectsData(res);
      } catch (err: any) {
        if (err.name !== "AbortError")
          console.error("Ошибка загрузки проектов:", err);
      } finally {
        setLoading(false);
      }
    }

    getProjects();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [page, limit, urlSearch, urlType, urlTags]);

  // Сброс страницы при изменении фильтров
  useEffect(() => {
    setPage(1);
  }, [urlSearch, urlType, limit, urlTags]);

  // Debounce поиска
  const debouncedUpdate = useCallback(
    (value: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = window.setTimeout(() => {
        updateFilters({ search: value });
        debounceTimerRef.current = null;
      }, 500);
    },
    [updateFilters],
  );

  // Обработка изменения строки поиска
  const handleSearchChange = useCallback(
    (value: string) => {
      setLocalSearch(value);
      debouncedUpdate(value);
    },
    [debouncedUpdate],
  );

  // Обработчик выбора тегов
  const handleTagsChange = useCallback(
    (newTags: string[]) => {
      updateFilters({ tags: newTags });
    },
    [updateFilters],
  );

  // Синхронизация с URL
  useEffect(() => {
    if (urlSearch !== localSearch) {
      setLocalSearch(urlSearch);
    }
  }, [urlSearch, localSearch]);

  // Универсальная функция пагинации
  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Единый loader для всех состояний загрузки
  if (isPageLoading && !projectsData) {
    return (
      <div className={styles.loader} role="status" aria-live="polite">
        {t("projects.loading", "Загрузка...")}
      </div>
    );
  }

  const totalItems = projectsData?.pagination.totalItems || 0;
  const totalPages = Math.ceil(totalItems / limit);

  // Проверка на пустые результаты после загрузки
  const isEmpty = !isPageLoading && projectsData?.items.length === 0;

  return (
    <div className={styles.container}>
      {/* Хлебные крошки */}
      <nav className={styles.breadcrumbs} aria-label="Навигация">
        <Link to={routesPaths.home} className={styles.breadcrumbLink}>
          {t("navigation.home", "Главная")}
        </Link>
        <span className={styles.breadcrumbSeparator}> {">"} </span>
        <Link to={routesPaths.projects} className={styles.breadcrumbLink}>
          {t("navigation.projects", "Каталог проектов")}
        </Link>
      </nav>

      <div className={styles.headerRow}>
        <h1 className={styles.title}>
          {t("projects.title", "Проекты")}
          </h1>
        <ProjectsSearch value={localSearch} onChange={handleSearchChange} />
      </div>

      <div className={styles.filtersRow}>
        {/* Фильтры отображаются только после загрузки данных */}
        {!loadingCategories && categories.length > 0 && (
          <TypeFilter
            categories={categories}
            selectedType={urlType || null}
            onChange={(newType) => updateFilters({ type: newType || "" })}
          />
        )}

        {!loadingTags && availableTags.length > 0 && (
          <TagsFilter
            tags={availableTags}
            selectedTags={urlTags}
            onChange={handleTagsChange}
          />
        )}
      </div>

      {/* Результаты */}
      {isEmpty ? (
        <div className={styles.empty} role="status" aria-live="polite">
          {t("projects.empty", "Проекты не найдены")}
        </div>
      ) : (
        <>
          <ProjectsList projects={projectsData?.items || []} />

          {/* Пагинация */}
          {totalPages > 1 && (
            <nav className={styles.pagination} 
            aria-label={t("pagination.label", "Пагинация проектов")}>
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className={styles.paginationButton}
                aria-label={t("pagination.previous", "Предыдущая страница")}
                aria-disabled={page === 1}
              >
                {"<"}
              </button>

              <div className={styles.pageNumbers}>
                {Array.from(
                  {
                    length: Math.min(4, totalPages - page + 1),
                  },
                  (_, i) => page + i,
                ).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`${styles.paginationButton} ${
                      pageNum === page ? styles.active : ""
                    }`}
                    aria-label={t("pagination.page", "Страница {{page}}", { page: pageNum })}
                    aria-current={pageNum === page ? "page" : undefined}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(page + 1)}
                disabled={!projectsData?.pagination.isNext}
                className={styles.paginationButton}
                aria-label={t("pagination.next", "Следующая страница")}
                aria-disabled={!projectsData?.pagination.isNext}
              >
                {">"}
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
