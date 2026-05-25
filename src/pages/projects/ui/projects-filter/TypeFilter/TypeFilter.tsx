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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие дропдауна при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // При клике на пункт (как в мобильной, так и в десктопной версии)
  const handleSelect = (categoryId: string) => {
    if (categoryId === "all") {
      onChange(null);
    } else {
      onChange(categoryId);
    }
    // setIsOpen(false); // Закрываем дропдаун после выбора (раскомментировать если нужно)
  };

  const isActive = (categoryId: string) => {
    if (categoryId === "all") {
      return !selectedType;
    }
    return selectedType === categoryId;
  };

  return (
    <>
      {/* DESKTOP */}
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

      {/* MOBILE */}
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

        <div
          className={`${styles.dropdown} ${
            isOpen ? styles.dropdownOpen : ""}`}
        >
          <div className={styles.dropdownList}>
            {/* Все проекты */}
            <button
              type="button"
              className={`${styles.mobileItem} ${
                isActive("all") ? styles.active : ""
              }`}
              onClick={() => handleSelect("all")}
            >
              Все проекты
            </button>

            {/* Остальные категории */}
            {categories
              .filter((category) => category.id !== "all")
              .map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`${styles.mobileItem} ${
                    isActive(category.id) ? styles.active : ""
                  }`}
                  onClick={() => handleSelect(category.id)}
                >
                  {category.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};