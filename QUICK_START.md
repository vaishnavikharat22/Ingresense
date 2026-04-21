# 🚀 Ingresense — Quick Start Guide

---

## Prerequisites

| Tool       | Required | Check Command        |
|------------|----------|----------------------|
| Node.js    | v14+     | `node -v`            |
| npm        | v6+      | `npm -v`             |
| MongoDB    | Running  | `mongod --version`   |

---

## First-Time Setup (One Time Only)

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Create Environment File

Create `server/.env` with the following:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ingresense
SPOONACULAR_API_KEY=your_spoonacular_api_key_here
```

### 3. Install Frontend Dependencies

```bash
cd client
npm install
```

### 4. Build the Frontend

```bash
cd client
npm run build
```

> This creates the `client/build/` folder that the server serves.

---

## ▶️ Starting the App

You only need **ONE terminal** and **ONE command**:

```bash
cd server
node server.js
```

You should see:

```
Server running on http://localhost:5000
MongoDB connected successfully
```

**Open your browser → `http://localhost:5000`**

That's it. The entire app (frontend + backend + API) runs on port **5000**.

---

## 🔄 After Making Frontend Changes

If you edit any file inside `client/src/`, you must rebuild:

```bash
cd client
npm run build
```

Then restart the server:

```bash
cd server
node server.js
```

---

## 📁 Project Structure

```
Ingresense/
├── client/               # React Frontend
│   ├── src/
│   │   ├── App.js        # Main app component
│   │   ├── App.css       # All styles
│   │   └── components/   # UI components
│   └── build/            # Production build (served by Express)
│
├── server/               # Node.js Backend
│   ├── server.js         # Express server (serves API + frontend)
│   ├── routes/           # API route handlers
│   ├── models/           # MongoDB schemas
│   ├── config/           # Database connection
│   └── .env              # Environment variables (not committed)
```

---

## ⚠️ Troubleshooting

| Problem                          | Fix                                                       |
|----------------------------------|------------------------------------------------------------|
| `MongoDB connection failed`      | Make sure `mongod` is running in the background            |
| `EADDRINUSE: port 5000`          | Another process is on 5000. Kill it or change PORT in .env |
| Blank page on localhost:5000     | Run `npm run build` inside `client/` first                 |
| API returns 401/402              | Check your Spoonacular API key in `server/.env`            |
| Frontend changes not showing     | Rebuild: `cd client && npm run build`, then restart server |
