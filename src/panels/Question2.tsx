import { FC } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  Div,
  NavIdProps,
} from '@vkontakte/vkui';

import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { saveBarberAnswer } from '../store';
import './panels.css';

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
    saveBarberAnswer('style', answer);
    routeNavigator.push('/question3');
  };

  return (
    <Panel id={id}>
      <PanelHeader>AI-Барбер</PanelHeader>

      <Group>
        <Div>
          <div className="panel-content">
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

            <div className="answer-card-grid">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="answer-card"
                >
                  <img
                    src={option.image}
                    alt={option.label}
                    className="answer-card__image"
                  />

                  <div
                    className="answer-card__label"
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
