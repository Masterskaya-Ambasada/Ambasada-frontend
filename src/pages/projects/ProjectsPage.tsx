import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import { useUrlFilters } from "./hooks/useUrlFilters";
import { useViewportWidth } from "@shared/lib/useWidthViewPort";
import { useTranslation } from "react-i18next";
import { ProjectsSearch } from "./ui/projects-search/ProjectsSearch";
import { ProjectsList } from "./ui/projects-list/ProjectsList";
import { TypeFilter } from "./ui/projects-filter/TypeFilter/TypeFilter";
import { TagsFilter } from "./ui/projects-filter/TagsFilter/TagsFilter";
import { ContactSection } from "@widgets/contact-section";
import styles from "./ProjectsPage.module.css";
import { useProjectsQuery } from "@entities/project/model/useProjectsQuery";
import { useCategoriesQuery } from "@entities/project/model/useCategoriesQuery";
import { useTagsQuery } from "@entities/project/model/useTagsQuery";

export const ProjectsPage: React.FC = () => {
  const { t } = useTranslation("common");
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [isRestoring, setIsRestoring] = useState(true);

  const {
    search: urlSearch,
    type: urlType,
    tags: urlTags,
    updateFilters,
  } = useUrlFilters();

  const [localSearch, setLocalSearch] = useState(urlSearch);

  const { isMobile, isTablet } = useViewportWidth();

  // адаптивное количество проектов на странице
  const isMobileOrTablet = isMobile || isTablet;

  useEffect(() => {
    const newLimit = isMobileOrTablet ? 6 : 12;
    if (newLimit !== limit) {
      setLimit(newLimit);
      setPage(1);
    }
  }, [isMobileOrTablet, limit]);

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
    tag: urlTags,
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
    setLocalSearch(urlSearch);
  }, [urlSearch]);

  const handleTagsChange = useCallback(
    (newTags: string[]) => {
      updateFilters({ tags: newTags });
    },
    [updateFilters],
  );

  // для восстановления фильтров ДО рендера
  useLayoutEffect(() => {
    const state = location.state as {
      fromProjects?: { search?: string; type?: string; tags?: string[] };
    } | null;

    if (state?.fromProjects) {
      const { search = "", type = "", tags = [] } = state.fromProjects;
      updateFilters({ search, type, tags });
      window.history.replaceState({}, document.title);
    }
    setIsRestoring(false);
  }, []);

  if (isRestoring) {
    return (
      <div className={styles.loader} role="status" aria-live="polite">
        {t("projects.loading", "Загрузка...")}
      </div>
    );
  }

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

  const isPageLoading = loadingProjects || loadingCategories || loadingTags;

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
      <div className={styles.loader} role="status" aria-live="polite">
        {t("projects.loading", "Загрузка...")}
      </div>
    );
  }

  // Проверка на пустые результаты после загрузки
  const isEmpty = !isPageLoading && projectsData?.items.length === 0;

  // Логика отображения номеров страниц для пагинации
  const visiblePages: (number | string)[] = [];

  if (totalPages <= 4) {
    visiblePages.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
  } else {
    const pages = [page, page + 1, page + 2].filter((p) => p <= totalPages);

    // первая страница
    visiblePages.push(1);

    // многоточие после первой
    if (pages[0] > 2) {
      visiblePages.push("...");
    }

    // текущая и две следующие
    pages.forEach((p) => {
      if (p !== 1 && p !== totalPages) {
        visiblePages.push(p);
      }
    });

    // многоточие перед последней
    const lastVisiblePage = pages[pages.length - 1];

    if (lastVisiblePage < totalPages - 1) {
      visiblePages.push("...");
    }

    // последняя страница
    visiblePages.push(totalPages);
  }

  return (
    <div>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Навигация">
          <Link to={routesPaths.home} className={styles.breadcrumbLink}>
            {t("navigation.home", "Главная")}
          </Link>

          <span className={styles.breadcrumbSeparator}>{" > "}</span>

          <Link to={routesPaths.projects} className={styles.breadcrumbLink}>
            {t("navigation.projects", "Каталог проектов")}
          </Link>
        </nav>

        <div className={styles.headerRow}>
          <h1 className={styles.title}>{t("projects.title", "Проекты")}</h1>

          <ProjectsSearch value={localSearch} onChange={setLocalSearch} />
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
          <div className={styles.fetching} role="status" aria-live="polite">
            {t("projects.loading", "Загрузка...")}
          </div>
        )}

        {isEmpty ? (
          <div className={styles.empty} role="status" aria-live="polite">
            {t("projects.empty", "Проекты не найдены")}
          </div>
        ) : (
          <>
            <ProjectsList
              projects={projectsData?.items || []}
              currentFilters={{
                search: urlSearch,
                type: urlType,
                tags: urlTags,
              }}
            />

            {/* Пагинация */}
            {totalPages >= 1 && (
              <nav
                className={styles.pagination}
                aria-label={t("pagination.label", "Пагинация проектов")}
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
                  {visiblePages.map((item, index) =>
                    item === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className={styles.ellipsis}
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={item}
                        onClick={() => goToPage(item as number)}
                        className={`${styles.paginationButton} ${
                          item === page ? styles.active : ""
                        }`}
                        aria-label={t("pagination.page", "Страница {{page}}", {
                          page: item,
                        })}
                        aria-current={item === page ? "page" : undefined}
                      >
                        {item}
                      </button>
                    ),
                  )}
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
      <ContactSection />
    </div>
  );
};

export default ProjectsPage;
