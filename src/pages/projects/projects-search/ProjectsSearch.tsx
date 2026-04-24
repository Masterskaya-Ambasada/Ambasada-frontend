import React, { useState, useEffect, useRef } from "react";
import styles from "./ProjectsSearch.module.css";

interface ProjectsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProjectsSearch: React.FC<ProjectsSearchProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  const abortControllerRef = useRef<AbortController | null>(null);

  const MAX_LENGTH = 50;
  const DEBOUNCE_DELAY = 500;

  // Синхронизация с внешним значением (когда URL меняется через браузер)
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Debounce: обновляем URL с задержкой 500мс после остановки ввода
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [inputValue, value, onChange]);

  // Функция отмены предыдущего API-запроса
  const cancelPreviousRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  // Обработчик изменения ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, MAX_LENGTH);
    setInputValue(newValue);
    cancelPreviousRequest(); // Отменяем предыдущий запрос при новом вводе
  };

  const handleClear = () => {
    setInputValue("");
    onChange("");
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