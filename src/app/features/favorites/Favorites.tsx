import React, { useMemo } from 'react';
import { Link } from 'gatsby';
import DrinkList from '../../components/DrinkList';
import InstallBanner from '../../components/InstallBanner';
import { useFavorites } from '../../storage/favorites';
import BarFilterNotice from '../my-bar/BarFilterNotice';
import {
  useBarFilteredDrinks,
  FILTER_FAVORITES,
} from '../my-bar/useBarFilteredDrinks';
import type { Drink } from '../../types';

interface FavoritesProps {
  allDrinks: Drink[];
  imageMap: Record<string, unknown>;
}

export default function Favorites({ allDrinks, imageMap }: FavoritesProps) {
  const { favorites: saved } = useFavorites();

  const favorites = useMemo(() => {
    const drinks: Drink[] = [];
    for (const favorite of saved) {
      const match = allDrinks.find(
        (d) => d.path === `/drinks/${favorite.name}`
      );
      if (match) {
        drinks.push({
          ...match,
          date: formatDate(favorite.date),
        });
      }
    }
    return drinks;
  }, [saved, allDrinks]);

  const {
    drinks: visibleFavorites,
    isFiltering,
    isUnfilteredView,
  } = useBarFilteredDrinks(favorites, FILTER_FAVORITES);

  return (
    <>
      <InstallBanner />
      <BarFilterNotice
        active={isFiltering}
        isUnfilteredView={isUnfilteredView}
      />

      {visibleFavorites.length ? (
        <DrinkList drinks={visibleFavorites} imageMap={imageMap} />
      ) : favorites.length ? (
        <p>
          No favorites match <Link to="/my-bar">your bar</Link>.
        </p>
      ) : (
        <p>No favorites saved. Star a drink to add it.</p>
      )}
    </>
  );
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function formatDate(date: Date): string {
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
