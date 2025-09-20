# SecondChance Backend

Simple Node.js + Express backend for the SecondChance capstone.

Prerequisites:
- Node 18+ and npm
- MongoDB running locally or a MongoDB Atlas connection string in MONGODB_URI

Install:

```bash
npm install
```

Seed sample data (will insert 16 documents):

```bash
npm run seed
```

Check count:

```bash
npm run count
```

Run server:

```bash
npm start
```

Endpoints:
- GET /api/secondchance/items
- GET /api/secondchance/items/:id
- POST /api/secondchance/items (form-data, optional file field: image)
- DELETE /api/secondchance/items/:id
- GET /api/secondchance/search?category=<cat>&q=<text>
