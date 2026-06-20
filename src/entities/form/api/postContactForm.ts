import { apiClient } from "@/shared/api/client";
import type { contactFormPost, contactFormPostResponse } from "../model/types";
import { apiPaths } from "@/shared/api/config/apiPaths";

export function postContact(
  data: contactFormPost,
  signal?: AbortSignal,
): Promise<contactFormPostResponse> {
  return apiClient.post<contactFormPostResponse>(
    apiPaths.contact.create,
    data,
    { signal },
  );
}
