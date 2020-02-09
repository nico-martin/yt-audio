import { openDB, DBSchema } from 'idb';
import { Video } from '../vendor/types';

const dbName = 'YouTubeAudioPlayer';
const store = 'videos';

interface VideoDBSchema extends DBSchema {
  videos: {
    key: string;
    value: Partial<Video>;
  };
}

const dbPromise = openDB<VideoDBSchema>(dbName, 1, {
  upgrade(db) {
    db.createObjectStore(store);
  },
});

const db = {
  async get(key: string) {
    return (await dbPromise).get(store, key);
  },
  async set(key: string, val: Video) {
    return (await dbPromise).put(store, val, key);
  },
  async delete(key: string) {
    return (await dbPromise).delete(store, key);
  },
  async getAll() {
    return (await dbPromise).getAll(store);
  },
  async updateObject(key: string, val: Partial<Video>) {
    const entry = (await db.get(key)) || {};
    return (await dbPromise).put(store, { ...entry, ...val }, key);
  },
};

export default db;
