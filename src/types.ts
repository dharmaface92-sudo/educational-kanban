export type CardStatus =
  | 'backlog'
  | 'in_progress'
  | 'on_review'
  | 'needs_rework'
  | 'done';

export interface Card {
  id: string;
  title: string;
  module: string;
  story_points: number;
  status: CardStatus;
  review_started_at: string | null;
  comment: string | null;
}

export interface ColumnConfig {
  id: CardStatus;
  title: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
  dotColor: string;
  icon: string;
}

export const COLUMNS: ColumnConfig[] = [
  {
    id: 'backlog',
    title: 'Бэклог',
    accent: 'border-slate-300',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-600',
    dotColor: 'bg-slate-400',
    icon: 'Inbox',
  },
  {
    id: 'in_progress',
    title: 'В работе',
    accent: 'border-blue-400',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    dotColor: 'bg-blue-500',
    icon: 'Loader',
  },
  {
    id: 'on_review',
    title: 'На проверке',
    accent: 'border-amber-400',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    dotColor: 'bg-amber-500',
    icon: 'Eye',
  },
  {
    id: 'needs_rework',
    title: 'На доработке',
    accent: 'border-red-400',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
    dotColor: 'bg-red-500',
    icon: 'AlertCircle',
  },
  {
    id: 'done',
    title: 'Готово',
    accent: 'border-emerald-400',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    dotColor: 'bg-emerald-500',
    icon: 'CheckCircle2',
  },
];

export const SEED_CARDS: Card[] = [
  {
    id: 'c1',
    title: 'Изучить основы React: JSX и компоненты',
    module: 'React Basics',
    story_points: 3,
    status: 'done',
    review_started_at: null,
    comment: 'Отличная работа, материал усвоен полностью.',
  },
  {
    id: 'c2',
    title: 'Хуки: useState и useEffect на практике',
    module: 'React Hooks',
    story_points: 5,
    status: 'done',
    review_started_at: null,
    comment: 'Все задания выполнены. Можно двигаться дальше.',
  },
  {
    id: 'c3',
    title: 'Управление состоянием: Context API',
    module: 'State Management',
    story_points: 5,
    status: 'on_review',
    review_started_at: new Date(Date.now() - 86400000).toISOString(),
    comment: null,
  },
  {
    id: 'c4',
    title: 'TypeScript: типы и интерфейсы в React',
    module: 'TypeScript',
    story_points: 4,
    status: 'on_review',
    review_started_at: new Date(Date.now() - 3600000).toISOString(),
    comment: null,
  },
  {
    id: 'c5',
    title: 'Кастомные хуки: useLocalStorage',
    module: 'React Hooks',
    story_points: 3,
    status: 'needs_rework',
    review_started_at: new Date(Date.now() - 172800000).toISOString(),
    comment: 'Не обрабатывается случай с невалидным JSON. Добавь try/catch.',
  },
  {
    id: 'c6',
    title: 'Роутинг в SPA: React Router',
    module: 'Routing',
    story_points: 5,
    status: 'in_progress',
    review_started_at: null,
    comment: null,
  },
  {
    id: 'c7',
    title: 'Формы и валидация: React Hook Form',
    module: 'Forms',
    story_points: 4,
    status: 'in_progress',
    review_started_at: null,
    comment: null,
  },
  {
    id: 'c8',
    title: 'Тестирование: Jest и React Testing Library',
    module: 'Testing',
    story_points: 8,
    status: 'backlog',
    review_started_at: null,
    comment: null,
  },
  {
    id: 'c9',
    title: 'Оптимизация: useMemo, useCallback, memo',
    module: 'Performance',
    story_points: 5,
    status: 'backlog',
    review_started_at: null,
    comment: null,
  },
  {
    id: 'c10',
    title: 'Анимации: Framer Motion',
    module: 'Animations',
    story_points: 3,
    status: 'backlog',
    review_started_at: null,
    comment: null,
  },
  {
    id: 'c11',
    title: 'SSR и Next.js: серверный рендеринг',
    module: 'Next.js',
    story_points: 8,
    status: 'backlog',
    review_started_at: null,
    comment: null,
  },
];
