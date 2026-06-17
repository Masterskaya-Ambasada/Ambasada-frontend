export type Social = {
  social_type: string;
  url: string;
};

export interface ContactSocial {
  id: string;
  href: string;
  label: string;
}

export interface ContactsHeroProps {
  phone: string;
  address: string;
  socials: ContactSocial[];
}
