# Ingresense - AI-Powered Recipe Generator

A full-stack web application that uses AI to generate custom recipes based on ingredients you have on hand. Built with the MERN stack (MongoDB, Express, React, Node.js) and powered by OpenAI's GPT-3.5-turbo.

## 🎯 Features

- **AI Recipe Generation**: Input ingredients and get unique recipes created by AI chef
- **Save & Manage Recipes**: Store generated recipes in MongoDB
- **Favorites**: Mark recipes as favorites and filter by them
- **Dark Theme UI**: Modern, elegant dark design with custom CSS
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Recipe Details**: View prep/cook times, servings, difficulty level, cuisine type, and detailed steps
- **Real-time Updates**: Instantly see changes to favorites and deletions

## 🛠️ Tech Stack

- **Frontend**: React.js with Create React App
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **AI**: OpenAI API (gpt-3.5-turbo)
- **Styling**: Pure Custom CSS (No frameworks)

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v14 or higher) and npm installed
- MongoDB running locally or a MongoDB Atlas connection string
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## 🚀 Installation & Setup

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ingresense
OPENAI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual OpenAI API key.

**Note**: If you don't have MongoDB running locally, you can use MongoDB Atlas:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string and update `MONGO_URI` in `.env`

### 2. Frontend Setup

```bash
cd client
npm install
```

The frontend uses `http://localhost:5000/api/recipes` as the default API base URL (configured in the code).

## 🎬 Running the Application

### Start MongoDB (if using local)

```bash
mongod
```

### Start the Backend

```bash
cd server
npm start
# or
npm run dev
```

The server will run on `http://localhost:5000`

### Start the Frontend

In a new terminal:

```bash
cd client
npm start
```

The app will open at `http://localhost:3000`

## 📱 How to Use

1. **Enter Ingredients**: Type an ingredient in the input field and press Enter or click "+ Add"
2. **Build Your List**: Add as many ingredients as you want
3. **Generate Recipe**: Click "Generate My Recipe" button
4. **Wait for AI**: The AI chef will create a custom recipe (takes 10-30 seconds)
5. **View & Interact**:
   - ⭐ Click the star to add/remove from favorites
   - 👁️ Click "View Full Recipe" to see the complete recipe in a modal
   - 🗑️ Click "Delete" to remove a recipe
6. **Browse Saved**: Go to "Saved" tab to see all your recipes
7. **Filter**: Use "All" and "Favorites" buttons to filter recipes

## 🗂️ Project Structure

```
Ingresense/
├── client/                  # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.js
│   │   │   ├── IngredientInput.js
│   │   │   ├── RecipeCard.js
│   │   │   ├── RecipeModal.js
│   │   │   ├── SavedRecipes.js
│   │   │   └── Loader.js
│   │   ├── App.js          # Main component
│   │   ├── App.css         # All styling
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── server/                  # Node Backend
    ├── config/
    │   └── db.js           # MongoDB connection
    ├── models/
    │   └── Recipe.js       # Recipe schema
    ├── routes/
    │   └── recipeRoutes.js # API endpoints
    ├── server.js           # Express server
    ├── .env                # Environment variables
    └── package.json
```

## 🔌 API Endpoints

### POST `/api/recipes/generate`
Generate a recipe from ingredients

**Request:**
```json
{
  "ingredients": ["chicken", "tomato", "garlic"]
}
```

**Response:**
```json
{
  "_id": "...",
  "title": "Garlic Chicken Tomato Pasta",
  "description": "...",
  "cuisine": "Italian",
  "difficulty": "Easy",
  "prepTime": 15,
  "cookTime": 25,
  "servings": 4,
  "ingredients": ["chicken", "tomato", "garlic"],
  "steps": ["...", "..."],
  "tags": ["quick", "dinner"],
  "isFavorite": false,
  "createdAt": "...",
  "updatedAt": "..."
}
```

### GET `/api/recipes`
Get all recipes

### GET `/api/recipes/:id`
Get a specific recipe

### PATCH `/api/recipes/:id/favorite`
Toggle favorite status

### DELETE `/api/recipes/:id`
Delete a recipe

## 🎨 Color Theme

The app uses a sophisticated dark theme:

```css
--bg: #0d0d0d          /* Deep black background */
--surface: #161616     /* Primary surface */
--surface2: #1e1e1e    /* Secondary surface */
--border: #2a2a2a      /* Subtle borders */
--accent: #e8c547      /* Gold accent color */
--text: #f0ede6        /* Light text */
--text-muted: #8a8680  /* Muted text */
```

## 🔒 Security Notes

- Never commit your `.env` file with real API keys
- Add `.env` to `.gitignore`
- The OpenAI API key is sensitive - keep it private
- Always validate user inputs on the backend

## ⚠️ Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `mongod`
- Or verify your MongoDB Atlas connection string is correct

### "OpenAI API Error"
- Verify your API key is correct in `.env`
- Check that you have credits in your OpenAI account
- Make sure the API key permissions are enabled for chat completions

### "Port 5000 already in use"
- Change PORT in `.env` file, or kill the process using the port

### CORS errors
- Make sure the backend is running on `localhost:5000`
- The frontend should be on `localhost:3000`
- CORS is already configured in Express

### Recipe generation is slow
- This is normal - GPT-3.5-turbo takes 10-30 seconds
- The loading screen shows fun messages while waiting

## 📝 Environment Variables

Create `.env` file in the `server` directory:

```env
PORT=5000                                        # Backend port
MONGO_URI=mongodb://localhost:27017/ingresense   # MongoDB connection URI
OPENAI_API_KEY=sk-...                           # Your OpenAI API key
```

## 🚀 Deployment

### Deploy Backend (Heroku Example)

```bash
cd server
# Set environment variables on Heroku
heroku config:set PORT=5000
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set OPENAI_API_KEY=your_key

# Create Procfile
echo "web: node server.js" > Procfile

# Deploy
git push heroku main
```

### Deploy Frontend (Vercel Example)

```bash
cd client
vercel
```

Update the API base URL in `App.js` to point to your deployed backend.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project, make improvements, and submit pull requests!

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Built with ❤️ using MERN Stack & 🤖 AI**
