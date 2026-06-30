import { useTranslation } from "react-i18next";
import styles from "./ProjectsSearch.module.css";

interface ProjectsSearchProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean; // Возможность отключить поле поиска в мобильной версии
  className?: string; // Дополнительный класс для стилизации
  isOpen?: boolean; // возможность контролировать открытие в мобильной версии
  onOpenChange?: (isOpen: boolean) => void;
}

export const ProjectsSearch: React.FC<ProjectsSearchProps> = ({
  value,
  onChange,
  onClear,
  placeholder,
  ariaLabel,
  disabled = false,
  isOpen = false,
  onOpenChange,
}) => {
  const { t } = useTranslation("common");

  // Открытие поиска при клике на иконку
  const handleOpen = () => {
    if (!disabled) {
      onOpenChange?.(true);
    }
  };

  // Скрыть при клике вне поля или при очистке
  const handleBlur = () => {
    if (!value) {
      onOpenChange?.(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Стоп срабатывание handleBlur
    onChange("");
    onClear?.();
    onOpenChange?.(false); // Закрыть поиск при очистке
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
