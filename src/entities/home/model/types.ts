export interface ActionButton {
  label: string;
  link: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  image_left: string;
  image_right: string;
  action_button: ActionButton;
}

export interface AboutPreview {
  title: string;
  text: string;
  action_button: ActionButton;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

export interface TeamPreview {
  title: string;
  members: TeamMember[];
  action_button: ActionButton;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  project_type: string;
  tags: string[];
  year: string;
  image: string;
  isFirst?: boolean;
  action_button?: ActionButton;
}

export interface ProjectsPreview {
  title: string;
  items: ProjectItem[];
  action_button: ActionButton;
}

export interface ContactSection {
  title: string;
  description: string;
  email: string;
  placeholders: {
    name: string;
    email: string;
    message: string;
  };
  button_label: string;
  privacy_notice: string;
  privacy_link_label: string;
}

export interface HomeResponse {
  hero: Hero;
  about_preview: AboutPreview;
  team_preview: TeamPreview;
  projects_preview: ProjectsPreview;
  contact_section: ContactSection;
}
