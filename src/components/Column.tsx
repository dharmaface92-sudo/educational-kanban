import { Droppable } from '@hello-pangea/dnd';
import {
  Inbox,
  Loader,
  Eye,
  AlertCircle,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import type { Card, ColumnConfig } from '../types';
import CardItem from './CardItem';

interface ColumnProps {
  column: ColumnConfig;
  cards: Card[];
  role: 'student' | 'curator';
  onCuratorAction: (cardId: string, action: 'approve' | 'reject') => void;
}

const ICONS: Record<string, LucideIcon> = {
  Inbox,
  Loader,
  Eye,
  AlertCircle,
  CheckCircle2,
};

export default function Column({ column, cards, role, onCuratorAction }: ColumnProps) {
  const Icon = ICONS[column.icon] ?? Inbox;
  const totalSP = cards.reduce((sum, c) => sum + c.story_points, 0);

  return (
    <div className="flex flex-col w-[300px] shrink-0 bg-slate-50/80 rounded-2xl border border-slate-200 max-h-full">
      <div className={`px-4 pt-4 pb-3 border-b-2 ${column.accent}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon size={18} className="text-slate-600" />
            <h2 className="text-sm font-semibold text-slate-700">
              {column.title}
            </h2>
          </div>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${column.badgeBg} ${column.badgeText}`}>
            {cards.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${column.dotColor}`} />
          <span className="text-[11px] text-slate-400">
            {totalSP} {totalSP === 1 ? 'story point' : 'story points'}
          </span>
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-y-auto p-3 space-y-2.5 min-h-[120px] transition-colors duration-150 ${
              snapshot.isDraggingOver ? 'bg-slate-100' : ''
            }`}
          >
            {cards.length === 0 && !snapshot.isDraggingOver ? (
              <div className="flex flex-col items-center justify-center py-10 text-slate-300">
                <Inbox size={28} strokeWidth={1.5} />
                <span className="text-xs mt-2">Пусто</span>
              </div>
            ) : (
              cards.map((card, index) => (
                <CardItem key={card.id} card={card} index={index} role={role} onCuratorAction={onCuratorAction} />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
