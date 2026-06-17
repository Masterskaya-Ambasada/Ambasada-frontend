import { apiClient } from "@/shared/api/client";
import type { ContactsResponse } from "../model/types";

export function getContacts(signal?: AbortSignal): Promise<ContactsResponse> {
  return apiClient.get<ContactsResponse>("/contacts", { signal });
}
