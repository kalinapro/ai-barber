import { FC, useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  Div,
  Button,
  NavIdProps,
} from '@vkontakte/vkui';

import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { barberAnswers, getFirstUnansweredQuestion } from '../store';
import { getRecommendations } from '../recommendations';
import { useSelectedHairstyle } from '../selectedHairstyleStore';

const MIN_MATCH_PERCENTAGE = 82;
const MAX_MATCH_PERCENTAGE = 96;
const EQUAL_SCORES_PERCENTAGE = 90;

/** Converts recommendation scores into a presentation-only 82–96% scale. */
const scoreToPercentage = (
  score: number,
  lowestScore: number,
  highestScore: number,
) => {
  if (highestScore === lowestScore) {
    return EQUAL_SCORES_PERCENTAGE;
  }

  const scorePosition =
    (score - lowestScore) / (highestScore - lowestScore);

  return Math.round(
    MIN_MATCH_PERCENTAGE +
      scorePosition *
        (MAX_MATCH_PERCENTAGE - MIN_MATCH_PERCENTAGE),
  );
};

export const Results: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { saveSelectedHairstyle } = useSelectedHairstyle();
  const firstUnansweredQuestion = getFirstUnansweredQuestion();

  useEffect(() => {
    if (firstUnansweredQuestion) {
      routeNavigator.replace(firstUnansweredQuestion);
    }
  }, [firstUnansweredQuestion, routeNavigator]);

  if (firstUnansweredQuestion) {
    return (
      <Panel id={id}>
        <PanelHeader>AI-Барбер</PanelHeader>
      </Panel>
    );
  }

  const recommendations = getRecommendations(barberAnswers).slice(0, 3);
  const scores = recommendations.map(({ score }) => score);
  const highestScore = Math.max(...scores);
  const lowestScore = Math.min(...scores);

  return (
    <Panel id={id}>
      <PanelHeader>AI-Барбер</PanelHeader>

      <Group>
        <Div className="results-page">
          <style>{`
            .results-page {
              box-sizing: border-box;
              width: 100%;
              max-width: 1120px;
              min-width: 0;
              margin: 0 auto;
              padding-right: clamp(12px, 2.5vw, 28px);
              padding-left: clamp(12px, 2.5vw, 28px);
            }

            .results-hero {
              max-width: 650px;
              margin: 0 auto 28px;
              text-align: center;
            }

            .results-hero__icon {
              margin-top: 12px;
              font-size: 44px;
            }

            .results-hero h1 {
              margin: 8px 0;
              font-size: clamp(28px, 5vw, 40px);
              line-height: 1.15;
            }

            .results-hero p {
              margin: 0;
              color: var(--vkui--color_text_secondary, #6d7885);
              font-size: 16px;
              line-height: 1.5;
            }

            .results-grid {
              display: grid;
              width: 100%;
              min-width: 0;
              grid-template-columns: repeat(
                auto-fit,
                minmax(min(100%, 290px), 1fr)
              );
              align-items: stretch;
              gap: 18px;
            }

            .result-card {
              box-sizing: border-box;
              display: flex;
              width: 100%;
              min-width: 0;
              padding: 14px;
              flex-direction: column;
              overflow: hidden;
              background: var(--vkui--color_background_content, #fff);
              border: 1px solid var(--vkui--color_separator_primary, rgba(0, 0, 0, 0.12));
              border-radius: 18px;
            }

            .result-card--best {
              border-color: rgba(227, 135, 36, 0.55);
              box-shadow: 0 10px 30px rgba(135, 83, 27, 0.12);
            }

            .result-card__image {
              box-sizing: border-box;
              display: block;
              width: 100%;
              max-width: 100%;
              aspect-ratio: 4 / 5;
              margin-bottom: 14px;
              object-fit: cover;
              object-position: center top;
              border-radius: 12px;
            }

            .result-card__meta {
              display: flex;
              min-height: 27px;
              min-width: 0;
              flex-wrap: wrap;
              align-items: center;
              justify-content: space-between;
              gap: 8px;
              margin-bottom: 7px;
              color: var(--vkui--color_text_secondary, #6d7885);
              font-size: 13px;
            }

            .result-card__badge {
              max-width: 100%;
              padding: 5px 9px;
              color: #7a4814;
              background: #fff0dc;
              border-radius: 999px;
              font-size: 12px;
              font-weight: 700;
              overflow-wrap: anywhere;
            }

            .result-card__match {
              min-width: 0;
              color: var(--vkui--color_text_positive, #2a9b5b);
              font-weight: 700;
              overflow-wrap: anywhere;
            }

            .result-card h2 {
              margin: 0 0 8px;
              font-size: 24px;
              line-height: 1.2;
              overflow-wrap: anywhere;
            }

            .result-card__description {
              margin: 0 0 16px;
              line-height: 1.5;
            }

            .result-card__section-title {
              display: block;
              margin-bottom: 8px;
              font-size: 15px;
            }

            .result-card__reasons {
              padding: 0;
              margin: 0 0 16px;
              list-style: none;
            }

            .result-card__reason {
              display: flex;
              align-items: flex-start;
              gap: 8px;
              margin-top: 7px;
              line-height: 1.4;
            }

            .result-card__check {
              flex: 0 0 auto;
              color: var(--vkui--color_text_positive, #2a9b5b);
              font-weight: 800;
            }

            .result-card__tip {
              padding: 13px;
              margin-top: auto;
              background: var(--vkui--color_background_secondary, #f2f3f5);
              border-left: 3px solid #e38724;
              border-radius: 10px;
              line-height: 1.5;
              overflow-wrap: anywhere;
            }

            .result-card__actions {
              display: grid;
              gap: 9px;
              margin-top: 14px;
            }

            .result-card__soon {
              margin-top: -3px;
              color: var(--vkui--color_text_secondary, #6d7885);
              font-size: 12px;
              text-align: center;
            }

            .results-footer {
              display: grid;
              max-width: 620px;
              margin: 28px auto 0;
              gap: 10px;
            }

            @media (max-width: 600px) {
              .results-grid {
                grid-template-columns: minmax(0, 1fr);
              }

              .results-hero {
                margin-bottom: 22px;
              }

              .result-card {
                padding: 12px;
              }
            }

            @media (max-width: 340px) {
              .result-card__meta {
                align-items: flex-start;
                flex-direction: column;
              }
            }
          `}</style>

          <header className="results-hero">
            <div className="results-hero__icon" aria-hidden="true">
              ✂️
            </div>
            <h1>Твои лучшие варианты</h1>
            <p>
              AI-Барбер проанализировал твои ответы и выбрал
              три наиболее подходящие стрижки.
            </p>
          </header>

          <div className="results-grid">
            {recommendations.map((hairstyle, index) => (
              <article
                className={`result-card${
                  index === 0 ? ' result-card--best' : ''
                }`}
                key={hairstyle.id}
              >
                <img
                  className="result-card__image"
                  src={hairstyle.image}
                  alt={hairstyle.name}
                  decoding="async"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                <div className="result-card__meta">
                  {index === 0 ? (
                    <span className="result-card__badge">
                      Лучший выбор
                    </span>
                  ) : (
                    <span>Рекомендация №{index + 1}</span>
                  )}
                  <span className="result-card__match">
                    Совпадение по анкете{' '}
                    {scoreToPercentage(
                      hairstyle.score,
                      lowestScore,
                      highestScore,
                    )}
                    %
                  </span>
                </div>

                <h2>{hairstyle.name}</h2>
                <p className="result-card__description">
                  {hairstyle.description}
                </p>

                {hairstyle.reasons.length > 0 && (
                  <section aria-label="Почему тебе подходит">
                    <b className="result-card__section-title">
                      Почему тебе подходит
                    </b>
                    <ul className="result-card__reasons">
                      {hairstyle.reasons.map((reason) => (
                        <li className="result-card__reason" key={reason}>
                          <span
                            className="result-card__check"
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <section className="result-card__tip">
                  <b className="result-card__section-title">
                    Что сказать барберу
                  </b>
                  <div>{hairstyle.barberTip}</div>
                </section>

                <div className="result-card__actions">
                  <Button
                    stretched
                    size="l"
                    onClick={() => {
                      saveSelectedHairstyle(hairstyle.id);
                      routeNavigator.push('/selected');
                    }}
                  >
                    Выбрать эту стрижку
                  </Button>
                  <Button stretched size="l" mode="secondary" disabled>
                    Примерить на себе
                  </Button>
                  <div className="result-card__soon">Скоро</div>
                </div>
              </article>
            ))}
          </div>

          <div className="results-footer">
            <Button
              stretched
              size="l"
              onClick={() => routeNavigator.push('/catalog')}
            >
              Смотреть все стрижки
            </Button>
            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => routeNavigator.push('/')}
            >
              Пройти подбор заново
            </Button>
          </div>
        </Div>
      </Group>
    </Panel>
  );
};
