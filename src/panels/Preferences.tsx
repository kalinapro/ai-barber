import { FC, useState } from 'react';
import { Alert, Button, Div, Group, NavIdProps, Panel, PanelHeader } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { FeedbackControls } from '../components/FeedbackControls';
import { FeedbackValue, useFeedback } from '../feedbackStore';
import { hairstyles } from '../recommendations';
import { useSelectedHairstyle } from '../selectedHairstyleStore';

export const Preferences: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { feedback, clear, clearAll } = useFeedback();
  const { saveSelectedHairstyle } = useSelectedHairstyle();
  const [confirmingClear, setConfirmingClear] = useState(false);
  const open = (hairstyleId: string, route: '/selected' | '/barber-guide') => {
    saveSelectedHairstyle(hairstyleId);
    routeNavigator.push(route);
  };
  const hasFeedback = Object.keys(feedback).length > 0;

  const section = (title: string, value: FeedbackValue) => {
    const items = hairstyles.filter(({ id: hairstyleId }) => feedback[hairstyleId] === value);
    return (
      <section className="preferences-section">
        <h2>{title}</h2>
        {items.length === 0 ? (
          <div className="preferences-empty">Пока здесь пусто</div>
        ) : (
          <div className="collection-grid">
            {items.map((hairstyle) => (
              <article className="collection-card" key={hairstyle.id}>
                <img src={hairstyle.image} alt={hairstyle.name} loading="lazy" />
                <h3>{hairstyle.name}</h3>
                <FeedbackControls hairstyleId={hairstyle.id} />
                <div className="collection-card__actions">
                  <Button stretched size="l" onClick={() => open(hairstyle.id, '/selected')}>
                    Открыть
                  </Button>
                  <Button stretched size="l" mode="secondary" onClick={() => open(hairstyle.id, '/barber-guide')}>
                    Показать барберу
                  </Button>
                  <Button stretched size="l" mode="tertiary" onClick={() => clear(hairstyle.id)}>
                    Удалить оценку
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  };

  return (
    <Panel id={id}>
      <PanelHeader>Мои предпочтения</PanelHeader>
      <Group>
        <Div className="collection-page preferences-page">
          {!hasFeedback && (
            <div className="collection-empty preferences-intro">
              <h1>Ты пока не отметил ни одной стрижки</h1>
              <p>Оцени варианты, чтобы сохранить свои предпочтения на этом устройстве.</p>
              <Button size="l" onClick={() => routeNavigator.push('/results')}>
                Посмотреть рекомендации
              </Button>
            </div>
          )}
          {section('Мне нравится', 'like')}
          {section('Не моё', 'dislike')}
          {hasFeedback && (
            <Button
              className="preferences-clear"
              mode="secondary"
              size="l"
              onClick={() => setConfirmingClear(true)}
            >
              Очистить оценки
            </Button>
          )}
        </Div>
      </Group>
      {confirmingClear && (
        <Alert
          title="Удалить все оценки?"
          description="Это удалит все отметки «Нравится» и «Не моё» на этом устройстве."
          actions={[
            { title: 'Отмена', mode: 'cancel' },
            { title: 'Удалить', mode: 'destructive', action: clearAll },
          ]}
          actionsLayout="horizontal"
          onClose={() => setConfirmingClear(false)}
          onClosed={() => setConfirmingClear(false)}
        />
      )}
    </Panel>
  );
};
