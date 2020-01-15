import { openDB } from 'idb';
const dbName = 'YouTubeAudioPlayer';
const store = 'videos';

const dbPromise = openDB(dbName, 1, {
  upgrade(db) {
    db.createObjectStore(store);
  },
});

const db = {
  async get(key) {
    return (await dbPromise).get(store, key);
  },
  async set(key, val) {
    return (await dbPromise).put(store, val, key);
  },
  async delete(key) {
    return (await dbPromise).delete(store, key);
  },
  async getAll() {
    return (await dbPromise).getAll(store);
  },
  async updateObject(key, val) {
    const entry = (await db.get(key)) || {};
    return (await dbPromise).put(store, { ...entry, ...val }, key);
  },
};

export default db;
