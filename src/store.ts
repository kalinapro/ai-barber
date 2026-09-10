export type BarberAnswers = {
  hairLength?: string;
  style?: string;
  changeLevel?: string;
  stylingTime?: string;
  hairFeatures?: string;
  faceShape?: string;
};

export type BarberAnswerKey = keyof BarberAnswers;

const STORAGE_KEY = 'ai-barber-answers';
const answerKeys: BarberAnswerKey[] = [
  'hairLength',
  'style',
  'changeLevel',
  'stylingTime',
  'hairFeatures',
  'faceShape',
];

function restoreAnswers(): BarberAnswers {
  try {
    const savedAnswers = sessionStorage.getItem(STORAGE_KEY);
    if (!savedAnswers) {
      return {};
    }

    const parsed: unknown = JSON.parse(savedAnswers);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {};
    }

    return answerKeys.reduce<BarberAnswers>((answers, key) => {
      const value = (parsed as Record<string, unknown>)[key];
      if (typeof value === 'string' && value.length > 0) {
        answers[key] = value;
      }
      return answers;
    }, {});
  } catch {
    return {};
  }
}

export const barberAnswers: BarberAnswers = restoreAnswers();

export function saveBarberAnswer(key: BarberAnswerKey, value: string) {
  barberAnswers[key] = value;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(barberAnswers));
  } catch {
    // Answers remain available in memory when session storage is unavailable.
  }
}

export function getFirstUnansweredQuestion(): string | undefined {
  const routes: Record<BarberAnswerKey, string> = {
    hairLength: '/question1',
    style: '/question2',
    changeLevel: '/question3',
    stylingTime: '/question4',
    hairFeatures: '/question5',
    faceShape: '/question6',
  };

  const firstUnansweredKey = answerKeys.find((key) => !barberAnswers[key]);
  return firstUnansweredKey ? routes[firstUnansweredKey] : undefined;
}
