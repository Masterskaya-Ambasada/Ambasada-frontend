import { useTranslation } from "react-i18next";
import styles from "./ProjectsSearch.module.css";
import { useState } from "react";

interface ProjectsSearchProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean; // Возможность отключить поле поиска в мобильной версии
}

export const ProjectsSearch: React.FC<ProjectsSearchProps> = ({
  value,
  onChange,
  onClear,
  placeholder,
  ariaLabel,
  disabled = false,
}) => {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false); // Состояние: открыт ли поиск

  // Открытие поиска при клике на иконку
  const handleOpen = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  // Скрыть при клике вне поля или при очистке
  const handleBlur = () => {
    if (!value) {
      setIsOpen(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Стоп срабатывание handleBlur
    onChange("");
    onClear?.();
    setIsOpen(false); // Закрыть поиск при очистке
  };

  return (
    <div className={styles.searchContainer}>
      <div
        className={`${styles.searchWrapper} ${isOpen ? styles.open : styles.closed}`}
      >
        {/* Иконка лупы — открывает поиск */}
        <img
          src="/Watch all.svg"
          alt=""
          className={styles.searchIcon}
          onClick={handleOpen}
          aria-hidden="true"
        />
        {/* Поле ввода — появляется при открытии поиска */}
        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder || t("search.placeholder", "Поиск")}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          autoFocus={isOpen} // Фокус при открытии
          aria-label={ariaLabel || t("search.ariaLabel", "Поиск проектов")}
        />

        {/* Кнопка очистки — появляется при наличии текста */}
        {value && (
          <button
            className={styles.searchClear}
            onClick={handleClear}
            aria-label={t("search.clear", "Очистить")}
            type="button"
            disabled={disabled}
          >
            <img
              src="/cross.svg"
              alt=""
              className={styles.clearIcon}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </div>
  );
};
