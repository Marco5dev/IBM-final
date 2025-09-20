const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/secondChanceDB';

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const col = db.collection('secondChanceItems');
    const count = await col.countDocuments();
    console.log('secondChanceItems count:', count);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
