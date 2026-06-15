## О проекте:

«Амбасада за Урбанизам» — сообщество белградских урбанистов, объединившихся на благо города. Участники занимаются городскими проектами, направленными на улучшение городской среды, повышение безопасности и комфорта улиц Белграда.

## Цели и задачи сайта:

Представить сообщество и его проекты в удобной и лаконичной форме.
Создать витрину проектов — для каждого проекта показать краткое описание и галерею из 3-5 фотографий.
Обеспечить возможность легкого добавления и редактирования проектов (контент должен обновляться администратором).
Не планируется блог, новости или сложные коммуникационные функции — только каталог проектов.
Сделать сайт удобным для мобильных устройств (адаптивным).

## Ссылки

[ТЗ](https://docs.google.com/document/u/0/d/1QvGW7SAHXqydd5O3sLFhPCLOvdB7YHjY/mobilebasic?pli=1)

[Фич-лист](https://docs.google.com/spreadsheets/d/1BF-7RsLObuRF10pot7XfL2ZtV3eDpU5k287NK5uCN7M/edit?usp=sharing)

[Figma](https://www.figma.com/design/HaL00M2j04KDwDzFXfos0c/%D0%A1%D0%B0%D0%B9%D1%82-%D0%90%D0%BC%D0%B1%D0%B0%D1%81%D0%B0%D0%B4%D0%B0-%D0%B7%D0%B0-%D0%A3%D1%80%D0%B1%D0%B0%D0%BD%D0%B8%D0%B7%D0%B0%D0%BC--%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%B0-2-?node-id=419-6033&p=f&t=XdvSQ9HZGxQ2dtC2-0)

## 🛠 Стек технологий

- **React 19**
- **TypeScript**
- **Vite** (сборка)
- **Feature-Sliced Design (FSD)** (архитектурная методология)
- **ESLint** + **Prettier** (качество кода и форматирование)
- **MSW (Mock Service Worker)** (имитация API)
- **i18next** (интернационализация)

## 🏗 Архитектура

Проект построен по методологии **Feature-Sliced Design (FSD)**.

### Слои (Layers):
- `app` — инициализация приложения: глобальные стили, провайдеры (роутер), точка входа (`main.tsx`).
- `pages` — страницы приложения. Содержат композиционную логику конкретных экранов.
- `widgets` — крупные самостоятельные блоки страниц (например, `contact-section`).
- `features` — функциональные части с бизнес-ценностью (например, `change-language`, `contact-form`).
- `entities` — бизнес-сущности и их логика (например, `project`, `gallery`, `team`, `values`).
- `shared` — переиспользуемый инфраструктурный код: API-клиент, конфигурация i18n, базовые стили.

### Проверка архитектуры:
Соблюдение правил FSD контролируется с помощью `eslint-plugin-boundaries`. Правила описаны в `eslint.config.js`.

---

## 📂 Структура проекта (src)

```text
src/
├── app/                # Инициализация приложения
│   ├── providers/      # Провайдеры (Router)
│   └── styles/         # Глобальные стили
├── pages/              # Страницы (Home, Projects, Details и др.)
├── widgets/            # Виджеты (ContactSection)
├── features/           # Фичи (ChangeLanguage, ContactForm)
├── entities/           # Сущности (Project, Gallery, Team)
├── shared/             # Переиспользуемые модули
│   ├── api/            # API клиент и типы
│   ├── config/         # Конфигурационные файлы (i18n, routes)
│   └── styles/         # Базовые стили и переменные
├── locales/            # Файлы локализации (i18next)
└── mocks/              # Конфигурация MSW (Mock API)
```

---

## 📦 Установка проекта

```bash
npm install
```

## 🚀 Запуск проекта

### Development режим
```bash
npm run dev
```

### Сборка
```bash
npm run build
```

### Просмотр сборки
```bash
npm run preview
```

## 🧹 Линтинг и форматирование

- `npm run lint` — проверка кода ESLint (включая проверку границ FSD).
- `npm run format` — форматирование кода Prettier.

## Проверка файлов с переводами

- `npm run locales:check` - проверяет соответствие полей в файлах переводов, основной язык - ru

## 📋 Работа с .env файлами

- `.env` — персональный файл (не коммитится).
- `.env.example` — шаблон (хранится в репозитории).
- Процесс настройки: копируем `.env.example` → создаём `.env` → заполняем своими значениями.

### Переменные окружения

- `VITE_USE_MSW` — включает или отключает Mock Service Worker.
- `VITE_API_URL` — базовый URL API. Значение должно включать версию API `/api/v1`.

`apiClient` использует `VITE_API_URL` как `baseUrl`, поэтому в API-функциях указывается только путь конкретного endpoint без `/api/v1`.

Правильно:
```ts
apiClient.get("/init");
apiClient.get("/home");
apiClient.get("/projects");
```
Неправильно:
```ts
apiClient.get("/api/v1/init");
```

Для локальной разработки с MSW используется:
```env
VITE_USE_MSW=true
VITE_API_URL=/api/v1
```

## 🧪 Mock API (MSW)

В проекте используется Mock Service Worker (MSW) для имитации backend API в режиме разработки.

### Включить моки (.env):
```env
VITE_USE_MSW=true
VITE_API_URL=/api/v1
```

### Отключить моки (.env):

При отключенных моках `VITE_API_URL` должен указывать на реальный backend API и также включать версию `/api/v1`.

```env
VITE_USE_MSW=false
VITE_API_URL=https://example.com/api/v1
```

# 🌍 i18n (Интернационализация)

Поддерживаемые языки: Русский (ru), Английский (en), Сербский кириллица (sr-Cyrl), Сербский латиница (sr-Latn).

## Структура файлов
```text
src/
├── locales/            # Файлы переводов
│   ├── ru/common.json
│   ├── en/common.json
│   ├── sr-Cyrl/common.json
│   └── sr-Latn/common.json
└── shared/
    └── config/
        └── i18n.ts     # Инициализация i18next
```

## Использование
```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation('common');
<h1>{t('title')}</h1>
```

