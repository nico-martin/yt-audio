const dbName = 'YouTubeAudioPlayer';
const storeName = 'videos';

const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;

const IDBTransaction =
  window.IDBTransaction ||
  window.webkitIDBTransaction ||
  window.msIDBTransaction;

const IDBKeyRange =
  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

const open = () =>
  new Promise(resolve => {
    let db;
    const request = indexedDB.open(dbName, 2);

    request.onsuccess = () => {
      db = request.result;
      resolve(request.result);
    };
    request.onupgradeneeded = event => {
      const db = event.target.result;
      const objectStore = db.createObjectStore(storeName, { keyPath: 'id' });
    };
  });

const set = (key, values) =>
  new Promise(resolve => {
    remove(key).then(() => {
      open().then(db => {
        const request = db
          .transaction([storeName], 'readwrite')
          .objectStore(storeName)
          .add({ id: key, values });
        request.onsuccess = () => resolve(values);
      });
    });
  });

const get = key =>
  new Promise((resolve, reject) => {
    open()
      .then(db => {
        const transaction = db.transaction([storeName]);
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.get(key);
        request.onerror = () => reject();
        request.onsuccess = () =>
          resolve(request.result ? request.result.values : false);
      })
      .catch(err => reject());
  });

const remove = key =>
  new Promise((resolve, reject) => {
    open().then(db => {
      const request = db
        .transaction([storeName], 'readwrite')
        .objectStore(storeName)
        .delete(key);

      request.onsuccess = () => resolve();
    });
  });

export default { get, set };
