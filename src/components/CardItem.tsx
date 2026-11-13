import { Draggable } from '@hello-pangea/dnd';
import { Clock, MessageSquare, Timer } from 'lucide-react';
import type { Card } from '../types';
import { isOverdue } from '../utils/sla';

interface CardItemProps {
  card: Card;
  index: number;
}

function formatReviewTime(iso: string): string {
  const date = new Date(iso);
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 60) return `${diffMin} мин назад`;
  if (diffHr < 24) return `${diffHr} ч назад`;
  return `${diffDay} дн назад`;
}

export default function CardItem({ card, index }: CardItemProps) {
  const overdue = isOverdue(card);

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => {
        const dragging = snapshot.isDragging;

        let borderClass = 'bg-white border-slate-200 hover:shadow-md hover:border-slate-300';
        if (dragging) {
          borderClass = 'bg-white border-blue-300 shadow-lg ring-2 ring-blue-200 rotate-1';
        } else if (overdue) {
          borderClass = 'bg-white border-red-500 shadow-sm hover:shadow-md ring-1 ring-red-200';
        }

        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ ...provided.draggableProps.style }}
            className={`group rounded-xl border shadow-sm p-3.5 cursor-grab active:cursor-grabbing transition-shadow duration-200 ${borderClass}`}
          >
            <p className="text-sm font-medium text-slate-800 leading-snug mb-3">
              {card.title}
            </p>

            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                {card.module}
              </span>
              <span className="inline-flex items-center justify-center min-w-[26px] h-[26px] px-1.5 text-xs font-bold rounded-full bg-slate-100 text-slate-600">
                {card.story_points}
              </span>
            </div>

            {overdue && (
              <div className="mt-2.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full bg-red-100 text-red-700 border border-red-200">
                  <Timer size={12} className="shrink-0" />
                  Просрочено 24ч+
                </span>
              </div>
            )}

            {(card.review_started_at || card.comment) && (
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                {card.review_started_at && (
                  <div className={`flex items-center gap-1.5 text-[11px] ${overdue ? 'text-red-500 font-semibold' : 'text-slate-400'}`}>
                    <Clock size={12} className="shrink-0" />
                    <span>На проверке с {formatReviewTime(card.review_started_at)}</span>
                  </div>
                )}
                {card.comment && (
                  <div className="flex items-start gap-1.5 text-[11px] text-slate-500">
                    <MessageSquare size={12} className="shrink-0 mt-0.5" />
                    <span className="italic leading-relaxed">{card.comment}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }}
    </Draggable>
  );
}
