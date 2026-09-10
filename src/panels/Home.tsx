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
  selectedHairstyle,
  clearSelectedHairstyle,
} from '../selectedHairstyleStore';

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const savedHairstyle = hairstyles.find(
    (item) => item.id === selectedHairstyle.id,
  );

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
            <div
              style={{
                textAlign: 'center',
                fontSize: 48,
                marginTop: 24,
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
              Какая стрижка тебе подходит?
            </h1>

            <p
              style={{
                textAlign: 'center',
                opacity: 0.7,
                marginBottom: 24,
                lineHeight: 1.5,
              }}
            >
              Ответь на несколько вопросов, и AI-Барбер
              подберёт подходящие варианты.
            </p>

            <Button
              stretched
              size="l"
              onClick={() => routeNavigator.push('/question1')}
            >
              Подобрать стрижку
            </Button>

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
    onClick={() => {
      clearSelectedHairstyle();
      window.location.reload();
    }}
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