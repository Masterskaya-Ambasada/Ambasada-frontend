import type { InitResponse } from "@/entities/init/model/types";

export type FooterData = Pick<
  InitResponse,
  "site_name" | "socials" | "legal_links" | "copyright"
>;
