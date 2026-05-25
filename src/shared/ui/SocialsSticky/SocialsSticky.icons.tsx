import type { ReactNode } from "react";
import { EmailIcon } from "../../assets/icons/social/email";
import { FacebookIcon } from "../../assets/icons/social/facebook";
import { InstagramIcon } from "../../assets/icons/social/instagram";
import { LinkedinIcon } from "../../assets/icons/social/linkedin";
import { TelegramIcon } from "../../assets/icons/social/telegram";
import type { SocialType } from "./SocialsSticky.types";

export const SOCIAL_ICONS: Record<SocialType, ReactNode> = {
  telegram: <TelegramIcon />,
  instagram: <InstagramIcon />,
  facebook: <FacebookIcon />,
  linkedin: <LinkedinIcon />,
  email: <EmailIcon />,
};
