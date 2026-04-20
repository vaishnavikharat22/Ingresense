import React from 'react';

function RecipeCard({ recipe, onFavorite, onDelete, onView, compact }) {
  const difficultyClass = `badge badge-${recipe.difficulty.toLowerCase()}`;

  const displayIngredients = compact
    ? recipe.ingredients.slice(0, 4)
    : recipe.ingredients;

  const displaySteps = compact
    ? recipe.steps.slice(0, 3)
    : recipe.steps;

  return (
    <div className="recipe-card">
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-card-image"
          loading="lazy"
        />
      )}

      <div className="recipe-card-body">
        <div className="recipe-card-meta">
          <span className="badge badge-cuisine">{recipe.cuisine}</span>
          <span className={difficultyClass}>{recipe.difficulty}</span>
        </div>

        <h3 className="recipe-card-title">{recipe.title}</h3>
        <p className="recipe-card-desc">{recipe.description}</p>

        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-value">{recipe.prepTime}m</div>
            <div className="stat-label">Prep</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{recipe.cookTime}m</div>
            <div className="stat-label">Cook</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{recipe.servings}</div>
            <div className="stat-label">Servings</div>
          </div>
        </div>

        {recipe.tags && recipe.tags.length > 0 && (
          <div className="recipe-tags">
            {recipe.tags.map((tag) => (
              <span key={tag} className="recipe-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="ingredients-section">
          <h4 className="section-title">🧂 Ingredients</h4>
          <div className="ingredients-list">
            {displayIngredients.map((ing, i) => (
              <div key={i} className="ingredient-item">
                {ing}
              </div>
            ))}
          </div>
          {compact && recipe.ingredients.length > 4 && (
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              +{recipe.ingredients.length - 4} more...
            </div>
          )}
        </div>

        {(!compact || displaySteps.length > 0) && (
          <div className="steps-section">
            <h4 className="section-title">👨‍🍳 Steps</h4>
            <ol className="steps-list">
              {displaySteps.map((step, i) => (
                <li key={i} className="step-item">
                  {step}
                </li>
              ))}
            </ol>
            {compact && recipe.steps.length > 3 && (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                +{recipe.steps.length - 3} more steps...
              </div>
            )}
          </div>
        )}

        {recipe.sourceUrl && (
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
          >
            🔗 View Original Recipe
          </a>
        )}

        <div className="card-actions">
          <button
            className={`action-btn favorite ${recipe.isFavorite ? 'active' : ''}`}
            onClick={() => onFavorite(recipe._id)}
          >
            {recipe.isFavorite ? '★' : '☆'} Fav
          </button>
          <button
            className="action-btn view"
            onClick={() => onView(recipe)}
          >
            👁️ View Full
          </button>
          <button
            className="action-btn delete"
            onClick={() => onDelete(recipe._id)}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
