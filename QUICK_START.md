# 🚀 Ingresense - Quick Start Guide

## Prerequisites Check ✓

Before starting, make sure you have:
- ✅ Node.js v14+ and npm installed
- ✅ MongoDB running (locally or MongoDB Atlas)
- ✅ OpenAI API key from https://platform.openai.com/api-keys

## 5-Minute Setup

### Step 1: Backend Configuration (1 min)

```bash
cd server
```

Open `server/.env` and update:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ingresense
OPENAI_API_KEY=sk-xxxxxxxxxxxxxx  # Your actual API key
```

### Step 2: Install Dependencies (2 min)

```bash
# Backend
cd server
npm install

# Frontend (in another terminal)
cd client
npm install
```

### Step 3: Start Services (2 min)

**Terminal 1 - MongoDB** (if using local):
```bash
mongod
```

**Terminal 2 - Backend**:
```bash
cd server
npm start
# You should see: "Server running on http://localhost:5000"
```

**Terminal 3 - Frontend**:
```bash
cd client
npm start
# Browser will open to http://localhost:3000
```

## 🎉 You're Live!

Visit `http://localhost:3000` and start generating recipes!

### Try it out:
1. Type: `chicken`, press Enter
2. Type: `rice`, press Enter
3. Type: `garlic`, press Enter
4. Click "Generate My Recipe"
5. Wait 10-30 seconds for AI to create your recipe
6. Click ⭐ to favorite or 👁️ to view full recipe

## 📝 Environment Variables Reference

### .env (server/):

| Variable | Value | Example |
|----------|-------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection | `mongodb://localhost:27017/ingresense` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-proj-abc123...` |

### Frontend API Base:
- Hardcoded in `client/src/App.js`
- Default: `http://localhost:5000/api/recipes`

## ⚠️ Common Issues & Fixes

### Issue: "Cannot GET /api/recipes"
**Solution**: Make sure backend is running (`npm start` in `server/`)

### Issue: "MongoDB connection failed"
**Solution**: 
```bash
# Start MongoDB locally
mongod

# OR use MongoDB Atlas
# Update MONGO_URI in .env to your Atlas connection string
```

### Issue: "Invalid API key" or OpenAI error
**Solution**: 
1. Verify your API key from https://platform.openai.com/api-keys
2. Paste it correctly in `.env`
3. Make sure you have credits in your OpenAI account

### Issue: "Port 5000 already in use"
**Solution**: Change PORT in `.env` or kill process using port 5000

### Issue: "CORS error"
**Solution**: Ensure:
- Backend on `localhost:5000`
- Frontend on `localhost:3000`
- Both services are running

## 🛠️ Development Commands

### Backend:
```bash
npm start      # Run with nodemon (auto-reload on changes)
npm run dev    # Same as above
```

### Frontend:
```bash
npm start      # Start dev server
npm build      # Build for production
npm test       # Run tests
```

## 📱 Testing the API with curl

```bash
# Get all recipes
curl http://localhost:5000/api/recipes

# Generate a recipe
curl -X POST http://localhost:5000/api/recipes/generate \
  -H "Content-Type: application/json" \
  -d '{"ingredients":["chicken","tomato","garlic"]}'

# Toggle favorite (replace :id with actual recipe ID)
curl -X PATCH http://localhost:5000/api/recipes/:id/favorite

# Delete recipe
curl -X DELETE http://localhost:5000/api/recipes/:id
```

## 🎨 UI Features

### Home Page
- Enter ingredients as tags
- One-click recipe generation
- View generated recipe immediately

### Saved Recipes
- Browse all recipes
- Filter by "All" or "Favorites"
- View recipe count

### Recipe Card
- Cuisine type badge
- Difficulty level (Easy/Medium/Hard)
- Prep & cook time, servings
- Full ingredient list
- Step-by-step instructions
- Favorite toggle
- Delete option

### Recipe Modal
- Full recipe in overlay
- Close with Escape key or backdrop click
- All recipe details

## 📊 Project Statistics

- **Frontend**: 7 components + App.js
- **Backend**: 5 files (config, models, routes, server.js, .env)
- **Styling**: 1000+ lines custom CSS
- **API Endpoints**: 5 (Generate, Get All, Get One, Toggle Favorite, Delete)
- **Database Schema**: 1 (Recipe)

## 🚀 Next Steps

### To deploy:
1. **Backend**: Deploy to Heroku/Render/Railway
2. **Frontend**: Deploy to Vercel/Netlify
3. **Database**: Use MongoDB Atlas
4. Update API_BASE_URL in frontend to deployed backend URL

### To extend:
- Add user authentication
- Add recipe ratings/reviews
- Add search functionality
- Save favorite recipes to user profile
- Export recipes as PDF

## 📞 Need Help?

Check the main `README.md` for:
- Detailed architecture
- Full API documentation
- Deployment guides
- Troubleshooting section

---

**That's it! Enjoy generating recipes with AI! 🍳**
