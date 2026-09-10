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

export const Question3: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const handleAnswer = (answer: string) => {
    barberAnswers.changeLevel = answer;
    routeNavigator.push('/question4');
  };

  return (
    <Panel id={id}>
      <PanelHeader>AI-Барбер</PanelHeader>

      <Group>
        <Div>
          <h2 style={{ textAlign: 'center' }}>
            Насколько ты готов изменить образ?
          </h2>

          <p style={{ textAlign: 'center', opacity: 0.7 }}>
            Вопрос 3 из 6
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => handleAnswer('Минимально')}
            >
              Минимально
            </Button>

            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => handleAnswer('Немного')}
            >
              Немного изменить
            </Button>

            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => handleAnswer('Заметно')}
            >
              Готов к заметным изменениям
            </Button>

            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => handleAnswer('Полностью')}
            >
              Хочу полностью новый образ
            </Button>
          </div>
        </Div>
      </Group>
    </Panel>
  );
};