import React, { useState, useEffect, useRef, useCallback } from "react";
import { useUrlFilters } from "../../hooks/useUrlFilters";
import styles from "./ProjectsSearch.module.css";

interface ProjectsSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  debounceDelay?: number;
}

export const ProjectsSearch: React.FC<ProjectsSearchProps> = ({
  value: externalValue,
  onChange: externalOnChange,
  debounceDelay = 500,
}) => {
  const isControlled = externalValue !== undefined && externalOnChange !== undefined;
  
  const { search: urlSearch, updateFilters } = useUrlFilters();
  
  const [inputValue, setInputValue] = useState(
    isControlled ? externalValue : urlSearch
  );
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const MAX_LENGTH = 50;

  useEffect(() => {
    if (isControlled) {
      setInputValue(externalValue);
    }
  }, [externalValue, isControlled]);

  // Функция обновления значения (работает в обоих режимах)
  const updateValue = useCallback(
    (newValue: string) => {
      if (isControlled) {
        externalOnChange(newValue);
      } else {
        updateFilters({ search: newValue });
      }
    },
    [isControlled, externalOnChange, updateFilters]
  );

  // Debounce: обновляем с задержкой после остановки ввода
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== (isControlled ? externalValue : urlSearch)) {
        updateValue(inputValue);
      }
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [inputValue, externalValue, urlSearch, isControlled, updateValue, debounceDelay]);

  // Отмена предыдущего запроса при новом вводе
  const cancelPreviousRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Обработчик изменения ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // Ограничение длины
    if (newValue.length > MAX_LENGTH) {
      newValue = newValue.slice(0, MAX_LENGTH);
    }
    
    setInputValue(newValue);
    cancelPreviousRequest();
  };

  // Очистка поля
  const handleClear = () => {
    setInputValue("");
    updateValue("");
    cancelPreviousRequest();
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <img
          src="/Watch all.svg"
          alt=""
          className={styles.searchIcon}
          aria-hidden="true"
        />

        <input
          type="text"
          className={styles.searchInput}
          placeholder="Поиск"
          value={inputValue}
          onChange={handleInputChange}
          maxLength={MAX_LENGTH}
          aria-label="Поиск проектов"
        />

        {inputValue && (
          <button
            className={styles.searchClear}
            onClick={handleClear}
            aria-label="Очистить"
            type="button"
          >
            <span className={styles.clearIcon}></span>
          </button>
        )}
      </div>
    </div>
  );
};