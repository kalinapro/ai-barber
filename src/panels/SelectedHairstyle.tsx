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

import { hairstyles } from '../recommendations';
import { selectedHairstyle } from '../selectedHairstyleStore';

export const SelectedHairstyle: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const hairstyle = hairstyles.find(
    (item) => item.id === selectedHairstyle.id,
  );

  if (!hairstyle) {
    return (
      <Panel id={id}>
        <PanelHeader>AI-Барбер</PanelHeader>

        <Group>
          <Div>
            <div
              style={{
                width: '100%',
                maxWidth: 700,
                margin: '40px auto',
                textAlign: 'center',
              }}
            >
              <h2>Стрижка не выбрана</h2>

              <Button
                stretched
                size="l"
                onClick={() => routeNavigator.push('/catalog')}
              >
                Открыть каталог
              </Button>
            </div>
          </Div>
        </Group>
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader>Твой выбор</PanelHeader>

      <Group>
        <Div>
          <div
            style={{
              width: '100%',
              maxWidth: 700,
              margin: '0 auto',
            }}
          >
            <img
              src={hairstyle.image}
              alt={hairstyle.name}
              style={{
                display: 'block',
                width: '100%',
                maxWidth: 520,
                aspectRatio: '4 / 5',
                objectFit: 'cover',
                objectPosition: 'center top',
                borderRadius: 16,
                margin: '20px auto',
              }}
            />

            <h1
              style={{
                textAlign: 'center',
                marginBottom: 8,
              }}
            >
              {hairstyle.name}
            </h1>

            <p
              style={{
                textAlign: 'center',
                opacity: 0.7,
                lineHeight: 1.5,
                marginBottom: 24,
              }}
            >
              {hairstyle.description}
            </p>

            <div
              style={{
                background: 'rgba(0, 0, 0, 0.04)',
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
              }}
            >
              <b>Что сказать барберу:</b>

              <div
                style={{
                  marginTop: 8,
                  lineHeight: 1.6,
                }}
              >
                {hairstyle.barberTip}
              </div>
            </div>

            <Button
  stretched
  size="l"
  style={{
    marginBottom: 12,
  }}
  onClick={() => routeNavigator.push('/')}
>
  Готово
</Button>

            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => routeNavigator.push('/catalog')}
            >
              Выбрать другую стрижку
            </Button>
          </div>
        </Div>
      </Group>
    </Panel>
  );
};