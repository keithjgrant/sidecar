import { useEffect, useState } from 'react';
import { attachDbDebug, getDb, toError } from './db';

export interface Favorite {
  name: string;
  date: Date;
}

export async function addFavorite(drinkName: string) {
  const db = await getDb();
  return db.add('favorites', {
    name: drinkName,
    date: new Date(),
  });
}

export async function deleteFavorite(drinkName: string): Promise<void> {
  const db = await getDb();
  await db.delete('favorites', drinkName);
}

export async function getFavorites(): Promise<Favorite[]> {
  const db = await getDb();
  return db.getAllFromIndex('favorites', 'name');
}

export async function getFavorite(
  drinkName: string,
): Promise<Favorite | undefined> {
  if (!drinkName) return;
  const db = await getDb();
  return db.get('favorites', drinkName);
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const loaded = await getFavorites();
        if (!cancelled) {
          setFavorites(loaded);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to load favorites', err);
        if (!cancelled) {
          setError(toError(err));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { favorites, isLoading, error };
}

const favoritesDb = {
  addFavorite,
  deleteFavorite,
  getFavorite,
  getFavorites,
};

attachDbDebug(favoritesDb);

export default favoritesDb;
