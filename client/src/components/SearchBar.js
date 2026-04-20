import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SUGGESTIONS = [
  'chicken', 'rice', 'tomato', 'garlic', 'onion', 'potato',
  'pasta', 'cheese', 'egg', 'spinach', 'mushroom', 'bell pepper',
];

const DIET_FILTERS = [
  { key: 'all', label: 'All', color: '#6B7280', icon: null },
  { key: 'vegetarian', label: 'Veg', color: '#16A34A', icon: '●' },
  { key: 'non-veg', label: 'Non-Veg', color: '#DC2626', icon: '●' },
  { key: 'egg', label: 'Egg', color: '#EAB308', icon: '●' },
];

function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [diet, setDiet] = useState('all');

  const addIngredient = (val) => {
    const trimmed = (val || input).trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInput('');
    }
  };

  const removeIngredient = (ing) => {
    setIngredients(ingredients.filter((i) => i !== ing));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        addIngredient();
      } else if (ingredients.length > 0) {
        triggerSearch();
      }
    }
  };

  const triggerSearch = () => {
    if (ingredients.length > 0) {
      // Map diet filter to Spoonacular diet param
      let dietParam = diet;
      if (diet === 'non-veg' || diet === 'egg') {
        // Spoonacular doesn't have non-veg/egg diet; we handle client-side
        dietParam = diet === 'egg' ? 'vegetarian' : 'all';
      }
      onSearch(ingredients, dietParam);
    }
  };

  const unusedSuggestions = SUGGESTIONS.filter((s) => !ingredients.includes(s));

  return (
    <section className="hero-search">
      <h1>What do we have in our kitchen today?</h1>
      <p>Enter your ingredients and discover matching recipes instantly</p>

      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Add ingredients — e.g. chicken, rice, garlic..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            id="search-input"
          />
          <button
            className="search-btn"
            onClick={input.trim() ? () => addIngredient() : triggerSearch}
            disabled={loading || (!input.trim() && ingredients.length === 0)}
          >
            <Search size={16} />
            {input.trim() ? 'Add' : 'Search'}
          </button>
        </div>

        {ingredients.length > 0 && (
          <div className="tags-row">
            {ingredients.map((ing) => (
              <span key={ing} className="tag">
                {ing}
                <button
                  className="tag-remove"
                  onClick={() => removeIngredient(ing)}
                  disabled={loading}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Diet Filters */}
        <div className="diet-filters">
          {DIET_FILTERS.map((f) => (
            <button
              key={f.key}
              className={`diet-btn ${diet === f.key ? 'active' : ''}`}
              onClick={() => setDiet(f.key)}
              disabled={loading}
            >
              {f.icon && (
                <span className="diet-dot" style={{ color: f.color }}>
                  {f.icon}
                </span>
              )}
              {f.label}
            </button>
          ))}
        </div>

        {/* Quick ingredient suggestions */}
        {ingredients.length === 0 && (
          <div className="suggestions">
            <span className="suggestions-label">Popular:</span>
            {unusedSuggestions.slice(0, 8).map((s) => (
              <button
                key={s}
                className="suggestion-chip"
                onClick={() => addIngredient(s)}
                disabled={loading}
              >
                + {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchBar;
