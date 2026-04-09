export type TContactReason =
  | "collaboration"
  | "question"
  | "feedback"
  | "other";

export interface IContactRequest {
  name: string;
  email: string;
  message: string;
  reason: TContactReason;
}
