const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/secondChanceDB';

const sample = [];
for (let i = 1; i <= 16; i++) {
  sample.push({
    title: `Sample Item ${i}`,
    description: `Description for sample item ${i}`,
    category: i % 2 === 0 ? 'furniture' : 'electronics',
    price: Math.round(Math.random() * 100),
    createdAt: new Date()
  });
}

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const col = db.collection('secondChanceItems');
    // Create a text index on title and description to support full-text search via ?q=
    await col.createIndex({ title: 'text', description: 'text' });
    await col.deleteMany({});
    const result = await col.insertMany(sample);
    console.log('Inserted documents:', result.insertedCount);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
