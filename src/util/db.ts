import { openDB, IDBPDatabase } from 'idb';

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

/** Open (or reuse) the Sidecar IndexedDB connection. */
export function getDb(): Promise<IDBPDatabase> {
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

/** Dev/debug: confirm DB opened and dump version/stores. */
export async function debugStorage(): Promise<{
  name: string;
  version: number;
  stores: string[];
  blocked: boolean;
}> {
  const database = await getDb();
  return {
    name: DB_NAME,
    version: database.version,
    stores: [...database.objectStoreNames],
    blocked: storageBlocked,
  };
}

/** Merge helpers onto window.__sidecarDb in development. */
export function attachDbDebug(partial: Record<string, unknown>): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return;
  }
  const w = window as Window & { __sidecarDb?: Record<string, unknown> };
  w.__sidecarDb = { ...w.__sidecarDb, ...partial };
}

attachDbDebug({
  getDb,
  subscribeStorageBlocked,
  isStorageBlocked,
  debugStorage,
});
