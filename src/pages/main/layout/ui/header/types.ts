export type Language = {
  code: string;
  label: string;
};

export type HeaderData = {
  site_name: string;
  languages: Language[];
};

export type HeaderProps = {
  data: HeaderData | null;
};

export type NavItem = {
  to: string;
  labelKey: string;
  labelTabletKey?: string;
};
