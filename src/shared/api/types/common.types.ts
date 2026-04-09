export type TLanguageCode = "ru" | "en" | "sr-Latn" | "sr-Cyrl";

export type TSocialType =
  | "telegram"
  | "instagram"
  | "facebook"
  | "linkedin"
  | "youtube";

export interface IPagination {
  totalItems: number;
  offset: number;
  limit: number;
  isNext: boolean;
}

export interface IApiError {
  status: number;
  code: string;
  message: string;
}

export interface IActionButton {
  label: string;
  link: string;
}

export interface ISocial {
  type: TSocialType;
  url: string;
}
