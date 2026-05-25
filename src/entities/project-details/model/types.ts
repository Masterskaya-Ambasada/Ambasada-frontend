type Tbutton = {
  label: string;
  type: "download" | "redirect";
  url: string;
};

interface BaseVariant {
  index: string;
  title: string;
}

interface IVariant1 extends BaseVariant {
  variant: 1;
  image?: string;
  string_list?: string[];
  text?: string;
  accented_text?: string;
}

interface IVariant2 extends BaseVariant {
  variant: 2;
  image?: string;
  left_image?: string;
  text?: string;
  accented_text?: string;
}

interface IVariant3 extends BaseVariant {
  variant: 3;
  image?: string;
  text?: string;
  accented_text?: string;
  buttons?: Tbutton[];
}

type TContentBlock = IVariant1 | IVariant2 | IVariant3;

export interface IProjectDetailsResponse {
  info: {
    id: string;
    title: string;
    description: string;
    project_type: string;
    tags: string[];
    year: string;
    image: string[];
  };
  content_blocks: TContentBlock[];
}
