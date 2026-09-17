import bridge from '@vkontakte/vk-bridge';

export const VK_STORAGE_KEYS = {
  answers: 'ai_barber_answers',
  selected: 'ai_barber_selected',
  favorites: 'ai_barber_favorites',
  history: 'ai_barber_history',
  feedback: 'ai_barber_feedback',
} as const;

export async function vkStorageGet(key: string): Promise<string | undefined> {
  try {
    const result = await bridge.send('VKWebAppStorageGet', { keys: [key] });
    return result.keys.find((item) => item.key === key)?.value || undefined;
  } catch (error) {
    console.info('VK Storage недоступен, используется локальное хранилище:', error);
    return undefined;
  }
}

export async function vkStorageSet(key: string, value: string): Promise<boolean> {
  try {
    await bridge.send('VKWebAppStorageSet', { key, value });
    return true;
  } catch (error) {
    console.info('Не удалось сохранить прогресс в VK Storage:', error);
    return false;
  }
}

// A single queue prevents older writes from overtaking newer writes, while
// keeping failures isolated so that later changes can still be synchronized.
let writeQueue: Promise<unknown> = Promise.resolve();

export function queueVkStorageSet(key: string, value: string): void {
  writeQueue = writeQueue.then(() => vkStorageSet(key, value));
}
