import { useState, useEffect } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { KanbanSquare, Timer } from 'lucide-react';
import { COLUMNS, SEED_CARDS, type Card, type CardStatus } from './types';
import Column from './components/Column';
import { simulate25Hours } from './utils/sla';

const STORAGE_KEY = 'kanban-learning-board-cards';

function loadCards(): Card[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Card[];
  } catch {
    // ignore parse errors
  }
  return SEED_CARDS;
}

function onDragEndHandler(
  result: DropResult,
  cards: Card[],
  setCards: (updater: (prev: Card[]) => Card[]) => void
) {
  const { destination, source, draggableId } = result;
  if (!destination) return;
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const newStatus = destination.droppableId as CardStatus;

  setCards((prev) =>
    prev.map((card) => {
      if (card.id !== draggableId) return card;

      const updated: Card = { ...card, status: newStatus };

      if (newStatus === 'on_review') {
        updated.review_started_at = new Date().toISOString();
      } else if (newStatus === 'done' || newStatus === 'needs_rework') {
        updated.review_started_at = null;
      }

      return updated;
    })
  );
}

export default function App() {
  const [cards, setCards] = useState<Card[]>(loadCards);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch {
      // ignore storage errors
    }
  }, [cards]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <KanbanSquare size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight">
                Kanban-доска обучения
              </h1>
              <p className="text-xs text-slate-400">
                Отслеживай прогресс по модулям и заданиям
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCards((prev) => simulate25Hours(prev))}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 hover:border-amber-300 transition-colors duration-150"
            >
              <Timer size={14} className="shrink-0" />
              Симулировать 25 часов
            </button>
            <div className="hidden sm:flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-800">
                {cards.filter((c) => c.status === 'done').length}
                <span className="text-slate-300 text-base">/{cards.length}</span>
              </div>
              <div className="text-[11px] text-slate-400">Заданий выполнено</div>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-800">
                {cards.reduce((s, c) => s + c.story_points, 0)}
              </div>
              <div className="text-[11px] text-slate-400">Всего story points</div>
            </div>
            </div>
          </div>
        </div>
      </header>

      {/* Board */}
      <main className="p-6">
        <DragDropContext onDragEnd={(result) => onDragEndHandler(result, cards, setCards)}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                column={column}
                cards={cards.filter((c) => c.status === column.id)}
              />
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  );
}
