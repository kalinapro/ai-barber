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
    label: 'Овальная',
    value: 'Овальная',
    image: publicAsset('questions/face-shape/oval.webp'),
  },
  {
    label: 'Круглая',
    value: 'Круглая',
    image: publicAsset('questions/face-shape/round.webp'),
  },
  {
    label: 'Квадратная',
    value: 'Квадратная',
    image: publicAsset('questions/face-shape/square.webp'),
  },
  {
    label: 'Вытянутая',
    value: 'Вытянутая',
    image: publicAsset('questions/face-shape/long.webp'),
  },
  {
    label: 'Треугольная',
    value: 'Треугольная',
    image: publicAsset('questions/face-shape/triangular.webp'),
  },
  {
    label: 'Не знаю',
    value: 'Не знаю',
    image: publicAsset('questions/face-shape/other.webp'),
  },
];

export const Question6: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const handleAnswer = (answer: string) => {
    saveBarberAnswer('faceShape', answer);
    routeNavigator.push('/results');
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
              Какая у тебя форма лица?
            </h1>

            <p
              style={{
                textAlign: 'center',
                opacity: 0.7,
                marginBottom: 8,
              }}
            >
              Вопрос 6 из 6
            </p>

            <p
              style={{
                textAlign: 'center',
                opacity: 0.7,
                marginTop: 0,
                marginBottom: 24,
              }}
            >
              Если не уверен — выбери «Не знаю».
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
