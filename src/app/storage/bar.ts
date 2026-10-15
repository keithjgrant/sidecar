import { useEffect, useState } from 'react';
import type { IDBPDatabase } from 'idb';
import { attachDbDebug, getDb, toError } from './db';
import { DEFAULT_BAR } from '../config/barConfig';

interface BarItem {
  tag: string;
}

/** Sentinel key marking that the bar store has been initialized. */
const BAR_INIT_KEY = '__init__';

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

export async function getBarTags(): Promise<string[]> {
  const db = await getDb();
  await ensureBarInitialized(db);
  const items: BarItem[] = await db.getAll('bar');
  return items.map((item) => item.tag).filter((tag) => tag !== BAR_INIT_KEY);
}

export async function setBarTag(tag: string, owned: boolean): Promise<void> {
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
}

export async function replaceBar(tags: string[]): Promise<void> {
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
}

export function useBar() {
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const loadedTags = await getBarTags();
        if (!cancelled) {
          setTags(loadedTags);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to load bar tags', err);
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

  return { tags, isLoading, error };
}

const barDb = {
  getBarTags,
  setBarTag,
  replaceBar,
};

attachDbDebug(barDb);

export default barDb;
