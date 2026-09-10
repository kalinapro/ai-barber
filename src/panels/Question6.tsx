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

export const Question6: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const handleAnswer = (answer: string) => {
    barberAnswers.faceShape = answer;
    routeNavigator.push('/results');
  };

  return (
    <Panel id={id}>
      <PanelHeader>AI-Барбер</PanelHeader>

      <Group>
        <Div>
          <h2 style={{ textAlign: 'center' }}>
            Какая у тебя форма лица?
          </h2>

          <p
            style={{
              textAlign: 'center',
              opacity: 0.7,
              marginBottom: 24,
            }}
          >
            Вопрос 6 из 6
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
              onClick={() => handleAnswer('Овальная')}
            >
              Овальная
            </Button>

            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => handleAnswer('Круглая')}
            >
              Круглая
            </Button>

            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => handleAnswer('Квадратная')}
            >
              Квадратная
            </Button>

            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => handleAnswer('Вытянутая')}
            >
              Прямоугольная / вытянутая
            </Button>

            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => handleAnswer('Треугольная')}
            >
              Треугольная
            </Button>

            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => handleAnswer('Не знаю')}
            >
              Не знаю
            </Button>
          </div>
        </Div>
      </Group>
    </Panel>
  );
};