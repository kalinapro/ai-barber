import { FC } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  Div,
  Button,
  NavIdProps,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { barberAnswers } from '../store';

export const Question4: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const handleAnswer = (answer: string) => {
    barberAnswers.stylingTime = answer;
    routeNavigator.push('/question5');
  };

  return (
    <Panel id={id}>
      <PanelHeader>AI-Барбер</PanelHeader>

      <Group>
        <Div>
          <h2 style={{ textAlign: 'center' }}>
            Сколько времени ты готов тратить на укладку?
          </h2>

          <p style={{ textAlign: 'center', opacity: 0.7 }}>
            Вопрос 4 из 6
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Button stretched size="l" mode="secondary" onClick={() => handleAnswer('0 минут')}>
              Вообще не хочу укладывать
            </Button>

            <Button stretched size="l" mode="secondary" onClick={() => handleAnswer('До 5 минут')}>
              До 5 минут
            </Button>

            <Button stretched size="l" mode="secondary" onClick={() => handleAnswer('5–15 минут')}>
              5–15 минут
            </Button>

            <Button stretched size="l" mode="secondary" onClick={() => handleAnswer('Больше 15 минут')}>
              Готов тратить больше времени
            </Button>
          </div>
        </Div>
      </Group>
    </Panel>
  );
};