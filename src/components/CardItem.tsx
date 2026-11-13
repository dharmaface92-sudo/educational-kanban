import { Draggable } from '@hello-pangea/dnd';
import { Clock, MessageSquare, Timer, Check, Undo2, AlertTriangle } from 'lucide-react';
import type { Card } from '../types';
import { isOverdue } from '../utils/sla';

interface CardItemProps {
  card: Card;
  index: number;
  role: 'student' | 'curator';
  onCuratorAction: (cardId: string, action: 'approve' | 'reject') => void;
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

export default function CardItem({ card, index, role, onCuratorAction }: CardItemProps) {
  const overdue = isOverdue(card);
  const showCuratorButtons = role === 'curator' && card.status === 'on_review';
  const showReworkNotice = role === 'student' && card.status === 'needs_rework' && card.comment;

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

            {showCuratorButtons && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => onCuratorAction(card.id, 'approve')}
                  className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold px-2.5 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 transition-colors duration-150 shadow-sm"
                >
                  <Check size={14} className="shrink-0" />
                  Принять
                </button>
                <button
                  onClick={() => onCuratorAction(card.id, 'reject')}
                  className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold px-2.5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 active:bg-red-700 transition-colors duration-150 shadow-sm"
                >
                  <Undo2 size={14} className="shrink-0" />
                  Вернуть
                </button>
              </div>
            )}

            {showReworkNotice && (
              <div className="mt-3 bg-amber-50 border border-amber-300 rounded-lg p-3">
                <div className="flex items-start gap-1.5">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <p className="text-[11px] font-bold text-amber-800 mb-0.5">
                      Комментарий куратора
                    </p>
                    <p className="text-[11px] text-amber-700 leading-relaxed">
                      {card.comment}
                    </p>
                  </div>
                </div>
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
                {card.comment && role === 'curator' && (
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
