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

const STORAGE_KEY = 'ai-barber-selected-hairstyle';

type SelectedHairstyleContextValue = {
  selectedHairstyleId: string | undefined;
  saveSelectedHairstyle: (id: string) => void;
  clearSelectedHairstyle: () => void;
};

const SelectedHairstyleContext =
  createContext<SelectedHairstyleContextValue | undefined>(undefined);

function restoreSelectedHairstyleId(): string | undefined {
  try {
    const savedId = localStorage.getItem(STORAGE_KEY);
    return hairstyles.some((hairstyle) => hairstyle.id === savedId)
      ? savedId ?? undefined
      : undefined;
  } catch {
    return undefined;
  }
}

export const SelectedHairstyleProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [selectedHairstyleId, setSelectedHairstyleId] = useState(
    restoreSelectedHairstyleId,
  );

  const value = useMemo<SelectedHairstyleContextValue>(
    () => ({
      selectedHairstyleId,
      saveSelectedHairstyle: (id) => {
        if (!hairstyles.some((hairstyle) => hairstyle.id === id)) {
          return;
        }

        setSelectedHairstyleId(id);
        try {
          localStorage.setItem(STORAGE_KEY, id);
        } catch {
          // Selection remains available in React state when storage is unavailable.
        }
      },
      clearSelectedHairstyle: () => {
        setSelectedHairstyleId(undefined);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // React state is still cleared when storage is unavailable.
        }
      },
    }),
    [selectedHairstyleId],
  );

  return createElement(
    SelectedHairstyleContext.Provider,
    { value },
    children,
  );
};

export function useSelectedHairstyle() {
  const context = useContext(SelectedHairstyleContext);
  if (!context) {
    throw new Error(
      'useSelectedHairstyle must be used inside SelectedHairstyleProvider',
    );
  }
  return context;
}
