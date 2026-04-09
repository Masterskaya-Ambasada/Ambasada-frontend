import type { IActionButton, IPagination } from "./common.types";

export type TProjectType = {
  id: string;
  label: string;
};

export type TProjectListItem = {
  id: string;
  title: string;
  description: string;
  project_type: string;
  tags: string[];
  year: string;
  image: string;
  action_button: IActionButton;
};

export type TProjectsResponse = {
  items: TProjectListItem[];
  pagination: IPagination;
};

export type TProjectTypesResponse = {
  types: TProjectType[];
};

export type TProjectTags = string[];

export type TContentBlockVariant1 = {
  variant: 1;
  index: string;
  title: string;
  image: string;
  string_list: string[];
  text: string;
  accented_text: string;
};

export type TContentBlockVariant2 = {
  variant: 2;
  index: string;
  title: string;
  image: string;
  left_image: string;
  text: string;
  accented_text: string;
};

export type TContentBlockButton = {
  label: string;
  type: "download" | "redirect";
  url: string;
};

export type TContentBlockVariant3 = {
  variant: 3;
  index: string;
  title: string;
  image: string;
  text: string;
  accented_text: string;
  buttons: TContentBlockButton[];
};

export type TContentBlock =
  | TContentBlockVariant1
  | TContentBlockVariant2
  | TContentBlockVariant3;

export type TProjectInfo = {
  id: string;
  title: string;
  description: string;
  project_type: string;
  tags: string[];
  year: string;
  image: string;
};

export type TProjectDetailResponse = {
  info: TProjectInfo;
  content_blocks: TContentBlock[];
};

export interface IProjectsFilterParams {
  project_type?: string;
  tag?: string;
  search?: string;
  offset?: number;
  limit?: number;
}
