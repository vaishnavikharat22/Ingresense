import React, { useEffect } from 'react';
import RecipeCard from './RecipeCard';

function RecipeModal({ recipe, onClose, onFavorite, onDelete }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleBackdrop}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <RecipeCard
          recipe={recipe}
          onFavorite={onFavorite}
          onDelete={(id) => {
            onDelete(id);
            onClose();
          }}
          onView={() => {}}
          compact={false}
        />
      </div>
    </div>
  );
}

export default RecipeModal;
