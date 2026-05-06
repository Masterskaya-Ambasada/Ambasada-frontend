import React from "react";
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
  return (
    <div className={styles.filterContainer}>
      <div className={styles.buttonGroup}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              // Если выбран "Все" или тот же тип - сбрасываем
              if (category.id === "all" || selectedType === category.id) {
                onChange(null);
              } else {
                onChange(category.id);
              }
            }}
            className={`${styles.filterButton} ${
              selectedType === category.id ? styles.active : ""
            }`}
            aria-pressed={selectedType === category.id}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};