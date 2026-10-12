import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import DrinkList from '../../components/DrinkList';
import InstallBanner from '../../components/InstallBanner';
import favoritesDb from '../../storage/favorites';
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
  const [favorites, setFavorites] = useState<Drink[]>([]);
  const visibleFavorites = useBarFilteredDrinks(favorites, FILTER_FAVORITES);

  useEffect(() => {
    (async () => {
      const loaded = await favoritesDb.getFavorites();
      const drinks: Drink[] = [];
      loaded.forEach((favorite) => {
        const match = allDrinks.find(
          (d) => d.path === `/drinks/${favorite.name}`
        );
        if (match) {
          drinks.push({
            ...match,
            date: formatDate(favorite.date),
          });
        }
      });
      setFavorites(drinks);
    })();
  }, []);

  return (
    <>
      <InstallBanner />

      {visibleFavorites.length ? (
        <DrinkList drinks={visibleFavorites} imageMap={imageMap} />
      ) : favorites.length ? (
        <p>
          None of your favorites match your bar right now. Adjust{' '}
          <Link to="/my-bar">My Bar</Link> or turn off favorites filtering in
          Settings.
        </p>
      ) : (
        <p>
          No favorites saved. Tap the star when viewing a drink recipe to save
          it to your favorites.
        </p>
      )}

      <p className="footnote">
        Your favorites are saved locally. They will not carry over between
        browsers or devices.
      </p>
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
