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
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Единый список тегов
  const renderTagsList = () => (
    <ul className={styles.tagsList}>
      {tags.map((tag) => (
        <li key={tag.id} className={styles.tagItem}>
          <button
            type="button"
            className={`${styles.tagButton} ${
              selectedTags.includes(tag.id) ? styles.active : ""
            }`}
            onClick={() => handleTagClick(tag.id)}
            aria-pressed={selectedTags.includes(tag.id)}
            aria-label={t(
              "projects.filterByTag",
              "Фильтр по тегу {{tagName}}",
              {
                tagName: tag.name,
              },
            )}
          >
            {tag.name}
          </button>
        </li>
      ))}
    </ul>
  );

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
          <div
            className={styles.dropdown}
            role="group"
            aria-label={t(
              "projects.filterTagsDialog",
              "Выбор тегов для фильтрации",
            )}
          >
            <span className={styles.dropdownTitle} id="dropdown-title">
              {t("projects.sortByTags", "Сортировка по тегам:")}
            </span>
            {renderTagsList()}
            {/* Кнопка "Свернуть теги" */}
            <button
              type="button"
              className={styles.collapseButton}
              onClick={() => setIsOpen(false)}
              aria-label={t("projects.collapseTags", "Свернуть теги")}
            >
              {t("projects.collapseTags", "Свернуть теги")}
            </button>
          </div>
        )}
      </div>

      {/* МОБИЛКА - горизонтальная скролл-лента с тегами */}
      <div
        className={styles.mobileScrollContainer}
        role="region"
        aria-label={t("projects.tagsList", "Список тегов для фильтрации")}
      >
        <div className={styles.tagsScroll}>{renderTagsList()}</div>
      </div>
    </>
  );
};
