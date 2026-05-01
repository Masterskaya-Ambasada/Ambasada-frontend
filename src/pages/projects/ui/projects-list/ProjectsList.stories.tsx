import type { Meta, StoryObj } from '@storybook/react';
import { ProjectsList } from './ProjectsList';
import projectsData from '../../../../mocks/fixtures/projects/projects.json';

// Тип для проекта
interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
}

// Берём первые 4 проекта для демонстрации
const mockProjects: Project[] = projectsData.items.slice(0, 4).map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
}));

// Создаём 12 проектов (как в задании "показать все")
const twelveProjects: Project[] = Array(12)
  .fill(null)
  .map((_, index) => ({
    id: `mock-${index}`, 
    title: mockProjects[index % mockProjects.length].title,
    description: mockProjects[index % mockProjects.length].description,
  }));

const meta: Meta<typeof ProjectsList> = {
  title: 'Components/ProjectsList',
  component: ProjectsList,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProjectsList>;

// Пустое состояние
export const Empty: Story = {
  args: {
    projects: [],
  },
};

// 4 проекта (desktop: 4 колонки)
export const FourProjects: Story = {
  args: {
    projects: mockProjects,
  },
};

// 12 проектов (все колонки заполнены)
export const TwelveProjects: Story = {
  args: {
    projects: twelveProjects,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

// Мобильная версия (1 колонка)
export const Mobile: Story = {
  args: {
    projects: mockProjects,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Планшет (3 колонки)
export const Tablet: Story = {
  args: {
    projects: mockProjects,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};