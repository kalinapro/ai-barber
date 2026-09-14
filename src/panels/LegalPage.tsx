import { FC, ReactNode } from 'react';
import {
  Group,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

interface LegalPageProps extends NavIdProps {
  title: string;
  children: ReactNode;
  relatedPath: string;
  relatedLabel: string;
}

export const LegalPage: FC<LegalPageProps> = ({
  id,
  title,
  children,
  relatedPath,
  relatedLabel,
}) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader
        before={(
          <PanelHeaderBack
            label="Назад"
            onClick={() => routeNavigator.back()}
          />
        )}
      >
        Документы
      </PanelHeader>
      <Group>
        <article className="legal-page">
          <h1>{title}</h1>
          {children}
          <div className="legal-page__related">
            <button
              className="legal-link"
              type="button"
              onClick={() => routeNavigator.push(relatedPath)}
            >
              {relatedLabel}
            </button>
          </div>
        </article>
      </Group>
    </Panel>
  );
};
