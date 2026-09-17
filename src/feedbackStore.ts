import {
  createContext,
  createElement,
  Fragment,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Snackbar } from '@vkontakte/vkui';
import { hairstyles } from './recommendations';
import { queueVkStorageSet, VK_STORAGE_KEYS } from './vkStorage';

export type FeedbackValue = 'like' | 'dislike';
export type HairstyleFeedback = Record<string, FeedbackValue>;

const STORAGE_KEY = 'ai-barber-feedback';
const validIds = new Set(hairstyles.map(({ id }) => id));

const isFeedbackValue = (value: unknown): value is FeedbackValue =>
  value === 'like' || value === 'dislike';

export function getFeedback(): HairstyleFeedback {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {};

    const entries = Object.entries(stored).filter(
      ([id, value]) => validIds.has(id) && isFeedbackValue(value),
    ) as [string, FeedbackValue][];

    return Object.fromEntries(entries);
  } catch {
    return {};
  }
}

const saveFeedback = (feedback: HairstyleFeedback) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
  } catch {
    // Keep the in-memory UI usable when storage is unavailable.
  }
  queueVkStorageSet(VK_STORAGE_KEYS.feedback, JSON.stringify(feedback));
};

export const getHairstyleFeedback = (id: string) => getFeedback()[id];

export function setHairstyleFeedback(id: string, value: FeedbackValue) {
  const next = { ...getFeedback(), [id]: value };
  saveFeedback(next);
  return next;
}

export function clearHairstyleFeedback(id: string) {
  const next = { ...getFeedback() };
  delete next[id];
  saveFeedback(next);
  return next;
}

export function toggleHairstyleFeedback(id: string, value: FeedbackValue) {
  return getHairstyleFeedback(id) === value
    ? clearHairstyleFeedback(id)
    : setHairstyleFeedback(id, value);
}

export const getLikedHairstyleIds = () => Object.entries(getFeedback())
  .filter(([, value]) => value === 'like')
  .map(([id]) => id);

export const getDislikedHairstyleIds = () => Object.entries(getFeedback())
  .filter(([, value]) => value === 'dislike')
  .map(([id]) => id);

// TODO: liked/disliked IDs may inform a future recommendation engine. They must
// not affect recommendation scores, percentages, or ordering in the current version.

type FeedbackContextValue = {
  feedback: HairstyleFeedback;
  toggle: (id: string, value: FeedbackValue) => boolean;
  clear: (id: string) => void;
  clearAll: () => void;
};

const FeedbackContext = createContext<FeedbackContextValue | undefined>(undefined);

export const FeedbackProvider: FC<PropsWithChildren> = ({ children }) => {
  const [feedback, setFeedback] = useState(getFeedback);
  const [message, setMessage] = useState<string>();
  const value = useMemo<FeedbackContextValue>(() => ({
    feedback,
    toggle: (id, nextValue) => {
      const removed = feedback[id] === nextValue;
      setFeedback(toggleHairstyleFeedback(id, nextValue));
      setMessage(removed
        ? 'Оценка удалена'
        : nextValue === 'like'
          ? 'Добавили в твои предпочтения'
          : 'Учтём, что этот вариант тебе не нравится');
      return removed;
    },
    clear: (id) => setFeedback(clearHairstyleFeedback(id)),
    clearAll: () => {
      saveFeedback({});
      setFeedback({});
    },
  }), [feedback]);

  return createElement(
    FeedbackContext.Provider,
    { value },
    createElement(Fragment, null,
      children,
      message && createElement(Snackbar, {
        duration: 2500,
        onClose: () => undefined,
        onClosed: () => setMessage(undefined),
      }, message),
    ),
  );
};

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error('useFeedback must be used inside FeedbackProvider');
  return context;
}
