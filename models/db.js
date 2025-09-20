const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/secondChanceDB';
const client = new MongoClient(uri);
let db = null;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB:', uri);
  }
  return db;
}

function getCollection(name) {
  if (!db) throw new Error('Database not connected. Call connectToDatabase first.');
  return db.collection(name);
}

module.exports = { connectToDatabase, getCollection, client };
