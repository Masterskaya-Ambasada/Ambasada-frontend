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

# Ambasada Frontend
Проект на React + TypeScript (Vite)  
Node.js >= 22.0.0  
React 19.2.0

## Установка проекта

```bash
npm install
```

## Запуск проекта в development режиме

```bash
npm run dev
```

## Скрипты

`npm run dev` - Запуск проекта в development режиме

`npm run build` - Сборка проекта (обязательно проверяйте перед PullRequest)

`npm run preview` - Запуск проекта в production режиме

`npm run lint` - Проверка проекта eslint

`npm run format` - Форматирование проекта prettier

## 📋 Работа с .env файлами

- `.env` — персональный файл (не коммитится)
- `.env.example` — шаблон (хранится в репозитории)
- Процесс настройки: копируем `.env.example` → создаём `.env` → заполняем своими значениями
 

# i18n Настройка (ru, en, sr-Cyrl, sr-Latn)

## Установка
```bash
npm i i18next react-i18next i18next-browser-languagedetector i18next-http-backend
```

## Поддерживаемые языки
- Русский (ru) — основной
- Английский (en)
- Сербский кириллица (sr-Cyrl)
- Сербский латиница (sr-Latn)

## Структура файлов
src/
├──locales/
   ├── ru/common.json
   ├── en/common.json
   ├── sr-Cyrl/common.json
   └── sr-Latn/common.json
├── i18n.ts
├── components/LanguageSwitcher/LanguageSwitcher.tsx
└── utils/api.ts

## Использование
```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation('common');
<h1>{t('title')}</h1>  // "Список проектов" / "List of projects" / "Spisak Projekata"
```

## API с языком
```tsx
import api from './utils/api';

const projects = await api.get<TProjectListItem[]>('/api/projects');
// Accept-Language: ru 
```