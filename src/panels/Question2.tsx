import { FC } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  Div,
  NavIdProps,
} from '@vkontakte/vkui';

import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { barberAnswers } from '../store';

const options = [
  {
    label: 'Классический',
    value: 'Классический',
    image: '/questions/style/classic.jpg',
  },
  {
    label: 'Современный',
    value: 'Современный',
    image: '/questions/style/modern.jpg',
  },
  {
    label: 'Спортивный',
    value: 'Спортивный',
    image: '/questions/style/sporty.jpg',
  },
  {
    label: 'Не знаю — выбери за меня',
    value: 'Не знаю',
    image: '/questions/style/other.jpg',
  },
];

export const Question2: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const handleAnswer = (answer: string) => {
    barberAnswers.style = answer;
    routeNavigator.push('/question3');
  };

  return (
    <Panel id={id}>
      <PanelHeader>AI-Барбер</PanelHeader>

      <Group>
        <Div>
          <div
            style={{
              width: '100%',
              maxWidth: 900,
              margin: '0 auto',
            }}
          >
            <h1
              style={{
                textAlign: 'center',
                marginBottom: 8,
              }}
            >
              Какой стиль тебе ближе?
            </h1>

            <p
              style={{
                textAlign: 'center',
                opacity: 0.7,
                marginBottom: 24,
              }}
            >
              Вопрос 2 из 6
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 16,
              }}
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  style={{
                    padding: 0,
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <img
                    src={option.image}
                    alt={option.label}
                    style={{
                      display: 'block',
                      width: '100%',
                      aspectRatio: '4 / 5',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                    }}
                  />

                  <div
                    style={{
                      padding: 14,
                      fontSize: 18,
                      fontWeight: 600,
                      textAlign: 'center',
                      lineHeight: 1.3,
                    }}
                  >
                    {option.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Div>
      </Group>
    </Panel>
  );
};