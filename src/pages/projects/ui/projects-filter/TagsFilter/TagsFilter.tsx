import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./TagsFilter.module.css";

export type Tag = {
  id: string;
  name: string;
};

interface ITagsFilterProps {
  tags: Tag[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export const TagsFilter: React.FC<ITagsFilterProps> = ({
  tags,
  selectedTags,
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

  // Обработка клика по тегу
  const handleTagClick = (tagId: string) => {
    // Если тег уже выбран, удаляем его из списка
    if (selectedTags.includes(tagId)) {
      onChange(selectedTags.filter((id) => id !== tagId));
      // Иначе добавляем его в список выбранных тегов
    } else {
      onChange([...selectedTags, tagId]);
    }
    // setIsOpen(false) Не закрываем дропдаун после выбора
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* ДЕСКТОП И ПЛАНШЕТ - кнопка с иконкой + дропдаун */}
      <div className={styles.container} ref={dropdownRef}>
        <button
          type="button"
          className={styles.filterTrigger}
          onClick={toggleDropdown}
          aria-label={t("projects.filterByTags", "Фильтр по тегам")}
          aria-expanded={isOpen}
        >
          <img
            src="/mage_filter-fill.svg"
            alt=""
            className={styles.filterIcon}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <div className={styles.dropdown}>
            <span className={styles.dropdownTitle}>Сортировка по тегам:</span>
            <div className={styles.dropdownList}>
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  className={`${styles.dropdownItem} ${
                    selectedTags.includes(tag.id) ? styles.active : ""
                  }`}
                  onClick={() => handleTagClick(tag.id)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
            {/* Кнопка "Свернуть теги" */}
              <button
                type="button"
                className={styles.collapseButton}
                onClick={() => setIsOpen(false)}
              >
                Свернуть теги
              </button>
          </div>
        )}
      </div>

      {/* МОБИЛКА - горизонтальная скролл-лента с кнопками тегов */}
      <div className={styles.mobileScrollContainer}>
        <div className={styles.tagsScroll}>
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              className={`${styles.mobileTagButton} ${
                selectedTags.includes(tag.id) ? styles.active : ""
              }`}
              onClick={() => handleTagClick(tag.id)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
