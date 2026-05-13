import { http, HttpResponse } from "msw";
import home from "../fixtures/common/home.json";
import about from "../fixtures/common/about.json";

// 👇 тип для запроса
type ContactRequest = {
  email?: string;
  message?: string;
};

export const commonHandlers = [
  // INIT
  http.get("/api/v1/init", () => {
    return HttpResponse.json({
      site_name: "Амбасада за урбанизм",
      seo_description: "Сообщество архитекторов и урбанистов",
      privacy_policy: "Политика конфиденциальности",
      cookie_message: "Мы используем cookies",
      cookie_button_text: "OK",
      languages: [
        { code: "ru", label: "Русский" },
        { code: "en", label: "English" },
        { code: "sr-Latn", label: "Srpski" },
        { code: "sr-Cyrl", label: "Српски" },
      ],
      socials: [
        { social_type: "Telegram", url: "https://t.me/example" },
        { social_type: "Instagram", url: "https://instagram.com/example" },
      ],
      copyright: "© 2026 Амбасада за урбанизм",
    });
  }),

  // HOME
  http.get("/api/v1/home", ({ request }) => {
    const lang = request.headers.get("Accept-Language") || "en";

    return HttpResponse.json({
      ...home,
      lang,
    });
  }),

  // ABOUT
  http.get("/api/v1/about", () => {
    return HttpResponse.json(about);
  }),

  // CONTACT
  http.post("/api/v1/contact", async ({ request }) => {
    const body = (await request.json()) as ContactRequest;

    // валидация
    if (!body.email || !body.message) {
      return HttpResponse.json(
        { message: "Validation error" },
        { status: 400 },
      );
    }

    const randomFail = Math.random() < 0.1;

    if (randomFail) {
      return HttpResponse.json({ message: "Server error" }, { status: 500 });
    }

    return HttpResponse.json(
      {
        message: "Message sent successfully",
      },
      { status: 201 },
    );
  }),
];
