export type Paragraph = {
  first_sentence: string;
  main_text: string;
};

export type AboutData = {
  title: string;
  paragraphs: Paragraph[];
  action_button: {
    text: string;
    link: string;
  };
};

export interface IAboutUsProps {
  data: AboutData;
}

export type ValueItem = {
  id: number;
  title: string;
  text: string;
};

export type ValuesData = {
  title: string;
  items: ValueItem[];
};

export interface IOurValuesProps {
  data: ValuesData;
}

export type Member = {
  id: number;
  name: string;
  role: string;
  photo: string;
};

export type TeamData = {
  title: string;
  members: Member[];
  action_button: {
    label: string;
    link: string;
  };
};

export interface ITeamProps {
  data: TeamData;
}

export type Image = {
  id: number;
  url: string;
  alt: string;
};

export type TCarousel = {
  title: string;
  images: Image[];
};

export interface ICarouselProps {
  data: TCarousel;
}

export type AboutPageResponse = {
  about_section: AboutData;
  values: ValuesData;
  team: TeamData;
  gallery_carousel: TCarousel;
};
