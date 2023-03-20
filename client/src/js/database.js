import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log('PUT to the database');
  
    // Create a connection to the database database and version we want to use.
    const editorDb = await openDB('jate', 1);
  
    // Create a new transaction and specify the database and data privileges.
    const tx = editorDb.transaction('jate', 'readwrite');
  
    // Open up the desired object store.
    const store = tx.objectStore('jate');
  
    // Use the .add() method on the store and pass in the content.
    const request = store.put({ id: id, value: content });
  
    // Get confirmation of the request.
    const result = await request;
    console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  // Create a connection to the database and version we want to use
  const editorDB = await openDB("jate", 1);
  // New transaction specifying db and privileges
  const tx = editorDB.transaction("jate", "readonly");
  // Open desired object store
  const store = tx.objectStore("jate");
  // Get all request
  const request = store.getAll();
  // Confirmation and return
  const result = await request;
  console.log("🚀 - data read from database", result);
  return result.value;
};

initdb();
