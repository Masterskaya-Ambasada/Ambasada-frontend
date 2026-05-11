import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./TypeFilter.module.css";

export type Category = {
  id: string;
  name: string;
};

interface ITypeFilterProps {
  categories: Category[];
  selectedType: string | null;
  onChange: (typeId: string | null) => void;
}

export const TypeFilter: React.FC<ITypeFilterProps> = ({
  categories,
  selectedType,
  onChange,
}) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Проверка на мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 833);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => 
      window.removeEventListener("resize", checkMobile);
  }, []);

  // Закрытие дропдауна при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current 
        && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => 
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  
  // При клике на пункт (как в мобильной, так и в десктопной версии)
  const handleSelect = (categoryId: string) => {
    if (categoryId === "all") {
      onChange(null);
    } else {
      onChange(categoryId);
    }
    setIsOpen(false);
  };

  const isActive = (categoryId: string) => {
    if (categoryId === "all") {
      return !selectedType;
    }
    return selectedType === categoryId;
  };

  // Десктопная версия (горизонтальные кнопки с разделителем | )
  if (!isMobile) {
    return (
      <div className={styles.container}>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`${styles.button} ${
              isActive(category.id) ? styles.active : ""
            }`}
            onClick={() => handleSelect(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    );
  }

  // Мобильная версия (выпадающий список справа)
  return (
    <div className={styles.mobileContainer} ref={dropdownRef}>
      <button
        type="button"
        className={styles.filterTrigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("projects.filterByType", "Фильтр по типу")}
        aria-expanded={isOpen}
      >
        <img 
          src="/lsicon_sort-filter-filled.svg"
          alt=""
          className={styles.filterIcon}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <span className={styles.dropdownTitle}>
              {t("projects.filterByType", "Выбрать тип")}
            </span>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label={t("common.close", "Закрыть")}
            >
              ✕
            </button>
          </div>
          <div className={styles.dropdownList}>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`${styles.mobileItem} ${
                  isActive(category.id) ? styles.active : ""
                }`}
                onClick={() => handleSelect(category.id)}
              >
                {category.name}
                {isActive(category.id) && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};