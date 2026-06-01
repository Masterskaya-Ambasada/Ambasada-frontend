import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import type { Category } from "@entities/project/model/types";
import styles from "./TypeFilter.module.css";

interface ITypeFilterProps {
  categories: Category[];
  selectedType: string | null;
  onChange: (typeId: string | null) => void;
}

const ALL_ID = "all";

export const TypeFilter: React.FC<ITypeFilterProps> = ({
  categories,
  selectedType,
  onChange,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Фильтруем категории, убирая "Все" если она есть в массиве
  const filteredCategories = categories.filter(cat => cat.id !== ALL_ID && cat.name !== "Все");

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
    if (categoryId === ALL_ID) {
      onChange(null);
    } else {
      onChange(categoryId);
    }
    setIsOpen(false);
  };

  const isActive = (categoryId: string) => {
    if (categoryId === ALL_ID) {
      return !selectedType;
    }
    return selectedType === categoryId;
  };

  return (
    <>
      {/* DESKTOP & TABLET */}
      <div className={styles.container}>
        {/*Все */}
        <button
          key={ALL_ID}
          type="button"
          className={`${styles.button} ${
            isActive(ALL_ID) ? styles.active : ""
          }`}
          onClick={() => handleSelect(ALL_ID)}
        >
          {t("projects.allProjects", "Все")}
        </button>
        {/* Остальные категории */}
        {filteredCategories.map((category) => (
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
          onClick={() => setIsOpen((prev) => !prev)}
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
          className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`}
        >
          <div className={styles.dropdownList}>
            {/* Все проекты */}
            <button
              type="button"
              className={`${styles.mobileItem} ${
                isActive(ALL_ID) ? styles.active : ""
              }`}
              onClick={() => handleSelect(ALL_ID)}
            >
              {t("projects.allProjects", "Все проекты")}
            </button>

            {/* Остальные категории */}
            {filteredCategories.map((category) => (
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
