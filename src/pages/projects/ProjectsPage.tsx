import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import { useUrlFilters } from "./hooks/useUrlFilters";
import { ProjectsSearch } from "./ui/projects-search/ProjectsSearch";
import { ProjectsList } from "./ui/projects-list/ProjectsList";
import styles from "./ProjectsPage.module.css";
import { apiClient } from "@shared/api/client";

// Тип данных с сервера
type ProjectsResponse = {
  items: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    action_button: {
      label: string;
      link: string;
    };
  }>;
  pagination: {
    totalItems: number;// Всего проектов на сервере
    offset: number;
    limit: number;
    isNext: boolean;
  };
};

export const ProjectsPage: React.FC = () => {
  // Состояние для данных с сервера
  const [projectsData, setProjectsData] = useState<ProjectsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Состояние для "Показать все"
  const [showAll, setShowAll] = useState(false);

  // Адаптивный лимит в зависимости от экрана и showAll
  const [limit, setLimit] = useState(4);// По умолчанию показываем 4 для декстопа

  // Хук на уровне страницы
  // Вся магия здесь: работа с URL, debounce, запросы
  const { search: urlSearch, updateFilters } = useUrlFilters();

  // Локальное состояние для debounce
  const [localSearch, setLocalSearch] = useState(urlSearch);
  const debounceTimerRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Загрузка данных с сервера 
  useEffect(() => {
    async function getProjects() {
      try {
        setLoading(true);
        const res = await apiClient.get<ProjectsResponse>("/api/v1/projects");
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

  // Обновление лимита при изменении размера экрана или showAll
  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;
      
      if (showAll) {
        // Показываем все проекты (максимум 12)
        setLimit(12);
      } else {
        // Превью режим: зависит от ширины экрана
        if (width >= 1024) {
          setLimit(4);  // Десктоп: 4 проекта
        } else if (width >= 768) {
          setLimit(3);  // Планшет: 3 проекта
        } else {
          setLimit(3);  // Мобильный: 3 проекта
        }
      }
    };

    updateLimit();
    window.addEventListener('resize', updateLimit);
    return () => window.removeEventListener('resize', updateLimit);
  }, [showAll]);

  // Debounce: обновляем URL после паузы ввода
  const debouncedUpdate = useCallback(
    (value: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        updateFilters({ search: value });
        debounceTimerRef.current = null;
      }, 500);
    },
    [updateFilters],
  );

  // Обработчик изменения поиска
  const handleSearchChange = useCallback(
    (value: string) => {
      setLocalSearch(value);
      debouncedUpdate(value);

      // Отмена предыдущего API запроса
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
    },
    [debouncedUpdate],
  );

  // Синхронизация с URL (когда URL меняется извне, например, кнопка "Назад")
  useEffect(() => {
    if (urlSearch !== localSearch) {
      setLocalSearch(urlSearch);
    }
  }, [urlSearch]);

  // Пока загружаются данные - ничего не рендерим 
  if (loading || !projectsData) {
    return null;
  }

 const projects = projectsData.items;
  const totalProjects = projects.length;
  const hasMoreProjects = totalProjects > limit && !showAll;

  return (
    <div className={styles.projectsList}>
      <h1>Проекты</h1>
      <ProjectsList projects={projects.slice(0, limit)} />

      <ProjectsSearch value={localSearch} onChange={handleSearchChange} />

      <Link to={routesPaths.home}>На главную</Link>
    </div>
  );
};

export default ProjectsPage;