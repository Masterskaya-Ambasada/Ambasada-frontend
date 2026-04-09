import type { IActionButton } from "./common.types";

export type TValue = {
  id: number;
  title: string;
  text: string;
};

export type TTeamMember = {
  id: number;
  name: string;
  role: string;
  photo: string;
};

export type TGalleryImage = {
  id: string;
  url: string;
  alt: string;
};

export type TAboutResponse = {
  hero: {
    title: string;
    description: string;
  };
  about_section: {
    title: string;
    paragraphs: string[];
    action_button: IActionButton;
  };
  values: {
    title: string;
    items: TValue[];
  };
  team: {
    title: string;
    members: TTeamMember[];
    action_button: IActionButton;
  };
  gallery_carousel: {
    title: string;
    images: TGalleryImage[];
  };
};
