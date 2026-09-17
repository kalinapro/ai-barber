import { createContext, createElement, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { hairstyles } from './recommendations';

const STORAGE_KEY = 'ai-barber-history';
const MAX_HISTORY = 5;
const validIds = new Set(hairstyles.map(({ id }) => id));

const saveHistory = (history: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // React state remains usable when storage is unavailable.
  }
};

export function getHistory(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(value)
      ? [...new Set(value.filter((id): id is string => typeof id === 'string' && validIds.has(id)))].slice(0, MAX_HISTORY)
      : [];
  } catch {
    return [];
  }
}

export function addToHistory(id: string): string[] {
  if (!validIds.has(id)) return getHistory();
  const next = [id, ...getHistory().filter((historyId) => historyId !== id)].slice(0, MAX_HISTORY);
  saveHistory(next);
  return next;
}

type HistoryContextValue = { history: string[]; addToHistory: (id: string) => void };
const HistoryContext = createContext<HistoryContextValue | undefined>(undefined);

export const HistoryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [history, setHistory] = useState(getHistory);
  const value = useMemo(() => ({
    history,
    addToHistory: (id: string) => setHistory((current) => {
      if (!validIds.has(id)) return current;
      const next = [id, ...current.filter((historyId) => historyId !== id)].slice(0, MAX_HISTORY);
      saveHistory(next);
      return next;
    }),
  }), [history]);
  return createElement(HistoryContext.Provider, { value }, children);
};

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory must be used inside HistoryProvider');
  return context;
}
