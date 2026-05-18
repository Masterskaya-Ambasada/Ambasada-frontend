export type SocialType =
  | "telegram"
  | "instagram"
  | "facebook"
  | "linkedin"
  | "email";

export interface SocialItem {
  type: SocialType;
  url: string;
}

export interface SocialsStickyProps {
  socials: SocialItem[];
}
