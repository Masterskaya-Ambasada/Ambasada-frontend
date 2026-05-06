// Тип проекта (приходит с бэкенда)
export type ProjectType = {
  id: string;
  name: string;
  slug: string;
};

// Тег проекта (приходит с бэкенда)
export type ProjectTag = {
  id: string;
  name: string;
  slug: string;
};

// Ответ API для фильтров
export type FiltersResponse = {
  types: ProjectType[];
  tags: ProjectTag[];
};

// Пропсы для TypeFilter
export interface TypeFilterProps {
  types: ProjectType[];
  selectedType: string | null;
  onChange: (typeSlug: string | null) => void;
}

// Пропсы для TagsFilter
export interface TagsFilterProps {
  tags: ProjectTag[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}