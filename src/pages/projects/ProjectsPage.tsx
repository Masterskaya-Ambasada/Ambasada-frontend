import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import { useViewportWidth } from "@shared/lib/useWidthViewPort";
import { useTranslation } from "react-i18next";
import { ProjectsSearch } from "./ui/projects-search/ProjectsSearch";
import { ProjectsList } from "./ui/projects-list/ProjectsList";
import { TypeFilter } from "./ui/projects-filter/TypeFilter/TypeFilter";
import { TagsFilter } from "./ui/projects-filter/TagsFilter/TagsFilter";
import { ContactSection } from "@widgets/contact-section";
import styles from "./ProjectsPage.module.css";
import { useGetProjectsData } from "./hooks/useGetProjectsData";
import { useSearchString } from "./hooks/useSearchString";
import { useRestoreFilters } from "./hooks/useRestoreFilters";
import { useProjectsLoading } from "./hooks/useProjectsLoading";

export const ProjectsPage: React.FC = () => {
  const { t } = useTranslation("common");
  const { isMobile } = useViewportWidth();

  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);

  //хук для получения всех данных
  const {
    projects,
    categories,
    availableTags,
    loading,
    error,
    filters,
    updateFilters,
    pagination,
  } = useGetProjectsData();

  // Хук для отслеживания загрузки
  const { isFetching } = useProjectsLoading();

  // Хук для управления поиском
  const { localSearch, setLocalSearch, isSearchOpen, setIsSearchOpen } =
    useSearchString();

  //Хук для восстановления фильтров
  const { isRestoring } = useRestoreFilters();

  // Скрытие элементов в мобильной версии при открытом поиске
  const shouldHideTitle = isMobile && isSearchOpen;
  const shouldHideFilters = isMobile && isSearchOpen;

  // Показываем лоадер
  if (isRestoring || loading) {
    return (
      <div className={styles.loader} role="status" aria-live="polite">
        {t("projects.loading", "Загрузка...")}
      </div>
    );
  }

  // Обработка ошибок
  if (error) {
    return (
      <div className={styles.error} role="alert" aria-live="assertive">
        {t("projects.error", "Произошла ошибка при загрузке данных")}
      </div>
    );
  }

  // Проверка на пустые результаты
  const isEmpty = !loading && projects.length === 0;

  return (
    <div>
      <div className={styles.container}>
        {/* Хлебные крошки */}
        <nav className={styles.breadcrumbs} aria-label="Навигация">
          <Link to={routesPaths.home} className={styles.breadcrumbLink}>
            {t("navigation.home", "Главная")}
          </Link>
          <span className={styles.breadcrumbSeparator}>{" > "}</span>
          <Link to={routesPaths.projects} className={styles.breadcrumbLink}>
            {t("navigation.projects", "Каталог проектов")}
          </Link>
        </nav>

        {/* Заголовок и поиск */}
        <div className={styles.headerRow}>
          {!shouldHideTitle && (
            <h1 className={styles.title}>{t("projects.title", "Проекты")}</h1>
          )}

          <ProjectsSearch
            value={localSearch}
            onChange={setLocalSearch}
            isOpen={isSearchOpen}
            onOpenChange={setIsSearchOpen}
          />
        </div>

        {/* Фильтры */}
        {!shouldHideFilters && (
          <div className={styles.filtersRow}>
            {categories.length > 0 && (
              <TypeFilter
                categories={categories}
                selectedType={filters.type || null}
                onChange={(newType) => updateFilters({ type: newType || "" })}
              />
            )}

            {availableTags.length > 0 && (
              <TagsFilter
                tags={availableTags}
                selectedTags={filters.tags}
                onChange={(newTags) => updateFilters({ tags: newTags })}
                isOpen={isTagsDropdownOpen}
                onOpenChange={setIsTagsDropdownOpen}
              />
            )}
          </div>
        )}

        {isFetching && <div className={styles.fetchingBar} />}

        {/* Результаты */}
        {isEmpty ? (
          <div className={styles.empty} role="status" aria-live="polite">
            {t("projects.empty", "Проекты не найдены")}
          </div>
        ) : (
          <>
            <ProjectsList projects={projects} currentFilters={filters} />

            {/* Пагинация */}
            {pagination.totalPages >= 1 && (
              <nav
                className={styles.pagination}
                aria-label={t("pagination.label", "Пагинация проектов")}
              >
                <button
                  onClick={pagination.goToPrev}
                  disabled={!pagination.hasPrev}
                  className={styles.paginationButton}
                  aria-label={t("pagination.previous", "Предыдущая страница")}
                  aria-disabled={!pagination.hasPrev}
                >
                  {"<"}
                </button>

                <div className={styles.pageNumbers}>
                  {pagination.visiblePages.map((item, index) =>
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
                        onClick={() => pagination.goToPage(item as number)}
                        className={`${styles.paginationButton} ${
                          item === pagination.currentPage ? styles.active : ""
                        }`}
                        aria-label={t("pagination.page", "Страница {{page}}", {
                          page: item,
                        })}
                        aria-current={
                          item === pagination.currentPage ? "page" : undefined
                        }
                      >
                        {item}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={pagination.goToNext}
                  disabled={!pagination.hasNext}
                  className={styles.paginationButton}
                  aria-label={t("pagination.next", "Следующая страница")}
                  aria-disabled={!pagination.hasNext}
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
