import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import DrinkList from './DrinkList';
import db from '../util/db';

const NonPwa = styled.div`
  @media (display-mode: standalone) {
    display: none;
  }
`;

const PwaOnly = styled.div`
  display: none;

  @media (display-mode: standalone) {
    display: block;
  }
`;

import type { Drink } from '../types';

interface FavoritesProps {
  allDrinks: Drink[];
  imageMap: Record<string, unknown>;
}

export default function Favorites({ allDrinks, imageMap }: FavoritesProps) {
  const [favorites, setFavorites] = useState<Drink[]>([]);
  const [isPersisted, setIsPersisted] = useState(false);

  useEffect(() => {
    (async () => {
      const loaded = await db.getFavorites();
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

  useEffect(() => {
    (async () => {
      if (typeof navigator.storage?.persist === 'function') {
        const persisted = await navigator.storage.persisted();
        setIsPersisted(persisted);
      }
    })();
  });

  return (
    <>
      {favorites.length ? (
        <DrinkList drinks={favorites} imageMap={imageMap} />
      ) : (
        <>
          <NonPwa>
            <p>
              You must <Link to="/installation">install</Link> in order to save
              favorites.
            </p>
          </NonPwa>
          <PwaOnly>
            <p>
              No favorites saved. Tap the star when viewing a drink recipe to
              save it to your favorites.
            </p>
          </PwaOnly>
        </>
      )}
      <p className="footnote">
        Your favorites are saved locally in your browser. They will not carry
        over between browsers or devices.
      </p>
      {!isPersisted && (
        <>
          <p style={{ display: 'none' }}>
            Your browser <b>may opt to delete this data</b> later to free up
            storage. Browser storage should be persistent upon{' '}
            <Link to="/installation">installation</Link> of Sidecar to your
            device.
          </p>
        </>
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
