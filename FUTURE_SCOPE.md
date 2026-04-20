# Ingresense Future Scope

## 1. Stage / State Persistence
- **State Hydration**: Keep search queries, diet filters, and fetched recipes persistent across page reloads (e.g. using `localStorage`, `sessionStorage`, or a robust state manager like Redux/Zustand combined with persistence middleware).
- **Benefits**: Users won't lose their active search results or filtering configurations if they accidentally refresh or navigate away and back.
- **Implementation**:
    - Serialize the `ingredients` array and selected `diet` filter to `localStorage`.
    - If `searchResults` size is manageable, persist those as well to avoid unnecessary API calls to Spoonacular.
    - Synchronize the `page` state (Home vs My Recipes).

## 2. Meal Planning & Grocery Lists
- Generating shopping lists automatically by checking the `missedIngredients` missing from a recipe.
- Saving a calendar of meals to prep on specific days of the week.

## 3. Advanced Customization
- Macronutrient targets (e.g., "Find recipes under 500 kcal with >30g protein").
- Dark Mode toggle for users who prefer nighttime usage.
