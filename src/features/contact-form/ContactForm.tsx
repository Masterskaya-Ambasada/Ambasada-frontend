import {
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import { useTranslation } from "react-i18next";
import { AdaptiveTextarea } from "./adaptiveTextArea/adaptiveTextArea";
import type { TFormErrors, TTouchedFields } from "./model/types";
import type { contactFormPost } from "@entities/form/model/types";
import styles from "./ContactForm.module.css";

type TContactFormProps = {
  id: string;
  isSubmitting?: boolean;
  onSubmit?: (payload: contactFormPost) => void | Promise<void>;
  onValidityChange?: (isValid: boolean) => void;
};

const FIELD_LIMITS = {
  name: 100,
  messageMin: 20,
  messageMax: 600,
} as const;

const initialValues: contactFormPost = {
  name: "",
  email: "",
  message: "",
  contact_preference: "",
  reason: "",
};

const initialTouched: TTouchedFields = {
  name: false,
  email: false,
  message: false,
  contact_preference: false,
};

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const NAME_REGEXP = /^[\p{Script=Latin}\p{Script=Cyrillic}\s'-]+$/u;

const ContactForm = ({
  id,
  isSubmitting = false,
  onSubmit,
  onValidityChange,
}: TContactFormProps) => {
  const { t } = useTranslation("common");

  const [values, setValues] = useState<contactFormPost>(initialValues);
  const [errors, setErrors] = useState<TFormErrors>({});
  const [touched, setTouched] = useState<TTouchedFields>(initialTouched);

  const nameFieldId = `${id}-name`;
  const emailFieldId = `${id}-email`;
  const messageFieldId = `${id}-message`;
  const messageLength = values.message.length;
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();
  const contactPreference = values.contact_preference.trim();
  const reason = "submitForm";

  const getHints = (): TFormErrors => {
    const hints: TFormErrors = {};

    if (!values.name.trim()) {
      hints.name = t("contactForm.hints.nameRequired");
    }

    if (!values.email.trim()) {
      hints.email = t("contactForm.hints.emailRequired");
    }

    if (!values.message.trim()) {
      hints.message = t("contactForm.hints.messageRequired", {
        min: FIELD_LIMITS.messageMin,
      });
    }

    return hints;
  };

  const validateValues = (formValues: contactFormPost) => {
    const nextErrors: TFormErrors = {};

    const trimmedName = formValues.name.trim();
    const trimmedEmail = formValues.email.trim();
    const trimmedMessage = formValues.message.trim();

    if (!trimmedName) {
      nextErrors.name = t("contactForm.errors.requiredName");
    } else if (!NAME_REGEXP.test(trimmedName)) {
      nextErrors.name = t("contactForm.errors.invalidNameAlphabet");
    }

    if (!trimmedEmail) {
      nextErrors.email = t("contactForm.errors.requiredEmail");
    } else if (!EMAIL_REGEXP.test(trimmedEmail)) {
      nextErrors.email = t("contactForm.errors.invalidEmailWithExample");
    }

    if (!trimmedMessage) {
      nextErrors.message = t("contactForm.errors.requiredMessage");
    } else if (trimmedMessage.length < FIELD_LIMITS.messageMin) {
      nextErrors.message = t("contactForm.errors.messageMinLength", {
        min: FIELD_LIMITS.messageMin,
      });
    } else if (trimmedMessage.length > FIELD_LIMITS.messageMax) {
      nextErrors.message = t("contactForm.errors.messageMaxLength", {
        max: FIELD_LIMITS.messageMax,
      });
    }

    return nextErrors;
  };

  const allErrors = validateValues(values);
  const isFormValid =
    Object.keys(allErrors).length === 0 && contactPreference.length === 0;

  useEffect(() => {
    onValidityChange?.(isFormValid);
  }, [isFormValid, onValidityChange]);

  const updateVisibleErrors = (
    nextValues: contactFormPost,
    nextTouched: TTouchedFields,
  ) => {
    const nextAllErrors = validateValues(nextValues);
    const nextVisibleErrors: TFormErrors = {};

    if (nextValues.name.trim() && nextTouched.name && nextAllErrors.name) {
      nextVisibleErrors.name = nextAllErrors.name;
    }

    if (nextValues.email.trim() && nextTouched.email && nextAllErrors.email) {
      nextVisibleErrors.email = nextAllErrors.email;
    }

    if (
      nextValues.message.trim() &&
      nextTouched.message &&
      nextAllErrors.message
    ) {
      nextVisibleErrors.message = nextAllErrors.message;
    }

    setErrors(nextVisibleErrors);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const fieldName = e.target.name as keyof contactFormPost;
    const { value } = e.target;

    let nextValue = value;

    if (fieldName === "name") {
      nextValue = value.slice(0, FIELD_LIMITS.name);
    }

    if (fieldName === "message") {
      nextValue = value.slice(0, FIELD_LIMITS.messageMax);
    }

    const nextValues = {
      ...values,
      [fieldName]: nextValue,
    };

    setValues(nextValues);
    updateVisibleErrors(nextValues, touched);
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const fieldName = e.target.name as keyof contactFormPost;

    const nextTouched = {
      ...touched,
      [fieldName]: true,
    };

    setTouched(nextTouched);
    updateVisibleErrors(values, nextTouched);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting || contactPreference) return;

    const nextTouched: TTouchedFields = {
      name: true,
      email: true,
      message: true,
      contact_preference: true,
    };

    setTouched(nextTouched);

    const nextErrors = validateValues(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      onValidityChange?.(false);
      return;
    }

    const submitPayload: contactFormPost = {
      name,
      email,
      message,
      contact_preference: values.contact_preference,
      reason,
    };

    try {
      await onSubmit?.(submitPayload);
      setValues(initialValues);
      setErrors({});
      setTouched(initialTouched);
      onValidityChange?.(false);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    }
  };

  const hints = getHints();

  return (
    <form
      id={id}
      className={styles.contactForm}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.contactFormField}>
        <label className={styles.visuallyHidden} htmlFor={nameFieldId}>
          {t("contactForm.fields.name")}
        </label>

        <input
          id={nameFieldId}
          className={`${styles.contactFormInput} ${styles.nameInput}`}
          name="name"
          type="text"
          value={values.name}
          placeholder={t("contactForm.fields.name")}
          maxLength={FIELD_LIMITS.name}
          required
          autoComplete="name"
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${nameFieldId}-error` : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className={styles.contactFormMessages}>
          {errors.name && (
            <span
              id={`${nameFieldId}-error`}
              className={styles.contactFormError}
              role="alert"
            >
              {errors.name}
            </span>
          )}
          {hints.name && !errors.name && (
            <span id={`${nameFieldId}-hint`} className={styles.contactFormHint}>
              {hints.name}
            </span>
          )}
        </div>
      </div>

      <div className={styles.contactFormField}>
        <label className={styles.visuallyHidden} htmlFor={emailFieldId}>
          {t("contactForm.fields.email")}
        </label>

        <input
          id={emailFieldId}
          className={`${styles.contactFormInput} ${styles.emailInput}`}
          name="email"
          type="email"
          value={values.email}
          placeholder={t("contactForm.fields.email")}
          required
          autoComplete="email"
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${emailFieldId}-error` : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className={styles.contactFormMessages}>
          {errors.email && (
            <span
              id={`${emailFieldId}-error`}
              className={styles.contactFormError}
              role="alert"
            >
              {errors.email}
            </span>
          )}
          {hints.email && !errors.email && (
            <span
              id={`${emailFieldId}-hint`}
              className={styles.contactFormHint}
            >
              {hints.email}
            </span>
          )}
        </div>
      </div>

      <div className={styles.contactFormField}>
        <label className={styles.visuallyHidden} htmlFor={messageFieldId}>
          {t("contactForm.fields.message")}
        </label>

        <div className={styles.contactFormTextareaWrapper}>
          <AdaptiveTextarea
            id={messageFieldId}
            className={styles.contactFormTextarea}
            name="message"
            value={values.message}
            placeholder={t("contactForm.fields.message")}
            minLength={FIELD_LIMITS.messageMin}
            maxLength={FIELD_LIMITS.messageMax}
            required
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? `${messageFieldId}-error` : undefined
            }
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span
            className={styles.contactFormCounter}
            aria-label={`Введено ${messageLength} из ${FIELD_LIMITS.messageMax} символов. Минимум ${FIELD_LIMITS.messageMin}`}
          >
            {messageLength}/{FIELD_LIMITS.messageMax}
          </span>
        </div>
        <div className={styles.contactFormMessages}>
          {errors.message && (
            <span
              id={`${messageFieldId}-error`}
              className={styles.contactFormError}
              role="alert"
            >
              {errors.message}
            </span>
          )}
          {hints.message && !errors.message && (
            <span
              id={`${messageFieldId}-hint`}
              className={styles.contactFormHint}
            >
              {hints.message}
            </span>
          )}
        </div>
      </div>

      <label className={styles.contactFormHoneypot} aria-hidden="true">
        <span>Contact preference</span>

        <input
          name="contact_preference"
          type="text"
          value={values.contact_preference}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
    </form>
  );
};

export default ContactForm;
