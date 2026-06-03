import { useState } from "react";
import { useInitData } from "@shared/context/InitDataContext.tsx";
import { safeCode } from "@shared/lib/safeCode";
import { ContactForm } from "@/features/contact-form";
import { useTranslation } from "react-i18next";
import { usePostContact } from "@entities/form/index";
import type { contactFormPost } from "@entities/form/model/types";
import Modal from "./modal/modal";
import styles from "./ContactSection.module.css";

const CONTACT_FORM_ID = "contact-form";

const ContactSection = () => {
  const initData = useInitData();
  const { t } = useTranslation("common");
  const { mutateAsync: postContactAsync, isPending } = usePostContact();
  const politics = safeCode(initData?.privacy_policy || "");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isContactFormValid, setIsContactFormValid] = useState(false);
  const isSubmitDisabled = !isContactFormValid || isPending;

  const handleSubmit = async (formPayload: contactFormPost) => {
    if (formPayload.contact_preference) {
      throw new Error("Honeypot triggered");
    }

    try {
      await postContactAsync(formPayload);
      setIsSuccessModalOpen(true);
    } catch (error) {
      setIsErrorModalOpen(true);
      console.error("Submit error:", error);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setIsContactFormValid(false);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <section className={styles.contactSection}>
      <h2 className={styles.contactSectionTitle}>
        {t("contactForm.fields.title")}
      </h2>

      <div className={styles.contactSectionBody}>
        <div className={styles.contactSectionContent}>
          <img
            className={styles.contactSectionImage}
            src="/images/contactFormImg.png"
            alt={t("contactForm.fields.title")}
            loading="lazy"
          />
        </div>

        <div className={styles.contactSectionFormWrapper}>
          <p className={styles.contactSectionDescription}>
            {t("contactForm.fields.text")}
          </p>

          <ContactForm
            id={CONTACT_FORM_ID}
            isSubmitting={isPending}
            onSubmit={handleSubmit}
            onValidityChange={setIsContactFormValid}
          />
          <div
            className={styles.policyContent}
            dangerouslySetInnerHTML={{ __html: politics }}
          />
        </div>
      </div>

      <div className={styles.contactSectionSubmitWrapper}>
        <button
          className={`btn btn--primary ${styles.contactSectionSubmit}`}
          type="submit"
          form={CONTACT_FORM_ID}
          disabled={isSubmitDisabled}
        >
          {isPending
            ? `${t("contactForm.fields.button_text")}...`
            : t("contactForm.fields.button_text")}
        </button>
      </div>

      {isSuccessModalOpen && (
        <Modal type="success" onClose={handleCloseSuccessModal} />
      )}

      {isErrorModalOpen && (
        <Modal type="error" onClose={handleCloseErrorModal} />
      )}
    </section>
  );
};

export default ContactSection;
