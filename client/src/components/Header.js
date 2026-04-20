import React from 'react';
import { Search, BookOpen } from 'lucide-react';

function Header({ page, setPage, savedCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo" onClick={() => setPage('home')}>
          Ingre<span>sense</span>
        </div>
        <div className="nav-buttons">
          <button
            className={`nav-btn ${page === 'home' ? 'active' : ''}`}
            onClick={() => setPage('home')}
          >
            <Search size={15} />
            <span className="nav-label">Discover</span>
          </button>
          <button
            className={`nav-btn ${page === 'saved' ? 'active' : ''}`}
            onClick={() => setPage('saved')}
          >
            <BookOpen size={15} />
            <span className="nav-label">My Recipes</span>
            {savedCount > 0 && (
              <span className="nav-badge">{savedCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
