import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import { useUrlFilters } from "./hooks/useUrlFilters";
import { ProjectsSearch } from "./ui/projects-search/ProjectsSearch";
import styles from "./ProjectsPage.module.css";

export const ProjectsPage: React.FC = () => {
  // Хук на уровне страницы
  // Вся магия здесь: работа с URL, debounce, запросы
  const { search: urlSearch, updateFilters } = useUrlFilters();

  // Локальное состояние для debounce
  const [localSearch, setLocalSearch] = useState(urlSearch);
  const debounceTimerRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Debounce: обновляем URL после паузы ввода
  const debouncedUpdate = useCallback((value: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      updateFilters({ search: value });
      debounceTimerRef.current = null;
    }, 500);
  }, [updateFilters]);

  // Обработчик изменения поиска
  const handleSearchChange = useCallback((value: string) => {
    setLocalSearch(value);
    debouncedUpdate(value);
    
    // Отмена предыдущего API запроса
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
  }, [debouncedUpdate]);

  // Синхронизация с URL (когда URL меняется извне, например, кнопка "Назад")
  useEffect(() => {
    if (urlSearch !== localSearch) {
      setLocalSearch(urlSearch);
    }
  }, [urlSearch]);

  return (
    <div className={styles.projectsList}>
      <h1>Проекты</h1>

      <ProjectsSearch
        value={localSearch}
        onChange={handleSearchChange}
      />

      <Link to={routesPaths.home}>На главную</Link>
    </div>
  );
};

export default ProjectsPage;
