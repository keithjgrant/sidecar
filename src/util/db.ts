import { openDB, IDBPDatabase } from 'idb';
import { DEFAULT_BAR } from './myBar';

interface Favorite {
  name: string;
  date: Date;
}

interface BarItem {
  tag: string;
}

/** Sentinel key marking that the bar store has been initialized. */
const BAR_INIT_KEY = '__init__';

const DB_NAME = 'Sidecar';
const DB_VERSION = 2;

type BlockedListener = (blocked: boolean) => void;

let dbPromise: Promise<IDBPDatabase> | null = null;
let storageBlocked = false;
const blockedListeners = new Set<BlockedListener>();

function setStorageBlocked(blocked: boolean): void {
  if (storageBlocked === blocked) {
    return;
  }
  storageBlocked = blocked;
  blockedListeners.forEach((listener) => listener(blocked));
}

/** Subscribe to IndexedDB upgrade/open blocked state. Returns unsubscribe. */
export function subscribeStorageBlocked(listener: BlockedListener): () => void {
  blockedListeners.add(listener);
  listener(storageBlocked);
  return () => {
    blockedListeners.delete(listener);
  };
}

export function isStorageBlocked(): boolean {
  return storageBlocked;
}

function getDb(): Promise<IDBPDatabase> {
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(new Error('IndexedDB unavailable'));
  }
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(database, oldVersion) {
        if (oldVersion < 1 && !database.objectStoreNames.contains('favorites')) {
          const store = database.createObjectStore('favorites', {
            keyPath: 'name',
          });
          store.createIndex('name', 'name');
        }
        if (oldVersion < 2 && !database.objectStoreNames.contains('bar')) {
          database.createObjectStore('bar', {
            keyPath: 'tag',
          });
        }
      },
      blocked() {
        setStorageBlocked(true);
        console.warn(
          'Sidecar DB upgrade blocked by another connection (another tab, DevTools IndexedDB panel, or a stale hot-reload connection). Close those, then reopen this page.',
        );
      },
      blocking(_current, _blocked, event) {
        // Close so a newer open/upgrade can proceed (important after hot reload).
        const raw = event.target;
        if (raw && 'close' in raw && typeof raw.close === 'function') {
          raw.close();
        }
        dbPromise = null;
      },
    })
      .then((db) => {
        setStorageBlocked(false);
        db.onversionchange = () => {
          db.close();
          dbPromise = null;
        };
        return db;
      })
      .catch((err) => {
        dbPromise = null;
        throw err;
      });
  }
  return dbPromise;
}

async function addFavorite(drinkName: string) {
  const db = await getDb();
  return db.add('favorites', {
    name: drinkName,
    date: new Date(),
  });
}

const deleteFavorite = async (drinkName: string): Promise<void> => {
  const db = await getDb();
  await db.delete('favorites', drinkName);
};

const getFavorites = async (): Promise<Favorite[]> => {
  const db = await getDb();
  return db.getAllFromIndex('favorites', 'name');
};

const getFavorite = async (drinkName: string): Promise<Favorite | undefined> => {
  if (!drinkName) return;
  const db = await getDb();
  return db.get('favorites', drinkName);
};

async function ensureBarInitialized(db: IDBPDatabase): Promise<void> {
  const init = await db.get('bar', BAR_INIT_KEY);
  if (init) {
    return;
  }
  const tx = db.transaction('bar', 'readwrite');
  await tx.store.put({ tag: BAR_INIT_KEY } satisfies BarItem);
  for (const tag of DEFAULT_BAR) {
    await tx.store.put({ tag } satisfies BarItem);
  }
  await tx.done;
}

const getBarTags = async (): Promise<string[]> => {
  const db = await getDb();
  await ensureBarInitialized(db);
  const items: BarItem[] = await db.getAll('bar');
  return items.map((item) => item.tag).filter((tag) => tag !== BAR_INIT_KEY);
};

const setBarTag = async (tag: string, owned: boolean): Promise<void> => {
  if (!tag || tag === BAR_INIT_KEY) {
    return;
  }
  const db = await getDb();
  await ensureBarInitialized(db);
  if (owned) {
    await db.put('bar', { tag } satisfies BarItem);
  } else {
    await db.delete('bar', tag);
  }
};

const replaceBar = async (tags: string[]): Promise<void> => {
  const db = await getDb();
  const tx = db.transaction('bar', 'readwrite');
  await tx.store.clear();
  await tx.store.put({ tag: BAR_INIT_KEY } satisfies BarItem);
  for (const tag of tags) {
    if (tag && tag !== BAR_INIT_KEY) {
      await tx.store.put({ tag } satisfies BarItem);
    }
  }
  await tx.done;
};

/** Dev/debug: confirm DB opened and dump version/stores/bar tags. */
async function debugStorage(): Promise<{
  name: string;
  version: number;
  stores: string[];
  blocked: boolean;
  barTags: string[];
}> {
  const database = await getDb();
  const barTags = await getBarTags();
  return {
    name: DB_NAME,
    version: database.version,
    stores: [...database.objectStoreNames],
    blocked: storageBlocked,
    barTags,
  };
}

const dbApi = {
  addFavorite,
  deleteFavorite,
  getFavorite,
  getFavorites,
  getBarTags,
  setBarTag,
  replaceBar,
  debugStorage,
  subscribeStorageBlocked,
  isStorageBlocked,
};

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as Window & { __sidecarDb?: typeof dbApi }).__sidecarDb = dbApi;
}

export default dbApi;
