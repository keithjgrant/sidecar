// What’s on this origin?
const dbs = await indexedDB.databases();
console.table(dbs); // look for name: "Sidecar", version: 1 or 2
// Read stores (works whether upgrade finished or not *only if* you can open it)
const req = indexedDB.open('Sidecar'); // no version = open current
req.onsuccess = async () => {
  const db = req.result;
  console.log('version', db.version, 'stores', [...db.objectStoreNames]);
  const read = (store) =>
    new Promise((resolve, reject) => {
      const tx = db.transaction(store, 'readonly');
      const r = tx.objectStore(store).getAll();
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
  if (db.objectStoreNames.contains('favorites')) {
    console.log('favorites', await read('favorites'));
  }
  if (db.objectStoreNames.contains('bar')) {
    console.log('bar', await read('bar'));
  }
  db.close();
};
req.onblocked = () => console.warn('open blocked — close other tabs');
req.onupgradeneeded = (e) =>
  console.log('upgrade', e.oldVersion, '→', e.newVersion);
