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
    label: 'Тонкие',
    value: 'Тонкие',
    image: '/questions/hair-features/thin.webp',
  },
  {
    label: 'Густые',
    value: 'Густые',
    image: '/questions/hair-features/thick.webp',
  },
  {
    label: 'Вьющиеся',
    value: 'Вьющиеся',
    image: '/questions/hair-features/curly.webp',
  },
  {
    label: 'Залысины',
    value: 'Залысины',
    image: '/questions/hair-features/receding.webp',
  },
  {
    label: 'Нет особенностей',
    value: 'Нет особенностей',
    image: '/questions/hair-features/normal.webp',
  },
];

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
          <div className="panel-content">
            <h1
              style={{
                textAlign: 'center',
                marginBottom: 8,
              }}
            >
              Какие у тебя волосы?
            </h1>

            <p
              style={{
                textAlign: 'center',
                opacity: 0.7,
                marginBottom: 24,
              }}
            >
              Вопрос 5 из 6
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
                    decoding="async"
                    className="answer-card__image"
                  />

                  <div className="answer-card__label">
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
