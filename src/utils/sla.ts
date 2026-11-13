import type { Card } from '../types';

const SLA_MS = 24 * 60 * 60 * 1000;

export function isOverdue(card: Card): boolean {
  if (card.status !== 'on_review' || !card.review_started_at) return false;
  return Date.now() - new Date(card.review_started_at).getTime() > SLA_MS;
}

export function simulate25Hours(cards: Card[]): Card[] {
  const shifted = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();
  return cards.map((card) =>
    card.status === 'on_review' ? { ...card, review_started_at: shifted } : card
  );
}
