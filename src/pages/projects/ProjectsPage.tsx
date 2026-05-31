import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import { useUrlFilters } from "./hooks/useUrlFilters";
import { useViewportWidth } from "@shared/lib/useWidthViewPort";
import { useTranslation } from "react-i18next";
import { ProjectsSearch } from "./ui/projects-search/ProjectsSearch";
import { ProjectsList } from "./ui/projects-list/ProjectsList";
import { TypeFilter } from "./ui/projects-filter/TypeFilter/TypeFilter";
import { TagsFilter } from "./ui/projects-filter/TagsFilter/TagsFilter";
import styles from "./ProjectsPage.module.css";
import { useProjectsQuery } from "@entities/project/model/useProjectsQuery";
import { useCategoriesQuery } from "@entities/project/model/useCategoriesQuery";
import { useTagsQuery } from "@entities/project/model/useTagsQuery";




export const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const {
    search: urlSearch,
    type: urlType,
    tags: urlTags,
    updateFilters,
  } = useUrlFilters();

  const [localSearch, setLocalSearch] = useState(urlSearch);

  const { isMobile, isTablet } = useViewportWidth();

  // адаптивное количество проектов на странице
  useEffect(() => {
    const isMobileOrTablet = isMobile || isTablet;

    setLimit(isMobileOrTablet ? 6 : 12);
    setPage(1);
  }, [isMobile, isTablet]);

  // Категории для фильтрации
  const {
    data: categories = [],
    isLoading: loadingCategories,
    error: categoriesError,
  } = useCategoriesQuery();

  // Теги для фильтрации
  const {
    data: availableTags = [],
    isLoading: loadingTags,
    error: tagsError,
  } = useTagsQuery();

  // Получение проектов с учетом фильтров и пагинации
  const {
    data: projectsData,
    isLoading: loadingProjects,
    isFetching,
    error: projectsError,
  } = useProjectsQuery({
    limit,
    offset: (page - 1) * limit,
    search: urlSearch,
    type: urlType,
    tags: urlTags,
  });

  // сброс страницы при изменении фильтров
  useEffect(() => {
    setPage(1);
  }, [urlSearch, urlType, urlTags, limit]);

  //  debounce для локального поиска
  useEffect(() => {
    const timer = window.setTimeout(() => {
      updateFilters({ search: localSearch });
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, updateFilters]);

  //  синхронизация URL и локального поиска
  useEffect(() => {
    if (urlSearch !== localSearch) {
      setLocalSearch(urlSearch);
    }
  }, [urlSearch]);

  const handleTagsChange = useCallback(
    (newTags: string[]) => {
      updateFilters({ tags: newTags });
    },
    [updateFilters],
  );

  const totalItems = projectsData?.pagination.totalItems || 0;
  const totalPages = Math.ceil(totalItems / limit);

  // Универсальная функция пагинации
  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const isPageLoading =
    loadingProjects || loadingCategories || loadingTags;

    // Обработка ошибок
  if (categoriesError || tagsError || projectsError) {
    return (
      <div className={styles.error} role="alert" aria-live="assertive">
        {t("projects.error", "Произошла ошибка при загрузке данных")}
      </div>
    );
  }

   // Единый loader для всех состояний загрузки
  if (isPageLoading && !projectsData) {
    return (
      <div className={styles.loader}role="status" aria-live="polite">
        {t("projects.loading", "Загрузка...")}
      </div>
    );
  }

  // Проверка на пустые результаты после загрузки
  const isEmpty =
    !isPageLoading && projectsData?.items.length === 0;

  return (
    <div className={styles.container}>
      <nav
        className={styles.breadcrumbs}
        aria-label="Навигация"
      >
        <Link
          to={routesPaths.home}
          className={styles.breadcrumbLink}
        >
          {t("navigation.home", "Главная")}
        </Link>

        <span className={styles.breadcrumbSeparator}>
          {" > "}
        </span>

        <Link
          to={routesPaths.projects}
          className={styles.breadcrumbLink}
        >
          {t("navigation.projects", "Каталог проектов")}
        </Link>
      </nav>

      <div className={styles.headerRow}>
        <h1 className={styles.title}>
          {t("projects.title", "Проекты")}
        </h1>

        <ProjectsSearch
          value={localSearch}
          onChange={setLocalSearch}
        />
      </div>

      <div className={styles.filtersRow}>
         {/* Фильтры отображаются только после загрузки данных */}
        {!loadingCategories && categories.length > 0 && (
          <TypeFilter
            categories={categories}
            selectedType={urlType || null}
            onChange={(newType) =>
              updateFilters({
                type: newType || "",
              })
            }
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
      {isFetching && (
        <div className={styles.fetching} 
        role="status" aria-live="polite">
          {t("projects.loading", "Обновление...")}
        </div>
      )}

      {isEmpty ? (
        <div className={styles.empty}
        role="status" aria-live="polite">
          {t(
            "projects.empty",
            "Проекты не найдены",
          )}
        </div>
      ) : (
        <>
          <ProjectsList
            projects={projectsData?.items || []}
          />

          {/* Пагинация */}
          {totalPages > 1 && (
            <nav
              className={styles.pagination}
              aria-label={t(
                "pagination.label",
                "Пагинация проектов",
              )}
            >
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
                    length: Math.min(
                      4,
                      totalPages - page + 1,
                    ),
                  },
                  (_, i) => page + i,
                ).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`${styles.paginationButton} ${
                      pageNum === page
                        ? styles.active
                        : ""
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
                disabled={
                  !projectsData?.pagination.isNext
                }
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