import { FC } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  Div,
  Button,
  NavIdProps,
} from '@vkontakte/vkui';

import { UserInfo } from '@vkontakte/vk-bridge';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { hairstyles } from '../recommendations';
import {
  useSelectedHairstyle,
} from '../selectedHairstyleStore';
import './panels.css';

const steps = [
  'Ответь на 6 коротких вопросов',
  'AI-Барбер учтёт длину и особенности волос, форму лица и предпочтения',
  'Получи 3 подходящие стрижки',
  'Выбери понравившийся вариант',
  'Получи подсказку, что сказать барберу',
];

const benefits = [
  ['✨', '3 персональных варианта'],
  ['📷', 'Фото каждой стрижки'],
  ['💡', 'Объяснение, почему она подходит'],
  ['💬', 'Инструкция для барбера'],
  ['✂️', 'Доступ к каталогу из 20 стрижек'],
];

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { selectedHairstyleId, clearSelectedHairstyle } =
    useSelectedHairstyle();

  const savedHairstyle = hairstyles.find(
    (item) => item.id === selectedHairstyleId,
  );

  return (
    <Panel id={id}>
      <PanelHeader>AI-Барбер</PanelHeader>

      <Group>
        <Div>
          <div className="panel-content">
            <section className="home-hero">
              <div className="home-hero__icon" aria-hidden="true">✂️</div>
              <h1>Найди стрижку, которая подходит именно тебе</h1>
              <p className="home-hero__description">
                AI-Барбер подберёт варианты по твоим волосам, форме лица
                и стилю — и подскажет, как объяснить выбор барберу.
              </p>
              <div className="home-hero__facts" aria-label="Кратко о подборе">
                <span className="home-hero__fact">6 вопросов</span>
                <span className="home-hero__fact">Около 2 минут</span>
                <span className="home-hero__fact">3 рекомендации</span>
              </div>
              <div className="home-hero__button">
                <Button
                  stretched
                  size="l"
                  onClick={() => routeNavigator.push('/question1')}
                >
                  Подобрать стрижку
                </Button>
              </div>
            </section>

            <section className="home-section">
              <h2 className="home-section__title">Как это работает</h2>
              <div className="steps-grid">
                {steps.map((step, index) => (
                  <div className="step-card" key={step}>
                    <div className="step-card__number">{index + 1}</div>
                    <div className="step-card__text">{step}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="home-section">
              <h2 className="home-section__title">Что ты получишь</h2>
              <div className="benefits-grid">
                {benefits.map(([icon, benefit]) => (
                  <div className="benefit-card" key={benefit}>
                    <span className="benefit-card__icon" aria-hidden="true">
                      {icon}
                    </span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            {savedHairstyle && (
              <div
                style={{
                  marginTop: 28,
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    opacity: 0.6,
                    marginBottom: 8,
                  }}
                >
                  Твой выбор
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: 18,
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={savedHairstyle.image}
                    alt={savedHairstyle.name}
                    decoding="async"
                    loading="lazy"
                    style={{
                      display: 'block',
                      width: '100%',
                      aspectRatio: '4 / 5',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      borderRadius: 12,
                    }}
                  />

                  <div>
                    <h2
                      style={{
                        marginTop: 0,
                        marginBottom: 8,
                      }}
                    >
                      {savedHairstyle.name}
                    </h2>

                    <p
                      style={{
                        lineHeight: 1.5,
                        marginBottom: 16,
                      }}
                    >
                      {savedHairstyle.description}
                    </p>

                    <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  }}
>
  <Button
    stretched
    size="l"
    onClick={() =>
      routeNavigator.push('/selected')
    }
  >
    Открыть
  </Button>

  <Button
    stretched
    size="l"
    mode="secondary"
    onClick={() =>
      routeNavigator.push('/catalog')
    }
  >
    Выбрать другую
  </Button>

  <Button
    stretched
    size="l"
    mode="tertiary"
    onClick={clearSelectedHairstyle}
  >
    Удалить выбор
  </Button>
</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Div>
      </Group>
    </Panel>
  );
};
