import bridge from '@vkontakte/vk-bridge';
import { hairstyles } from './recommendations';
import { VK_STORAGE_KEYS, vkStorageGet, vkStorageSet } from './vkStorage';

const validIds = new Set(hairstyles.map(({ id }) => id));

type StorageArea = 'local' | 'session';

type ProgressItem = {
  cloudKey: string;
  localKey: string;
  storage: StorageArea;
  normalize: (value: string) => string | undefined;
};

const normalizeObject = (value: string) => {
  try {
    const parsed: unknown = JSON.parse(value);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? JSON.stringify(parsed)
      : undefined;
  } catch {
    return undefined;
  }
};

const normalizeIds = (value: string, maximum?: number) => {
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return undefined;
    const ids = [...new Set(parsed.filter(
      (id): id is string => typeof id === 'string' && validIds.has(id),
    ))];
    return JSON.stringify(maximum ? ids.slice(0, maximum) : ids);
  } catch {
    return undefined;
  }
};

const normalizeSelected = (value: string) => validIds.has(value) ? value : undefined;

const normalizeFeedback = (value: string) => {
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return undefined;
    return JSON.stringify(Object.fromEntries(Object.entries(parsed).filter(
      ([id, feedback]) => validIds.has(id) && (feedback === 'like' || feedback === 'dislike'),
    )));
  } catch {
    return undefined;
  }
};

const progressItems: ProgressItem[] = [
  { cloudKey: VK_STORAGE_KEYS.answers, localKey: 'ai-barber-answers', storage: 'session', normalize: normalizeObject },
  { cloudKey: VK_STORAGE_KEYS.selected, localKey: 'ai-barber-selected-hairstyle', storage: 'local', normalize: normalizeSelected },
  { cloudKey: VK_STORAGE_KEYS.favorites, localKey: 'ai-barber-favorites', storage: 'local', normalize: normalizeIds },
  { cloudKey: VK_STORAGE_KEYS.history, localKey: 'ai-barber-history', storage: 'local', normalize: (value) => normalizeIds(value, 5) },
  { cloudKey: VK_STORAGE_KEYS.feedback, localKey: 'ai-barber-feedback', storage: 'local', normalize: normalizeFeedback },
];

const getStorage = (area: StorageArea) => area === 'local' ? localStorage : sessionStorage;

export async function initializeUserProgress(): Promise<void> {
  try {
    await bridge.send('VKWebAppInit');
  } catch (error) {
    console.info('VK Bridge недоступен вне VK:', error);
  }

  for (const item of progressItems) {
    let localValue: string | undefined;
    try {
      const rawLocalValue = getStorage(item.storage).getItem(item.localKey);
      localValue = rawLocalValue ? item.normalize(rawLocalValue) : undefined;
    } catch {
      // In-memory stores will remain usable when browser storage is unavailable.
    }

    const cloudValue = await vkStorageGet(item.cloudKey);
    const normalizedCloudValue = cloudValue ? item.normalize(cloudValue) : undefined;

    if (normalizedCloudValue !== undefined) {
      try {
        getStorage(item.storage).setItem(item.localKey, normalizedCloudValue);
      } catch {
        // Providers can still start with an empty in-memory value.
      }
    } else if (localValue !== undefined) {
      // Sequential migration deliberately avoids a burst of StorageSet calls.
      await vkStorageSet(item.cloudKey, localValue);
    }
  }
}
