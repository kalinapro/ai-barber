import { FC } from 'react';
import { Icon24Favorite, Icon24FavoriteOutline } from '@vkontakte/icons';
import { useFavorites } from '../favoritesStore';

type FavoriteButtonProps = { hairstyleId: string; showLabel?: boolean };

export const FavoriteButton: FC<FavoriteButtonProps> = ({ hairstyleId, showLabel = false }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(hairstyleId);
  const label = active ? 'Удалить из избранного' : 'Добавить в избранное';

  return (
    <button
      type="button"
      className={`favorite-button${active ? ' favorite-button--active' : ''}${showLabel ? ' favorite-button--label' : ''}`}
      aria-label={label}
      aria-pressed={active}
      onClick={() => toggleFavorite(hairstyleId)}
    >
      {active ? <Icon24Favorite /> : <Icon24FavoriteOutline />}
      {showLabel && <span>{active ? 'В избранном' : 'Добавить в избранное'}</span>}
    </button>
  );
};
