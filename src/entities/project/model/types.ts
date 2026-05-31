export type Category = {
  id: string;
  name: string;
  slug?: string;
};

export type ProjectTag = {
  id: string;
  name: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  type?: string;
  action_button: {
    label: string;
    link: string;
  };
};

export type ProjectsResponse = {
  items: Project[];
  pagination: {
    totalItems: number;
    offset: number;
    limit: number;
    isNext: boolean;
  };
};

export type ProjectsFilters = {
  search?: string;
  type?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
};