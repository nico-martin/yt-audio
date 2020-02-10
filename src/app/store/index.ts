import { openDB, DBSchema } from 'idb';
import { Video } from '../vendor/types';

const dbName = 'YouTubeAudioPlayer-v2';
const store = 'videos';

interface VideoDBSchema extends DBSchema {
  videos: {
    key: string;
    value: Partial<Video>;
  };
  settings: {
    key: string;
    value: string | number;
  };
}

const dbPromise = openDB<VideoDBSchema>(dbName, 1, {
  upgrade(db) {
    db.createObjectStore(store);
    db.createObjectStore('settings');
  },
});

export const videosDB = {
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
    const entry = (await videosDB.get(key)) || {};
    return (await dbPromise).put(store, { ...entry, ...val }, key);
  },
};

export const settingsDB = {
  async get(key: string) {
    return (await dbPromise).get('settings', key);
  },
  async set(key: string, val: string | number) {
    return (await dbPromise).put('settings', val, key);
  },
  async delete(key: string) {
    return (await dbPromise).delete('settings', key);
  },
};
