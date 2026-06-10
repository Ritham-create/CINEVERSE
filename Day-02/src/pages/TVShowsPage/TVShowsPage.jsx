import { useState, useCallback } from 'react';
import { tvShows } from '../../data/movies';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieModal from '../../components/MovieModal/MovieModal';
import { FiGrid, FiList } from 'react-icons/fi';
import '../BrowsePage/BrowsePage.css'; // Re-use BrowsePage styles

export default function TVShowsPage() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  
  // Flatten TV shows
  const allTvShows = tvShows.flatMap(cat => cat.movies);

  const handleCloseModal = useCallback(() => setSelectedMovie(null), []);

  return (
    <div className="browse-page fade-in" id="tv-shows-page">
      <div className="browse-page__header">
        <h1 className="browse-page__title">TV Shows</h1>
        <div className="browse-page__controls">
          <div className="browse-page__view-toggle">
            <button
              className={`browse-page__view-btn ${viewMode === 'grid' ? 'browse-page__view-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <FiGrid />
            </button>
            <button
              className={`browse-page__view-btn ${viewMode === 'list' ? 'browse-page__view-btn--active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      <div className={`browse-page__grid browse-page__grid--${viewMode}`}>
        {allTvShows.map((show, index) => (
          <MovieCard
            key={show.id}
            movie={show}
            index={index}
            onClick={() => setSelectedMovie(show)}
          />
        ))}
      </div>

      {allTvShows.length === 0 && (
        <div className="browse-page__empty">
          <span className="browse-page__empty-icon">📺</span>
          <p>No TV shows available</p>
        </div>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
