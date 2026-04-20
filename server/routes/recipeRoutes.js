const express = require('express');
const Recipe = require('../models/Recipe');

const router = express.Router();

// Helper function to call OpenAI API
const createDemoRecipe = (ingredients) => {
  const titleIngredients = ingredients.slice(0, 3).join(', ');
  return {
    title: `Easy ${ingredients[0]} & ${ingredients.length > 1 ? ingredients[1] : 'Herb'} Skillet`,
    description: `A simple, flavor-packed meal centered around ${titleIngredients}. Perfect for a quick dinner.`,
    cuisine: 'Comfort',
    difficulty: 'Easy',
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    tags: ['quick', 'easy', 'weeknight'],
    steps: [
      `Gather your ingredients: ${ingredients.join(', ')}.`,
      'Heat a skillet over medium heat and add a little oil.',
      `Sauté the aromatics until fragrant, then add the main ingredients and cook until tender.`,
      'Season with salt, pepper, and your favorite spices.',
      'Serve warm and enjoy your quick homemade meal.',
    ],
  };
};

const generateRecipeWithAI = async (ingredients) => {
  try {
    const ingredientList = ingredients.join(', ');
    const prompt = `You are a professional chef. A user has these ingredients: ${ingredientList}. Create a recipe using ONLY or MOSTLY these ingredients. Respond ONLY in this JSON format with no extra text:
{
  "title": "Recipe Title",
  "description": "Short description",
  "cuisine": "Cuisine Type",
  "difficulty": "Easy|Medium|Hard",
  "prepTime": 15,
  "cookTime": 30,
  "servings": 4,
  "tags": ["tag1", "tag2"],
  "steps": ["Step 1", "Step 2", "Step 3"]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      const message = error.error?.message || 'Unknown error';
      console.warn('OpenAI fallback triggered:', message);

      if (
        message.toLowerCase().includes('quota') ||
        message.toLowerCase().includes('billing') ||
        message.toLowerCase().includes('api key') ||
        message.toLowerCase().includes('access') ||
        message.toLowerCase().includes('permission')
      ) {
        return createDemoRecipe(ingredients);
      }

      throw new Error(`OpenAI API error: ${message}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the JSON response
    const recipeData = JSON.parse(content);

    // Validate required fields
    if (
      !recipeData.title ||
      !recipeData.description ||
      !recipeData.cuisine ||
      !recipeData.difficulty ||
      recipeData.prepTime === undefined ||
      recipeData.cookTime === undefined ||
      recipeData.servings === undefined ||
      !Array.isArray(recipeData.steps)
    ) {
      throw new Error('Invalid recipe format from AI');
    }

    return recipeData;
  } catch (error) {
    console.error('AI generation error:', error);

    if (
      error.message.toLowerCase().includes('quota') ||
      error.message.toLowerCase().includes('billing') ||
      error.message.toLowerCase().includes('api key') ||
      error.message.toLowerCase().includes('access') ||
      error.message.toLowerCase().includes('permission')
    ) {
      return createDemoRecipe(ingredients);
    }

    throw error;
  }
};

// POST /generate - Generate recipe from ingredients
router.post('/generate', async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'Please provide an array of ingredients' });
    }

    // Generate recipe using AI
    const recipeData = await generateRecipeWithAI(ingredients);

    // Create new recipe document
    const recipe = new Recipe({
      ...recipeData,
      ingredients,
      isFavorite: false,
    });

    // Save to MongoDB
    await recipe.save();

    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error generating recipe:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate recipe. Please try again.',
    });
  }
});

// GET / - Get all recipes sorted by newest
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// GET /:id - Get single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

// PATCH /:id/favorite - Toggle favorite status
router.patch('/:id/favorite', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    recipe.isFavorite = !recipe.isFavorite;
    await recipe.save();

    res.json(recipe);
  } catch (error) {
    console.error('Error updating favorite status:', error);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// DELETE /:id - Delete recipe
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

module.exports = router;
