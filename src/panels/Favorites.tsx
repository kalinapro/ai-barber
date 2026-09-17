import { FC } from 'react';
import { Button, Div, Group, NavIdProps, Panel, PanelHeader } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useFavorites } from '../favoritesStore';
import { hairstyles } from '../recommendations';
import { useSelectedHairstyle } from '../selectedHairstyleStore';

export const Favorites: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { favorites, removeFavorite } = useFavorites();
  const { saveSelectedHairstyle } = useSelectedHairstyle();
  const items = favorites.flatMap((favoriteId) => hairstyles.filter(({ id }) => id === favoriteId));
  const open = (hairstyleId: string, route: '/selected' | '/barber-guide') => {
    saveSelectedHairstyle(hairstyleId);
    routeNavigator.push(route);
  };

  return (
    <Panel id={id}>
      <PanelHeader>Избранное</PanelHeader>
      <Group>
        <Div className="collection-page">
          {items.length === 0 ? (
            <div className="collection-empty">
              <h1>В избранном пока ничего нет</h1>
              <p>Сохраняй понравившиеся варианты, чтобы быстро вернуться к ним.</p>
              <Button size="l" onClick={() => routeNavigator.push('/catalog')}>Посмотреть каталог</Button>
            </div>
          ) : (
            <>
              <h1>Избранные стрижки</h1>
              <div className="collection-grid">
                {items.map((hairstyle) => (
                  <article className="collection-card" key={hairstyle.id}>
                    <img src={hairstyle.image} alt={hairstyle.name} loading="lazy" />
                    <h2>{hairstyle.name}</h2>
                    <p>{hairstyle.description}</p>
                    <div className="collection-card__actions">
                      <Button stretched size="l" onClick={() => open(hairstyle.id, '/selected')}>Открыть</Button>
                      <Button stretched size="l" mode="secondary" onClick={() => open(hairstyle.id, '/barber-guide')}>Показать барберу</Button>
                      <Button stretched size="l" mode="tertiary" onClick={() => removeFavorite(hairstyle.id)}>Удалить из избранного</Button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </Div>
      </Group>
    </Panel>
  );
};
