import Dexie from 'dexie';

export const db = new Dexie('TodoDatabase');
db.version(1).stores({
  todos: '++id, userId, title, completed, synced, deleted',
});

// Add hooks for data synchronization
db.todos.hook('creating', function (primKey, obj, trans) {
  obj.createdAt = new Date();
});

db.todos.hook('updating', function (modifications, primKey, obj, trans) {
  modifications.updatedAt = new Date();
});