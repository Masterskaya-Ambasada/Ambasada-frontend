import type { contactFormPost } from "@entities/form/model/types";

export type TFormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export type TTouchedFields = Partial<Record<keyof contactFormPost, boolean>>;
