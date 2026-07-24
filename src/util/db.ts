import { openDB, IDBPDatabase } from 'idb';

interface Favorite {
  name: string;
  date: Date;
}

const ready = new Promise<IDBPDatabase>((resolve) => {
  if (typeof indexedDB === 'undefined') {
    return;
  }
  connect().then(resolve);
});

async function connect(): Promise<IDBPDatabase> {
  return openDB('Sidecar', 1, {
    upgrade(database) {
      const store = database.createObjectStore('favorites', {
        keyPath: 'name',
      });
      store.createIndex('name', 'name');
    },
  });
}

async function addFavorite(drinkName: string) {
  const db = await ready;
  return db.add('favorites', {
    name: drinkName,
    date: new Date(),
  });
}

const deleteFavorite = async (drinkName: string): Promise<void> => {
  const db = await ready;
  await db.delete('favorites', drinkName);
};

const getFavorites = async (): Promise<Favorite[]> => {
  const db = await ready;
  return db.getAllFromIndex('favorites', 'name');
};

// const getFavorite = async (drinkName) => {
//   if (!db) return;
//   // const index =db.store.index(drinkName);
//   const tx = db.transaction('favorites', 'readonly');
//   const index = tx.store.index('name');
//
//   console.log('index', index);
//
//   for await (const cursor of index.iterate(drinkName)) {
//     const fave = { ...cursor.value };
//     console.log(fave);
//     // article.body += ' And, happy new year!';
//     // cursor.update(article);
//   }
//
//   await tx.done;
// };

const getFavorite = async (drinkName: string): Promise<Favorite | undefined> => {
  if (!drinkName) return;
  const db = await ready;
  return db.get('favorites', drinkName);
};

export default {
  addFavorite,
  deleteFavorite,
  getFavorite,
  getFavorites,
};
