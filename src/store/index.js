import { openDB } from 'idb';

const dbPromise = openDB('YouTubeAudioPlayer', 1, {
  upgrade(db) {
    db.createObjectStore('videos');
  },
});

export default {
  async get(key) {
    return (await dbPromise).get('videos', key);
  },
  async set(key, val) {
    return (await dbPromise).put('videos', val, key);
  },
  async delete(key) {
    return (await dbPromise).delete('videos', key);
  },
  async getAll() {
    return (await dbPromise).getAll('videos');
  },
};
