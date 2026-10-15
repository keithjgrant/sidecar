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

  async function add(drinkName: string): Promise<void> {
    if (!drinkName) {
      return;
    }
    const entry: Favorite = { name: drinkName, date: new Date() };
    setFavorites((prev) =>
      prev.some((f) => f.name === drinkName) ? prev : [...prev, entry]
    );
    try {
      await addFavorite(drinkName);
      setError(null);
    } catch (err) {
      console.error('Failed to add favorite', err);
      setError(toError(err));
    }
  }

  async function remove(drinkName: string): Promise<void> {
    if (!drinkName) {
      return;
    }
    setFavorites((prev) => prev.filter((f) => f.name !== drinkName));
    try {
      await deleteFavorite(drinkName);
      setError(null);
    } catch (err) {
      console.error('Failed to remove favorite', err);
      setError(toError(err));
    }
  }

  return { favorites, isLoading, error, add, remove };
}

export function useFavorite(drinkName: string) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const favorite = await getFavorite(drinkName);
        if (!cancelled) {
          setIsFavorite(!!favorite);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to load favorite', err);
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
  }, [drinkName]);

  async function add(): Promise<void> {
    if (!drinkName) {
      return;
    }
    setIsFavorite(true);
    try {
      await addFavorite(drinkName);
      setError(null);
    } catch (err) {
      console.error('Failed to add favorite', err);
      setError(toError(err));
    }
  }

  async function remove(): Promise<void> {
    if (!drinkName) {
      return;
    }
    setIsFavorite(false);
    try {
      await deleteFavorite(drinkName);
      setError(null);
    } catch (err) {
      console.error('Failed to remove favorite', err);
      setError(toError(err));
    }
  }

  async function toggle(): Promise<void> {
    if (isFavorite) {
      await remove();
    } else {
      await add();
    }
  }

  return { isFavorite, isLoading, error, add, remove, toggle };
}

const favoritesDb = {
  addFavorite,
  deleteFavorite,
  getFavorite,
  getFavorites,
};

attachDbDebug(favoritesDb);

export default favoritesDb;
