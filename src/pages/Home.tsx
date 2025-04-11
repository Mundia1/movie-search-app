import { useState, useContext } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { ThemeContext } from '../context/ThemeContext';
import { useFavorites } from '../hooks/useFavorites';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { favorites } = useFavorites();

  const moviesPerPage = 10;

  const searchMovies = async (query: string, page: number) => {
    if (!query.trim()) {
      setMovies([]);
      setError(null);
      setLoading(false);
      setTotalResults(0);
      setCurrentQuery('');
      setCurrentPage(1);
      return;
    }

    setLoading(true);
    setCurrentQuery(query);

    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    if (!apiKey) {
      setError('OMDB API key is missing. Please set VITE_OMDB_API_KEY in your .env file.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=${page}&apikey=${apiKey}`
      );
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setTotalResults(parseInt(response.data.totalResults, 10));
        setError(null);
        setCurrentPage(page);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(response.data.Error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalResults / moviesPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    searchMovies(currentQuery, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-kenya-black dark:text-kenya-white text-shadow">
          Search Movies
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="btn-icon"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <svg
                className="w-6 h-6 text-kenya-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-kenya-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
          {favorites.length > 0 && (
            <div className="relative">
              <button className="btn-icon" aria-label="View favorites">
                <svg
                  className="w-6 h-6 text-kenya-red"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-kenya-red text-kenya-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      <SearchBar onSearch={searchMovies} />
      {error && <p className="text-center text-kenya-red mb-6 text-lg">{error}</p>}
      <MovieList movies={movies} loading={loading} />
      {totalResults > moviesPerPage && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn-primary disabled:opacity-50"
            aria-label="Previous page"
          >
            Previous
          </button>
          <span className="text-lg text-kenya-black dark:text-kenya-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn-primary disabled:opacity-50"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;