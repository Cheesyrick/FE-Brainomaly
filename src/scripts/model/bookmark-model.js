import { openDB } from "idb";

const DB_NAME = "storyapp-db";
const DB_VERSION = 1;
const STORE_NAME = "bookmarks";

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    }
  },
});

const BookmarkModel = {
  async saveBookmark(story) {
    const db = await dbPromise;
    return db.put(STORE_NAME, story);
  },

  async getAll() {
    const db = await dbPromise;
    return db.getAll(STORE_NAME);
  },

  async get(id) {
    const db = await dbPromise;
    return db.get(STORE_NAME, id);
  },

  async delete(id) {
    const db = await dbPromise;
    return db.delete(STORE_NAME, id);
  },

  async isBookmarked(id) {
    const db = await dbPromise;
    const data = await db.get(STORE_NAME, id);
    return data !== undefined;
  },
};

export default BookmarkModel;
