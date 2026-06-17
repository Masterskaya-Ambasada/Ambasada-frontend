import ContactSection from "@/widgets/contact-section/ContactSection";
import { useContactsQuery } from "@/entities/contacts";
import { useInitQuery } from "@/entities/init";
import { ContactsHero } from "./ui/ContactsHero";
import styles from "./ContactsPage.module.css";

const ContactsPage = () => {
  const { data: contacts } = useContactsQuery();
  const { data: init } = useInitQuery();

  if (!contacts || !init) {
    return null;
  }

  const socials = init.socials.map((social) => ({
    id: social.social_type,
    href: social.url,
    label: social.social_type,
  }));

  return (
    <>
      <main className={styles.contactsPage}>
        <ContactsHero
          phone={contacts.phone}
          address={contacts.address}
          socials={socials}
        />
      </main>

      <ContactSection />
    </>
  );
};

export default ContactsPage;
