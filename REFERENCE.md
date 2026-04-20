# ⚡ Ingresense - Command Reference Card

## 🚀 One-Line Setup (if dependencies installed)

```bash
# Terminal 1: Backend
cd server && npm start

# Terminal 2: Frontend  
cd client && npm start

# Terminal 3: MongoDB
mongod
```

Visit: **http://localhost:3000**

---

## 📦 Fresh Installation (First Time)

```bash
# Backend setup
cd server
npm install
# Edit .env with your API key
npm start

# Frontend setup (new terminal)
cd client
npm install
npm start
```

---

## 🔑 Quick Configuration

### .env (server/ directory):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ingresense
OPENAI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual OpenAI key.

---

## 📚 Documentation Links

| Document | Purpose |
|----------|---------|
| `README.md` | Full guide with features, troubleshooting |
| `QUICK_START.md` | 5-minute setup guide |
| `STRUCTURE.md` | Project file structure |
| `CHECKLIST.md` | Complete feature list |
| `PROJECT_SUMMARY.md` | Detailed file descriptions |

---

## 🧪 API Testing (Backend must be running)

```bash
# Get all recipes
curl http://localhost:5000/api/recipes

# Generate recipe
curl -X POST http://localhost:5000/api/recipes/generate \
  -H "Content-Type: application/json" \
  -d '{"ingredients":["chicken","rice","garlic"]}'

# Get recipe health check
curl http://localhost:5000/health
```

---

## 🎮 Feature Quick Guide

| Feature | How To |
|---------|--------|
| Add Ingredient | Type + Enter or click "+ Add" |
| Remove Ingredient | Click × on tag |
| Generate Recipe | Click "Generate My Recipe" button |
| Add to Favorites | Click ⭐ star icon |
| View Full Recipe | Click "View Full Recipe" button |
| Delete Recipe | Click "Delete" button |
| View All Recipes | Click "Saved" button in header |
| Filter Favorites | Use filter buttons on Saved page |

---

## 📱 UI Components

```
App
├── Header (sticky nav with logo & buttons)
├── Hero Section (welcome message)
├── IngredientInput (add ingredients as tags)
├── RecipeCard (displays recipe details)
├── RecipeModal (full-screen view)
├── SavedRecipes (grid with filters)
└── Loader (spinner with fun messages)
```

---

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/recipes/generate` | Generate recipe from ingredients |
| GET | `/api/recipes` | Get all recipes |
| GET | `/api/recipes/:id` | Get specific recipe |
| PATCH | `/api/recipes/:id/favorite` | Toggle favorite |
| DELETE | `/api/recipes/:id` | Delete recipe |

---

## 🎨 Theme Colors

| Variable | Color | Usage |
|----------|-------|-------|
| --accent | #e8c547 | Buttons, highlights, badges |
| --bg | #0d0d0d | Main background |
| --surface | #161616 | Cards, panels |
| --text | #f0ede6 | Main text |
| --text-muted | #8a8680 | Secondary text |

---

## 💾 Database Schema

**Recipe Collection:**
```javascript
{
  title: String,
  description: String,
  ingredients: [String],
  steps: [String],
  prepTime: Number (minutes),
  cookTime: Number (minutes),
  servings: Number,
  cuisine: String,
  difficulty: Enum("Easy", "Medium", "Hard"),
  tags: [String],
  isFavorite: Boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🐛 Troubleshooting Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Verify MongoDB running
mongosh

# Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# MAC/Linux:
lsof -i :5000
kill -9 <PID>

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Expected Performance

- Recipe generation: 10-30 seconds (AI processing)
- Page load: <1 second
- Recipe fetch: <500ms
- Favorite toggle: <200ms
- Delete: <300ms

---

## 🚁 Development Tips

### Hot Reload
- Backend: Automatically reloads with nodemon
- Frontend: React dev server auto-refreshes
- Changes to CSS are instant

### Debugging
- Open browser DevTools: F12
- Check Network tab for API calls
- Check Console for JavaScript errors
- Backend logs in terminal

### Testing Ingredients
```
"chicken", "rice", "garlic" → Asian fusion
"salmon", "lemon", "dill" → Mediterranean
"beef", "beans", "chili" → Mexican
"spinach", "feta", "tomato" → Greek
"potatoes", "onion", "cream" → Comfort food
```

---

## ⚙️ System Requirements

- **Node.js**: v14 or higher
- **npm**: v6 or higher
- **MongoDB**: v4.0 or higher (or Atlas)
- **RAM**: 512MB minimum
- **Disk**: 500MB free space
- **Internet**: Required (OpenAI API)

---

## 🎓 Learning Resources

- React: https://react.dev
- Express: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- OpenAI: https://platform.openai.com/docs

---

## 💡 Pro Tips

1. **Save your API key securely** - Never commit .env file
2. **Monitor API usage** - OpenAI charges per request
3. **Test locally first** - Before deploying to production
4. **Use MongoDB Atlas** - For production database
5. **Enable HTTPS** - When deploying to production
6. **Add authentication** - For multi-user apps

---

## 📞 Getting Help

1. Check `README.md` troubleshooting section
2. Verify `.env` configuration
3. Ensure all services are running (MongoDB, Backend, Frontend)
4. Check browser console for errors
5. Check terminal logs for backend errors

---

## 🎉 You're Ready!

Everything is configured and ready to go. Follow the **One-Line Setup** above and start generating recipes!

---

**Happy Cooking! 🍳**
