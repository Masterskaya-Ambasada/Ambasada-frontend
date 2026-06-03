export interface contactFormPost {
  name: string;
  email: string;
  message: string;
  reason: string;
  contact_preference: string;
}

export interface contactFormPostResponse {
  detail: string;
}
