import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProjectsSearch } from "../projects-search/ProjectsSearch";
import { BrowserRouter } from "react-router-dom";

const ProjectsSearchWithRouter = () => {
  return (
    <BrowserRouter>
      <ProjectsSearch />
    </BrowserRouter>
  );
};

const meta: Meta<typeof ProjectsSearchWithRouter> = {
  title: "Pages/ProjectsPage/ProjectsSearch",
  component: ProjectsSearchWithRouter,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## Строка поиска проектов

Компонент для текстового поиска проектов с:
- **Debounce 500ms** — запрос отправляется после остановки ввода
- **Максимальная длина 50 символов**
- **Кнопка очистки** — появляется при наличии текста
- **Синхронизация с URL** — значение сохраняется в адресной строке
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProjectsSearchWithRouter>;

// Пустой поиск
export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Состояние по умолчанию — поле пустое, кнопка очистки не отображается",
      },
    },
  },
};

// С заполненным поиском
export const WithText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Введите текст "музей" в поле поиска для проверки функциональности',
      },
    },
  },
};

// Длинный текст (проверка максимальной длины)
export const MaxLength: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Проверка ограничения на 50 символов — текст должен обрезаться при вводе",
      },
    },
  },
};

// С заполненным поиском (альтернативный текст)
export const WithAlternativeText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Введите текст "архитектура" в поле поиска для проверки функциональности',
      },
    },
  },
};
