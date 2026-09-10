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

import { saveBarberAnswer } from '../store';

export const Question5: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const handleAnswer = (answer: string) => {
    saveBarberAnswer('hairFeatures', answer);
    routeNavigator.push('/question6');
  };

  return (
    <Panel id={id}>
      <PanelHeader>AI-Барбер</PanelHeader>

      <Group>
        <Div>
          <h2 style={{ textAlign: 'center' }}>
            Есть ли особенности волос?
          </h2>

          <p
            style={{
              textAlign: 'center',
              opacity: 0.7,
              marginBottom: 24,
            }}
          >
            Вопрос 5 из 6
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
              onClick={() => handleAnswer('Тонкие')}
            >
              Тонкие волосы
            </Button>

            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => handleAnswer('Густые')}
            >
              Густые волосы
            </Button>

            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => handleAnswer('Вьющиеся')}
            >
              Вьющиеся волосы
            </Button>

            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => handleAnswer('Залысины')}
            >
              Есть залысины
            </Button>

            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => handleAnswer('Нет особенностей')}
            >
              Ничего из этого
            </Button>
          </div>
        </Div>
      </Group>
    </Panel>
  );
};