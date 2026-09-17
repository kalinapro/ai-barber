import { FC } from 'react';
import { Button } from '@vkontakte/vkui';

import { FeedbackValue, useFeedback } from '../feedbackStore';

type FeedbackControlsProps = {
  hairstyleId: string;
  title?: string;
};

export const FeedbackControls: FC<FeedbackControlsProps> = ({
  hairstyleId,
  title = 'Твоя оценка',
}) => {
  const { feedback, toggle } = useFeedback();
  const selected = feedback[hairstyleId];

  const react = (value: FeedbackValue) => {
    toggle(hairstyleId, value);
  };

  return (
    <section className="feedback-controls" aria-label={title}>
      <b className="feedback-controls__title">{title}</b>
      <div className="feedback-controls__buttons">
        <Button
          size="m"
          mode={selected === 'like' ? 'primary' : 'secondary'}
          aria-pressed={selected === 'like'}
          onClick={() => react('like')}
        >
          {selected === 'like' ? '✓ ' : '👍 '}Нравится
        </Button>
        <Button
          size="m"
          mode={selected === 'dislike' ? 'primary' : 'secondary'}
          aria-pressed={selected === 'dislike'}
          onClick={() => react('dislike')}
        >
          {selected === 'dislike' ? '✓ ' : '👎 '}Не моё
        </Button>
      </div>
    </section>
  );
};
