import type { IActionButton } from "./common.types";

export type TTeamMemberPreview = {
  name: string;
  role: string;
  photo: string;
};

export type TProjectPreview = {
  id: string;
  title: string;
  description: string;
  project_type: string;
  tags: string[];
  year: string;
  image: string;
  isFirst?: boolean;
  action_button?: IActionButton;
};

export type THomeResponse = {
  hero: {
    title: string;
    subtitle: string;
    image_left: string;
    image_right: string;
    action_button: IActionButton;
  };
  about_preview: {
    title: string;
    text: string;
    action_button: IActionButton;
  };
  team_preview: {
    title: string;
    members: TTeamMemberPreview[];
    action_button: IActionButton;
  };
  projects_preview: {
    title: string;
    items: TProjectPreview[];
    action_button: IActionButton;
  };
  contact_section: {
    title: string;
    email: string;
  };
};
