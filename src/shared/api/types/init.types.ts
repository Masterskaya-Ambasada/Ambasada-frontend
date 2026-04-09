import type { ISocial, TLanguageCode } from "./common.types";

export type TInitResponse = {
  site_name: string;
  seo_description: string;
  languages: Array<{ code: TLanguageCode; label: string }>;
  socials: ISocial[];
  copyright: string;
};
