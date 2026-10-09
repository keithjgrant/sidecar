import { attachDbDebug, getDb } from './db';

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

const favoritesDb = {
  addFavorite,
  deleteFavorite,
  getFavorite,
  getFavorites,
};

attachDbDebug(favoritesDb);

export default favoritesDb;
