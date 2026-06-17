import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../api/getContacts";

export const contactsQueryKey = ["contacts"] as const;

const CONTACTS_STALE_TIME = 5 * 60 * 1000;
const CONTACTS_GC_TIME = 10 * 60 * 1000;

export function useContactsQuery() {
  return useQuery({
    queryKey: contactsQueryKey,
    queryFn: ({ signal }) => getContacts(signal),

    staleTime: CONTACTS_STALE_TIME,
    gcTime: CONTACTS_GC_TIME,

    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}
