import { FC, useState } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  Div,
  Button,
  NavIdProps,
} from '@vkontakte/vkui';

import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { hairstyles } from '../recommendations';
import { useSelectedHairstyle } from '../selectedHairstyleStore';

type Category = 'Короткие' | 'Средние' | 'Длинные';

export const Catalog: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { saveSelectedHairstyle } = useSelectedHairstyle();

  const [category, setCategory] = useState<Category>('Короткие');

  const filteredHairstyles = hairstyles.filter(
    (hairstyle) => hairstyle.category === category,
  );

  const handleSelect = (hairstyleId: string) => {
  saveSelectedHairstyle(hairstyleId);
  routeNavigator.push('/selected');
};

  return (
    <Panel id={id}>
      <PanelHeader>Все стрижки</PanelHeader>

      <Group>
        <Div>
          <div
            style={{
              width: '100%',
              maxWidth: 1100,
              margin: '0 auto',
            }}
          >
            <h1
              style={{
                textAlign: 'center',
                marginBottom: 8,
              }}
            >
              Выбери стрижку сам
            </h1>

            <p
              style={{
                textAlign: 'center',
                opacity: 0.7,
                marginBottom: 24,
              }}
            >
              Если рекомендации AI-Барбера не понравились,
              посмотри весь каталог.
            </p>

            <div
              style={{
                display: 'flex',
                gap: 8,
                marginBottom: 24,
                flexWrap: 'wrap',
              }}
            >
              <Button
                stretched
                size="m"
                mode={category === 'Короткие' ? 'primary' : 'secondary'}
                onClick={() => setCategory('Короткие')}
              >
                Короткие
              </Button>

              <Button
                stretched
                size="m"
                mode={category === 'Средние' ? 'primary' : 'secondary'}
                onClick={() => setCategory('Средние')}
              >
                Средние
              </Button>

              <Button
                stretched
                size="m"
                mode={category === 'Длинные' ? 'primary' : 'secondary'}
                onClick={() => setCategory('Длинные')}
              >
                Длинные
              </Button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 18,
              }}
            >
              {filteredHairstyles.map((hairstyle) => (
                <div
                  key={hairstyle.id}
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.12)',
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
                    onClick={() => handleSelect(hairstyle.id)}
                  >
                    Выбрать эту стрижку
                  </Button>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 24,
              }}
            >
              <Button
                stretched
                size="l"
                mode="secondary"
                onClick={() => routeNavigator.back()}
              >
                Назад
              </Button>
            </div>
          </div>
        </Div>
      </Group>
    </Panel>
  );
};