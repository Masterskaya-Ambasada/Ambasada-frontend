export type Category = {
  id: string;
  name: string;
};

export type Tag = {
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

export type GetProjectsParams = {
  limit: number;
  offset: number;
  search?: string;
  type?: string;
  tags?: string[];
};
