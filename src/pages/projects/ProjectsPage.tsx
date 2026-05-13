import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import { useUrlFilters } from "./hooks/useUrlFilters";
import { ProjectsSearch } from "./ui/projects-search/ProjectsSearch";
import { ProjectsList } from "./ui/projects-list/ProjectsList";
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
  // Состояния для данных, загрузки, пагинации и поиска
  const [projectsData, setProjectsData] = useState<ProjectsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);// сколько проектов на странице
  const [itemsPerPage, setItemsPerPage] = useState(12);// по умолчанию для десктопа
  
  //хук для синхронизации строки поиска с URL и обновления фильтров
  const { search: urlSearch, updateFilters } = useUrlFilters();
  const [localSearch, setLocalSearch] = useState(urlSearch);
  const debounceTimerRef = useRef<number | null>(null);


  // Адаптивное количество проектов на странице
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      // На десктопе 12, на планшете и мобилке 6
      const newItemsPerPage = width >= 834 ? 12 : 6;
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1); // Сброс на первую страницу при изменении
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Загрузка данных с сервера (простая версия)
useEffect(() => {
  async function getProjects() {
    try {
      setLoading(true);
      const res = await apiClient.get<ProjectsResponse>("/projects");
      console.log("Projects data:", res);
      setProjectsData(res);
    } catch (err) {
      console.log("Ошибка загрузки проектов:", err);
    } finally {
      setLoading(false);
    }
  }

  getProjects();
}, []);

  // Debounce: обновляем URL после паузы ввода
  const debouncedUpdate = useCallback(
    (value: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = window.setTimeout(() => {
      updateFilters({ search: value });
      setCurrentPage(1); // Сброс на первую страницу при поиске
      debounceTimerRef.current = null;
    }, 500);
  }, [updateFilters]);

  // Обработка изменения строки поиска
  const handleSearchChange = useCallback(
    (value: string) => {
    setLocalSearch(value);
    debouncedUpdate(value);
  }, [debouncedUpdate]);

  // Синхронизация с URL (когда URL меняется извне, например, кнопка "Назад")
  useEffect(() => {
    if (urlSearch !== localSearch) {
      setLocalSearch(urlSearch);
    }
  }, [urlSearch]);

  // Получение текущих проектов для пагинации
  const getCurrentPageItems = () => {
    if (!projectsData?.items) return [];
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return projectsData.items.slice(startIndex, endIndex);
  };

  // Пагинация - вперед
  const goToNextPage = () => {
    const totalPages = Math.ceil((projectsData?.items.length || 0) / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Пагинация - назад
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

   // Пока загружаются данные - ничего не рендерим 
  if (loading && !projectsData) {
    return <div className={styles.loader}>Загрузка...</div>;
  }

  const currentItems = getCurrentPageItems();// проекты для текущей страницы
  const totalItems = projectsData?.items.length || 0;// общее количество проектов
  const totalPages = Math.ceil(totalItems / itemsPerPage);// общее количество страниц

  return (
    <div className={styles.projectsList}>
      <h1>Проекты</h1>

      <ProjectsSearch
        value={localSearch}
        onChange={handleSearchChange}
      />
            <ProjectsList projects={currentItems} />

          {/* Пагинация */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={styles.paginationButton}
                aria-label="Предыдущая страница"
              >
                ← Назад
              </button>
              
              <span className={styles.pageInfo}>
                Страница {currentPage} из {totalPages}
              </span>
              
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={styles.paginationButton}
                aria-label="Следующая страница"
              >
                Вперед →
              </button>
            </div>
          )}
        
    

      <Link to={routesPaths.home} className={styles.homeLink}>
        На главную
      </Link>
    </div>
  );
};

export default ProjectsPage;