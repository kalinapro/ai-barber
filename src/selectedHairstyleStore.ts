const STORAGE_KEY = 'ai-barber-selected-hairstyle';

const savedId = localStorage.getItem(STORAGE_KEY) ?? '';

export const selectedHairstyle = {
  id: savedId,
};

export function saveSelectedHairstyle(id: string) {
  selectedHairstyle.id = id;
  localStorage.setItem(STORAGE_KEY, id);
}

export function clearSelectedHairstyle() {
  selectedHairstyle.id = '';
  localStorage.removeItem(STORAGE_KEY);
}