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
    label: 'Очень короткие',
    value: 'Очень короткие',
    image: '/questions/hair-length/very-short.jpg',
  },
  {
    label: 'Короткие',
    value: 'Короткие',
    image: '/questions/hair-length/short.jpg',
  },
  {
    label: 'Средние',
    value: 'Средние',
    image: '/questions/hair-length/medium.jpg',
  },
  {
    label: 'Длинные',
    value: 'Длинные',
    image: '/questions/hair-length/long.jpg',
  },
];

export const Question1: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const handleAnswer = (answer: string) => {
    barberAnswers.hairLength = answer;
    routeNavigator.push('/question2');
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
              Какая у тебя сейчас длина волос?
            </h1>

            <p
              style={{
                textAlign: 'center',
                opacity: 0.7,
                marginBottom: 24,
              }}
            >
              Вопрос 1 из 6
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