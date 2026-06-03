import { http, HttpResponse } from "msw";
import home from "../fixtures/common/home.json";
import about from "../fixtures/common/about.json";

// 👇 тип для запроса
type ContactRequest = {
  email?: string;
  message?: string;
};

export const commonHandlers = [
  http.get("/", () => {
    return; // важно: ничего не возвращаем (undefined)
  }),

  // INIT
  // http.get("/api/v1/init", () => {
  //   return HttpResponse.json({
  //     status: "ok",
  //     timestamp: Date.now(),
  //   });
  // }),
  http.get("/", () => {
    return new HttpResponse(null, { status: 200 });
  }),
  http.get("/api/v1/init", () => {
    return HttpResponse.json({
      seo_description: "Сообщество архитекторов и урбанистов",
      privacy_policy:
        "<p>Нажимая Отправить, я подтверждаю ознакомление с <a href='/politics'>Политикой конфиденциальности</a> и даю согласие на обработку моих данных для обработки моего запроса и связи со мной</p>",
      cookie_message: "Мы используем cookies",
      cookie_button_text: "OK",
      languages: [
        { code: "ru", label: "Русский" },
        { code: "en", label: "English" },
        { code: "sr-Latn", label: "Srpski" },
        { code: "sr-Cyrl", label: "Српски" },
      ],
      site_name: "Амбасада за Урбанизам",

      socials: [
        { social_type: "LinkedIn", url: "https://linkedin.com/example" },
        { social_type: "Telegram", url: "https://t.me/example" },
        { social_type: "Instagram", url: "https://instagram.com/example" },
        { social_type: "Facebook", url: "https://facebook.com/example" },
        { social_type: "Email", url: "info@example.com" },
      ],
      copyright: "2026 © Амбасада за Урбанизам",
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
        detail: "Message sent successfully",
      },
      { status: 201 },
    );
  }),
];
