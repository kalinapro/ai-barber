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
import { getRecommendations } from '../recommendations';
import { saveSelectedHairstyle } from '../selectedHairstyleStore';

export const Results: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const recommendations = getRecommendations(barberAnswers).slice(0, 3);

  return (
    <Panel id={id}>
      <PanelHeader>AI-Барбер</PanelHeader>

      <Group>
        <Div>
          <div
            style={{
              width: '100%',
              maxWidth: 1100,
              margin: '0 auto',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                fontSize: 48,
                marginTop: 16,
              }}
            >
              ✂️
            </div>

            <h1
              style={{
                textAlign: 'center',
                marginBottom: 8,
              }}
            >
              Твои лучшие варианты
            </h1>

            <p
              style={{
                textAlign: 'center',
                opacity: 0.7,
                marginBottom: 28,
              }}
            >
              AI-Барбер подобрал 3 стрижки на основе твоих ответов.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 18,
                alignItems: 'stretch',
              }}
            >
              {recommendations.map((hairstyle, index) => (
                <div
                  key={hairstyle.id}
                  style={{
                    border:
                      '1px solid rgba(0, 0, 0, 0.12)',
                    borderRadius: 16,
                    padding: 14,
                    overflow: 'hidden',
                    background:
                      'var(--vkui--color_background_content)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <img
                    src={hairstyle.image}
                    alt={hairstyle.name}
                    style={{
                      display: 'block',
                      width: '100%',
                      aspectRatio: '4 / 5',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      borderRadius: 12,
                      marginBottom: 14,
                    }}
                  />

                  <div
                    style={{
                      fontSize: 14,
                      opacity: 0.6,
                      marginBottom: 5,
                    }}
                  >
                    Рекомендация №{index + 1}
                  </div>

                  <h2
                    style={{
                      marginTop: 0,
                      marginBottom: 8,
                    }}
                  >
                    {hairstyle.name}
                  </h2>

                  <p
                    style={{
                      lineHeight: 1.5,
                      marginBottom: 14,
                    }}
                  >
                    {hairstyle.description}
                  </p>

                  {hairstyle.reasons.length > 0 && (
                    <div
                      style={{
                        marginBottom: 14,
                      }}
                    >
                      <b>Почему тебе подходит:</b>

                      <ul
                        style={{
                          lineHeight: 1.6,
                          paddingLeft: 20,
                          marginBottom: 0,
                        }}
                      >
                        {hairstyle.reasons.map((reason) => (
                          <li key={reason}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: 10,
                      padding: 12,
                      marginTop: 'auto',
                    }}
                  >
                    <b>Что сказать барберу:</b>

                    <div
                      style={{
                        marginTop: 6,
                        lineHeight: 1.5,
                      }}
                    >
                      {hairstyle.barberTip}
                    </div>
                  </div>

                 <Button
  stretched
  size="l"
  style={{
    marginTop: 14,
    height: 44,
    minHeight: 44,
    flexShrink: 0,
  }}
  onClick={() => {
  saveSelectedHairstyle(hairstyle.id);
  routeNavigator.push('/selected');
}}
>
  Мне нравится
</Button>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 28,
              }}
            >
              <Button
                stretched
                size="l"
                style={{
                  marginBottom: 12,
                }}
                onClick={() =>
                  routeNavigator.push('/catalog')
                }
              >
                Смотреть все стрижки
              </Button>

              <Button
                stretched
                size="l"
                mode="secondary"
                onClick={() =>
                  routeNavigator.push('/')
                }
              >
                Пройти подбор заново
              </Button>
            </div>
          </div>
        </Div>
      </Group>
    </Panel>
  );
};