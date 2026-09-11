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
import { publicAsset } from '../utils/publicAsset';
import './panels.css';

const options = [
  {
    label: 'Очень короткие',
    value: 'Очень короткие',
    image: publicAsset('questions/hair-length/very-short.webp'),
  },
  {
    label: 'Короткие',
    value: 'Короткие',
    image: publicAsset('questions/hair-length/short.webp'),
  },
  {
    label: 'Средние',
    value: 'Средние',
    image: publicAsset('questions/hair-length/medium.webp'),
  },
  {
    label: 'Длинные',
    value: 'Длинные',
    image: publicAsset('questions/hair-length/long.webp'),
  },
];

export const Question1: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const handleAnswer = (answer: string) => {
    saveBarberAnswer('hairLength', answer);
    routeNavigator.push('/question2');
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
