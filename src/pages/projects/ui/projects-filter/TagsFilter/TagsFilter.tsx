import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { Tag } from "@entities/project/model/types";
import { useViewportWidth } from "@shared/lib/useWidthViewPort";
import styles from "./TagsFilter.module.css";

interface ITagsFilterProps {
  tags: Tag[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TagsFilter: React.FC<ITagsFilterProps> = ({
  tags,
  selectedTags,
  onChange,
  isOpen,
  onOpenChange,
}) => {
  const { t } = useTranslation("common");
  const { isMobile } = useViewportWidth();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedCount = selectedTags.length;
  const hasSelected = selectedCount > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        onOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  const handleTagClick = useCallback(
    (tagId: string) => {
      if (selectedTags.includes(tagId)) {
        onChange(selectedTags.filter((id) => id !== tagId));
      } else {
        onChange([...selectedTags, tagId]);
      }
    },
    [selectedTags, onChange],
  );

  const resetTags = useCallback(() => {
    onChange([]);
  }, [onChange]);

  const toggleDropdown = useCallback(() => {
    onOpenChange(!isOpen);
  }, [isOpen, onOpenChange]);

  const closeDropdown = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  // Сортировка тегов только для мобильной версии
  const sortedTags = useMemo(() => {
    // Если не мобильная версия - возвращаем теги без сортировки
    if (!isMobile) {
      return tags;
    }

    // Для мобильной версии - сортируем, выбранные в начало
    return [...tags].sort((a, b) => {
      const aSelected = selectedTags.includes(a.id);
      const bSelected = selectedTags.includes(b.id);

      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });
  }, [tags, selectedTags, isMobile]);

  const renderTagsList = () => (
    <ul className={styles.tagsList}>
      {sortedTags.map((tag) => {
        const isSelected = selectedTags.includes(tag.id);

        return (
          <li key={tag.id} className={styles.tagItem}>
            <button
              type="button"
              className={`${styles.tagButton} ${
                isSelected ? styles.active : ""
              }`}
              onClick={() => handleTagClick(tag.id)}
              aria-pressed={isSelected}
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
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop + Tablet */}
      <div className={styles.container} ref={dropdownRef}>
        <button
          ref={triggerRef}
          type="button"
          className={`${styles.filterTrigger} ${
            hasSelected ? styles.hasSelected : ""
          }`}
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

          {hasSelected && (
            <span
              className={styles.badge}
              aria-label={t(
                "projects.selectedTags",
                "Выбрано тегов: {{count}}",
                {
                  count: selectedCount,
                },
              )}
            >
              {selectedCount}
            </span>
          )}
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
            <span className={styles.dropdownTitle}>
              {t("projects.sortByTags", "Сортировка по тегам:")}
            </span>

            {renderTagsList()}

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.collapseButton}
                onClick={closeDropdown}
              >
                {t("projects.collapseTags", "Свернуть теги")}
              </button>

              {hasSelected && (
                <button
                  type="button"
                  className={styles.resetButton}
                  onClick={resetTags}
                >
                  {t("projects.resetTags", "Сбросить")}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div
        className={styles.mobileScrollContainer}
        role="region"
        aria-label={t("projects.tagsList", "Список тегов для фильтрации")}
      >
        <div className={styles.tagsScroll}>
          <ul className={styles.tagsList}>
            {hasSelected && (
              <li className={styles.resetItem}>
                <button
                  type="button"
                  className={styles.mobileResetButton}
                  onClick={resetTags}
                >
                  {t("projects.resetTags", "Сбросить")}
                </button>
              </li>
            )}

            {sortedTags.map((tag) => {
              const isSelected = selectedTags.includes(tag.id);

              return (
                <li key={tag.id} className={styles.tagItem}>
                  <button
                    type="button"
                    className={`${styles.tagButton} ${
                      isSelected ? styles.active : ""
                    }`}
                    onClick={() => handleTagClick(tag.id)}
                    aria-pressed={isSelected}
                  >
                    {tag.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
