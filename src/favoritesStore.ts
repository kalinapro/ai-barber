import {
  createContext,
  createElement,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

import { hairstyles } from './recommendations';
import { queueVkStorageSet, VK_STORAGE_KEYS } from './vkStorage';

const STORAGE_KEY = 'ai-barber-favorites';
const validIds = new Set(hairstyles.map(({ id }) => id));

export function getFavorites(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(value)
      ? [...new Set(value.filter((id): id is string => typeof id === 'string' && validIds.has(id)))]
      : [];
  } catch {
    return [];
  }
}

export const isFavorite = (id: string) => getFavorites().includes(id);

const saveFavorites = (ids: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // React state remains usable when storage is unavailable.
  }
  queueVkStorageSet(VK_STORAGE_KEYS.favorites, JSON.stringify(ids));
};

export function addFavorite(id: string): string[] {
  const current = getFavorites();
  const next = validIds.has(id) && !current.includes(id) ? [...current, id] : current;
  saveFavorites(next);
  return next;
}

export function removeFavorite(id: string): string[] {
  const next = getFavorites().filter((favoriteId) => favoriteId !== id);
  saveFavorites(next);
  return next;
}

export function toggleFavorite(id: string): string[] {
  return isFavorite(id) ? removeFavorite(id) : addFavorite(id);
}

type FavoritesContextValue = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [favorites, setFavorites] = useState(getFavorites);
  const value = useMemo<FavoritesContextValue>(() => ({
    favorites,
    isFavorite: (id) => favorites.includes(id),
    toggleFavorite: (id) => setFavorites((current) => {
      if (!validIds.has(id)) return current;
      const next = current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id];
      saveFavorites(next);
      return next;
    }),
    removeFavorite: (id) => setFavorites((current) => {
      const next = current.filter((favoriteId) => favoriteId !== id);
      saveFavorites(next);
      return next;
    }),
  }), [favorites]);

  return createElement(FavoritesContext.Provider, { value }, children);
};

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider');
  return context;
}
