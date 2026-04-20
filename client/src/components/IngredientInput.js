import React, { useState } from 'react';

function IngredientInput({ onGenerate, loading }) {
  const [input, setInput] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = () => {
    const trimmed = input.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInput('');
    }
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const handleGenerate = () => {
    if (ingredients.length > 0) {
      onGenerate(ingredients);
    }
  };

  return (
    <section className="input-section">
      <div className="input-wrapper">
        <input
          type="text"
          className="ingredient-input"
          placeholder="Type an ingredient (e.g. chicken, garlic, rice)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          id="ingredient-input"
        />
        <button
          className="add-btn"
          onClick={addIngredient}
          disabled={loading || !input.trim()}
        >
          + Add
        </button>
      </div>

      {ingredients.length > 0 && (
        <div className="tags-container">
          {ingredients.map((ing) => (
            <span key={ing} className="tag">
              {ing}
              <button
                className="tag-remove"
                onClick={() => removeIngredient(ing)}
                disabled={loading}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <button
        className="generate-btn"
        onClick={handleGenerate}
        disabled={loading || ingredients.length === 0}
        id="generate-recipe-btn"
      >
        {loading ? '⏳ Generating...' : '🍽️ Generate My Recipe'}
      </button>
    </section>
  );
}

export default IngredientInput;
