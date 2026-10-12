import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import DrinkList from '../../components/DrinkList';
import favoritesDb from '../../storage/favorites';
import barDb from '../../storage/bar';
import settingsDb, {
  DEFAULT_BAR_SETTINGS,
  type BarSettings,
} from '../../storage/settings';
import {
  filterMakeableDrinks,
  shouldFilterByBar,
} from '../my-bar/myBarLogic';
import type { Drink } from '../../types';

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

interface FavoritesProps {
  allDrinks: Drink[];
  imageMap: Record<string, unknown>;
}

export default function Favorites({ allDrinks, imageMap }: FavoritesProps) {
  const [favorites, setFavorites] = useState<Drink[]>([]);
  const [owned, setOwned] = useState<string[]>([]);
  const [settings, setSettings] = useState<BarSettings>(DEFAULT_BAR_SETTINGS);
  const [isPersisted, setIsPersisted] = useState(false);

  useEffect(() => {
    (async () => {
      const loaded = await favoritesDb.getFavorites();
      const drinks: Drink[] = [];
      loaded.forEach((favorite) => {
        const match = allDrinks.find(
          (d) => d.path === `/drinks/${favorite.name}`,
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
    let cancelled = false;
    (async () => {
      try {
        const [tags, loadedSettings] = await Promise.all([
          barDb.getBarTags(),
          settingsDb.getBarSettings(),
        ]);
        if (!cancelled) {
          setOwned(tags);
          setSettings(loadedSettings);
        }
      } catch (err) {
        console.error('Failed to load bar filter state', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (typeof navigator.storage?.persist === 'function') {
        const persisted = await navigator.storage.persisted();
        setIsPersisted(persisted);
      }
    })();
  });

  const visibleFavorites = useMemo(() => {
    if (!shouldFilterByBar(settings.filterFavoritesByBar, owned)) {
      return favorites;
    }
    return filterMakeableDrinks(favorites, owned, settings.substitutions);
  }, [favorites, owned, settings.filterFavoritesByBar, settings.substitutions]);

  return (
    <>
      {visibleFavorites.length ? (
        <DrinkList drinks={visibleFavorites} imageMap={imageMap} />
      ) : favorites.length ? (
        <p>
          None of your favorites match your bar right now. Adjust{' '}
          <Link to="/my-bar">My Bar</Link> or turn off favorites filtering in
          Settings.
        </p>
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
