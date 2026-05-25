export type Language = {
  code: string;
  label: string;
};

export type Social = {
  social_type: string;
  url: string;
};

export type InitResponse = {
  site_name: string;
  seo_description: string;
  privacy_policy: string;
  cookie_message: string;
  cookie_button_text: string;
  languages: Language[];
  socials: Social[];
  copyright: string;
  legal_links: Record<string, string>;
};
