import { apiClient } from "@/shared/api/client";
import type { contactFormPost, contactFormPostResponse } from "../model/types";

export function postContact(
  data: contactFormPost,
  signal?: AbortSignal,
): Promise<contactFormPostResponse> {
  return apiClient.post<contactFormPostResponse>("/contact", data, { signal });
}
